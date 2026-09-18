import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { floorSystems } from "@/content/floorSystems";

export const metadata: Metadata = {
  title: "Floor Systems",
  description: "Concrete and resinous floor system families — polished concrete, micro cement, urethane cement, and more.",
  alternates: { canonical: "/systems" },
};

const families = ["concrete", "resinous"] as const;
const familyLabel: Record<(typeof families)[number], string> = {
  concrete: "Concrete / Cementitious",
  resinous: "Resinous / Coatings",
};

export default function SystemsIndexPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionHeading eyebrow="Floor Systems" title="Every system Floor Rescue installs, by family" />
        {families.map((family) => (
          <div key={family} className="mt-12">
            <h2 className="text-sm font-semibold tracking-[0.2em] text-gold-300 uppercase">{familyLabel[family]}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {floorSystems
                .filter((s) => s.family === family)
                .map((system) => (
                  <Link
                    key={system.id}
                    href={`/systems/${system.id}`}
                    className="block rounded-md border border-warm-white/10 bg-charcoal-900 p-5 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-gold-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
                  >
                    <h3 className="text-base font-medium text-warm-white">{system.name}</h3>
                    <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">
                      {system.summaryByAudience.trade ?? system.summaryByAudience.commercial ?? system.applications.join(", ")}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
