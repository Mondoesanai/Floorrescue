"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useJourney } from "@/lib/journey/context";
import { SearchDrawer } from "@/components/browse/SearchDrawer";

const links = [
  { href: "/residential", label: "Residential" },
  { href: "/commercial", label: "Commercial" },
  { href: "/industrial", label: "Industrial" },
  { href: "/systems", label: "Floor Systems" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/for-the-trade", label: "For the Trade" },
  { href: "/about", label: "About" },
];

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
            "absolute top-14 right-0 flex max-h-[80vh] w-72 origin-top-right flex-col rounded-lg border border-warm-white/10 bg-charcoal-900/95 shadow-floating backdrop-blur-md transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
          )}
        >
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSearchOpen(true);
              }}
              className="flex w-full items-center gap-2.5 rounded-md border border-warm-white/10 bg-warm-white/[0.04] px-4 py-3 text-left text-sm font-medium text-warm-white/50 transition-colors hover:border-gold-300/40 hover:bg-warm-white/[0.07] hover:text-warm-white/70"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="flex-none text-gold-300">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Search anything…
            </button>
            <button
              type="button"
              onClick={backToHome}
              className="block w-full rounded-md px-4 py-3 text-left text-sm font-medium text-warm-white/85 hover:bg-warm-white/5 hover:text-gold-100"
            >
              Back to Home
            </button>
            <Link
              href="/explore"
              onClick={() => setOpen(false)}
              className="block rounded-md px-4 py-3 text-sm font-medium text-warm-white/85 hover:bg-warm-white/5 hover:text-gold-100"
            >
              Explore Floor Rescue
            </Link>

            <div className="my-1.5 border-t border-warm-white/10" />

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-4 py-2.5 text-sm text-warm-white/70 hover:bg-warm-white/5 hover:text-gold-100"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-warm-white/10 p-2">
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="block rounded-md bg-gradient-to-b from-gold-300 to-gold-700 px-4 py-3 text-center text-sm font-semibold text-charcoal-950"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
