"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

// Plain-language roles only — the same layer vocabulary already used on the About page.
const layers = [
  {
    name: "Topcoat",
    role: "The surface everyone sees and walks on",
    body: "Takes the traffic, the cleaning and the chemicals so the layers underneath don't have to.",
    y0: 150,
    y1: 172,
  },
  {
    name: "Design layer",
    role: "Where the look gets chosen",
    body: "Color, flake, metallic pigment or stain — the finish you actually picked, worked into the system.",
    y0: 172,
    y1: 204,
  },
  {
    name: "Build coat",
    role: "Body and strength",
    body: "Adds thickness and levels out the surface so the finish sits on something solid and even.",
    y0: 204,
    y1: 230,
  },
  {
    name: "Primer & moisture control",
    role: "The bond and the barrier",
    body: "Locks the system to the concrete — and it's where slab moisture gets handled before it can cause trouble.",
    y0: 230,
    y1: 242,
  },
  {
    name: "Prepared surface",
    role: "Opened up to accept what's next",
    body: "Grinding or blasting profiles the concrete so every layer above can grip it. Skipped or rushed, this is where floors start to fail.",
    y0: 242,
    y1: 256,
  },
  {
    name: "The slab",
    role: "Where every floor starts",
    body: "Its condition — cracks, moisture, contamination, age — decides what belongs on top. We read it before we recommend anything.",
    y0: 256,
    y1: 420,
  },
];

// Deterministic pseudo-random so server and client render the same speckles.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const X0 = 40;
const X1 = 560;
const DX = 44; // top-face / side-face depth offset (x)
const DY = 40; // (y)

