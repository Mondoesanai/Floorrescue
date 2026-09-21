import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { sectors } from "@/content/sectors";
import type { Sector } from "@/content/types";

/** Cross-links to the other spaces in the same environment so nobody hits a dead end. */
export function RelatedSpaces({ sector }: { sector: Sector }) {
  const others = sectors.filter((s) => s.environment === sector.environment && s.id !== sector.id && !s.legacy);
  if (others.length === 0) return null;
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-950 py-16">
      <Container>
        <SectionHeading eyebrow="Not Quite Your Space?" title={`Other ${sector.environment} spaces we work in`} />
        <Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.id}
                href={`/${s.environment}/${s.id}`}
                className="group rounded-xl border border-warm-white/10 bg-charcoal-900 p-4 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-gold-300/50"
              >
                <p className="text-sm font-bold text-warm-white group-hover:text-gold-100">{s.name}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-[1.6] text-warm-white/50">{s.description}</p>
              </Link>
            ))}
          </div>
        </Reveal>
        <Link href={`/${sector.environment}`} className="mt-6 inline-flex text-sm font-semibold text-gold-200 hover:text-gold-100">
          See all {sector.environment} spaces →
        </Link>
      </Container>
    </section>
  );
}
