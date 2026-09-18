import { matchSectorByKeyword } from "@/content/sectors";
import { problems } from "@/content/problems";
import type { Environment } from "@/content/types";
import type { ClassifierResult } from "./schema";

const projectStateKeywords: Record<string, "new-construction" | "renovation" | "failed-floor"> = {
  new: "new-construction",
  "new construction": "new-construction",
  "new build": "new-construction",
  "ground up": "new-construction",
  renovat: "renovation",
  upgrad: "renovation",
  remodel: "renovation",
  fail: "failed-floor",
  peel: "failed-floor",
  crack: "failed-floor",
  damaged: "failed-floor",
  delaminat: "failed-floor",
};

/**
 * Always-available keyword classifier. This is the site's real source of
 * truth for routing free text — the AI layer (when configured) can only
 * refine or rank on top of it, never replace it. See implementation/ai-routing.md.
 */
export function classifyDeterministically(text: string, environment?: Environment): ClassifierResult {
  const normalized = text.toLowerCase();

  const sector = matchSectorByKeyword(normalized, environment);

  let projectState: ClassifierResult["projectState"] = "unknown";
  for (const [keyword, state] of Object.entries(projectStateKeywords)) {
    if (normalized.includes(keyword)) {
      projectState = state;
      break;
    }
  }

  const concerns = problems.filter((p) => normalized.includes(p.id.replace(/-/g, " ")) || normalized.includes(p.label.toLowerCase())).map((p) => p.id);

  const resolvedEnvironment: ClassifierResult["environment"] = environment ?? sector?.environment ?? "unknown";

  return {
    environment: resolvedEnvironment,
    sector: sector?.id ?? null,
    projectState,
    concerns,
    matchedRoute: sector ? `/${sector.environment}/${sector.id}` : null,
    confidence: sector ? 0.6 : 0.2,
    needsClarification: !sector,
    clarificationPrompt: sector ? null : "Tell us a bit more about the space so we can route this correctly.",
  };
}
