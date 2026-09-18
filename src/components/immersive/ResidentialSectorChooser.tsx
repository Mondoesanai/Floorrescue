"use client";

import { useState } from "react";
import clsx from "clsx";
import { residentialSectorIds, getSector } from "@/content/sectors";
import { trackEvent } from "@/lib/analytics";

interface Props {
  visible: boolean;
  onSelect: (sectorId: string, otherText?: string) => void;
}

/** Residential twin of CommercialSectorChooser — same chooser-panel visual
 *  pattern, residential copy/sector list. */
export function ResidentialSectorChooser({ visible, onSelect }: Props) {
  const [showOther, setShowOther] = useState(false);
  const [otherText, setOtherText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function choose(sectorId: string) {
    trackEvent("sector_selected", { sectorId });
    onSelect(sectorId);
  }

  async function submitOther() {
    if (!otherText.trim() || submitting) return;
    setSubmitting(true);
    trackEvent("other_text_submitted", { field: "residential-sector", text: otherText });
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: otherText, environment: "residential" }),
      });
      const data = await res.json();
      onSelect(data.sector ?? "inside-home", otherText);
    } catch {
      onSelect("inside-home", otherText);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={clsx(
        "absolute inset-y-0 left-0 z-10 flex w-full max-w-2xl items-end justify-center px-6 pb-28 sm:left-[6vw] sm:items-center sm:justify-start sm:pb-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10",
        visible ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-3 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="w-full rounded-2xl border border-warm-white/10 bg-charcoal-950/75 p-6 shadow-floating backdrop-blur-md sm:p-8">
        <p className="text-2xl font-bold tracking-[-0.02em] text-warm-white sm:text-3xl">Where Is the Floor?</p>
        <p className="mt-1.5 text-sm text-warm-white/70">Select the option that best describes it.</p>

        {!showOther ? (
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {residentialSectorIds.map((id) => {
              const sector = getSector(id);
              if (!sector) return null;
              return (
                <button
                  key={id}
                  type="button"
                  tabIndex={visible ? 0 : -1}
                  onClick={() => choose(id)}
                  className="rounded-lg border border-warm-white/15 bg-charcoal-900/80 px-5 py-5 text-left text-base font-semibold text-warm-white transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-300 hover:bg-charcoal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
                >
                  {sector.shortLabel}
                </button>
              );
            })}
            <button
              type="button"
              tabIndex={visible ? 0 : -1}
              onClick={() => setShowOther(true)}
              className="col-span-2 rounded-lg border border-gold-500/30 bg-charcoal-900/80 px-5 py-5 text-left text-base font-semibold text-gold-200 transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-300 hover:bg-charcoal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
            >
              Other — describe it
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <label htmlFor="residential-other" className="sr-only">
              Tell us what you&apos;re working with
            </label>
            <textarea
              id="residential-other"
              tabIndex={visible ? 0 : -1}
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Tell us what you're working with."
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
                onClick={submitOther}
                disabled={submitting || !otherText.trim()}
                className="rounded-md bg-gradient-to-b from-gold-300 to-gold-700 px-6 py-2.5 text-sm font-semibold text-charcoal-950 shadow-elevated transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
              >
                {submitting ? "Routing…" : "Continue"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
