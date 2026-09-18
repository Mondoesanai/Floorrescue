import type { Environment, JourneyStage, JourneyState, ProjectState } from "@/content/types";

export type JourneyAction =
  | { type: "HYDRATE"; state: JourneyState }
  | { type: "INTRO_FINISHED" }
  | { type: "CHOOSE_ENVIRONMENT"; environment: Environment }
  | { type: "COMMERCIAL_BUILD_SETTLED" }
  | { type: "CHOOSE_SECTOR"; sectorId: string; otherText?: string | null }
  | { type: "DOOR_ENTRY_SETTLED" }
  | { type: "CHOOSE_PROJECT_STATE"; projectState: ProjectState; otherText?: string | null }
  | { type: "DEEP_DIVE_SETTLED" }
  | { type: "TOGGLE_CONCERN"; concernId: string }
  | { type: "SET_SQUARE_FOOTAGE"; value: string }
  | { type: "SET_TIMELINE"; value: string }
  | { type: "GO_TO_QUOTE" }
  | { type: "GO_BACK" }
  | { type: "RESET" };

export const initialJourneyState: JourneyState = {
  stage: "intro",
  introSeen: false,
  environment: null,
  sectorId: null,
  otherSectorText: null,
  projectState: null,
  otherProjectText: null,
  concerns: [],
  squareFootage: "",
  timeline: "",
  history: ["intro"],
};

/** Stable, back-navigable stages, in journey order — matches the package's explicit back-behavior table. */
const backMap: Partial<Record<JourneyStage, JourneyStage>> = {
  "commercial-landing": "commercial-project-state",
  "commercial-project-state": "commercial-sector",
  "commercial-sector": "garage-idle",
  quote: "commercial-landing",
};

function pushHistory(state: JourneyState, stage: JourneyStage): JourneyState {
  return { ...state, stage, history: [...state.history, stage] };
}

export function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;

    case "INTRO_FINISHED":
      return pushHistory({ ...state, introSeen: true }, "garage-idle");

    case "CHOOSE_ENVIRONMENT":
      if (action.environment !== "commercial") {
        return { ...state, environment: action.environment };
      }
      return pushHistory({ ...state, environment: "commercial" }, "commercial-build");

    case "COMMERCIAL_BUILD_SETTLED":
      return pushHistory(state, "commercial-sector");

    case "CHOOSE_SECTOR":
      return pushHistory(
        { ...state, sectorId: action.sectorId, otherSectorText: action.otherText ?? null },
        "commercial-door-entry",
      );

    case "DOOR_ENTRY_SETTLED":
      return pushHistory(state, "commercial-project-state");

    case "CHOOSE_PROJECT_STATE":
      return pushHistory(
        { ...state, projectState: action.projectState, otherProjectText: action.otherText ?? null },
        "commercial-deep-dive",
      );

    case "DEEP_DIVE_SETTLED":
      return pushHistory(state, "commercial-landing");

    case "TOGGLE_CONCERN": {
      const has = state.concerns.includes(action.concernId);
      return {
        ...state,
        concerns: has ? state.concerns.filter((c) => c !== action.concernId) : [...state.concerns, action.concernId],
      };
    }

    case "SET_SQUARE_FOOTAGE":
      return { ...state, squareFootage: action.value };

    case "SET_TIMELINE":
      return { ...state, timeline: action.value };

    case "GO_TO_QUOTE":
      return pushHistory(state, "quote");

    case "GO_BACK": {
      const target = backMap[state.stage];
      if (!target) return state;
      return { ...state, stage: target };
    }

    case "RESET":
      // Skip the one-time intro replay if they've already seen it this session.
      return { ...initialJourneyState, introSeen: state.introSeen, stage: state.introSeen ? "garage-idle" : "intro" };

    default:
      return state;
  }
}
