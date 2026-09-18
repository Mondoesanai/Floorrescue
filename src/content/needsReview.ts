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
      "Current site displays 972-293-4343 / vip@floorrescue.com; other source materials reference different numbers, including (214) 222-3977 / info@floorrescue.com in the Base44 homepage source. A third pair — 972-294-9808 / jeremy@floorrescue.com — appears elsewhere on the current live site (per the client-supplied current-site content inventory) as what reads like Jeremy's direct line/inbox rather than the main office number. No phone number or alternate email is hard-coded in the site chrome — confirm which number(s)/inbox(es) are current and correct, and whether the direct line should be surfaced anywhere, before adding any of them.",
    status: "needs-review",
  },
  {
    id: "commercial-credentials-strip-claims",
    topic: "Commercial page 'Standards & Credentials' claims",
    detail:
      "Base44 commercial source included a credentials strip claiming USDA/FDA compliance, 'Matrix Certified Applicators,' AIA/CEU-accredited Lunch & Learn presentations, and 'Licensed, Insured & Bonded.' None of these were published — they need Jeremy's exact current wording and, where applicable, documentation before going on the site.",
    status: "needs-review",
  },
  {
    id: "sq-ft-installed-claim",
    topic: "'1,000,000+ sq ft installed' homepage stat",
    detail:
      "Base44 homepage source lists '1,000,000+ Sq Ft Installed' as a stat, with the source material itself flagging it as verification-required. Not published anywhere on the site pending Jeremy's confirmation of a current, accurate figure.",
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
    detail:
      "Resolved: 16 verbatim testimonials were supplied directly by the project's client contact (copied from Floor Rescue's own live site) and added to testimonials.ts with verified: true. Two quotes (Carolyn Anderson / 'Canton Lofts', Allen Kagan / 'Kagan Dwellings') reference specific past projects — the Testimonial type has no linking field, so no cross-reference was added; Kagan Dwellings does match an existing entry in projects.ts (kagan-dwellings-polished-concrete) if a future linking field is added. One quote (artemis21) says 'Texas Rescue' instead of 'Floor Rescue' verbatim in the source — kept as-is rather than corrected, flagging here in case Jeremy wants it corrected or removed.",
    status: "needs-review",
  },
  {
    id: "faq-moisture-testing-standards",
    topic: "FAQ moisture-testing figures (ASTM F1869/F2170, 3 lbs/1,000 SF/24 hrs)",
    detail:
      "faqs.ts now states moisture-testing standards (ASTM F1869 calcium chloride test, 72-hour read, for slabs 6+ months old; ASTM F2170 relative-humidity probe for newer slabs; a 3 lbs/1,000 SF/24 hrs MVT threshold above which a barrier/moisture-tolerant primer is required) as public copy across the general, polished-concrete, metallic-epoxy, polyaspartic, and urethane-cement FAQ entries. These figures were already present internally (floorSystems.ts's polyaspartic technicalNotes cites the same ASTM F1869/3 lbs threshold, and resources.ts's moisture-testing-step-skipped article cites the 72-hour figure) and were cross-checked against the client's raw Base44 source corpus for exact wording, but this is the first time they're surfaced as public-facing copy rather than an internal note. Reconfirm with Jeremy that these are still the current standards/thresholds his crews test to before treating this FAQ copy as permanent.",
    status: "needs-review",
  },
  {
    id: "project-stats-verification",
    topic: "Project statistics / valuations",
    detail:
      "Named real projects (e.g. the 80,000 SF warehouse/showroom) are included with verified: false and no square-footage or dollar figures published, pending Jeremy's confirmation and real project photos. This includes three new client entries added from the current live site's 'SOME OF OUR CLIENTS' section (commercial-floors page client-logo captions): Amazon (three floors of polished concrete overlays for call centers, Dallas Galleria), KIA dealerships (automotive epoxy resin floors for service bays), and Luminant Power Plants (construction across multiple locations — locker rooms, conference rooms, offices). The source captions give scope but not dates, square footage, or — for Luminant specifically — which floor system was used, so luminant-power-plants in projects.ts is published with an empty systems array rather than a guessed one. TD Industries' existing project entry was broadened (not duplicated) with the fuller scope the same client-logo caption gives: offices, warehouse, will call, mail room, striping, and exterior entryway alongside the previously listed warehouse work.",
    status: "needs-review",
  },
  {
    id: "service-area-scope",
    topic: "Service area — city/state list breadth",
    detail:
      "Source materials disagree on how broad Floor Rescue's service area is. The Base44 source corpus consistently lists only five Texas cities in its site footer (Dallas, Fort Worth, Houston, Austin, San Antonio) across every page sampled. The current live site (per the client-supplied current-site content inventory, and confirmed directly against floorrescue.com) states a broader area: Dallas, Fort Worth, Houston, Austin, Waco, San Antonio, Odessa, Midland, Louisiana, and Oklahoma. No dedicated service-area/city-list content exists yet anywhere in this content graph (environments.ts holds only environment-type copy, not a city list) — nothing broader has been published pending Jeremy's confirmation of which list is current. Publishing a 10-location, multi-state (TX + LA + OK) claim is a bigger claim than the 5-city version already implied elsewhere in this graph (e.g. audiences.ts's general-contractors copy, project locations mostly clustered in DFW with one Louisiana project) and should get his explicit sign-off before it's added as site copy.",
    status: "needs-review",
  },
];
