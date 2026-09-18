"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { resolveSceneAsset, type SceneKey } from "@/lib/video/registry";
import { useViewport } from "@/lib/video/useViewport";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

interface SceneVideoProps {
  sceneKey: SceneKey;
  loop?: boolean;
  /** Fires once, near the end of playback, so UI can begin fading in over stable negative space. */
  onNearEnd?: () => void;
  nearEndThreshold?: number;
  onEnded?: () => void;
  children?: ReactNode;
  className?: string;
  /** Render the settled poster only, skipping playback — used when a refresh/back
   *  restores a stage that's already past this scene's video, so it doesn't replay. */
  forceStatic?: boolean;
}

/**
 * Full-bleed video/poster layer for one cinematic scene. Always muted — every
 * sound the site makes is a synthesized SFX layer, never embedded clip audio.
 * Honors prefers-reduced-motion by rendering the poster only and immediately
 * reporting "settled" so the surrounding scene still presents its choices.
 */
export function SceneVideo({
  sceneKey,
  loop,
  onNearEnd,
  nearEndThreshold = 0.85,
  onEnded,
  children,
  className,
  forceStatic,
}: SceneVideoProps) {
  const viewport = useViewport();
  const reducedMotion = usePrefersReducedMotion();
  const asset = resolveSceneAsset(sceneKey, viewport);
  const videoRef = useRef<HTMLVideoElement>(null);
  const firedNearEnd = useRef(false);
  const firedSettled = useRef(false);
  const skipPlayback = reducedMotion || forceStatic;

  useEffect(() => {
    firedNearEnd.current = false;
  }, [sceneKey]);

  useEffect(() => {
    if (!skipPlayback || firedSettled.current) return;
    firedSettled.current = true;
    onNearEnd?.();
    if (!loop) onEnded?.();
    // Reduced motion / a restored "already settled" stage should present the
    // destination state immediately rather than play the camera move at all.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipPlayback]);

  if (skipPlayback || !asset.video) {
    return (
      <div className={className}>
        <Image src={asset.poster} alt="" fill priority className="object-cover" sizes="100vw" />
        {children}
      </div>
    );
  }

  return (
    <div className={className}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={asset.video}
        poster={asset.poster}
        autoPlay
        muted
        playsInline
        loop={loop}
        preload="auto"
        onTimeUpdate={(e) => {
          const video = e.currentTarget;
          if (!video.duration || firedNearEnd.current) return;
          if (video.currentTime / video.duration >= nearEndThreshold) {
            firedNearEnd.current = true;
            onNearEnd?.();
          }
        }}
        onEnded={() => onEnded?.()}
      />
      {children}
    </div>
  );
}
