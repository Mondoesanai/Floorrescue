"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

/**
 * Fades content up as it scrolls into view. Content is fully visible on the
 * server and for anything already on screen at load — it only arms itself for
 * elements below the fold, so nothing is ever hidden from crawlers or
 * no-JS visitors.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"visible" | "armed" | "shown">("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setState("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: state === "shown" ? `${delay}ms` : undefined }}
      className={clsx(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        state === "armed" && "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
