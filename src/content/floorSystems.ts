import type { FloorSystem } from "./types";

export const floorSystems: FloorSystem[] = [
  // ---- Concrete / cementitious family ----
  {
    id: "polished-concrete",
    name: "Polished Concrete",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["retail", "office", "warehouse", "loft", "showroom"],
    summaryByAudience: {
      residential: "A ground and polished slab that stays low-maintenance and handles real daily life underfoot.",
      commercial: "A durable, design-forward floor that holds up to steady foot traffic without constant upkeep.",
      industrial: "A hard-wearing, easy-to-clean floor for facilities that don't want a coating to maintain.",
      trade: "Multi-step diamond grinding/honing/polishing system; aggregate exposure and sheen level are chosen up front based on the existing slab's condition.",
    },
    claimsStatus: "approved",
  },
  {
    id: "stained-concrete",
    name: "Stained Concrete",
    family: "concrete",
    environments: ["residential", "commercial"],
    applications: ["retail", "loft", "restaurant", "patio"],
    summaryByAudience: {
      residential: "Rich, variegated color that becomes part of the slab instead of sitting on top of it.",
      commercial: "Distinct, on-brand color and character without the maintenance schedule of a coating.",
    },
    claimsStatus: "approved",
  },
  {
    id: "decorative-concrete",
    name: "Decorative Concrete",
    family: "concrete",
    environments: ["residential", "commercial"],
    applications: ["patio", "retail", "showroom"],
    summaryByAudience: {
      residential: "Custom scoring, color, and texture work that turns plain concrete into a designed surface.",
      commercial: "Custom finishes for spaces where the floor is part of the brand experience.",
    },
    claimsStatus: "approved",
  },
  {
    id: "concrete-overlays",
    name: "Concrete Overlays",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["restoration", "renovation"],
    summaryByAudience: {
      residential: "A fresh, monolithic surface installed over an existing slab that's structurally sound but worn or dated.",
      commercial: "A way to reset a tired or damaged slab's appearance without a full tear-out.",
    },
    claimsStatus: "approved",
  },
  {
    id: "micro-cement",
    name: "Micro Cement",
    family: "concrete",
    environments: ["residential", "commercial"],
    applications: ["loft", "office", "specification-room", "spa"],
    summaryByAudience: {
      residential: "An ultra-thin, seamless cementitious finish with a soft, matte-satin hand.",
      commercial: "A refined, seamless topping for spaces that want a material feel rather than a coated look.",
      trade: "Applied in thin trowel passes over prepared substrates; suited to both floors and vertical transitions.",
    },
    claimsStatus: "approved",
  },
  {
    id: "polishable-overlays",
    name: "Polishable Overlays / Cement Toppings",
    family: "concrete",
    environments: ["residential", "commercial"],
    applications: ["restoration"],
    summaryByAudience: {
      commercial: "Used when the existing slab can't deliver the desired polished look on its own.",
    },
    claimsStatus: "approved",
  },
  {
    id: "concrete-restoration",
    name: "Concrete Restoration",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["failed-floor", "joint-repair"],
    summaryByAudience: {
      residential: "Repairing cracks, spalling, and damage in the slab itself before any finish goes back down.",
      commercial: "Structural and cosmetic repair of the slab before a new system is applied.",
      industrial: "Joint repair, spall repair, and substrate restoration ahead of a new industrial system.",
    },
    claimsStatus: "approved",
  },
  {
    id: "seal-systems",
    name: "Seal Systems",
    family: "concrete",
    environments: ["residential", "commercial"],
    applications: ["maintenance", "exterior"],
    summaryByAudience: {
      residential: "Penetrating or film-forming sealers that protect stained or decorative concrete long-term.",
    },
    claimsStatus: "approved",
  },
  {
    id: "floor-preparation",
    name: "Floor Preparation",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["prep"],
    summaryByAudience: {
      trade: "Media blasting, diamond grinding, chipping, and contamination treatment — the step every finish's performance actually depends on.",
    },
    claimsStatus: "approved",
  },
  {
    id: "moisture-mitigation",
    name: "Moisture Mitigation",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["prep", "restoration"],
    summaryByAudience: {
      commercial: "Addressing slab moisture and vapor drive before it's allowed to take down a new floor system.",
      industrial: "Vapor mitigation sized to the facility's slab conditions and the system going down on top of it.",
    },
    claimsStatus: "approved",
  },
  {
    id: "new-construction-slab-coordination",
    name: "New Construction Slab Coordination",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["new-construction"],
    summaryByAudience: {
      trade: "Pre-pour input on slab flatness, joint layout, curing, and finish expectations so the finish floor isn't fighting the slab later.",
    },
    claimsStatus: "approved",
  },

  // ---- Resinous / coatings family ----
  {
    id: "metallic-epoxy",
    name: "Metallic Epoxy",
    family: "resinous",
    environments: ["residential", "commercial"],
    applications: ["showroom", "retail", "entry"],
    summaryByAudience: {
      residential: "A dimensional, three-dimensional finish that reads as a statement floor rather than a coated one.",
      commercial: "A signature entry or showroom finish that photographs and presents like nothing off the shelf.",
    },
    claimsStatus: "approved",
  },
  {
    id: "epoxy-coatings",
    name: "Epoxy Coatings / Solid Color",
    family: "resinous",
    environments: ["residential", "commercial", "industrial"],
    applications: ["general-purpose"],
    summaryByAudience: {
      commercial: "A clean, durable solid-color coating for spaces with moderate traffic and exposure.",
      industrial: "A baseline chemical- and abrasion-resistant coating for general production and storage areas.",
    },
    claimsStatus: "approved",
  },
  {
    id: "flake-broadcast",
    name: "Flake & Broadcast",
    family: "resinous",
    environments: ["commercial", "industrial"],
    applications: ["slip-resistance", "appearance"],
    summaryByAudience: {
      commercial: "A broadcast flake finish that adds texture, slip resistance, and a more finished look.",
    },
    claimsStatus: "approved",
  },
  {
    id: "quartz-broadcast",
    name: "Quartz Broadcast",
    family: "resinous",
    environments: ["commercial", "industrial"],
    applications: ["sanitation", "slip-resistance"],
    summaryByAudience: {
      commercial: "A durable, slip-resistant broadcast system common in kitchens and heavy-wash areas.",
      industrial: "A textured, chemical-resistant broadcast system for demanding production floors.",
    },
    claimsStatus: "approved",
  },
  {
    id: "polyaspartic",
    name: "Polyaspartic",
    family: "resinous",
    environments: ["residential", "commercial", "industrial"],
    applications: ["fast-cure", "downtime"],
    summaryByAudience: {
      commercial: "A fast-curing system built for spaces that can't stay closed long.",
      industrial: "Rapid-cure chemistry for facilities working inside a tight shutdown window.",
    },
    technicalNotes: [
      "Cure times, recoat windows, and exact performance figures vary by manufacturer and jobsite conditions — confirm exact numbers before publishing them as fixed claims.",
    ],
    claimsStatus: "needs-review",
  },
  {
    id: "urethane-topcoats",
    name: "Urethane / Polyurethane Topcoats",
    family: "resinous",
    environments: ["commercial", "industrial"],
    applications: ["chemical-resistance", "uv-stability"],
    summaryByAudience: {
      commercial: "A tough, UV-stable topcoat layer that protects the system underneath.",
    },
    claimsStatus: "approved",
  },
  {
    id: "urethane-cement",
    name: "Urethane Cement",
    family: "resinous",
    environments: ["commercial", "industrial"],
    applications: ["washdown", "thermal-shock", "sanitation"],
    summaryByAudience: {
      commercial: "A rugged, seamless system built for washdown, thermal cycling, and heavy daily use.",
      industrial: "The system most often specified for washdown, thermal shock, and heavy-traffic production floors.",
    },
    claimsStatus: "approved",
  },
  {
    id: "esd-static-systems",
    name: "ESD / Static-Control Systems",
    family: "resinous",
    environments: ["industrial"],
    applications: ["electronics", "static-sensitive"],
    summaryByAudience: {
      industrial: "Static-dissipative flooring for environments where static discharge is a real production or safety risk.",
    },
    technicalNotes: [
      "Exact resistance/compliance figures must be confirmed against the manufacturer's current data sheet before being published as a hard claim.",
    ],
    claimsStatus: "needs-review",
  },
];

export function getFloorSystem(id: string): FloorSystem | undefined {
  return floorSystems.find((s) => s.id === id);
}

export function getFloorSystems(ids: string[]): FloorSystem[] {
  return ids.map(getFloorSystem).filter((s): s is FloorSystem => Boolean(s));
}
