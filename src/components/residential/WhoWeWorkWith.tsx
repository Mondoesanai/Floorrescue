import { Container } from "@/components/ui/Container";

const groups = [
  {
    name: "Homeowners",
    copy: "You want floors that look incredible and hold up. Floor Rescue brings many of the same systems used in demanding commercial environments into the home — without treating the residential project like an afterthought.",
  },
  {
    name: "Builders & Contractors",
    copy: "New construction and remodel flooring requires coordination with the slab, the schedule, other trades, and the design intent — not a flooring crew that shows up disconnected from the rest of the build.",
  },
  {
    name: "Architects & Interior Designers",
    copy: "Floor Rescue can work from an existing specification, or support system selection, samples, technical data, and mockups when the spec is still being developed.",
  },
  {
    name: "General Contractors",
    copy: "Floor Rescue coordinates flooring scope with the project schedule and the substrate conditions it's actually inheriting — not a fixed date that ignores what the slab is doing.",
  },
];

export function WhoWeWorkWith() {
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-950 py-16 sm:py-20">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Who We Work With</p>
        <h2 className="mt-2 max-w-xl text-balance text-2xl font-bold tracking-[-0.02em] text-warm-white sm:text-3xl">
          Homeowners, builders, and the design teams they work with.
        </h2>
        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.name} className="rounded-xl border border-warm-white/10 bg-charcoal-900 p-6 shadow-elevated">
              <h3 className="text-base font-bold text-warm-white">{g.name}</h3>
              <p className="mt-2.5 text-sm leading-[1.7] text-warm-white/65">{g.copy}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
