import { useEffect, useRef } from 'react';

/**
 * FloatingMathBackground — Canvas-based physics simulation of drifting
 * tax / accounting symbols that bounce off walls and each other.
 *
 * Uses requestAnimationFrame + elastic collision physics for natural
 * directional bouncing. Designed for dark navy hero sections.
 */

/* ── Symbol pool — tax / accounting themed ── */
const SYMBOLS = [
  '$', '%', '+', '−', '÷', '×', '=',
  '¢', '£', '¥', '€',
  '#', '∑', 'π', '∞', '±',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'ABN', 'GST', 'BAS', 'FY',
  '§', '¶', '…',
];

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
const SANS = 'system-ui, -apple-system, sans-serif';

/* ── Deterministic pseudo-random from seed ── */
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function FloatingMathBackground({
  count = 32,
  seed = 42,
  className = '',
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;
    let raf;

    /* ── Resize handler ── */
    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const nw = rect.width;
      const nh = rect.height;
      canvas.width = nw * dpr;
      canvas.height = nh * dpr;
      canvas.style.width = `${nw}px`;
      canvas.style.height = `${nh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (stateRef.current && w > 0 && h > 0) {
        const sx = nw / w;
        const sy = nh / h;
        for (const p of stateRef.current) {
          p.x = Math.max(p.radius, Math.min(nw - p.radius, p.x * sx));
          p.y = Math.max(p.radius, Math.min(nh - p.radius, p.y * sy));
        }
      }
      w = nw;
      h = nh;
    }

    /* ── Create particles ── */
    function init() {
      const rand = seededRandom(seed);
      const particles = [];

      for (let i = 0; i < count; i++) {
        const symbol = SYMBOLS[Math.floor(rand() * SYMBOLS.length)];
        const isWord = symbol.length > 1;
        const fontSize = isWord ? 12 + rand() * 8 : 16 + rand() * 28;
        const radius = fontSize * (isWord ? symbol.length * 0.32 : 0.45) + 4;

        const x = radius + rand() * Math.max(1, w - 2 * radius);
        const y = radius + rand() * Math.max(1, h - 2 * radius);

        const speed = 0.15 + rand() * 0.45;
        const angle = rand() * Math.PI * 2;

        particles.push({
          symbol,
          fontSize,
          radius,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          opacity: 0.08 + rand() * 0.10,
          rotation: (rand() - 0.5) * Math.PI * 0.6,
          angularVel: (rand() - 0.5) * 0.008,
          mass: radius * radius,
          font: `${isWord ? '600' : '400'} ${fontSize}px ${isWord ? MONO : SANS}`,
        });
      }
      stateRef.current = particles;
    }

    resize();
    init();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement);

    /* ── Physics step ── */
    function step() {
      const particles = stateRef.current;
      if (!particles || w === 0) return;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.angularVel;
        p.angularVel *= 0.997; // spin damping (slower decay = longer visible spin)

        /* Wall bounce — impart noticeable spin on impact */
        if (p.x < p.radius) {
          p.x = p.radius;
          p.vx = Math.abs(p.vx);
          p.angularVel += p.vy * 0.06;
        } else if (p.x > w - p.radius) {
          p.x = w - p.radius;
          p.vx = -Math.abs(p.vx);
          p.angularVel -= p.vy * 0.06;
        }
        if (p.y < p.radius) {
          p.y = p.radius;
          p.vy = Math.abs(p.vy);
          p.angularVel += p.vx * 0.06;
        } else if (p.y > h - p.radius) {
          p.y = h - p.radius;
          p.vy = -Math.abs(p.vy);
          p.angularVel -= p.vx * 0.06;
        }
      }

      /* Particle-particle elastic collisions */
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;
          const minDist = a.radius + b.radius;
          if (distSq >= minDist * minDist) continue;

          const dist = Math.sqrt(distSq) || 0.01;
          const nx = dx / dist;
          const ny = dy / dist;

          /* Relative velocity along collision normal */
          const relVx = a.vx - b.vx;
          const relVy = a.vy - b.vy;
          const dvn = relVx * nx + relVy * ny;
          if (dvn <= 0) continue; // already separating

          /* Tangential component → spin kick (scaled by impact speed) */
          const dvt = relVx * -ny + relVy * nx;
          const spinTransfer = 0.012 + Math.abs(dvn) * 0.03;
          a.angularVel += dvt * spinTransfer;
          b.angularVel -= dvt * spinTransfer;

          /* Elastic impulse (energy-conserving) */
          const totalMass = a.mass + b.mass;
          const impulse = 2 * dvn / totalMass;
          a.vx -= impulse * b.mass * nx;
          a.vy -= impulse * b.mass * ny;
          b.vx += impulse * a.mass * nx;
          b.vy += impulse * a.mass * ny;

          /* Separate overlap so they don't stick */
          const overlap = minDist - dist;
          const sepScale = overlap / totalMass;
          a.x -= nx * sepScale * b.mass;
          a.y -= ny * sepScale * b.mass;
          b.x += nx * sepScale * a.mass;
          b.y += ny * sepScale * a.mass;
        }
      }
    }

    /* ── Render ── */
    function draw() {
      const particles = stateRef.current;
      if (!particles) return;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = 'white';
        ctx.font = p.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      }
    }

    /* ── Animation loop ── */
    function loop() {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count, seed]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
