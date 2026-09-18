import Link from "next/link";
import { Container } from "@/components/ui/Container";

const families = [
  {
    id: "concrete",
    title: "Concrete Systems",
    description:
      "Polished, stained, and decorative concrete, overlays, micro cement, restoration, and moisture mitigation — working with the slab itself as the finished surface.",
    examples: ["Polished Concrete", "Stained Concrete", "Micro Cement", "Concrete Restoration"],
  },
  {
    id: "resinous",
    title: "Resinous Systems",
    description:
      "Metallic epoxy, urethane cement, polyaspartic, and broadcast systems — an engineered layer built for specific exposure: chemicals, washdown, or heavy traffic.",
    examples: ["Metallic Epoxy", "Urethane Cement", "Polyaspartic", "Flake & Broadcast"],
  },
  {
    id: "service",
    title: "Preparation & Restoration",
    description:
      "Diamond grinding, media blasting, moisture testing, and structural repair — the unglamorous work every finish's performance actually depends on.",
    examples: ["Floor Preparation", "Moisture Mitigation", "Joint & Crack Repair", "New Construction Coordination"],
  },
];

export function ServicesSection() {
  return (
    <section className="border-t border-warm-white/10 py-20 sm:py-24">
      <Container>
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">What We Offer</p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
          Our services
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {families.map((family) => (
            <div
              key={family.id}
              className="flex flex-col rounded-2xl border border-warm-white/10 bg-charcoal-900 p-7 shadow-elevated transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-warm-white">{family.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-[1.7] text-warm-white/70">{family.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {family.examples.map((ex) => (
                  <li key={ex} className="rounded-full border border-warm-white/15 px-3 py-1 text-xs font-medium text-warm-white/60">
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link
          href="/systems"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-200 hover:text-gold-100"
        >
          See every floor system
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      </Container>
    </section>
  );
}
