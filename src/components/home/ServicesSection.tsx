import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const families = [
  {
    id: "concrete",
    title: "Concrete Systems",
    description:
      "Polished, stained, and decorative concrete, overlays, micro cement, restoration, and moisture mitigation — working with the slab itself as the finished surface.",
    examples: ["Polished Concrete", "Stained Concrete", "Micro Cement", "Concrete Restoration"],
    image: "/assets/images/04-commercial-ground-floor-lobby.jpg",
    href: "/systems",
  },
  {
    id: "resinous",
    title: "Resinous Systems",
    description:
      "Metallic epoxy, urethane cement, polyaspartic, and broadcast systems — an engineered layer built for specific exposure: chemicals, washdown, or heavy traffic.",
    examples: ["Metallic Epoxy", "Urethane Cement", "Polyaspartic", "Flake & Broadcast"],
    image: "/assets/images/team-photos/project-mclaren-garage.png",
    href: "/systems",
  },
  {
    id: "service",
    title: "Preparation & Restoration",
    description:
      "Diamond grinding, media blasting, moisture testing, and structural repair — the unglamorous work every finish's performance actually depends on.",
    examples: ["Floor Preparation", "Moisture Mitigation", "Joint & Crack Repair", "New Construction Coordination"],
    image: "/assets/images/team-photos/crew-troweling-floor.png",
    href: "/systems/floor-preparation",
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
            <Link
              key={family.id}
              href={family.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-warm-white/10 bg-charcoal-900 shadow-elevated transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={family.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-bold text-warm-white">{family.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-[1.7] text-warm-white/70">{family.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {family.examples.map((ex) => (
                    <li key={ex} className="rounded-full border border-warm-white/15 px-3 py-1 text-xs font-medium text-warm-white/60">
                      {ex}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.1em] text-gold-300 uppercase">
                  More Information
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
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

        <div className="mt-16 border-t border-warm-white/10 pt-12 text-center">
          <p className="mx-auto max-w-2xl text-balance text-2xl font-semibold tracking-[-0.01em] text-warm-white sm:text-3xl">
            &ldquo;The power is in the install. And no one installs like Floor Rescue.&rdquo;
          </p>
        </div>
      </Container>
    </section>
  );
}
