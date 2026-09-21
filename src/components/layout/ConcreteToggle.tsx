"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const KEY = "fr-concrete";

/**
 * A tiny, nearly invisible switch that flips the homepage between the standard
 * look and the concrete-levels look. The choice is remembered in this browser
 * (see the inline script in layout.tsx, which applies it before first paint).
 * Only shows on the homepage, where the concrete look lives.
 */
export function ConcreteToggle({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(document.body.classList.contains("concrete-on"));
  }, [pathname]);

  if (pathname !== "/") return null;

  function toggle() {
    const next = !document.body.classList.contains("concrete-on");
    document.body.classList.toggle("concrete-on", next);
    try {
      localStorage.setItem(KEY, next ? "1" : "0");
    } catch {
      /* private mode: the switch still works for this visit */
    }
    setOn(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? "Switch to the standard look" : "Switch to the concrete look"}
      aria-pressed={on}
      title={on ? "Standard look" : "Concrete look"}
      className={
        "flex h-6 w-6 flex-none items-center justify-center rounded-sm opacity-[0.16] transition-opacity duration-200 hover:opacity-80 focus-visible:opacity-90 " +
        className
      }
    >
      <span
        aria-hidden="true"
        className={
          "block h-2.5 w-2.5 rounded-[2px] border " +
          (on ? "border-gold-300 bg-gold-300/70" : "border-warm-white/70 bg-warm-white/30")
        }
      />
    </button>
  );
}
