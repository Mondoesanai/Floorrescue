"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { getFloorSystem } from "@/content/floorSystems";
import { sectorPlans } from "@/content/sectorPlans";

/**
 * A clickable floor plan that is different on every space page: its own rooms,
 * its own layout, its own notes. It walks itself through the zones until the
 * visitor takes over. Starting points only — never a diagnosis.
 */
export function SpaceWalkthrough({ sectorId, quoteHref }: { sectorId: string; quoteHref: string }) {
  const plan = sectorPlans[sectorId];
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!plan || !seen || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % plan.zones.length), 4200);
    return () => window.clearInterval(t);
  }, [plan, seen, auto]);

  if (!plan) return null;
  const zone = plan.zones[active];
  const system = getFloorSystem(zone.systemId);

  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-16 sm:py-20">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{plan.eyebrow}</p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.02em] text-warm-white sm:text-4xl">
          {plan.title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-[1.7] text-warm-white/65">{plan.intro}</p>

        <div ref={ref} className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]" onMouseLeave={() => undefined}>
          {/* the plan */}
          <div
            className="relative rounded-2xl border border-warm-white/15 bg-charcoal-950 p-3 shadow-elevated sm:p-4"
            style={{
              backgroundImage:
                "linear-gradient(rgba(232,205,138,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,205,138,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          >
            <div
              className="grid grid-cols-2 gap-2 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] lg:[grid-template-rows:repeat(var(--rows),minmax(5.25rem,auto))]"
              style={{ "--cols": plan.cols, "--rows": plan.rows } as React.CSSProperties}
            >
              {plan.zones.map((zn, i) => (
                <button
                  key={zn.id}
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => {
                    setAuto(false);
                    setActive(i);
                  }}
                  onMouseEnter={() => {
                    setAuto(false);
                    setActive(i);
                  }}
                  style={
                    {
                      "--gc": `${zn.col} / span ${zn.w}`,
                      "--gr": `${zn.row} / span ${zn.h}`,
                      transitionDelay: seen ? `${i * 80}ms` : "0ms",
                    } as React.CSSProperties
                  }
                  className={clsx(
                    "relative flex min-h-[5.25rem] flex-col justify-between rounded-md border-2 p-3 text-left transition-[transform,opacity,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:[grid-column:var(--gc)] lg:[grid-row:var(--gr)]",
                    seen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                    active === i
                      ? "z-10 border-gold-300 bg-gold-300/15 shadow-[0_0_0_4px_rgba(232,205,138,0.12),0_16px_36px_-14px_rgba(201,162,75,0.55)]"
                      : "border-warm-white/25 bg-charcoal-900 hover:border-gold-300/60",
                  )}
                >
                  <span className="text-[10px] font-semibold tracking-[0.16em] text-gold-300 uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-sm leading-tight font-bold text-warm-white">{zn.name}</span>
                    <span className="mt-1 hidden text-[10px] font-medium tracking-[0.06em] text-gold-200/70 sm:block">
                      {getFloorSystem(zn.systemId)?.name}
                    </span>
                  </span>
                  {active === i ? <span aria-hidden="true" className="absolute top-3 right-3 h-2 w-2 animate-ping rounded-full bg-gold-300" /> : null}
                </button>
              ))}
            </div>
          </div>

          {/* the detail */}
          <div aria-live="polite" className="rounded-2xl border border-gold-300/30 bg-charcoal-950 p-6 shadow-elevated">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
              Zone {active + 1} of {plan.zones.length}
            </p>
            <h3 key={zone.id} className="mt-2 animate-[hero-fade-in_0.5s_ease-out_both] text-2xl font-bold tracking-[-0.02em] text-warm-white">
              {zone.name}
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] text-warm-white/40 uppercase">What this floor faces</p>
                <p className="mt-1 text-sm leading-[1.6] text-warm-white/80">{zone.faces}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] text-warm-white/40 uppercase">Where the conversation starts</p>
                {system ? (
                  <Link href={`/systems/${system.id}`} className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-gold-200 hover:text-gold-100">
                    {system.name}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : null}
                <p className="mt-1 text-sm leading-[1.65] text-warm-white/65">{zone.note}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={quoteHref}
                className="rounded-full bg-gold-300 px-5 py-2.5 text-sm font-bold text-charcoal-950 transition-transform hover:-translate-y-0.5"
              >
                Ask about this zone
              </Link>
              <button
                type="button"
                onClick={() => setAuto((a) => !a)}
                className="text-xs font-semibold text-warm-white/55 hover:text-gold-200"
              >
                {auto ? "Pause tour" : "Resume tour"}
              </button>
            </div>
            <p className="mt-4 text-[11px] leading-[1.5] text-warm-white/35">
              A starting point, not a diagnosis — we confirm the right system after evaluating the slab and the space.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
