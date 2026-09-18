"use client";

import { useState } from "react";
import { useJourney } from "./context";
import type { JourneyAction } from "./reducer";

const UI_FADE_MS = 500;
const VIDEO_START_DELAY_MS = 260;

/**
 * Choreographs the "ebb and flow" the client asked for: clicking a choice
 * fades the current UI out over ~0.5s, and ~0.25s into that fade (while the
 * UI is still visibly dissolving) the journey action actually fires, which
 * is what triggers CinematicStage's crossfade. The two overlap instead of
 * cutting, so the UI is gone right around when the next scene is arriving.
 */
export function useSceneTransition() {
  const { dispatch } = useJourney();
  const [leaving, setLeaving] = useState(false);

  function transition(action: JourneyAction) {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => dispatch(action), VIDEO_START_DELAY_MS);
  }

  return { leaving, transition, UI_FADE_MS };
}
