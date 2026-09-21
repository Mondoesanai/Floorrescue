"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Assess",
    body: "Slab condition, moisture, contamination, and how the space actually gets used — before any system is proposed.",
  },
  {
    title: "Prepare",
    body: "Media blasting, diamond grinding, or repair work sized to what the substrate needs, not a generic checklist.",
  },
  {
    title: "Install",
    body: "The right system applied to spec, scheduled around your operating hours where downtime matters.",
  },
  {
    title: "Handoff",
    body: "Care guidance and next steps so the floor performs the way it was built to.",
  },
];

/** Four steps that light up in turn — hover or tap any step to take over. */
export function ProcessSteps() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % steps.length), 3200);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="How It Works" title="The process" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-warm-white/10 shadow-elevated">
            <Image
              src="/assets/images/team-photos/crew-troweling-floor.png"
              alt="A Floor Rescue crew member hand-troweling a floor system"
              fill
              sizes="(min-width: 1024px) 32vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />
          </div>
          <ol className="grid gap-4 sm:grid-cols-2" onMouseLeave={() => setPaused(false)}>
            {steps.map((step, i) => (
              <li key={step.title}>
                <button
                  type="button"
                  onMouseEnter={() => {
                    setPaused(true);
                    setActive(i);
                  }}
                  onClick={() => {
                    setPaused(true);
                    setActive(i);
                  }}
                  aria-current={active === i ? "step" : undefined}
                  className={clsx(
                    "relative block h-full w-full overflow-hidden rounded-md border p-5 text-left transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    active === i
                      ? "-translate-y-1 border-gold-300/60 bg-charcoal-950 shadow-elevated"
                      : "border-warm-white/10 bg-charcoal-900",
                  )}
                >
                  <span
                    className={clsx(
                      "text-3xl font-semibold transition-colors duration-500",
                      active === i ? "text-gold-gradient" : "text-warm-white/25",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-medium text-warm-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">{step.body}</p>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold-300 transition-transform ease-linear",
                      active === i && !paused ? "scale-x-100 duration-[3200ms]" : "scale-x-0 duration-300",
                    )}
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
