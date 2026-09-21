/**
 * Plain-language floor finder. Takes whatever a visitor types ("my floor is
 * breaking", "slipery when wet", "want it shiny") and points at the right page.
 * Tolerates misspellings (edit distance + prefix stems) and non-technical
 * wording (every intent carries everyday synonyms). Broad symptoms trigger a
 * follow-up question instead of a guess. Never diagnoses — it only routes.
 */

export interface FinderTarget {
  id: string;
  kind: "Problem" | "System" | "Guide" | "Space";
  title: string;
  blurb: string;
  href: string;
}

export interface FinderQuestion {
  id: string;
  question: string;
  options: { label: string; targetId: string }[];
}

interface Intent {
  /** points at a target … */
  target?: FinderTarget;
  /** … or asks a follow-up question first */
  ask?: FinderQuestion;
  keywords: string[];
  /** Broad "ask" intents are down-weighted so a specific match always beats them. */
  weight?: number;
}

const T: Record<string, FinderTarget> = {
  failure: {
    id: "failure",
    kind: "Problem",
    title: "Coating that's peeling, bubbling or lifting",
    blurb: "Why coatings and sealers let go — and what it takes to fix it properly this time.",
    href: "/problems/existing-floor-failure",
  },
  restoration: {
    id: "restoration",
    kind: "System",
    title: "Concrete restoration",
    blurb: "Cracked, pitted, crumbling or uneven concrete — repaired and brought back instead of torn out.",
    href: "/systems/concrete-restoration",
  },
  moisture: {
    id: "moisture",
    kind: "Problem",
    title: "Moisture coming through the slab",
    blurb: "Vapor and dampness cause floors to fail from underneath. Here's how it's tested and handled.",
    href: "/problems/moisture",
  },
  washdown: {
    id: "washdown",
    kind: "Problem",
    title: "Washdown and wet cleaning",
    blurb: "Floors that get hosed, steamed or scrubbed every day need a system built for it.",
    href: "/problems/washdown",
  },
  downtime: {
    id: "downtime",
    kind: "Problem",
    title: "Tight shutdown window",
    blurb: "Fast-cure systems and scheduling built around when your space actually operates.",
    href: "/problems/downtime",
  },
  chemical: {
    id: "chemical",
    kind: "Problem",
    title: "Chemicals, oils and spills",
    blurb: "Cleaners, solvents and process chemicals attack the wrong coating. Match the chemistry.",
    href: "/problems/chemical-exposure",
  },
  slip: {
    id: "slip",
    kind: "Problem",
    title: "Slippery floors",
    blurb: "Traction is a safety requirement, not a finish preference. Broadcast systems add real grip.",
    href: "/problems/slip-resistance",
  },
  appearance: {
    id: "appearance",
    kind: "Problem",
    title: "Making the floor look the part",
    blurb: "A design standard, a brand, a vibe — floors that match the space they sit in.",
    href: "/problems/appearance-design",
  },
  traffic: {
    id: "traffic",
    kind: "Problem",
    title: "Heavy traffic and equipment",
    blurb: "Forklifts, carts and constant foot traffic find every weak point in the wrong system.",
    href: "/problems/heavy-traffic",
  },
  sanitation: {
    id: "sanitation",
    kind: "Problem",
    title: "Sanitary, cleanable surfaces",
    blurb: "Seamless floors for food, health and production spaces that have to stay clean.",
    href: "/problems/sanitation",
  },
  maintenance: {
    id: "maintenance",
    kind: "Problem",
    title: "A floor that's a pain to maintain",
    blurb: "When upkeep costs more time and money than it should — and what to change.",
    href: "/problems/maintenance",
  },
  fastreturn: {
    id: "fastreturn",
    kind: "Problem",
    title: "Back in service fast",
    blurb: "Accelerated-cure systems for spaces that can't wait days for a floor.",
    href: "/problems/fast-return-to-service",
  },
  thermal: {
    id: "thermal",
    kind: "Problem",
    title: "Thermal shock — hot, cold and steam",
    blurb: "Freezers, hot-water washdown and temperature swings crack rigid coatings.",
    href: "/problems/thermal-shock",
  },
  polished: {
    id: "polished",
    kind: "System",
    title: "Polished concrete",
    blurb: "The shiny, sleek, low-maintenance look — the slab itself, ground and polished.",
    href: "/systems/polished-concrete",
  },
  metallic: {
    id: "metallic",
    kind: "System",
    title: "Metallic epoxy",
    blurb: "Swirling, marble-like, one-of-a-kind floors that stop people in the doorway.",
    href: "/systems/metallic-epoxy",
  },
  epoxy: {
    id: "epoxy",
    kind: "System",
    title: "Epoxy coatings",
    blurb: "Tough, seamless, easy-to-clean coating for garages, shops, kitchens and more.",
    href: "/systems/epoxy-coatings",
  },
  polyaspartic: {
    id: "polyaspartic",
    kind: "System",
    title: "Polyaspartic",
    blurb: "Fast-curing, UV-stable coating — back in use quickly and it won't yellow in sunlight.",
    href: "/systems/polyaspartic",
  },
  stained: {
    id: "stained",
    kind: "System",
    title: "Stained concrete",
    blurb: "Rich, natural color worked into the concrete itself.",
    href: "/systems/stained-concrete",
  },
  micro: {
    id: "micro",
    kind: "System",
    title: "Micro-cement",
    blurb: "A thin, seamless, modern surface for floors, walls and showers.",
    href: "/systems/micro-cement",
  },
  overlay: {
    id: "overlay",
    kind: "System",
    title: "Concrete overlays and decorative concrete",
    blurb: "Resurface tired concrete — patios, pool decks, driveways and interiors — without a tear-out.",
    href: "/systems/concrete-overlays",
  },
  prep: {
    id: "prep",
    kind: "System",
    title: "Floor preparation",
    blurb: "Grinding, profiling and repair — the step that decides whether a floor lasts.",
    href: "/systems/floor-preparation",
  },
  static: {
    id: "static",
    kind: "System",
    title: "ESD / static-control floors",
    blurb: "Static-dissipative systems for electronics, labs and sensitive equipment.",
    href: "/systems/esd-static-systems",
  },
  courts: {
    id: "courts",
    kind: "System",
    title: "Sport courts",
    blurb: "Pickleball, basketball and multi-sport surfaces built for play.",
    href: "/systems/sport-courts",
  },
  compare: {
    id: "compare",
    kind: "Guide",
    title: "Compare every floor system",
    blurb: "Not sure what you want? See them all side by side and narrow it down.",
    href: "/systems",
  },
  epoxyVsAspartic: {
    id: "epoxyVsAspartic",
    kind: "Guide",
    title: "Epoxy vs. polyaspartic — which is right?",
    blurb: "The honest comparison, in plain terms.",
    href: "/resources/epoxy-vs-polyaspartic-which-is-right",
  },
  whyFailed: {
    id: "whyFailed",
    kind: "Guide",
    title: "Why coatings peel",
    blurb: "The most common reasons floors fail, and how to avoid a repeat.",
    href: "/resources/why-it-failed-coatings-peel",
  },
  slab: {
    id: "slab",
    kind: "Guide",
    title: "The floor starts with the slab",
    blurb: "Why the concrete underneath decides everything on top.",
    href: "/resources/the-floor-starts-with-the-slab",
  },
  quote: {
    id: "quote",
    kind: "Space",
    title: "Get a quote",
    blurb: "Tell us about the space — we'll take it from there.",
    href: "/quote",
  },
  home: {
    id: "home",
    kind: "Space",
    title: "Residential — my home",
    blurb: "Interior floors, exteriors and new-construction homes.",
    href: "/residential",
  },
  business: {
    id: "business",
    kind: "Space",
    title: "Commercial — my business",
    blurb: "Retail, restaurants, offices, hospitality, healthcare and more.",
    href: "/commercial",
  },
  facility: {
    id: "facility",
    kind: "Space",
    title: "Industrial — my facility",
    blurb: "Manufacturing, food & beverage, warehousing and other facilities.",
    href: "/industrial",
  },
};

