/* ============================================================
   Siddharth P — Site agent (client)
   Turns the mascot bubble into a real chat backed by /api/chat.
   Executes ONLY the whitelisted actions the server already
   validated against real site data -- nothing here trusts raw
   model output.
   ============================================================ */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);

  const MAX_SESSION_MESSAGES = 8;
  const SESSION_KEY = "agentMsgCount";
  const HISTORY_TURNS = 6;

  let history = [];

  function getCount() { return parseInt(sessionStorage.getItem(SESSION_KEY) || "0", 10); }
  function bumpCount() { sessionStorage.setItem(SESSION_KEY, String(getCount() + 1)); }

  function addLine(log, role, text) {
    const line = document.createElement("div");
    line.className = "agent-line " + role;
    line.innerHTML = role === "user"
      ? `<span class="agent-prompt">&gt;</span><span></span>`
      : `<span class="agent-tag">siddharth.exe</span><span></span>`;
    line.querySelector("span:last-child").textContent = text;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
    return line;
  }

  function addTyping(log) {
    const line = document.createElement("div");
    line.className = "agent-line agent typing";
    line.innerHTML = `<span class="agent-tag">siddharth.exe</span><span class="agent-dots"><i></i><i></i><i></i></span>`;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
    return line;
  }

  /* ---- Whitelisted action dispatcher ---- */
  function runAction(action) {
    if (action.name === "scroll_to_section") {
      const el = document.getElementById(action.section);
      if (el) el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    } else if (action.name === "open_project_link" && action.url) {
      window.open(action.url, "_blank", "noopener");
    } else if (action.name === "filter_projects") {
      const btn = [...document.querySelectorAll("#filters .filter")].find((b) => b.textContent.trim() === action.category);
      if (btn) { btn.click(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }
    } else if (action.name === "prefill_contact") {
      const subj = $("#f-subject"), msg = $("#f-message");
      if (subj && msg) {
        subj.value = action.subject || "";
        msg.value = action.message || "";
        subj.dispatchEvent(new Event("input", { bubbles: true }));
        msg.dispatchEvent(new Event("input", { bubbles: true }));
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        subj.focus();
      }
    }
  }

  async function send(log, text) {
    history.push({ role: "user", text });
    history = history.slice(-HISTORY_TURNS);

    const typing = addTyping(log);
    let data;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) }),
      });
      data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed.");
    } catch (err) {
      typing.remove();
      addLine(log, "agent", err.message || "Something went wrong -- try again, or email him directly.");
      return;
    }
    typing.remove();
    const reply = data.reply || "…";
    addLine(log, "agent", reply);
    history.push({ role: "agent", text: reply });
    (data.actions || []).forEach(runAction);
  }

  function initAgentChat() {
    const log = $("#agentLog"), form = $("#agentForm"), input = $("#agentInput"), sendBtn = $("#agentSend");
    if (!log || !form || !input) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      if (getCount() >= MAX_SESSION_MESSAGES) {
        addLine(log, "agent", "That's the limit for this session -- email him directly at " + (window.SITE_DATA?.PERSON.email || "the address above") + " for more.");
        input.disabled = true; sendBtn.disabled = true;
        return;
      }

      addLine(log, "user", text);
      input.value = "";
      input.disabled = true; sendBtn.disabled = true;
      bumpCount();

      send(log, text).finally(() => {
        input.disabled = false; sendBtn.disabled = false; input.focus();
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAgentChat);
  else initAgentChat();
})();
