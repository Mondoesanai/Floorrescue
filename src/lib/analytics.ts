// Provider-agnostic event hooks. No analytics provider is wired up yet —
// this intentionally only logs in development so nobody mistakes it for a
// real GA4/Segment integration. Swap the body of trackEvent() for a real
// provider call once one is configured; call sites never need to change.
export type AnalyticsEvent =
  | "journey_started"
  | "environment_selected"
  | "sector_selected"
  | "project_state_selected"
  | "other_text_submitted"
  | "personalized_page_viewed"
  | "quote_started"
  | "quote_submitted"
  | "browse_mode_opened"
  | "system_page_viewed";

export function trackEvent(name: AnalyticsEvent, payload?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug(`[analytics:unwired] ${name}`, payload ?? {});
  }
}
