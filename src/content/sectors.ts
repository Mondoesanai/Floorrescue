import type { Sector } from "./types";

// Canonical, current-service sector ids per environment, in display order.
// These arrays are what primary navigation/choosers render — legacy and
// fallback entries below exist in the data graph but are never surfaced here.
export const residentialSectorIds = ["inside-home", "exterior-pool-deck", "residential-new-construction"];
export const commercialSectorIds = [
  "retail-showroom",
  "restaurant-food-service",
  "office-corporate",
  "hotel-hospitality",
  "healthcare-medical",
  "education-institutional",
  "automotive-dealership",
];
export const industrialSectorIds = [
  "manufacturing-production",
  "food-beverage-processing",
  "warehouse-distribution",
  "aviation-hangar",
  "pharmaceutical-lab",
  "cold-storage",
];

export const sectors: Sector[] = [
  // ---------------- Residential ----------------
  {
    id: "inside-home",
    environment: "residential",
    name: "Inside My Home",
    shortLabel: "Inside My Home",
    description:
      "Interior floors — living areas, kitchens, basements, and other interior concrete or resinous surfaces.",
    aliases: ["interior", "basement", "living room", "kitchen floor"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["appearance-design", "maintenance", "moisture"],
    relevantSystemIds: ["polished-concrete", "stained-concrete", "micro-cement", "concrete-overlays", "metallic-epoxy"],
    relevantProjectIds: ["kagan-dwellings-polished-concrete", "soco-loft-salt-pepper-polished", "white-rock-lake-honed-restoration", "downtown-dallas-lofts-polished-sealed"],
    relevantResourceIds: ["concrete-fundamentals-101", "why-it-failed-coatings-peel"],
    heroCopyVariants: [],
  },
  {
    id: "exterior-pool-deck",
    environment: "residential",
    name: "Exterior / Pool Deck",
    shortLabel: "Exterior / Pool Deck",
    description: "Pool decks, patios, and other exterior concrete that has to handle weather and bare feet.",
    aliases: ["patio", "pool deck", "exterior concrete"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["slip-resistance", "maintenance"],
    relevantSystemIds: ["decorative-concrete", "seal-systems", "concrete-overlays"],
    relevantProjectIds: ["pool-deck-rescue-diamond-ground-dyed", "north-dallas-matte-black-driveway", "modern-pool-deck-restoration-dallas"],
    relevantResourceIds: ["concrete-fundamentals-101"],
    heroCopyVariants: [],
  },
  {
    id: "residential-new-construction",
    environment: "residential",
    name: "New Construction",
    shortLabel: "New Construction",
    description: "Coordinating the finish floor with the build before the slab is even poured.",
    aliases: ["new build", "new home"],
    projectStates: ["new-construction", "other"],
    commonConcerns: ["appearance-design"],
    relevantSystemIds: ["new-construction-slab-coordination", "polished-concrete"],
    relevantProjectIds: ["williams-drake-pour-day-polish", "bartonville-residence", "prosper-brass-star-overlay"],
    relevantResourceIds: ["slab-starts-here"],
    heroCopyVariants: [],
  },
  {
    id: "garage-workshop",
    environment: "residential",
    name: "Garage / Workshop",
    shortLabel: "Garage / Workshop",
    description: "Legacy service line — retained for historic project reference only.",
    aliases: ["garage", "workshop"],
    projectStates: ["other"],
    commonConcerns: [],
    relevantSystemIds: ["epoxy-coatings"],
    relevantProjectIds: [],
    relevantResourceIds: [],
    heroCopyVariants: [],
    legacy: true,
  },

  // ---------------- Commercial ----------------
  {
    id: "retail-showroom",
    environment: "commercial",
    name: "Retail / Showroom",
    shortLabel: "Retail / Showroom",
    description:
      "Auto dealerships, furniture and home goods showrooms, boutique and big-box retail, and shopping center common areas — sales floors where the floor is part of how the brand presents itself.",
    aliases: ["retail", "showroom", "boutique", "store"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["appearance-design", "heavy-traffic", "downtime"],
    relevantSystemIds: ["polished-concrete", "metallic-epoxy", "stained-concrete", "micro-cement"],
    relevantProjectIds: ["verdad-real-estate-southlake"],
    relevantResourceIds: ["design-inspiration-metallic-entries"],
    heroCopyVariants: [
      {
        projectState: "new-construction",
        eyebrow: "RETAIL / SHOWROOM — NEW CONSTRUCTION",
        headline: "A SALES FLOOR PLANNED BEFORE THE FIRST CUSTOMER WALKS IN.",
        support:
          "Retail floors get judged in the first three seconds. Floor Rescue works from the slab up so the finish, the traffic pattern, and the brand feel are decided before the store ever opens.",
      },
      {
        projectState: "renovation",
        eyebrow: "RETAIL / SHOWROOM — RENOVATION",
        headline: "A RETAIL FLOOR THAT LOOKS LIKE IT COST MORE THAN IT DID.",
        support:
          "An existing slab in a working retail space doesn't need to be torn out to look and perform like new. Floor Rescue evaluates what's underfoot now and builds a finish plan around it.",
      },
      {
        projectState: "failed-floor",
        eyebrow: "RETAIL / SHOWROOM — FAILED FLOOR",
        headline: "WHEN THE SHOWROOM FLOOR STOPS SELLING THE SPACE.",
        support:
          "Scuffed, dulled, or failing floors undercut everything else you've done to the store. Floor Rescue diagnoses why the current finish gave out before recommending what replaces it.",
      },
    ],
  },
  {
    id: "restaurant-food-service",
    environment: "commercial",
    name: "Restaurant / Food Service",
    shortLabel: "Restaurant / Food Service",
    description:
      "Commercial kitchens, front-of-house dining, bars and breweries, food prep and processing areas, and bakeries and cafés — built around washdown and constant cleaning.",
    aliases: ["restaurant", "kitchen", "bar", "food service", "dish pit"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["washdown", "downtime", "sanitation", "slip-resistance"],
    relevantSystemIds: ["urethane-cement", "quartz-broadcast", "moisture-mitigation"],
    relevantProjectIds: ["uptown-dallas-commercial-kitchen"],
    relevantResourceIds: ["why-it-failed-coatings-peel"],
    heroCopyVariants: [
      {
        projectState: "new-construction",
        eyebrow: "RESTAURANT / FOOD SERVICE — NEW CONSTRUCTION",
        headline: "A KITCHEN FLOOR BUILT FOR WASHDOWN FROM DAY ONE.",
        support:
          "The floor under a working kitchen takes more abuse than almost any other commercial surface. Floor Rescue specs for washdown, heat, and grease exposure before the equipment ever goes in.",
      },
      {
        projectState: "renovation",
        eyebrow: "RESTAURANT / FOOD SERVICE — RENOVATION",
        headline: "UPGRADING A KITCHEN FLOOR WITHOUT SHUTTING THE KITCHEN DOWN.",
        support:
          "Fast-cure systems and phased scheduling exist for exactly this reason. Floor Rescue plans the install around your service hours, not the other way around.",
      },
      {
        projectState: "failed-floor",
        eyebrow: "RESTAURANT / FOOD SERVICE — FAILED FLOOR",
        headline: "A KITCHEN FLOOR THAT CAN HANDLE THE PART OF THE BUSINESS THAT NEVER STOPS.",
        support:
          "Failed coatings, constant cleaning, and tight shutdown windows require more than putting another coating on top. Floor Rescue evaluates the slab, the environment, and what caused the previous system to fail before deciding what goes back down.",
      },
    ],
  },
  {
    id: "office-corporate",
    environment: "commercial",
    name: "Office / Corporate",
    shortLabel: "Office / Corporate",
    description:
      "Corporate lobbies and reception areas, open office floors, conference rooms, breakrooms and cafeterias, and multi-tenant office buildings — where finish and durability both matter.",
    aliases: ["office", "corporate", "lobby", "workplace"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["appearance-design", "downtime", "maintenance"],
    relevantSystemIds: ["polished-concrete", "micro-cement", "stained-concrete"],
    relevantProjectIds: ["fsg-dallas-office", "w2-plus-office"],
    relevantResourceIds: ["design-inspiration-metallic-entries"],
    heroCopyVariants: [
      {
        projectState: "new-construction",
        eyebrow: "OFFICE / CORPORATE — NEW CONSTRUCTION",
        headline: "AN OFFICE FLOOR THAT SETS THE TONE BEFORE ANYONE SITS DOWN.",
        support:
          "Lobby and open-plan floors carry a lot of the first impression. Floor Rescue coordinates finish and slab decisions early so the space reads the way it's meant to from day one.",
      },
      {
        projectState: "renovation",
        eyebrow: "OFFICE / CORPORATE — RENOVATION",
        headline: "AN OFFICE UPGRADE THAT DOESN'T DISRUPT THE PEOPLE WORKING IN IT.",
        support:
          "Most office renovations happen around a live tenant. Floor Rescue phases the work and picks systems that fit a realistic after-hours or weekend schedule.",
      },
      {
        projectState: "failed-floor",
        eyebrow: "OFFICE / CORPORATE — FAILED FLOOR",
        headline: "WHEN THE LOBBY FLOOR STOPS MATCHING THE REST OF THE BUILDING.",
        support:
          "A dulled or damaged lobby floor undercuts a building that's otherwise well kept. Floor Rescue identifies what actually caused the wear before proposing a fix.",
      },
    ],
  },
  {
    id: "hotel-hospitality",
    environment: "commercial",
    name: "Hotel / Hospitality",
    shortLabel: "Hotel / Hospitality",
    description:
      "Hotel lobbies and corridors, event venues and banquet halls, fitness centers and spas, and entertainment complexes — back-of-house and front-of-house spaces that see round-the-clock traffic.",
    aliases: ["hotel", "hospitality", "lobby", "resort"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["heavy-traffic", "appearance-design", "downtime"],
    relevantSystemIds: ["polished-concrete", "micro-cement", "urethane-cement"],
    relevantProjectIds: [],
    relevantResourceIds: [],
    heroCopyVariants: [
      {
        projectState: "new-construction",
        eyebrow: "HOTEL / HOSPITALITY — NEW CONSTRUCTION",
        headline: "A HOSPITALITY FLOOR BUILT FOR TRAFFIC THAT NEVER LETS UP.",
        support:
          "Hospitality floors run 24 hours a day, every day, from opening. Floor Rescue specs systems around continuous guest and back-of-house traffic, not a quiet showroom pace.",
      },
      {
        projectState: "renovation",
        eyebrow: "HOTEL / HOSPITALITY — RENOVATION",
        headline: "RENOVATING A HOSPITALITY FLOOR AROUND GUESTS WHO ARE STILL CHECKING IN.",
        support:
          "A property renovation rarely gets the luxury of closing. Floor Rescue phases lobby and corridor work to keep the property operating through the project.",
      },
      {
        projectState: "failed-floor",
        eyebrow: "HOTEL / HOSPITALITY — FAILED FLOOR",
        headline: "WHEN A LOBBY OR CORRIDOR FLOOR STARTS TELLING GUESTS THE WRONG STORY.",
        support:
          "Guests read a worn floor before they read anything else. Floor Rescue diagnoses the failure and rebuilds a finish that holds up to guest-count traffic.",
      },
    ],
  },
  {
    id: "healthcare-medical",
    environment: "commercial",
    name: "Healthcare / Medical",
    shortLabel: "Healthcare / Medical",
    description:
      "Medical offices and clinics, dental and veterinary practices, surgical prep and procedure rooms, pharmacies, and senior living facilities — where sanitation and seamless surfaces are non-negotiable.",
    aliases: ["healthcare", "medical", "clinic", "veterinary"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["sanitation", "downtime", "chemical-exposure"],
    relevantSystemIds: ["urethane-cement", "epoxy-coatings", "esd-static-systems"],
    relevantProjectIds: [],
    relevantResourceIds: [],
    heroCopyVariants: [
      {
        projectState: "new-construction",
        eyebrow: "HEALTHCARE / MEDICAL — NEW CONSTRUCTION",
        headline: "A MEDICAL FLOOR BUILT AROUND SANITATION FROM THE START.",
        support:
          "Clinical floors have to be seamless and cleanable by design, not by add-on. Floor Rescue specs the system to the facility's actual sanitation and chemical-exposure requirements.",
      },
      {
        projectState: "renovation",
        eyebrow: "HEALTHCARE / MEDICAL — RENOVATION",
        headline: "UPGRADING A CLINICAL FLOOR WITHOUT INTERRUPTING PATIENT CARE.",
        support:
          "Fast-cure, low-odor systems and off-hours scheduling exist for facilities that can't close. Floor Rescue plans around active patient care, not around convenience.",
      },
      {
        projectState: "failed-floor",
        eyebrow: "HEALTHCARE / MEDICAL — FAILED FLOOR",
        headline: "WHEN A CLINICAL FLOOR CAN NO LONGER BE CLEANED THE WAY IT NEEDS TO BE.",
        support:
          "Once a clinical floor's seams or coating start to give out, it stops meeting the standard the space requires. Floor Rescue evaluates the substrate before recommending a replacement system.",
      },
    ],
  },
  {
    id: "education-institutional",
    environment: "commercial",
    name: "Education / Institutional",
    shortLabel: "Education / Institutional",
    description:
      "K–12 schools and universities, libraries and media centers, gymnasiums and athletic facilities, government buildings, and houses of worship.",
    aliases: ["school", "education", "campus", "institutional", "church", "worship center"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["heavy-traffic", "maintenance", "downtime"],
    relevantSystemIds: ["polished-concrete", "epoxy-coatings"],
    relevantProjectIds: [],
    relevantResourceIds: [],
    heroCopyVariants: [
      {
        projectState: "new-construction",
        eyebrow: "EDUCATION / INSTITUTIONAL — NEW CONSTRUCTION",
        headline: "A CAMPUS FLOOR BUILT FOR DECADES OF FOOT TRAFFIC.",
        support:
          "Institutional floors have to survive years of daily foot traffic on a maintenance budget that doesn't grow. Floor Rescue specs for the long run, not just the ribbon-cutting.",
      },
      {
        projectState: "renovation",
        eyebrow: "EDUCATION / INSTITUTIONAL — RENOVATION",
        headline: "UPGRADING A SCHOOL OR CAMPUS FLOOR ON A SUMMER SCHEDULE.",
        support:
          "Institutional renovations usually have one real window to get the work done. Floor Rescue plans the install to fit inside it.",
      },
      {
        projectState: "failed-floor",
        eyebrow: "EDUCATION / INSTITUTIONAL — FAILED FLOOR",
        headline: "WHEN A HALLWAY OR CAFETERIA FLOOR CAN'T KEEP UP WITH THE BUILDING AROUND IT.",
        support:
          "High-traffic institutional floors wear unevenly and visibly. Floor Rescue identifies the cause before proposing a system built to outlast the last one.",
      },
    ],
  },
  {
    id: "automotive-dealership",
    environment: "commercial",
    name: "Automotive / Dealership",
    shortLabel: "Automotive / Dealership",
    description:
      "New car showrooms, service bays and quick-lube, detailing centers, and used car lots — floors that have to do two very different jobs under one roof.",
    aliases: ["automotive", "dealership", "showroom floor", "service bay", "auto service"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["chemical-exposure", "heavy-traffic", "appearance-design"],
    relevantSystemIds: ["metallic-epoxy", "urethane-cement", "polished-concrete"],
    relevantProjectIds: [],
    relevantResourceIds: [],
    heroCopyVariants: [
      {
        projectState: "new-construction",
        eyebrow: "AUTOMOTIVE / DEALERSHIP — NEW CONSTRUCTION",
        headline: "A SHOWROOM AND SERVICE FLOOR BUILT FOR TWO DIFFERENT JOBS.",
        support:
          "A dealership needs a showroom finish that sells the cars and a service-bay floor that survives oil, chemicals, and lift traffic. Floor Rescue specs each area for what it actually has to do.",
      },
      {
        projectState: "renovation",
        eyebrow: "AUTOMOTIVE / DEALERSHIP — RENOVATION",
        headline: "UPGRADING A DEALERSHIP FLOOR WITHOUT CLOSING THE SHOWROOM.",
        support:
          "Showroom and service-bay work can be phased so the lot stays open and sales keep happening. Floor Rescue builds the schedule around that.",
      },
      {
        projectState: "failed-floor",
        eyebrow: "AUTOMOTIVE / DEALERSHIP — FAILED FLOOR",
        headline: "WHEN OIL, CHEMICALS, AND TRAFFIC HAVE FINALLY WON.",
        support:
          "Service-bay floors take a harder chemical beating than almost any other commercial space. Floor Rescue diagnoses what broke down the last system before specifying what replaces it.",
      },
    ],
  },
  {
    id: "general-commercial",
    environment: "commercial",
    name: "Other Commercial",
    shortLabel: "Other Commercial",
    description:
      "Distribution centers, veterinary and animal-wellness facilities, salons and spas, storage and mixed-use, and other commercial spaces that don't fit a single category above.",
    aliases: ["other commercial", "mixed-use", "distribution center", "salon", "spa", "veterinary"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["appearance-design", "maintenance", "downtime"],
    relevantSystemIds: ["polished-concrete", "epoxy-coatings", "concrete-restoration"],
    relevantProjectIds: ["asi-gymnastics", "stewart-peninsula-golf-course", "saltbox-apothecary"],
    relevantResourceIds: [],
    heroCopyVariants: [
      {
        projectState: "new-construction",
        eyebrow: "COMMERCIAL — NEW CONSTRUCTION",
        headline: "A COMMERCIAL FLOOR PLANNED BEFORE THE SLAB EVEN CURES.",
        support:
          "Every recommendation starts with the slab, the space, and what the floor needs to survive. Tell us more about the project and we'll route it to the right system family.",
      },
      {
        projectState: "renovation",
        eyebrow: "COMMERCIAL — RENOVATION",
        headline: "A COMMERCIAL FLOOR UPGRADE BUILT AROUND HOW THE SPACE ACTUALLY OPERATES.",
        support:
          "Floor Rescue evaluates the existing slab and how the space runs day to day before recommending what goes back down.",
      },
      {
        projectState: "failed-floor",
        eyebrow: "COMMERCIAL — FAILED FLOOR",
        headline: "A FAILED COMMERCIAL FLOOR, DIAGNOSED BEFORE ANYTHING GOES BACK DOWN.",
        support:
          "Floor Rescue evaluates the slab, the environment, and what caused the previous system to fail before deciding what goes back down.",
      },
    ],
  },

  // ---------------- Industrial ----------------
  {
    id: "manufacturing-production",
    environment: "industrial",
    name: "Manufacturing / Production",
    shortLabel: "Manufacturing / Production",
    description:
      "Forklifts, machinery, pallet racking, and non-stop operations — floors engineered for load-bearing, dust control, and durability.",
    aliases: ["manufacturing", "production", "plant floor"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["heavy-traffic", "chemical-exposure", "downtime"],
    relevantSystemIds: ["urethane-cement", "epoxy-coatings", "moisture-mitigation"],
    relevantProjectIds: [],
    relevantResourceIds: [],
    heroCopyVariants: [],
  },
  {
    id: "food-beverage-processing",
    environment: "industrial",
    name: "Food & Beverage / Processing",
    shortLabel: "Food & Beverage",
    description:
      "Processing plants, breweries, and distilleries — USDA/FDA-compliant, seamless systems engineered for washdown, steam cleaning, and chemical exposure, with coved bases and drain detail.",
    aliases: ["food processing", "beverage", "food and beverage"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["washdown", "thermal-shock", "sanitation", "chemical-exposure"],
    relevantSystemIds: ["urethane-cement", "quartz-broadcast", "moisture-mitigation"],
    relevantProjectIds: [],
    relevantResourceIds: [],
    heroCopyVariants: [],
  },
  {
    id: "warehouse-distribution",
    environment: "industrial",
    name: "Warehouse / Distribution",
    shortLabel: "Warehouse / Distribution",
    description:
      "Large-format warehouses, distribution centers, and logistics hubs — systems designed for maximum durability, racking loads, and minimal downtime.",
    aliases: ["warehouse", "distribution center", "logistics"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["heavy-traffic", "fast-return-to-service"],
    relevantSystemIds: ["polished-concrete", "epoxy-coatings", "concrete-restoration"],
    relevantProjectIds: ["80000sf-warehouse-showroom"],
    relevantResourceIds: [],
    heroCopyVariants: [],
  },
  {
    id: "aviation-hangar",
    environment: "industrial",
    name: "Aviation / Hangar",
    shortLabel: "Aviation / Hangar",
    description: "Hangar floors built for fuel and chemical exposure, heavy point loads, and large open spans.",
    aliases: ["hangar", "aviation"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["chemical-exposure", "heavy-traffic"],
    relevantSystemIds: ["urethane-cement", "epoxy-coatings"],
    relevantProjectIds: [],
    relevantResourceIds: [],
    heroCopyVariants: [],
  },
  {
    id: "pharmaceutical-lab",
    environment: "industrial",
    name: "Pharmaceutical / Lab",
    shortLabel: "Pharmaceutical / Lab",
    description: "Cleanroom-adjacent and lab floors with strict sanitation, static-control, and chemical demands.",
    aliases: ["pharmaceutical", "lab", "cleanroom", "laboratory"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["sanitation", "chemical-exposure"],
    relevantSystemIds: ["esd-static-systems", "urethane-cement"],
    relevantProjectIds: [],
    relevantResourceIds: [],
    heroCopyVariants: [],
  },
  {
    id: "cold-storage",
    environment: "industrial",
    name: "Cold Storage",
    shortLabel: "Cold Storage",
    description: "Freezer and cold-storage floors built to handle thermal shock and moisture cycling.",
    aliases: ["cold storage", "freezer", "refrigerated"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["thermal-shock", "moisture"],
    relevantSystemIds: ["urethane-cement", "moisture-mitigation"],
    relevantProjectIds: [],
    relevantResourceIds: [],
    heroCopyVariants: [],
  },
  {
    id: "specialty-industrial",
    environment: "industrial",
    name: "Specialty / Other Industrial",
    shortLabel: "Specialty / Other",
    description: "Specialty industrial environments that don't fit a single category above.",
    aliases: ["specialty industrial", "other industrial"],
    projectStates: ["new-construction", "renovation", "failed-floor", "other"],
    commonConcerns: ["chemical-exposure", "heavy-traffic"],
    relevantSystemIds: ["urethane-cement", "epoxy-coatings"],
    relevantProjectIds: [],
    relevantResourceIds: [],
    heroCopyVariants: [],
  },
];

export function getSector(id: string): Sector | undefined {
  return sectors.find((s) => s.id === id);
}

export function getSectorsByEnvironment(environment: Sector["environment"]): Sector[] {
  return sectors.filter((s) => s.environment === environment && !s.legacy);
}

/** Best-effort alias/keyword match used by the deterministic router fallback. */
export function matchSectorByKeyword(text: string, environment?: Sector["environment"]): Sector | undefined {
  const normalized = text.toLowerCase();
  const pool = environment ? sectors.filter((s) => s.environment === environment) : sectors;
  return pool.find((s) => s.aliases.some((alias) => normalized.includes(alias)) || normalized.includes(s.name.toLowerCase()));
}
