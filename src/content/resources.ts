import type { Resource } from "./types";

export const resourceCategories = [
  "Concrete Fundamentals",
  "Resinous Systems",
  "System Comparisons",
  "Technical Guides",
  "Why It Failed",
  "Design Inspiration",
  "Maintenance & Care",
  "Project Spotlights",
  "Industry Insights",
] as const;

export const resources: Resource[] = [
  {
    id: "concrete-fundamentals-101",
    slug: "concrete-fundamentals-101",
    category: "Concrete Fundamentals",
    title: "What 'Polished Concrete' Actually Means",
    summary: "Polished concrete is a multi-step diamond grinding and honing process, not a single product.",
    body: [
      "Polished concrete gets treated like one product, but it's really a sequence of steps: grinding, honing, and polishing with progressively finer diamond abrasives.",
      "The result depends on the slab you start with. Aggregate exposure, sheen level, and how much repair the slab needs are all decided before polishing begins, not after.",
      "When an existing slab can't deliver the look a space wants, a polishable overlay or cementitious topping can get there instead — a different system for a different starting point.",
    ],
    environments: ["residential", "commercial", "industrial"],
  },
  {
    id: "why-it-failed-coatings-peel",
    slug: "why-it-failed-coatings-peel",
    category: "Why It Failed",
    title: "Why Coatings Peel Near Washdown Areas",
    summary: "Peeling coatings near washdown zones are almost always a substrate or moisture problem, not a product problem.",
    body: [
      "When a coating peels near a washdown or dish-pit area, the instinct is to blame the product. Most of the time the real cause is what was happening underneath the coating: moisture, contamination, or inadequate surface preparation before it went down.",
      "That's why a floor rescue starts with diagnosis — moisture evaluation, bond testing, and a look at the substrate condition — before deciding what goes back down.",
      "Putting another coating over the same unresolved problem just delays the same failure.",
    ],
    environments: ["commercial", "industrial"],
  },
  {
    id: "slab-starts-here",
    slug: "the-floor-starts-with-the-slab",
    category: "Technical Guides",
    title: "The Floor Starts With the Slab",
    summary: "Finish-floor problems are usually slab problems that showed up late.",
    body: [
      "Most flooring problems that appear months after a project wraps trace back to a decision made before the slab was even poured — flatness, joint layout, curing, or moisture control.",
      "Builders and GCs who bring flooring into the conversation before the pour avoid the majority of downstream floor failures.",
      "That's the reasoning behind 'the floor starts with the slab': it's a sequencing principle, not a slogan.",
    ],
    environments: ["residential", "commercial", "industrial"],
  },
  {
    id: "resinous-systems-overview",
    slug: "resinous-systems-overview",
    category: "Resinous Systems",
    title: "Epoxy, Polyaspartic, and Urethane Cement — What's the Difference?",
    summary: "The resinous family covers several chemistries built for different exposure and schedule requirements.",
    body: [
      "Epoxy coatings are a solid, cost-effective baseline for moderate traffic and exposure.",
      "Polyaspartics cure fast, which matters most when a space can't stay closed long.",
      "Urethane cement is built for the toughest combination: washdown, thermal shock, and heavy traffic — the systems most often specified in food service and industrial production.",
      "Choosing between them starts with the exposure the floor will actually face, not a general preference for one chemistry over another.",
    ],
    environments: ["commercial", "industrial"],
  },
  {
    id: "system-comparison-concrete-vs-resinous",
    slug: "concrete-vs-resinous-systems",
    category: "System Comparisons",
    title: "Concrete Finishes vs. Resinous Systems",
    summary: "The two families solve different problems and are often combined in the same building.",
    body: [
      "Concrete finishes — polished, stained, or overlaid — work with the slab itself as the finished surface.",
      "Resinous systems add a engineered layer on top, built for specific exposure: chemicals, washdown, or heavy traffic.",
      "It's common for one building to use both: polished concrete in a lobby, urethane cement in the kitchen behind it.",
    ],
    environments: ["commercial", "industrial"],
  },
  {
    id: "design-inspiration-metallic-entries",
    slug: "metallic-epoxy-entries",
    category: "Design Inspiration",
    title: "Why Metallic Epoxy Shows Up at Entries and Showrooms",
    summary: "Metallic epoxy's dimensional look makes it a common choice for first-impression spaces.",
    body: [
      "Metallic epoxy produces a three-dimensional, marbled look that reads differently in person than in a photo — which is exactly why it's used at entries, showrooms, and reception areas that need to make an impression.",
      "It's a design choice as much as a technical one; the underlying prep and application still follow the same standards as any resinous system.",
    ],
    environments: ["residential", "commercial"],
  },
  {
    id: "maintenance-polished-concrete",
    slug: "maintaining-a-polished-concrete-floor",
    category: "Maintenance & Care",
    title: "Keeping a Polished Concrete Floor Looking Right",
    summary: "Polished concrete is low-maintenance, not no-maintenance.",
    body: [
      "Routine dust mopping and the right neutral-pH cleaner do most of the work.",
      "Densifier and sealer reapplication schedules depend on traffic level, not a fixed calendar.",
      "Avoiding acidic cleaners and abrasive equipment protects the surface's long-term sheen.",
    ],
    environments: ["residential", "commercial"],
  },
  {
    id: "industry-insights-flooring-not-a-commodity",
    slug: "flooring-is-not-a-commodity-decision",
    category: "Industry Insights",
    title: "Why the Same Coating Doesn't Belong in Every Building",
    summary: "Flooring gets sold as one-size-fits-all more often than it should be.",
    body: [
      "A system that performs well in a retail showroom can fail fast in a commercial kitchen, and vice versa — traffic, chemical exposure, and moisture conditions are different in every building.",
      "The trade gets treated as simple more often than it should be, which is how the wrong system ends up in the wrong space.",
    ],
    environments: ["residential", "commercial", "industrial"],
  },
  {
    id: "epoxy-vs-polyaspartic",
    slug: "epoxy-vs-polyaspartic-which-is-right",
    category: "System Comparisons",
    title: "Epoxy vs. Polyaspartic: Which Is Right for Your Floor?",
    summary: "Two different chemistries, often used together rather than as competitors.",
    body: [
      "Epoxy provides build thickness and strong adhesion to the slab — it's the workhorse base layer for most resinous systems.",
      "Polyaspartic cures fast, resists UV yellowing, and applies across a much wider temperature range than epoxy. Most high-performance floors use it as a topcoat over an epoxy base, combining the strengths of both.",
      "For UV-exposed spaces, exterior-adjacent areas, or tight schedules, an all-polyaspartic system is often the better call. For maximum build at a lower cost, the hybrid epoxy-base-plus-polyaspartic-topcoat architecture usually wins.",
    ],
    environments: ["residential", "commercial", "industrial"],
  },
  {
    id: "polished-concrete-vs-epoxy",
    slug: "polished-concrete-vs-epoxy-comparison",
    category: "System Comparisons",
    title: "Polished Concrete vs. Epoxy: The Complete Comparison",
    summary: "Two of the most common floors we install — and two very different ways of finishing a slab.",
    body: [
      "Polished concrete works with the existing slab as the finished surface — grinding and honing it to a satin or mirror sheen. There's no coating to wear through, chip, or recoat.",
      "Epoxy and resinous coatings add an engineered layer on top, built for a specific exposure: chemicals, washdown, heavy traffic, or a decorative look concrete alone can't achieve.",
      "The right choice depends on the slab's condition, the exposure the floor will face, and the look the space needs — not a default preference for one over the other.",
    ],
    environments: ["residential", "commercial", "industrial"],
  },
  {
    id: "urethane-cement-no-one-talks-about",
    slug: "urethane-cement-industrial-floor-system",
    category: "Resinous Systems",
    title: "Urethane Cement: The Industrial Floor System No One Talks About",
    summary: "If your space deals with thermal shock, heavy chemicals, and constant washdown, this is the system to understand.",
    body: [
      "Urethane cement is a cementitious resinous system built specifically for the combination most other coatings can't handle at once: hot water and steam washdown, thermal cycling, and heavy daily traffic.",
      "It shows up most often in commercial kitchens, breweries, food and beverage processing, and cold storage — anywhere a facility washes down aggressively and needs the floor to survive it for years, not months.",
      "It's a more specialized (and typically more expensive) system than standard epoxy, which is exactly why it doesn't get talked about as often — but it's the right spec for the environments that actually need it.",
    ],
    environments: ["commercial", "industrial"],
  },
  {
    id: "moisture-testing-step-skipped",
    slug: "moisture-testing-the-step-most-contractors-skip",
    category: "Technical Guides",
    title: "Moisture Testing: The Step Most Contractors Skip",
    summary: "Skipping moisture testing is how a brand-new floor fails in year one.",
    body: [
      "Concrete slabs hold moisture, and that moisture moves upward over time — especially on ground-floor and below-grade slabs. If a coating or overlay goes down before that vapor drive is measured and addressed, the new floor can fail from underneath regardless of how well it was installed.",
      "Proper moisture testing takes time — often 72 hours for an accurate reading — which is exactly why it's the step that gets skipped under schedule pressure.",
      "Floor Rescue tests before recommending a system, not after a floor has already started failing.",
    ],
    environments: ["residential", "commercial", "industrial"],
  },
  {
    id: "csda-finish-levels-explained",
    slug: "understanding-polished-concrete-finish-levels-csda-standards",
    category: "Concrete Fundamentals",
    title: "Understanding Polished Concrete Finish Levels: CSDA Standards Explained",
    summary: "Polished concrete runs from flat matte to mirror gloss — the CSDA's four finish levels give everyone the same vocabulary for the result.",
    body: [
      "Polished concrete gets sold as one finish, but the Concrete Sawing and Drilling Association defines four standardized levels so contractors, architects, and owners can specify what the final floor should actually look like.",
      "Level 1 (Flat/Matte) is non-reflective — the step used for prep and utility spaces where looks are secondary to function. Level 2 (Ground/Matte) shows a low sheen at steep angles, with aggregate and paste starting to read. Level 3 (Honed/Satin) is the most common residential and hospitality spec — a distinct sheen with soft overhead reflections. Level 4 (Highly Polished) is a mirror finish with maximum depth and clarity, most often specified for luxury residential, high-end retail, and showroom floors.",
      "Finish level is specified independently from aggregate exposure — how much stone in the slab gets revealed by the grind, from a cream finish showing only the paste through a full-aggregate exposure. A complete spec states both: the finish level plus the aggregate class, along with any color or dye and the densifier/sealer system going on top.",
    ],
    environments: ["residential", "commercial", "industrial"],
  },
  {
    id: "why-metallic-epoxy-floors-fail",
    slug: "metallic-epoxy-what-it-is-how-its-installed-why-floors-fail",
    category: "Why It Failed",
    title: "Metallic Epoxy: What It Is, How It's Installed, and Why Most Floors Fail",
    summary: "Metallic epoxy is one of the most dramatic floor systems available — and one of the most unforgiving to install.",
    body: [
      "Metallic epoxy floors fail for a small, predictable set of reasons, and almost none of them are about the pigment or the swirl pattern.",
      "The most common cause is moisture. Concrete slabs — especially on-grade and below-grade — constantly emit water vapor. When that vapor gets trapped under an epoxy system that wasn't tested and, where needed, protected with a moisture barrier, it causes blistering, lifting, and eventual bond failure regardless of how good the floor looked on install day.",
      "The rest of the failure modes trace back to installation sequence: inadequate grinding or surface prep, skipping crack and divot repair before the base coat goes down, and a topcoat that wasn't matched to the space's actual UV exposure or traffic. Prep and moisture testing are what separate a metallic floor that lasts decades from one that starts delaminating within a couple of years.",
    ],
    environments: ["residential", "commercial"],
  },
  {
    id: "specify-resinous-flooring-commercial",
    slug: "how-to-specify-resinous-flooring-for-commercial-projects",
    category: "Technical Guides",
    title: "How to Specify Resinous Flooring for Commercial Projects",
    summary: "A practical starting point for architects, interior designers, and project managers specifying resinous systems — system selection, submittals, mockups, and trade coordination.",
    body: [
      "Specifying a resinous floor system starts with the exposure the space will actually face — chemicals, washdown, foot or vehicle traffic, and how long the space can stay closed — not a general preference for one chemistry.",
      "From there, the spec needs to name the system architecture (an epoxy base with a polyaspartic topcoat, an all-polyaspartic system, or a cementitious urethane build), the film build, and the sheen level, rather than leaving those choices to the installer.",
      "Samples, technical data sheets, and an on-site mockup under the space's actual lighting are the standard way to confirm color, sheen, and manipulation technique before full production — particularly for metallic and decorative systems, where no two installations are identical.",
      "Coordination with the general contractor and other trades matters as much as the material spec: substrate moisture testing, the surface preparation level, and the install schedule all need to be locked in before the resinous scope starts.",
    ],
    environments: ["commercial", "industrial"],
  },
  {
    id: "polished-concrete-modern-loft-living",
    slug: "polished-concrete-modern-loft-living",
    category: "Design Inspiration",
    title: "Why Polished Concrete Defines Modern Loft Living",
    summary: "Historic warehouse conversions and new-build lofts both lean on the same finish — and for the same practical reasons.",
    body: [
      "Loft spaces — whether a historic warehouse conversion or new construction — tend to land on the same flooring answer: polished concrete, sometimes paired with a metallic epoxy accent.",
      "Part of it is aesthetic. A ground and polished slab reads as industrial-sophisticated under exposed brick and open ceilings, and it doesn't compete with the architecture the way an added material would.",
      "Part of it is practical. Polished and sealed concrete is easier to maintain than hardwood in a high-traffic urban unit, it's light-reflective enough to amplify natural light in an open floor plan, and it holds up to daily loft living without a recoat schedule.",
      "Newer-construction lofts sometimes push further with decorative overlays or a statement metallic epoxy entry, while historic conversions more often stay with a refined polished or stained finish that respects the building's age.",
    ],
    environments: ["residential"],
  },
  {
    id: "five-levels-surface-prep",
    slug: "five-levels-of-concrete-surface-preparation",
    category: "Concrete Fundamentals",
    title: "The Five Levels of Concrete Surface Preparation — and Why Every Level Matters",
    summary: "Surface preparation is the step that determines whether everything after it actually holds.",
    body: [
      "Every coating, overlay, or polish job depends on how the substrate was prepared before it — grinding, shot blasting, or chemical profiling to open the surface enough for real adhesion or the right sheen.",
      "Skip or under-do this step and it doesn't matter how good the material on top is; it will delaminate, peel, or wear unevenly.",
      "The right preparation level depends on the existing slab's condition and what's going on top of it — not a one-size-fits-all pass with a single tool.",
    ],
    environments: ["residential", "commercial", "industrial"],
  },
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesByIds(ids: string[]): Resource[] {
  return ids.map((id) => resources.find((r) => r.id === id)).filter((r): r is Resource => Boolean(r));
}