const Q: Record<string, FinderQuestion> = {
  damage: {
    id: "damage",
    question: "What does the damage look like?",
    options: [
      { label: "The coating is peeling, bubbling or lifting", targetId: "failure" },
      { label: "The concrete itself is cracked, crumbling or chipped", targetId: "restoration" },
      { label: "It's damp, or there's white powder or bubbles coming up", targetId: "moisture" },
      { label: "It's just worn out and tired-looking", targetId: "appearance" },
    ],
  },
  look: {
    id: "look",
    question: "What kind of look are you after?",
    options: [
      { label: "Shiny, sleek and modern", targetId: "polished" },
      { label: "A colorful, one-of-a-kind showpiece", targetId: "metallic" },
      { label: "Natural, warm, stained concrete", targetId: "stained" },
      { label: "Tough and easy to clean above all", targetId: "epoxy" },
    ],
  },
  water: {
    id: "water",
    question: "What's going on with water?",
    options: [
      { label: "It's seeping up through the floor", targetId: "moisture" },
      { label: "We hose it down or wash it every day", targetId: "washdown" },
      { label: "It's just hard to keep clean", targetId: "maintenance" },
      { label: "It needs to be food-safe and sanitary", targetId: "sanitation" },
    ],
  },
  space: {
    id: "space",
    question: "Where's the floor?",
    options: [
      { label: "At my home", targetId: "home" },
      { label: "At my business", targetId: "business" },
      { label: "In a plant, warehouse or facility", targetId: "facility" },
      { label: "I'm not sure yet", targetId: "compare" },
    ],
  },
};

