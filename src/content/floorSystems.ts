import type { FloorSystem } from "./types";

// Descriptions below draw on Floor Rescue's own prior site content (via the
// client-supplied Base44 source dump) — real language and real performance
// figures from the client's own materials, not invented. Anything with
// claimsStatus: "needs-review" carries a specific figure that should be
// reconfirmed with Jeremy before being published as current/binding (see
// content/needsReview.ts) — the copy itself is his own prior language.
export const floorSystems: FloorSystem[] = [
  // ---- Concrete / cementitious family ----
  {
    id: "polished-concrete",
    name: "Polished Concrete",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["retail", "office", "warehouse", "loft", "showroom"],
    summaryByAudience: {
      residential:
        "The concrete itself becomes the floor — ground, densified, and polished to a satin or mirror finish that stays low-maintenance and handles real daily life underfoot. There's no coating layer to peel or chip.",
      commercial: "A durable, design-forward floor that holds up to steady foot traffic without constant upkeep.",
      industrial: "A hard-wearing, easy-to-clean floor for facilities that don't want a coating to maintain.",
      trade:
        "Grind and densify existing slabs to satin or mirror finishes with integrated color options. CSDA finish levels 1–4, aggregate exposure classes A–D (cream finish through full aggregate), LEED-compliant materials.",
    },
    technicalNotes: [
      "CSDA Finish Level 1 (Flat/Matte) through Level 4 (Highly Polished); Aggregate Exposure Class A (Cream Finish, paste only) through Class D (Full Aggregate, heavy grind) — Class B (Salt & Pepper, fine aggregate) and Class C (Medium Aggregate, terrazzo-like) fall in between. Choice is based on the existing slab's condition and desired look.",
      "Process sequence: slab assessment (hardness, moisture, existing coatings, aggregate mix) → surface preparation → coarse grinding to expose the specified aggregate class → progressive grinding through finer tooling → densification (a silica-based densifier reacts chemically with the slab to fill pores and increase surface hardness) → polishing to the specified finish level → guard/sealer where appropriate.",
      "Typical performance range from prior projects: 6–8 Mohs hardness, ≤40mg abrasion loss, ≥0.6 wet DCOF slip resistance, 20+ year service life — reconfirm current figures before publishing.",
    ],
    claimsStatus: "needs-review",
  },
  {
    id: "stained-concrete",
    name: "Stained Concrete",
    family: "concrete",
    environments: ["residential", "commercial"],
    applications: ["retail", "loft", "restaurant", "patio"],
    summaryByAudience: {
      residential: "Rich, variegated color that becomes part of the slab instead of sitting on top of it — permanent, never peels, never fades.",
      commercial: "Distinct, on-brand color and character without the maintenance schedule of a coating — a high-end look from the slab that's already in place.",
      trade:
        "Four staining approaches: acid staining (the original, earthy variegated tones), reactive dyes (broadest color range), water-based stains (most predictable/consistent), and grind-stain-seal (Floor Rescue's own signature combination).",
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
    name: "Concrete Overlays & Micro-Toppings",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["restoration", "renovation"],
    summaryByAudience: {
      residential: "A fresh, monolithic surface installed over an existing slab that's structurally sound but worn or dated — no demolition required.",
      commercial: "A way to reset a tired or damaged slab's appearance without a full tear-out.",
      trade:
        "Five overlay architectures depending on what the substrate needs: micro-topping (1–3mm), self-leveling underlayment (¼″–½″), skim coat & texture overlay (3–6mm), stampable decorative overlay, and poured concrete topping slab (1″–2″).",
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
      residential: "An ultra-thin (2–3mm), seamless cementitious finish with a soft, matte-satin hand — works on floors, walls, countertops, and wet areas.",
      commercial: "A refined, seamless topping for spaces that want a material feel rather than a coated look.",
      trade: "Applied in thin, multi-layer trowel passes over prepared substrates; bathroom and kitchen rated; minimal height change from the existing surface.",
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
    name: "Concrete Restoration & Repair",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["failed-floor", "joint-repair"],
    summaryByAudience: {
      residential: "Repairing cracks, spalling, and damage in the slab itself before any finish goes back down.",
      commercial: "Structural and cosmetic repair of the slab before a new system is applied — doesn't have to mean a costly full replacement.",
      industrial: "Joint repair, spall repair, and substrate restoration ahead of a new industrial system.",
      trade: "Crack classification, structural repair methods, and surface preparation profiling from CSP 1 through CSP 10 depending on what the next system needs.",
    },
    claimsStatus: "approved",
  },
  {
    id: "seal-systems",
    name: "Seal Systems",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["maintenance", "exterior", "restoration"],
    summaryByAudience: {
      residential:
        "Penetrating or film-forming sealers that protect stained, stamped, or exposed-aggregate concrete long-term — the finishing step that keeps a decorative floor or patio looking like the day it was installed.",
      commercial: "A maintenance-cycle sealer program keeps polished, stained, or coated floors performing between full refinishes, protecting the investment in the original system.",
      trade:
        "Penetrating (silane/siloxane, densifying) sealers soak into the slab and don't change the surface look or add sheen; film-forming (acrylic, urethane, epoxy) sealers sit on top and add gloss and a sacrificial wear layer. Choice depends on the substrate, the traffic it takes, and whether the client wants a sheen change. Reapplication interval depends on traffic and exposure, not a fixed calendar date. Over stained or decorative concrete, the seal system is its own build: a water-based epoxy primer with an aliphatic urethane topcoat for clarity without heavy build (residential interiors, light commercial); a solvent-based acrylic penetrating sealer with a ceramic-enhanced topcoat for added hardness (high-traffic commercial, exterior); an epoxy sealer with a polyaspartic topcoat for fast return to service and maximum chemical resistance (commercial, industrial, fast-track schedules); or a penetrating densifier alone on a honed/trowel finish for a dust-proof, low-sheen look with no film topcoat at all.",
    },
    technicalNotes: [
      "Sealer selection is substrate- and traffic-dependent — reconfirm with Jeremy before quoting a specific product line or reapplication schedule.",
    ],
    claimsStatus: "approved",
  },
  {
    id: "floor-preparation",
    name: "Floor Preparation & Densification",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["prep"],
    summaryByAudience: {
      trade:
        "Media blasting, diamond grinding, chipping, and contamination treatment — the step every finish's performance actually depends on. Densification and hardening improve dust control and load-bearing capacity on existing concrete without a coating, extending slab life.",
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
      industrial: "Vapor mitigation sized to the facility's slab conditions and the system going down on top of it — critical for below-grade or high-humidity environments.",
      trade: "MVT/MVER testing and assessment first; epoxy vapor barrier or cementitious moisture-control system depending on what the readings call for.",
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
      trade:
        "Pre-pour input on slab flatness, joint layout, curing, and finish expectations so the finish floor isn't fighting the slab later. Common preventable failures: calcium chloride in the mix, curing compound not removed, high fly ash content, an over-worked or hard-troweled finish, and a vapor retarder placed with a sand layer above it instead of direct contact. A straight Portland cement mix, a wet cure (burlap and poly sheeting) over chemical curing compounds, a medium trowel finish, and protecting the slab from construction contamination between pour and finish installation all materially affect the result.",
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
      residential: "A dimensional, three-dimensional finish that reads as a statement floor rather than a coated one — every installation is unique.",
      commercial: "A signature entry or showroom finish that photographs and presents like nothing off the shelf.",
      trade:
        "100% solids epoxy with metallic pigments manipulated on-site — swirling patterns in copper, gold, pearl, charcoal, or custom colors. Three system options: standard metallic epoxy, polyaspartic metallic (UV-stable), and white metallics/pearls. Topcoat sheen changes the read: high gloss maximizes depth and reflection but shows footprints; satin softens glare while keeping dimension; matte reads as a velvety, understated finish that's more forgiving of foot traffic and scratches. Custom logo, mural, and inlay artwork can be sealed permanently under the topcoat, and glow-in-the-dark/UV-reactive pigment is available for spaces that want a blacklight effect. Moisture barrier testing is non-negotiable underneath.",
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
      industrial: "A baseline chemical- and abrasion-resistant coating for general production and storage areas. Chemical-resistant novolac epoxy available for pH 1–14 exposure.",
    },
    claimsStatus: "approved",
  },
  {
    id: "epoxy-mortar",
    name: "Epoxy Mortar",
    family: "resinous",
    environments: ["industrial", "commercial"],
    applications: ["heavy-repair", "food-processing"],
    summaryByAudience: {
      industrial:
        "Thick-build (¼″–⅜″) trowel-applied system for damaged slabs that need resurfacing while still meeting food-processing sanitation standards.",
    },
    claimsStatus: "approved",
  },
  {
    id: "flake-broadcast",
    name: "Flake & Broadcast",
    family: "resinous",
    environments: ["residential", "commercial", "industrial"],
    applications: ["slip-resistance", "appearance"],
    summaryByAudience: {
      residential: "A textured, slip-resistant broadcast finish for patios and other exterior surfaces that take weather and bare feet.",
      commercial: "A broadcast flake finish that adds texture, slip resistance, and a more finished look.",
      trade:
        "Vinyl chip or quartz aggregate broadcast into an epoxy base coat, sealed with a polyaspartic topcoat. Single broadcast is the common light-duty spec; double broadcast adds denser coverage and a thicker build for high-traffic commercial spaces; large-format flake (1\"+ chip) gives a bold, high-contrast look for showroom-grade spaces. Custom logo and design inlays are broadcast in during installation, not applied after.",
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
      commercial: "A fast-curing system built for spaces that can't stay closed long. Zero UV yellowing, harder than epoxy, applies in a much wider temperature range.",
      industrial: "Rapid-cure chemistry for facilities working inside a tight shutdown window.",
      trade:
        "Most systems use polyaspartic as a topcoat over an epoxy base (build + adhesion from the epoxy, UV stability + hardness + fast return-to-service from the polyaspartic). All-polyaspartic systems are specified for UV-exposed or exterior-adjacent spaces and tight timelines.",
    },
    technicalNotes: [
      "From prior spec sheets: return to foot traffic 2–4 hrs, full vehicle traffic ~24 hrs, application temperature range -20°F to 120°F (vs. roughly 50–90°F for epoxy) — reconfirm current figures before publishing as a fixed claim.",
      "Moisture testing (ASTM F1869, 72 hrs) is treated as non-negotiable before application — a moisture-tolerant primer is required above 3 lbs/1,000 SF/24 hrs MVT.",
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
      industrial:
        "The system most often specified for washdown, thermal shock, and heavy-traffic production floors — food & beverage, commercial kitchens, breweries, distilleries, and cold storage.",
      trade: "Cementitious urethane rated for thermal shock across a wide range, with USDA/FDA-compliant options for food processing.",
    },
    technicalNotes: [
      "From prior spec sheets: thermal shock resistance roughly -40°F to 250°F — reconfirm current figures before publishing as a fixed claim.",
    ],
    claimsStatus: "needs-review",
  },
  {
    id: "esd-static-systems",
    name: "ESD / Static-Control Systems",
    family: "resinous",
    environments: ["industrial"],
    applications: ["electronics", "static-sensitive"],
    summaryByAudience: {
      industrial: "Static-dissipative flooring for environments where static discharge is a real production or safety risk — labs, cleanrooms, electronics and battery facilities.",
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
