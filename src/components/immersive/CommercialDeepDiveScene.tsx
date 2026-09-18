"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SceneVideo } from "./SceneVideo";
import { MuteButton } from "./MuteButton";
import { useJourney } from "@/lib/journey/context";
import { useAudio } from "@/lib/audio/context";
import { playResolveChime, playWhoosh } from "@/lib/audio/sfx";
import { getSector } from "@/content/sectors";
import { trackEvent } from "@/lib/analytics";

export function CommercialDeepDiveScene() {
  const { state, dispatch } = useJourney();
  const { muted } = useAudio();
  const router = useRouter();
  const navigated = useRef(false);

  useEffect(() => {
    if (!muted) playWhoosh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function settle() {
    if (navigated.current) return;
    navigated.current = true;
    if (!muted) playResolveChime();
    dispatch({ type: "DEEP_DIVE_SETTLED" });
    const sector = state.sectorId ? getSector(state.sectorId) : undefined;
    const destination = sector ? `/${sector.environment}/${sector.id}` : "/commercial";
    trackEvent("personalized_page_viewed", { sectorId: state.sectorId, projectState: state.projectState });
    router.replace(`${destination}?via=journey`);
  }

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-charcoal-950">
      <SceneVideo sceneKey="commercialDeepDive" onEnded={settle} onNearEnd={undefined} nearEndThreshold={0.98} className="absolute inset-0 h-full w-full" />
      <div className="absolute top-6 right-6">
        <MuteButton />
      </div>
    </div>
  );
}
