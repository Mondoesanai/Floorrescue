import { Reveal } from "@/components/ui/Reveal";

const points = [
  ["We start with conditions", "Every slab is different. Existing conditions decide prep, repair, moisture strategy, system, and finish — before anything is proposed."],
  ["We understand the whole system", "Prep, primer, build coat, design layer, topcoat, cure, maintenance. Not just the material in the bucket."],
  ["Concrete and coatings, both", "We're not boxed into one product. Sometimes the concrete itself is the floor; sometimes a resinous system goes on top."],
  ["We speak to the whole project team", "Homeowner, designer, builder, GC, architect, facility operator — the conversation changes, the standard doesn't."],
  ["Restoration before replacement", "When it makes sense, an existing slab can be repaired, restored, polished, overlaid, or coated instead of torn out."],
  ["We show up and hit our numbers", "On schedule, coordinated with other trades, no surprises mid-project."],
];

export function WhyFloorRescue() {
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Why Floor Rescue</p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
          The floor starts with the slab.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {points.map(([t, b], i) => (
            <Reveal key={t} delay={i * 70}>
              <div className="h-full rounded-2xl border border-warm-white/10 bg-charcoal-950 p-6 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-300/40">
                <span className="text-gold-gradient text-2xl font-bold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-base font-bold text-warm-white">{t}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-warm-white/60">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
