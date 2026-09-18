"use client";

import { createContext, useContext, useEffect, useReducer, useRef, type ReactNode } from "react";
import type { JourneyState } from "@/content/types";
import { initialJourneyState, journeyReducer, type JourneyAction } from "./reducer";

const STORAGE_KEY = "fr_journey_v1";

interface JourneyContextValue {
  state: JourneyState;
  dispatch: (action: JourneyAction) => void;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(journeyReducer, initialJourneyState);
  const hydrated = useRef(false);

  // Hydrate from sessionStorage once on mount — except on an actual browser
  // reload, which should always replay the intro from a clean slate. Client
  // -side navigation (the logo, Back to Home) never hits this effect at all,
  // since the provider stays mounted for the whole SPA session — only a real
  // reload does, which is exactly the distinction that was asked for.
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const navEntry = window.performance?.getEntriesByType?.("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (navEntry?.type === "reload") return;
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

  // The cinematic journey's intermediate scenes live entirely in in-memory
  // state on "/" and are never individually pushed into browser history —
  // trying to reconstruct each micro-stage from popstate proved fragile and
  // was the source of "back takes me to a random page." Instead: landing
  // back on "/" via the browser Back button always returns to the main
  // chooser (skipping a redundant intro replay), which is what "back to the
  // beginning" actually means to a visitor. The personalized landing page
  // itself is a real pushed route, so Back from there naturally arrives here.
  useEffect(() => {
    function onPopState() {
      if (window.location.pathname === "/") dispatch({ type: "RESET" });
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
