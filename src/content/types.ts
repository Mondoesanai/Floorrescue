export type Environment = "residential" | "commercial" | "industrial";

export type ProjectState =
  | "new-construction"
  | "renovation"
  | "failed-floor"
  | "other";

export type SystemFamily = "concrete" | "resinous" | "service";

export interface HeroCopyVariant {
  projectState: ProjectState;
  eyebrow: string;
  headline: string;
  support: string;
}

export interface Sector {
  id: string;
  environment: Environment;
  name: string;
  shortLabel: string;
  description: string;
  aliases: string[];
  projectStates: ProjectState[];
  commonConcerns: string[]; // Problem ids
  relevantSystemIds: string[];
  relevantProjectIds: string[];
  relevantResourceIds: string[];
  heroCopyVariants: HeroCopyVariant[];
  /** Legacy service line Jeremy no longer performs; kept out of primary nav/routing. */
  legacy?: boolean;
}

export interface FloorSystem {
  id: string;
  name: string;
  family: SystemFamily;
  environments: Environment[];
  applications: string[];
  summaryByAudience: Partial<Record<Environment | "trade", string>>;
  technicalNotes?: string[];
  claimsStatus: "approved" | "needs-review";
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  environment: Environment;
  sectors: string[];
  systems: string[];
  problems: string[];
  location?: string;
  squareFeet?: number;
  media: string[];
  verified: boolean;
  summary: string;
}

export interface ProfessionalAudience {
  id: string;
  name: string;
  positioningLine: string;
  focus: string[];
  description: string;
  relevantResourceIds: string[];
}

export interface Problem {
  id: string;
  label: string;
  shortDescription: string;
  environments: Environment[];
  relevantSystemIds: string[];
}

export interface Resource {
  id: string;
  slug: string;
  category: string;
  title: string;
  summary: string;
  body: string[];
  environments: Environment[];
}

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  environment: Environment;
  verified: boolean;
}

export interface CTA {
  id: string;
  label: string;
  href: string;
}

/** How an FAQ entry is scoped for display: sitewide, one floor system, or one environment (e.g. the commercial index). */
export type FAQScope =
  | { kind: "general" }
  | { kind: "system"; systemId: string }
  | { kind: "environment"; environment: Environment };

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  scope: FAQScope;
}

export interface NeedsReviewItem {
  id: string;
  topic: string;
  detail: string;
  status: "needs-review";
}

export type JourneyStage =
  | "intro"
  | "garage-idle"
  | "commercial-build"
  | "commercial-sector"
  | "commercial-door-entry"
  | "commercial-project-state"
  | "commercial-deep-dive"
  | "commercial-landing"
  | "quote";

export interface JourneyState {
  stage: JourneyStage;
  introSeen: boolean;
  environment: Environment | null;
  sectorId: string | null;
  otherSectorText: string | null;
  projectState: ProjectState | null;
  otherProjectText: string | null;
  concerns: string[];
  squareFootage: string;
  timeline: string;
  history: JourneyStage[];
}
