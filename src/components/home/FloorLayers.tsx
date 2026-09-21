"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

// Plain-language roles only — the same layer vocabulary already used on the About page.
const layers = [
  {
    name: "Topcoat",
    role: "The surface everyone sees and walks on",
    body: "Takes the traffic, the cleaning and the chemicals so the layers underneath don't have to.",
    tone: "from-gold-100 to-gold-300",
  },
  {
    name: "Design layer",
    role: "Where the look gets chosen",
    body: "Color, flake, metallic pigment or stain — the finish you actually picked, worked into the system.",
    tone: "from-gold-300 to-gold-500",
  },
  {
    name: "Build coat",
    role: "Body and strength",
    body: "Adds thickness and levels out the surface so the finish sits on something solid and even.",
    tone: "from-gold-500 to-gold-700",
  },
  {
    name: "Primer & moisture control",
    role: "The bond and the barrier",
    body: "Locks the system to the concrete — and it's where slab moisture gets handled before it can cause trouble.",
    tone: "from-gold-700 to-gold-900",
  },
  {
    name: "Prepared surface",
    role: "Opened up to accept what's next",
    body: "Grinding or blasting profiles the concrete so every layer above can grip it. Skipped or rushed, this is where floors start to fail.",
    tone: "from-charcoal-900 to-charcoal-950",
  },
  {
    name: "The slab",
    role: "Where every floor starts",
    body: "Its condition — cracks, moisture, contamination, age — decides what belongs on top. We read it before we recommend anything.",
    tone: "from-charcoal-950 to-charcoal-950",
  },
];

/** A floor system as a stack that builds itself from the slab up; hover or tap a layer to see its job. */
export function FloorLayers() {
  const ref = useRef<HTMLDivElement>(null);
  const [built, setBuilt] = useState(false);
  const [active, setActive] = useState(layers.length - 1);
  const [paused, setPaused] = useState(false);

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

  return (
    <section className="border-t border-warm-white/10 bg-charcoal-950 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Anatomy of a Floor</p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
          A floor is layers. Each one has a job.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-[1.7] text-warm-white/60">
          Watch it build from the slab up. Hover or tap any layer to see what it does — and why the ones nobody sees
          decide whether the ones everybody sees last.
        </p>

        <div
          ref={ref}
          className="mt-10 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]"
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid gap-2" role="list">
            {layers.map((l, i) => {
              // build order: bottom (last index) first
              const delay = (layers.length - 1 - i) * 140;
              return (
                <button
                  key={l.name}
                  type="button"
                  role="listitem"
                  aria-pressed={active === i}
                  onMouseEnter={() => {
                    setPaused(true);
                    setActive(i);
                  }}
                  onClick={() => {
                    setPaused(true);
                    setActive(i);
                  }}
                  style={{ transitionDelay: built ? `${delay}ms` : "0ms" }}
                  className={clsx(
                    "flex items-center justify-between gap-4 rounded-xl border bg-gradient-to-r px-5 py-4 text-left transition-[transform,opacity,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    l.tone,
                    built ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                    active === i ? "scale-[1.02] border-gold-100/80" : "border-warm-white/10",
                    i <= 3 ? "text-charcoal-950" : "text-warm-white",
                  )}
                  // layers 0-2 are light golds, 3 is dark gold, 4-5 charcoal — text colour set per band below
                >
                  <span className={clsx("text-sm font-bold", i === 3 && "text-warm-white")}>{l.name}</span>
                  <span
                    className={clsx(
                      "hidden text-xs font-medium sm:block",
                      i <= 2 ? "text-charcoal-950/70" : "text-warm-white/70",
                    )}
                  >
                    {l.role}
                  </span>
                </button>
              );
            })}
          </div>

          <div aria-live="polite" className="rounded-2xl border border-warm-white/10 bg-charcoal-900 p-7 shadow-elevated">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
              Layer {layers.length - active} of {layers.length}
            </p>
            <h3 key={current.name} className="mt-2 animate-[hero-fade-in_0.5s_ease-out_both] text-2xl font-bold tracking-[-0.02em] text-warm-white">
              {current.name}
            </h3>
            <p key={current.body} className="mt-3 animate-[hero-fade-in_0.5s_ease-out_both] text-base leading-[1.7] text-warm-white/75">
              {current.body}
            </p>
            <Link
              href="/resources/the-floor-starts-with-the-slab"
              className="mt-6 inline-flex text-sm font-semibold text-gold-200 hover:text-gold-100"
            >
              Why the floor starts with the slab →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
