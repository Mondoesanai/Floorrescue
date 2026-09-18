"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { resolveSceneAsset, type SceneKey } from "@/lib/video/registry";
import { useViewport } from "@/lib/video/useViewport";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

const CROSSFADE_MS = 420;
const PLAYBACK_RATE = 1.15;

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
    el.playbackRate = PLAYBACK_RATE;
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

  function handleTimeUpdate(slot: "A" | "B") {
    return (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (slot !== active) return;
      const video = e.currentTarget;
      if (!video.duration || firedNearEnd.current) return;
      if (video.currentTime / video.duration >= nearEndThreshold) {
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
