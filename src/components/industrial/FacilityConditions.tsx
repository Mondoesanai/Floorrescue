import { Container } from "@/components/ui/Container";

const groups = [
  {
    name: "Manufacturing / Warehousing",
    conditions: ["Forklifts", "Machinery", "Pallet racking", "Dust", "Load", "Abrasion", "Slab damage", "Uptime"],
    systems: ["High-build epoxy", "Urethane cement", "Chemical-resistant epoxy / novolac", "Broadcast systems", "Densification / polishing", "Joint & slab restoration"],
  },
  {
    name: "Food & Beverage",
    conditions: ["Washdown", "Hot water / steam", "Chemical cleaners", "Sanitation", "Drains", "Coved bases", "Slip resistance", "Downtime"],
    systems: ["Urethane cement", "Epoxy", "Broadcast systems", "Resurfacing", "Moisture mitigation"],
  },
  {
    name: "Warehouse / Distribution",
    conditions: ["Forklift traffic", "Racking", "Lighting / reflectivity", "Dust", "Maintenance", "Downtime", "Large-area installation"],
    systems: ["Polished concrete", "Densified concrete", "Sealed concrete", "Epoxy", "Broadcast systems", "Trowel polishing", "Grind & seal"],
  },
  {
    name: "Specialty Facilities",
    conditions: ["ESD-sensitive spaces", "Cold storage", "Pharmaceutical", "Aviation / hangars", "High moisture", "Chemical exposure"],
    systems: ["ESD / static control systems", "Moisture barriers", "Chemical-resistant coatings"],
  },
];

export function FacilityConditions() {
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-16 sm:py-20">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Built Around the Facility</p>
        <h2 className="mt-2 max-w-xl text-balance text-2xl font-bold tracking-[-0.02em] text-warm-white sm:text-3xl">
          Every facility has different conditions to build for.
        </h2>
        <div className="mt-9 grid gap-6 sm:grid-cols-2">
          {groups.map((g) => (
            <div key={g.name} className="rounded-xl border border-warm-white/10 bg-charcoal-950 p-7 shadow-elevated">
              <h3 className="text-lg font-bold text-warm-white">{g.name}</h3>
              <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-warm-white/40 uppercase">What the floor has to survive</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {g.conditions.map((c) => (
                  <span key={c} className="rounded-full border border-warm-white/10 px-2.5 py-1 text-xs text-warm-white/65">
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-warm-white/40 uppercase">Systems we typically bring</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {g.systems.map((s) => (
                  <span key={s} className="rounded-full border border-gold-500/25 bg-gold-500/5 px-2.5 py-1 text-xs text-gold-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
