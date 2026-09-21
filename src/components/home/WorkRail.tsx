"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const photos = [
  ["project-metallic-white-garage", "Metallic epoxy"],
  ["project-airport-terminal-scored-concrete", "Scored concrete · terminal"],
  ["project-residential-kitchen-polished", "Polished concrete · kitchen"],
  ["project-industrial-warehouse-polished", "Polished concrete · warehouse"],
  ["project-metallic-blue-garage", "Metallic epoxy"],
  ["project-commercial-kitchen-concrete", "Commercial kitchen restoration"],
  ["project-residential-home-office", "Polished concrete · home office"],
  ["project-mclaren-garage", "Metallic epoxy"],
  ["project-modern-commercial-patio", "Commercial exterior concrete"],
  ["project-residential-slide-polished", "Polished concrete · residence"],
  ["crew-troweling-floor", "On the trowel"],
  ["project-metallic-blue-empty-room", "Metallic epoxy"],
] as const;

const src = (i: number) => `/assets/images/team-photos/${photos[i][0]}.png`;

/**
 * A slow, endless rail of real Floor Rescue work. It drifts on its own; hover
 * or touch pauses it, you can drag or use the arrows to go side to side, and
 * tapping any photo opens it full size with next/previous.
 */
export function WorkRail() {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const resumeTimer = useRef<number>(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [hint, setHint] = useState(true);

  const row = [...photos, ...photos];

  // Auto-drift, looped by wrapping at the halfway point.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let acc = el.scrollLeft; // float position — scrollLeft alone can round small steps to nothing
    const tick = () => {
      const half = el.scrollWidth / 2;
      if (paused.current || open !== null) {
        acc = el.scrollLeft; // follow manual drag / arrows
      } else {
        acc += 0.7;
        if (acc >= half) acc -= half;
        el.scrollLeft = acc;
      }
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft <= 0 && drag.current) el.scrollLeft += half;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open]);

  const pause = useCallback(() => {
    window.clearTimeout(resumeTimer.current);
    paused.current = true;
  }, []);
  const resume = useCallback((delay = 0) => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      paused.current = false;
    }, delay);
  }, []);

  function nudge(dir: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    setHint(false);
    pause();
    el.scrollBy({ left: dir * 360, behavior: "smooth" });
    resume(2500);
  }

  // Lightbox keyboard + scroll lock.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % photos.length));
      else if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const touchX = useRef<number | null>(null);

  return (
    <section className="overflow-hidden border-t border-warm-white/10 bg-charcoal-950 py-16">
      <div className="mx-auto mb-8 flex max-w-6xl items-end justify-between gap-4 px-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">The Work</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">Real floors. Real jobsites.</h2>
          <p className="mt-2 text-sm text-warm-white/55">Hover to pause · drag or use the arrows · tap a photo to open it.</p>
        </div>
        <div className="flex flex-none items-center gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Scroll photos left"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-warm-white/25 text-warm-white transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-300/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Scroll photos right"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-warm-white/25 text-warm-white transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-300/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onMouseEnter={pause}
        onMouseLeave={() => {
          drag.current = null;
          resume(300);
        }}
        onTouchStart={() => {
          pause();
          setHint(false);
        }}
        onTouchEnd={() => resume(2500)}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { x: e.clientX, left: scroller.current?.scrollLeft ?? 0, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !scroller.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 6) d.moved = true;
          scroller.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => {
          window.setTimeout(() => (drag.current = null), 0);
        }}
        className="scrollbar-none flex cursor-grab gap-4 overflow-x-auto px-6 pb-2 select-none active:cursor-grabbing"
        style={{ scrollbarWidth: "none" }}
      >
        {row.map(([file, label], i) => (
          <button
            key={`${file}-${i}`}
            type="button"
            onClick={() => {
              if (drag.current?.moved) return;
              setOpen(i % photos.length);
            }}
            aria-label={`Open photo: ${label}`}
            className="deboss group relative h-56 w-80 flex-none cursor-pointer overflow-hidden rounded-xl border border-warm-white/10 text-left transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-[0_18px_40px_-16px_rgba(201,162,75,0.5)] focus-visible:outline-2 focus-visible:outline-gold-300 sm:h-64 sm:w-96"
          >
            <Image
              src={`/assets/images/team-photos/${file}.png`}
              alt={label}
              fill
              sizes="24rem"
              draggable={false}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-0 px-4 pb-3 text-xs font-semibold tracking-[0.1em] text-warm-white/85 uppercase">{label}</span>
            <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-charcoal-950/80 px-3 py-1.5 text-[11px] font-bold tracking-[0.1em] text-gold-100 uppercase opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              Open
            </span>
          </button>
        ))}
      </div>

      <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between px-6">
        {hint ? <span className="text-xs text-warm-white/40 sm:hidden">Swipe to browse</span> : <span />}
        <Link href="/projects" className="text-sm font-semibold text-gold-200 hover:text-gold-100">
          Browse all projects →
        </Link>
      </div>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[open][1]}
          className="fixed inset-0 z-[70] flex flex-col bg-charcoal-950/95 backdrop-blur-md"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) setOpen((i) => (i === null ? i : (i + (dx < 0 ? 1 : -1) + photos.length) % photos.length));
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 text-warm-white/80">
            <p className="text-sm font-semibold tracking-[0.1em] uppercase">
              {photos[open][1]} <span className="ml-2 text-warm-white/40">{open + 1} / {photos.length}</span>
            </p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-white/25 hover:border-gold-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <div className="relative min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
            <Image key={open} src={src(open)} alt={photos[open][1]} fill sizes="100vw" className="object-contain animate-[hero-fade-in_0.4s_ease-out_both]" priority />
          </div>
          <div className="flex items-center justify-center gap-3 px-5 py-5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))}
              className="rounded-full border border-warm-white/25 px-5 py-2.5 text-sm font-semibold text-warm-white hover:border-gold-300"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={() => setOpen((i) => (i === null ? i : (i + 1) % photos.length))}
              className="rounded-full bg-gold-300 px-5 py-2.5 text-sm font-bold text-charcoal-950 hover:bg-gold-100"
            >
              Next →
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
