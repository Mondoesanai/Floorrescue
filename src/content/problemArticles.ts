// Long-form, plain-language explainers for each problem page. Written from
// widely accepted concrete-and-coatings practice and the systems already
// described elsewhere in this content graph. No product performance figures,
// certifications, or guarantees are stated — those stay in needsReview.ts
// until Jeremy confirms them. The only named standards are the moisture
// tests (ASTM F1869 / F2170) and the wet-slip test method (ANSI A326.3)
// that already appear in the site's FAQs and system notes.

export interface ProblemArticle {
  intro: string[];
  signs: string[];
  causes: { title: string; body: string }[];
  mistakes: string[];
  fixSteps: { title: string; body: string }[];
  approach: string;
  questions: { q: string; a: string }[];
  resourceSlugs: string[];
}

export const problemArticles: Record<string, ProblemArticle> = {
  washdown: {
    intro: [
      "Daily washdown is one of the hardest things a floor can be asked to do. Water, heat, cleaning chemicals and often pressure all hit the same surface, over and over, while the floor is still expected to stay sealed, cleanable and safe to walk on.",
      "Floors that were not chosen for it usually show it in the same places first: around drains, at the wall base, along joints, and anywhere water sits instead of running off.",
    ],
    signs: [
      "Coating lifting, bubbling or peeling near drains and wall bases",
      "Water pooling in low spots that never quite dry",
      "A chalky, dull or worn look in the areas that get washed most",
      "Open joints or cracks with standing water in them",
      "Stains or odors building up along edges and corners",
      "Surface that turns slick after every cleaning",
    ],
    causes: [
      { title: "The system doesn't match the exposure", body: "Water temperature, chemical strength, pressure and frequency all matter. A coating that is fine for a showroom can fail quickly in a kitchen or processing room." },
      { title: "Water has nowhere to go", body: "Poor slope to the drain means water sits on the surface and works its way into weak points. Good drainage is part of the floor, not an afterthought." },
      { title: "Weak details at edges and joints", body: "Wall bases, drain edges and control joints are where washdown floors fail first. If they are not detailed properly, water gets underneath." },
      { title: "A damp or contaminated slab underneath", body: "Coatings put over moisture, grease or old residue do not bond well, and washdown finds that weakness fast." },
    ],
    mistakes: [
      "Choosing a floor for how it looks and only later finding out how it handles water and heat",
      "Skipping a cove base or proper termination at walls and drains",
      "Assuming every epoxy handles hot water the same way",
      "Recoating over a failing area without finding out why it failed",
    ],
    fixSteps: [
      { title: "Map the exposure", body: "How hot is the wash water, what chemicals are used, is there pressure, how often? Those answers drive the system choice." },
      { title: "Test and assess the slab", body: "Check moisture, contamination and structural condition before deciding what goes on top." },
      { title: "Remove what failed and prepare the surface", body: "Failed coating and contaminated concrete come out, and the slab is profiled so the new system can bond." },
      { title: "Repair and detail the weak points", body: "Cracks, joints, drains and wall bases are repaired and detailed for water before any coating goes down." },
      { title: "Install a system built for the exposure", body: "Urethane cement, polyaspartic and epoxy systems each have a place in wet environments, with texture added where slip resistance matters." },
    ],
    approach: "We start with what the floor actually goes through, not what it looks like. That means asking how it is cleaned, testing the slab, and being honest when the answer is a different system than the one that failed. The power is in the install: preparation and detailing at the edges decide whether a washdown floor lasts.",
    questions: [
      { q: "Can epoxy handle hot-water washdown?", a: "It depends on how hot and how often. Hot water and steam are hard on rigid coatings, which is one reason urethane cement systems are commonly specified for heavy washdown. We match the system to your actual wash routine." },
      { q: "Why does the coating fail at the wall first?", a: "The junction between floor and wall is a natural weak point. Without a proper cove or termination, water gets behind the coating and lifts it from the edge in." },
      { q: "Do washdown floors have to be slippery?", a: "No. Texture can be built into the system so it is easier to clean and still gives grip when wet. The right balance depends on the space." },
    ],
    resourceSlugs: ["why-it-failed-coatings-peel", "urethane-cement-industrial-floor-system"],
  },

  moisture: {
    intro: [
      "Concrete is not as dry as it looks. Slabs hold water and let vapor move up through them, especially ground-level and below-grade slabs. When a coating, sealer or overlay goes over that moisture without a plan, the floor can fail from underneath, no matter how carefully the top was installed.",
      "Moisture problems are also the ones people are most likely to misdiagnose, because the damage shows on the surface while the cause is beneath it.",
    ],
    signs: [
      "Bubbles, blisters or lifting coating with no obvious impact damage",
      "White, powdery residue on the surface (often called efflorescence)",
      "Dark, damp-looking patches that come and go with the weather",
      "A musty smell in a room with a slab floor",
      "Flooring or adhesive letting go from the concrete",
      "A coating that peels in sheets and shows a damp back side",
    ],
    causes: [
      { title: "Vapor moving up through the slab", body: "Ground moisture travels upward through concrete over time. Slabs on grade with no or damaged vapor barrier beneath are especially prone." },
      { title: "A slab that hasn't finished drying", body: "New concrete releases water for a long time. Covering it too early traps that moisture." },
      { title: "Water from outside", body: "Poor drainage, plumbing leaks or high groundwater keep feeding the slab." },
      { title: "The wrong product over a wet slab", body: "Many coatings and toppings need the slab below a certain moisture level. Ignoring that is the most common reason floors fail early." },
    ],
    mistakes: [
      "Coating first and asking about moisture only after it fails",
      "Judging a slab by how it looks or feels instead of testing it",
      "Sealing the surface and assuming that stops vapor from below",
      "Applying another coating over a peeling one without finding the cause",
    ],
    fixSteps: [
      { title: "Test before anything else", body: "Calcium chloride testing (ASTM F1869) or in-slab relative humidity probes (ASTM F2170) put a number on what the slab is doing." },
      { title: "Find the source", body: "Drainage, leaks, an old vapor barrier or a young slab each point to a different solution." },
      { title: "Prepare the surface", body: "Failed coating and contaminated concrete are removed and the slab is profiled to accept a moisture-control system." },
      { title: "Install moisture mitigation where it's needed", body: "A moisture barrier or moisture-tolerant primer goes down first when readings are above what the finish system allows." },
      { title: "Build the finish on top", body: "Only then does the design layer and topcoat go on, so it sits on something stable." },
    ],
    approach: "We test every slab before recommending a system, not after a floor has already started to fail. It is one of the least glamorous steps and one of the most important ones, and it is the difference between a floor that lasts and one that comes back to us in a year.",
    questions: [
      { q: "How do you test a slab for moisture?", a: "Two common methods: a calcium chloride test (ASTM F1869) read over 72 hours for older slabs, and a relative humidity probe (ASTM F2170) for newer slabs. The reading decides whether a moisture barrier goes down first." },
      { q: "Can a sealer stop moisture coming up?", a: "Usually not. A surface sealer protects the top of the floor; it does not stop vapor moving up from below. That takes a purpose-built moisture-mitigation system." },
      { q: "Is white powder on my concrete a moisture problem?", a: "Often, yes. It is typically salts carried to the surface by moving moisture. It is a sign to find the water source, not just clean the powder off." },
    ],
    resourceSlugs: ["moisture-testing-the-step-most-contractors-skip", "why-it-failed-coatings-peel"],
  },

  downtime: {
    intro: [
      "Some spaces simply cannot stay closed. A restaurant, clinic, retail store or plant loses money every hour the floor is out of service, and that pressure can push people toward a fast job instead of the right one.",
      "The good news is that speed and quality do not have to be opposites. The key is choosing a system and a schedule built around your real operating window from the start.",
    ],
    signs: [
      "You can only close for a night, a weekend or a slow season",
      "Previous flooring work stretched longer than promised",
      "Coating needs to be walked on or rolled on quickly",
      "Work has to be phased around areas that stay open",
      "Noise, dust or odor limits during business hours",
    ],
    causes: [
      { title: "Cure times that don't fit the schedule", body: "Different systems return to service at very different speeds. Choosing one without asking about cure time is how schedules slip." },
      { title: "Underestimated prep", body: "Grinding, repair and moisture work take time. Plans that ignore them look short on paper and run long on site." },
      { title: "Work not phased for how the space operates", body: "Doing everything at once is rarely how an operating space can be handled." },
    ],
    mistakes: [
      "Picking the cheapest system without asking how long it takes to cure",
      "Cutting prep steps to hit a date, which shortens the life of the floor",
      "Not agreeing on a phasing plan and a return-to-service time up front",
    ],
    fixSteps: [
      { title: "Define your real window", body: "Hours, days, and which areas can close. We build the plan around that, not a generic timeline." },
      { title: "Choose a system that fits the window", body: "Fast-cure systems such as polyaspartic and urethane cement exist specifically for this situation." },
      { title: "Phase the work", body: "Zone by zone, with clear handoffs so part of the space can reopen while the rest is worked." },
      { title: "Confirm return-to-service in writing", body: "Foot traffic, carts and vehicles each have different timing. You get project-specific answers before you sign." },
    ],
    approach: "There is no single honest answer that applies to every job, so we don't give one. Tell us the space, the system you are considering and when you operate, and we build a project-specific timeline before you commit.",
    questions: [
      { q: "How long will my business need to be closed?", a: "It depends on the system and the size of the space. Fast-cure systems can shorten the window considerably, and phasing can keep parts open. We give a project-specific timeline up front." },
      { q: "Can you work nights or weekends?", a: "We plan around the schedule you can actually give us. Tell us your hours and we will build the sequence around them." },
    ],
    resourceSlugs: ["epoxy-vs-polyaspartic-which-is-right", "urethane-cement-industrial-floor-system"],
  },

  "chemical-exposure": {
    intro: [
      "Cleaners, solvents, oils, acids and process chemicals all attack floors, and they do not all attack them the same way. A coating that shrugs off one can soften, stain or dissolve under another.",
      "That is why chemical exposure is a matching problem: you have to know what the floor will actually meet before you can pick what goes on it.",
    ],
    signs: [
      "Softening, tackiness or discoloration where chemicals are used or spilled",
      "Etched, dull or rough patches on a previously smooth floor",
      "Coating that peels or blisters around a process area",
      "Stains that will not come out",
      "Concrete surface eaten away or pitted under a failed coating",
    ],
    causes: [
      { title: "Chemistry mismatch", body: "Each coating family resists some chemicals better than others. Using the wrong one for your specific exposure is the leading cause of chemical failure." },
      { title: "Spills left to sit", body: "Even resistant floors have limits on how long a chemical can sit. Fast cleanup matters." },
      { title: "Bare or unsealed concrete", body: "Concrete on its own is porous and reacts to many acids. Without a protective system it is easily etched." },
    ],
    mistakes: [
      "Assuming 'epoxy' means chemical-proof",
      "Not sharing the full list of chemicals with the installer",
      "Ignoring containment and how spills are cleaned up",
    ],
    fixSteps: [
      { title: "List every chemical", body: "Names, concentrations, how often and how long they sit. Even ones used only occasionally." },
      { title: "Check compatibility with the system", body: "Epoxy, urethane cement and specialty chemical-resistant systems have different strengths. We match them to your list." },
      { title: "Repair and prepare the substrate", body: "Chemically damaged concrete is repaired and profiled so the new system can bond." },
      { title: "Install and detail for containment", body: "Coving, thickness and joint treatment matter as much as the product itself." },
    ],
    approach: "We ask for the chemical list first, because that is what decides the system. It is the same approach we took on projects like the Lewisville Water Treatment Plant, where restoration and a chemical-resistant epoxy coating went hand in hand.",
    questions: [
      { q: "What chemicals will a coated floor resist?", a: "It depends on the coating and the specific chemical. We compare your list against the system before recommending one, rather than making a blanket promise." },
      { q: "Can a stained floor be saved?", a: "Often, yes, depending on how deep the damage goes. Surface staining can sometimes be ground away; chemical etching or softening usually calls for repair and a new system." },
    ],
    resourceSlugs: ["urethane-cement-industrial-floor-system", "why-it-failed-coatings-peel"],
  },

  "slip-resistance": {
    intro: [
      "A slippery floor is a safety issue before it is a design issue. Wet areas, grease, wash water and traffic all reduce grip, and a smooth, glossy coating that looks great when dry can be treacherous when it is not.",
      "The fix is not making floors rough everywhere. It is adding the right amount of texture where it is needed and keeping the floor easy to clean.",
    ],
    signs: [
      "People or carts slide when the floor is wet",
      "Near-misses or falls in a specific area",
      "A glossy finish that gets slick after mopping",
      "Grease or oil film that will not clean off",
      "Complaints from staff about footing",
    ],
    causes: [
      { title: "Smooth, high-gloss finish", body: "Sealed and coated surfaces can be very slick when wet if no texture is built in." },
      { title: "Contamination", body: "Grease, oil, soap residue or wax leave a film that lowers grip." },
      { title: "Worn texture", body: "Textured floors lose grip as they wear, especially in high-traffic lanes." },
    ],
    mistakes: [
      "Adding grit to the topcoat after the fact instead of designing it in",
      "Making the whole floor rough when only certain zones need it",
      "Choosing texture that is impossible to clean",
    ],
    fixSteps: [
      { title: "Find where and why", body: "Wet zones, entries, kitchens and ramps have different needs. Slip risk is local." },
      { title: "Choose the right texture", body: "Flake and quartz broadcast systems add texture in a controlled way, and the level can be set to the space." },
      { title: "Balance grip and cleanability", body: "More texture means more grip but harder cleaning. The goal is enough of one without wrecking the other." },
      { title: "Check it against a recognised method", body: "Wet slip resistance is commonly measured using the DCOF method in ANSI A326.3. We confirm what fits your space." },
    ],
    approach: "We treat slip resistance as a requirement, not a finish preference. We talk about how the space is really used, then design the texture into the system rather than bolting it on later.",
    questions: [
      { q: "Will a slip-resistant floor be hard to clean?", a: "It can be if the texture is too aggressive. The right level gives you grip without trapping dirt, and we choose it based on how the space is cleaned." },
      { q: "Can I make my existing coated floor less slippery?", a: "Sometimes. Options include re-profiling or adding a textured topcoat. Whether it is worthwhile depends on the condition of the existing coating." },
    ],
    resourceSlugs: ["resinous-systems-overview"],
  },

  "appearance-design": {
    intro: [
      "For many spaces the floor is part of the brand. A restaurant's mood, a showroom's polish, a home's character: the floor carries a lot of it, and when it does not match the design intent, everything else looks slightly off.",
      "Getting the look right takes more than picking a color. It depends on the slab you start with, the system you choose, and how the finish behaves under real lighting.",
    ],
    signs: [
      "The floor doesn't match the design or brand you have built",
      "Existing concrete looks tired, stained or patchy",
      "A previous finish turned out different from the sample",
      "Architects or designers have a specific spec to hit",
      "You want something no one else in your category has",
    ],
    causes: [
      { title: "The slab limits the options", body: "Aggregate, cracks, patching and past coatings all affect what finish is possible without an overlay." },
      { title: "Approving from a picture", body: "Screens misrepresent color and sheen. Finishes look different under real lighting." },
      { title: "No mockup", body: "Custom and metallic floors are individual. Without a physical sample, surprises are likely." },
    ],
    mistakes: [
      "Choosing from a digital image alone",
      "Skipping a mockup on a custom finish",
      "Forgetting how the floor will be maintained day to day",
    ],
    fixSteps: [
      { title: "Start with the slab", body: "We assess what is there. Sometimes polishing or staining the existing concrete is right; sometimes an overlay or resinous system is." },
      { title: "Match the system to the look", body: "Polished, stained, micro-cement, metallic epoxy, flake, scored and inlay work each deliver a different result." },
      { title: "Mock it up", body: "Approve color and technique from a physical sample under the space's real lighting." },
      { title: "Install and protect", body: "The topcoat and sealer are chosen for traffic and maintenance, so the look lasts." },
    ],
    approach: "We work with owners, designers and architects to get the floor right for the space, and we are clear about what is possible from the concrete you have. Projects like Luxe Dental and the Comerica Bank offices show how far the right system can go.",
    questions: [
      { q: "Do you provide samples or mockups?", a: "Yes, for custom finishes such as metallic epoxy and decorative work, a physical mockup under real lighting is standard practice before full production." },
      { q: "Can you match a brand color or logo?", a: "Often, yes. Decorative flake systems, dyes and inlays can carry brand colors and logo work. We confirm what is achievable on a sample." },
    ],
    resourceSlugs: ["metallic-epoxy-entries", "polished-concrete-vs-epoxy-comparison"],
  },

  "heavy-traffic": {
    intro: [
      "Forklifts, pallet jacks, carts and steady foot traffic are relentless. They find every weak spot in a floor, especially at joints, doorways and the lanes everyone follows.",
      "A floor built for heavy traffic starts with a strong, well-prepared slab and a system chosen for the load, not just the look.",
    ],
    signs: [
      "Wear paths in the shape of your traffic lanes",
      "Chipping or spalling at joints and door thresholds",
      "Coating worn through to bare concrete",
      "Tire marks that will not clean off",
      "Cracks that spread from the same spots",
    ],
    causes: [
      { title: "A system too thin or soft for the load", body: "Point loads and hard wheels demand more from the floor than foot traffic does." },
      { title: "Weak joints", body: "Unprotected saw cuts and control joints break down under repeated wheel impact." },
      { title: "Poor bond", body: "Coatings applied over unprepared concrete peel in traffic lanes first." },
    ],
    mistakes: [
      "Using a decorative coating in a forklift lane",
      "Leaving joints unfilled or unprotected",
      "Skipping surface preparation to save time",
    ],
    fixSteps: [
      { title: "Understand the load", body: "Wheel type, weights, frequency and turning patterns all matter." },
      { title: "Repair the substrate", body: "Cracks, spalls and joints are repaired so they don't telegraph through." },
      { title: "Choose a system built for wear", body: "Polished concrete, urethane cement and heavier-build resinous systems each suit different traffic." },
      { title: "Protect the joints", body: "Joint treatment is part of the system, not an extra." },
    ],
    approach: "We look at how equipment actually moves through the space, then build the system for that. Projects like TD Industries and our large warehouse work show how the right floor holds up to day-to-day distribution traffic.",
    questions: [
      { q: "Is polished concrete OK for forklifts?", a: "In many warehouses, yes. Polished concrete is a common choice for distribution spaces, depending on the slab and load. We assess before recommending it." },
      { q: "Why does my floor wear in lanes?", a: "Because traffic follows the same paths. The wear is a sign the system wasn't built for that load, or wasn't bonded well enough." },
    ],
    resourceSlugs: ["five-levels-of-concrete-surface-preparation", "polished-concrete-vs-epoxy-comparison"],
  },

  sanitation: {
    intro: [
      "Food, health and production spaces need floors that can be cleaned thoroughly and stay that way. That means seamless, non-porous surfaces without cracks, open joints or rough spots where bacteria and residue can hide.",
      "A floor that looks clean is not the same as one that can be sanitized. The details are in the surface, the seams and the edges.",
    ],
    signs: [
      "Grout lines, cracks or joints that hold residue",
      "Odors that come back after cleaning",
      "Porous concrete that stains and absorbs spills",
      "Worn spots where dirt collects",
      "A health inspection finding about floors or wall bases",
    ],
    causes: [
      { title: "Porous or cracked surfaces", body: "Bare concrete, tile with grout and cracked coatings all give contamination somewhere to sit." },
      { title: "Poor edge detail", body: "Where the floor meets walls, drains and equipment is where cleanability is lost." },
      { title: "The wrong system for the environment", body: "Wet, hot, acidic or greasy spaces need systems chosen for them." },
    ],
    mistakes: [
      "Relying on tile and grout in a hard-washdown room",
      "Ignoring coving and edge details",
      "Choosing a system without checking that it fits the compliance needs of the space",
    ],
    fixSteps: [
      { title: "Identify the requirements", body: "Food service, food processing and healthcare each have different expectations. We confirm what applies to you." },
      { title: "Repair and prepare", body: "Cracks and damaged areas are repaired and the slab is profiled." },
      { title: "Install a seamless system", body: "Seamless resinous systems with integral coving remove the joints and seams that trap residue." },
      { title: "Detail every edge", body: "Drains, walls and equipment bases are finished so they can be cleaned like the rest of the floor." },
    ],
    approach: "Our seamless systems are designed for spaces where cleanability is not optional, including USDA and FDA-related environments. We match the system to your exact operation, and we say so plainly when a different approach is better.",
    questions: [
      { q: "Do you install food-safe floors?", a: "Yes. Seamless, non-porous systems are used in commercial kitchens and food-processing spaces. We confirm requirements for your specific operation." },
      { q: "Is tile OK in a commercial kitchen?", a: "It can work, but grout lines and joints are where cleanability suffers. Many operators prefer a seamless resinous floor for that reason." },
    ],
    resourceSlugs: ["urethane-cement-industrial-floor-system", "why-it-failed-coatings-peel"],
  },

  maintenance: {
    intro: [
      "A good floor should make life easier, not create work. If your floor needs constant waxing, stripping, re-sealing or scrubbing to look presentable, something about the system does not match how the space is used.",
      "The lowest-maintenance floors are usually the ones that were specified with cleaning in mind from the start.",
    ],
    signs: [
      "Floors that need regular waxing or stripping",
      "Stains that come back or never fully clean",
      "Dusting or a chalky surface on bare concrete",
      "Staff spending hours a week on the floor",
      "Appearance that drops quickly after cleaning",
    ],
    causes: [
      { title: "Unsealed or poorly sealed concrete", body: "Bare concrete dusts and stains easily. A proper sealer or densifier changes that." },
      { title: "A surface that traps dirt", body: "Heavily textured or porous surfaces hold dirt and are harder to clean." },
      { title: "A finish that needs frequent recoating", body: "Some floor finishes are designed for regular reapplication. That is a long-term cost." },
    ],
    mistakes: [
      "Choosing a floor without asking what maintenance it needs",
      "Using harsh cleaners that damage the finish",
      "Applying wax or sealers that build up over time",
    ],
    fixSteps: [
      { title: "Understand the current routine", body: "What is done, how often, by whom, and where it is still not working." },
      { title: "Fix the surface", body: "Densifying, sealing or polishing bare concrete, or coating it, cuts dusting and staining." },
      { title: "Choose a low-maintenance finish", body: "Polished concrete and seamless coatings are popular for this reason. The right one depends on your traffic and look." },
      { title: "Set a simple care plan", body: "We give clear guidance so the floor performs the way it was built to." },
    ],
    approach: "We think about maintenance from the first conversation. A floor is a long-term asset, and the care it needs should be part of the decision, not a surprise afterward.",
    questions: [
      { q: "What is the lowest-maintenance floor?", a: "It depends on the space. Polished concrete and seamless coatings are common low-maintenance choices, and we recommend based on your traffic and what you need it to do." },
      { q: "Do polished concrete floors need waxing?", a: "Generally no. Regular cleaning with the right products is the routine. We give specific care guidance at handoff." },
    ],
    resourceSlugs: ["maintaining-a-polished-concrete-floor", "polished-concrete-vs-epoxy-comparison"],
  },

  "fast-return-to-service": {
    intro: [
      "Some facilities cannot wait days for a floor to cure. Hospitals, restaurants, distribution centers and retail all have reasons to get the floor back in use fast.",
      "Speed comes from choosing a fast-curing system and preparing properly, not from rushing a slow one.",
    ],
    signs: [
      "A tight reopening date",
      "Prior floor work that took longer than planned",
      "Need for foot traffic in hours, not days",
      "Vehicles or equipment that have to return quickly",
    ],
    causes: [
      { title: "Slow-curing materials", body: "Some coatings need days before they can take traffic. That may not fit your window." },
      { title: "Temperature and humidity", body: "Cure time depends on conditions in the space, not just the product." },
      { title: "Prep that isn't planned for", body: "Repairs and grinding have their own time requirements." },
    ],
    mistakes: [
      "Choosing a system based on price without asking about cure time",
      "Opening the floor to traffic too early and damaging the finish",
    ],
    fixSteps: [
      { title: "State the deadline", body: "When you need foot traffic, carts and vehicles back, in specific terms." },
      { title: "Select a fast-cure system", body: "Polyaspartic and urethane cement systems are commonly chosen for accelerated schedules." },
      { title: "Plan prep around it", body: "Repairs and preparation are scheduled first so cure time is the only step left." },
      { title: "Confirm return times by traffic type", body: "Foot traffic, wheeled traffic and full use are different milestones." },
    ],
    approach: "We are upfront about what different systems can and cannot do on a tight timeline. Ask us for return-to-service times for your specific system and space, and you get project-specific answers.",
    questions: [
      { q: "How fast can a floor be ready?", a: "It depends on the system, the conditions and the prep required. Fast-cure options exist and we give specific times for your project before you commit." },
      { q: "Does faster cure mean lower quality?", a: "Not when the system is chosen for it and prepared correctly. Faster systems are a real category, not a shortcut." },
    ],
    resourceSlugs: ["epoxy-vs-polyaspartic-which-is-right"],
  },

  "thermal-shock": {
    intro: [
      "Freezers, hot-water washdown, steam and rapid temperature swings can crack rigid coatings. The floor expands and contracts, and if the system cannot move with it, it fails, often in sheets.",
      "This is one of the most specialized problems in industrial flooring, and one where the system choice matters most.",
    ],
    signs: [
      "Cracking or delamination near steam, hot water or freezer entries",
      "Coating that fails soon after a hot washdown",
      "Peeling in cold storage or blast-freezer areas",
      "Blistering after temperature cycles",
    ],
    causes: [
      { title: "A rigid system in a thermally active area", body: "Materials that don't tolerate expansion and contraction crack when temperatures swing." },
      { title: "Sudden temperature changes", body: "Hot water on a cold floor puts extreme stress on the surface." },
      { title: "Moisture trapped by the coating", body: "Cold slabs condense water, which can attack the bond." },
    ],
    mistakes: [
      "Using a standard epoxy in a steam or hot-water area",
      "Ignoring slab moisture in cold storage",
      "Not accounting for the temperature at application",
    ],
    fixSteps: [
      { title: "Record the temperature range", body: "Hot and cold extremes, how quickly they change and how often." },
      { title: "Check the slab", body: "Cold slabs bring their own moisture and condensation issues." },
      { title: "Choose a thermal-shock-capable system", body: "Urethane cement is the system commonly specified where thermal shock is a factor." },
      { title: "Install to the manufacturer's requirements", body: "Application temperature and preparation are critical." },
    ],
    approach: "This is exactly the kind of problem where a generic contractor gets it wrong. We match the system to the actual temperature profile and we are clear about what needs to be confirmed against the manufacturer's current data.",
    questions: [
      { q: "What is thermal shock?", a: "Damage caused by rapid temperature change, such as hot water on a cold floor. It stresses coatings that cannot flex with the slab." },
      { q: "What floor works in a freezer?", a: "Specialized systems such as urethane cement are typically used. We confirm the exact fit for your temperature range and product." },
    ],
    resourceSlugs: ["urethane-cement-industrial-floor-system"],
  },

  "existing-floor-failure": {
    intro: [
      "When a floor is peeling, cracking, bubbling or lifting, the temptation is to patch the surface or coat over it. That almost always brings the same failure back, because the coating is rarely the real problem.",
      "A failed floor is a clue. The reason it failed decides what has to happen next, and getting that diagnosis right is worth more than any product.",
    ],
    signs: [
      "Coating peeling, flaking or lifting in sheets or patches",
      "Bubbles or blisters under the surface",
      "Cracks that keep reappearing after repair",
      "A floor that failed within a year or two of installation",
      "Powdery or crumbling concrete under a coating",
    ],
    causes: [
      { title: "Moisture from below", body: "The most common hidden cause. Vapor pushes coatings off from underneath." },
      { title: "Poor surface preparation", body: "Coatings need a clean, profiled surface to bond. Skipped or shallow prep is a leading cause of early failure." },
      { title: "A system mismatched to the use", body: "Traffic, chemicals, temperature and washdown can overwhelm the wrong product." },
      { title: "Slab movement or structural issues", body: "Cracks that move will telegraph through anything rigid placed on them." },
    ],
    mistakes: [
      "Recoating over failing material",
      "Blaming the product without testing the slab",
      "Fixing the symptom, such as a crack, without finding the cause",
      "Hiring the same approach that failed the first time",
    ],
    fixSteps: [
      { title: "Diagnose first", body: "Moisture evaluation, bond testing and a close look at the substrate come before any decision on what to install." },
      { title: "Remove what failed", body: "Failed coating comes off completely so the new system isn't built on a weak layer." },
      { title: "Repair the slab", body: "Cracks, spalls and low spots are repaired and the concrete is profiled." },
      { title: "Handle moisture and contamination", body: "Moisture mitigation and cleaning are done before anything goes back down." },
      { title: "Install the right system", body: "The new system is chosen for what actually caused the failure and how the space is used." },
    ],
    approach: "This is what Floor Rescue is named for. We start with diagnosis, tell you what happened and why, and only then talk about what goes back down. Projects like our Commercial Kitchen Rescue and multiple metallic epoxy rescues began exactly this way.",
    questions: [
      { q: "Can I just recoat over a peeling floor?", a: "Usually not. New coating over a failing layer or an unresolved moisture problem tends to fail the same way. Removing what failed and finding the cause is the durable fix." },
      { q: "Why did my floor fail so soon?", a: "Most early failures trace back to moisture, poor preparation or a system mismatched to the use, not the product on the label. A diagnosis will tell you which." },
      { q: "Can a failed floor be restored instead of replaced?", a: "Often, yes. Restoration, re-profiling, overlays or a new coating can bring a slab back without tearing it out, depending on its condition." },
    ],
    resourceSlugs: ["why-it-failed-coatings-peel", "moisture-testing-the-step-most-contractors-skip", "the-floor-starts-with-the-slab"],
  },
};
