/* ============================================================
   Siddharth P — Portfolio agent backend (Vercel serverless function)

   POST /api/chat  { message: string, history?: [{role,text}] }
   -> { reply: string, actions: [{name, ...}] }

   Design:
   - Grounded ONLY in data.js (the same data the page itself renders),
     to make hallucination structurally hard, not just prompt-discouraged.
   - Actions are function-calls the model MAY request; every single one
     is re-validated server-side against real data before being sent to
     the browser. The model cannot invent a URL, section, or category.
   - Uses Groq's free API tier (OpenAI-compatible Chat Completions API).
     No billing account required for the free tier, so spend is hard-
     capped at $0 — requests beyond the free quota are rejected, not billed.
   ============================================================ */
"use strict";

const SITE_DATA = require("../data.js");

const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const MAX_MESSAGE_CHARS = 600;
const MAX_HISTORY_TURNS = 6;
const MAX_OUTPUT_TOKENS = 400;

/* Best-effort, zero-cost rate limit. Resets on cold start and is not
   shared across concurrent instances -- a real ceiling, not a strong
   guarantee. Paired with Groq's own free-tier quota as the backstop. */
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 20;
function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.start > WINDOW_MS) { hits.set(ip, { start: now, count: 1 }); return false; }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

/* OpenAI-compatible "tools" schema (Groq uses the same shape as OpenAI). */
const TOOLS = [
  {
    name: "scroll_to_section",
    description: "Scroll the visitor's browser to a named section of the page.",
    parameters: {
      type: "object",
      properties: { section: { type: "string", enum: SITE_DATA.SECTIONS } },
      required: ["section"],
    },
  },
  {
    name: "open_project_link",
    description: "Open a project's live/GitHub link in a new tab. project_title must exactly match a project title from the data.",
    parameters: {
      type: "object",
      properties: { project_title: { type: "string", enum: SITE_DATA.PROJECTS.map((p) => p.title) } },
      required: ["project_title"],
    },
  },
  {
    name: "filter_projects",
    description: "Apply a category filter to the projects grid on the page.",
    parameters: {
      type: "object",
      properties: { category: { type: "string", enum: SITE_DATA.FILTERS } },
      required: ["category"],
    },
  },
  {
    name: "prefill_contact",
    description: "Pre-fill (but never submit) the contact form's subject and message fields, then scroll to it.",
    parameters: {
      type: "object",
      properties: {
        subject: { type: "string" },
        message: { type: "string" },
      },
      required: ["subject", "message"],
    },
  },
].map((fn) => ({ type: "function", function: fn }));

function buildSystemPrompt() {
  const p = SITE_DATA.PERSON;
  return [
    `You are the AI agent embedded on ${p.name}'s personal portfolio website. You speak AS ${p.name.split(" ")[0]}, in first person, informally and confidently -- the way he'd answer a recruiter or visitor himself.`,
    ``,
    `GROUNDING RULES (do not break these):`,
    `- The only facts you know about ${p.name.split(" ")[0]} are in the JSON DATA block below. Do not use outside knowledge about him.`,
    `- If something isn't in DATA, say you're not sure and suggest emailing ${p.email} directly. Never invent skills, employers, numbers, dates, or projects.`,
    `- Keep replies short: 2-4 sentences unless the visitor asks for more detail.`,
    `- You may call at most one function per turn, only when it clearly helps (e.g. visitor asks about a specific project -> open_project_link; visitor wants to filter -> filter_projects; visitor wants to get in touch -> prefill_contact). Do not call a function just to be helpful if the visitor only asked a factual question.`,
    `- Never claim you already performed an action unless you actually called the corresponding function.`,
    ``,
    `DATA (JSON, source of truth):`,
    JSON.stringify({
      person: SITE_DATA.PERSON,
      about: SITE_DATA.ABOUT,
      education: SITE_DATA.EDUCATION,
      experience: SITE_DATA.EXPERIENCE,
      projects: SITE_DATA.PROJECTS.map((x) => ({ title: x.title, cat: x.cat, status: x.status[1], desc: x.desc, points: x.points, tags: x.tags })),
      skills: SITE_DATA.SKILLS.map(([, title, items]) => ({ title, items })),
      services: SITE_DATA.SERVICES.map(([, title, desc]) => ({ title, desc })),
      hackathons: SITE_DATA.HACKATHONS.map((h) => ({ event: h.event, org: h.org, date: h.date, result: h.result, project: h.project })),
    }),
  ].join("\n");
}

function mapHistory(history) {
  if (!Array.isArray(history)) return [];
  return history.slice(-MAX_HISTORY_TURNS).map((h) => ({
    role: h.role === "agent" ? "assistant" : "user",
    content: String(h.text || "").slice(0, MAX_MESSAGE_CHARS),
  }));
}

/* Re-validate every model-requested action against real data. Anything
   that doesn't match exactly is silently dropped -- the model cannot
   cause the browser to navigate anywhere or fill in anything unvetted. */
function validateActions(rawCalls) {
  const out = [];
  for (const call of rawCalls) {
    const args = call.args || {};
    if (call.name === "scroll_to_section" && SITE_DATA.SECTIONS.includes(args.section)) {
      out.push({ name: "scroll_to_section", section: args.section });
    } else if (call.name === "open_project_link") {
      const proj = SITE_DATA.PROJECTS.find((p) => p.title === args.project_title);
      if (proj && proj.links && proj.links[0]) {
        out.push({ name: "open_project_link", title: proj.title, url: proj.links[0][1] });
      }
    } else if (call.name === "filter_projects" && SITE_DATA.FILTERS.includes(args.category)) {
      out.push({ name: "filter_projects", category: args.category });
    } else if (call.name === "prefill_contact" && typeof args.subject === "string" && typeof args.message === "string") {
      out.push({
        name: "prefill_contact",
        subject: args.subject.slice(0, 120),
        message: args.message.slice(0, 600),
      });
    }
  }
  return out;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Agent not configured yet -- GROQ_API_KEY is missing on the server." });
  }

  const ip = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many messages right now -- try again in a few minutes." });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) return res.status(400).json({ error: "Message is required." });
  if (message.length > MAX_MESSAGE_CHARS) {
    return res.status(400).json({ error: `Keep it under ${MAX_MESSAGE_CHARS} characters, please.` });
  }

  const payload = {
    model: MODEL,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      ...mapHistory(body.history),
      { role: "user", content: message },
    ],
    tools: TOOLS,
    tool_choice: "auto",
    temperature: 0.2,
    max_tokens: MAX_OUTPUT_TOKENS,
  };

  try {
    const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      console.error("Groq API error", upstream.status, errText.slice(0, 500));
      return res.status(502).json({ error: "The agent is temporarily unavailable. Try again shortly, or email him directly." });
    }

    const data = await upstream.json();
    const msg = data?.choices?.[0]?.message || {};
    const reply = (msg.content || "").trim();
    const rawCalls = (msg.tool_calls || []).map((tc) => {
      let args = {};
      try { args = JSON.parse(tc.function?.arguments || "{}"); } catch { /* malformed args -> dropped by validateActions */ }
      return { name: tc.function?.name, args };
    });
    const actions = validateActions(rawCalls);

    if (!reply && !actions.length) {
      return res.status(200).json({ reply: "Not sure how to answer that one -- try rephrasing, or email him directly.", actions: [] });
    }
    return res.status(200).json({ reply, actions });
  } catch (err) {
    console.error("chat handler error", err);
    return res.status(500).json({ error: "Something went wrong on this end. Try again in a moment." });
  }
};
