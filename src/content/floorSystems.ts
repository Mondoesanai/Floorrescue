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
      "Existing polished floors that have dulled, dusted, or developed efflorescence can typically be restored — re-grinding, re-densifying, and re-polishing — rather than replaced outright, provided the original finish level and aggregate exposure are known or can be matched.",
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
      commercial: "Distinct, on-brand color and character without the maintenance schedule of a coating — a high-end look from the slab that's already in place. For commercial projects, sealer selection (acrylic vs. urethane topcoat) is weighed against traffic load, moisture vapor transmission — critical for ground-floor applications — and ADA/slip-resistance requirements where they apply, with work phased around tenant occupancy or construction milestones.",
      trade:
        "Four staining approaches: acid staining (the original, earthy variegated tones), reactive dyes (broadest color range), water-based stains (most predictable/consistent), and grind-stain-seal (Floor Rescue's own signature combination). Concrete porosity governs how any of these read on a given slab — acid stains and reactive dyes chemically react with the concrete itself, water-based stains and integral colorants largely penetrate rather than film-form, and pigmented sealers sit on the surface instead of becoming part of it. The final sealer/topcoat has to match the use environment; the wrong one lets color and finish wear prematurely regardless of how well the stain itself was applied.",
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
      commercial: "A way to reset a tired or damaged slab's appearance without a full tear-out. Cracks, tack-strip holes, old trenches or cutouts, staining, ghost lines from removed walls or fixtures, and generally inconsistent appearance are the usual reasons an overlay makes more sense than trying to polish or stain the existing slab as-is.",
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
    applications: ["failed-floor", "joint-repair", "floor-removal", "demolition"],
    summaryByAudience: {
      residential: "Repairing cracks, spalling, and damage in the slab itself before any finish goes back down.",
      commercial: "Structural and cosmetic repair of the slab before a new system is applied — doesn't have to mean a costly full replacement.",
      industrial: "Joint repair, spall repair, and substrate restoration ahead of a new industrial system.",
      trade:
        "Crack classification, structural repair methods, and surface preparation profiling from CSP 1 through CSP 10 depending on what the next system needs. Concrete preparation is its own body of work underneath every restoration: diamond grinding or shot blasting to strip existing sealers, coatings, and contamination and open the pore structure; scarifying where a coating or mastic residue is too thick or too bonded for grinding alone; and full demolition and reconstruction where the slab itself — not just the surface — has failed (spalled, corroded, or structurally compromised, as with a deteriorated trough or containment structure). The substrate determines the outcome, not the finish coat — there are no shortcuts on this step regardless of what goes down after it.",
    },
    claimsStatus: "approved",
  },
  {
    id: "seal-systems",
    name: "Seal Systems",
    family: "concrete",
    environments: ["residential", "commercial", "industrial"],
    applications: ["maintenance", "exterior", "restoration", "pool-deck", "driveway"],
    summaryByAudience: {
      residential:
        "Penetrating or film-forming sealers that protect stained, stamped, or exposed-aggregate concrete long-term — the finishing step that keeps a decorative floor or patio looking like the day it was installed. Pool deck sealers are their own spec: slip-resistant and heat-reflective so the deck stays cool underfoot and holds up to chlorine and salt water; driveway sealers focus on resisting oil staining and UV fading over years of direct sun.",
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
      commercial: "A signature entry or showroom finish that photographs and presents like nothing off the shelf. Commercial metallic work lives or dies on the topcoat and the maintenance program behind it — the right high-performance topcoat matched to the space's actual traffic, plus an ongoing maintenance plan, is what protects the investment; skip either one and a decorative metallic floor can show visible, costly wear well before the base system would otherwise fail.",
      trade:
        "100% solids epoxy with metallic pigments manipulated on-site — swirling patterns in copper, gold, pearl, charcoal, or custom colors. Three system options: standard metallic epoxy, polyaspartic metallic (UV-stable), and white metallics/pearls. Topcoat sheen changes the read: high gloss maximizes depth and reflection but shows footprints; satin softens glare while keeping dimension; matte reads as a velvety, understated finish that's more forgiving of foot traffic and scratches. Beyond sheen, topcoat chemistry is its own decision: polyaspartic (fast-cure, UV-stable, the default for most installations), polyurethane (stronger chemical resistance and flexibility where temperatures swing), or a ceramic/glass hardcoat where maximum scratch and abrasion resistance matters most. Custom logo, mural, and inlay artwork can be sealed permanently under the topcoat, and glow-in-the-dark/UV-reactive pigment is available for spaces that want a blacklight effect. Moisture barrier testing is non-negotiable underneath — it's the single most common cause of metallic epoxy delamination when skipped.",
    },
    technicalNotes: [
      "From prior spec sheets: ≥300 PSI adhesion, ≤40mg abrasion loss, 15–25+ year service life when properly maintained — reconfirm current figures before publishing.",
      "Architects/designers: a minimum on-site mockup is standard practice before full production, since no two metallic installations are exactly alike — approve color and manipulation technique from a physical sample and mockup under the space's actual lighting, not a digital image.",
    ],
    claimsStatus: "needs-review",
  },
  {
    id: "epoxy-coatings",
    name: "Epoxy Coatings / Solid Color",
    family: "resinous",
    environments: ["residential", "commercial", "industrial"],
    applications: ["general-purpose", "commercial-kitchen", "distribution", "parking-structure"],
    summaryByAudience: {
      commercial: "A clean, durable solid-color coating for spaces with moderate traffic and exposure — offices, retail back-of-house, self-storage, parking structures, and commercial kitchens all draw on the same base chemistry, specified to the exposure each space actually sees.",
      industrial: "A baseline chemical- and abrasion-resistant coating for general production and storage areas. Chemical-resistant novolac epoxy available for pH 1–14 exposure. Common across pharmaceutical, food and beverage, manufacturing, and laboratory settings.",
      trade:
        "The decorative or protective coat is only one layer of the system — long-term performance depends on the topcoat and how the floor is actually used and maintained, not just what went down on install day. Most epoxy failures trace back to the substrate, not the resin: slab moisture and vapor drive (measured by calcium chloride or relative-humidity testing, pH, and — on grade or below-grade slabs — hydrostatic pressure) are the leading cause of blistering and delamination, which is why moisture testing happens before every epoxy installation, not after a floor has already started failing.",
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
    applications: ["slip-resistance", "appearance", "office-corridor", "retail-back-of-house", "showroom"],
    summaryByAudience: {
      residential: "A textured, slip-resistant broadcast finish for patios and other exterior surfaces that take weather and bare feet.",
      commercial: "A broadcast flake finish that adds texture, slip resistance, and a more finished look — office corridors and retail back-of-house get the same durability and low maintenance as bare concrete without the industrial look, while large-format flake in a custom color blend with a logo inlay works as a showroom or auto-dealership floor that's built to take real traffic.",
      trade:
        "Vinyl chip or quartz aggregate broadcast into an epoxy base coat, sealed with a polyaspartic topcoat. Single broadcast is the common light-duty spec; double broadcast adds denser coverage and a thicker build for high-traffic commercial spaces; large-format flake (1\"+ chip) gives a bold, high-contrast look for showroom-grade spaces. Custom logo and design inlays are broadcast in during installation, not applied after.",
    },
    technicalNotes: [
      "Typical performance range from prior spec sheets: ≥300 PSI adhesion (ASTM D4541), ≤40mg abrasion loss (ASTM D4060), ≥0.6 wet DCOF with quartz aggregate broadcast (ANSI A326.3), 12–24 hr return to light foot traffic / 48–72 hr full vehicle traffic — reconfirm current figures before publishing.",
    ],
    claimsStatus: "needs-review",
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
      trade:
        "Spans three related but distinct system types — urethane mortar/slurry for heavy-build repair, urethane cement for washdown and thermal-shock environments, and urethane topcoats as the protective final layer over another base system. Performance considerations are thermal cycling, chemical resistance, moisture, abrasion, and equipment traffic. Specified across food and beverage, pharmaceutical, manufacturing, hospitality, transportation, education, and retail — anywhere a floor needs more chemical and thermal resilience than a standard epoxy topcoat provides.",
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

  // ---- Decorative artistry family ----
  // The current live site treats "Decorative Concrete Artistry" as a third
  // peer category alongside Concrete Floor Systems and Resinous Floor
  // Coatings (custom floor designs/artwork, custom scored concrete designs,
  // custom metallic epoxy floors, floor logos, showroom floors, and sport
  // courts) rather than folding it into either family. These two entries
  // mirror that split rather than duplicating polished-concrete, stained-
  // concrete, decorative-concrete, or metallic-epoxy, which already carry
  // the underlying installation chemistry — these are the design/branding/
  // recreation-surface layer applied on top of those systems.
  {
    id: "decorative-artistry",
    name: "Decorative Concrete Artistry",
    family: "decorative",
    environments: ["residential", "commercial"],
    applications: ["custom-design", "logos", "showroom", "medallions", "scoring"],
    summaryByAudience: {
      residential: "Custom scoring, medallions, borders, and inlay work for homeowners who want a floor that's a designed piece, not just a finished surface.",
      commercial: "Custom scored patterns, logo inlays, and showroom-grade decorative work for brands and businesses where the floor itself is part of the presentation — sales floors, private clubs, and public showrooms among them.",
      trade:
        "Custom scored concrete design (saw-cut medallions, borders, and faux-tile or faux-plank patterns), floor logos and branding (stencil, dye, epoxy inlay, or etched concrete/resin), and showroom-grade decorative finishes. This is design and layout work applied through the base systems already in this list — polished concrete, stained concrete, decorative concrete, and metallic epoxy — rather than a separate installation chemistry of its own; specifying it means specifying the pattern, the logo artwork, and which base system carries it.",
    },
    claimsStatus: "approved",
  },
  {
    id: "sport-courts",
    name: "Sport Court Coatings",
    family: "decorative",
    environments: ["residential", "commercial"],
    applications: ["pickleball", "basketball", "volleyball", "tennis", "recreation"],
    summaryByAudience: {
      residential: "A dedicated pickleball, basketball, or multi-sport surface built on your existing concrete slab — a rubberized or resinous coating system engineered for traction and ball response, not a painted driveway.",
      commercial: "Rubberized and resinous court systems with line striping for pickleball, basketball, volleyball, and tennis layouts — for clubs, HOAs, and recreation facilities that need a surface built to take organized play, not just foot traffic.",
      trade:
        "Rubberized acrylic and resinous coating systems applied over a properly prepared and profiled concrete slab, with court striping/line marking laid out for the specific sport (pickleball, basketball, volleyball, tennis). Surface texture and cushioning are tuned for traction and ball response rather than for the wear-layer priorities of a standard resinous floor, which makes this its own spec conversation even though the slab prep underneath follows the same principles as any other coating.",
    },
    claimsStatus: "approved",
  },
];

export function getFloorSystem(id: string): FloorSystem | undefined {
  return floorSystems.find((s) => s.id === id);
}

export function getFloorSystems(ids: string[]): FloorSystem[] {
  return ids.map(getFloorSystem).filter((s): s is FloorSystem => Boolean(s));
}
