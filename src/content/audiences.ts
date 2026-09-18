import type { ProfessionalAudience } from "./types";

export const audiences: ProfessionalAudience[] = [
  {
    id: "architects-designers",
    name: "Architects & Designers",
    positioningLine: "System selection you can specify with confidence.",
    description:
      "We work from your spec or help you develop one. Samples, technical data sheets, and on-site mockups are available. We coordinate directly with your project team from specification through installation.",
    focus: [
      "Technical documents and specifications",
      "Physical samples, color/finish charts, and on-site mockups",
      "In-office Lunch & Learn presentations on system selection and specification",
      "Pre-pour and slab consultation",
      "Lighting and finish considerations",
      "System selection guidance",
      "Project proof and direct contact with the install team",
    ],
    relevantResourceIds: ["slab-starts-here"],
  },
  {
    id: "builders-developers",
    name: "Builders & Developers",
    positioningLine: "The Floor Starts With the Slab.",
    description:
      "Pre-pour planning and slab requirements that prevent the downstream floor problems that show up months after closing. You want floors that look incredible and hold up — we bring the same systems used in high-end commercial builds, without shortcuts.",
    focus: [
      "Pre-pour coordination",
      "Slab flatness and joint layout",
      "Model and spec-home programs",
      "Finish expectations set early",
      "Avoiding avoidable downstream failures",
    ],
    relevantResourceIds: ["slab-starts-here"],
  },
  {
    id: "general-contractors",
    name: "General Contractors",
    positioningLine: "One Trade. No Surprises.",
    description:
      "As a subcontractor, we understand that your schedule, your budget, and your reputation are on the line. We show up on time, we hit our numbers, and we don't create problems for your schedule. That's been our standard for 20+ years.",
    focus: [
      "Fully insured and bonded — COI provided on request",
      "Fast-cure system options for tight project timelines",
      "Coordination with other trades from day one",
      "Dedicated project superintendent on every job",
      "Substrate assessment before bid — no surprises mid-project",
    ],
    relevantResourceIds: [],
  },
  {
    id: "developers-owners",
    name: "Developers & Owners",
    positioningLine: "System selection, investment guidance, long-term performance.",
    description:
      "For developers and owners weighing flooring as a capital decision, not just a finish — the right system choice affects maintenance cost, tenant experience, and asset value for decades, not just the punch-list walkthrough.",
    focus: ["System selection guidance", "Investment and lifecycle guidance", "Long-term performance planning", "Multi-property / multi-phase coordination"],
    relevantResourceIds: [],
  },
];

export function getAudience(id: string): ProfessionalAudience | undefined {
  return audiences.find((a) => a.id === id);
}
