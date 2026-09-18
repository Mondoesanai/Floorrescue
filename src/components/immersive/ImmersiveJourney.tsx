"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useJourney } from "@/lib/journey/context";
import { getSector } from "@/content/sectors";
import { IntroScene } from "./IntroScene";
import { GarageIdleScene } from "./GarageIdleScene";
import { CommercialBuildScene } from "./CommercialBuildScene";
import { CommercialDoorEntryScene } from "./CommercialDoorEntryScene";
import { CommercialDeepDiveScene } from "./CommercialDeepDiveScene";

/**
 * Top-level state-machine host for the cinematic homepage. Stage -> scene
 * mapping matches implementation/video-state-machine.md exactly. Note that
 * commercial-build/commercial-sector share one scene component (same for
 * door-entry/project-state) so the underlying <video> never remounts when the
 * choice UI fades in over it.
 */
export function ImmersiveJourney() {
  const { state } = useJourney();
  const router = useRouter();
  const previousStage = useRef(state.stage);

  // CommercialDeepDiveScene already performs the real navigation the instant
  // its clip ends (it owns state.sectorId at exactly the right moment). This
  // effect exists only as a fallback for the rare case of hydrating straight
  // into "commercial-landing" while still on "/" (e.g. a stale session
  // restored after closing the tab mid-transition) — it must NOT re-fire for
  // the live in-app transition, or it races CommercialDeepDiveScene's own
  // router.replace over the History API and the URL snaps back to "/".
  useEffect(() => {
    const cameFromLiveTransition = previousStage.current === "commercial-deep-dive" && state.stage === "commercial-landing";
    previousStage.current = state.stage;
    if (state.stage === "commercial-landing" && !cameFromLiveTransition) {
      const sector = state.sectorId ? getSector(state.sectorId) : undefined;
      router.replace(sector ? `/${sector.environment}/${sector.id}?via=journey` : "/commercial");
    }
  }, [state.stage, state.sectorId, router]);

  switch (state.stage) {
    case "intro":
      return <IntroScene />;
    case "garage-idle":
      return <GarageIdleScene />;
    case "commercial-build":
    case "commercial-sector":
      return <CommercialBuildScene />;
    case "commercial-door-entry":
    case "commercial-project-state":
      return <CommercialDoorEntryScene />;
    case "commercial-deep-dive":
      return <CommercialDeepDiveScene />;
    default:
      // "commercial-landing": briefly blank while CommercialDeepDiveScene's
      // router.replace (or the mount-time fallback above) completes.
      return <div className="h-[60svh]" aria-hidden="true" />;
  }
}
