"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useJourney } from "@/lib/journey/context";
import { getSector } from "@/content/sectors";
import type { SceneKey } from "@/lib/video/registry";
import type { JourneyStage } from "@/content/types";
import { CinematicStage } from "./CinematicStage";
import { GarageIdleScene } from "./GarageIdleScene";
import { CommercialBuildScene } from "./CommercialBuildScene";
import { CommercialDoorEntryScene } from "./CommercialDoorEntryScene";
import { JourneyProgress } from "./JourneyProgress";
import { trackEvent } from "@/lib/analytics";

function sceneKeyForStage(stage: JourneyStage): SceneKey | null {
  switch (stage) {
    case "intro":
      return "introRestoration";
    case "garage-idle":
      return "garageIdle";
    case "commercial-build":
    case "commercial-sector":
      return "commercialBuild";
    case "commercial-door-entry":
    case "commercial-project-state":
      return "commercialDoorEntry";
    case "commercial-deep-dive":
      return "commercialDeepDive";
    default:
      return null;
  }
}

/**
 * Top-level state-machine host for the cinematic homepage. Owns ONE
 * CinematicStage for the whole journey (crossfades between scenes instead of
 * unmounting/remounting a <video> per scene — that remount was the visible
 * "glitch" between scenes) and swaps only the lightweight choice-UI overlay
 * on top of it based on the current stage.
 */
export function ImmersiveJourney() {
  const { state, dispatch } = useJourney();
  const router = useRouter();
  const navigatedRef = useRef(false);
  const staticResolved = useRef<Map<SceneKey, boolean>>(new Map());

  const sceneKey = sceneKeyForStage(state.stage);

  let isStatic = false;
  if (sceneKey) {
    if (!staticResolved.current.has(sceneKey)) {
      // First time we've ever rendered this clip's key: if the journey is
      // already past it (hydrated mid-session), don't replay from scratch —
      // just hold the settled frame and show the relevant choice UI.
      const alreadyPastVideo = state.stage === "commercial-sector" || state.stage === "commercial-project-state";
      staticResolved.current.set(sceneKey, alreadyPastVideo);
    }
    isStatic = staticResolved.current.get(sceneKey) ?? false;
  }

  function goToLanding() {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    const sector = state.sectorId ? getSector(state.sectorId) : undefined;
    const destination = sector ? `/${sector.environment}/${sector.id}` : "/commercial";
    trackEvent("personalized_page_viewed", { sectorId: state.sectorId, projectState: state.projectState });
    // push (not replace): keeps "/" in history underneath the landing page so
    // browser Back returns there instead of leaving the site entirely.
    router.push(`${destination}?via=journey`);
  }

  function handleDeepDiveEnded() {
    dispatch({ type: "DEEP_DIVE_SETTLED" });
    goToLanding();
  }

  // Fallback for hydrating straight into "commercial-landing" while still on
  // "/" (e.g. a stale session restored after closing the tab mid-transition).
  // The live transition is handled directly by handleDeepDiveEnded above.
  useEffect(() => {
    if (state.stage === "commercial-landing") goToLanding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!sceneKey) {
    return <div className="h-[60svh]" aria-hidden="true" />;
  }

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-charcoal-950">
      <CinematicStage
        sceneKey={sceneKey}
        loop={state.stage === "garage-idle"}
        static={isStatic}
        onNearEnd={() => {
          if (state.stage === "commercial-build") dispatch({ type: "COMMERCIAL_BUILD_SETTLED" });
          else if (state.stage === "commercial-door-entry") dispatch({ type: "DOOR_ENTRY_SETTLED" });
        }}
        onEnded={() => {
          if (state.stage === "intro") dispatch({ type: "INTRO_FINISHED" });
          else if (state.stage === "commercial-deep-dive") handleDeepDiveEnded();
        }}
        className="absolute inset-0 h-full w-full"
      />

      <JourneyProgress stage={state.stage} />

      {state.stage === "garage-idle" ? <GarageIdleScene /> : null}
      {state.stage === "commercial-build" || state.stage === "commercial-sector" ? <CommercialBuildScene /> : null}
      {state.stage === "commercial-door-entry" || state.stage === "commercial-project-state" ? <CommercialDoorEntryScene /> : null}
    </div>
  );
}
