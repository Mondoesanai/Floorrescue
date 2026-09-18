"use client";

import { useState } from "react";
import clsx from "clsx";
import type { ProjectState } from "@/content/types";
import { trackEvent } from "@/lib/analytics";

interface Props {
  visible: boolean;
  onSelect: (projectState: ProjectState, otherText?: string) => void;
}

const options: { id: Exclude<ProjectState, "other">; label: string }[] = [
  { id: "new-construction", label: "New Construction" },
  { id: "renovation", label: "Upgrade / Renovation" },
  { id: "failed-floor", label: "Failed or Damaged Floor" },
];

export function CommercialProjectStateChooser({ visible, onSelect }: Props) {
  const [showOther, setShowOther] = useState(false);
  const [otherText, setOtherText] = useState("");

  function choose(state: ProjectState) {
    trackEvent("project_state_selected", { projectState: state });
    onSelect(state);
  }

  return (
    <div
      className={clsx(
        "absolute inset-y-0 left-0 z-10 flex w-full max-w-2xl items-center px-6 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10",
        visible ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-3 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="w-full rounded-2xl border border-warm-white/10 bg-charcoal-950/75 p-6 shadow-floating backdrop-blur-md sm:p-8">
        <p className="text-2xl font-bold tracking-[-0.02em] text-warm-white sm:text-3xl">
          What do you need done to your floor?
        </p>

        {!showOther ? (
          <div className="mt-5 grid grid-cols-1 gap-2.5">
            {options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                tabIndex={visible ? 0 : -1}
                onClick={() => choose(opt.id)}
                className="rounded-lg border border-warm-white/15 bg-charcoal-900/80 px-5 py-5 text-left text-base font-semibold text-warm-white transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-300 hover:bg-charcoal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
              >
                {opt.label}
              </button>
            ))}
            <button
              type="button"
              tabIndex={visible ? 0 : -1}
              onClick={() => setShowOther(true)}
              className="rounded-lg border border-gold-500/30 bg-charcoal-900/80 px-5 py-5 text-left text-base font-semibold text-gold-200 transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-300 hover:bg-charcoal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
            >
              Other — describe it
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <label htmlFor="project-other" className="sr-only">
              Tell us what&apos;s going on
            </label>
            <textarea
              id="project-other"
              tabIndex={visible ? 0 : -1}
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Tell us what's going on."
              rows={3}
              className="w-full rounded-lg border border-warm-white/20 bg-charcoal-950/70 px-4 py-3 text-base text-warm-white placeholder:text-warm-white/40 focus:border-gold-300 focus:outline-none"
              autoFocus
            />
            <div className="mt-3 flex gap-3">
              <button type="button" onClick={() => setShowOther(false)} className="text-sm text-warm-white/50 hover:text-warm-white">
                Back
              </button>
              <button
                type="button"
                disabled={!otherText.trim()}
                onClick={() => {
                  trackEvent("other_text_submitted", { field: "project-state", text: otherText });
                  onSelect("other", otherText);
                }}
                className="rounded-md bg-gradient-to-b from-gold-300 to-gold-700 px-6 py-2.5 text-sm font-semibold text-charcoal-950 shadow-elevated transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
