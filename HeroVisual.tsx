import { useEffect, useRef, useState } from "react";

/**
 * CAD-style construction drawing that reacts subtly to pointer movement.
 * Pure SVG: fast, crisp at any size, no external assets.
 */
const rnd = (n: number) => Math.round(n * 1000) / 1000;

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP({
        x: (e.clientX - (r.left + r.width / 2)) / r.width,
        y: (e.clientY - (r.top + r.height / 2)) / r.height,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const t = (m: number) => ({
    transform: `translate3d(${p.x * m}px, ${p.y * m}px, 0)`,
    transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)",
  });

  return (
    <div ref={ref} className="relative aspect-square w-full select-none">
      {/* fine grid */}
      <div className="absolute inset-0 blueprint-grid opacity-60" style={t(-6)} aria-hidden />

      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-label="Technical drawing of a gear and bearing assembly"
        role="img"
      >
        <g stroke="var(--hairline)" strokeWidth="1">
          <line x1="0" y1="200" x2="400" y2="200" strokeDasharray="14 4 2 4" />
          <line x1="200" y1="0" x2="200" y2="400" strokeDasharray="14 4 2 4" />
        </g>

        <g style={t(10)}>
          <circle cx="200" cy="200" r="150" stroke="var(--hairline)" />
          <circle cx="200" cy="200" r="118" stroke="var(--hairline)" strokeDasharray="3 5" />
        </g>

        {/* gear */}
        <g className="spin-slow" style={{ transformOrigin: "200px 200px" }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const r1 = 96;
            const r2 = 112;
            return (
              <line
                key={i}
                x1={rnd(200 + Math.cos(a) * r1)}
                y1={rnd(200 + Math.sin(a) * r1)}
                x2={rnd(200 + Math.cos(a) * r2)}
                y2={rnd(200 + Math.sin(a) * r2)}
                stroke="var(--color-foreground)"
                strokeWidth="1.2"
              />
            );
          })}
          <circle cx="200" cy="200" r="96" stroke="var(--color-foreground)" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="112" stroke="var(--hairline)" />
          <circle cx="200" cy="200" r="58" stroke="var(--color-foreground)" strokeWidth="1.2" />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={rnd(200 + Math.cos(a) * 77)}
                cy={rnd(200 + Math.sin(a) * 77)}
                r="9"
                stroke="var(--steel)"
              />
            );
          })}
        </g>

        {/* inner shaft / bearing */}
        <g className="spin-reverse" style={{ transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="200" r="34" stroke="var(--color-foreground)" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="20" stroke="var(--steel)" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={rnd(200 + Math.cos(a) * 27)}
                cy={rnd(200 + Math.sin(a) * 27)}
                r="5"
                stroke="var(--accent)"
              />
            );
          })}
        </g>

        {/* dimension line */}
        <g style={t(5)} stroke="var(--steel)" strokeWidth="1">
          <line x1="50" y1="360" x2="350" y2="360" />
          <line x1="50" y1="352" x2="50" y2="368" />
          <line x1="350" y1="352" x2="350" y2="368" />
        </g>
        <text
          x="200"
          y="352"
          textAnchor="middle"
          fill="var(--steel)"
          fontSize="10"
          fontFamily="var(--font-mono)"
          letterSpacing="2"
        >
          Ø 224
        </text>
        <text
          x="330"
          y="60"
          fill="var(--accent)"
          fontSize="10"
          fontFamily="var(--font-mono)"
          letterSpacing="2"
        >
          R12
        </text>
        <text
          x="34"
          y="60"
          fill="var(--steel)"
          fontSize="10"
          fontFamily="var(--font-mono)"
          letterSpacing="2"
        >
          M10
        </text>
      </svg>

      {/* floating labels */}
      <div className="pointer-events-none absolute inset-0" style={t(-14)} aria-hidden>
        <span className="tech-label absolute left-0 top-[18%]">Precision</span>
        <span className="tech-label absolute right-0 top-[36%]">Motion</span>
        <span className="tech-label absolute left-[4%] bottom-[26%]">Design</span>
        <span className="tech-label absolute right-[2%] bottom-[16%]">Fabrication</span>
        <span className="tech-label absolute left-1/2 top-0 -translate-x-1/2 text-accent">
          01 / Engineering
        </span>
      </div>
    </div>
  );
}
