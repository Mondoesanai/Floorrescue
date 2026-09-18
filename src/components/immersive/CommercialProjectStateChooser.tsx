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
        "absolute inset-y-0 left-0 z-10 flex w-full max-w-sm items-center px-6 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10",
        visible ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-3 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="w-full">
        <p className="text-sm font-medium tracking-wide text-warm-white/70">What&apos;s happening with the floor?</p>

        {!showOther ? (
          <>
            <div className="mt-4 flex flex-col gap-2">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  tabIndex={visible ? 0 : -1}
                  onClick={() => choose(opt.id)}
                  className="rounded-md border border-warm-white/15 bg-charcoal-950/55 px-4 py-3 text-left text-sm font-medium text-warm-white backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-300 hover:bg-charcoal-900/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              tabIndex={visible ? 0 : -1}
              onClick={() => setShowOther(true)}
              className="mt-3 text-sm font-medium text-warm-white/55 underline-offset-4 hover:text-gold-100 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
            >
              Other
            </button>
          </>
        ) : (
          <div className="mt-4">
            <label htmlFor="project-other" className="sr-only">
              Tell us what&apos;s going on
            </label>
            <textarea
              id="project-other"
              tabIndex={visible ? 0 : -1}
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Tell us what's going on."
              rows={2}
              className="w-full rounded-md border border-warm-white/20 bg-charcoal-950/60 px-4 py-3 text-sm text-warm-white placeholder:text-warm-white/40 focus:border-gold-300 focus:outline-none"
            />
            <div className="mt-2 flex gap-3">
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
                className="rounded-sm bg-gradient-to-b from-gold-300 to-gold-700 px-5 py-2 text-sm font-medium text-charcoal-950 shadow-elevated transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
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
