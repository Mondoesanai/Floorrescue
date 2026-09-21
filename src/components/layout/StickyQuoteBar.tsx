"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConcreteToggle } from "./ConcreteToggle";

/** A slim always-in-reach quote prompt that appears once a visitor has scrolled into a page. */
export function StickyQuoteBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > Math.max(600, window.innerHeight * 0.9));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname.startsWith("/quote") || dismissed) return null;

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 flex items-center gap-1 rounded-full border border-gold-500/40 bg-charcoal-900/90 py-1.5 pr-1.5 pl-5 shadow-floating backdrop-blur-md transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-6 sm:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="hidden text-xs font-semibold text-warm-white/70 sm:inline">Ready when you are</span>
      <Link
        href="/quote"
        className="ml-2 rounded-full bg-gradient-to-b from-gold-300 to-gold-700 px-4 py-2 text-sm font-bold text-charcoal-950 transition-transform hover:-translate-y-0.5"
      >
        Request a Quote
      </Link>
      <ConcreteToggle />
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setDismissed(true)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-warm-white/40 hover:text-warm-white"
      >
        ×
      </button>
    </div>
  );
}
