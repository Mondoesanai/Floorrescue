"use client";

import { SceneVideo } from "./SceneVideo";
import { useJourney } from "@/lib/journey/context";

export function IntroScene() {
  const { dispatch } = useJourney();

  return (
    <SceneVideo sceneKey="introRestoration" onEnded={() => dispatch({ type: "INTRO_FINISHED" })} className="relative h-[100svh] w-full overflow-hidden bg-charcoal-950" />
  );
}
