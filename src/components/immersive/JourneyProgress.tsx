"use client";

import clsx from "clsx";
import type { JourneyStage } from "@/content/types";

const steps: { label: string; stages: JourneyStage[] }[] = [
  { label: "Space", stages: ["commercial-build", "commercial-sector", "residential-build", "residential-sector"] },
  {
    label: "Project",
    stages: ["commercial-door-entry", "commercial-project-state", "residential-door-entry", "residential-project-state"],
  },
  { label: "Your Plan", stages: ["commercial-deep-dive", "commercial-landing", "residential-deep-dive", "residential-landing"] },
];

/**
 * A quiet step line, not a quiz counter — three segments that fill in as the
 * visitor moves through Commercial or Residential. Dots-only under the header on mobile
 * (there isn't room between the logo and hamburger pills for labels without
 * overlapping them); full labeled line centered above everything from sm up.
 */
export function JourneyProgress({ stage }: { stage: JourneyStage }) {
  const currentIndex = steps.findIndex((s) => s.stages.includes(stage));
  if (currentIndex === -1) return null;

  return (
    <div
      className="pointer-events-none fixed top-[4.75rem] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:top-6 sm:gap-2.5"
      aria-hidden="true"
    >
      {steps.map((step, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "active" : "upcoming";
        return (
          <div key={step.label} className="flex flex-col items-center gap-1.5">
            <div
              className={clsx(
                "h-1 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                state === "upcoming" ? "w-4 bg-warm-white/20 sm:w-6" : "w-6 bg-gold-500 sm:w-10",
              )}
              style={state === "active" ? { background: "linear-gradient(90deg, var(--color-gold-500), var(--color-gold-300))" } : undefined}
            />
            <span
              className={clsx(
                "hidden text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 sm:block",
                state === "upcoming" ? "text-warm-white/35" : "text-gold-200",
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
