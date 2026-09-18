import Link from "next/link";
import { Container } from "@/components/ui/Container";

const systems = [
  { id: "polished-concrete", name: "Polished Concrete", copy: "Grind and polish existing slabs to a satin or mirror finish — low maintenance, suited to modern and industrial-style interiors." },
  { id: "stained-concrete", name: "Stained & Sealed Concrete", copy: "Acid and reactive stains create variegated color in the concrete itself, then the surface is sealed for protection and sheen." },
  { id: "concrete-restoration", name: "Concrete Floor Restoration", copy: "Cracked, spalled, pitted, or discolored concrete can be repaired, re-profiled, and restored rather than torn out." },
  { id: "moisture-mitigation", name: "Moisture Barriers & Mitigation", copy: "Moisture vapor transmission causes premature coating and overlay failure — test, diagnose, and mitigate before it's a problem." },
  { id: "metallic-epoxy", name: "Metallic Epoxy", copy: "A decorative resin system with flowing, custom color movement — a genuine design centerpiece, not just a coating." },
  { id: "flake-broadcast", name: "Decorative Broadcast", copy: "Vinyl flake and quartz systems add color, texture, and performance underfoot." },
  { id: "micro-cement", name: "Micro Cement", copy: "A thin, hand-applied cementitious overlay for seamless, contemporary interiors." },
  { id: "polishable-overlays", name: "Self-Leveling / Toppings", copy: "Poured cementitious systems used to flatten, resurface, or create a new finishable wear surface." },
];

export function InteriorSystemsStrip() {
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-16 sm:py-20">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Interior Floor Systems</p>
        <h2 className="mt-2 max-w-xl text-balance text-2xl font-bold tracking-[-0.02em] text-warm-white sm:text-3xl">
          Every system we bring inside a home.
        </h2>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {systems.map((s) => (
            <Link
              key={s.id}
              href={`/systems/${s.id}`}
              className="group block rounded-xl border border-warm-white/10 bg-charcoal-950 p-5 shadow-elevated transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
            >
              <h3 className="text-sm font-bold text-warm-white">{s.name}</h3>
              <p className="mt-2 text-xs leading-[1.6] text-warm-white/60">{s.copy}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.1em] text-gold-300 uppercase">
                View System
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
