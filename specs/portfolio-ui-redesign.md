# Portfolio Website — Personal Engineering Field-Notes Redesign

**Status:** Ready for design and implementation

**Scope:** Editable desktop/mobile Figma concept, then implementation in the existing static site
**Positioning:** AI Systems Engineer | Agentic AI • Enterprise AI Infrastructure • AI Product Engineering

## 1. Product goal

Turn the portfolio from a generic project showcase into a personal, evidence-led introduction to how Siddharth thinks and builds across agent systems, enterprise workflows, and shipped user-facing products. The site should make a hiring manager understand the person, the systems, the contribution, and the maturity of each project without asking them to infer those things from a tool list.

Use an **engineering field-notes** identity: warm paper and ink, restrained cobalt and signal-orange accents, precise annotations, compact metadata, and authored narrative. This direction is intentionally distinct from the current dark/neon “AI dashboard” pattern. Avoid generic gradients, glowing orbs, repeated project cards, stock AI imagery, and interchangeable marketing copy.

The portfolio is a curated highlight reel, not a duplicate of the exhaustive CV. Use [Josh Comeau’s portfolio guidance](https://www.joshwcomeau.com/effective-portfolio/) for project-specific storytelling and curation principles only; do not copy its visual design, wording, or illustrations.

## 2. Design principles

1. **Authored over generic:** write in first person, with specific decisions, constraints, contributions, and lessons. Avoid boilerplate such as “passionate innovator,” inflated AI claims, or generated-sounding taglines.
2. **Evidence before polish:** use authentic product interfaces, code/architecture evidence, release links, or diagrams that explain real systems. Never fabricate dashboards, metrics, users, or deployment maturity.
3. **Make status legible:** every project states shipped, team-built testnet, existing app/release unverified, prototype, active build, or other evidence-supported status.
4. **Show the connective story:** establish how platform/agent engineering relates to actual product work, rather than presenting unrelated tool stacks.
5. **Protect private work:** represent Subhanu work as current experience with high-level wording. No internal screenshots, URLs, architecture details, customer/provider data, or sensitive implementation specifics without explicit clearance.
6. **Keep restraint:** texture and annotation should support hierarchy, not obscure it. Use the portrait once with intentional crop/context; do not scatter decorative visual motifs across every section.

### Visual system (Figma and implementation)

- Warm neutral “paper” background; ink/dark-charcoal typography; cobalt for primary interactive emphasis; signal-orange for small status/annotation accents; fine warm-gray rules. Define final tokens in Figma after checking contrast and in-browser rendering.
- Use the repository’s self-hosted Plex font files. Pair readable sans text with restrained monospace for labels, indices, and diagram annotations; do not load fonts from a CDN.
- Use asymmetrical editorial composition, a readable measure, varied section rhythm, and a mix of prose, annotated system diagrams, and artifact-led evidence. Avoid a six-card grid or a repeated card treatment for all projects.
- Motion is optional and subtle; the information hierarchy and diagrams remain complete with motion disabled.
- Use CSS/inline SVG/HTML for diagrams and rules where practical; use only authentic project screenshots, the existing portrait, and approved assets.

## 3. Evidence and content gate

The evidence ledger defined in `specs/resume-and-detailed-cv.md` is the shared source of truth for project names, roles, technologies, dates, statuses, aliases, and public eligibility. Reconcile it before final site copy.

For every published case study, verify:

- canonical name and any necessary alias;
- user’s specific contribution, including team attribution;
- status and proof for that status;
- actual architecture/flow and technologies shown;
- real constraints and trade-offs;
- safe repository/demo/media destination and permission to publish it.

If evidence is insufficient, either ask Siddharth, qualify the copy, or omit the claim. A GitHub repository or folder is evidence of source presence, not proof of sole authorship, shipping, usage, or publication permission.

## 4. Information architecture

Keep the site a responsive single-page experience with stable anchors: `work`, `about`, `experience`, and `contact`. Do not break inbound links to those anchors.

1. **Header:** name/monogram, compact nav, visible résumé/CV download links. Mobile nav is keyboard-operable, closes on Escape, traps focus only while open if implemented as a modal, and returns focus to its trigger.
2. **Hero / introduction:** headline “AI Systems Engineer”; supporting line “Agentic AI • Enterprise AI Infrastructure • AI Product Engineering”; a specific, first-person two- or three-sentence explanation of the work; portrait used with intent; primary “Explore work” and GitHub actions. Avoid generic claims and wall-of-pills skill clouds.
3. **Working map:** an accessible Platform → Agents → Product diagram showing the relationship among system foundations, agent workflows, and products. It is explanatory HTML/SVG with text equivalents, not an image-only infographic.
4. **Selected work (`#work`):** five case-study narratives in intentional editorial layouts, not identical cards: CREDA, AARNA, SmartHelm, TrustLayer, and PayGuard-AgentX.
5. **Current experience (`#experience`):** separate Subhanu FDE Intern and Equvinoxis AI/ML Intern entries, preserving official titles and verified dates. Subhanu remains high-level until publication is cleared; never conflate FeeOps assessment with the role.
6. **About / operating style (`#about`):** concise personal narrative connecting enterprise agent workflows with building products people use; show technical judgment through one or two concrete, verified trade-offs rather than a long biography or generic list.
7. **Project archive:** compact, categorized links for remaining verified public work, clearly secondary to featured projects. Do not restore a large repetitive project-card catalogue.
8. **Contact (`#contact`):** working email, phone if still intentionally public, LinkedIn, GitHub, résumé, and detailed CV links. Do not retain fake booking buttons or nonfunctional forms.
9. **Footer:** ownership, update date only if maintained, and concise link set; avoid invented “available for hire” state.

## 5. Featured case-study requirements

Each featured project should answer, in scannable language: **What problem? What did Siddharth do? How does the system work? What is its status? What trade-off or constraint mattered? What can the reader inspect?** Use different composition patterns but a consistent evidence label and narrative order.

| Project | Required framing | Guardrails |
| --- | --- | --- |
| **CREDA** | Shipped product; explain verified user/problem context, individual contribution, system structure, and public product/demo. | “Shipped” is user-stated; verify active URL and avoid unsupported impact or adoption metrics. |
| **AARNA** | Team-built Algorand testnet project; show verified on-chain/application flow and Siddharth’s part. | Attribute the team and individual contribution; do not suggest a production chain or sole authorship. Reconcile duplicate `aarna-mvp` folders and repo aliases. |
| **SmartHelm** | Major edge-AI/rider-safety project with an existing app artifact; make the app inspectable if safe. | App existence is not evidence of public release. Do not call it shipped or production-ready absent release evidence. Separate implemented and planned features. |
| **TrustLayer** | Shipped product; describe only verified product function and contribution; link to the real product/source. | Resolve the public product/repository evidence. Do not invent a GitHub repository URL or add unverified performance claims. |
| **PayGuard-AgentX** | Agentic prototype; explain verified orchestration/tool/approval/audit flow using a small system diagram or actual artifact. | Label prototype clearly. Mention MCP tools, orchestration, audit evidence, and human approvals only if implementation evidence supports each. |

All five are compulsory major projects. Each needs an explicit status label, short problem statement, contribution attribution, actual system evidence, and a working outbound link or a reason no public artifact is available. Use screenshots only if they are authentic, current enough for their claim, readable on mobile, and cleared for publication.

## 6. Subhanu experience presentation

Subhanu work is a separate current experience section, not one of the five public-project cards. Use **FDE Intern — Subhanu | Current** and avoid an invented start date.

Present this as a concise technical overview: work across Subhanu's **Enterprise AI platform (LibreChat and its agent workflows), the KiddyPi app, and a Voice Agent**, with emphasis on agent orchestration, conversational interfaces, and product integration. Do not include internal progress states or critical implementation details. Do not show proprietary system diagrams, exact integration architecture, screenshots, internal URLs, or customer/provider specifics.

## 7. Figma concept deliverable

Before coding the visual redesign, create an **editable Figma file** with:

- design tokens for color, type, spacing, rules, focus, and status labels;
- desktop layout at a wide viewport and mobile layout at 375px (include a tablet adaptation or responsive rules);
- hero, working map, two contrasting case-study compositions, experience, archive, contact, and footer;
- component variants for link/button, status label, project metadata, diagram annotation, and mobile navigation;
- visible keyboard focus and reduced-motion state notes;
- sample copy/artifacts sourced from verified evidence, with placeholders explicitly marked only inside the design file where facts remain pending.

The Figma file must be owned/editable by Siddharth and must not be a static screenshot or copied reference-site template. This specification step creates no Figma file; obtain/confirm the intended Figma workspace/file only when design work begins.

## 8. Implementation constraints

- Preserve the existing lightweight static HTML/CSS/JavaScript architecture and self-hosted fonts; no framework migration, backend, runtime GitHub API, analytics, CDN, or third-party runtime dependency.
- Reuse and refine current semantic landmarks, portrait, and verified links instead of introducing a new asset set by default.
- Maintain a readable HTML source, progressive enhancement, real link destinations, descriptive alt text, and no fake buttons/forms.
- Update page title, description, Open Graph/Twitter metadata, JSON-LD, canonical URL, robots, sitemap, and favicon consistently with the approved production domain (currently `https://siddharth-portfolio-ashen.vercel.app/`, verify deployment/domain ownership before release).
- Keep `.claude/settings.local.json` untouched and untracked.
- Keep résumé/CV link paths stable when replacing PDFs; if names must change, provide redirects or compatibility links.

## 9. Validation and release gate

### Content and links

- Verify every featured-project, archive, social, contact, résumé, and CV destination. Confirm outbound link text describes its destination.
- Remove `TODO`, `DRAFT`, placeholder, fake scheduling, and nonworking contact actions from the public experience.
- Ensure project statuses, dates, contribution, technology labels, and private-work redactions match the shared evidence ledger.
- Confirm no unsupported repository counts, “shipped project” totals, user metrics, or universal role claims remain.

### Responsive, accessibility, and behavior

- Inspect wide desktop, tablet, 375px mobile, mobile landscape, and 200% text zoom; confirm no horizontal overflow or clipped controls.
- Keyboard-test skip link, navigation, all actions, mobile menu Escape behavior, visible focus, and focus return after menu close.
- Validate landmark/heading order, alt text, diagram text equivalents, link purpose, and minimum 44×44 CSS-pixel touch targets for primary mobile controls.
- Check WCAG AA contrast for body, muted text, status labels, rules, focus indicators, and hover states.
- Verify reduced-motion preference removes nonessential motion without hiding content.
- Check browser console/network for errors and confirm there are no unexpected external requests or third-party dependencies.

### Deployment

- Build/serve locally and compare desktop/mobile behavior against Figma.
- Verify static hosting paths and PDF downloads before publishing.
- Only release after evidence/privacy review, accessibility checks, link checks, and the CV/PDF acceptance checklist in the companion spec pass.
- After push/deploy, verify the live canonical URL, project links, page metadata, and downloadable PDFs. Record deployment evidence; do not claim success based only on a successful push.

## 10. Acceptance criteria

- Visitors can tell who Siddharth is and why his AI systems/product work belongs together within the first screen.
- The visual identity feels authored and specific to engineering field notes, not a generic AI dashboard or card gallery.
- Five mandatory case studies are present and differentiated by evidence, contribution, trade-offs, and status; Subhanu work is separate and privacy-safe.
- Remaining verified work is available through a compact archive, with the exhaustive inventory reserved for the detailed CV.
- The editable Figma concept covers desktop/mobile and maps to the implementation without introducing copied or fictitious content.
- Stable anchors, contacts, PDFs, accessibility, responsive behavior, metadata, and static deployment all pass the validation gate.
