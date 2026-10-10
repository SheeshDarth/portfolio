# Résumé and Detailed CV — Evidence-Led Implementation Specification

**Status:** Ready for evidence audit and implementation

**Scope:** One-page reusable résumé and complete, attributed detailed CV

**Professional positioning:** AI Systems Engineer
**Official current experience title:** FDE Intern — Subhanu | Current

## 1. Purpose

Create two complementary documents rather than two versions of the same short résumé:

- **Résumé:** a one-page, ATS-readable base that can be tailored lightly for AI systems, agentic AI, platform, applied AI, and AI product-engineering roles. It must not be written only for FDE roles.
- **Detailed CV:** a compact, three-page technical record of verified experience and code work, including coursework, hackathons, team projects, prototypes, and assessments when evidence supports inclusion. Attribution and maturity must be explicit.

The supplied `Siddharth_P_CV_Detailed.pdf` is a content/evidence source, not a layout template. Its uneven pagination (overcrowded first page and substantial unused space on the second) is a defect to correct.

## 2. Evidence policy and publication gate

Before writing final bullets, create a private working evidence ledger. Do not infer authorship, contribution, shipment, dates, metrics, or publication permission from a folder name, repository owner, README claim, or presence of a binary alone.

For each candidate entry, record:

| Field | Required decision |
| --- | --- |
| Canonical name and aliases | Resolve capitalization, renamed repos, duplicate folders, capstone names, and old names; preserve aliases only when useful for searchability. |
| Evidence | File/repository path, relevant commit or report, public demo/release, screenshot, or other artifact; note what it actually proves. |
| Contribution | Individual, team (with verified personal contribution), coursework, hackathon, assessment, fork/study, or unknown. Do not turn team presence into sole ownership. |
| Status | Use the controlled vocabulary below and record the evidence/date supporting it. |
| Dates | Include only dates substantiated by the user, document, commit history, or official project material. For current Subhanu employment, use “Current”; no inferred start date. |
| Technologies | List only technologies evidenced in code/config/docs or confirmed by the user. |
| Public eligibility | Public, high-level-only, private-CV-only, permission needed, or exclude. Respect employer confidentiality. |
| Document treatment | Résumé, detailed CV, portfolio archive, or excluded, with a short reason. |

### Status vocabulary

- **Shipped:** a release or accessible product/use evidence supports the claim. CREDA and TrustLayer are user-stated shipped projects; verify the public artifact and scope before describing features or outcomes.
- **Existing app — release unverified:** an app/build exists, but do not claim public launch or shipment. SmartHelm starts here unless stronger release evidence is found.
- **Team-built testnet:** use for AARNA; state team attribution and the verified individual contribution.
- **Prototype:** use for PayGuard-AgentX unless release evidence changes the classification.
- **Active build / capstone:** work is underway; describe completed milestones separately from gated or planned features.
- **Experimental / paused:** use for Buzz integration until evidence supports resumption or completion.
- **Dry-run:** use for Algo-Ops; do not imply live AWS operations.
- **Coursework, hackathon, assessment, fork/study, archive-only, or excluded:** keep these separate from personal products and employment achievements.

Unknowns remain unknown in drafts. Resolve material ambiguity with Siddharth before external publication; do not silently choose the strongest interpretation.

## 3. Known facts and wording guardrails

### Positioning and contact

- Header: **Siddharth P.**
- Headline: **AI Systems Engineer | Agentic AI • Enterprise AI Infrastructure • AI Product Engineering**
- Summary should describe the intersection of agentic applications, enterprise AI workflows, and user-facing product engineering. Use only skills substantiated by the evidence ledger.
- Reuse verified public contact details and clickable links from the current CV/site. Preserve the currently public phone number only after confirming it matches the source PDF. Include email, portfolio, GitHub, and LinkedIn; do not fabricate or normalize handles.

### Current Subhanu work

Keep the experience heading exactly **FDE Intern — Subhanu | Current**. Do not rename the title to AI Systems Engineer, invent dates, or present internal project names as public products without approval.

The evidence currently supports high-level coverage of LibreChat and Buzz application work, a voiceless-agent workflow, media-generation workflows, and Algo-Ops. Phrase only verified work and milestone state:

- A 1080p video-generation job completed and direct signed-media retrieval checks passed.
- Saved-agent media retrieval still has an unresolved TTL issue; the player overlay is not deployed.
- Algo-Ops is deployed/running in dry-run; live actions remain gated, and the Hermes integration is not connected.
- Buzz integration is experimental/paused; do not imply a production integration.
- Keep internal endpoints, screenshots, customer/provider details, unreleased architecture, and sensitive implementation specifics out of public documents unless explicitly cleared.

