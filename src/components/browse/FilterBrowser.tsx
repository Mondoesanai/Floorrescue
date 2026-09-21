"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export interface BrowserItem {
  id: string;
  href: string;
  title: string;
  meta?: string;
  summary: string;
  group: string;
  image?: string;
}

/**
 * One filter-and-search grid for Projects, Systems, and Resources. The full
 * list is server-rendered (all links present for crawlers); filtering only
 * hides cards client-side.
 */
export function FilterBrowser({
  items,
  groups,
  searchLabel,
  cta = "View",
}: {
  items: BrowserItem[];
  groups: { id: string; label: string }[];
  searchLabel: string;
  cta?: string;
}) {
  const [group, setGroup] = useState("all");
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const visible = useMemo(
    () =>
      new Set(
        items
          .filter((i) => (group === "all" || i.group === group) && (!query || `${i.title} ${i.summary} ${i.meta ?? ""}`.toLowerCase().includes(query)))
          .map((i) => i.id),
      ),
    [items, group, query],
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" className="flex flex-wrap gap-2">
          {[{ id: "all", label: "All" }, ...groups].map((g) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={group === g.id}
              onClick={() => setGroup(g.id)}
              className={clsx(
                "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                group === g.id
                  ? "border-gold-300 bg-gold-300 text-charcoal-950"
                  : "border-warm-white/15 text-warm-white/70 hover:border-gold-300/50 hover:text-warm-white",
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
        <label className="relative block sm:w-72">
          <span className="sr-only">{searchLabel}</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={searchLabel}
            className="w-full rounded-full border border-warm-white/15 bg-charcoal-950/60 px-4 py-2 text-sm text-warm-white placeholder:text-warm-white/35 focus:border-gold-300 focus:outline-none"
          />
        </label>
      </div>
      <p className="mt-4 text-xs text-warm-white/40" aria-live="polite">
        Showing {visible.size} of {items.length}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <Link
            key={i.id}
            href={i.href}
            hidden={!visible.has(i.id)}
            className="group flex flex-col overflow-hidden rounded-xl border border-warm-white/10 bg-charcoal-900 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-300/50"
          >
            {i.image ? (
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={i.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/30 to-transparent" />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col p-5">
              {i.meta ? <p className="text-[10px] font-semibold tracking-[0.15em] text-gold-300 uppercase">{i.meta}</p> : null}
              <h3 className="mt-1 text-base font-bold text-warm-white">{i.title}</h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-[1.6] text-warm-white/60">{i.summary}</p>
              <span className="mt-4 text-[11px] font-bold tracking-[0.1em] text-gold-300 uppercase transition-transform group-hover:translate-x-0.5">
                {cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
      {visible.size === 0 ? <p className="mt-8 text-sm text-warm-white/50">Nothing matches — try a different word or clear the filter.</p> : null}
    </div>
  );
}
