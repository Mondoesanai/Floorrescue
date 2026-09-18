import Anthropic from "@anthropic-ai/sdk";
import { sectors } from "@/content/sectors";
import type { Environment } from "@/content/types";
import { classifyDeterministically } from "./deterministicRouter";
import { classifierResultSchema, type ClassifierResult } from "./schema";

const TOOL_NAME = "classify_floor_request";

function buildTool() {
  const sectorIds = sectors.filter((s) => !s.legacy).map((s) => `${s.id} (${s.environment}: ${s.name})`);
  return {
    name: TOOL_NAME,
    description:
      "Classify a prospect's free-text description of their flooring project into Floor Rescue's approved taxonomy. Never diagnose a floor problem or invent a system recommendation — only tag and route.",
    input_schema: {
      type: "object" as const,
      properties: {
        environment: { type: "string", enum: ["residential", "commercial", "industrial", "unknown"] },
        sector: {
          type: ["string", "null"],
          description: `One exact sector id from this approved list, or null if none fit: ${sectorIds.join(", ")}`,
        },
        projectState: { type: "string", enum: ["new-construction", "renovation", "failed-floor", "unknown"] },
        concerns: { type: "array", items: { type: "string" } },
        matchedRoute: { type: ["string", "null"] },
        confidence: { type: "number" },
        needsClarification: { type: "boolean" },
        clarificationPrompt: { type: ["string", "null"] },
      },
      required: [
        "environment",
        "sector",
        "projectState",
        "concerns",
        "matchedRoute",
        "confidence",
        "needsClarification",
        "clarificationPrompt",
      ],
    },
  };
}

/**
 * Classify free text into the Floor Rescue content graph. The deterministic
 * keyword router always runs first and is returned whenever the AI call is
 * unavailable, fails, or returns something that doesn't validate — the site
 * never depends on a model call succeeding (implementation/ai-routing.md).
 */
export async function classifyFreeText(text: string, environment?: Environment): Promise<ClassifierResult> {
  const fallback = classifyDeterministically(text, environment);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return fallback;

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      tools: [buildTool()],
      tool_choice: { type: "tool", name: TOOL_NAME },
      messages: [
        {
          role: "user",
          content: `Prospect environment hint: ${environment ?? "unknown"}.\nFree-text description: "${text}"`,
        },
      ],
    });

    const toolUse = response.content.find((block) => block.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") return fallback;

    const parsed = classifierResultSchema.safeParse(toolUse.input);
    if (!parsed.success) return fallback;

    // Trust the AI's tagging, but never let it override the deterministic
    // route if it named a sector id that isn't real.
    const knownSectorIds = new Set(sectors.map((s) => s.id));
    if (parsed.data.sector && !knownSectorIds.has(parsed.data.sector)) {
      return { ...parsed.data, sector: fallback.sector, matchedRoute: fallback.matchedRoute };
    }

    return parsed.data;
  } catch {
    return fallback;
  }
}