On the résumé, compress this into a few truthful bullets with progress state where material. On the detailed CV, distinguish completed, in-progress, blocked, and gated milestones rather than presenting the project as a finished system. FeeOps is a separate scoped assessment and must not be described as the Subhanu role or its main project.

### Prior experience and education

- Preserve official title **AI/ML Intern — Equvinoxis Pvt Ltd** and dates **Jun 2025–Jul 2025**, subject to checking against the supplied CV/source record.
- Preserve **B.E. in Artificial Intelligence and Machine Learning, BNMIT**, **2023–2027**, **CGPA 8.61/10**, subject to confirming the current academic record.
- Do not add unsupported award, impact, user, revenue, latency, or performance figures.

## 4. Required project coverage

These projects must be treated as major entries and reconciled before writing final claims:

| Project | Initial treatment | Required verification before final copy |
| --- | --- | --- |
| CREDA | Shipped; major project | Identify personal contribution, exact product scope, current public demo, and evidence for any feature claims. |
| TrustLayer | Shipped; major project | Resolve canonical repo/product source, personal contribution, public artifact, and supported feature claims. |
| AARNA | Team-built Algorand testnet project; major project | Reconcile `aarna-mvp`, `aarna-mvp-full`, and public repo aliases; document role and what the testnet demonstrates. |
| SmartHelm | Major project; existing app, release unverified | Inspect app/repo and builds; distinguish implemented features from planned capabilities and avoid “shipped” until release evidence exists. |
| PayGuard-AgentX | Agentic prototype | Verify personal contribution and identify implemented MCP tools, orchestration, audit evidence, and approvals only where source supports them. |

The detailed CV must also assess the following known candidates rather than silently omitting them. This is a reconciliation queue, **not** a claim that each is an individually completed project:

- Public/local candidates: NirmiqCodeSensei, NirmiqResearchOS, OriginX-T / ORIGIN-T, AscensionOS / Ascension OS, Vibecode Project Manager, NirmiqEcho, NirmiqEcho-Mobile, VyomaGuard, AGION, Stress-Detection-System, Automated-Brain-Tumour-Detection / Brain-Tumour, Skylark BI, Skylark GCP, KiddyPi, Voice Agent, DSA and Skill planner, agentic-boss-trainer_portal, FlyRankAI, IDEA, Vision app, Cloudfar, Shopify Seller App, Schneider, Handshake AI, and localtmp.
- Event/research candidates: DeepMind Kaggle hackathon / BOLT-Gemma, Kaggle-Hackathon, and any Enveda CASMI work found in the folders or history. Label the event, team, and individual contribution only if confirmed.
- Assessment/starter candidates: FeeOps, PostPilot_AI_Starter / PE3 project, and any other starter or assessment folder. Do not claim a complete product if the evidence is a template, pitch deck, binary, or scoped evaluation only.
- Capstone: local **ORIGIN-T** and public **OriginX-T** appear related; verify canonical title, repository identity, phase, implemented vs gated capabilities, authorship, report claims, and release/readiness before deciding how the alias is shown.
- Duplicate detection: reconcile the two AARNA folders, `PE3 project` and `PostPilot_AI_Starter`, `Ascension OS` and `AscensionOS`, the Brain-Tumour folder and public repository, and any other duplicate/renamed implementations before counting or listing.

The candidate list is deliberately broad because “complete CV” means auditing the known local and public evidence. Add other code projects discovered in Desktop, GitHub, capstone material, the supplied CV, or relevant Codex history. Exclude private Subhanu implementation details from public documents unless approved. Docs-only or binary-only folders are not automatically projects; classify or omit them based on verified personal code contribution.

## 5. Résumé specification (one page)

### Order and content

1. **Identity line:** name, professional headline, phone, email, portfolio, GitHub, LinkedIn. All links must remain clickable.
2. **Summary:** two compact lines stating the AI systems focus and breadth across agent workflows/infrastructure and product engineering. Avoid “enthusiast,” generic objective language, and unsupported claims.
3. **Experience:** current Subhanu FDE internship first; Equvinoxis AI/ML internship second. Retain official titles. Give Subhanu enough detail to distinguish LibreChat/Buzz, media/agent work, and dry-run automation without exposing private internals. Include only verified Equvinoxis work.
4. **Selected projects:** include the five required major projects—CREDA, TrustLayer, AARNA, SmartHelm, and PayGuard-AgentX—in a compact, scannable format. Keep status/attribution visible (shipped, team-built testnet, existing app/release unverified, prototype). If the evidence audit changes a status, the ledger takes precedence.
5. **Skills:** grouped, not a keyword wall. Candidate group labels: Agent & Tool Systems; AI/LLM & Retrieval; Backend & Data; Product & Mobile; Delivery & Infrastructure. Keep only supported items; candidates to verify include MCP, LangGraph, Python/FastAPI, TypeScript/Next.js, local AI/RAG, PostgreSQL, Docker/CI, Flutter, and Firebase.
6. **Education:** BNMIT degree, dates, and CGPA as above.

