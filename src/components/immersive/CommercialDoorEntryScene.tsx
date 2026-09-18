"use client";

import { useEffect, useRef, useState } from "react";
import { SceneVideo } from "./SceneVideo";
import { CommercialProjectStateChooser } from "./CommercialProjectStateChooser";
import { MuteButton } from "./MuteButton";
import { useJourney } from "@/lib/journey/context";
import { useAudio } from "@/lib/audio/context";
import { playDoorOpen, playWhoosh } from "@/lib/audio/sfx";
import { preloadVideo } from "@/lib/video/preload";
import { resolveSceneAsset } from "@/lib/video/registry";

export function CommercialDoorEntryScene() {
  const { state, dispatch } = useJourney();
  const { muted } = useAudio();
  const alreadySettled = useRef(state.stage !== "commercial-door-entry").current;
  const [showChoice, setShowChoice] = useState(alreadySettled);

  useEffect(() => {
    preloadVideo(resolveSceneAsset("commercialDeepDive", "desktop").video);
    if (alreadySettled || muted) return;
    playWhoosh();
    const doorTimer = window.setTimeout(() => playDoorOpen(), 550);
    return () => window.clearTimeout(doorTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function settle() {
    if (showChoice) return;
    setShowChoice(true);
    dispatch({ type: "DOOR_ENTRY_SETTLED" });
  }

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-charcoal-950">
      <SceneVideo sceneKey="commercialDoorEntry" forceStatic={alreadySettled} onNearEnd={settle} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-charcoal-950/30" />
      <div className="absolute top-6 right-6">
        <MuteButton />
      </div>
      <CommercialProjectStateChooser
        visible={showChoice}
        onSelect={(projectState, otherText) => dispatch({ type: "CHOOSE_PROJECT_STATE", projectState, otherText })}
      />
    </div>
  );
}
