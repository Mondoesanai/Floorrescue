"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { buildSearchIndex, searchIndex } from "@/lib/search";
import { findFloorHelp, getFinderTarget } from "@/lib/floorFinder";

const typeLabel: Record<string, string> = {
  sector: "Space",
  system: "Floor System",
  problem: "Problem",
  resource: "Resource",
  project: "Project",
};

/**
 * Search lives inline in the header pill itself — clicking it turns the pill
 * into a real text field right there, with results dropping down underneath.
 * No full-screen modal: the visitor never loses their place on the page.
 */
export function InlineSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const index = useMemo(() => buildSearchIndex(), []);
  const results = useMemo(() => searchIndex(index, query), [index, query]);
  const help = useMemo(() => findFloorHelp(query), [query]);
  const [picked, setPicked] = useState<string | null>(null);
  const pickedTarget = picked ? getFinderTarget(picked) : undefined;
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function close() {
    setOpen(false);
    setQuery("");
    setPicked(null);
  }

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="fixed top-5 right-[4.75rem] z-40">
      <div
        className={
          "flex h-11 items-center gap-2 rounded-full border border-warm-white/25 bg-charcoal-950/70 px-4 text-sm text-warm-white/70 backdrop-blur-md transition-[width,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
          (open ? "w-64 border-gold-300/50 sm:w-80" : "w-11 sm:w-auto")
        }
      >
        <button type="button" onClick={() => setOpen(true)} aria-label="Search Floor Rescue" className="flex flex-none items-center">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="flex-none text-gold-300">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        {open ? (
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPicked(null);
            }}
            placeholder="Search or describe a problem…"
            className="min-w-0 flex-1 bg-transparent text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none"
          />
        ) : (
          <button type="button" onClick={() => setOpen(true)} className="hidden sm:inline">
            Search or describe a problem…
          </button>
        )}
      </div>

      {open && query.trim() ? (
        <div className="absolute top-13 right-0 max-h-96 w-72 overflow-y-auto rounded-lg border border-warm-white/10 bg-charcoal-900/95 p-2 shadow-floating backdrop-blur-md sm:w-80">
          {help && (help.question || help.targets.length > 0) ? (
            <div className="mb-2 rounded-md border border-gold-300/30 bg-charcoal-950/70 p-3">
              <p className="text-[10px] font-semibold tracking-wide text-gold-300 uppercase">What are you dealing with?</p>
              {help.question && !pickedTarget ? (
                <>
                  <p className="mt-1.5 text-sm font-semibold text-warm-white">{help.question.question}</p>
                  <div className="mt-2 grid gap-1.5">
                    {help.question.options.map((o) => (
                      <button
                        key={o.label}
                        type="button"
                        onClick={() => setPicked(o.targetId)}
                        className="rounded-md border border-warm-white/15 px-3 py-2 text-left text-xs text-warm-white/85 transition-colors hover:border-gold-300/60 hover:text-warm-white"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-1.5 grid gap-1">
                  {(pickedTarget ? [pickedTarget] : help.targets.slice(0, 2)).map((t) => (
                    <Link
                      key={t.id}
                      href={t.href}
                      onClick={close}
                      className="block rounded-md px-2 py-2 transition-colors hover:bg-warm-white/5"
                    >
                      <p className="text-sm font-bold text-warm-white">{t.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-warm-white/55">{t.blurb}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : null}
          {results.length === 0 ? (
            help && (help.question || help.targets.length > 0) ? null : (
              <p className="px-3 py-4 text-sm text-warm-white/50">
                Nothing matched — try a system, a space, or describe what you&apos;re dealing with.
              </p>
            )
          ) : (
            results.slice(0, 8).map((result) => (
              <Link
                key={`${result.type}-${result.href}`}
                href={result.href}
                onClick={close}
                className="block rounded-sm px-3 py-2.5 transition-colors hover:bg-warm-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
              >
                <p className="text-[10px] font-semibold tracking-wide text-gold-300 uppercase">{typeLabel[result.type]}</p>
                <p className="mt-0.5 text-sm font-medium text-warm-white">{result.label}</p>
              </Link>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
