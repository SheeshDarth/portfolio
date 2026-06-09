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
    ["doc",     "Research & academic intelligence tools"],
    ["layout",  "Full-stack SaaS platforms"],
    ["flow",    "AI automation workflows"],
    ["shield",  "Privacy & trust tools"],
    ["heart",   "Health & mental wellness AI platforms"],
    ["blocks",  "IoT & blockchain systems"],
    ["brain",   "EdTech & learning intelligence"],
  ];

  const FOCUS_CHIPS = [
    "Offline-First Academic AI", "Hybrid Retrieval (BM25 + Chroma)", "Evidence Trails & Citations",
    "10 Study Modes", "FastAPI + Next.js Workspace", "Ollama Local Generation",
    "Retrieval Profiles (fast / balanced / precision)", "Local PDF & Document Ingestion",
  ];

  const FILTERS = ["All","AI/ML","SaaS","Local AI","Health AI","Privacy","Blockchain","IoT","EdTech","Medical AI"];

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
      img: "assets/projects/creda/cover.jpg",
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
      img: "assets/projects/stress-detection/cover.jpg",
    },
    {
      title: "NirmiqResearchOS — Academic Intelligence System",
      cat: "Local AI / Academic Intelligence",
      cats: ["Local AI","AI/ML","EdTech"],
      status: ["building","Actively Building"],
      desc: "An offline-first, privacy-conscious academic intelligence system with a FastAPI backend, custom Next.js study workspace, and hybrid BM25 + Chroma vector retrieval. Runs entirely on local hardware via Ollama with zero cloud dependency.",
      points: [
        "Hybrid retrieval: BM25 + Chroma vector store + RRF reranking with configurable retrieval profiles (fast / balanced / precision)",
        "10 study modes: research, exam answer, revision notes, compare concepts, important questions, research paper, and more",
        "Custom Next.js workspace with Study Thread, Evidence Trail, Citation Jump Links, Compare, and Eval panels",
        "ChatGPT-style PDF/text/markdown/image upload with content-hash page caching and Ollama local generation",
      ],
      tags: ["Python","FastAPI","Next.js","SQLite","Chroma","BM25","Ollama","Local AI"],
      links: [["GitHub","https://github.com/SheeshDarth/NirmiqResearchOS","github"]],
      img: "assets/projects/nirmiq-ais/cover.jpg",
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
      img: "assets/projects/agion/cover.jpg",
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
      img: "assets/projects/project-aarna/cover.jpg",
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
      img: "assets/projects/trust-layer/cover.jpg",
    },
    {
      title: "Anonthera — Anonymous Mental Health Platform",
      cat: "Health AI / Mental Wellness",
      cats: ["Health AI","AI/ML"],
      status: ["done","Completed"],
      desc: "An anonymous mental health support platform built specifically for Indian students aged 15–21, combining AI companionship, peer matching, and verified helpline resources with a strong emphasis on privacy and safety.",
      points: [
        "AI companion powered by Google Gemini for anonymous, judgment-free conversations",
        "Struggle-based peer matching — connects users anonymously with others facing similar challenges",
        "Multilingual support: English, Hindi, Tamil, Telugu, and Kannada",
        "Content filtering, 30-minute session timeouts, and user reporting for platform safety",
      ],
      tags: ["React","Vite","Firebase","Gemini API","Framer Motion","Mental Health"],
      links: [["GitHub","https://github.com/SheeshDarth/Anonthera","github"]],
      img: "assets/projects/anonthera/cover.jpg",
    },
    {
      title: "PayGuard DQ — Payment Data Quality System",
      cat: "AI/ML / FinTech / Data Quality",
      cats: ["AI/ML","SaaS"],
      status: ["done","Completed"],
      desc: "A seven-agent automated data quality assessment system for payment transaction datasets. Analyses data across completeness, uniqueness, validity, consistency, timeliness, integrity, and reconciliation dimensions without storing raw transaction data.",
      points: [
        "Seven specialised agents: profiler → validator → scorer → explainer → remediator → test-exporter",
        "Composite quality scores (0–100) with dimension breakdowns and severity-rated issue lists",
        "Generates exportable test suites and prioritised remediation recommendations",
        "Privacy-first: raw transaction data is never persisted — only metadata, scores, and aggregates",
      ],
      tags: ["Python","FastAPI","Next.js","TypeScript","Docker","Recharts","Multi-Agent"],
      links: [["GitHub","https://github.com/SheeshDarth/PayGuard-DQ","github"]],
      img: "assets/projects/payguard-dq/cover.jpg",
    },
    {
      title: "NirmiqEcho — Offline Voice-to-Text",
      cat: "Privacy / Local AI / Desktop",
      cats: ["Privacy","Local AI"],
      status: ["done","Completed"],
      desc: "A 100% offline, privacy-first voice-to-text desktop application for Windows using OpenAI Whisper locally. Zero network calls, auto-GPU detection, and real-time transcription injected directly into any active window.",
      points: [
        "Fully offline: Whisper medium (CPU) or large-v3 (GPU) — no internet, no accounts, no telemetry",
        "WebRTC VAD for low-latency Voice Activity Detection and streaming transcription",
        "Auto-typing: injects transcribed text directly into whichever window is active",
        "Global F9 hotkey toggle with a compact always-on-top Tkinter UI",
      ],
      tags: ["Python","faster-whisper","WebRTC VAD","pyautogui","CUDA","Tkinter","Privacy"],
      links: [["GitHub","https://github.com/SheeshDarth/NirmiqEcho","github"]],
      img: "assets/projects/nirmiq-echo/cover.jpg",
    },
    {
      title: "NirmiqLearnOS — Personal Learning OS",
      cat: "EdTech / Local AI",
      cats: ["EdTech","Local AI"],
      status: ["building","Actively Building"],
      desc: "A local-first learning operating system for engineering students who build AI-assisted projects but want to preserve deep understanding. Converts any project, codebase, document, or topic into a structured learning path.",
      points: [
        "Project Ingestion + Codebase Understanding — parses and explains any codebase you've vibe-coded",
        "Explain-Back Mode: proves understanding by forcing the user to narrate code and concepts back",
        "DSA + Analytical Thinking Trainer integrated alongside exam and interview prep modules",
        "Local Notes + Memory and a Learning Graph that visualises skill connections over time",
      ],
      tags: ["TypeScript","Next.js","SQLite","Drizzle ORM","Tailwind","Local AI","EdTech"],
      links: [["GitHub","https://github.com/SheeshDarth/NirmiqLearnOS","github"]],
      img: "assets/projects/nirmiq-learnos/cover.jpg",
    },
    {
      title: "SmartHelm — AI Drowsiness Detection for Riders",
      cat: "Edge AI / IoT / Rider Safety",
      cats: ["AI/ML","IoT","Health AI"],
      status: ["done","Completed"],
      desc: "An AI-powered drowsiness detection system for motorcycle delivery riders combining edge-only MediaPipe eye analysis with multi-sensor physiological monitoring. Raw video never leaves the device — only 180×72 px eye crops and metadata are transmitted.",
      points: [
        "Edge-only AI: MediaPipe FaceLandmarker runs entirely on-device — privacy-first, zero raw video upload",
        "Multi-sensor fusion: eye-closure detection + heart rate & SpO2 via MAX30102 on Raspberry Pi",
        "Multi-platform: Raspberry Pi 4 helmet unit, Kotlin Android rider app, web-based fleet dashboard",
        "Automatic alerting: on-device GPIO buzzer + real-time SMS notifications via MSG91 API",
      ],
      tags: ["Python","Flask","MediaPipe","Raspberry Pi","Firebase","Kotlin","Android","Edge AI","IoT"],
      links: [["GitHub","https://github.com/SheeshDarth/SmartHelm","github"]],
      img: "assets/projects/smart-helm/cover.jpg",
    },
    {
      title: "Automated Brain Tumour Detection",
      cat: "Medical AI / Deep Learning",
      cats: ["AI/ML","Medical AI"],
      status: ["done","Completed"],
      desc: "A collaborative deep learning system that classifies brain MRI scans into four categories (glioma, meningioma, no tumour, pituitary) using a hybrid ResNet50 CNN + Vision Transformer pipeline, achieving 98.95% accuracy and 99.92% ROC-AUC on 5-fold cross-validation.",
      points: [
        "Hybrid CNN+ViT: ResNet50 extracts spatial features fed into a 6-layer Vision Transformer with 8 attention heads",
        "98.95% accuracy · 99.92% ROC-AUC on 5-fold cross-validation — with optional radiomics fusion branch",
        "Grad-CAM spatial attribution overlays for model explainability and clinical interpretability",
        "Model published on HuggingFace (Zorrojurro/brain-tumor-cnn-vit); Gradio web UI for local inference",
      ],
      tags: ["PyTorch","ResNet50","Vision Transformer","Grad-CAM","Medical AI","HuggingFace","Python"],
      links: [
        ["HuggingFace","https://huggingface.co/Zorrojurro/brain-tumor-cnn-vit","link"],
        ["GitHub","https://github.com/SheeshDarth/Automated-Brain-Tumour-Detection","github"],
      ],
      img: "assets/projects/brain-tumour/cover.jpg",
    },
  ];

  const SKILLS = [
    ["code",   "Programming & Web",           ["Python","Java","C","TypeScript","JavaScript","HTML","CSS","PHP","MySQL","Next.js","React","FastAPI","Firebase","Git"]],
    ["brain",  "AI/ML & Research",            ["Scikit-learn","TensorFlow","PyTorch","Whisper","LLM Workflows","RAG Pipelines","BM25","Chroma","Hybrid Retrieval","Computer Vision","Stress Detection","Multi-Agent Systems"]],
    ["server", "Infrastructure & Automation", ["Docker","Ollama","n8n","Tailscale","SQLite","Drizzle ORM","Local LLM Hosting","Workflow Automation","AI Pipelines","Self-hosted AI"]],
    ["blocks", "IoT & Blockchain",            ["Arduino IDE","Tinkercad","Blynk","IoT Sensors","Blockchain","Smart Contracts","Impact Tracking","MRV Systems"]],
    ["user",   "Professional",                ["Problem Solving","Critical Thinking","Analytical Reasoning","Team Collaboration","Project Management","Adaptability","Research & Implementation","Technical Writing"]],
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
    const imgHtml = p.img
      ? `<div class="proj-img"><img src="${p.img}" alt="${p.title} preview" loading="lazy" onerror="this.closest('.proj-img').style.display='none'" /></div>`
      : "";
    card.innerHTML = `${imgHtml}
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
