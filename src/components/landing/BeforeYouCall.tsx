"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const items = [
  { id: "photos", label: "A few photos of the floor as it is today", why: "Wide shots plus close-ups of any cracks, coating edges or stains." },
  { id: "size", label: "A rough size of the area", why: "Approximate square footage is enough to start — we measure on site." },
  { id: "use", label: "How the space is used", why: "Foot traffic, carts, forklifts, washdown, chemicals — whatever the floor actually lives through." },
  { id: "history", label: "What's on the floor now, and what's failed before", why: "Existing coatings, sealers or overlays change the prep plan." },
  { id: "window", label: "Your schedule window", why: "When the space can be closed, and how long it can stay closed." },
  { id: "look", label: "The look you want", why: "A reference photo beats a paragraph. Tell us the feel, not just the product." },
];

/** A tap-to-tick checklist of what makes a quote fast and accurate — moving progress, zero jargon. */
export function BeforeYouCall({ quoteHref }: { quoteHref: string }) {
  const [done, setDone] = useState<string[]>([]);
  const pct = Math.round((done.length / items.length) * 100);

  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Before You Reach Out"
              title="Have these handy and your quote gets sharper"
              support="None of it is required — send what you have. Tick off what you already know."
            />
            <div className="mt-8 max-w-sm">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold text-warm-white/80">
                  {done.length} of {items.length} ready
                </span>
                <span className="tabular-nums text-gold-300">{pct}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-charcoal-950">
                <div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `scaleX(${pct / 100})`, width: "100%" }}
                />
              </div>
              <Button href={quoteHref} className="mt-6">
                {done.length === items.length ? "You're set — Request a Quote" : "Request a Quote"}
              </Button>
            </div>
          </div>
          <ul className="grid gap-3">
            {items.map((it) => {
              const on = done.includes(it.id);
              return (
                <li key={it.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setDone((d) => (on ? d.filter((x) => x !== it.id) : [...d, it.id]))}
                    className={
                      "flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 " +
                      (on ? "border-gold-300/60 bg-charcoal-950" : "border-warm-white/10 bg-charcoal-950/50 hover:border-gold-300/30")
                    }
                  >
                    <span
                      className={
                        "mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 transition-colors " +
                        (on ? "border-gold-300 bg-gold-300 text-charcoal-950" : "border-warm-white/30 text-transparent")
                      }
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-warm-white">{it.label}</span>
                      <span className="mt-0.5 block text-xs leading-[1.6] text-warm-white/55">{it.why}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
