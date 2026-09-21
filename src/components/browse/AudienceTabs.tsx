"use client";

import { useState } from "react";
import clsx from "clsx";

const order: [string, string][] = [
  ["residential", "For your home"],
  ["commercial", "For your business"],
  ["industrial", "For your facility"],
  ["trade", "For the trade"],
];

/** Shows the same system in the voice of whoever is reading. All copy stays in the HTML. */
export function AudienceTabs({ summaries }: { summaries: Record<string, string | undefined> }) {
  const tabs = order.filter(([id]) => summaries[id]);
  const [active, setActive] = useState(tabs[0]?.[0]);
  if (!tabs.length) return null;
  return (
    <div className="mt-8">
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={active === id}
            onClick={() => setActive(id)}
            className={clsx(
              "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
              active === id
                ? "border-gold-300 bg-gold-300 text-charcoal-950"
                : "border-warm-white/15 text-warm-white/70 hover:border-gold-300/50 hover:text-warm-white",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {tabs.map(([id]) => (
        <p key={id} hidden={active !== id} className="mt-5 rounded-xl border border-warm-white/10 bg-charcoal-900 p-6 text-base leading-[1.75] text-warm-white/80">
          {summaries[id]}
        </p>
      ))}
    </div>
  );
}
