import type { QuoteLead } from "@/lib/quote/types";

export interface SendResult {
  ok: boolean;
  devFallback: boolean;
  error?: string;
}

export interface EmailAdapter {
  send(lead: QuoteLead): Promise<SendResult>;
}

export const LEAD_NOTIFICATION_EMAIL = "vip@floorrescue.com";

export function buildLeadSubject(lead: QuoteLead): string {
  const sector = lead.sectorLabel ?? "General";
  const environment = lead.environment ? lead.environment[0].toUpperCase() + lead.environment.slice(1) : "Unknown";
  return `New Floor Rescue Project — ${environment} / ${sector}`;
}

export function buildLeadBody(lead: QuoteLead): string {
  return [
    "NEW FLOOR RESCUE PROJECT",
    "",
    `Name: ${lead.name}`,
    `Company: ${lead.company ?? "—"}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Location: ${lead.location ?? "—"}`,
    "",
    `Environment: ${lead.environment ?? "—"}`,
    `Sector / Space: ${lead.sectorLabel ?? "—"}`,
    `Project State: ${lead.projectState ?? "—"}`,
    `Needs / Concerns: ${lead.concerns.length ? lead.concerns.join(", ") : "—"}`,
    `Approx. SF: ${lead.squareFootage || "—"}`,
    `Timeline / Downtime: ${lead.timeline || "—"}`,
    `Original Free-Text Description: ${lead.otherDescription || "—"}`,
    `Landing Route: ${lead.landingRoute ?? "—"}`,
    "",
    `Uploads: ${lead.attachments.length ? lead.attachments.map((a) => a.filename).join(", ") : "none"}`,
    `Notes: ${lead.notes || "—"}`,
  ].join("\n");
}
