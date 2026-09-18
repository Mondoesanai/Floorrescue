"use client";

import { useEffect } from "react";
import { CommercialSectorChooser } from "./CommercialSectorChooser";
import { useJourney } from "@/lib/journey/context";
import { useSceneTransition } from "@/lib/journey/useSceneTransition";
import { preloadVideo } from "@/lib/video/preload";
import { resolveSceneAsset } from "@/lib/video/registry";

/** Pure UI overlay for the commercial-build / commercial-sector phase — the
 *  video itself lives in ImmersiveJourney's single CinematicStage. */
export function CommercialBuildScene() {
  const { state } = useJourney();
  const { leaving, transition } = useSceneTransition();
  const showChoice = state.stage === "commercial-sector";

  useEffect(() => {
    // Preload the door-entry clip while this one plays, per the relay
    // strategy in implementation/performance-budget.md.
    preloadVideo(resolveSceneAsset("commercialDoorEntry", "desktop").video);
  }, []);

  return (
    <CommercialSectorChooser
      visible={showChoice && !leaving}
      onSelect={(sectorId, otherText) => transition({ type: "CHOOSE_SECTOR", sectorId, otherText })}
    />
  );
}
