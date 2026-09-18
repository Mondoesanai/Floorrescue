"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "fr_muted_v1";

interface AudioContextValue {
  muted: boolean;
  unlocked: boolean;
  toggleMute: () => void;
  unlock: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== null) setMuted(saved === "true");
    } catch {
      // Ignore storage errors; default to muted.
    }
  }, []);

  const value = useMemo<AudioContextValue>(
    () => ({
      muted,
      unlocked,
      toggleMute: () =>
        setMuted((prev) => {
          const next = !prev;
          try {
            window.localStorage.setItem(STORAGE_KEY, String(next));
          } catch {
            // Ignore storage errors.
          }
          return next;
        }),
      // The site never forces sound on — this only permits it once the
      // visitor has made an intentional first selection, per
      // architecture/visual-motion-system.md's audio-behavior rules.
      unlock: () => setUnlocked(true),
    }),
    [muted, unlocked],
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within an AudioProvider");
  return ctx;
}
