import type { ProjectState, Sector } from "./types";
import { getProblem } from "./problems";

export interface ResolvedHeroCopy {
  eyebrow: string;
  headline: string;
  support: string;
}

const projectStateLabel: Record<ProjectState, string> = {
  "new-construction": "New Construction",
  renovation: "Renovation / Upgrade",
  "failed-floor": "Existing Floor Failure",
  other: "Your Project",
};

/**
 * Build the hero for a sector + project state. Uses the sector's authored
 * heroCopyVariants when they exist (all Commercial sectors do); otherwise
 * falls back to a generated-but-still-modular headline built from approved
 * sector/problem language — never freeform AI prose. This is what lets
 * Residential/Industrial sector pages work today without hand-authoring a
 * full copy matrix before those cinematic paths exist.
 */
export function resolveHeroCopy(
  sector: Sector,
  projectState: ProjectState | null,
  concerns: string[] = [],
  otherText?: string | null,
): ResolvedHeroCopy {
  const state = projectState ?? "other";
  const authored = sector.heroCopyVariants.find((v) => v.projectState === state);
  if (authored) return authored;

  const topConcern = concerns.map(getProblem).find(Boolean);

  const eyebrow = `${sector.shortLabel.toUpperCase()} — ${projectStateLabel[state].toUpperCase()}`;

  if (state === "other" && otherText) {
    return {
      eyebrow,
      headline: `A FLOOR SYSTEM MATCHED TO WHAT YOU ACTUALLY DESCRIBED.`,
      support: `You told us: "${otherText}" — Floor Rescue evaluates the slab, the space, and what the floor needs to survive before recommending a system.`,
    };
  }

  const headlineByState: Record<ProjectState, string> = {
    "new-construction": `A ${sector.shortLabel.toUpperCase()} FLOOR PLANNED FROM THE SLAB UP.`,
    renovation: `UPGRADING A ${sector.shortLabel.toUpperCase()} FLOOR WITHOUT DISRUPTING HOW THE SPACE RUNS.`,
    "failed-floor": `A FAILED ${sector.shortLabel.toUpperCase()} FLOOR, DIAGNOSED BEFORE ANYTHING GOES BACK DOWN.`,
    other: `A ${sector.shortLabel.toUpperCase()} FLOOR SYSTEM MATCHED TO THE SPACE.`,
  };

  const supportByState: Record<ProjectState, string> = {
    "new-construction": `Every recommendation starts with the slab, the space, and what the floor needs to survive. ${sector.description}`,
    renovation: `Floor Rescue evaluates the existing slab and how the space operates day to day before recommending what goes back down.`,
    "failed-floor": `Floor Rescue evaluates the slab, the environment, and what caused the previous system to fail before deciding what goes back down.`,
    other: sector.description,
  };

  return {
    eyebrow,
    headline: headlineByState[state],
    support: topConcern
      ? `${supportByState[state]} ${topConcern.shortDescription}`
      : supportByState[state],
  };
}
