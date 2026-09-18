"use client";

import clsx from "clsx";
import type { JourneyStage } from "@/content/types";

const steps: { label: string; stages: JourneyStage[] }[] = [
  { label: "Space", stages: ["commercial-build", "commercial-sector"] },
  { label: "Project", stages: ["commercial-door-entry", "commercial-project-state"] },
  { label: "Your Plan", stages: ["commercial-deep-dive", "commercial-landing"] },
];

/**
 * A quiet step line, not a quiz counter — three segments that fill in as the
 * visitor moves through Commercial. Lets them see "one more to go" without
 * the site ever feeling like a form.
 */
export function JourneyProgress({ stage }: { stage: JourneyStage }) {
  const currentIndex = steps.findIndex((s) => s.stages.includes(stage));
  if (currentIndex === -1) return null;

  return (
    <div className="pointer-events-none fixed top-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5" aria-hidden="true">
      {steps.map((step, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "active" : "upcoming";
        return (
          <div key={step.label} className="flex items-center gap-2.5">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={clsx(
                  "h-1 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  state === "upcoming" ? "w-6 bg-warm-white/20" : "w-10 bg-gold-500",
                )}
                style={state === "active" ? { background: "linear-gradient(90deg, var(--color-gold-500), var(--color-gold-300))" } : undefined}
              />
              <span
                className={clsx(
                  "text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300",
                  state === "upcoming" ? "text-warm-white/35" : "text-gold-200",
                )}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
