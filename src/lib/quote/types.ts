import type { Environment, ProjectState } from "@/content/types";

export interface QuoteAttachment {
  filename: string;
  contentType: string;
  base64: string;
}

export interface QuoteLead {
  name: string;
  company?: string;
  email: string;
  phone: string;
  location?: string;
  environment: Environment | null;
  sectorId?: string | null;
  sectorLabel?: string | null;
  projectState?: ProjectState | null;
  concerns: string[];
  squareFootage?: string;
  timeline?: string;
  otherDescription?: string | null;
  landingRoute?: string;
  notes?: string;
  attachments: QuoteAttachment[];
}