const INTENTS: Intent[] = [
  // Broad symptoms → ask first
  {
    ask: Q.damage,
    keywords: ["breaking", "broken", "falling apart", "bad shape", "damaged", "deteriorating", "messed up", "ruined", "destroyed", "wrecked", "coming apart", "trashed", "torn up", "problem", "issue", "wrong"],
  },
  {
    ask: Q.look,
    weight: 0.9,
    keywords: ["ugly", "dated", "outdated", "boring", "upgrade", "redo", "remodel", "renovate", "makeover", "new floor", "new look", "nicer", "prettier", "beautiful", "gorgeous", "impress", "luxury", "fancy", "wow"],
  },
  {
    ask: Q.water,
    weight: 0.6,
    keywords: ["wet", "water", "clean", "dirty", "mess", "puddle", "leak", "leaking"],
  },
  {
    ask: Q.space,
    weight: 0.7,
    keywords: ["help", "not sure", "dont know", "idk", "unsure", "no idea", "what do i need", "where do i start", "start", "advice"],
  },
  // Problems
  { target: T.failure, keywords: ["peeling", "peel", "flaking", "flake off", "delaminating", "delamination", "bubbling", "bubbles", "blister", "blistering", "lifting", "coming up", "coming off", "failing", "failed", "chipping", "coating fail", "sealer fail", "epoxy fail", "hot tire", "tire pickup"] },
  { target: T.restoration, keywords: ["crack", "cracking", "cracks", "crumbling", "crumble", "spalling", "spall", "pitted", "pitting", "rough", "hole", "holes", "uneven", "settling", "sunken", "heaving", "divot", "gouge", "patch", "repair", "fix", "restore", "restoration", "old concrete", "damaged concrete"] },
  { target: T.moisture, keywords: ["moisture", "damp", "dampness", "humid", "humidity", "vapor", "sweating", "sweaty", "efflorescence", "white powder", "white residue", "musty", "mold", "mildew", "water coming up", "seeping", "seep", "wicking", "hydrostatic", "basement"] },
  { target: T.washdown, keywords: ["washdown", "hose", "hosed", "hose down", "pressure wash", "power wash", "steam clean", "sprayed", "wash down", "wet cleaning", "sanitize daily"] },
  { target: T.downtime, keywords: ["downtime", "shutdown", "one day", "overnight", "weekend", "cant close", "cannot close", "stay open", "open for business", "tight schedule", "deadline", "hurry", "asap", "rush", "quick job"] },
  { target: T.chemical, keywords: ["chemical", "chemicals", "acid", "solvent", "bleach", "oil", "oil stain", "grease", "gas", "gasoline", "brake fluid", "spill", "spills", "corrosive", "stains from", "etched", "etching", "cleaner"] },
  { target: T.slip, keywords: ["slippery", "slippy", "slick", "slip", "slipping", "slid", "fall", "fell", "traction", "grip", "skid", "safety", "safe to walk", "lawsuit", "liability", "nonslip", "non slip"] },
  { target: T.appearance, keywords: ["look", "looks", "appearance", "design", "style", "stylish", "modern", "brand", "branded", "logo", "match", "aesthetic", "vibe", "custom", "color", "colour", "pattern", "architect spec", "worn out", "tired", "dull", "faded", "old looking"] },
  { target: T.traffic, keywords: ["forklift", "forklifts", "pallet", "pallets", "heavy", "truck", "trucks", "equipment", "machinery", "machines", "cart", "carts", "traffic", "wear", "wearing", "scratches", "scratched", "abuse", "high traffic", "busy", "durable", "durability", "tough", "last longer", "lasting"] },
  { target: T.sanitation, keywords: ["sanitary", "sanitation", "sanitize", "hygiene", "hygienic", "bacteria", "germs", "food safe", "food grade", "usda", "fda", "health department", "sterile", "commercial kitchen", "cleanroom", "clean room", "seamless", "no seams", "no grout", "grout lines"] },
  { target: T.maintenance, keywords: ["maintenance", "maintain", "upkeep", "hard to clean", "wax", "waxing", "stripping", "mopping", "mop", "dusty", "dust", "stains", "staining", "stained badly", "expensive to keep", "low maintenance", "easy to clean", "easy clean"] },
  { target: T.fastreturn, keywords: ["cure", "curing", "cure time", "dry time", "how long", "walk on", "drive on", "back in service", "back in use", "turnaround", "fast cure", "quick cure"] },
  { target: T.thermal, keywords: ["freezer", "cooler", "cold storage", "walk in", "hot water", "boiling", "steam", "temperature", "thermal", "thermal shock", "hot and cold", "freezing", "commissary"] },
  // Systems
  { target: T.polished, keywords: ["polished", "polish", "shiny", "shine", "glossy", "gloss", "sleek", "mirror", "reflective", "showroom floor", "burnished", "honed", "grind and polish"] },
  { target: T.metallic, keywords: ["metallic", "marble", "marbled", "swirl", "swirls", "lava", "pearl", "shimmer", "glitter", "galaxy", "showroom", "showpiece", "one of a kind", "artistic", "colorful", "epoxy art", "river"] },
  { target: T.epoxy, keywords: ["epoxy", "garage", "garage floor", "shop", "workshop", "coating", "coat", "resin", "resinous", "paint", "painted", "floor paint", "seal the floor"] },
  { target: T.polyaspartic, keywords: ["polyaspartic", "polyurea", "uv", "sunlight", "sun", "yellowing", "yellow", "fast drying", "outdoor coating", "one day floor"] },
  { target: T.stained, keywords: ["stain", "stained", "staining", "acid stain", "dye", "dyed", "tinted", "warm tones", "earthy", "natural look"] },
  { target: T.micro, keywords: ["microcement", "micro cement", "micro topping", "shower floor", "shower", "smooth wall", "wall finish", "tadelakt", "venetian", "paper thin"] },
  { target: T.overlay, keywords: ["overlay", "overlays", "resurface", "resurfacing", "stamped", "stamp", "stamping", "patio", "pool deck", "driveway", "walkway", "sidewalk", "exterior", "outdoor", "outside", "decorative concrete", "cover up", "cover old", "hide cracks", "topping"] },
  { target: T.prep, keywords: ["grind", "grinding", "prep", "prepare", "preparation", "profile", "profiling", "shot blast", "shotblast", "scarify", "remove coating", "strip coating", "remove old"] },
  { target: T.static, keywords: ["static", "esd", "electrostatic", "electronics", "lab", "laboratory", "semiconductor", "data center", "server room", "spark"] },
  { target: T.courts, keywords: ["pickleball", "basketball", "tennis", "court", "courts", "sport", "sports", "gym", "gymnasium", "playground", "athletic"] },
  // Guides and actions
  { target: T.epoxyVsAspartic, keywords: ["epoxy vs", "vs polyaspartic", "difference between", "which is better", "compare epoxy", "epoxy or polyaspartic"] },
  { target: T.whyFailed, keywords: ["why did", "why is it peeling", "why fail", "why failing", "happened to my floor", "keeps peeling", "keeps failing", "redone", "second time", "did it wrong", "bad install", "bad contractor", "previous contractor"] },
  { target: T.slab, keywords: ["slab", "concrete slab", "foundation", "new construction", "new build", "new home", "builder", "just poured", "fresh concrete", "new concrete", "cured concrete"] },
  { target: T.compare, keywords: ["compare", "options", "types", "kinds", "choices", "choose", "what floors", "all floors", "all systems", "everything you offer", "services", "what do you do", "what do you offer"] },
  { target: T.quote, keywords: ["quote", "estimate", "price", "prices", "pricing", "cost", "how much", "budget", "afford", "cheap", "cheaper", "bid", "proposal", "hire", "book", "schedule"] },
  { target: T.home, keywords: ["home", "house", "my home", "residential", "basement floor", "apartment", "condo", "backyard"] },
  { target: T.business, keywords: ["business", "store", "shop floor", "retail", "restaurant", "office", "hotel", "hospital", "clinic", "school", "church", "commercial", "showroom", "salon", "gym floor"] },
  { target: T.facility, keywords: ["warehouse", "factory", "plant", "industrial", "manufacturing", "facility", "distribution", "loading dock", "hangar"] },
];

