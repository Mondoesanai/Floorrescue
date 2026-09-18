import { z } from "zod";

export const quoteFieldsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("A valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().optional(),
  environment: z.enum(["residential", "commercial", "industrial"]).nullable().optional(),
  sectorId: z.string().optional(),
  sectorLabel: z.string().optional(),
  projectState: z.enum(["new-construction", "renovation", "failed-floor", "other"]).nullable().optional(),
  concerns: z.array(z.string()).optional(),
  squareFootage: z.string().optional(),
  timeline: z.string().optional(),
  otherDescription: z.string().optional(),
  landingRoute: z.string().optional(),
  notes: z.string().optional(),
});

export const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;
export const MAX_TOTAL_ATTACHMENT_BYTES = 15 * 1024 * 1024;
