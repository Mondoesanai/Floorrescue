import type { EmailAdapter } from "./adapter";
import { ResendEmailAdapter } from "./resendAdapter";
import { DevFallbackEmailAdapter } from "./devFallback";

export function getEmailAdapter(): EmailAdapter {
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) return new ResendEmailAdapter(apiKey);
  return new DevFallbackEmailAdapter();
}

export * from "./adapter";