/* ------------------------------ matching ------------------------------ */

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stem(w: string): string {
  if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith("ed")) return w.slice(0, -2);
  if (w.length > 4 && w.endsWith("es")) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith("s")) return w.slice(0, -1);
  if (w.length > 4 && w.endsWith("ly")) return w.slice(0, -2);
  return w;
}

function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 3;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let last = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
      last = tmp;
    }
  }
  return prev[b.length];
}

/** 0..1 similarity of a typed token to a keyword word. */
function wordScore(token: string, word: string): number {
  if (token === word) return 1;
  const ts = stem(token);
  const ws = stem(word);
  if (ts === ws) return 0.95;
  if (ts.length >= 4 && ws.length >= 4 && (ws.startsWith(ts) || ts.startsWith(ws))) return 0.8;
  const limit = ws.length >= 9 ? 2 : ws.length >= 5 ? 1 : 0;
  if (limit > 0 && editDistance(ts, ws) <= limit) return 0.75;
  return 0;
}

function keywordScore(tokens: string[], keyword: string): number {
  const words = normalize(keyword).split(" ");
  if (words.length === 1) {
    let best = 0;
    for (const t of tokens) best = Math.max(best, wordScore(t, words[0]));
    return best;
  }
  // phrase: every word must match, in order (gaps allowed)
  let from = 0;
  let total = 0;
  for (const w of words) {
    let found = -1;
    let sc = 0;
    for (let i = from; i < tokens.length; i++) {
      const s = wordScore(tokens[i], w);
      if (s > sc) {
        sc = s;
        found = i;
      }
    }
    if (found < 0) return 0;
    total += sc;
    from = found + 1;
  }
  // phrases are more specific than single words — reward them
  return (total / words.length) * (1 + 0.35 * (words.length - 1));
}

