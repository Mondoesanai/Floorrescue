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
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesByIds(ids: string[]): Resource[] {
  return ids.map((id) => resources.find((r) => r.id === id)).filter((r): r is Resource => Boolean(r));
}
