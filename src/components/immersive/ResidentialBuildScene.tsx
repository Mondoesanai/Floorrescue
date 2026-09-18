"use client";

import { useEffect } from "react";
import { ResidentialSectorChooser } from "./ResidentialSectorChooser";
import { useJourney } from "@/lib/journey/context";
import { useSceneTransition } from "@/lib/journey/useSceneTransition";
import { preloadVideo } from "@/lib/video/preload";
import { resolveSceneAsset } from "@/lib/video/registry";

/** Pure UI overlay for the residential-build / residential-sector phase — the
 *  video itself lives in ImmersiveJourney's single CinematicStage. Mirrors
 *  CommercialBuildScene exactly. */
export function ResidentialBuildScene() {
  const { state } = useJourney();
  const { leaving, transition } = useSceneTransition();
  const showChoice = state.stage === "residential-sector";

  useEffect(() => {
    // Preload the door-entry clip while this one plays, per the relay
    // strategy in implementation/performance-budget.md.
    preloadVideo(resolveSceneAsset("residentialDoorEntry", "desktop").video);
  }, []);

  return (
    <ResidentialSectorChooser
      visible={showChoice && !leaving}
      onSelect={(sectorId, otherText) => transition({ type: "CHOOSE_SECTOR", sectorId, otherText })}
    />
  );
}
