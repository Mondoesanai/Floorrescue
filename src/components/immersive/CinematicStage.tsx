"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { resolveSceneAsset, type SceneKey } from "@/lib/video/registry";
import { useViewport } from "@/lib/video/useViewport";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

const CROSSFADE_MS = 420;
const DEFAULT_PLAYBACK_RATE = 1.15;
// The building build-up and the opening intro both read slow at normal speed —
// speed them up more aggressively than the rest of the journey. First
// impression has to be fast; nobody should be waiting on the intro.
const PLAYBACK_RATE_BY_SCENE: Partial<Record<SceneKey, number>> = {
  introRestoration: 1.65,
  commercialBuild: 1.35,
};

interface CinematicStageProps {
  sceneKey: SceneKey;
  loop?: boolean;
  onNearEnd?: () => void;
  nearEndThreshold?: number;
  onEnded?: () => void;
  className?: string;
  /** Render the settled poster only, skipping playback — a refresh/back restored
   *  a stage that's already past this scene's video, so it must not replay. */
  static?: boolean;
  /** Increment to jump the playing clip to its final moments (the Skip button). */
  skipSignal?: number;
}

/**
 * One persistent full-bleed video stage for the whole cinematic journey,
 * rendered once at the top of ImmersiveJourney rather than remounted per
 * scene. Scene changes crossfade between two stacked <video> elements
 * instead of unmounting/remounting — that unmount/remount was the source of
 * the visible "glitch" cut between scenes. Always muted; every sound the
 * site makes is a synthesized SFX layer, never embedded clip audio.
 */
export function CinematicStage({
  sceneKey,
  loop,
  onNearEnd,
  nearEndThreshold = 0.85,
  onEnded,
  className,
  static: isStatic,
  skipSignal = 0,
}: CinematicStageProps) {
  const viewport = useViewport();
  const reducedMotion = usePrefersReducedMotion();
  const asset = resolveSceneAsset(sceneKey, viewport);
  const skipPlayback = reducedMotion || isStatic || !asset.video;

  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<"A" | "B">("A");
  const [visibleSlots, setVisibleSlots] = useState<{ A: boolean; B: boolean }>({ A: true, B: false });
  const mountedScene = useRef<SceneKey | null>(null);
  const firedNearEnd = useRef(false);
  const firedSettled = useRef(false);
  const posterOnly = useRef(skipPlayback);
  posterOnly.current = skipPlayback;

  // Reduced motion / an already-settled restored stage: report "done" once, no playback.
  useEffect(() => {
    firedSettled.current = false;
  }, [sceneKey]);

  useEffect(() => {
    if (!skipPlayback || firedSettled.current) return;
    firedSettled.current = true;
    onNearEnd?.();
    if (!loop) onEnded?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipPlayback, sceneKey]);

  useEffect(() => {
    if (skipPlayback) return;
    firedNearEnd.current = false;

    const isFirstMount = mountedScene.current === null;
    mountedScene.current = sceneKey;

    const activeRef = active === "A" ? videoARef : videoBRef;
    const nextRef = active === "A" ? videoBRef : videoARef;
    const target = isFirstMount ? activeRef : nextRef;
    const el = target.current;
    if (!el || !asset.video) return;

    el.src = asset.video;
    el.playbackRate = PLAYBACK_RATE_BY_SCENE[sceneKey] ?? DEFAULT_PLAYBACK_RATE;
    el.loop = Boolean(loop);
    el.load();

    let cancelled = false;
    let fallback: number | undefined;

    function start() {
      if (cancelled || !el) return;
      void el.play().catch(() => {});
      if (isFirstMount) {
        setVisibleSlots((v) => ({ ...v, [active]: true }));
      } else {
        // Crossfade: bring the new slot in while the old one fades out, then
        // free the old element's buffer once the dissolve finishes.
        const incoming = active === "A" ? "B" : "A";
        setVisibleSlots({ A: true, B: true });
        window.setTimeout(() => {
          if (cancelled) return;
          setActive(incoming);
          window.setTimeout(() => {
            if (cancelled) return;
            const outgoing = activeRef.current;
            if (outgoing) {
              outgoing.pause();
              outgoing.removeAttribute("src");
              outgoing.load();
            }
            setVisibleSlots((v) => ({ ...v, [active]: false }));
          }, CROSSFADE_MS);
        }, 20);
      }
    }

    function onCanPlay() {
      start();
    }
    el.addEventListener("canplay", onCanPlay, { once: true });
    fallback = window.setTimeout(start, 700);

    return () => {
      cancelled = true;
      el.removeEventListener("canplay", onCanPlay);
      if (fallback) window.clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneKey, skipPlayback]);

  // Skip: seek the playing clip to just before its end; the normal timeupdate /
  // ended handlers then settle the journey exactly as if it had played out.
  useEffect(() => {
    if (!skipSignal || skipPlayback) return;
    let sought = false;
    for (const ref of [videoARef, videoBRef]) {
      const v = ref.current;
      if (!v || !v.src || v.paused || !Number.isFinite(v.duration) || v.duration <= 0) continue;
      v.playbackRate = 1;
      v.currentTime = Math.max(0, v.duration - 0.15);
      sought = true;
    }
    if (!sought) {
      firedNearEnd.current = true;
      onNearEnd?.();
      if (!loop) onEnded?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipSignal]);

  function handleTimeUpdate(slot: "A" | "B") {
    return (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (slot !== active) return;
      const video = e.currentTarget;
      if (!video.duration) return;
      const progress = video.currentTime / video.duration;

      // Ease the clip to a stop instead of ending at full speed and cutting —
      // the last 18% of playback smoothly decelerates toward the freeze frame.
      const decelStart = 0.82;
      if (progress >= decelStart) {
        const base = PLAYBACK_RATE_BY_SCENE[sceneKey] ?? DEFAULT_PLAYBACK_RATE;
        const t = Math.min(1, (progress - decelStart) / (1 - decelStart));
        const eased = 1 - Math.pow(1 - t, 2); // ease-out
        const rate = base - (base - 0.3) * eased;
        if (Math.abs(video.playbackRate - rate) > 0.02) video.playbackRate = rate;
      }

      if (!firedNearEnd.current && progress >= nearEndThreshold) {
        firedNearEnd.current = true;
        onNearEnd?.();
      }
    };
  }

  function handleEnded(slot: "A" | "B") {
    return () => {
      if (slot !== active) return;
      onEnded?.();
    };
  }

  if (skipPlayback) {
    return (
      <div className={className}>
        <Image src={asset.poster} alt="" fill priority className="object-cover" sizes="100vw" />
      </div>
    );
  }

  return (
    <div className={className}>
      <video
        ref={videoARef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity ease-linear"
        style={{ opacity: visibleSlots.A ? 1 : 0, transitionDuration: `${CROSSFADE_MS}ms` }}
        poster={asset.poster}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate("A")}
        onEnded={handleEnded("A")}
      />
      <video
        ref={videoBRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity ease-linear"
        style={{ opacity: visibleSlots.B ? 1 : 0, transitionDuration: `${CROSSFADE_MS}ms` }}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate("B")}
        onEnded={handleEnded("B")}
      />
    </div>
  );
}
