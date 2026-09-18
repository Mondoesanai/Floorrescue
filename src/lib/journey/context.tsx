"use client";

import { createContext, useContext, useEffect, useReducer, useRef, type ReactNode } from "react";
import type { JourneyState } from "@/content/types";
import { initialJourneyState, journeyReducer, type JourneyAction } from "./reducer";

const STORAGE_KEY = "fr_journey_v1";

const stableStages: JourneyState["stage"][] = [
  "garage-idle",
  "commercial-sector",
  "commercial-project-state",
  // "commercial-landing" is deliberately excluded: that transition is a real
  // route change (handled directly by CommercialDeepDiveScene's router.replace),
  // not an in-place scene swap on "/". Pushing a manual history entry for "/"
  // at that exact moment raced with the navigation and reverted the URL.
];

interface JourneyContextValue {
  state: JourneyState;
  dispatch: (action: JourneyAction) => void;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(journeyReducer, initialJourneyState);
  const hydrated = useRef(false);

  // Hydrate from sessionStorage once on mount so a refresh mid-journey
  // doesn't drop the visitor back to the intro.
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as JourneyState;
        dispatch({ type: "HYDRATE", state: saved });
      }
    } catch {
      // Corrupt/blocked storage — fall through to the default intro state.
    }
  }, []);

  // Persist on every change.
  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Best-effort only; the journey still works in-memory for this tab.
    }
  }, [state]);

  // Push a history entry at each stable stage so the browser Back button
  // steps to the previous meaningful scene instead of leaving the page.
  useEffect(() => {
    if (!stableStages.includes(state.stage)) return;
    const current = window.history.state as { frStage?: string } | null;
    if (current?.frStage === state.stage) return;
    window.history.pushState({ frStage: state.stage }, "", window.location.pathname + window.location.search);
  }, [state.stage]);

  useEffect(() => {
    function onPopState() {
      dispatch({ type: "GO_BACK" });
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return <JourneyContext.Provider value={{ state, dispatch }}>{children}</JourneyContext.Provider>;
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used within a JourneyProvider");
  return ctx;
}
