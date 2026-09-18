import { Resend } from "resend";
import type { EmailAdapter, SendResult } from "./adapter";
import { LEAD_NOTIFICATION_EMAIL, buildLeadBody, buildLeadSubject } from "./adapter";
import type { QuoteLead } from "@/lib/quote/types";

export class ResendEmailAdapter implements EmailAdapter {
  private client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(lead: QuoteLead): Promise<SendResult> {
    try {
      const { error } = await this.client.emails.send({
        from: process.env.LEAD_FROM_EMAIL || "Floor Rescue Site <onboarding@resend.dev>",
        to: LEAD_NOTIFICATION_EMAIL,
        replyTo: lead.email,
        subject: buildLeadSubject(lead),
        text: buildLeadBody(lead),
        attachments: lead.attachments.map((a) => ({
          filename: a.filename,
          content: a.base64,
        })),
      });
      if (error) return { ok: false, devFallback: false, error: error.message };
      return { ok: true, devFallback: false };
    } catch (err) {
      return { ok: false, devFallback: false, error: err instanceof Error ? err.message : "Unknown email error" };
    }
  }
}
