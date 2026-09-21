"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useJourney } from "@/lib/journey/context";
import { getSector } from "@/content/sectors";
import type { SceneKey } from "@/lib/video/registry";
import type { JourneyStage } from "@/content/types";
import { CinematicStage } from "./CinematicStage";
import { GarageIdleScene } from "./GarageIdleScene";
import { CommercialBuildScene } from "./CommercialBuildScene";
import { CommercialDoorEntryScene } from "./CommercialDoorEntryScene";
import { ResidentialBuildScene } from "./ResidentialBuildScene";
import { ResidentialDoorEntryScene } from "./ResidentialDoorEntryScene";
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
    case "residential-build":
    case "residential-sector":
      return "residentialBuild";
    case "residential-door-entry":
    case "residential-project-state":
      return "residentialDoorEntry";
    case "residential-deep-dive":
      return "residentialDeepDive";
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
  const [skipSignal, setSkipSignal] = useState(0);

  const sceneKey = sceneKeyForStage(state.stage);

  let isStatic = false;
  if (sceneKey) {
    if (!staticResolved.current.has(sceneKey)) {
      // First time we've ever rendered this clip's key: if the journey is
      // already past it (hydrated mid-session), don't replay from scratch —
      // just hold the settled frame and show the relevant choice UI.
      const alreadyPastVideo =
        state.stage === "commercial-sector" ||
        state.stage === "commercial-project-state" ||
        state.stage === "residential-sector" ||
        state.stage === "residential-project-state";
      staticResolved.current.set(sceneKey, alreadyPastVideo);
    }
    isStatic = staticResolved.current.get(sceneKey) ?? false;
  }

  function goToLanding() {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    const sector = state.sectorId ? getSector(state.sectorId) : undefined;
    const destination = sector
      ? `/${sector.environment}/${sector.id}`
      : state.environment === "residential"
        ? "/residential"
        : "/commercial";
    trackEvent("personalized_page_viewed", { sectorId: state.sectorId, projectState: state.projectState });
    // No black cut: the deep-dive video's last frame IS the landing page's
    // Hero poster image (same file, see getEnvironmentPoster), so holding
    // briefly then routing straight there reads as one continuous freeze —
    // the video settles, then the landing page's own HTML content fades in
    // on top of what looks like the same still shot. Only a short hold so
    // the video visually finishes easing to a stop before the route change.
    window.setTimeout(() => {
      // push (not replace): keeps "/" in history underneath the landing page
      // so browser Back returns there instead of leaving the site entirely.
      router.push(`${destination}?via=journey`);
    }, 350);
  }

  function handleDeepDiveEnded() {
    dispatch({ type: "DEEP_DIVE_SETTLED" });
    goToLanding();
  }

  // Fallback for hydrating straight into "commercial-landing" while still on
  // "/" (e.g. a stale session restored after closing the tab mid-transition).
  // The live transition is handled directly by handleDeepDiveEnded above.
  useEffect(() => {
    if (state.stage === "commercial-landing" || state.stage === "residential-landing") goToLanding();
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
        skipSignal={skipSignal}
        onNearEnd={() => {
          if (state.stage === "commercial-build") dispatch({ type: "COMMERCIAL_BUILD_SETTLED" });
          else if (state.stage === "commercial-door-entry") dispatch({ type: "DOOR_ENTRY_SETTLED" });
          else if (state.stage === "residential-build") dispatch({ type: "RESIDENTIAL_BUILD_SETTLED" });
          else if (state.stage === "residential-door-entry") dispatch({ type: "DOOR_ENTRY_SETTLED" });
        }}
        onEnded={() => {
          if (state.stage === "intro") dispatch({ type: "INTRO_FINISHED" });
          else if (state.stage === "commercial-deep-dive") handleDeepDiveEnded();
          else if (state.stage === "residential-deep-dive") handleDeepDiveEnded();
        }}
        className="absolute inset-0 h-full w-full"
      />

      <JourneyProgress stage={state.stage} />

      {state.stage === "garage-idle" ? <GarageIdleScene /> : null}
      {state.stage === "commercial-build" || state.stage === "commercial-sector" ? <CommercialBuildScene /> : null}
      {state.stage === "commercial-door-entry" || state.stage === "commercial-project-state" ? <CommercialDoorEntryScene /> : null}
      {state.stage === "residential-build" || state.stage === "residential-sector" ? <ResidentialBuildScene /> : null}
      {state.stage === "residential-door-entry" || state.stage === "residential-project-state" ? (
        <ResidentialDoorEntryScene />
      ) : null}

      {[
        "intro",
        "commercial-build",
        "commercial-door-entry",
        "commercial-deep-dive",
        "residential-build",
        "residential-door-entry",
        "residential-deep-dive",
      ].includes(state.stage) && !isStatic ? (
        <button
          type="button"
          onClick={() => setSkipSignal((n) => n + 1)}
          className="fixed right-5 bottom-6 z-30 flex items-center gap-1.5 rounded-full border border-warm-white/25 bg-charcoal-950/60 px-4 py-2.5 text-sm font-semibold text-warm-white/85 backdrop-blur-md transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300/60 hover:text-warm-white focus-visible:outline-2 focus-visible:outline-gold-300"
        >
          Skip
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 5l7 7-7 7M13 5l7 7-7 7" />
          </svg>
        </button>
      ) : null}

      {[
        "commercial-sector",
        "commercial-project-state",
        "residential-sector",
        "residential-project-state",
      ].includes(state.stage) ? (
        <button
          type="button"
          onClick={() => dispatch({ type: "GO_BACK" })}
          className="fixed bottom-6 left-6 z-30 flex items-center gap-1.5 rounded-full border border-warm-white/25 bg-charcoal-950/60 px-4 py-2.5 text-sm font-semibold text-warm-white/80 backdrop-blur-md transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold-300/50 hover:text-warm-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Go Back
        </button>
      ) : null}
    </div>
  );
}
