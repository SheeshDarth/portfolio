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
     DATA — lives in data.js, loaded before this file and shared
     with the site agent's backend (api/chat.js) so the page and
     the agent can never say different things. Edit data.js, not
     this file, to change portfolio content.
     ============================================================ */
  const { BUILD, FOCUS_CHIPS, FILTERS, PROJECTS, SKILLS, SERVICES, HACKATHONS } = window.SITE_DATA;

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

  /* Numbered index row — editorial layout with Mission-Control status chip. */
  function projCard(p, i) {
    const row = el("div", "prow reveal");
    row.dataset.cats = p.cats.join(",");
    const num    = String(i + 1).padStart(2, "0");
    const points = p.points.map((x) => `<li>${x}</li>`).join("");
    const tags   = p.tags.map((t) => `<span class="t">${t}</span>`).join("");
    const links  = p.links.map(([label, href, kind]) =>
      `<a class="btn btn-sm ${kind === "link" ? "btn-primary" : "btn-ghost"}" href="${href}" target="_blank" rel="noopener">${kind === "github" ? icon("github") : icon("link")}${label}</a>`
    ).join("");
    row.innerHTML = `
      <div class="prow-num">${num}</div>
      <div class="prow-body">
        <div class="prow-top">
          <div><span class="prow-cat">${p.cat}</span><h3>${p.title}</h3></div>
          <span class="proj-status ${p.status[0]}"><span class="d"></span>${p.status[1]}</span>
        </div>
        <p class="prow-desc">${p.desc}</p>
        <ul class="prow-points">${points}</ul>
        <div class="prow-foot">
          <div class="prow-tags">${tags}</div>
          <div class="prow-links">${links}</div>
        </div>
      </div>`;
    return row;
  }

  /* Pointer-follow glare + subtle 3D tilt for every .card and the hero portrait.
     Tilt is set inline so it beats the reveal system's `.reveal.in { transform:none }`. */
  function initCardSpotlight() {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine   = matchMedia("(pointer: fine)").matches;
    const doTilt = !reduce && fine;
    const SEL = ".card:not(.form), .hero-photo-card";
    let active = null;
    const reset = (el) => { el.style.transform = ""; el.style.transition = ""; };
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest ? e.target.closest(SEL) : null;
      if (card !== active) { if (active) reset(active); active = card; }
      if (!card) return;
      const r = card.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top)  / r.height;
      card.style.setProperty("--mx", (nx * 100) + "%");
      card.style.setProperty("--my", (ny * 100) + "%");
      if (doTilt) {
        const isHero = card.classList.contains("hero-photo-card");
        const max  = isHero ? 3 : 3.5;          /* tasteful, low magnitude */
        const lift = isHero ? -4 : -6;
        const rx = ((ny - 0.5) * max).toFixed(2);   /* rotateX from vertical position */
        const ry = ((0.5 - nx) * max).toFixed(2);   /* rotateY from horizontal position */
        card.style.transition = "transform .14s ease-out";
        card.style.transform  = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${lift}px)`;
      }
    }, { passive: true });
    window.addEventListener("blur", () => { if (active) { reset(active); active = null; } });
  }

  function renderProjects(filter = "All") {
    const grid = $("#projGrid"); if (!grid) return;
    grid.innerHTML = "";
    const filtered = PROJECTS.filter((p) => filter === "All" || p.cats.includes(filter));
    filtered.forEach((p, i) => {
      const c = projCard(p, i);
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

  function renderHackathons() {
    const h = $("#hackGrid"); if (!h) return;
    HACKATHONS.forEach((hk, i) => {
      const certs = hk.certs.length
        ? `<div class="hack-certs">${hk.certs.map(([label, file]) =>
            `<a class="btn btn-sm btn-ghost" href="${file}" target="_blank" rel="noopener">${icon("award")}${label}</a>`).join("")}</div>`
        : "";
      h.appendChild(el("div", "card hack-card reveal d" + ((i % 4) + 1), `
        <div class="hack-top">
          <span class="hack-ic">${icon("award")}</span>
          <span class="hack-result">${hk.result}</span>
        </div>
        <h3>${hk.event}</h3>
        <p class="hack-meta">${hk.org} · ${hk.date}</p>
        <a class="hack-project" href="${hk.projectLink}" target="_blank" rel="noopener">${icon("link")}${hk.project}</a>
        ${certs}
      `));
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
    renderHackathons();
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
