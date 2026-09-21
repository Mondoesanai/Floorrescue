"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const examples = ["Peeling epoxy in our kitchen", "Cracked slab in a warehouse", "New home — want polished concrete", "Moisture bubbling under coating"];

/** The fastest path to a consultation: say what's wrong in one sentence. */
export function DescribeCTA() {
  const router = useRouter();
  const [text, setText] = useState("");
  function go(value: string) {
    router.push(`/quote?describe=${encodeURIComponent(value.trim())}`);
  }
  return (
    <section className="relative overflow-hidden border-t border-gold-500/20 bg-gradient-to-b from-charcoal-900 to-charcoal-950 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Start Here</p>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-5xl">
          Tell us what you&apos;re working with.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-[1.7] text-warm-white/65">
          One sentence is enough. We start with the slab, the space, and what the floor needs to do — and you won&apos;t repeat yourself on the next step.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            go(text);
          }}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="describe-floor" className="sr-only">
            Describe your floor
          </label>
          <input
            id="describe-floor"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. The coating by our washdown line keeps peeling"
            className="min-w-0 flex-1 rounded-full border border-warm-white/20 bg-charcoal-950/70 px-5 py-3.5 text-sm text-warm-white placeholder:text-warm-white/35 focus:border-gold-300 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-gradient-to-b from-gold-300 to-gold-700 px-7 py-3.5 text-sm font-bold text-charcoal-950 transition-transform hover:-translate-y-0.5"
          >
            Request a Consultation
          </button>
        </form>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => go(ex)}
              className="rounded-full border border-warm-white/15 px-3.5 py-1.5 text-xs text-warm-white/60 transition-colors hover:border-gold-300 hover:text-gold-100"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
