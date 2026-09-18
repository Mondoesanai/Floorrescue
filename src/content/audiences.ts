import type { ProfessionalAudience } from "./types";

export const audiences: ProfessionalAudience[] = [
  {
    id: "architects-designers",
    name: "Architects & Designers",
    positioningLine: "System selection you can specify with confidence.",
    description:
      "Technical documents, physical samples, and pre-pour consultation so a floor system can be specified — not guessed at.",
    focus: [
      "Technical documents and specifications",
      "Physical samples and on-site mockups",
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
      "Pre-pour planning and slab requirements that prevent the downstream floor problems that show up months after closing.",
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
      "Coordination, substrate reporting, and schedule reliability for GCs who need one less variable on the job.",
    focus: [
      "Schedule coordination",
      "Substrate condition reporting",
      "Qualification documentation",
      "Fast-turn options where needed",
      "Reliable installation execution",
    ],
    relevantResourceIds: [],
  },
];

export function getAudience(id: string): ProfessionalAudience | undefined {
  return audiences.find((a) => a.id === id);
}
