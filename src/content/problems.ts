import type { Problem } from "./types";

export const problems: Problem[] = [
  {
    id: "washdown",
    label: "Washdown / Wet Cleaning",
    shortDescription:
      "Daily washdown or high-pressure cleaning that most coatings and sealed floors were never built to take.",
    environments: ["commercial", "industrial"],
    relevantSystemIds: ["urethane-cement", "polyaspartic", "epoxy-coatings"],
  },
  {
    id: "moisture",
    label: "Moisture / Vapor",
    shortDescription:
      "Slab moisture or vapor drive that causes coatings and toppings to fail from underneath if it isn't addressed first.",
    environments: ["residential", "commercial", "industrial"],
    relevantSystemIds: ["moisture-mitigation", "concrete-restoration"],
  },
  {
    id: "downtime",
    label: "Limited Shutdown Window",
    shortDescription:
      "A space that can't stay closed long, so the system and schedule have to work around real operating hours.",
    environments: ["commercial", "industrial"],
    relevantSystemIds: ["polyaspartic", "urethane-cement"],
  },
  {
    id: "chemical-exposure",
    label: "Chemical Exposure",
    shortDescription:
      "Cleaners, oils, solvents, or process chemicals that will attack the wrong coating chemistry over time.",
    environments: ["commercial", "industrial"],
    relevantSystemIds: ["epoxy-coatings", "urethane-cement", "esd-static-systems"],
  },
  {
    id: "slip-resistance",
    label: "Slip Resistance",
    shortDescription:
      "Traffic, grease, or wash water that makes slip resistance a real safety requirement, not a finish preference.",
    environments: ["commercial", "industrial"],
    relevantSystemIds: ["flake-broadcast", "quartz-broadcast"],
  },
  {
    id: "appearance-design",
    label: "Appearance / Design Requirements",
    shortDescription:
      "A brand, design standard, or architectural spec the finished floor has to match.",
    environments: ["residential", "commercial"],
    relevantSystemIds: ["polished-concrete", "stained-concrete", "metallic-epoxy", "micro-cement"],
  },
  {
    id: "heavy-traffic",
    label: "Heavy Traffic / Equipment",
    shortDescription:
      "Forklifts, pallet jacks, carts, or steady foot traffic that will find every weak point in the wrong system.",
    environments: ["commercial", "industrial"],
    relevantSystemIds: ["urethane-cement", "polished-concrete"],
  },
  {
    id: "sanitation",
    label: "Sanitation Requirements",
    shortDescription:
      "Seamless, cleanable surfaces required around food, health, or production environments.",
    environments: ["commercial", "industrial"],
    relevantSystemIds: ["urethane-cement", "epoxy-coatings"],
  },
  {
    id: "maintenance",
    label: "Maintenance Burden",
    shortDescription:
      "A current floor that costs too much staff time and materials to keep looking and performing right.",
    environments: ["residential", "commercial", "industrial"],
    relevantSystemIds: ["seal-systems", "polished-concrete"],
  },
  {
    id: "fast-return-to-service",
    label: "Fast Return to Service",
    shortDescription:
      "A facility that needs the floor back in service on an accelerated cure schedule.",
    environments: ["commercial", "industrial"],
    relevantSystemIds: ["polyaspartic", "urethane-cement"],
  },
  {
    id: "thermal-shock",
    label: "Thermal Shock",
    shortDescription:
      "Hot-water washdown, steam, freezers, or temperature swings that crack rigid coatings over time.",
    environments: ["industrial"],
    relevantSystemIds: ["urethane-cement"],
  },
  {
    id: "existing-floor-failure",
    label: "Existing Floor Failure",
    shortDescription:
      "Peeling, delaminating, cracking, or otherwise failed flooring that needs a real diagnosis before anything goes back down.",
    environments: ["residential", "commercial", "industrial"],
    relevantSystemIds: ["concrete-restoration", "floor-preparation"],
  },
];

export function getProblem(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}