### Layout and ATS constraints

- A4, single column, clear left-aligned hierarchy, compact but readable spacing. No sidebar, icon-only contact information, decorative charts, multi-column skill layout, or text embedded in images.
- Target 9.5–10.5 pt body and a legible name/section hierarchy; do not solve overflow by shrinking below 9 pt or removing required major projects.
- Use semantic selectable text, conventional headings, standard bullets, Unicode-safe fonts, and embedded/clickable URLs. Ensure links do not depend only on color.
- Fit exactly one page without clipping, overlap, forced leading gaps, or a tiny footer. If the required content cannot fit at minimum readable sizing, surface the conflict for content-priority review rather than silently dropping facts.

## 6. Detailed CV specification (target three pages)

The target is three balanced A4 pages with no forced blank pages or large unused regions. Keep body text readable (target 9–10 pt; never below 8.5 pt), maintain a consistent grid and running page identity, and paginate naturally. If the verified complete inventory cannot fit legibly in three pages, stop and request a scope decision rather than dropping verified projects or making the document unreadable.

- **Page 1 — Profile, Experience, Education:** headline and compact systems summary; current Subhanu role with clear milestone states; Equvinoxis official internship; education. No oversized “role fit” panels.
- **Page 2 — Major technical work:** expanded entries for CREDA, TrustLayer, AARNA, SmartHelm, PayGuard-AgentX, plus the most relevant additional work (e.g. capstone) as supported. For each, state problem/context, individual/team contribution, system/engineering evidence, technologies, status, and proof link. Do not repeat identical role-fit text.
- **Page 3 — Complete categorized index:** all remaining verified code projects and relevant coursework, hackathons, research, and assessments. Each entry should carry a compact contribution/status/technology/proof record. Distinguish category and attribution; use aliases once in the canonical row, not as extra projects.

An index entry may be one line when its evidence and attribution are simple. Projects needing nuanced attribution/status get a short note. Keep links to public source/demo/report where safe; private projects may use an internal evidence pointer in the working ledger but must not expose it in the PDF.

## 7. Reproducible output and verification

Use the repository’s existing ReportLab builder as the implementation starting point unless inspection shows it cannot satisfy requirements. Keep content data structured so the one-page résumé and detailed CV draw from the same verified evidence ledger without accidentally inheriting each other’s length constraints. Add deterministic build instructions and record the ReportLab/runtime requirements needed to reproduce both PDFs.

Required deliverables after implementation approval:

- `assets/Siddharth-P-Resume.pdf` — one-page universal résumé.
- `assets/Siddharth-P-CV.pdf` — complete detailed CV, target three pages.
- Updated reproducible builder and any source content/ledger intended to be committed (exclude private evidence, internal URLs, and employer-confidential material).

Verification checklist:

- Generate both PDFs twice and compare extracted text/metadata or checksums for deterministic output where feasible.
- Confirm résumé is exactly one A4 page and detailed CV is three pages unless a scope exception is approved.
- Extract text; confirm selectable/searchable order, spelling, dates, titles, canonical project names, page sequence, and no TODO/DRAFT placeholders.
- Inspect all pages as rendered images at normal and high zoom for clipping, overlap, unreadable type, broken glyphs, awkward wraps, and wasted space.
- Verify every embedded hyperlink and contact link; check links in extracted PDF annotations, not only visible text.
- Test a plain-text extraction for ATS reading order; ensure headers/footers do not interrupt the content.
- Confirm that no private source path, internal URL, customer/provider data, or unapproved Subhanu detail appears in either public PDF.

## 8. Acceptance criteria

- “AI Systems Engineer” is professional positioning; employment titles remain official.
- The universal résumé works as a reusable base across the target role families and includes all five required major projects in concise form.
- The detailed CV contains every verified code project and relevant coursework/hackathon/assessment record discovered in the audit, with aliases deduplicated and attribution/status visible.
- CREDA/TrustLayer are not over-described beyond evidence; AARNA is team-attributed; SmartHelm is not called shipped without release proof; PayGuard-AgentX is labeled prototype unless verified otherwise.
- Subhanu role and milestone states are factual and privacy-reviewed; FeeOps remains distinct from employment.
- Both PDFs are legible, ATS-readable, searchable, link-enabled, reproducible, and free of forced blank space or layout defects.
