/* ============================================================
   Siddharth P — Motion layer v6
   NATIVE scroll · hero canvas · shooting stars · constellations
   letter scramble · smooth cursor · counter · stagger
   ============================================================ */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const lerp   = (a, b, n) => a + (b - a) * n;
  const clamp  = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine   = window.matchMedia("(pointer: fine)").matches;

  /* ── Smooth anchor links ────────────────────────────────── */
  function initSmoothLinks() {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }

  /* ── Marquee ─────────────────────────────────────────────── */
  function buildMarquee() {
    const track = $("#marqueeTrack");
    if (!track) return;
    const items = [
      "Local-First AI","RAG Pipelines","Ollama","Docker","n8n Automation",
      "Computer Vision","LLM Workflows","Full-Stack SaaS","Privacy Tooling",
      "Blockchain","IoT","Research Intelligence","Tailscale","Edge AI",
    ];
    const makeSet = () => {
      const f = document.createDocumentFragment();
      items.forEach(it => {
        const s = document.createElement("span"); s.className = "mq-item"; s.textContent = it;
        f.appendChild(s);
        const d = document.createElement("span"); d.className = "mq-sep"; d.textContent = "✦";
        f.appendChild(d);
      });
      return f;
    };
    track.appendChild(makeSet());
    track.appendChild(makeSet());
  }

  /* ── Scroll progress ─────────────────────────────────────── */
  const progressEl = $("#scrollProgress");
  function updateProgress() {
    if (!progressEl) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressEl.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max, 0, 1) : 0})`;
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ── Custom cursor ───────────────────────────────────────── */
  const ringEl  = $("#cursor");
  const dotEl   = $("#cursorDot");
  const labelEl = $("#cursorLabel");
  const cur = { x: -500, y: -500, rx: -500, ry: -500, dx: -500, dy: -500, live: false };

  function initCursor() {
    if (reduce || !fine || !ringEl || !dotEl) return;
    document.body.classList.add("has-cursor");

    window.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      cur.x = e.clientX; cur.y = e.clientY;
      if (!cur.live) {
        cur.live = true; cur.rx = cur.dx = e.clientX; cur.ry = cur.dy = e.clientY;
        ringEl.classList.add("on"); dotEl.classList.add("on");
      }
    }, { passive: true });
    window.addEventListener("pointerdown", () => ringEl.classList.add("down"),   { passive: true });
    window.addEventListener("pointerup",   () => ringEl.classList.remove("down"),{ passive: true });
    document.addEventListener("mouseleave", () => {
      cur.live = false; ringEl.classList.remove("on"); dotEl.classList.remove("on");
    });
    const hoverSel = "a, button, .filter, .chip, input, textarea, [data-cursor]";
    document.addEventListener("pointerover", e => {
      const t = e.target.closest(hoverSel); if (!t) return;
      ringEl.classList.add("hover");
      const lv = t.getAttribute("data-cursor");
      if (lv && labelEl) { labelEl.textContent = lv; ringEl.classList.add("labeled"); }
    });
    document.addEventListener("pointerout", e => {
      const t = e.target.closest(hoverSel); if (!t) return;
      if (!e.relatedTarget || !e.relatedTarget.closest(hoverSel)) {
        ringEl.classList.remove("hover", "labeled");
        if (labelEl) labelEl.textContent = "";
      }
    });
  }

  /* ============================================================
     HERO CANVAS — Astronomical Particle System
     • Drifting star field (3 tiers, twinkle, parallax)
     • Nebula blobs (soft radial gradients)
     • Gravitational sine waves
     • Constellation lines (between nearby bright stars)
     • Shooting stars / comets (periodic, randomised)
     All rendered in a single draw() call from masterLoop.
     ============================================================ */
  function initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return null;

    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, stars = [], blobs = [];

    /* Shooting-star state */
    let comets = [];
    let nextCometTime = 0;

    const mouse = { x: -1, y: -1 };

    /* Colour palette — Hubble / Webb space-telescope tones */
    const A = "70,210,238";    /* stellar cyan   #46D2EE */
    const T = "152,120,255";   /* nebula violet  #9878FF */
    const P = "255,140,200";   /* emission pink  (Orion/Carina) */
    const S = "210,225,255";   /* blue starlight */

    function rand(lo, hi) { return lo + Math.random() * (hi - lo); }

    /* ── Build / rebuild scene on resize ── */
    function buildScene() {
      W = canvas.width  = canvas.parentElement.offsetWidth;
      H = canvas.height = canvas.parentElement.offsetHeight;
      if (!W || !H) return;

      const count = Math.min(185, Math.floor(W * H / 6400));
      stars = Array.from({ length: count }, () => {
        const tier = Math.random();
        return {
          x: rand(0, W), y: rand(0, H),
          r:    tier > 0.93 ? rand(1.6, 2.3)
              : tier > 0.80 ? rand(0.9, 1.6)
              : rand(0.15, 0.80),
          vx:   rand(-0.080, 0.080),
          vy:   rand(-0.090, 0.010),
          base: rand(0.06, 0.58),
          tw:   rand(0, Math.PI * 2),
          ts:   rand(0.007, 0.025),
          rgb:  Math.random() > 0.90 ? A
              : Math.random() > 0.78 ? T
              : Math.random() > 0.93 ? P
              : S,
        };
      });

      blobs = [
        { cx: W * 0.83, cy: H * 0.30, r: W * 0.42, rgb: A, a: 0.026 },
        { cx: W * 0.12, cy: H * 0.58, r: W * 0.34, rgb: T, a: 0.022 },
        { cx: W * 0.50, cy: H * 0.02, r: W * 0.30, rgb: P, a: 0.014 },
        { cx: W * 0.60, cy: H * 0.88, r: W * 0.25, rgb: T, a: 0.012 },
        { cx: W * 0.25, cy: H * 0.15, r: W * 0.22, rgb: A, a: 0.010 },
      ];

      comets = [];
    }

    /* ── Spawn a new comet / shooting star ── */
    function spawnComet(now) {
      if (now < nextCometTime) return;
      nextCometTime = now + rand(2800, 6500); /* every 2.8 – 6.5 s */
      const angle = (rand(200, 245)) * Math.PI / 180;
      const speed = rand(10, 18);
      comets.push({
        x:   rand(W * 0.15, W + 60),
        y:   rand(-40, H * 0.45),
        vx:  Math.cos(angle) * speed,
        vy:  Math.sin(angle) * speed,
        len: rand(80, 200),
        life: 1.0,
        decay: rand(0.009, 0.018),
        rgb: Math.random() > 0.45 ? S : A,
        w:   rand(0.8, 1.8),
      });
    }

    /* ── Main draw — called every frame from masterLoop ── */
    function draw(now) {
      ctx.clearRect(0, 0, W, H);
      if (!W || !H) return;

      const mx = mouse.x < 0 ? W * 0.5 : mouse.x;
      const my = mouse.y < 0 ? H * 0.5 : mouse.y;
      const pxOff = (mx / W - 0.5) * 10;
      const pyOff = (my / H - 0.5) *  6;

      /* ── 1. Nebula atmosphere ── */
      blobs.forEach(b => {
        const g = ctx.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, b.r);
        g.addColorStop(0,   `rgba(${b.rgb},${b.a})`);
        g.addColorStop(0.5, `rgba(${b.rgb},${+(b.a * 0.35).toFixed(4)})`);
        g.addColorStop(1,   "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.cx, b.cy, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ── 2. Shooting stars / comets ── */
      spawnComet(now);
      comets = comets.filter(c => c.life > 0);
      comets.forEach(c => {
        c.x += c.vx; c.y += c.vy;
        c.life -= c.decay;
        /* normalised tail direction */
        const spd = Math.sqrt(c.vx * c.vx + c.vy * c.vy);
        const tx  = c.x - (c.vx / spd) * c.len;
        const ty  = c.y - (c.vy / spd) * c.len;
        const g   = ctx.createLinearGradient(c.x, c.y, tx, ty);
        g.addColorStop(0, `rgba(${c.rgb},${c.life.toFixed(3)})`);
        g.addColorStop(0.3, `rgba(${c.rgb},${+(c.life * 0.4).toFixed(3)})`);
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = g;
        ctx.lineWidth = c.w;
        ctx.stroke();
        /* bright tip */
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.w * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.rgb},${c.life})`;
        ctx.fill();
      });

      /* ── 3. Gravitational-wave interference ── */
      const waveDefs = [
        [H*0.720, 11, 132, 3400, 4.5,  66, 2200, A, 0.050],
        [H*0.758,  8, 114, 2800, 3.0,  57, 1900, T, 0.038],
        [H*0.680,  5, 160, 4200, 2.0,  80, 2700, P, 0.020],
        [H*0.742,  3,  96, 3100, 1.5,  48, 2000, T, 0.016],
      ];
      waveDefs.forEach(([base, a1, f1, s1, a2, f2, s2, c, o]) => {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y = base + Math.sin(x / f1 + now / s1) * a1 + Math.sin(x / f2 + now / s2) * a2;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${c},${o})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      /* ── 4. Constellation lines (medium+ stars only, O(n²) on ~50 stars) ── */
      const brightStars = stars.filter(s => s.r > 0.75);
      ctx.lineWidth = 0.4;
      brightStars.forEach((p, i) => {
        for (let j = i + 1; j < brightStars.length; j++) {
          const q  = brightStars[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 115 * 115) {
            const alpha = (1 - Math.sqrt(d2) / 115) * 0.065;
            ctx.strokeStyle = `rgba(${S},${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      /* ── 5. Stars ── */
      stars.forEach(p => {
        p.x += p.vx + pxOff * 0.00052 * p.r;
        p.y += p.vy + pyOff * 0.00034 * p.r;
        if (p.x < 0) p.x += W; else if (p.x > W) p.x -= W;
        if (p.y < 0) p.y += H; else if (p.y > H) p.y -= H;
        p.tw += p.ts;

        const alpha = p.base * (0.50 + 0.50 * Math.sin(p.tw));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgb(${p.rgb})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.r > 1.1) {
          const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5.5);
          halo.addColorStop(0, `rgba(${p.rgb},${+(alpha * 0.18).toFixed(3)})`);
          halo.addColorStop(1, "transparent");
          ctx.globalAlpha = 1;
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 5.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
    }

    window.addEventListener("pointermove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    let resizeTimer;
    window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(buildScene, 180); }, { passive: true });

    buildScene();
    return draw;
  }

  /* ============================================================
     LETTER SCRAMBLE — hero name resolves from chaos on reveal
     Inspired by how real telescope data is decoded:
     noise → signal.
     ============================================================ */
  function initScramble() {
    if (reduce) return;
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*";

    function scramble(el, original, duration) {
      let start = null;
      function frame(ts) {
        if (!start) start = ts;
        const t       = Math.min((ts - start) / duration, 1);
        /* cubic ease — letters resolve left to right */
        const eased   = t * t * (3 - 2 * t);
        const resolved = Math.floor(eased * original.length);
        el.textContent = original.split("").map((ch, i) =>
          i < resolved ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("");
        if (t < 1) requestAnimationFrame(frame);
        else el.textContent = original;
      }
      requestAnimationFrame(frame);
    }

    /* Watch for the .in class added by app.js initReveal() */
    const first = $(".hn-first");
    const last  = $(".hn-last");

    if (first) {
      const obs = new MutationObserver(() => {
        if (!first.classList.contains("in")) return;
        obs.disconnect();
        const orig = first.textContent.trim();
        scramble(first, orig, 950);
      });
      obs.observe(first, { attributes: true, attributeFilter: ["class"] });
    }

    if (last) {
      const obs2 = new MutationObserver(() => {
        if (!last.classList.contains("in")) return;
        obs2.disconnect();
        /* last = "P." — preserve the <em> wrapper by only touching first child text node */
        const textNode = [...last.childNodes].find(n => n.nodeType === 3 && n.nodeValue.trim());
        if (!textNode) return;
        const orig = textNode.nodeValue;
        let start = null;
        const DUR  = 700;
        function frame(ts) {
          if (!start) start = ts;
          const t = Math.min((ts - start) / DUR, 1);
          const eased = t * t * (3 - 2 * t);
          const resolved = Math.floor(eased * orig.length);
          textNode.nodeValue = orig.split("").map((ch, i) =>
            i < resolved ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join("");
          if (t < 1) requestAnimationFrame(frame);
          else textNode.nodeValue = orig;
        }
        requestAnimationFrame(frame);
      });
      obs2.observe(last, { attributes: true, attributeFilter: ["class"] });
    }
  }

  /* ── Magnetic buttons ────────────────────────────────────── */
  function initMagnetic() {
    if (reduce || !fine) return;
    $$(".btn-primary").forEach(b => {
      b.addEventListener("pointermove", e => {
        const r = b.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) / r.width;
        const y = (e.clientY - r.top  - r.height / 2) / r.height;
        b.style.transform = `translate(${x * 6}px,${y * 6}px)`;
      }, { passive: true });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  /* ── Stagger grid items ──────────────────────────────────── */
  function initStagger() {
    ["#skillsGrid","#svcGrid",".contact-info","#buildList"].forEach(sel => {
      const host = $(sel); if (!host) return;
      [...host.children].forEach((c, i) => { c.style.transitionDelay = (i * 0.055) + "s"; });
    });
  }

  /* ── Counter animation ───────────────────────────────────── */
  function animateCount(el) {
    const raw  = el.dataset.orig || el.textContent.trim();
    el.dataset.orig = raw;
    const num  = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (isNaN(num) || num === 0) return;
    const suffix = raw.replace(/^[\d.]+/, "");
    const dur  = 1400;
    const ease = t => 1 - Math.pow(1 - t, 3);
    const t0   = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(ease(p) * num) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const targets = [
      ...$$("#about .stat .n"),
      ...$$(".hs-n"),
    ].filter(el => /^\d/.test(el.textContent.trim()));
    if (!targets.length) return;

    const obs = new IntersectionObserver((entries, io) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        animateCount(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });

    targets.forEach(el => obs.observe(el));
  }

  /* ── Master RAF — cursor lerp + canvas draw ─────────────── */
  let canvasDraw = null;

  function masterLoop(now) {
    if (cur.live && ringEl && dotEl) {
      cur.rx = lerp(cur.rx, cur.x, 0.14); cur.ry = lerp(cur.ry, cur.y, 0.14);
      cur.dx = lerp(cur.dx, cur.x, 0.52); cur.dy = lerp(cur.dy, cur.y, 0.52);
      ringEl.style.transform = `translate3d(${cur.rx}px,${cur.ry}px,0) translate(-50%,-50%)`;
      dotEl.style.transform  = `translate3d(${cur.dx}px,${cur.dy}px,0) translate(-50%,-50%)`;
    }
    if (canvasDraw) canvasDraw(now);
    requestAnimationFrame(masterLoop);
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    buildMarquee();
    initSmoothLinks();
    initCursor();
    initMagnetic();
    initStagger();
    initCounters();
    initScramble();
    if (!reduce) canvasDraw = initHeroCanvas();
    requestAnimationFrame(masterLoop);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
