"""Build Siddharth P's one-page ATS-readable resume PDF."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "Siddharth-P-Resume.pdf"

INK = colors.HexColor("#111827")
SOFT = colors.HexColor("#334155")
MUTED = colors.HexColor("#53627A")
ACCENT = colors.HexColor("#335ACB")
RULE = colors.HexColor("#CBD5E1")


class InvariantCanvas(Canvas):
    """Create byte-for-byte stable output for identical resume content."""

    def __init__(self, *args, **kwargs):
        kwargs["invariant"] = 1
        super().__init__(*args, **kwargs)


def paragraph(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def build_resume() -> None:
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=14 * mm,
        leftMargin=14 * mm,
        topMargin=12 * mm,
        bottomMargin=11 * mm,
        title="Siddharth P - AI Systems Engineer Resume",
        author="Siddharth P",
        subject="AI Systems Engineer resume focused on agentic AI, enterprise AI infrastructure, and product engineering",
        creator="Reproducible ReportLab resume builder",
    )

    base = ParagraphStyle(
        "Base",
        fontName="Helvetica",
        fontSize=9.4,
        leading=13.2,
        textColor=SOFT,
        alignment=TA_LEFT,
        spaceAfter=0,
        allowWidows=0,
        allowOrphans=0,
    )
    name = ParagraphStyle(
        "Name",
        parent=base,
        fontName="Helvetica-Bold",
        fontSize=25,
        leading=27,
        textColor=INK,
        spaceAfter=2,
    )
    headline = ParagraphStyle(
        "Headline",
        parent=base,
        fontName="Helvetica-Bold",
        fontSize=10.8,
        leading=14,
        textColor=ACCENT,
        spaceAfter=5,
    )
    contact = ParagraphStyle(
        "Contact",
        parent=base,
        fontSize=8.7,
        leading=11.5,
        textColor=MUTED,
        spaceAfter=0,
    )
    section = ParagraphStyle(
        "Section",
        parent=base,
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=12,
        textColor=INK,
        spaceBefore=8,
        spaceAfter=4,
    )
    role = ParagraphStyle(
        "Role",
        parent=base,
        fontName="Helvetica-Bold",
        fontSize=9.5,
        leading=12.5,
        textColor=INK,
        spaceAfter=1,
    )
    item = ParagraphStyle(
        "Item",
        parent=base,
        leftIndent=7,
        firstLineIndent=-7,
        spaceAfter=1.5,
    )
    project = ParagraphStyle(
        "Project",
        parent=base,
        fontName="Helvetica-Bold",
        fontSize=9.3,
        leading=12.2,
        textColor=INK,
        spaceBefore=3,
        spaceAfter=1,
    )
    compact = ParagraphStyle(
        "Compact",
        parent=base,
        fontSize=9,
        leading=12.5,
        spaceAfter=2,
    )
    skill = ParagraphStyle(
        "Skill",
        parent=base,
        fontSize=8.8,
        leading=12,
        spaceAfter=1.3,
    )

    story = [
        paragraph("Siddharth P", name),
        paragraph(
            "AI Systems Engineer | Agentic AI - Enterprise AI Infrastructure - AI Product Engineering",
            headline,
        ),
        paragraph(
            '<link href="tel:+917483557950" color="#53627A">+91 74835 57950</link>  |  '
            '<link href="mailto:siddharthprashoo@gmail.com" color="#53627A">siddharthprashoo@gmail.com</link>  |  '
            '<link href="https://siddharth-portfolio-ashen.vercel.app/" color="#335ACB">Portfolio</link>  |  '
            '<link href="https://github.com/SheeshDarth" color="#335ACB">GitHub</link>  |  '
            '<link href="https://www.linkedin.com/in/siddharth-p-7bb185285/" color="#335ACB">LinkedIn</link>',
            contact,
        ),
        Spacer(1, 7),
        HRFlowable(width="100%", thickness=0.7, color=ACCENT, spaceBefore=0, spaceAfter=2),
        paragraph("SUMMARY", section),
        paragraph(
            "AI Systems Engineer focused on agentic applications and enterprise AI infrastructure. Builds auditable human-agent workflows, local-first retrieval systems, model and tool integrations, and full-stack AI products using Python, FastAPI, TypeScript, Next.js, Flutter, and Firebase.",
            base,
        ),
        paragraph("EXPERIENCE", section),
        KeepTogether([
            paragraph("AI/ML Intern - Equvinoxis Pvt Ltd | Bengaluru | Jun 2025 - Jul 2025", role),
            paragraph("- Contributed to research and prototyping for AI-assisted facial analysis of pilot stress, spanning feature extraction, model experimentation, and human-lab evaluation.", item),
            paragraph("- Worked with multimodal signals and documented experiments to support clear comparison of approaches and findings.", item),
        ]),
        paragraph("SELECTED PROJECTS", section),
        KeepTogether([
            paragraph('<link href="https://github.com/SheeshDarth/PayGuard-AgentX" color="#335ACB">PayGuard-AgentX</link> | Enterprise agentic prototype', project),
            paragraph("Offline-first retail control centre with LangGraph supervision, 7 specialist agents, critic loops, 8 schema-bound MCP tools, HMAC-signed evidence dossiers, and a human-only decision queue. Python, LangGraph, MCP, SQLite, Chroma, Kuzu.", compact),
        ]),
        KeepTogether([
            paragraph('<link href="https://github.com/SheeshDarth/NirmiqCodeSensei" color="#335ACB">NirmiqCodeSensei</link> | Active local-first developer-learning system', project),
            paragraph("Imports real repositories for senior-grade review, architecture mapping, code-grounded DSA, and explain-back practice; uses MCP integrations and a localhost SQLite data layer with no telemetry. Next.js, TypeScript, SQLite, Drizzle, MCP.", compact),
        ]),
        KeepTogether([
            paragraph('<link href="https://github.com/SheeshDarth/NirmiqResearchOS" color="#335ACB">NirmiqResearchOS</link> | Active academic-intelligence MVP', project),
            paragraph("Local research workspace with hybrid BM25 and vector retrieval, reciprocal-rank fusion, citations, abstention, evaluation flows, and Ollama inference. Python, FastAPI, Next.js, Chroma, SQLite, Ollama.", compact),
        ]),
        KeepTogether([
            paragraph('<link href="https://github.com/SheeshDarth/OriginX-T" color="#335ACB">OriginX-T</link> | Active LLM dataset-forensics capstone', project),
            paragraph("Time-aware system for synthetic, recursive, paraphrased, and benchmark-leakage risks before fine-tuning damage compounds; combines conformal prediction, survival analysis, and SHAP explanations. Python, PyTorch, Transformers, PEFT, MLflow.", compact),
        ]),
        paragraph("SKILLS", section),
        paragraph("<b>Agent systems:</b> Agent orchestration, MCP, LangGraph, tool contracts, human approvals, audit evidence, evaluations", skill),
        paragraph("<b>AI and backend:</b> Python, FastAPI, local AI, RAG, hybrid retrieval, Ollama, REST APIs", skill),
        paragraph("<b>Product:</b> TypeScript, Next.js, React, Flutter, Firebase, responsive and accessible UI", skill),
        paragraph("<b>Data and delivery:</b> SQLite, PostgreSQL, Chroma, Docker, GitHub Actions, CI/CD, Git", skill),
        paragraph("EDUCATION", section),
        paragraph("B.E. Artificial Intelligence and Machine Learning - B.N.M. Institute of Technology, Bengaluru | 2023 - 2027 | CGPA: 8.61/10", role),
    ]

    doc.build(story, canvasmaker=InvariantCanvas)


if __name__ == "__main__":
    build_resume()
    print(f"Built {OUTPUT}")
