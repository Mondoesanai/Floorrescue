import type { Environment, FAQ } from "./types";

// The client-supplied Base44 source dump listed real FAQ *questions* for
// each floor system and for the commercial audience, but the answer
// accordions were collapsed in the export — no answer text was ever
// captured. The client has explicitly authorized writing the answers below
// in Jeremy's voice. Every fact, figure, or standard cited here already
// exists somewhere else in this content graph (floorSystems.ts,
// resources.ts, sectors.ts, audiences.ts, problems.ts) — nothing new is
// invented. Where the graph itself flags a figure as needing Jeremy's
// reconfirmation (claimsStatus: "needs-review" — e.g. polished concrete's
// hardness/DCOF numbers, polyaspartic's exact cure hours, urethane cement's
// thermal-shock range), the answer here stays qualitative instead of
// restating the unconfirmed number. The moisture-testing figures (ASTM
// F1869/F2170, the 3 lbs/1,000 SF/24 hrs threshold) are real and already
// partially in this graph (see floorSystems.ts's polyaspartic entry); using
// them more broadly here is flagged in needsReview.ts
// ("faq-moisture-testing-standards") since it's the first time they're
// surfaced as public copy rather than an internal technical note.
export const faqs: FAQ[] = [
  // ---------------- General ----------------
  {
    id: "why-moisture-test-every-slab",
    question: "Why do you test for moisture before installing a new floor?",
    answer:
      "Concrete slabs hold moisture, and it moves upward over time — especially on ground-floor and below-grade slabs. If a coating, overlay, or sealer goes down before that vapor drive is measured and addressed, the new floor can fail from underneath regardless of how well it was installed. We test every slab before recommending a system, not after a floor has already started failing: a calcium chloride test (ASTM F1869, a 72-hour read) for slabs six months or older, or a relative-humidity probe (ASTM F2170) for newer slabs. If the reading comes back above the threshold most coatings and overlays are built for — 3 lbs per 1,000 SF per 24 hours — a moisture barrier or moisture-tolerant primer goes down first. That's what separates a floor that lasts decades from one that fails in year one.",
    scope: { kind: "general" },
  },

  // ---------------- Commercial / general-business ----------------
  {
    id: "commercial-closed-during-install",
    question: "How long will my business need to be closed during installation?",
    answer:
      "It depends on the system and the scope of the space — there's no single honest answer that applies to every job. What we can tell you up front: fast-cure systems exist specifically for businesses that can't stay closed long, and we build the schedule around a realistic shutdown window instead of a generic one. Tell us the space, the system, and your operating hours, and we'll give you a project-specific timeline before you sign anything.",
    scope: { kind: "environment", environment: "commercial" },
  },
  {
    id: "commercial-work-around-hours",
    question: "Can you work around our business hours?",
    answer:
      "Yes — that's the default, not the exception. We phase the work, schedule after-hours or weekend installs where it makes sense, and coordinate with your other trades from day one so nothing catches your team off guard mid-project. We also assess the substrate before we bid, not after, so there are no surprises once the crew is on-site.",
    scope: { kind: "environment", environment: "commercial" },
  },
  {
    id: "commercial-polished-vs-epoxy",
    question: "Polished concrete vs. epoxy — which is right for us?",
    answer:
      "Polished concrete works with the slab you already have as the finished surface — ground and honed to a satin or mirror sheen, with no coating layer to wear through, chip, or recoat down the line. Epoxy and other resinous systems add an engineered layer on top of the slab, built for a specific exposure — chemicals, washdown, heavy traffic, or a decorative look the concrete alone can't achieve. The right call depends on your slab's condition, what it has to stand up to, and the look you want, not a default preference for one over the other. A lot of buildings use both: polished concrete in the lobby, a resinous system in the kitchen or shop behind it.",
    scope: { kind: "environment", environment: "commercial" },
  },
  {
    id: "commercial-samples-mockups",
    question: "Do you provide samples, spec sheets, and on-site mockups for architects and designers?",
    answer:
      "Yes. We work from your spec, or help you develop one — physical samples, color and finish charts, technical data sheets, and on-site mockups under your space's actual lighting are all standard before full production, especially for metallic and decorative systems where no two installations are identical. We coordinate directly with your project team from specification through installation, and we're glad to do an in-office Lunch & Learn on system selection if that's useful to your team.",
    scope: { kind: "environment", environment: "commercial" },
  },
  {
    id: "commercial-gc-design-build",
    question: "Do you work with GCs and design-build teams?",
    answer:
      "Regularly. As a subcontractor, your schedule, budget, and reputation are on the line with every trade you bring in — we show up on time, hit our numbers, and don't create problems for your schedule. We're fully insured and bonded with a COI available on request, we assess the substrate before we bid so there are no surprises mid-project, and we put a dedicated project superintendent on every job.",
    scope: { kind: "environment", environment: "commercial" },
  },
  {
    id: "commercial-food-service-safety",
    question: "What about food-service safety and code requirements?",
    answer:
      "Food-service floors need to be seamless, cleanable, and able to take washdown, steam, and grease without breaking down — that's the standard we spec to, with systems like urethane cement and quartz broadcast built specifically for commercial kitchens and food-processing washdown areas, including coved base and drain detail where the space calls for it. If your project needs a specific certification or code document on file, tell us up front and we'll confirm current documentation for that product line before we spec it — we won't hand you a compliance claim we haven't verified for your job.",
    scope: { kind: "environment", environment: "commercial" },
  },

  // ---------------- Polished Concrete ----------------
  {
    id: "polished-concrete-durability",
    question: "How durable is polished concrete?",
    answer:
      "Very — and for a specific reason: there's no coating layer to peel, chip, or wear through. Grinding and densifying the slab hardens the surface itself, so what you're standing on is the concrete, not a film sitting on top of it. Exact hardness and wear figures depend on the finish level and aggregate exposure you choose, which we'll walk you through before we start.",
    scope: { kind: "system", systemId: "polished-concrete" },
  },
  {
    id: "polished-concrete-maintenance",
    question: "How do I maintain a polished concrete floor?",
    answer:
      "Routine dust mopping and the right neutral-pH cleaner do most of the work day to day. Densifier and sealer reapplication runs on a traffic-based schedule, not a fixed calendar date. The main thing to avoid is acidic cleaners and abrasive equipment — either one will dull the sheen over time. It's low-maintenance, not no-maintenance.",
    scope: { kind: "system", systemId: "polished-concrete" },
  },
  {
    id: "polished-concrete-timeline",
    question: "How long does polishing an existing floor take?",
    answer:
      "It depends on the square footage, the finish level you're after (CSDA Level 1 flat/matte through Level 4 highly polished), how much aggregate exposure you want, and the condition of the slab we're starting with — a floor that needs crack repair or contamination removal first takes longer than one that's already in good shape. We give you a real timeline after the slab assessment, not before.",
    scope: { kind: "system", systemId: "polished-concrete" },
  },
  {
    id: "polished-concrete-over-existing",
    question: "Do you need a brand-new slab, or can you polish what's already there?",
    answer:
      "Most of our polished concrete work is on existing slabs — grinding and honing the concrete that's already in place. If the existing slab can't deliver the look or finish level a space needs on its own, a polishable overlay or cementitious topping is the alternative rather than a full tear-out.",
    scope: { kind: "system", systemId: "polished-concrete" },
  },
  {
    id: "polished-concrete-moisture",
    question: "Does polished concrete need moisture testing?",
    answer:
      "Yes, even though polished concrete is inherently vapor-permeable — unlike a coating, it doesn't trap moisture underneath it, which is an advantage. But on slabs with elevated moisture vapor, densifiers and guard systems may not fully cure or bond the way they should, which affects long-term stain resistance and sheen. We assess every slab before polishing begins — a calcium chloride test (ASTM F1869) for slabs six months or older, or a relative-humidity probe (ASTM F2170) for newer slabs — and recommend the right guard system for what the readings show, not guesswork.",
    scope: { kind: "system", systemId: "polished-concrete" },
  },

  // ---------------- Metallic Epoxy ----------------
  {
    id: "metallic-epoxy-durability",
    question: "How durable is a metallic epoxy floor, and why do some fail?",
    answer:
      "Done right, it's a long-term floor — but metallic epoxy is also one of the least forgiving systems to install, and almost every failure traces back to the same handful of causes: skipped or inadequate moisture testing, inadequate grinding or surface prep, skipping crack and divot repair before the base coat goes down, or a topcoat that wasn't matched to the space's actual UV exposure and traffic. Moisture is the biggest one — a slab that's still emitting vapor can blister and delaminate a metallic system regardless of how good it looked on install day. Prep and moisture testing are what separate a metallic floor that lasts from one that starts failing within a couple of years.",
    scope: { kind: "system", systemId: "metallic-epoxy" },
  },
  {
    id: "metallic-epoxy-sheen-maintenance",
    question: "Which topcoat sheen is easiest to live with day to day?",
    answer:
      "High gloss maximizes depth and reflection but shows footprints and dust more readily. Satin softens the glare while keeping the dimensional look. Matte reads as a velvety, understated finish and is the most forgiving of foot traffic and scratches day to day. It's as much a look decision as a maintenance one — we'll walk you through samples so you can see how each reads in your actual lighting before you commit.",
    scope: { kind: "system", systemId: "metallic-epoxy" },
  },
  {
    id: "metallic-epoxy-timeline",
    question: "How long does a metallic epoxy installation take?",
    answer:
      "It depends on the square footage, the system you choose (standard metallic, polyaspartic metallic for UV stability, or white metallics/pearls), and whether you're adding a logo, mural, or inlay. We'll give you a project-specific schedule once we've assessed the slab — it's not a number we quote sight-unseen.",
    scope: { kind: "system", systemId: "metallic-epoxy" },
  },
  {
    id: "metallic-epoxy-over-existing",
    question: "Can metallic epoxy go over my existing floor?",
    answer:
      "It can go over a properly prepared, moisture-tested existing slab — grinding and prep come first regardless of what's there now. If there's a prior coating that's already failing or delaminating, that has to come off first; we've stripped failed systems down to bare, properly profiled concrete before installing a metallic system that actually holds.",
    scope: { kind: "system", systemId: "metallic-epoxy" },
  },
  {
    id: "metallic-epoxy-moisture",
    question: "Is moisture testing really necessary under metallic epoxy?",
    answer:
      "Yes — it's non-negotiable, not a recommendation. Moisture vapor is the number one cause of metallic epoxy delamination. We test every slab before installation: a calcium chloride test (ASTM F1869, a 72-hour read) for slabs six months or older, or a relative-humidity probe (ASTM F2170) for newer slabs. If the reading comes back above the threshold most epoxy systems are built for — 3 lbs per 1,000 SF per 24 hours — a moisture barrier goes down before the metallic does. No exceptions.",
    scope: { kind: "system", systemId: "metallic-epoxy" },
  },

  // ---------------- Stained Concrete ----------------
  {
    id: "stained-concrete-durability",
    question: "How durable is stained concrete — does it fade or peel?",
    answer:
      "It doesn't peel, because the color becomes part of the slab instead of sitting on top of it — that's true whether we use acid staining, reactive dyes, water-based stains, or our own grind-stain-seal combination. It's permanent color, not a coating that eventually needs to be redone.",
    scope: { kind: "system", systemId: "stained-concrete" },
  },
  {
    id: "stained-concrete-maintenance",
    question: "How do I maintain a stained concrete floor?",
    answer:
      "The sealer on top is what you're actually maintaining, not the stain itself — the color is permanent in the slab. Sealer choice depends on your substrate and traffic, and reapplication runs on a traffic-based schedule rather than a fixed calendar. We'll spec the right sealer system for your space when we install the stain.",
    scope: { kind: "system", systemId: "stained-concrete" },
  },
  {
    id: "stained-concrete-timeline",
    question: "How long does a stained concrete project take?",
    answer:
      "It depends on which of the four staining approaches we're using and the size and condition of the slab — acid staining, reactive dyes, and water-based stains each have a different process, and grind-stain-seal (our own signature combination) adds a mechanical grinding step first. We'll scope a real timeline once we've seen the space.",
    scope: { kind: "system", systemId: "stained-concrete" },
  },
  {
    id: "stained-concrete-over-existing",
    question: "Can you stain a floor that's already down, or does it need to be a new pour?",
    answer:
      "Staining works with the slab you already have — it's applied to existing concrete, not just fresh pours. If the existing slab is too damaged or inconsistent to take a stain the way you want it to look, concrete restoration or an overlay is the alternative before we stain.",
    scope: { kind: "system", systemId: "stained-concrete" },
  },

  // ---------------- Polyaspartic ----------------
  {
    id: "polyaspartic-durability",
    question: "How does polyaspartic compare to standard epoxy for durability?",
    answer:
      "It's harder than epoxy, doesn't yellow under UV exposure the way standard epoxy can, and applies across a much wider temperature range — which matters for exterior-adjacent spaces and cold-weather installs. Most systems use it as a topcoat over an epoxy base to get the build and adhesion of epoxy plus the hardness and UV stability of polyaspartic; an all-polyaspartic system is spec'd where UV exposure or a tight timeline calls for it.",
    scope: { kind: "system", systemId: "polyaspartic" },
  },
  {
    id: "polyaspartic-maintenance",
    question: "How do I maintain a polyaspartic floor?",
    answer:
      "Day-to-day care is the same as other resinous floors — regular sweeping or dust mopping and a neutral cleaner. Because polyaspartic resists UV yellowing and is harder than standard epoxy, it holds its finish longer under normal traffic without the coating dulling or ambering the way some epoxy topcoats can.",
    scope: { kind: "system", systemId: "polyaspartic" },
  },
  {
    id: "polyaspartic-timeline",
    question: "How fast does polyaspartic really cure?",
    answer:
      "Fast enough that it's the system we reach for when a space genuinely can't stay closed long — that's its whole reason for existing. Exact return-to-service times depend on the product line, film thickness, and jobsite temperature, so we'll give you a real cure schedule for your specific project rather than a generic number.",
    scope: { kind: "system", systemId: "polyaspartic" },
  },
  {
    id: "polyaspartic-over-existing",
    question: "Does polyaspartic go over my existing floor, or is it a standalone system?",
    answer:
      "Both, depending on the job. Most commonly it's the topcoat over a new epoxy base — the epoxy gives you build and adhesion, the polyaspartic gives you the hardness, UV stability, and fast return to service. For UV-exposed or exterior-adjacent spaces, or a very tight schedule, we sometimes spec an all-polyaspartic system instead. Either way, the existing slab or coating gets assessed and prepped first.",
    scope: { kind: "system", systemId: "polyaspartic" },
  },
  {
    id: "polyaspartic-moisture",
    question: "Does moisture testing matter for a fast-cure system like polyaspartic?",
    answer:
      "Yes — cure speed doesn't cancel out moisture risk. Even a polyaspartic system can be compromised if the slab is above the moisture threshold and the primer underneath isn't moisture-tolerant. We test every slab (ASTM F1869 calcium chloride, a 72-hour read) before installation, and if vapor transmission comes back above 3 lbs per 1,000 SF per 24 hours, a moisture-tolerant primer goes down first. That one extra step is what separates a floor that lasts from an expensive early failure.",
    scope: { kind: "system", systemId: "polyaspartic" },
  },

  // ---------------- Urethane Cement ----------------
  {
    id: "urethane-cement-durability",
    question: "Why would we choose urethane cement over standard epoxy?",
    answer:
      "Urethane cement is built for the combination most coatings can't handle at once: hot-water or steam washdown, thermal cycling, and heavy daily traffic. It's the system we spec most often for commercial kitchens, breweries, distilleries, food and beverage processing, and cold storage — anywhere a facility washes down aggressively and needs the floor to hold up for years, not months. It's a more specialized, typically more expensive system than standard epoxy, which is exactly why it doesn't get talked about as much — but it's the right spec for environments that actually need it.",
    scope: { kind: "system", systemId: "urethane-cement" },
  },
  {
    id: "urethane-cement-maintenance",
    question: "How do you maintain a urethane cement floor?",
    answer:
      "It's designed to take exactly the kind of maintenance a commercial kitchen or processing floor already does — hot water, steam, and regular washdown — without breaking down the way a standard coating would. There's no special babying required; the system is built around your actual cleaning routine, not the other way around.",
    scope: { kind: "system", systemId: "urethane-cement" },
  },
  {
    id: "urethane-cement-timeline",
    question: "How long does a urethane cement installation take?",
    answer:
      "It depends on the square footage, whether coved base and drain detail are part of the scope, and how much substrate repair the existing slab needs first. Because these floors usually go into working kitchens or production facilities, we plan the schedule around your actual shutdown window rather than a generic install timeline.",
    scope: { kind: "system", systemId: "urethane-cement" },
  },
  {
    id: "urethane-cement-over-existing",
    question: "Can urethane cement go over an existing floor that's already failing?",
    answer:
      "Yes, once the failed system is removed and the substrate is properly prepped — we don't install a new system over an unresolved problem underneath it. That usually means stripping the old coating, repairing the slab, and moisture-testing before the urethane cement goes down, the same sequence we'd follow for any resinous system.",
    scope: { kind: "system", systemId: "urethane-cement" },
  },
  {
    id: "urethane-cement-moisture",
    question: "Does urethane cement need moisture testing like epoxy does?",
    answer:
      "Yes — moisture testing is treated as non-negotiable across every resinous system we install, urethane cement included. We test the slab before application and address any elevated vapor reading with the appropriate barrier or primer first, the same standard we hold epoxy and polyaspartic installations to.",
    scope: { kind: "system", systemId: "urethane-cement" },
  },

  // ---------------- Seal Systems ----------------
  {
    id: "seal-systems-which-type",
    question: "What's the difference between a penetrating sealer and a film-forming sealer?",
    answer:
      "A penetrating sealer — silane, siloxane, or a densifier — soaks into the slab and protects it without changing the surface look or adding sheen. A film-forming sealer — acrylic, urethane, or epoxy — sits on top of the surface and adds gloss along with a sacrificial wear layer that takes the traffic instead of the concrete underneath. Which one is right depends on your substrate, the traffic it takes, and whether you actually want a sheen change.",
    scope: { kind: "system", systemId: "seal-systems" },
  },
  {
    id: "seal-systems-durability",
    question: "How often does a sealer need to be reapplied?",
    answer:
      "That depends on traffic and exposure, not a fixed calendar date — a low-traffic residential floor and a busy commercial entry wear very differently. We set the reapplication interval based on how the specific floor is actually being used, not a generic maintenance schedule.",
    scope: { kind: "system", systemId: "seal-systems" },
  },
  {
    id: "seal-systems-over-decorative",
    question: "Can you seal a stained or decorative concrete floor I already have?",
    answer:
      "Yes — sealing stained and decorative concrete is one of the most common calls we get. Depending on the space and traffic, that might be a water-based epoxy primer with an aliphatic urethane topcoat for clarity without heavy build, a solvent-based acrylic penetrating sealer with a ceramic-enhanced topcoat for added hardness, an epoxy sealer with a polyaspartic topcoat for fast return to service, or just a penetrating densifier alone if you want a dust-proof, low-sheen look with no film on top at all.",
    scope: { kind: "system", systemId: "seal-systems" },
  },
  {
    id: "seal-systems-maintenance",
    question: "How do I take care of a sealed floor?",
    answer:
      "Routine dust mopping and a neutral-pH cleaner handle most of it. Avoid acidic cleaners and abrasive equipment — they'll dull a film-forming sealer's sheen and can strip a penetrating sealer's protection over time. Beyond that, the maintenance schedule comes down to the traffic your specific floor sees, not a one-size-fits-all routine.",
    scope: { kind: "system", systemId: "seal-systems" },
  },
];

export function getGeneralFAQs(): FAQ[] {
  return faqs.filter((f) => f.scope.kind === "general");
}

export function getFAQsForSystem(systemId: string): FAQ[] {
  return faqs.filter((f) => f.scope.kind === "system" && f.scope.systemId === systemId);
}

export function getFAQsForEnvironment(environment: Environment): FAQ[] {
  return faqs.filter((f) => f.scope.kind === "environment" && f.scope.environment === environment);
}
