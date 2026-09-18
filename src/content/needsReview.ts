import type { NeedsReviewItem } from "./types";

/**
 * Open content/business conflicts flagged by the build package. None of these
 * render publicly — they exist so the final build report can hand Jeremy a
 * concrete punch list instead of silently guessing.
 */
export const needsReview: NeedsReviewItem[] = [
  {
    id: "garage-service-status",
    topic: "Garage / workshop service line",
    detail:
      "Jeremy stated he no longer performs garage floor work. Legacy garage content exists in older/Base44 sources. Kept as a non-nav, legacy sector (garage-workshop) — needs Jeremy's explicit re-approval before it's ever surfaced as a current service.",
    status: "needs-review",
  },
  {
    id: "spec-sheet-counts",
    topic: "Spec-sheet counts / IDs",
    detail: "Technical spec-sheet counts and IDs are inconsistent across drafts. No specific counts/IDs were published on the site.",
    status: "needs-review",
  },
  {
    id: "polyaspartic-technical-claims",
    topic: "Polyaspartic cure/performance claims",
    detail:
      "Cure times, recoat windows, and performance figures vary by manufacturer and jobsite conditions. Marked claimsStatus: 'needs-review' on the polyaspartic floor system; no specific numbers were published.",
    status: "needs-review",
  },
  {
    id: "esd-compliance-claims",
    topic: "ESD/static-control compliance figures",
    detail: "Exact resistance/compliance figures need confirmation against current manufacturer data sheets before publishing as a hard claim.",
    status: "needs-review",
  },
  {
    id: "compliance-wording",
    topic: "USDA/FDA/OSHA/NSF wording",
    detail: "No compliance/certification claims were published anywhere on the site. Any such wording needs Jeremy's sign-off and a cited source before it's added.",
    status: "needs-review",
  },
  {
    id: "certification-bonding-statements",
    topic: "Self-perform / certification / bonding statements",
    detail: "No specific certification, bonding, or self-perform claims were published. Needs Jeremy's exact current wording.",
    status: "needs-review",
  },
  {
    id: "contact-phone-conflict",
    topic: "Contact phone number",
    detail:
      "Current site displays 972-293-4343; other source materials reference different numbers. No phone number is hard-coded in the site chrome — confirm the current number before adding one.",
    status: "needs-review",
  },
  {
    id: "duplicate-trade-lists",
    topic: "Duplicate builder/architect content",
    detail: "Base44 sources contained duplicate builder/architect lists and education articles. Consolidated into single audiences.ts / resources.ts entries here; verify nothing important was dropped.",
    status: "needs-review",
  },
  {
    id: "testimonial-authenticity",
    topic: "Testimonials",
    detail: "No testimonials were published — authenticity/wording was flagged as unconfirmed. testimonials.ts is intentionally empty pending real, attributable quotes from Jeremy.",
    status: "needs-review",
  },
  {
    id: "project-stats-verification",
    topic: "Project statistics / valuations",
    detail:
      "Named real projects (e.g. the 80,000 SF warehouse/showroom) are included with verified: false and no square-footage or dollar figures published, pending Jeremy's confirmation and real project photos.",
    status: "needs-review",
  },
];
