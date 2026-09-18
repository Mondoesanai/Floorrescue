"use client";

import { useAudio } from "@/lib/audio/context";
import clsx from "clsx";

export function MuteButton({ className }: { className?: string }) {
  const { muted, toggleMute } = useAudio();

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-pressed={!muted}
      aria-label={muted ? "Unmute ambient sound" : "Mute ambient sound"}
      className={clsx(
        "flex h-10 w-10 items-center justify-center rounded-full border border-warm-white/20 bg-charcoal-950/60 text-warm-white/80 backdrop-blur-sm transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300",
        className,
      )}
    >
      {muted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <line x1="16" y1="9" x2="22" y2="15" />
          <line x1="22" y1="9" x2="16" y2="15" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <path d="M16 8.5a4.5 4.5 0 0 1 0 7" />
          <path d="M18.5 6a8 8 0 0 1 0 12" />
        </svg>
      )}
    </button>
  );
}
