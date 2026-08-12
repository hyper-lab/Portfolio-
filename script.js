document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============ Mobile nav toggle ============ */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

/* ============ Scroll reveals ============ */
const revealEls = document.querySelectorAll("[data-reveal]");
if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
}

/* ============ Typing animation ============ */
const typedEl = document.getElementById("typed");
if (typedEl) {
  const phrases = [
    "building full-stack web applications.",
    "designing RAG-based retrieval pipelines.",
    "shipping CasePoint for RTC Branch 17.",
    "backend lead — FastAPI, LlamaIndex, ChromaDB.",
  ];

  if (reduceMotion) {
    typedEl.textContent = phrases[0];
  } else {
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    const TYPE_MS = 55;
    const DELETE_MS = 28;
    const HOLD_MS = 1600;
    const BETWEEN_MS = 320;

    const tick = () => {
      const phrase = phrases[phraseIdx];
      if (!deleting) {
        charIdx++;
        typedEl.textContent = phrase.slice(0, charIdx);
        if (charIdx === phrase.length) {
          deleting = true;
          setTimeout(tick, HOLD_MS);
          return;
        }
        setTimeout(tick, TYPE_MS);
      } else {
        charIdx--;
        typedEl.textContent = phrase.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(tick, BETWEEN_MS);
          return;
        }
        setTimeout(tick, DELETE_MS);
      }
    };
    setTimeout(tick, 600);
  }
}

/* ============ Animated background (particle network) ============ */
(() => {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  if (reduceMotion) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  let rafId = null;
  let mouse = { x: -9999, y: -9999, active: false };

  const ACCENT = "rgba(34, 211, 238,";

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  };

  const initParticles = () => {
    const target = Math.min(90, Math.floor((width * height) / 18000));
    particles = [];
    for (let i = 0; i < target; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      });
    }
  };

  const step = () => {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width)  p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14400) {
          const f = (1 - d2 / 14400) * 0.04;
          p.vx += (dx / Math.sqrt(d2)) * f;
          p.vy += (dy / Math.sqrt(d2)) * f;
        }
      }

      p.vx = Math.max(-0.6, Math.min(0.6, p.vx));
      p.vy = Math.max(-0.6, Math.min(0.6, p.vy));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT + " 0.55)";
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14400) {
          const alpha = (1 - d2 / 14400) * 0.18;
          ctx.strokeStyle = ACCENT + " " + alpha + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(step);
  };

  const onMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  };
  const onLeave = () => { mouse.active = false; };

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", onLeave, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      step();
    }
  });

  resize();
  step();
})();
