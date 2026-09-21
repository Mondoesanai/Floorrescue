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
 * A quiet line along the bottom edge: three small points joined by a hairline
 * that fills from one to the next as the visitor moves through Commercial or
 * Residential. Deliberately understated — it orients, it doesn't announce.
 * Sits bottom-center, clear of the Go Back (left) and Skip (right) buttons.
 */
export function JourneyProgress({ stage }: { stage: JourneyStage }) {
  const currentIndex = steps.findIndex((s) => s.stages.includes(stage));
  if (currentIndex === -1) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-[4.75rem] left-1/2 z-20 sm:bottom-7 flex -translate-x-1/2 items-start opacity-70"
      aria-hidden="true"
    >
      {steps.map((step, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "active" : "upcoming";
        return (
          <div key={step.label} className="flex items-start">
            <div className="flex w-14 flex-col items-center gap-1.5 sm:w-20">
              <span
                className={clsx(
                  "block rounded-full transition-[background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  state === "upcoming" ? "h-1.5 w-1.5 bg-warm-white/30" : "h-1.5 w-1.5 bg-gold-300",
                  state === "active" && "scale-125 shadow-[0_0_8px_2px_rgba(232,205,138,0.55)]",
                )}
              />
              <span
                className={clsx(
                  "text-[9px] font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-300",
                  state === "upcoming" ? "text-warm-white/30" : "text-gold-200/80",
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 ? (
              <div className="relative mt-[3px] -mx-3 h-px w-8 self-start overflow-hidden bg-warm-white/15 sm:w-14">
                <div
                  className="absolute inset-0 origin-left bg-gold-300/80 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `scaleX(${i < currentIndex ? 1 : 0})` }}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
