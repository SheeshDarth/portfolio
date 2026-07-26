/* ============================================================
   Siddharth P — Motion layer · "Blue Terminal"
   digital-rain background · typing terminal boot · pixel-you mascot guide
   · capabilities marquee · scroll progress · counters · stagger.
   Signature motion + purposeful motion. Reduced-motion aware.
   ============================================================ */
(function () {
  "use strict";
  const $  = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- smooth anchor scrolling ---- */
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

  /* ---- capabilities marquee ---- */
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
        const d = document.createElement("span"); d.className = "mq-sep"; d.textContent = "//"; f.appendChild(d);
      });
      return f;
    };
    track.appendChild(makeSet());
    track.appendChild(makeSet());
  }

  /* ---- scroll progress ---- */
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

  /* ---- count-up ---- */
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

  /* ---- stagger ---- */
  function initStagger() {
    ["#skillsGrid", "#svcGrid", "#buildList"].forEach((sel) => {
      const host = $(sel); if (!host) return;
      [...host.children].forEach((c, i) => { c.style.transitionDelay = (i * 0.05) + "s"; });
    });
  }

  /* ---- pixelate the real photo → blue pixel-you avatar (canvas downsample) ---- */
  function pixelateAvatar() {
    const targets = $$(".mascot-av img, .mascot-reopen img");
    if (!targets.length) return;
    const img = new Image();
    img.onload = () => {
      try {
        const S = 42;
        const c = document.createElement("canvas"); c.width = S; c.height = S;
        const ctx = c.getContext("2d");
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2, sy = (img.height - side) * 0.12;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, sx, sy, side, side, 0, 0, S, S);
        const url = c.toDataURL("image/png");
        targets.forEach((el) => { el.src = url; });
      } catch (e) { /* keep original photo as fallback */ }
    };
    img.src = "assets/siddharth.jpeg?v=8";
  }

  /* ---- mascot guide: section-aware speech bubbles ---- */
  function initMascot() {
    const m = $("#mascot"); if (!m) return;
    const msg = $("#mascotMsg"), closeBtn = $("#mascotClose"), reopen = $("#mascotReopen");
    const MSGS = {
      home:       "hey — I'm Siddharth. scroll down, or jump to a section and I'll narrate.",
      about:      "a bit about me: I build AI systems end-to-end, not just notebooks.",
      focus:      "right now I'm building OriginX-T — it catches bad fine-tuning data early.",
      projects:   "these are things I've actually shipped & built. try the filters above.",
      hackathons: "a few of these were built in 24–48h, under the clock.",
      skills:     "the stack I reach for — local-first AI, full-stack, a bit of everything.",
      services:   "ways I can help on AI, automation, and product work.",
      experience: "where I've worked and studied so far.",
      contact:    "like what you see? let's build something — ping me right here. ↓",
    };
    let cur = "";
    const set = (id) => {
      const t = MSGS[id]; if (!t || t === cur) return; cur = t;
      msg.style.opacity = "0";
      setTimeout(() => { msg.textContent = t; msg.style.opacity = "1"; }, reduce ? 0 : 180);
    };
    const spy = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) set(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["home","about","focus","projects","hackathons","skills","services","experience","contact"]
      .forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
    closeBtn.addEventListener("click", () => { m.classList.add("hidden"); reopen.classList.add("show"); });
    reopen.addEventListener("click", () => { m.classList.remove("hidden"); reopen.classList.remove("show"); });
  }

  /* ---- terminal boot: type the hero out like a shell session ---- */
  function heroBoot() {
    const host = $("#termBody"); if (!host) return;
    const seq = [
      { t: "$ whoami", c: "tprompt" },
      { t: "Siddharth P — AI/ML systems builder", big: true },
      { t: "# Bengaluru · BNMIT B.E. AI/ML '27 · open to internships", c: "tcomment" },
      { t: "" },
      { t: "$ cat focus.txt", c: "tprompt" },
      { t: "LLM fine-tuning safety · explainable space mission-assurance", c: "tout" },
      { t: "offline-first research intelligence · privacy-conscious systems", c: "tout" },
      { t: "" },
      { t: "$ ls ./projects | wc -l", c: "tprompt" },
      { t: "14 systems  —  3 live, several building", c: "tout" },
      { t: "" },
      { t: "$ open ./projects", c: "tprompt", caret: true },
    ];
    const makeLine = (item) => {
      const line = document.createElement(item.big ? "h1" : "div");
      line.className = "tline " + (item.big ? "tout" : (item.c || ""));
      return line;
    };
    const addCaret = (line) => { const c = document.createElement("span"); c.className = "caret"; line.appendChild(c); };
    host.innerHTML = "";

    if (reduce) {
      seq.forEach((item) => {
        const line = makeLine(item);
        line.textContent = item.t;
        if (item.t === "") line.innerHTML = "&nbsp;";
        if (item.caret) addCaret(line);
        host.appendChild(line);
      });
      return;
    }

    let li = 0;
    const typeLine = () => {
      if (li >= seq.length) return;
      const item = seq[li++];
      const line = makeLine(item);
      host.appendChild(line);
      if (item.t === "") { line.innerHTML = "&nbsp;"; setTimeout(typeLine, 80); return; }
      let ci = 0;
      const typeChar = () => {
        line.textContent = item.t.slice(0, ci++);
        if (ci <= item.t.length) setTimeout(typeChar, 10 + Math.random() * 16);
        else { if (item.caret) addCaret(line); setTimeout(typeLine, 130); }
      };
      typeChar();
    };
    typeLine();
  }

  /* ---- animated blue background: digital rain ---- */
  function initBgCanvas() {
    if (reduce) return;
    const cv = $("#bgCanvas"); if (!cv) return;
    const ctx = cv.getContext("2d");
    const CHARS = "01<>[]{}/\\=+*01λπΣ∆AIΩ01";
    const FS = 15, GAP = 27;
    let W, H, streams, raf;
    function resize() {
      W = cv.width = window.innerWidth; H = cv.height = window.innerHeight;
      const n = Math.max(1, Math.floor(W / GAP));
      streams = Array.from({ length: n }, (_, i) => ({
        x: i * GAP + GAP / 2, y: Math.random() * -H,
        speed: 0.6 + Math.random() * 1.3, len: 6 + Math.floor(Math.random() * 10), tick: Math.random() * 100,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.font = FS + 'px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      for (const s of streams) {
        for (let k = 0; k < s.len; k++) {
          const yy = s.y - k * FS;
          if (yy < -FS || yy > H + FS) continue;
          const a = 1 - k / s.len;
          ctx.fillStyle = k === 0
            ? "rgba(130,224,255," + (0.9 * a).toFixed(3) + ")"
            : "rgba(56,140,235," + (0.26 * a).toFixed(3) + ")";
          const idx = Math.abs(Math.floor(s.x + yy + s.tick)) % CHARS.length;
          ctx.fillText(CHARS[idx], s.x, yy);
        }
        s.y += s.speed * 1.7; s.tick += 0.25;
        if (s.y - s.len * FS > H) { s.y = Math.random() * -H * 0.5; s.speed = 0.6 + Math.random() * 1.3; s.len = 6 + Math.floor(Math.random() * 10); }
      }
      raf = requestAnimationFrame(draw);
    }
    resize();
    let t;
    window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(resize, 180); }, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    });
    raf = requestAnimationFrame(draw);
  }

  function init() {
    initSmoothLinks();
    buildMarquee();
    initScrollProgress();
    initCounters();
    initStagger();
    pixelateAvatar();
    initMascot();
    heroBoot();
    initBgCanvas();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