/** A floor system drawn as a real cross-section: slab, prep, primer, build coat, flake design layer, gloss topcoat. */
export function FloorLayers() {
  const ref = useRef<HTMLDivElement>(null);
  const [built, setBuilt] = useState(false);
  const [active, setActive] = useState(layers.length - 1);
  const [paused, setPaused] = useState(false);

  const art = useMemo(() => {
    const r = rng(7);
    const stones = Array.from({ length: 70 }, () => ({
      x: X0 + 8 + r() * (X1 - X0 - 16),
      y: 262 + r() * 152,
      rx: 3 + r() * 9,
      ry: 2 + r() * 6,
      rot: r() * 180,
      tone: r(),
    }));
    const flakes = Array.from({ length: 150 }, () => ({
      x: X0 + 4 + r() * (X1 - X0 - 8),
      y: 176 + r() * 24,
      w: 3 + r() * 6,
      h: 2 + r() * 3,
      c: Math.floor(r() * 5),
    }));
    const topFlakes = Array.from({ length: 260 }, () => ({
      u: r(),
      v: r(),
      c: Math.floor(r() * 5),
    }));
    // jagged prepared-surface profile
    const prof: string[] = [];
    for (let x = X0; x <= X1; x += 8) prof.push(`${x},${242 + (Math.floor(r() * 5) - 1)}`);
    // hairline crack in the slab
    const crack = `M 300 262 l 6 22 l -8 20 l 10 26 l -5 18`;
    return { stones, flakes, topFlakes, prof: prof.join(" "), crack };
  }, []);

  const flakeColors = ["#e9e3d3", "#71767a", "#2c2e31", "#b48f52", "#a6afb4"];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBuilt(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setBuilt(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Walk up the stack from the slab to the topcoat, then loop.
  useEffect(() => {
    if (!built || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((a) => (a - 1 + layers.length) % layers.length), 3400);
    return () => window.clearInterval(t);
  }, [built, paused]);

  const current = layers[active];
  const dim = (i: number) => (active === i ? 1 : 0.72);
  // build order: slab first, topcoat last
  const buildDelay = (i: number) => (layers.length - 1 - i) * 160;
  const layerStyle = (i: number): React.CSSProperties => ({
    opacity: built ? dim(i) : 0,
    transform: built ? "translateY(0)" : "translateY(-26px)",
    transition: `opacity 0.6s ease ${built ? buildDelay(i) : 0}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${built ? buildDelay(i) : 0}ms`,
    cursor: "pointer",
  });
  const hover = (i: number) => ({
    onMouseEnter: () => {
      setPaused(true);
      setActive(i);
    },
    onClick: () => {
      setPaused(true);
      setActive(i);
    },
  });

  // top-face point from (u,v) in 0..1
  const tp = (u: number, v: number) => ({
    x: X0 + DX * v + (X1 - X0) * u,
    y: 150 - DY * v,
  });

  return (
    <section className="border-t border-warm-white/10 bg-charcoal-950 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Anatomy of a Floor</p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
          A floor is layers. Each one has a job.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-[1.7] text-warm-white/60">
          Watch a floor system build from the slab up. Hover or tap any layer to see what it does — and why the ones nobody
          sees decide whether the ones everybody sees last.
        </p>

        <div ref={ref} className="mt-10 grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr]" onMouseLeave={() => setPaused(false)}>
          <div className="rounded-2xl border border-warm-white/10 bg-charcoal-900 p-3 shadow-elevated sm:p-5">
            <svg viewBox="0 60 660 380" className="h-auto w-full" role="img" aria-label="Cross-section of a floor system from the concrete slab up to the topcoat">
              <defs>
                <linearGradient id="fl-gloss" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
                  <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.05" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="fl-slab" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8e9093" />
                  <stop offset="1" stopColor="#6d6f72" />
                </linearGradient>
                <clipPath id="fl-topclip">
                  <polygon points={`${X0},150 ${X1},150 ${X1 + DX},${150 - DY} ${X0 + DX},${150 - DY}`} />
                </clipPath>
                <clipPath id="fl-designclip">
                  <rect x={X0} y="172" width={X1 - X0} height="32" />
                </clipPath>
                <clipPath id="fl-slabclip">
                  <rect x={X0} y="256" width={X1 - X0} height="164" />
                </clipPath>
              </defs>

              {/* ground shadow */}
              <ellipse cx="330" cy="432" rx="290" ry="10" fill="#000" opacity="0.35" />

              {/* SLAB (front + side) */}
              <g style={layerStyle(5)} {...hover(5)}>
                <rect x={X0} y="256" width={X1 - X0} height="164" fill="url(#fl-slab)" />
                <g clipPath="url(#fl-slabclip)">
                  {art.stones.map((s, i) => (
                    <ellipse
                      key={i}
                      cx={s.x}
                      cy={s.y}
                      rx={s.rx}
                      ry={s.ry}
                      transform={`rotate(${s.rot} ${s.x} ${s.y})`}
                      fill={s.tone > 0.5 ? "#a9a49a" : "#5f6164"}
                      opacity={0.55}
                    />
                  ))}
                  <path d={art.crack} stroke="#3c3d40" strokeWidth="1.4" fill="none" opacity="0.7" />
                </g>
                <polygon points={`${X1},256 ${X1 + DX},216 ${X1 + DX},380 ${X1},420`} fill="#5a5c5f" />
                {active === 5 ? <rect x={X0} y="256" width={X1 - X0} height="164" fill="none" stroke="#e8cd8a" strokeWidth="3" /> : null}
              </g>

              {/* moisture vapor rising through the slab, stopped at the barrier */}
              <g style={{ opacity: built ? 1 : 0, transition: "opacity 1s ease 1.4s" }} aria-hidden="true">
                {[90, 170, 250, 350, 430, 500].map((x, i) => (
                  <circle key={x} cx={x} cy="400" r="3" fill="#bcd3e6" className="fl-vapor" style={{ animationDelay: `${i * 0.7}s` }} />
                ))}
              </g>

              {/* PREPARED SURFACE — jagged profile */}
              <g style={layerStyle(4)} {...hover(4)}>
                <polygon points={`${X0},256 ${art.prof} ${X1},256`} fill="#7c7e81" />
                <polygon points={`${X1},256 ${X1},242 ${X1 + DX},202 ${X1 + DX},216`} fill="#54565a" />
                {active === 4 ? <polyline points={art.prof} fill="none" stroke="#e8cd8a" strokeWidth="3" /> : null}
              </g>

              {/* PRIMER */}
              <g style={layerStyle(3)} {...hover(3)}>
                <rect x={X0} y="230" width={X1 - X0} height="12" fill="#a4783a" />
                <polygon points={`${X1},230 ${X1 + DX},190 ${X1 + DX},202 ${X1},242`} fill="#7a5a2b" />
                {active === 3 ? <rect x={X0} y="230" width={X1 - X0} height="12" fill="none" stroke="#e8cd8a" strokeWidth="3" /> : null}
              </g>

              {/* BUILD COAT */}
              <g style={layerStyle(2)} {...hover(2)}>
                <rect x={X0} y="204" width={X1 - X0} height="26" fill="#c8c1b0" />
                <polygon points={`${X1},204 ${X1 + DX},164 ${X1 + DX},190 ${X1},230`} fill="#9c9585" />
                {active === 2 ? <rect x={X0} y="204" width={X1 - X0} height="26" fill="none" stroke="#e8cd8a" strokeWidth="3" /> : null}
              </g>

              {/* DESIGN LAYER — decorative flake */}
              <g style={layerStyle(1)} {...hover(1)}>
                <rect x={X0} y="172" width={X1 - X0} height="32" fill="#d9d2c0" />
                <g clipPath="url(#fl-designclip)">
                  {art.flakes.map((f, i) => (
                    <rect key={i} x={f.x} y={f.y} width={f.w} height={f.h} rx="1" fill={flakeColors[f.c]} transform={`rotate(${(i * 37) % 30 - 15} ${f.x} ${f.y})`} />
                  ))}
                </g>
                <polygon points={`${X1},172 ${X1 + DX},132 ${X1 + DX},164 ${X1},204`} fill="#8f8a7a" />
                {active === 1 ? <rect x={X0} y="172" width={X1 - X0} height="32" fill="none" stroke="#e8cd8a" strokeWidth="3" /> : null}
              </g>

              {/* TOPCOAT + top surface */}
              <g style={layerStyle(0)} {...hover(0)}>
                <polygon points={`${X0},150 ${X1},150 ${X1 + DX},${150 - DY} ${X0 + DX},${150 - DY}`} fill="#d9d2c0" />
                <g clipPath="url(#fl-topclip)">
                  {art.topFlakes.map((f, i) => {
                    const p = tp(f.u, f.v);
                    return <ellipse key={i} cx={p.x} cy={p.y} rx={2.6} ry={1.1} fill={flakeColors[f.c]} />;
                  })}
                  <polygon points={`${X0},150 ${X1},150 ${X1 + DX},${150 - DY} ${X0 + DX},${150 - DY}`} fill="url(#fl-gloss)" />
                </g>
                <rect x={X0} y="150" width={X1 - X0} height="22" fill="#ccd7db" opacity="0.55" />
                <rect x={X0} y="150" width={X1 - X0} height="22" fill="url(#fl-gloss)" />
                <polygon points={`${X1},150 ${X1 + DX},${150 - DY} ${X1 + DX},132 ${X1},172`} fill="#9fb0b6" opacity="0.7" />
                {active === 0 ? <rect x={X0} y="150" width={X1 - X0} height="22" fill="none" stroke="#e8cd8a" strokeWidth="3" /> : null}
              </g>

              {/* labels */}
              {layers.map((l, i) => {
                const midY = (l.y0 + l.y1) / 2;
                return (
                  <g key={l.name} style={{ opacity: built ? 1 : 0, transition: `opacity 0.5s ease ${buildDelay(i) + 500}ms` }} aria-hidden="true">
                    <line x1={X1 + DX + 6} y1={midY - 40 + (i === 0 ? 0 : 0)} x2={X1 + DX + 18} y2={midY - 40} stroke={active === i ? "#e8cd8a" : "#ffffff55"} strokeWidth="1.5" />
                    <text x={X1 + DX + 22} y={midY - 36} fontSize="12" fontWeight={active === i ? 700 : 500} fill={active === i ? "#f4e8c9" : "#ffffffaa"}>
                      {String(layers.length - i).padStart(2, "0")}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div aria-live="polite" className="rounded-2xl border border-warm-white/10 bg-charcoal-900 p-6 shadow-elevated">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
              Layer {layers.length - active} of {layers.length}
            </p>
            <h3 key={current.name} className="mt-2 animate-[hero-fade-in_0.5s_ease-out_both] text-2xl font-bold tracking-[-0.02em] text-warm-white">
              {current.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-gold-200">{current.role}</p>
            <p key={current.body} className="mt-3 animate-[hero-fade-in_0.5s_ease-out_both] text-base leading-[1.7] text-warm-white/75">
              {current.body}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5" role="list">
              {layers.map((l, i) => (
                <button
                  key={l.name}
                  type="button"
                  role="listitem"
                  aria-pressed={active === i}
                  {...hover(i)}
                  className={clsx(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    active === i ? "border-gold-300 bg-gold-300 text-charcoal-950" : "border-warm-white/15 text-warm-white/70 hover:border-gold-300/60",
                  )}
                >
                  {l.name}
                </button>
              ))}
            </div>
            <Link href="/resources/the-floor-starts-with-the-slab" className="mt-6 inline-flex text-sm font-semibold text-gold-200 hover:text-gold-100">
              Why the floor starts with the slab →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
