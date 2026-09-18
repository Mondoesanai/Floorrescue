"use client";

import { useEffect } from "react";
import { CommercialProjectStateChooser } from "./CommercialProjectStateChooser";
import { useJourney } from "@/lib/journey/context";
import { useSceneTransition } from "@/lib/journey/useSceneTransition";
import { preloadVideo } from "@/lib/video/preload";
import { resolveSceneAsset } from "@/lib/video/registry";

/** Pure UI overlay for the commercial-door-entry / commercial-project-state
 *  phase — video lives in ImmersiveJourney's single CinematicStage. */
export function CommercialDoorEntryScene() {
  const { state } = useJourney();
  const { leaving, transition } = useSceneTransition();
  const showChoice = state.stage === "commercial-project-state";

  useEffect(() => {
    preloadVideo(resolveSceneAsset("commercialDeepDive", "desktop").video);
  }, []);

  return (
    <CommercialProjectStateChooser
      visible={showChoice && !leaving}
      onSelect={(projectState, otherText) => transition({ type: "CHOOSE_PROJECT_STATE", projectState, otherText })}
    />
  );
}
