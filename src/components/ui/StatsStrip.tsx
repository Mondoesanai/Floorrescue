"use client";

import { useEffect, useRef, useState } from "react";

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/** A quiet strip of proof numbers that count up as they scroll into view. */
export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-warm-white/10 bg-charcoal-900 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 text-center sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-gold-gradient text-4xl font-bold tracking-[-0.02em] tabular-nums sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-xs font-semibold tracking-[0.15em] text-warm-white/50 uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
