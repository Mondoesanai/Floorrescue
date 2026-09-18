"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProjectStateChooser } from "./ProjectStateChooser";
import { useJourney } from "@/lib/journey/context";
import { useSceneTransition } from "@/lib/journey/useSceneTransition";
import { preloadVideo } from "@/lib/video/preload";
import { resolveSceneAsset } from "@/lib/video/registry";
import { getSector } from "@/content/sectors";

/** Pure UI overlay for the residential-door-entry / residential-project-state
 *  phase — video lives in ImmersiveJourney's single CinematicStage. Mirrors
 *  CommercialDoorEntryScene exactly. */
export function ResidentialDoorEntryScene() {
  const { state } = useJourney();
  const { leaving, transition } = useSceneTransition();
  const router = useRouter();
  const showChoice = state.stage === "residential-project-state";

  useEffect(() => {
    preloadVideo(resolveSceneAsset("residentialDeepDive", "desktop").video);
    // The sector is already known here — prefetch the eventual landing page's
    // RSC payload now so the deep-dive -> landing jump doesn't have to wait
    // on it, which was the source of the rough/choppy final transition.
    const sector = state.sectorId ? getSector(state.sectorId) : undefined;
    if (sector) router.prefetch(`/${sector.environment}/${sector.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProjectStateChooser
      visible={showChoice && !leaving}
      onSelect={(projectState, otherText) => transition({ type: "CHOOSE_PROJECT_STATE", projectState, otherText })}
    />
  );
}
