"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { buildSearchIndex, searchIndex } from "@/lib/search";

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
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function close() {
    setOpen(false);
    setQuery("");
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything…"
            className="min-w-0 flex-1 bg-transparent text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none"
          />
        ) : (
          <button type="button" onClick={() => setOpen(true)} className="hidden sm:inline">
            Search anything…
          </button>
        )}
      </div>

      {open && query.trim() ? (
        <div className="absolute top-13 right-0 max-h-96 w-72 overflow-y-auto rounded-lg border border-warm-white/10 bg-charcoal-900/95 p-2 shadow-floating backdrop-blur-md sm:w-80">
          {results.length === 0 ? (
            <p className="px-3 py-4 text-sm text-warm-white/50">Nothing matched — try a system, space, or problem.</p>
          ) : (
            results.map((result) => (
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
