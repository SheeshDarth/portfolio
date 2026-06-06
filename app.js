/* ============================================================
   Siddharth P — Portfolio interactions & content
   ============================================================ */

(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const icon = (id) => `<svg><use href="#i-${id}"/></svg>`;

  /* ============================================================
     DATA — edit this section to update your portfolio content.
     ============================================================ */

  const BUILD = [
    ["server",  "Local-first AI systems"],
    ["doc",     "Research & document intelligence tools"],
    ["layout",  "Full-stack SaaS platforms"],
    ["flow",    "AI automation workflows"],
    ["shield",  "Privacy & trust tools"],
    ["heart",   "Health & wellness AI platforms"],
    ["blocks",  "IoT & blockchain systems"],
  ];

  const FOCUS_CHIPS = [
    "Local LLM Hosting", "RAG Chatbots", "Research Workflows",
    "Academic Intelligence", "Docker Orchestration", "n8n Automation",
    "Private AI Infrastructure", "Zero-Cost AI Pipelines",
  ];

  const FILTERS = ["All","AI/ML","SaaS","Local AI","Health AI","Privacy","Blockchain","IoT"];

  /* ============================================================
     PROJECTS — HOW TO ADD A NEW PROJECT:
     Copy one block below, paste it at the end of the array,
     and fill in your details. The site updates automatically.

     Fields:
       title   — project name
       cat     — short category label shown on the card
       cats    — array of filter tags (must match FILTERS above)
       status  — ["live"|"building"|"done"|"ongoing", "Label text"]
       desc    — one-paragraph description
       points  — bullet points (4 items ideal)
       tags    — tech stack tags
       links   — [["Button label", "https://url", "link"|"github"], ...]
     ============================================================ */
  const PROJECTS = [
    {
      title: "CREDA — AI-Powered Candidate Verification",
      cat: "SaaS / AI Verification",
      cats: ["SaaS","AI/ML"],
      status: ["live","Live"],
      desc: "A full-stack SaaS platform for candidate verification using AI-driven authenticity scoring, STAR-method evaluation, GitHub repository analysis, anti-cheat detection, and multi-LLM fallback systems.",
      points: [
        "Tiered LLM fallback: Gemini Flash-Lite → GPT-4o-mini → Claude 3.5",
        "SpendGuard enforces daily AI spend caps per provider",
        "Generates interview questions from GitHub repos & commit history",
        "Paste detection, typing-speed analysis & prompt-injection defence",
      ],
      tags: ["React 19","Node.js","Supabase","Redis/BullMQ","LLMs","SaaS"],
      links: [["Visit","https://www.trycreda.app","link"]],
    },
    {
      title: "Stress Detection System",
      cat: "Computer Vision / Research",
      cats: ["AI/ML"],
      status: ["done","Completed"],
      desc: "A real-time, webcam-based stress detection system combining facial landmarks, rPPG/POS heart-rate estimation, HRV features, and Random Forest classification for hardware-free physiological stress inference.",
      points: [
        "MediaPipe 68-point facial landmarks",
        "rPPG/POS heart-rate & HRV estimation",
        "Multi-signal fusion: expression + action units + physiology",
        "Co-authored an IEEE-format review paper at BNMIT",
      ],
      tags: ["Python","MediaPipe","rPPG","Random Forest","CV"],
      links: [["GitHub","https://github.com/SheeshDarth/Stress-Detection-System","github"]],
    },
    {
      title: "NirmiqResearchOS",
      cat: "Local AI / Infrastructure",
      cats: ["Local AI","AI/ML"],
      status: ["building","Actively Building"],
      desc: "A local-first AI research infrastructure on an RTX 4050 machine for private LLM hosting, RAG chatbots, multi-agent research workflows, content generation, and workflow automation.",
      points: [
        "Ollama for private local LLM hosting",
        "n8n for visual workflow automation",
        "Docker orchestration + Tailscale zero-trust access",
        "Inference backend for the AGION Wellness Platform",
      ],
      tags: ["Ollama","Docker","n8n","Tailscale","RAG","Automation"],
      links: [["GitHub","https://github.com/SheeshDarth/NirmiqResearchOS","github"]],
    },
    {
      title: "AGION Wellness Platform",
      cat: "Health AI / Edge AI / RAG",
      cats: ["Health AI","AI/ML"],
      status: ["done","Prototype"],
      desc: "An AI-powered wellness platform with LLM-driven personalised health insights and RAG-based knowledge retrieval — a Flutter mobile frontend connected to the NirmiqResearchOS on-premise inference backend.",
      points: [
        "Built for B2B wellness deployment",
        "Mobile experience + local AI inference",
        "RAG-based knowledge retrieval",
        "Privacy-conscious AI health assistance",
      ],
      tags: ["Flutter","RAG","LLM","Health AI","Edge AI","B2B"],
      links: [["GitHub","https://github.com/SheeshDarth/AGION","github"]],
    },
    {
      title: "Project Aarna — Blue Carbon MRV",
      cat: "Blockchain / IoT / Climate Tech",
      cats: ["Blockchain","IoT"],
      status: ["ongoing","Ongoing"],
      desc: "A blue-carbon MRV system using blockchain smart contracts and IoT sensors for verified environmental impact tracking and carbon-credit issuance.",
      points: [
        "Blockchain-based verification layer",
        "IoT sensors for environmental data collection",
        "Focus: blue carbon, MRV & carbon credits",
      ],
      tags: ["Blockchain","IoT","Climate Tech","Smart Contracts","MRV"],
      links: [
        ["Visit","https://project-aarna-web.vercel.app","link"],
        ["GitHub","https://github.com/SheeshDarth/project-aarna","github"],
      ],
    },
    {
      title: "Trust Layer — Privacy Risk Analyser",
      cat: "Privacy Tech / Chrome Extension",
      cats: ["Privacy"],
      status: ["done","Completed"],
      desc: "An AI-powered Chrome extension and web app that analyses website privacy policies in real time and scores privacy risk from 1 to 10.",
      points: [
        "Express API backend",
        "LLM calls analyse privacy policies",
        "Turns complex policies into clear risk scores",
      ],
      tags: ["Privacy Tech","Chrome Extension","Express API","LLM"],
      links: [["GitHub","https://github.com/SheeshDarth","github"]],
    },
  ];

  const SKILLS = [
    ["code",   "Programming & Web",           ["Python","Java","C","HTML","CSS","JavaScript","PHP","MySQL","API Integration","Firebase","Git"]],
    ["brain",  "AI/ML & Research",            ["Scikit-learn","RapidMiner","TensorFlow","PyTorch","LLM Workflows","RAG Pipelines","Computer Vision","Research Implementation","Stress Detection"]],
    ["server", "Infrastructure & Automation", ["Docker","Ollama","n8n","Tailscale","Local LLM Hosting","Workflow Automation","No-code Platforms","AI Pipelines"]],
    ["blocks", "IoT & Blockchain",            ["Arduino IDE","Tinkercad","Blynk","IoT Sensors","Blockchain","Smart Contracts","Impact Tracking"]],
    ["user",   "Professional",                ["Problem Solving","Critical Thinking","Analytical Reasoning","Team Collaboration","Project Management","Adaptability","Research & Implementation"]],
  ];

  const SERVICES = [
    ["flow",   "AI Automation Systems",       "Building AI-powered workflows, automation pipelines, and tool integrations for businesses, students, and creators."],
    ["brain",  "AI/ML Project Development",   "Developing ML prototypes, research projects, classification systems, computer-vision workflows, and AI-powered applications."],
    ["layout", "Full-Stack SaaS MVPs",        "Creating MVPs and SaaS platforms using modern frontend, backend, database, and AI-integration stacks."],
    ["server", "Local-First AI / RAG",        "Designing private AI systems for document intelligence, research workflows, local LLMs, and academic assistants."],
    ["shield", "Privacy & Trust Tools",       "Building tools that help users understand privacy risks, policies, and digital trust signals."],
    ["blocks", "IoT + Blockchain Prototypes", "Developing experimental systems that combine IoT data, blockchain verification, and impact tracking."],
  ];

  /* ---- Render helpers ---- */

  function renderBuild() {
    const h = $("#buildList"); if (!h) return;
    BUILD.forEach(([ic, label]) => {
      h.appendChild(el("div", "build-item", `<span class="ic">${icon(ic)}</span><span>${label}</span>`));
    });
  }

  function renderFocusChips() {
    const h = $("#focusChips"); if (!h) return;
    FOCUS_CHIPS.forEach((c) => h.appendChild(el("span", "chip", c)));
  }

  function projCard(p, featured) {
    const card = el("article", "card proj reveal" + (featured ? " featured" : ""));
    card.dataset.cats = p.cats.join(",");
    const points = p.points.map((x) => `<li>${x}</li>`).join("");
    const tags   = p.tags.map((t) => `<span class="t">${t}</span>`).join("");
    const links  = p.links.map(([label, href, kind]) =>
      `<a class="btn btn-sm ${kind === "link" ? "btn-primary" : "btn-ghost"}" href="${href}" target="_blank" rel="noopener">${kind === "github" ? icon("github") : icon("link")}${label}</a>`
    ).join("");
    card.innerHTML = `
      <div class="proj-body">
        <div class="proj-top">
          <span class="proj-cat">${p.cat}</span>
          <span class="proj-status ${p.status[0]}"><span class="d"></span>${p.status[1]}</span>
        </div>
        <h3>${p.title}</h3>
        <p class="pdesc">${p.desc}</p>
        <ul>${points}</ul>
        <div class="proj-tags">${tags}</div>
        <div class="proj-links">${links}</div>
      </div>`;
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
    });
    return card;
  }

  function renderProjects(filter = "All") {
    const grid = $("#projGrid"); if (!grid) return;
    grid.innerHTML = "";
    const filtered = PROJECTS.filter((p) => filter === "All" || p.cats.includes(filter));
    filtered.forEach((p, i) => {
      const c = projCard(p, i === 0);
      c.classList.add("d" + ((i % 4) + 1));
      grid.appendChild(c);
      requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add("in")));
    });
  }

  function renderFilters() {
    const h = $("#filters"); if (!h) return;
    FILTERS.forEach((f, i) => {
      const b = el("button", "filter" + (i === 0 ? " active" : ""), f);
      b.addEventListener("click", () => {
        $$(".filter", h).forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        renderProjects(f);
      });
      h.appendChild(b);
    });
  }

  function renderSkills() {
    const h = $("#skillsGrid"); if (!h) return;
    SKILLS.forEach(([ic, title, items], i) => {
      const tags = items.map((s) => `<span class="st">${s}</span>`).join("");
      h.appendChild(el("div", "card skill-card reveal d" + ((i % 3) + 1),
        `<div class="sc-head"><span class="sc-ic">${icon(ic)}</span><h3>${title}</h3></div><div class="skill-tags">${tags}</div>`));
    });
  }

  function renderServices() {
    const h = $("#svcGrid"); if (!h) return;
    SERVICES.forEach(([ic, title, desc], i) => {
      h.appendChild(el("div", "card svc-card reveal d" + ((i % 3) + 1),
        `<span class="svc-num">0${i + 1}</span><span class="svc-ic">${icon(ic)}</span><h3>${title}</h3><p>${desc}</p>`));
    });
  }

  /* ---- Nav ---- */
  function initNav() {
    const nav = $("#nav");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ham = $("#hamburger"), menu = $("#mobileMenu"), hamIcon = $("#hamIcon");
    const setMenu = (open) => {
      menu.classList.toggle("open", open);
      ham.setAttribute("aria-expanded", String(open));
      hamIcon.innerHTML = `<use href="#i-${open ? "x" : "menu"}"/>`;
    };
    ham.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
    $$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

    const links = $$("#navLinks a");
    const map = {};
    links.forEach((a) => { const id = a.getAttribute("href").slice(1); map[id] = a; });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          (map[e.target.id] || map[e.target.dataset.spy])?.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
    const focus = $("#focus"); if (focus) focus.dataset.spy = "projects";
  }

  /* ---- Scroll reveal ---- */
  function initReveal() {
    const vph = window.innerHeight;
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.07 });
    $$(".reveal").forEach((n) => {
      const r = n.getBoundingClientRect();
      // Elements already in the viewport get .in immediately — no flash
      if (r.top < vph && r.bottom > 0) { n.classList.add("in"); }
      else { obs.observe(n); }
    });
  }

  /* ---- Contact form (connect to EmailJS / Formspree for real delivery) ---- */
  function initForm() {
    const form = $("#contactForm"); if (!form) return;
    const status = $("#formStatus");
    const fields = { name: $("#f-name"), email: $("#f-email"), subject: $("#f-subject"), message: $("#f-message") };
    const setErr = (input, msg) => {
      const field = input.closest(".field");
      field.classList.toggle("invalid", !!msg);
      $(".err", field).textContent = msg || "";
    };
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validate = () => {
      let ok = true;
      if (!fields.name.value.trim())                      { setErr(fields.name, "Please enter your name."); ok = false; }    else setErr(fields.name, "");
      if (!emailRe.test(fields.email.value.trim()))       { setErr(fields.email, "Enter a valid email."); ok = false; }      else setErr(fields.email, "");
      if (!fields.subject.value.trim())                   { setErr(fields.subject, "Add a subject."); ok = false; }          else setErr(fields.subject, "");
      if (fields.message.value.trim().length < 10)        { setErr(fields.message, "Message too short (10+ chars)."); ok = false; } else setErr(fields.message, "");
      return ok;
    };
    Object.values(fields).forEach((f) => f.addEventListener("input", () => {
      if (f.closest(".field").classList.contains("invalid")) validate();
    }));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.className = "form-status";
      if (!validate()) { status.classList.add("show","bad"); status.textContent = "Fix the highlighted fields and try again."; return; }
      const btn = $("#submitBtn");
      btn.disabled = true; btn.style.opacity = ".6"; btn.innerHTML = "Sending…";
      setTimeout(() => {
        status.classList.add("show","ok");
        status.innerHTML = `<svg><use href="#i-spark"/></svg>Thanks ${fields.name.value.trim().split(" ")[0]}! I'll get back to you at ${fields.email.value.trim()}.`;
        form.reset();
        btn.disabled = false; btn.style.opacity = ""; btn.innerHTML = 'Send Message <svg><use href="#i-arrow"/></svg>';
      }, 900);
    });
  }

  /* ---- Back to top ---- */
  function initTop() {
    const b = $("#toTop"); if (!b) return;
    b.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---- Init ---- */
  function init() {
    renderBuild();
    renderFocusChips();
    renderFilters();
    renderProjects("All");
    renderSkills();
    renderServices();
    initNav();
    initReveal();
    initForm();
    initTop();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