export interface FinderResult {
  question?: FinderQuestion;
  targets: FinderTarget[];
}

export function findFloorHelp(input: string): FinderResult | null {
  const q = normalize(input);
  if (q.length < 3) return null;
  const use = q.split(" ");

  const scored = INTENTS.map((intent) => {
    let best = 0;
    let hits = 0;
    for (const kw of intent.keywords) {
      const s = keywordScore(use, kw);
      if (s >= 0.7) {
        hits += 1;
        best = Math.max(best, s);
      }
    }
    // several different synonyms hitting is stronger evidence than one
    const score = best > 0 ? (best + Math.min(0.3, (hits - 1) * 0.12)) * (intent.weight ?? 1) : 0;
    return { intent, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return { targets: [] };

  const top = scored[0];
  const targets: FinderTarget[] = [];
  for (const s of scored) {
    if (s.intent.target && !targets.find((t) => t.id === s.intent.target!.id)) targets.push(s.intent.target);
    if (targets.length >= 3) break;
  }
  if (top.intent.ask) {
    return { question: top.intent.ask, targets };
  }
  return { targets };
}

export function getFinderTarget(id: string): FinderTarget | undefined {
  return T[id];
}

export const FINDER_EXAMPLES = [
  "my floor is cracking",
  "slipery when wet",
  "want it shiny and modern",
  "white powder coming up",
  "coating is peeling off",
  "forklifts are tearing it up",
  "garage floor",
  "how much does it cost",
];
