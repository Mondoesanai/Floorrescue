"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export interface ExplorerFamily {
  id: string;
  label: string;
  blurb: string;
  image: string;
  systems: { id: string; name: string; summary: string }[];
}

/** Every floor system, grouped by family, browsable in place — all links stay in the HTML for crawlers. */
export function SystemExplorer({ families }: { families: ExplorerFamily[] }) {
  const [active, setActive] = useState(families[0]?.id);
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-950 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Floor Systems</p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
          Every system we install, explained
        </h2>
        <div role="tablist" className="mt-8 flex flex-wrap gap-2">
          {families.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={active === f.id}
              onClick={() => setActive(f.id)}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                active === f.id
                  ? "border-gold-300 bg-gold-300 text-charcoal-950"
                  : "border-warm-white/15 text-warm-white/70 hover:border-gold-300/50 hover:text-warm-white",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        {families.map((f) => (
          <div key={f.id} hidden={active !== f.id} className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-warm-white/10">
              <Image src={f.image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
              <p className="absolute right-5 bottom-5 left-5 text-sm leading-[1.6] text-warm-white/85">{f.blurb}</p>
            </div>
            <ul className="grid content-start gap-2 sm:grid-cols-2">
              {f.systems.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/systems/${s.id}`}
                    className="group block h-full rounded-xl border border-warm-white/10 bg-charcoal-900 p-4 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold-300/50"
                  >
                    <p className="text-sm font-bold text-warm-white">{s.name}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-[1.6] text-warm-white/55">{s.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link href="/systems" className="mt-8 inline-flex text-sm font-semibold text-gold-200 hover:text-gold-100">
          Compare all floor systems →
        </Link>
      </div>
    </section>
  );
}
