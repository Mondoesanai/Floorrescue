"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { buildSearchIndex, searchIndex } from "@/lib/search";

const typeLabel: Record<string, string> = {
  sector: "Space",
  system: "Floor System",
  problem: "Problem",
  resource: "Resource",
};

export function SearchDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const index = useMemo(() => buildSearchIndex(), []);
  const results = useMemo(() => searchIndex(index, query), [index, query]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-charcoal-950/80 px-4 pt-24 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search Floor Rescue">
      <div className="w-full max-w-xl rounded-md border border-warm-white/10 bg-charcoal-900 shadow-floating">
        <div className="flex items-center gap-3 border-b border-warm-white/10 px-5 py-4">
          <label htmlFor="fr-search-input" className="sr-only">
            Tell us what you&apos;re working with
          </label>
          <input
            id="fr-search-input"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a system, space, or problem…"
            className="w-full bg-transparent text-base text-warm-white placeholder:text-warm-white/40 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-sm px-2 py-1 text-sm text-warm-white/50 hover:text-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
          >
            Esc
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() && results.length === 0 ? (
            <p className="px-3 py-6 text-sm text-warm-white/50">
              Nothing matched yet — try a system name, a space type, or a problem like &quot;moisture&quot;.
            </p>
          ) : null}
          {results.map((result) => (
            <Link
              key={`${result.type}-${result.href}`}
              href={result.href}
              onClick={onClose}
              className="block rounded-sm px-3 py-3 transition-colors hover:bg-warm-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
            >
              <p className="text-xs font-semibold tracking-wide text-gold-300 uppercase">{typeLabel[result.type]}</p>
              <p className="mt-0.5 text-sm font-medium text-warm-white">{result.label}</p>
              <p className="mt-0.5 line-clamp-1 text-xs text-warm-white/50">{result.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
