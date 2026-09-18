"use client";

import { useEffect, useRef, useState } from "react";
import { SceneVideo } from "./SceneVideo";
import { CommercialSectorChooser } from "./CommercialSectorChooser";
import { MuteButton } from "./MuteButton";
import { useJourney } from "@/lib/journey/context";
import { useAudio } from "@/lib/audio/context";
import { playResolveChime, playWhoosh } from "@/lib/audio/sfx";
import { preloadVideo } from "@/lib/video/preload";
import { resolveSceneAsset } from "@/lib/video/registry";

export function CommercialBuildScene() {
  const { state, dispatch } = useJourney();
  const { muted } = useAudio();
  // If this stage was restored from sessionStorage past the build clip, don't replay it.
  const alreadySettled = useRef(state.stage !== "commercial-build").current;
  const [showChoice, setShowChoice] = useState(alreadySettled);

  useEffect(() => {
    // Preload the door-entry clip while this one plays, per the relay
    // strategy in implementation/performance-budget.md.
    preloadVideo(resolveSceneAsset("commercialDoorEntry", "desktop").video);
    if (!alreadySettled && !muted) playWhoosh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function settle() {
    if (showChoice) return;
    setShowChoice(true);
    if (!muted) playResolveChime();
    dispatch({ type: "COMMERCIAL_BUILD_SETTLED" });
  }

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-charcoal-950">
      <SceneVideo sceneKey="commercialBuild" forceStatic={alreadySettled} onNearEnd={settle} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-charcoal-950/30" />
      <div className="absolute top-6 right-6">
        <MuteButton />
      </div>
      <CommercialSectorChooser
        visible={showChoice}
        onSelect={(sectorId, otherText) => dispatch({ type: "CHOOSE_SECTOR", sectorId, otherText })}
      />
    </div>
  );
}
