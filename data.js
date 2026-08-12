/* ============================================================
   Siddharth P — Shared site data (single source of truth)

   Loaded two ways:
     1. Browser  — <script src="data.js"> sets window.SITE_DATA,
                   consumed by app.js to render the page.
     2. Node     — api/chat.js does require('../data.js') to ground
                   the agent's answers in the SAME data the page shows.

   Edit this file to update your portfolio content — both the page
   and the agent stay in sync automatically. Do not fork this data
   into app.js or api/chat.js.
   ============================================================ */
"use strict";

const SITE_DATA = {

  PERSON: {
    name: "Siddharth P",
    location: "Bengaluru, Karnataka, India",
    email: "siddharthprashoo@gmail.com",
    phone: "+91 74835 57950",
    github: "https://github.com/SheeshDarth",
    linkedin: "https://linkedin.com/in/siddharth-p-7bb185285/",
    resumeUrl: "assets/Siddharth-P-Resume.pdf",
  },

  ABOUT: [
    "I'm an AI & Machine Learning engineering student at BNM Institute of Technology, and I build practical AI systems end-to-end. My work spans LLM fine-tuning dataset forensics, explainable space mission-assurance, AI-powered candidate verification, medical imaging with Vision Transformers, offline academic intelligence, anonymous mental-wellness platforms, edge-AI rider safety, payment data quality, local voice AI, privacy tools, and blockchain-based environmental impact tracking.",
    "I like taking a hard research problem all the way to something real people can use — combining models, automation, full-stack development, local LLMs, and infrastructure into products that are practical, scalable, and meaningful.",
  ],

  EDUCATION: [
    { degree: "B.E. — Artificial Intelligence & Machine Learning", org: "BNM Institute of Technology", time: "2023 – 2027 (current)" },
    { degree: "Pre-University · PCMC", org: "Sri Chaithanya PU College", time: "2021 – 2023" },
    { degree: "ICSE", org: "Sri Vani Education Centre", time: "2021" },
  ],

  EXPERIENCE: [
    {
      role: "AI/ML Intern",
      org: "Equvinoxis Pvt Ltd",
      time: "June 2025 – July 2025",
      points: [
        "Researched stress faced by pilots during long flight durations and the consequences of prolonged aviation stress.",
        "Worked in the human-lab sector on stress detection in pilots using facial analysis.",
        "Explored AI-based facial analysis methods for detecting stress-related patterns.",
      ],
    },
  ],

  BUILD: [
    ["server",  "Local-first AI systems"],
    ["doc",     "Research & academic intelligence tools"],
    ["layout",  "Full-stack SaaS platforms"],
    ["flow",    "AI automation workflows"],
    ["shield",  "Privacy & trust tools"],
    ["heart",   "Health & mental wellness AI platforms"],
    ["blocks",  "IoT & blockchain systems"],
    ["brain",   "EdTech & learning intelligence"],
  ],

  FOCUS_CHIPS: [
    "Offline-First Academic AI", "Hybrid Retrieval (BM25 + Chroma)", "Evidence Trails & Citations",
    "10 Study Modes", "FastAPI + Next.js Workspace", "Ollama Local Generation",
    "Retrieval Profiles (fast / balanced / precision)", "Local PDF & Document Ingestion",
  ],

  FILTERS: ["All","AI/ML","SaaS","Local AI","Health AI","Privacy","Blockchain","IoT","EdTech","Medical AI"],

  PROJECTS: [
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
      title: "OriginX-T — LLM Fine-Tuning Dataset Forensics",
      cat: "AI/ML · LLM Safety · Capstone",
      cats: ["AI/ML"],
      status: ["building","Capstone · Building"],
      desc: "A time-aware early-warning system that predicts whether a dataset will damage a language model — before the fine-tuning damage becomes visible. It audits data for synthetic, recursive, paraphrased, and benchmark-leaked contamination, then flags high-risk datasets ahead of training.",
      points: [
        "Three-stage pipeline: controlled contamination generation → multi-signal feature extraction → calibrated risk classification",
        "Features span lexical, entropy, perplexity, semantic and representational (TransformerLens) signals",
        "Split-conformal guarantees (MAPIE), discrete-time survival analysis, and Shapley causal attribution",
        "ORIGIN-T-Bench benchmark + degradation curves that trace model-collapse trajectories",
      ],
      tags: ["Python","PyTorch","HuggingFace","PEFT / LoRA","scikit-learn","SHAP","Conformal Prediction","MLflow"],
      links: [["GitHub","https://github.com/SheeshDarth/OriginX-T","github"]],
    },
    {
      title: "VyomaGuard PHM — Space Mission Assurance",
      cat: "AI/ML · Aerospace · Explainable AI",
      cats: ["AI/ML"],
      status: ["building","Actively Building"],
      desc: "An explainable mission-assurance prototype that fuses orbit-collision risk ranking with satellite telemetry anomaly detection into deterministic operator triage — turning conjunction data messages and telemetry into auditable GREEN / AMBER / RED / INSUFFICIENT_DATA assessments.",
      points: [
        "Orbit risk via a logistic-regression baseline ranked against ESA log-risk targets, with heuristic fallback",
        "Telemetry anomaly detection: robust rolling statistics + optional Isolation Forest (OPS-SAT-AD holdout eval)",
        "Deterministic mission-policy layer fuses cross-domain evidence through fully auditable rule traces",
        "Typed Pydantic contracts, INSUFFICIENT_DATA as a first-class outcome, and a four-view Streamlit ops dashboard",
      ],
      tags: ["Python","scikit-learn","Pydantic","Streamlit","Isolation Forest","pytest","Explainable AI"],
      links: [["GitHub","https://github.com/SheeshDarth/vyomaguard-phm","github"]],
    },
    {
      title: "Vibecode Orchestrator — Skill Router for Claude Code",
      cat: "AI Agents · Dev Tooling · Claude Code",
      cats: ["AI/ML"],
      status: ["done","Released"],
      desc: "A meta-skill that reads intent and decides which of 100+ Claude Code skills to load — intent-based routing with per-lane arbitration so a large skill library stays fast and never collides.",
      points: [
        "Scores candidate skills on verb / surface / phase / stack match minus an overlap penalty, then caps concurrency",
        "Per-lane arbitration picks one winner per lane (ui, testing, verification, research…) and drops the rest",
        "Progressive disclosure — routes from descriptions, loads skill bodies last, and replans after each step",
        "Published as an open Claude Code skill for large agent skill libraries",
      ],
      tags: ["Claude Code","AI Agents","Orchestration","Prompt Engineering","Skills"],
      links: [["GitHub","https://github.com/SheeshDarth/vibecode-orchestrator","github"]],
    },
    {
      title: "Skylark BI Agent — Conversational monday.com Analytics",
      cat: "AI Agents · Business Intelligence",
      cats: ["AI/ML","SaaS"],
      status: ["done","Completed"],
      desc: "A conversational BI app that answers founder-level questions about monday.com boards — fetching live data over GraphQL, computing analytics server-side, and generating executive summaries with Gemini. Built for a Skylark Drones assignment.",
      points: [
        "Live querying of Deal-tracker and Work-Order boards via the monday.com GraphQL API — no cached data",
        "Deterministic analytics computed server-side; raw board data is never shipped to the model",
        "Streamed conversational answers with explicit caveats and exclusions",
        "Next.js + TypeScript, Gemini, Vercel-ready, with a documented decision log",
      ],
      tags: ["Next.js","TypeScript","monday.com GraphQL","Gemini","BI","Vercel"],
      links: [["GitHub","https://github.com/SheeshDarth/skylark-monday-bi-agent","github"]],
    },
    {
      title: "Skylark Inference Pipeline — Bounded-Memory GCP",
      cat: "ML Infrastructure · GCP · Data",
      cats: ["AI/ML"],
      status: ["done","Completed"],
      desc: "A manifest-driven, bounded-memory model-inference pipeline on Google Cloud, engineered to run inference within strict memory limits. Built for a Skylark Drones assignment.",
      points: [
        "Manifest-driven — inference stages are configured declaratively",
        "Bounded-memory by design: runs large workloads within strict memory budgets",
        "Targets Google Cloud Platform deployment",
        "Python ML-inference and data-pipeline engineering",
      ],
      tags: ["Python","GCP","ML Inference","Data Pipelines","Bounded Memory"],
      links: [["GitHub","https://github.com/SheeshDarth/skylark-gcp-inference-pipeline","github"]],
    },
    {
      title: "Stress Detection System",
      cat: "Computer Vision / Research",
      cats: ["AI/ML"],
      status: ["done","Completed"],
      desc: "A real-time, webcam-based stress detection system combining facial landmarks, rPPG/POS heart-rate estimation, HRV features, and a Random Forest + ExtraTrees ensemble for hardware-free physiological stress inference (98.5% accuracy, 5-fold CV).",
      points: [
        "MediaPipe 468-point facial landmarks, 11-D behavioral + physiological feature fusion",
        "rPPG/POS heart-rate & HRV estimation with CHROM fallback and Kalman-filtered BPM",
        "Full ablation study, baselines, and statistical significance testing",
        "Co-authored an IEEE-format review paper at BNMIT",
      ],
      tags: ["Python","MediaPipe","rPPG","Random Forest","CV"],
      links: [["GitHub","https://github.com/SheeshDarth/Stress-Detection-System","github"]],
    },
    {
      title: "NirmiqResearchOS — Academic Intelligence System",
      cat: "Local AI / Academic Intelligence",
      cats: ["Local AI","AI/ML","EdTech"],
      status: ["building","Actively Building"],
      desc: "An offline-first, privacy-conscious academic intelligence system with a FastAPI backend, custom Next.js study workspace, and hybrid BM25 + Chroma vector retrieval. Runs entirely on local hardware via Ollama with zero cloud dependency.",
      points: [
        "Hybrid retrieval: BM25 + Chroma vector store + RRF reranking with configurable retrieval profiles (fast / balanced / precision)",
        "10 study modes plus dedicated Paper Lab & Exam Lab — deep research, exam answers, revision notes, concept compare, and more",
        "Custom Next.js workspace with Study Thread, Evidence Trail, Citation Jump Links, Compare, and Eval panels",
        "ChatGPT-style PDF/text/markdown/image upload with content-hash page caching and Ollama local generation",
      ],
      tags: ["Python","FastAPI","Next.js","SQLite","Chroma","BM25","Ollama","Local AI"],
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
      desc: "A decentralized MRV (Measurement, Reporting & Verification) platform for India's blue carbon ecosystems, built on Algorand. Takes a blue-carbon restoration project from submission to on-chain carbon-credit issuance — fully auditable, no intermediaries.",
      points: [
        "ARC-4 smart contract (AlgoPy/Puya) manages admin, validator & developer roles on-chain",
        "AARNA token — a native Algorand Standard Asset minted via inner transactions on approval",
        "On-chain marketplace: list, escrow (clawback) & buy carbon credits in ALGO",
        "IPFS-backed evidence trail; built for India's 7,500km coastline mangrove restoration",
      ],
      tags: ["Algorand","AlgoPy","Puya","React","TypeScript","Smart Contracts","IPFS"],
      links: [
        ["Visit","https://project-aarna.netlify.app","link"],
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
    },
    {
      title: "NirmiqEcho — Offline JARVIS-Style Voice Assistant",
      cat: "Privacy / Local AI / Desktop",
      cats: ["Privacy","Local AI"],
      status: ["done","Completed"],
      desc: "A 100% offline, JARVIS-style voice assistant for Windows that pairs hands-free command control with Wispr-Flow-style dictation — all processed on-device via faster-whisper. It opens apps, sends WhatsApp messages, plays music, finds files, and manages system settings without a single network call.",
      points: [
        "Hybrid intelligence: fast offline pattern matching for ~90 built-in commands + optional local Ollama LLM fallback",
        "Wispr-Flow-style dictation injected straight into any active window; self-healing mic with auto-unmute",
        "Hardened OS automation: whitelist validation, no shell execution, destructive actions need confirmation",
        "System-tray app with F9 hotkey or 'Hello Echo' wake word; GPU/CPU auto-selection for Whisper",
      ],
      tags: ["Python","faster-whisper","Ollama","Windows","System Tray","Privacy","Voice AI"],
      links: [["GitHub","https://github.com/SheeshDarth/NirmiqEcho","github"]],
    },
    {
      title: "NirmiqCodeSensei — Local Learning OS for Engineers",
      cat: "EdTech / Local AI / Dev Tools",
      cats: ["EdTech","Local AI"],
      status: ["building","Actively Building"],
      desc: "A local-first learning OS that turns any codebase — a local folder or a GitHub URL — into deep engineering understanding, entirely offline. Import a repo and get a senior-grade review, an interactive architecture map, code-grounded DSA, and explain-back questions that prove you actually understand what you built.",
      points: [
        "Deep Review: eight-lens analysis (security, testing, code health, architecture, frontend, backend, dependencies, feasibility) graded A–F with file:line findings",
        "Learning Map: Obsidian-style force graph of the architecture with hover-highlighting and layer filtering",
        "Code-grounded DSA — real data structures & algorithms pulled from your code, paired with their CS foundations",
        "MCP integration (12 tools) for Claude Code, Cursor & Windsurf; zero telemetry, localhost-only SQLite",
      ],
      tags: ["Next.js 16","React 19","TypeScript","Tailwind 4","SQLite","Drizzle ORM","MCP","Local AI"],
      links: [["GitHub","https://github.com/SheeshDarth/NirmiqCodeSensei","github"]],
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
        "Architecture ablation study: beats CNN-only, ViT-only, and EfficientNet-B0 baselines",
        "Model published on HuggingFace (Zorrojurro/brain-tumor-cnn-vit); Gradio web UI for local inference",
      ],
      tags: ["PyTorch","ResNet50","Vision Transformer","Grad-CAM","Medical AI","HuggingFace","Python"],
      links: [
        ["HuggingFace","https://huggingface.co/Zorrojurro/brain-tumor-cnn-vit","link"],
        ["GitHub","https://github.com/SheeshDarth/Automated-Brain-Tumour-Detection","github"],
      ],
    },
  ],

  SKILLS: [
    ["code",   "Programming & Web",           ["Python","Java","C","TypeScript","JavaScript","HTML","CSS","PHP","MySQL","Next.js","React","FastAPI","Firebase","Git"]],
    ["brain",  "AI/ML & Research",            ["Scikit-learn","TensorFlow","PyTorch","Whisper","LLM Workflows","RAG Pipelines","BM25","Chroma","Hybrid Retrieval","Computer Vision","Vision Transformers","PEFT / LoRA","Anomaly Detection","Model Evaluation","Multi-Agent Systems"]],
    ["server", "Infrastructure & Automation", ["Docker","Ollama","n8n","Tailscale","SQLite","Drizzle ORM","Streamlit","GitHub Actions CI","Local LLM Hosting","Workflow Automation","AI Pipelines","Self-hosted AI"]],
    ["blocks", "IoT & Blockchain",            ["Arduino IDE","Tinkercad","Blynk","IoT Sensors","Blockchain","Smart Contracts","Impact Tracking","MRV Systems"]],
    ["user",   "Professional",                ["Problem Solving","Critical Thinking","Analytical Reasoning","Team Collaboration","Project Management","Adaptability","Research & Implementation","Technical Writing"]],
  ],

  SERVICES: [
    ["flow",   "AI Automation Systems",       "Building AI-powered workflows, automation pipelines, and tool integrations for businesses, students, and creators."],
    ["brain",  "AI/ML Project Development",   "Developing ML prototypes, research projects, classification systems, computer-vision workflows, and AI-powered applications."],
    ["layout", "Full-Stack SaaS MVPs",        "Creating MVPs and SaaS platforms using modern frontend, backend, database, and AI-integration stacks."],
    ["server", "Local-First AI / RAG",        "Designing private AI systems for document intelligence, research workflows, local LLMs, and academic assistants."],
    ["shield", "Privacy & Trust Tools",       "Building tools that help users understand privacy risks, policies, and digital trust signals."],
    ["blocks", "IoT + Blockchain Prototypes", "Developing experimental systems that combine IoT data, blockchain verification, and impact tracking."],
  ],

  HACKATHONS: [
    {
      event: "RIFT '26 Hackathon", org: "PW Institute of Innovation", date: "Feb 2026",
      result: "Semi-Finalist", project: "Project Aarna",
      projectLink: "https://github.com/SheeshDarth/project-aarna",
      certs: [["View Certificate", "assets/certificates/rift26-semifinalist.jpg"]],
    },
    {
      event: "AlgoBharat Hackathon", org: "Algorand Foundation", date: "2026",
      result: "Participant", project: "Project Aarna",
      projectLink: "https://github.com/SheeshDarth/project-aarna",
      certs: [],
    },
    {
      event: "Ideathon 7.0", org: "Inter-College Ideathon", date: "2026",
      result: "Participant", project: "Project Aarna",
      projectLink: "https://github.com/SheeshDarth/project-aarna",
      certs: [["View Certificate", "assets/certificates/ideathon7-participation.pdf"]],
    },
    {
      event: "VISA 24Hr AI Hackathon", org: "Shaastra, IIT Madras", date: "Jan 2026",
      result: "Top 50", project: "PayGuard DQ",
      projectLink: "https://github.com/SheeshDarth/PayGuard-DQ",
      certs: [
        ["Top 50 Certificate", "assets/certificates/visa-top50.pdf"],
        ["Participation Certificate", "assets/certificates/visa-participation.png"],
      ],
    },
  ],

  /* Section ids the page actually has — the agent's scroll_to_section
     action is validated against this list. */
  SECTIONS: ["home","about","projects","hackathons","skills","services","experience","contact"],
};

if (typeof module !== "undefined" && module.exports) module.exports = SITE_DATA;
if (typeof window !== "undefined") window.SITE_DATA = SITE_DATA;
