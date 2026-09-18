"use client";

import { useState } from "react";
import clsx from "clsx";
import { commercialSectorIds, getSector } from "@/content/sectors";
import { useAudio } from "@/lib/audio/context";
import { playClick } from "@/lib/audio/sfx";
import { trackEvent } from "@/lib/analytics";

interface Props {
  visible: boolean;
  onSelect: (sectorId: string, otherText?: string) => void;
}

export function CommercialSectorChooser({ visible, onSelect }: Props) {
  const [showOther, setShowOther] = useState(false);
  const [otherText, setOtherText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { muted } = useAudio();

  function choose(sectorId: string) {
    if (!muted) playClick();
    trackEvent("sector_selected", { sectorId });
    onSelect(sectorId);
  }

  async function submitOther() {
    if (!otherText.trim() || submitting) return;
    setSubmitting(true);
    trackEvent("other_text_submitted", { field: "commercial-sector", text: otherText });
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: otherText, environment: "commercial" }),
      });
      const data = await res.json();
      onSelect(data.sector ?? "general-commercial", otherText);
    } catch {
      onSelect("general-commercial", otherText);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={clsx(
        "absolute inset-x-0 bottom-0 px-6 pb-14 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10 sm:pb-20",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium tracking-wide text-warm-white/70">What kind of space are we working with?</p>

        {!showOther ? (
          <>
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {commercialSectorIds.map((id) => {
                const sector = getSector(id);
                if (!sector) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    tabIndex={visible ? 0 : -1}
                    onClick={() => choose(id)}
                    className="rounded-md border border-warm-white/15 bg-charcoal-950/50 px-3 py-3 text-sm font-medium text-warm-white backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-300 hover:bg-charcoal-900/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
                  >
                    {sector.shortLabel}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              tabIndex={visible ? 0 : -1}
              onClick={() => setShowOther(true)}
              className="mt-3 text-sm font-medium text-warm-white/55 underline-offset-4 hover:text-gold-100 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
            >
              Other Commercial
            </button>
          </>
        ) : (
          <div className="mt-4">
            <label htmlFor="commercial-other" className="sr-only">
              Tell us what you&apos;re working with
            </label>
            <textarea
              id="commercial-other"
              tabIndex={visible ? 0 : -1}
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Tell us what you're working with."
              rows={2}
              className="w-full rounded-md border border-warm-white/20 bg-charcoal-950/60 px-4 py-3 text-sm text-warm-white placeholder:text-warm-white/40 focus:border-gold-300 focus:outline-none"
            />
            <div className="mt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowOther(false)}
                className="text-sm text-warm-white/50 hover:text-warm-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={submitOther}
                disabled={submitting || !otherText.trim()}
                className="rounded-sm bg-gradient-to-b from-gold-300 to-gold-700 px-5 py-2 text-sm font-medium text-charcoal-950 shadow-elevated transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
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
