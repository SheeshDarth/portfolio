"""Build Siddharth P.'s reusable resume and evidence-led detailed CV."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import HRFlowable, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
RESUME_OUTPUT = ROOT / "assets" / "Siddharth-P-Resume.pdf"
CV_OUTPUT = ROOT / "assets" / "Siddharth-P-CV.pdf"

INK = colors.HexColor("#1D2422")
SOFT = colors.HexColor("#424A45")
MUTED = colors.HexColor("#5A615B")
BLUE = colors.HexColor("#244FAE")
ORANGE = colors.HexColor("#A94725")
RULE = colors.HexColor("#CFC9BB")
BLUE_HEX = "#244FAE"
MUTED_HEX = "#5A615B"
ORANGE_HEX = "#A94725"

PORTFOLIO = "https://siddharth-portfolio-ashen.vercel.app/"
GITHUB = "https://github.com/SheeshDarth"
LINKEDIN = "https://www.linkedin.com/in/siddharth-p-7bb185285/"
EMAIL = "mailto:siddharthprashoo@gmail.com"
PHONE = "tel:+917483557950"


class InvariantCanvas(Canvas):
    """Make identical source content produce stable PDFs."""

    def __init__(self, *args, **kwargs):
        kwargs["invariant"] = 1
        super().__init__(*args, **kwargs)


def styles(compact: bool = False) -> dict[str, ParagraphStyle]:
    body_size = 9.35 if compact else 9.1
    body_leading = 12.1 if compact else 11.8
    base = ParagraphStyle(
        "Base", fontName="Helvetica", fontSize=body_size, leading=body_leading,
        textColor=SOFT, alignment=TA_LEFT, spaceAfter=0, allowWidows=0, allowOrphans=0,
    )
    return {
        "base": base,
        "name": ParagraphStyle("Name", parent=base, fontName="Helvetica-Bold", fontSize=23, leading=25, textColor=INK, spaceAfter=1),
        "headline": ParagraphStyle("Headline", parent=base, fontName="Helvetica-Bold", fontSize=10.1, leading=13, textColor=BLUE, spaceAfter=4),
        "contact": ParagraphStyle("Contact", parent=base, fontSize=8.1, leading=10.4, textColor=MUTED, spaceAfter=1),
        "section": ParagraphStyle("Section", parent=base, fontName="Helvetica-Bold", fontSize=9.2, leading=11, textColor=INK, spaceBefore=6.2, spaceAfter=2.7, keepWithNext=True),
        "subsection": ParagraphStyle("Subsection", parent=base, fontName="Helvetica-Bold", fontSize=9, leading=11.1, textColor=INK, spaceBefore=2.8, spaceAfter=0.5, keepWithNext=True),
        "role": ParagraphStyle("Role", parent=base, fontName="Helvetica-Bold", fontSize=9, leading=11.3, textColor=INK, spaceAfter=0.4, keepWithNext=True),
        "item": ParagraphStyle("Item", parent=base, leftIndent=8, firstLineIndent=-8, fontSize=8.85 if compact else 8.7, leading=11.3 if compact else 10.9, spaceAfter=1.1),
        "project": ParagraphStyle("Project", parent=base, fontName="Helvetica-Bold", fontSize=8.9 if compact else 8.8, leading=11.1, textColor=INK, spaceBefore=3.3, spaceAfter=0.6, keepWithNext=True),
        "detail": ParagraphStyle("Detail", parent=base, fontSize=8.65 if compact else 8.6, leading=10.8 if compact else 10.5, spaceAfter=1.1),
        "small": ParagraphStyle("Small", parent=base, fontSize=8.15, leading=10.1, textColor=MUTED, spaceAfter=1),
        "callout": ParagraphStyle("Callout", parent=base, fontSize=8.35, leading=10.6, textColor=SOFT, leftIndent=7, borderColor=ORANGE, borderWidth=0, borderPadding=0, spaceAfter=1.4),
    }


def para(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def document(path: Path, title: str, subject: str, *, tight: bool = False) -> SimpleDocTemplate:
    return SimpleDocTemplate(
        str(path), pagesize=A4,
        rightMargin=14.5 * mm, leftMargin=14.5 * mm,
        topMargin=(11 * mm if tight else 12 * mm), bottomMargin=13 * mm,
        title=title, author="Siddharth P.", subject=subject,
        creator="ReportLab reproducible CV builder",
    )


def header(s: dict[str, ParagraphStyle], *, compact: bool = False) -> list:
    contact = (
        f'<link href="{PHONE}" color="{MUTED_HEX}">+91 74835 57950</link>  |  '
        f'<link href="{EMAIL}" color="{MUTED_HEX}">siddharthprashoo@gmail.com</link>  |  '
        f'<link href="{PORTFOLIO}" color="{BLUE_HEX}">Portfolio</link>  |  '
        f'<link href="{GITHUB}" color="{BLUE_HEX}">GitHub</link>  |  '
        f'<link href="{LINKEDIN}" color="{BLUE_HEX}">LinkedIn</link>'
    )
    story = [
        para("Siddharth P.", s["name"]),
        para("AI Systems Engineer | Agentic AI | Enterprise AI Infrastructure | AI Product Engineering", s["headline"]),
        para(contact, s["contact"]),
    ]
    if not compact:
        story.append(para("Bengaluru, India", s["contact"]))
    story.extend([Spacer(1, 4), HRFlowable(width="100%", thickness=0.8, color=BLUE, spaceBefore=0, spaceAfter=2)])
    return story


def section(label: str, s: dict[str, ParagraphStyle]) -> Paragraph:
    return para(label.upper(), s["section"])


def bullet(text: str, s: dict[str, ParagraphStyle]) -> Paragraph:
    return para(f"- {text}", s["item"])


def project_title(name: str, status: str, url: str | None, s: dict[str, ParagraphStyle]) -> Paragraph:
    label = f'<link href="{url}" color="{BLUE_HEX}">{name}</link>' if url else name
    return para(f"{label}  |  <font color=\"{ORANGE_HEX}\">{status}</font>", s["project"])


def cv_project(name: str, status: str, text: str, stack: str, url: str | None, s: dict[str, ParagraphStyle]) -> KeepTogether:
    link = f' <link href="{url}" color="{BLUE_HEX}">[proof]</link>' if url else ""
    return KeepTogether([
        project_title(name, status, url, s),
        para(f"{text} <font color=\"{MUTED_HEX}\">Technologies: {stack}.</font>{link}", s["detail"]),
    ])


def footer(canvas: Canvas, doc: SimpleDocTemplate) -> None:
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.45)
    canvas.line(doc.leftMargin, 9.5 * mm, A4[0] - doc.rightMargin, 9.5 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 6.3 * mm, "Siddharth P.  |  AI Systems Engineer")
    canvas.drawRightString(A4[0] - doc.rightMargin, 6.3 * mm, f"Detailed CV  |  {canvas.getPageNumber():02d}")
    canvas.restoreState()


def build_resume() -> None:
    s = styles(compact=True)
    story = header(s, compact=True)
    story += [
        section("Summary", s),
        para("AI Systems Engineer focused on agentic applications and enterprise AI workflows, with product engineering across web, mobile, local-first, and edge systems. Builds around clear tool boundaries, human review, evidence, and practical delivery.", s["base"]),
        section("Experience", s),
        para("FDE Intern - Subhanu  |  Current", s["role"]),
        bullet("Working across the Enterprise AI platform (LibreChat and its agents), the KiddyPi app, and a Voice Agent.", s),
        para("AI/ML Intern - Equvinoxis Pvt Ltd  |  Jun 2025 - Jul 2025", s["role"]),
        bullet("Researched non-invasive facial-analysis approaches for pilot stress and fatigue monitoring in a human-lab setting; translated research objectives into practical monitoring workflows.", s),
        section("Selected projects", s),
        cv_project("CREDA", "Shipped", "Skill-verification product documented around project-based interviews, repository context, and shareable skill records.", "Product workflow; public technical stack not asserted", "https://www.trycreda.app/", s),
        cv_project("TrustLayer", "Shipped", "Client-side tool that gives sentence-level trust signals for pasted AI responses and shows the heuristic path behind each label.", "React, Tailwind CSS, Vite", "https://trust-layer-opal.vercel.app/", s),
        cv_project("AARNA", "Team-built testnet", "Blue-carbon MRV hackathon build modeling project submission, evidence review, and testnet credit issuance; individual tasks are not partitioned in available artifacts.", "Algorand, AlgoPy, Puya, IPFS", "https://github.com/SheeshDarth/project-aarna", s),
        cv_project("SmartHelm", "Android app exists; release unverified", "Rider-safety project with an Android app in source and an edge-processing architecture for drowsiness signals.", "Kotlin, Android, MediaPipe, Raspberry Pi, Firebase", "https://github.com/SheeshDarth/SmartHelm", s),
        cv_project("PayGuard-AgentX", "Prototype", "Local-first agent workflow prototype with supervised routing, constrained tools, evidence records, and a human review boundary.", "Python, LangGraph, MCP, SQLite, Chroma", "https://github.com/SheeshDarth/PayGuard-AgentX", s),
        section("Current builds and capstone", s),
        cv_project("OriginX-T", "Active capstone", "Dataset-forensics research with implemented contamination experiments and calibrated risk classification; advanced analyses remain gated.", "Python, PyTorch, PEFT, scikit-learn", "https://github.com/SheeshDarth/OriginX-T", s),
        cv_project("NirmiqCodeSensei", "Active local-first build", "Repository learning and code-grounded practice with architecture mapping and MCP connections.", "TypeScript, Next.js, SQLite, MCP", "https://github.com/SheeshDarth/NirmiqCodeSensei", s),
        cv_project("NirmiqResearchOS", "Active local RAG MVP", "Offline-first academic workspace with retrieval, citations, Paper Lab, and Exam Lab.", "Python, FastAPI, Next.js, SQLite, Chroma", "https://github.com/SheeshDarth/NirmiqResearchOS", s),
        section("Technical skills", s),
        para("<b>Agent systems:</b> MCP, LangGraph, tool workflows, human review, audit evidence  |  <b>AI &amp; retrieval:</b> local LLMs, Ollama, RAG, BM25, Chroma, citations, abstention", s["small"]),
        para("<b>Backend &amp; data:</b> Python, FastAPI, TypeScript, React, Next.js, Node.js, SQLite, PostgreSQL, Firebase  |  <b>Product &amp; delivery:</b> Flutter, Kotlin, Android, Docker, Git, GitHub Actions, CI", s["small"]),
        section("Education", s),
        para("B.E. Artificial Intelligence &amp; Machine Learning - B.N.M. Institute of Technology, Bengaluru  |  2023-2027  |  CGPA 8.61/10", s["role"]),
    ]
    doc = document(RESUME_OUTPUT, "Siddharth P. - AI Systems Engineer Resume", "One-page universal AI systems engineering resume", tight=True)
    doc.build(story, canvasmaker=InvariantCanvas)


def build_cv() -> None:
    s = styles()
    story = header(s)

    # Page 1: profile, verified experience, education, and grouped capabilities.
    story += [
        section("Profile", s),
        para("AI Systems Engineer focused on agentic applications, enterprise AI workflows, and product engineering. Experience and project work span tool-connected systems, human review boundaries, local retrieval, applied ML research, and user-facing web/mobile applications. Project status and attribution are stated at the level supported by available records.", s["base"]),
        section("Experience", s),
        para("FDE Intern - Subhanu  |  Current", s["role"]),
        bullet("Working across the Enterprise AI platform (LibreChat and its agents), the KiddyPi app, and a Voice Agent.", s),
        para("AI/ML Intern - Equvinoxis Pvt Ltd  |  Jun 2025 - Jul 2025", s["role"]),
        bullet("Researched non-invasive facial-analysis approaches for stress and fatigue monitoring in pilots under prolonged aviation-stress conditions, within a human-lab research setting.", s),
        bullet("Translated research objectives into practical monitoring workflows and contributed to the applied-research direction for human-state monitoring.", s),
        section("Education", s),
        para("B.E. Artificial Intelligence &amp; Machine Learning - B.N.M. Institute of Technology, Bengaluru  |  2023-2027  |  CGPA 8.61/10", s["role"]),
        para("Pre-University (PCMC), Sri Chaitanya PU College  |  2021-2023  |  ICSE, Sri Vani Education Centre  |  2021", s["detail"]),
        section("Technical capabilities", s),
        para("<b>Agent &amp; tool systems:</b> MCP, LangGraph, tool workflows, human review, audit evidence  |  <b>AI &amp; retrieval:</b> local LLMs, Ollama, RAG, BM25, Chroma, citations, abstention", s["detail"]),
        para("<b>Backend &amp; data:</b> Python, FastAPI, Flask, TypeScript, React, Next.js, Node.js, SQL, SQLite, PostgreSQL, Firebase, Supabase  |  <b>Product &amp; edge:</b> Flutter, Dart, Kotlin, Android, MediaPipe, Raspberry Pi", s["detail"]),
        para("<b>Delivery &amp; evaluation:</b> Docker, Git, GitHub Actions, CI, pytest, model evaluation, reproducible experiments, privacy-aware and local-first design", s["detail"]),
        section("Engineering themes", s),
        para("Evidence before certainty; explicit human decision boundaries; local execution where control matters; reproducible evaluation with limitations documented.", s["detail"]),
        section("Selected technical work", s),
        cv_project("CREDA", "Shipped product", "Skill-verification product publicly described around project-based interviews, repository analysis, and shareable skill records. Individual feature ownership is not established by the public product page.", "Public product page; implementation stack not asserted", "https://www.trycreda.app/", s),
        cv_project("TrustLayer", "Shipped product", "Paste-and-analyze experience that surfaces sentence-level confidence signals and explains its visible, rule-based decision path. The project describes itself as client-side and without API calls; this is not a truth-verification guarantee.", "React, Tailwind CSS, Vite", "https://github.com/CMB-i/TrustLayer", s),
        cv_project("AARNA", "Team-built RIFT 2026 testnet", "Decentralized blue-carbon MRV workflow modeling project submission, IPFS evidence, validator review, Algorand testnet credit issuance, registry, and marketplace. Team-built; public artifacts do not partition individual contribution. No claim of real-world credit issuance.", "Algorand, AlgoPy, Puya, IPFS, React, TypeScript", "https://github.com/SheeshDarth/project-aarna", s),
        cv_project("SmartHelm", "Android companion app exists; release unverified", "Edge-oriented rider-safety system. Public source includes a Kotlin Android application alongside MediaPipe eye-state processing, a Raspberry Pi path, optional MAX30102 inputs, and Firebase-connected fleet components. Release status is not verified.", "Kotlin, Android, MediaPipe, Python/Flask, Raspberry Pi, Firebase", "https://github.com/SheeshDarth/SmartHelm", s),
        PageBreak(),
    ]

    # Page 2: major technical work. Each record says what the artifacts establish.
    story += [
        para("SELECTED TECHNICAL WORK | CONTINUED", s["section"]),
        para("Prototypes, active builds, product work, and capstone evidence", s["small"]),
        cv_project("PayGuard-AgentX", "Prototype", "Local-first retail operations prototype for restock, invoice, and fraud-investigation workflows. Project source describes supervised agent routing, MCP tool contracts, evidence records, and human review; it is not represented as a production deployment.", "Python, LangGraph, MCP, SQLite, Chroma, Kuzu, Ollama", "https://github.com/SheeshDarth/PayGuard-AgentX", s),
        cv_project("OriginX-T (ORIGIN-T)", "Active research capstone", "Dataset-forensics and early-warning research for LLM fine-tuning risk. Implemented core includes controlled contamination experiments, LoRA runs/measurements, and calibrated risk classification; advanced survival, conformal, and white-box layers remain gated.", "Python, PyTorch, Transformers, PEFT, scikit-learn, MLflow", "https://github.com/SheeshDarth/OriginX-T", s),
        cv_project("NirmiqCodeSensei", "Active local-first build", "Repository learning tool with eight-lens code review, architecture mapping, code-grounded DSA, explain-back practice, local storage, and MCP connections. README describes localhost-only use and no telemetry.", "TypeScript, Next.js, SQLite, Drizzle, MCP", "https://github.com/SheeshDarth/NirmiqCodeSensei", s),
        cv_project("NirmiqResearchOS", "Active local RAG MVP", "Offline-first academic workspace with local retrieval, citations, Paper Lab, and Exam Lab. Repository documents a demo/MVP and local generation path, not a hosted multi-user SaaS.", "Python, FastAPI, Next.js, SQLite, BM25, Chroma, Ollama", "https://github.com/SheeshDarth/NirmiqResearchOS", s),
        cv_project("AscensionOS", "Product build", "Mobile-first personal dashboard with local cache and offline queue, optional synchronization, PWA behavior, and Android packaging work.", "Next.js, TypeScript, Tailwind, Supabase, IndexedDB, Capacitor", "https://github.com/SheeshDarth/ascension-os", s),
        cv_project("Vibecode Project Manager", "Public developer workflow tool", "Approval-first skill routing that analyzes a project and selects relevant capabilities; source includes deterministic ranking and cross-platform shell support.", "Bash, PowerShell, GitHub Actions", "https://github.com/SheeshDarth/vibecode-project-manager", s),
        section("Academic work", s),
        cv_project("Multimodal stress/fatigue review", "BNMIT academic review", "Supplied CV records literature survey, requirement specifications, architecture design, and conclusion contributions to an IEEE-format review paper.", "Literature review and system architecture", None, s),
        section("Additional verified systems", s),
        cv_project("NirmiqEcho (Windows)", "Local-first assistant", "Offline voice assistant with separate command and dictation modes; project notes document faster-whisper and local Ollama fallback.", "Python, faster-whisper, Ollama", "https://github.com/SheeshDarth/NirmiqEcho", s),
        cv_project("NirmiqEcho-Mobile", "Android MVP", "Separate Android speech companion using system speech recognition with an offline-preference path; distinct from the Windows assistant.", "Kotlin, Android", None, s),
        cv_project("VyomaGuard PHM", "Mission-assurance prototype", "Explainable space-mission triage prototype combining telemetry health signals and conjunction-risk ranking; explicitly not flight-certified.", "Python, scikit-learn, Isolation Forest, SGP4/TLE, Pydantic, Streamlit", "https://github.com/SheeshDarth/vyomaguard-phm", s),
        cv_project("AGION", "Flutter product build", "Personal productivity and goal-tracking application described in the supplied CV and local project README.", "Flutter, Dart, Riverpod, Hive, Firebase", "https://github.com/SheeshDarth/AGION", s),
        PageBreak(),
    ]

    # Page 3: complete categorized index of the remaining verified code/research work.
    story += [
        para("PROJECT INDEX &amp; RELATED WORK", s["section"]),
        para("Aliases are merged into one entry. Public repository presence is proof of an artifact, not by itself proof of individual ownership or release.", s["small"]),
        section("Assessment", s),
        cv_project("FeeOps Finance Agent", "Subhanu technical assessment; separate from employment", "Scoped assessment prototype. It is not presented as Subhanu employment output; external technical detail is omitted.", "Assessment evidence kept private", None, s),
        section("Public systems and code projects", s),
        cv_project("vibecode-orchestrator", "Public repository / developer tooling", "Intent-based skill routing and per-lane arbitration for large assistant skill libraries; summarized in the supplied CV.", "Skill routing; implementation stack not independently enumerated", "https://github.com/SheeshDarth/vibecode-orchestrator", s),
        cv_project("Stress-Detection-System", "Computer-vision study", "Webcam-based stress/fatigue work using facial, pulse, HRV, PERCLOS, and blink signals as summarized in the supplied CV.", "Python, computer vision, machine learning", "https://github.com/SheeshDarth/Stress-Detection-System", s),
        cv_project("Cognitive stress detector", "Separate model study", "Distinct public repository for multimodel cognitive-stress/fatigue classification; detailed ownership and comparative metrics are not asserted.", "Deep-learning model evaluation", "https://github.com/SheeshDarth/Cognitive_stress_detector", s),
        cv_project("Automated Brain Tumour Detection", "Research classifier", "MRI classification study with a hybrid CNN/ViT and radiomics direction; performance figures from the old CV are intentionally omitted pending a reproducible evaluation audit.", "PyTorch, ResNet50, Vision Transformer, radiomics, Grad-CAM", "https://github.com/SheeshDarth/Automated-Brain-Tumour-Detection", s),
        cv_project("AnonThera", "Public application project", "Student mental-health support concept/application with anonymous support and wellbeing workflows; maturity and personal feature ownership are not independently verified.", "Public repository; stack not asserted", "https://github.com/SheeshDarth/Anonthera", s),
        cv_project("PayGuard-DQ", "Data-quality project", "Payment/transaction data-quality work for identifying inconsistent or corrupt records; maturity and detailed implementation are not independently verified.", "Public repository; stack not asserted", "https://github.com/SheeshDarth/PayGuard-DQ", s),
        cv_project("NIDS", "Network-security ML project", "Machine-learning network intrusion-detection repository; claims are limited to the supplied CV and public project record.", "Machine learning; stack not asserted", "https://github.com/SheeshDarth/NIDS", s),
        cv_project("Skylark BI Agent", "Assignment/demo", "Conversational analytics over monday.com boards with deterministic server-side metrics and an LLM for open-ended follow-up; no board identifiers or credentials included.", "Next.js, TypeScript, GraphQL, Gemini", "https://github.com/SheeshDarth/skylark-monday-bi-agent", s),
        cv_project("Skylark GCP inference pipeline", "Localization assignment", "Manifest-driven, bounded-memory inference over aerial GeoTIFF imagery with schema and coordinate checks; assignment scope, not a full-scene production claim.", "Python, ONNX Runtime, Docker, pytest", "https://github.com/SheeshDarth/skylark-gcp-inference-pipeline", s),
        cv_project("PostPilot AI", "Coursework / PE3", "Social engagement forecasting pipeline; the local project record notes synthetic-data limitations and weak results, so no accuracy claim is made.", "Python, machine learning, social-data analysis", "https://github.com/SheeshDarth/PostPilot-AI", s),
        cv_project("SocialGuard-R", "Coursework / PE4", "R/Shiny dashboard for exploring unusual social-media engagement patterns; README notes that anomaly scores are not proof of fraud.", "R, Shiny, bslib, dplyr, ggplot2", None, s),
        section("Hackathon and research", s),
        cv_project("BOLT-Gemma B-lite", "Kaggle/DeepMind paper-track study", "Paper-only exploratory study of context-capsule/reveal decisions under token budgets. The local record says the model was not fine-tuned and held-out/model feasibility remain unverified.", "Research study; not a trained model release", None, s),
        cv_project("Enveda CASMI 2026", "Kaggle hackathon research / WIP", "Research/code work remains gated by a free-memory requirement in the local record; no submission, winning, or production-admission claim is made.", "Computational chemistry / ML; exact stack not asserted", None, s),
    ]

    doc = document(CV_OUTPUT, "Siddharth P. - AI Systems Engineer Detailed CV", "Three-page detailed CV with categorized project and research evidence")
    doc.build(story, onFirstPage=footer, onLaterPages=footer, canvasmaker=InvariantCanvas)


if __name__ == "__main__":
    build_resume()
    build_cv()
    print(f"Built {RESUME_OUTPUT}")
    print(f"Built {CV_OUTPUT}")
