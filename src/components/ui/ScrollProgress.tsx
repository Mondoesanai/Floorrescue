"use client";

import { useEffect, useRef, useState } from "react";

interface Seg {
  label: string;
  top: number;
  bottom: number;
}

/**
 * A bar along the bottom edge that shows where you are on the page. It is
 * split into one segment per page section (sized to the section's real height),
 * each segment fills as you read through it, and a small label names the
 * section you're in. Movement is eased, not stepped, so it glides.
 */
export function ScrollProgress() {
  const fills = useRef<(HTMLDivElement | null)[]>([]);
  const segsRef = useRef<Seg[]>([]);
  const [segs, setSegs] = useState<Seg[]>([]);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  // Measure sections (top-level <section>s that carry a heading) inside <main>.
  useEffect(() => {
    function measure() {
      const main = document.querySelector("main");
      if (!main) return;
      const list: Seg[] = [];
      main.querySelectorAll("section").forEach((el) => {
        if (el.parentElement?.closest("section")) return;
        if (!el.querySelector("h1,h2")) return;
        const r = el.getBoundingClientRect();
        if (r.height < 120) return;
        const eyebrow = el.querySelector("p.uppercase, p[class*='uppercase']")?.textContent?.trim();
        const label = eyebrow || el.querySelector("h1,h2")?.textContent?.trim() || "";
        list.push({ label: label.slice(0, 34), top: r.top + window.scrollY, bottom: r.bottom + window.scrollY });
      });
      segsRef.current = list;
      setSegs((prev) => (prev.length === list.length ? prev.map((_, i) => list[i]) : list));
    }
    measure();
    const t = window.setTimeout(measure, 800);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Eased fill: each frame moves the displayed value a fraction of the way to the real one.
  useEffect(() => {
    const shown: number[] = [];
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = () => {
      const list = segsRef.current;
      const probe = window.scrollY + window.innerHeight * 0.75;
      let current = 0;
      let moving = false;
      list.forEach((s, i) => {
        const target = Math.min(1, Math.max(0, (probe - s.top) / Math.max(1, s.bottom - s.top)));
        const prev = shown[i] ?? 0;
        const next = reduce ? target : prev + (target - prev) * 0.14;
        if (Math.abs(next - target) > 0.001) moving = true;
        shown[i] = Math.abs(next - target) < 0.001 ? target : next;
        const el = fills.current[i];
        if (el) el.style.transform = `scaleX(${shown[i]})`;
        if (probe >= s.top) current = i;
      });
      setActive((a) => (a === current ? a : current));
      setVisible(window.scrollY > 80);
      raf = moving ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    const poll = window.setInterval(kick, 1000); // sections may re-measure after images load
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      window.clearInterval(poll);
    };
  }, []);

  if (segs.length === 0) return null;
  const total = segs.length;
  const height = Math.max(1, segs[total - 1].bottom - segs[0].top);

  return (
    <div
      aria-hidden="true"
      className={
        "pointer-events-none fixed inset-x-0 bottom-0 z-50 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] " +
        (visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")
      }
    >
      <div className="mb-2 ml-3 flex w-fit items-center gap-2 rounded-full border border-gold-300/30 bg-charcoal-950/85 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-warm-white/85 uppercase shadow-floating backdrop-blur-md sm:ml-5">
        <span className="tabular-nums text-gold-300">
          {String(active + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
        <span className="max-w-[46vw] truncate sm:max-w-none">{segs[active]?.label}</span>
      </div>
      <div className="flex h-3.5 gap-[3px] bg-charcoal-950/80 px-0 backdrop-blur-sm">
        {segs.map((s, i) => (
          <div
            key={i}
            className="relative h-full overflow-hidden bg-warm-white/10"
            style={{ flex: `${Math.max(0.02, (s.bottom - s.top) / height)} 1 0` }}
          >
            <div
              ref={(el) => {
                fills.current[i] = el;
              }}
              className={
                "h-full origin-left bg-gradient-to-r from-gold-500 to-gold-100 " +
                (i === active ? "shadow-[0_0_10px_rgba(232,205,138,0.7)]" : "")
              }
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
