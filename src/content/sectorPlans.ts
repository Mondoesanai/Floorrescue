// Per-space "Walk Your Space" plans: each sector page gets its own interactive
// floor plan — its own rooms, its own layout, its own exposure notes. Every
// system id here already exists in floorSystems.ts; every note is a general,
// conservative starting point (the site never diagnoses — the slab and the
// space are always confirmed on site).

export interface PlanZone {
  id: string;
  name: string;
  /** grid placement, 1-based: column, row, width, height */
  col: number;
  row: number;
  w: number;
  h: number;
  systemId: string;
  faces: string;
  note: string;
}

export interface SectorPlan {
  eyebrow: string;
  title: string;
  intro: string;
  cols: number;
  rows: number;
  zones: PlanZone[];
}

const z = (
  name: string,
  col: number,
  row: number,
  w: number,
  h: number,
  systemId: string,
  faces: string,
  note: string,
): PlanZone => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name, col, row, w, h, systemId, faces, note });

export const sectorPlans: Record<string, SectorPlan> = {
  // ---------------- Residential ----------------
  "inside-home": {
    eyebrow: "Walk Your Home",
    title: "Every room asks something different of its floor",
    intro: "Tap a room to see what its floor is up against and where the conversation usually starts.",
    cols: 6,
    rows: 4,
    zones: [
      z("Living & entry", 1, 1, 3, 2, "polished-concrete", "Daily foot traffic, sunlight, furniture", "The slab itself can become the finished floor — ground, polished and sealed to the sheen you want."),
      z("Kitchen", 4, 1, 3, 1, "seal-systems", "Spills, heat, constant cleaning", "A well-chosen sealer or coating makes a kitchen floor easy to keep clean without changing its character."),
      z("Bath & wet rooms", 4, 2, 2, 1, "micro-cement", "Water, soap, no room for grout lines", "A thin, seamless surface that can run floor to wall with no grout lines to maintain."),
      z("Statement room", 6, 2, 1, 2, "metallic-epoxy", "Attention — this is the room people photograph", "Swirling, one-of-a-kind metallic color, approved from a physical sample first."),
      z("Basement", 1, 3, 3, 2, "moisture-mitigation", "A slab below grade — moisture comes first", "Below-grade slabs move vapor. We test before we recommend anything, then build the finish on top."),
      z("Bedrooms & office", 4, 3, 2, 2, "stained-concrete", "Comfort, warmth, a natural look", "Stain adds rich, natural color to the concrete itself — warm and one of a kind."),
    ],
  },
  "exterior-pool-deck": {
    eyebrow: "Walk Your Outdoors",
    title: "Sun, water and bare feet: the outdoor floor test",
    intro: "Tap an area to see what it has to survive and what usually goes there.",
    cols: 6,
    rows: 3,
    zones: [
      z("Pool deck", 1, 1, 4, 2, "decorative-concrete", "Wet feet, sun, chemicals, heat underfoot", "Decorative finishes can add color and texture — and real grip — where wet feet meet concrete."),
      z("Steps & pool edge", 5, 1, 2, 1, "seal-systems", "The slipperiest spots on the property", "Texture and the right sealer matter most here. Safety comes before finish."),
      z("Patio & outdoor kitchen", 1, 3, 3, 1, "concrete-overlays", "Grease, spills, furniture, weather", "Tired patio concrete can often be resurfaced instead of torn out."),
      z("Walkways & driveway", 4, 3, 3, 1, "concrete-restoration", "Weather, cracks, settling, wear", "Cracked and stained exterior concrete can often be repaired and refreshed rather than replaced."),
      z("Shaded lounge", 5, 2, 2, 1, "decorative-concrete", "Comfort and a design that ties the yard together", "Color and pattern make the outdoor floor a designed space, not a leftover."),
    ],
  },
  "residential-new-construction": {
    eyebrow: "Walk the Build",
    title: "Decisions that are cheap now and costly later",
    intro: "A new build is the one moment every floor decision is still easy. Tap a stage to see how we plan around it.",
    cols: 6,
    rows: 3,
    zones: [
      z("Pour day", 1, 1, 2, 2, "new-construction-slab-coordination", "The slab is set here — for good", "Being on site during the pour lets the finish plan and the concrete plan work together."),
      z("Main living areas", 3, 1, 4, 1, "polished-concrete", "The floor everyone lives on", "Polishing can begin soon after the pour with the right coordination — a finished floor without covering the slab."),
      z("Entry threshold", 3, 2, 2, 1, "polished-concrete", "Where inside meets outside", "A precise cut at the threshold gives a clean interior-to-exterior transition."),
      z("Garage & patios", 5, 2, 2, 1, "seal-systems", "Vehicles, weather, everyday abuse", "Ground and sealed surfaces that wear well and clean easily."),
      z("Builder handoff", 1, 3, 6, 1, "floor-preparation", "Schedule, trades, walkthrough", "One point of contact between the concrete, the trades and the homeowner walk-through."),
    ],
  },
  "garage-workshop": {
    eyebrow: "Walk Your Garage",
    title: "Garage and workshop floors",
    intro: "Tap an area to see what it faces.",
    cols: 6,
    rows: 2,
    zones: [
      z("Parking bays", 1, 1, 4, 2, "epoxy-coatings", "Hot tires, oil, road salt", "A tough, easy-to-clean coating."),
      z("Workbench", 5, 1, 2, 2, "epoxy-coatings", "Dropped tools, spills", "Seamless and easy to clean."),
    ],
  },

  // ---------------- Commercial ----------------
  "retail-showroom": {
    eyebrow: "Walk Your Store",
    title: "The floor is part of the display",
    intro: "Shoppers judge a space in seconds. Tap a zone to see how the floor works in it.",
    cols: 6,
    rows: 4,
    zones: [
      z("Entry & first impression", 1, 1, 6, 1, "polished-concrete", "The first three seconds of every visit", "A polished, reflective floor makes the whole store feel considered from the doorway."),
      z("Main sales floor", 1, 2, 4, 2, "polished-concrete", "Constant foot traffic, carts, cleaning", "Polished concrete is a common choice for wear and low upkeep — the finish level sets the look."),
      z("Feature display", 5, 2, 2, 1, "metallic-epoxy", "The spot people stop and photograph", "A signature metallic finish can turn one area into a brand moment."),
      z("Fitting rooms & quiet zones", 5, 3, 2, 1, "micro-cement", "Softer, seamless, upscale", "A refined seamless surface for spaces meant to feel a step above."),
      z("Checkout lane", 1, 4, 3, 1, "polished-concrete", "Heaviest traffic in the store", "Wear paths form here first, so the finish is chosen for them."),
      z("Stockroom", 4, 4, 3, 1, "epoxy-coatings", "Carts, boxes, easy cleaning", "A durable coating where looks matter less and toughness matters more."),
    ],
  },
  "restaurant-food-service": {
    eyebrow: "Walk Your Restaurant",
    title: "Front of house looks. Back of house works.",
    intro: "One space, very different floors. Tap a zone to see what it faces every single service.",
    cols: 6,
    rows: 4,
    zones: [
      z("Kitchen line", 1, 1, 3, 2, "urethane-cement", "Grease, heat, dropped pans, hot-water cleaning", "Seamless urethane cement is commonly chosen for the hardest kitchen conditions."),
      z("Dish pit", 4, 1, 2, 1, "quartz-broadcast", "Constant water, chemicals, standing crews", "Slip resistance and washdown come first — texture built into the system."),
      z("Walk-in cooler", 6, 1, 1, 2, "urethane-cement", "Cold, condensation, temperature swings", "Temperature swings crack rigid coatings, so the system is chosen for them."),
      z("Prep & storage", 4, 2, 2, 1, "moisture-mitigation", "Slab moisture, carts, drains", "Slab moisture is tested first so the coating isn't lifted from underneath."),
      z("Dining room", 1, 3, 4, 2, "stained-concrete", "Atmosphere, foot traffic, chair legs", "Stained or polished concrete gives the room its character and stands up to service."),
      z("Bar", 5, 3, 2, 1, "metallic-epoxy", "Spills, style, a place people look at", "A metallic or decorative finish makes the bar a feature."),
      z("Host & entry", 5, 4, 2, 1, "polished-concrete", "First impression, weather tracked in", "A durable polished entry sets the tone from the door."),
    ],
  },
  "office-corporate": {
    eyebrow: "Walk Your Office",
    title: "A floor that works as hard as the people above it",
    intro: "Corporate spaces need a look that says something and a schedule that doesn't stop the business. Tap a zone.",
    cols: 6,
    rows: 4,
    zones: [
      z("Lobby", 1, 1, 3, 2, "polished-concrete", "Every visitor's first impression", "A polished floor signals confidence — and takes lobby traffic well."),
      z("Open workspace", 4, 1, 3, 2, "concrete-overlays", "Uneven slabs, long runs, evening or weekend work", "Self-leveling overlays can create a flat, consistent floor across large open areas — as on a 25,000 SF bank headquarters."),
      z("Conference rooms", 1, 3, 2, 1, "stained-concrete", "Warmth and a designed feel", "Stain adds color and depth to rooms meant to impress."),
      z("Corridors", 3, 3, 4, 1, "polished-concrete", "Steady traffic, rolling carts", "Continuous polished concrete keeps long runs consistent and easy to maintain."),
      z("Break room", 1, 4, 3, 1, "epoxy-coatings", "Spills and daily cleaning", "A seamless coating that wipes clean."),
      z("Server & IT rooms", 4, 4, 3, 1, "esd-static-systems", "Sensitive equipment and static", "Static-dissipative floors protect electronics."),
    ],
  },
  "hotel-hospitality": {
    eyebrow: "Walk Your Property",
    title: "Guests feel the floor before they see the room",
    intro: "Hospitality floors are judged on look and toughness at the same time. Tap a zone.",
    cols: 6,
    rows: 4,
    zones: [
      z("Lobby & arrival", 1, 1, 4, 2, "polished-concrete", "Luggage carts, first impressions, 24/7 traffic", "A polished, reflective lobby sets the tone and stands up to round-the-clock use."),
      z("Restaurant & bar", 5, 1, 2, 2, "metallic-epoxy", "Atmosphere plus spills and service traffic", "Metallic or decorative finishes give hospitality spaces a signature look."),
      z("Guest corridors", 1, 3, 4, 1, "micro-cement", "Long runs, luggage wheels, quiet requirement", "A seamless, refined surface for long continuous runs."),
      z("Pool & spa deck", 5, 3, 2, 1, "decorative-concrete", "Wet feet, chemicals, sun", "Slip resistance and a designed look for wet areas."),
      z("Back of house", 1, 4, 3, 1, "urethane-cement", "Kitchens, laundry, washdown", "The hardest-working floors in the building, kept out of sight."),
      z("Fitness & event space", 4, 4, 3, 1, "epoxy-coatings", "Equipment, cleaning, turnover between events", "A durable seamless floor that resets fast."),
    ],
  },
  "healthcare-medical": {
    eyebrow: "Walk Your Facility",
    title: "Clean isn't a look here. It's a requirement.",
    intro: "Healthcare floors must be seamless, cleanable and quick to return to service. Tap a zone.",
    cols: 6,
    rows: 4,
    zones: [
      z("Reception & waiting", 1, 1, 3, 2, "polished-concrete", "Trust, steady traffic, easy cleaning", "A clean, calm, durable surface that reads as professional."),
      z("Exam rooms", 4, 1, 3, 1, "epoxy-coatings", "Frequent disinfecting, spills", "Seamless coatings with no grout lines for residue to hide in."),
      z("Lab & sterile processing", 4, 2, 3, 1, "urethane-cement", "Chemicals, heat, frequent washdown", "Chemical and washdown exposure calls for a system chosen for it."),
      z("Imaging & equipment", 1, 3, 3, 1, "esd-static-systems", "Sensitive electronics", "Static-control floors protect equipment."),
      z("Corridors", 4, 3, 3, 1, "epoxy-coatings", "Gurneys, carts, constant movement", "Durable, seamless and quick to keep clean."),
      z("After-hours install window", 1, 4, 6, 1, "polyaspartic", "The clinic can't close", "Fast-curing systems and phased work keep patient care running."),
    ],
  },
  "education-institutional": {
    eyebrow: "Walk Your Campus",
    title: "Thousands of feet a day, and a summer to fix it",
    intro: "Schools and institutions wear floors fast and get short windows to repair them. Tap a zone.",
    cols: 6,
    rows: 4,
    zones: [
      z("Main hallways", 1, 1, 6, 1, "polished-concrete", "The busiest floors in the building", "Polished concrete is a low-maintenance choice for heavy, continuous foot traffic."),
      z("Gym & courts", 1, 2, 3, 2, "sport-courts", "Impact, athletic shoes, line markings", "Rubberized and resinous surfaces built for play."),
      z("Cafeteria", 4, 2, 3, 1, "quartz-broadcast", "Spills, cleaning, slip risk", "Textured, cleanable and safer when wet."),
      z("Labs & workshops", 4, 3, 3, 1, "epoxy-coatings", "Chemicals and equipment", "A seamless, chemical-aware coating."),
      z("Locker rooms", 1, 4, 3, 1, "quartz-broadcast", "Wet, bare feet, constant moisture", "Slip resistance first."),
      z("Summer install window", 4, 4, 3, 1, "polyaspartic", "A few weeks between semesters", "Fast-return systems and phasing fit an academic calendar."),
    ],
  },
  "automotive-dealership": {
    eyebrow: "Walk Your Dealership",
    title: "Showroom shine out front, shop toughness in back",
    intro: "One roof, two very different floors. Tap a zone.",
    cols: 6,
    rows: 3,
    zones: [
      z("Showroom", 1, 1, 4, 2, "polished-concrete", "Bright lights, reflections, customers all day", "A glossy polished floor makes vehicles look better and holds up to traffic."),
      z("Feature display", 5, 1, 2, 1, "metallic-epoxy", "The car everyone walks toward", "A metallic finish under the hero vehicle."),
      z("Customer lounge", 5, 2, 2, 1, "polished-concrete", "Comfort and a clean look", "Quiet, easy-to-clean, consistent with the showroom."),
      z("Service bays", 1, 3, 3, 1, "urethane-cement", "Oil, brake fluid, hot tires, jack loads", "Chemical and impact exposure calls for a tough, resistant system."),
      z("Detail & delivery", 4, 3, 3, 1, "epoxy-coatings", "Water, chemicals, foot and vehicle traffic", "Easy-to-clean and grippy where cars get prepped."),
    ],
  },
  "general-commercial": {
    eyebrow: "Walk Your Space",
    title: "Whatever the business, the floor has a job",
    intro: "Not every space fits a category. Tap a zone to see how we think about it.",
    cols: 6,
    rows: 3,
    zones: [
      z("Entrance", 1, 1, 6, 1, "polished-concrete", "First impression, weather, foot traffic", "A durable, good-looking entry pays back every day."),
      z("Main floor", 1, 2, 4, 2, "polished-concrete", "Whatever your business does all day", "We start with how the space is used, then choose the finish."),
      z("Worn or damaged areas", 5, 2, 2, 1, "concrete-restoration", "Cracks, pitting, old coatings", "Existing slabs can often be restored instead of replaced."),
      z("Back rooms & storage", 5, 3, 2, 1, "epoxy-coatings", "Carts, cleaning, boxes", "A seamless coating where toughness matters most."),
    ],
  },

  // ---------------- Industrial ----------------
  "manufacturing-production": {
    eyebrow: "Walk Your Plant",
    title: "A production floor is a piece of equipment",
    intro: "Downtime is the real cost. Tap a zone to see what its floor faces and where we start.",
    cols: 6,
    rows: 4,
    zones: [
      z("Production line", 1, 1, 3, 2, "urethane-cement", "Heavy equipment, impacts, chemicals, washdown", "A rugged seamless system commonly specified for demanding process floors."),
      z("Forklift lanes", 4, 1, 3, 1, "polished-concrete", "Wheel wear, turning loads, steady traffic", "Well-prepared, densified concrete can carry industrial traffic."),
      z("Chemical & mixing area", 4, 2, 3, 1, "epoxy-coatings", "Spills, containment, cleaning agents", "Chemistry has to match what's spilled; we ask for the list first."),
      z("Shipping & dock", 1, 3, 3, 2, "concrete-restoration", "Impact, joint damage, edge spalling", "Damaged joints and edges can be repaired and protected."),
      z("Offices & break area", 4, 3, 3, 1, "polished-concrete", "People, comfort, a clean look", "A finished floor for the parts of the plant people actually sit in."),
      z("Slab moisture", 4, 4, 3, 1, "moisture-mitigation", "Moisture from below", "Slab moisture is tested before any coating goes on."),
    ],
  },
  "food-beverage-processing": {
    eyebrow: "Walk Your Processing Floor",
    title: "Hot water, cold rooms and no place for bacteria to hide",
    intro: "Every zone in a processing plant has a different enemy. Tap a zone.",
    cols: 6,
    rows: 4,
    zones: [
      z("Processing room", 1, 1, 3, 2, "urethane-cement", "Daily washdown, hot water, fats, acids", "Seamless urethane cement is commonly chosen for the toughest processing conditions."),
      z("Wash-down bay", 4, 1, 2, 1, "urethane-cement", "Steam and high-pressure cleaning", "Steam and hot-water cycling stress rigid coatings."),
      z("Freezer & cooler", 6, 1, 1, 2, "urethane-cement", "Cold, condensation, thermal shock", "Thermal shock is the deciding factor."),
      z("Packaging", 4, 2, 2, 1, "quartz-broadcast", "Wet, slippery, busy", "Texture for grip, seamless for cleaning."),
      z("Drains & coving", 1, 3, 3, 1, "epoxy-mortar", "Where cleanability is won or lost", "Drain and wall-base details are as important as the floor itself."),
      z("Loading dock", 4, 3, 3, 2, "moisture-mitigation", "Temperature swings and slab moisture", "Moisture and condensation at the dock are handled before the finish."),
      z("Sanitation review", 1, 4, 3, 1, "epoxy-coatings", "USDA / FDA-related expectations", "Seamless, non-porous surfaces designed with sanitation requirements in mind."),
    ],
  },
  "warehouse-distribution": {
    eyebrow: "Walk Your Warehouse",
    title: "Miles of slab, and a schedule that never stops",
    intro: "Distribution floors are judged on wear, flatness and how fast they're back in service. Tap a zone.",
    cols: 6,
    rows: 3,
    zones: [
      z("Racking aisles", 1, 1, 4, 1, "polished-concrete", "Forklift traffic, dust, long runs", "Polished, densified concrete reduces dust and stands up to lift traffic."),
      z("Dock doors", 5, 1, 2, 2, "concrete-restoration", "Impact and joint damage at the busiest spot", "Broken edges and joints are repaired and protected."),
      z("Staging & pack", 1, 2, 3, 1, "epoxy-coatings", "Constant movement, marking, cleaning", "A coating that takes traffic and shows lane lines."),
      z("Charging stations", 4, 2, 1, 1, "epoxy-coatings", "Battery acid and spills", "Chemical-aware coating where batteries charge."),
      z("Weekend install window", 1, 3, 6, 1, "polyaspartic", "The building can't stay closed", "Fast-return systems and phased work around shipping."),
    ],
  },
  "aviation-hangar": {
    eyebrow: "Walk Your Hangar",
    title: "Big doors, heavy loads and fluids that eat coatings",
    intro: "Hangar floors face aircraft loads and aviation fluids. Tap a zone.",
    cols: 6,
    rows: 3,
    zones: [
      z("Hangar floor", 1, 1, 4, 2, "urethane-cement", "Aircraft weight, hydraulic fluid, fuel", "A resistant, seamless system for chemicals and heavy loads — and a bright, reflective surface helps visibility."),
      z("Door threshold", 5, 1, 2, 1, "concrete-restoration", "Impact and weather at the opening", "The threshold takes the hardest hits."),
      z("Wash bay", 5, 2, 2, 1, "quartz-broadcast", "Water, soap, slip risk", "Texture for grip when wet."),
      z("Tool crib & shop", 1, 3, 3, 1, "epoxy-coatings", "Rolling toolboxes, oil, cleaning", "Durable and easy to clean."),
      z("Offices & lounge", 4, 3, 3, 1, "polished-concrete", "A finished, professional space", "A polished finish that suits the office side of the hangar."),
    ],
  },
  "pharmaceutical-lab": {
    eyebrow: "Walk Your Lab",
    title: "Controlled spaces, controlled floors",
    intro: "Labs and pharma need floors that stay clean, resist chemicals and manage static. Tap a zone.",
    cols: 6,
    rows: 3,
    zones: [
      z("Clean suite", 1, 1, 3, 2, "epoxy-coatings", "Seamless, cleanable, low particulate", "A seamless, non-porous surface with cleanability designed in."),
      z("Lab benches", 4, 1, 3, 1, "urethane-cement", "Chemical spills and frequent cleaning", "Chemical exposure decides the system."),
      z("Instrument rooms", 4, 2, 3, 1, "esd-static-systems", "Static and sensitive equipment", "Static-dissipative systems protect instruments."),
      z("Gowning & corridors", 1, 3, 3, 1, "epoxy-coatings", "Traffic and frequent cleaning", "Durable, seamless and quick to maintain."),
      z("Utility & mechanical", 4, 3, 3, 1, "urethane-cement", "Leaks, washdown and heavy equipment", "Rugged and easy to hose down."),
    ],
  },
  "cold-storage": {
    eyebrow: "Walk Your Cold Chain",
    title: "The floor that lives below freezing",
    intro: "Cold storage is the extreme case for thermal shock and moisture. Tap a zone.",
    cols: 6,
    rows: 3,
    zones: [
      z("Freezer floor", 1, 1, 3, 2, "urethane-cement", "Sub-zero temperatures, forklifts, ice", "Systems commonly specified where thermal shock is a factor."),
      z("Cooler", 4, 1, 3, 1, "urethane-cement", "Cold, condensation and washdown", "Temperature and moisture both matter."),
      z("Dock & anteroom", 4, 2, 3, 1, "moisture-mitigation", "Warm-to-cold transitions, condensation", "Transition zones see the biggest swings."),
      z("Battery charging", 1, 3, 3, 1, "epoxy-coatings", "Acid spills", "Chemical-aware protection where batteries charge."),
      z("Slab moisture & frost", 4, 3, 3, 1, "moisture-mitigation", "Slab moisture and frost heave concerns", "Moisture management is planned with the slab, not after."),
    ],
  },
  "specialty-industrial": {
    eyebrow: "Walk Your Facility",
    title: "If it's unusual, start with what the floor faces",
    intro: "Specialty facilities rarely fit a template. Tap a zone to see how we start.",
    cols: 6,
    rows: 3,
    zones: [
      z("Process area", 1, 1, 3, 2, "urethane-cement", "Whatever your process throws at the floor", "We start with a full list of exposures — chemicals, temperature, loads."),
      z("Containment", 4, 1, 3, 1, "epoxy-coatings", "Spill control and chemical resistance", "Chemistry has to match what could spill."),
      z("Equipment bays", 4, 2, 3, 1, "polished-concrete", "Loads and wheel traffic", "Well-prepared concrete carries heavy loads."),
      z("Control room", 1, 3, 3, 1, "esd-static-systems", "Electronics and static", "Static control where it matters."),
      z("Loading & yard edge", 4, 3, 3, 1, "concrete-restoration", "Impact and weather", "Repair and protect the edges."),
    ],
  },
};
