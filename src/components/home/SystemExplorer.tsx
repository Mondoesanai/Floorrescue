"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export interface ExplorerFamily {
  id: string;
  label: string;
  blurb: string;
  image: string;
  systems: { id: string; name: string; summary: string }[];
}

/**
 * Every floor system, grouped by family and always open — three columns side
 * by side, each with a photo and its list underneath. No tabs to hunt through;
 * a visitor who doesn't know the terms can just read down the column that
 * sounds like what they want.
 */
const PREVIEW = 4;

export function SystemExplorer({ families }: { families: ExplorerFamily[] }) {
  const [openIds, setOpenIds] = useState<string[]>([]);
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-950 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Floor Systems</p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
          Every system we install, explained
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-[1.7] text-warm-white/60">
          Three families, side by side. Read down whichever sounds closest to what you want — each one links to the
          full breakdown.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {families.map((f, i) => (
            <Reveal key={f.id} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-warm-white/10 bg-charcoal-900 shadow-elevated">
                <div className="deboss group/photo relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={f.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent" />
                  <h3 className="absolute right-5 bottom-4 left-5 text-2xl font-bold tracking-[-0.02em] text-warm-white">
                    {f.label}
                  </h3>
                </div>
                <p className="px-5 pt-4 text-sm leading-[1.65] text-warm-white/70">{f.blurb}</p>
                <ul className="mt-3 flex-1 divide-y divide-warm-white/10 px-2">
                  {f.systems.map((s, idx) => (
                    <li key={s.id} className={idx >= PREVIEW && !openIds.includes(f.id) ? "hidden" : undefined}>
                      <Link
                        href={`/systems/${s.id}`}
                        className="group flex items-start justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-charcoal-950"
                      >
                        <span>
                          <span className="block text-sm font-semibold text-warm-white group-hover:text-gold-100">{s.name}</span>
                          <span className="mt-0.5 line-clamp-1 text-xs leading-[1.55] text-warm-white/50">{s.summary}</span>
                        </span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="mt-1.5 shrink-0 text-gold-300 opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
                {f.systems.length > PREVIEW ? (
                  <button
                    type="button"
                    aria-expanded={openIds.includes(f.id)}
                    onClick={() => setOpenIds((o) => (o.includes(f.id) ? o.filter((x) => x !== f.id) : [...o, f.id]))}
                    className="m-3 flex items-center justify-center gap-2 rounded-xl border border-gold-300/40 px-4 py-2.5 text-sm font-semibold text-gold-100 transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-gold-300/10"
                  >
                    {openIds.includes(f.id) ? "Show fewer" : `View all ${f.systems.length}`}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={"transition-transform duration-300 " + (openIds.includes(f.id) ? "rotate-180" : "")} aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                ) : (
                  <div className="pb-3" />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Link href="/systems" className="mt-8 inline-flex text-sm font-semibold text-gold-200 hover:text-gold-100">
          Compare all floor systems →
        </Link>
      </div>
    </section>
  );
}
