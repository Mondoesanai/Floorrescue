import type { Environment } from "./types";

export const environmentCopy: Record<
  Environment,
  { label: string; navLabel: string; questionPrompt: string; description: string }
> = {
  residential: {
    label: "Residential",
    navLabel: "My Home",
    questionPrompt: "Where is the floor?",
    description: "Concrete and resinous flooring for interior floors, exteriors, and new-construction homes.",
  },
  commercial: {
    label: "Commercial",
    navLabel: "My Business",
    questionPrompt: "What kind of space are we working with?",
    description: "Concrete and resinous flooring systems for retail, restaurants, offices, hospitality, healthcare, and more.",
  },
  industrial: {
    label: "Industrial",
    navLabel: "My Facility",
    questionPrompt: "What kind of facility?",
    description: "Concrete and resinous flooring built for manufacturing, food & beverage, warehousing, and other industrial demands.",
  },
};
