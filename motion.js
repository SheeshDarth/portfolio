/* ============================================================
   Siddharth P — Motion layer (purposeful only)
   smooth links · capabilities marquee · scroll progress · counters · stagger.
   No canvas / cursor / magnetic / scramble / aurora — motion communicates
   state and continuity only.
   ============================================================ */
(function () {
  "use strict";
  const $  = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Smooth anchor scrolling */
  function initSmoothLinks() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        const top = t.getBoundingClientRect().top + window.scrollY - 68;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      });
    });
  }

  /* Capabilities marquee (paused on hover; stacks when reduced-motion) */
  function buildMarquee() {
    const track = $("#marqueeTrack");
    if (!track) return;
    const items = [
      "Local-First AI", "RAG Pipelines", "Ollama", "LLM Safety", "Docker",
      "Computer Vision", "Vision Transformers", "LLM Workflows", "Full-Stack SaaS",
      "Explainable AI", "Privacy Tooling", "Space Systems", "Anomaly Detection",
      "Blockchain", "IoT", "Research Intelligence", "Edge AI",
    ];
    const makeSet = () => {
      const f = document.createDocumentFragment();
      items.forEach((it) => {
        const s = document.createElement("span"); s.className = "mq-item"; s.textContent = it; f.appendChild(s);
        const d = document.createElement("span"); d.className = "mq-sep"; d.textContent = "/"; f.appendChild(d);
      });
      return f;
    };
    track.appendChild(makeSet());
    track.appendChild(makeSet());
  }

  /* Scroll progress bar */
  function initScrollProgress() {
    const bar = $("#scrollProgress");
    if (!bar) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max, 0, 1) : 0})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* Count-up for stats (state: "these numbers were computed") */
  function animateCount(el) {
    const raw = el.dataset.orig || el.textContent.trim();
    el.dataset.orig = raw;
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (isNaN(num) || num === 0) return;
    const suffix = raw.replace(/^[\d.]+/, "");
    if (reduce) { el.textContent = num + suffix; return; }
    const dur = 1200, ease = (t) => 1 - Math.pow(1 - t, 3), t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(ease(p) * num) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const targets = [...$$("#about .stat .n"), ...$$(".hs-n")]
      .filter((el) => /^\d/.test(el.textContent.trim()) && !el.hasAttribute("data-no-count"));
    if (!targets.length) return;
    const obs = new IntersectionObserver((entries, io) => {
      entries.forEach((e) => { if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    targets.forEach((el) => obs.observe(el));
  }

  /* Stagger reveal delays for grid children */
  function initStagger() {
    ["#skillsGrid", "#svcGrid", "#buildList"].forEach((sel) => {
      const host = $(sel); if (!host) return;
      [...host.children].forEach((c, i) => { c.style.transitionDelay = (i * 0.05) + "s"; });
    });
  }

  function init() {
    initSmoothLinks();
    buildMarquee();
    initScrollProgress();
    initCounters();
    initStagger();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
