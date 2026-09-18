import { z } from "zod";

export const classifierResultSchema = z.object({
  environment: z.enum(["residential", "commercial", "industrial", "unknown"]),
  sector: z.string().nullable(),
  projectState: z.enum(["new-construction", "renovation", "failed-floor", "unknown"]),
  concerns: z.array(z.string()),
  matchedRoute: z.string().nullable(),
  confidence: z.number().min(0).max(1),
  needsClarification: z.boolean(),
  clarificationPrompt: z.string().nullable(),
});

export type ClassifierResult = z.infer<typeof classifierResultSchema>;
