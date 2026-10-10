"""Build Siddharth P's ATS-ready resume and detailed CV PDFs."""

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

INK = colors.HexColor("#111827")
SOFT = colors.HexColor("#334155")
MUTED = colors.HexColor("#53627A")
ACCENT = colors.HexColor("#335ACB")


class InvariantCanvas(Canvas):
    """Create stable output for identical source content."""

    def __init__(self, *args, **kwargs):
        kwargs["invariant"] = 1
        super().__init__(*args, **kwargs)


def paragraph(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def styles(compact: bool = False) -> dict[str, ParagraphStyle]:
    base_size = 9.2 if compact else 9.6
    leading = 12.6 if compact else 13.4
    base = ParagraphStyle(
        "Base", fontName="Helvetica", fontSize=base_size, leading=leading,
        textColor=SOFT, alignment=TA_LEFT, spaceAfter=0, allowWidows=0, allowOrphans=0,
    )
    return {
        "base": base,
        "name": ParagraphStyle("Name", parent=base, fontName="Helvetica-Bold", fontSize=24, leading=26, textColor=INK, spaceAfter=2),
        "headline": ParagraphStyle("Headline", parent=base, fontName="Helvetica-Bold", fontSize=10.2, leading=13.2, textColor=ACCENT, spaceAfter=5),
        "contact": ParagraphStyle("Contact", parent=base, fontSize=8.5, leading=11.2, textColor=MUTED),
        "section": ParagraphStyle("Section", parent=base, fontName="Helvetica-Bold", fontSize=9.9, leading=12, textColor=INK, spaceBefore=7, spaceAfter=3.5),
        "role": ParagraphStyle("Role", parent=base, fontName="Helvetica-Bold", fontSize=9.4, leading=12.2, textColor=INK, spaceAfter=1),
        "item": ParagraphStyle("Item", parent=base, leftIndent=7, firstLineIndent=-7, spaceAfter=1.2),
        "project": ParagraphStyle("Project", parent=base, fontName="Helvetica-Bold", fontSize=9.2, leading=12, textColor=INK, spaceBefore=2.5, spaceAfter=0.8),
        "compact": ParagraphStyle("Compact", parent=base, fontSize=8.85 if compact else 9, leading=12.1 if compact else 12.5, spaceAfter=1.4),
        "skill": ParagraphStyle("Skill", parent=base, fontSize=8.65, leading=11.7, spaceAfter=1.1),
    }


def document(path: Path, title: str, subject: str) -> SimpleDocTemplate:
    return SimpleDocTemplate(
        str(path), pagesize=A4, rightMargin=14 * mm, leftMargin=14 * mm,
        topMargin=12 * mm, bottomMargin=11 * mm, title=title, author="Siddharth P",
        subject=subject, creator="Reproducible ReportLab resume builder",
    )


def header(s: dict[str, ParagraphStyle], headline: str) -> list:
    return [
        paragraph("Siddharth P", s["name"]),
        paragraph(headline, s["headline"]),
        paragraph(
            '<link href="tel:+917483557950" color="#53627A">+91 74835 57950</link>  |  '
            '<link href="mailto:siddharthprashoo@gmail.com" color="#53627A">siddharthprashoo@gmail.com</link>  |  '
            '<link href="https://siddharth-portfolio-ashen.vercel.app/" color="#335ACB">Portfolio</link>  |  '
            '<link href="https://github.com/SheeshDarth" color="#335ACB">GitHub</link>  |  '
            '<link href="https://www.linkedin.com/in/siddharth-p-7bb185285/" color="#335ACB">LinkedIn</link>',
            s["contact"],
        ),
        Spacer(1, 6),
        HRFlowable(width="100%", thickness=0.7, color=ACCENT, spaceBefore=0, spaceAfter=2),
    ]


def build_resume() -> None:
    s = styles(compact=True)
    story = header(s, "B.E. AI/ML Student | AI Systems Engineer")
    story += [
        paragraph("SUMMARY", s["section"]),
        paragraph(
            "B.E. AI/ML student building dependable AI-powered software across web products, agentic workflows, local RAG, edge devices, and deterministic finance workflows. Interested in the engineering around models: tool contracts, async work, evidence, human approval, local execution, and clear user workflows.",
            s["base"],
        ),
        paragraph("EXPERIENCE", s["section"]),
        KeepTogether([
            paragraph("AI/ML Intern - Equvinoxis Pvt Ltd | Bengaluru | Jun 2025 - Jul 2025", s["role"]),
            paragraph("- Contributed to research and prototyping for AI-assisted facial analysis of pilot stress across feature extraction, model experiments, and human-lab evaluation.", s["item"]),
            paragraph("- Documented experiments and compared multimodal approaches to support clear review of findings and limitations.", s["item"]),
        ]),
        paragraph("SELECTED SYSTEMS", s["section"]),
        KeepTogether([
            paragraph('<link href="https://www.trycreda.app" color="#335ACB">CREDA</link> | Shipped candidate-verification product', s["project"]),
            paragraph("Built a full-stack candidate-verification workflow with structured evaluation, repository analysis, and authenticity signals; implemented multi-model fallback, Redis/BullMQ background work, and Supabase-backed product flows. React, Node.js, Supabase, Redis, BullMQ.", s["compact"]),
        ]),
        KeepTogether([
            paragraph('<link href="https://github.com/SheeshDarth/fee-finance-agent" color="#335ACB">FeeOps Finance Agent</link> | Subhanu Technologies assessment prototype', s["project"]),
            paragraph("Built a reviewable school-fee finance workflow with integer-paise ledgering, confidence-gated reconciliation, CSV/Excel import, worklists, and a read-only Google ADK wrapper. Monetary decisions remain deterministic; AI is limited to reviewed communication drafts. Python, React, Vite, Google ADK, Cloud Run.", s["compact"]),
        ]),
        KeepTogether([
            paragraph('<link href="https://github.com/SheeshDarth/SmartHelm" color="#335ACB">SmartHelm</link> | Edge-AI rider-safety system', s["project"]),
            paragraph("Integrated MediaPipe eye analysis, MAX30102 heart-rate/SpO2 sensing, Raspberry Pi alerts, a Kotlin Android companion app, and Firebase reporting; raw face video remains on-device. Python, MediaPipe, Raspberry Pi, Kotlin, Firebase.", s["compact"]),
        ]),
        KeepTogether([
            paragraph('<link href="https://github.com/SheeshDarth/PayGuard-AgentX" color="#335ACB">PayGuard-AgentX</link> | Governed agent prototype', s["project"]),
            paragraph("Designed an offline-first retail workflow prototype with LangGraph routing, schema-bound MCP tools, critic loops, signed evidence dossiers, and a human approval queue. Python, LangGraph, MCP, SQLite, Chroma, Kuzu.", s["compact"]),
        ]),
        KeepTogether([
            paragraph('<link href="https://github.com/SheeshDarth" color="#335ACB">TrustLayer</link> | Shipped privacy-policy analysis product', s["project"]),
            paragraph("Built a browser and web workflow that translates dense privacy-policy text into a visible risk signal through an Express-backed, LLM-assisted analysis layer. Chrome extension, Express, LLM integration.", s["compact"]),
        ]),
        paragraph("SKILLS", s["section"]),
        paragraph("<b>AI systems:</b> Agent workflows, MCP, LangGraph, Google ADK, LLM integration, human approvals, audit evidence, local RAG, hybrid retrieval, evaluation workflows", s["skill"]),
        paragraph("<b>Engineering:</b> Python, FastAPI, TypeScript, React, Next.js, Node.js, Express, REST APIs, Redis, BullMQ, SQLite, PostgreSQL, Supabase, Firebase", s["skill"]),
        paragraph("<b>Edge &amp; delivery:</b> MediaPipe, Raspberry Pi, Kotlin, Android, Docker, Cloud Run, GitHub Actions, CI/CD, Git, Flutter", s["skill"]),
        paragraph("EDUCATION", s["section"]),
        paragraph("B.E. Artificial Intelligence and Machine Learning - B.N.M. Institute of Technology, Bengaluru | 2023 - 2027 | CGPA: 8.61/10", s["role"]),
    ]
    document(RESUME_OUTPUT, "Siddharth P - AI Systems Engineer Resume", "One-page ATS-ready AI Systems Engineer resume").build(story, canvasmaker=InvariantCanvas)


def build_cv() -> None:
    s = styles()
    story = header(s, "AI Systems Engineer | Agentic AI, Local RAG & Edge-to-Cloud Product Engineering")
    story += [
        paragraph("PROFILE", s["section"]),
        paragraph("B.E. AI/ML student focused on building AI-powered software that remains understandable under real product constraints. Public work spans shipped web products, deterministic finance workflows, LLM-assisted browser workflows, governed agent prototypes, local-first retrieval, edge sensing, mobile integration, and applied ML research.", s["base"]),
        paragraph("TARGET ROLES", s["section"]),
        paragraph("AI Systems Engineer | Applied AI Engineer | Agentic AI Engineer | AI Product Engineer | AI Platform Engineer", s["compact"]),
        paragraph("EXPERIENCE", s["section"]),
        KeepTogether([
            paragraph("AI/ML Intern - Equvinoxis Pvt Ltd | Bengaluru | Jun 2025 - Jul 2025", s["role"]),
            paragraph("- Supported research and prototyping for AI-assisted facial analysis of pilot stress, including feature extraction, model experimentation, multimodal signal work, and human-lab evaluation.", s["item"]),
            paragraph("- Produced experiment documentation to make model comparisons, observations, and limitations reviewable.", s["item"]),
        ]),
        paragraph("FEATURED SYSTEMS", s["section"]),
        paragraph('<link href="https://www.trycreda.app" color="#335ACB">CREDA</link> | Shipped candidate-verification product', s["project"]),
        paragraph("Full-stack workflow for structured candidate evaluation, repository analysis, and authenticity signals. Engineering focus: multi-model fallback, Redis/BullMQ background work, Supabase-backed product flows, and the operational decisions around AI-assisted review. Stack: React, Node.js, Supabase, Redis, BullMQ, LLMs.", s["compact"]),
        paragraph('<link href="https://github.com/SheeshDarth/fee-finance-agent" color="#335ACB">FeeOps Finance Agent</link> | Subhanu Technologies assessment prototype', s["project"]),
        paragraph("Scoped school-fee finance workflow that brings structures, concessions, payment history, and approved plans into a reviewable run. Integer-paise ledgering, confidence-gated reconciliation, CSV/Excel import, worklists, and a read-only Google ADK wrapper keep monetary decisions deterministic and auditable; AI is restricted to reviewed wording drafts. Stack: Python, React, Vite, Google ADK, Cloud Run. This is project work, not an employment title.", s["compact"]),
        paragraph('<link href="https://github.com/SheeshDarth/SmartHelm" color="#335ACB">SmartHelm</link> | Edge-AI rider-safety system', s["project"]),
        paragraph("Privacy-first drowsiness detection for delivery riders. A Raspberry Pi helmet unit runs MediaPipe eye analysis with MAX30102 heart-rate/SpO2 sensing and alerts; a Kotlin Android app and Firebase dashboard connect rider, device, and fleet. Stack: Python, Flask, MediaPipe, Raspberry Pi, Kotlin, Firebase.", s["compact"]),
        paragraph('<link href="https://github.com/SheeshDarth/PayGuard-AgentX" color="#335ACB">PayGuard-AgentX</link> | Governed agent prototype', s["project"]),
        paragraph("Offline-first retail control-centre prototype for restock, invoice, and fraud-investigation workflows. Uses LangGraph supervision, MCP tool contracts, critics, signed evidence dossiers, and an explicit human decision boundary; not presented as a production-audited system. Stack: Python, LangGraph, MCP, SQLite, Chroma, Kuzu, Ollama.", s["compact"]),
        paragraph('<link href="https://github.com/SheeshDarth" color="#335ACB">TrustLayer</link> | Shipped privacy-policy analysis product', s["project"]),
        paragraph("Browser and web workflow that converts dense privacy-policy text into an understandable risk signal through an Express-backed, LLM-assisted analysis layer. Stack: Chrome extension, Express, LLM integration.", s["compact"]),
        paragraph('<link href="https://github.com/SheeshDarth/project-aarna" color="#335ACB">AARNA</link> | Team-built Algorand testnet', s["project"]),
        paragraph("Team-built decentralized MRV workflow for blue-carbon restoration: IPFS project evidence, on-chain validation roles, Algorand Standard Asset credits, and a marketplace model. Stack: Algorand, AlgoPy, Puya, React, TypeScript, IPFS. RIFT 2026; live testnet.", s["compact"]),
        PageBreak(),
        paragraph("AI SYSTEMS &amp; RESEARCH", s["section"]),
        paragraph('<link href="https://github.com/SheeshDarth/NirmiqResearchOS" color="#335ACB">NirmiqResearchOS</link> | Local-first academic intelligence MVP', s["project"]),
        paragraph("Offline-first academic workspace for source-backed document Q&amp;A, Paper Lab, and Exam Lab. Combines FastAPI, Next.js, SQLite, optional Ollama inference, hybrid retrieval, citations, abstention, CI, and answer-quality evaluation flows. Portfolio/demo MVP, not a hosted multi-user SaaS.", s["compact"]),
        paragraph('<link href="https://github.com/SheeshDarth/NirmiqCodeSensei" color="#335ACB">NirmiqCodeSensei</link> | Local developer-learning tool', s["project"]),
        paragraph("Local repository analysis tool that provides eight-lens review, architecture mapping, code-grounded DSA, explain-back questions, SQLite storage, and optional MCP integrations. Runs on localhost with no telemetry. Stack: TypeScript, Next.js, SQLite, Drizzle, MCP.", s["compact"]),
        paragraph('<link href="https://github.com/SheeshDarth/OriginX-T" color="#335ACB">OriginX-T</link> | Dataset-forensics research capstone', s["project"]),
        paragraph("Time-aware early-warning research system for contamination risks before LLM fine-tuning damage becomes visible. Scope includes controlled contamination generation, a LoRA fine-tuning grid, collapse-curve measurement, and calibrated risk classification; advanced methods are explicitly gated. Stack: Python, PyTorch, Transformers, PEFT, MLflow.", s["compact"]),
        paragraph('<link href="https://github.com/SheeshDarth/ascension-os" color="#335ACB">AscensionOS</link> | Private offline-capable product build', s["project"]),
        paragraph("Mobile-first personal operating system with local cache, offline sync queue, optional Supabase sync, PWA behavior, and Android bridge work. Stack: Next.js, TypeScript, Supabase, Vitest, Capacitor.", s["compact"]),
        paragraph('<link href="https://github.com/SheeshDarth/vibecode-project-manager" color="#335ACB">Vibecode Project Manager</link> | Developer workflow tool', s["project"]),
        paragraph("Approval-first, per-project skill selection for Claude Code using deterministic lexical ranking and local configuration writes. Stack: Bash, PowerShell, GitHub Actions.", s["compact"]),
        paragraph("ADDITIONAL PUBLIC WORK", s["section"]),
        paragraph("PostPilot AI - leakage-aware social forecasting study | NirmiqEcho - offline Windows voice assistant and dictation | VyomaGuard - explainable space mission-assurance prototype | Brain Tumour Detection - ResNet, ViT, and Grad-CAM study | <link href=\"https://github.com/SheeshDarth\" color=\"#335ACB\">Complete public GitHub record</link>", s["compact"]),
        paragraph("TECHNICAL SKILLS", s["section"]),
        paragraph("<b>AI systems:</b> Agent workflows, MCP, LangGraph, Google ADK, tool contracts, human approvals, audit evidence, LLM integration, local RAG, hybrid retrieval, citations, abstention, evaluation workflows", s["skill"]),
        paragraph("<b>Backend &amp; data:</b> Python, FastAPI, Node.js, Express, REST APIs, Redis, BullMQ, SQLite, PostgreSQL, Supabase, Firebase, Chroma", s["skill"]),
        paragraph("<b>Product &amp; edge:</b> TypeScript, React, Next.js, Flutter, Kotlin, Android, MediaPipe, Raspberry Pi, HTML/CSS, accessible UI", s["skill"]),
        paragraph("<b>Delivery:</b> Docker, Cloud Run, GitHub Actions, CI/CD, Git, Ollama, Vercel", s["skill"]),
        paragraph("EDUCATION", s["section"]),
        paragraph("B.E. Artificial Intelligence and Machine Learning - B.N.M. Institute of Technology, Bengaluru | 2023 - 2027 | CGPA: 8.61/10", s["role"]),
    ]
    document(CV_OUTPUT, "Siddharth P - AI Systems Engineer CV", "Detailed CV with public AI systems project evidence").build(story, canvasmaker=InvariantCanvas)


if __name__ == "__main__":
    build_resume()
    build_cv()
    print(f"Built {RESUME_OUTPUT}")
    print(f"Built {CV_OUTPUT}")
