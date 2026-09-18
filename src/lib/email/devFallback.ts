import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { EmailAdapter, SendResult } from "./adapter";
import { buildLeadBody, buildLeadSubject } from "./adapter";
import type { QuoteLead } from "@/lib/quote/types";

/**
 * Used whenever RESEND_API_KEY is not configured. We never pretend a real
 * email went out — we log the full structured lead and save it to a
 * gitignored .leads/ folder so nothing submitted during development is lost,
 * per implementation/lead-flow.md's "safe development fallback" requirement.
 */
export class DevFallbackEmailAdapter implements EmailAdapter {
  async send(lead: QuoteLead): Promise<SendResult> {
    const subject = buildLeadSubject(lead);
    const body = buildLeadBody(lead);

    // eslint-disable-next-line no-console
    console.log(`\n[email:dev-fallback] RESEND_API_KEY not set — no email was sent.\nSubject: ${subject}\n${body}\n`);

    try {
      const dir = path.join(process.cwd(), ".leads");
      await mkdir(dir, { recursive: true });
      const filename = `${Date.now()}-${lead.email.replace(/[^a-z0-9]/gi, "_")}.json`;
      await writeFile(
        path.join(dir, filename),
        JSON.stringify({ subject, lead, attachmentCount: lead.attachments.length }, null, 2),
        "utf8",
      );
    } catch (err) {
      console.error("[email:dev-fallback] failed to persist lead to disk", err);
    }

    return { ok: true, devFallback: true };
  }
}
