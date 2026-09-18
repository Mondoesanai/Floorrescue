"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useJourney } from "@/lib/journey/context";
import { SearchDrawer } from "@/components/browse/SearchDrawer";

export function HamburgerMenu({ dark }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { dispatch } = useJourney();
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onClick);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  function backToHome() {
    setOpen(false);
    dispatch({ type: "RESET" });
    router.push("/");
  }

  return (
    <>
      <div className="fixed top-5 right-5 z-40" ref={panelRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={clsx(
            "flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-[transform,border-color] duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300",
            dark
              ? "border-warm-white/25 bg-charcoal-950/55 text-warm-white"
              : "border-black/10 bg-white/70 text-ink shadow-elevated",
          )}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-[5px]">
            <span className={clsx("h-px w-5 bg-current transition-transform duration-200", open && "translate-y-[6px] rotate-45")} />
            <span className={clsx("h-px w-5 bg-current transition-opacity duration-200", open && "opacity-0")} />
            <span className={clsx("h-px w-5 bg-current transition-transform duration-200", open && "-translate-y-[6px] -rotate-45")} />
          </div>
        </button>

        <div
          className={clsx(
            "absolute top-14 right-0 w-64 origin-top-right rounded-lg border border-warm-white/10 bg-charcoal-900/95 p-2 shadow-floating backdrop-blur-md transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
          )}
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setSearchOpen(true);
            }}
            className="block w-full rounded-md px-4 py-3 text-left text-sm font-medium text-warm-white/85 hover:bg-warm-white/5 hover:text-gold-100"
          >
            I know what I need
          </button>
          <Link
            href="/explore"
            onClick={() => setOpen(false)}
            className="block rounded-md px-4 py-3 text-sm font-medium text-warm-white/85 hover:bg-warm-white/5 hover:text-gold-100"
          >
            Explore Floor Rescue
          </Link>
          <button
            type="button"
            onClick={backToHome}
            className="block w-full rounded-md px-4 py-3 text-left text-sm font-medium text-warm-white/85 hover:bg-warm-white/5 hover:text-gold-100"
          >
            Back to Home
          </button>
          <Link
            href="/quote"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-md bg-gradient-to-b from-gold-300 to-gold-700 px-4 py-3 text-center text-sm font-semibold text-charcoal-950"
          >
            Request a Quote
          </Link>
        </div>
      </div>

      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
