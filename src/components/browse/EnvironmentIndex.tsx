import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { environmentCopy } from "@/content/environments";
import { getSector } from "@/content/sectors";
import type { Environment } from "@/content/types";

export function EnvironmentIndex({ environment, sectorIds }: { environment: Environment; sectorIds: string[] }) {
  const copy = environmentCopy[environment];

  return (
    <div>
      <section className="border-b border-warm-white/10 bg-charcoal-900 py-20">
        <Container>
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{copy.navLabel}</p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white sm:text-5xl">
            {copy.label} Flooring
          </h1>
          <p className="mt-4 max-w-xl text-base leading-[1.7] text-warm-white/70">{copy.description}</p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectorIds.map((id) => {
              const sector = getSector(id);
              if (!sector) return null;
              return (
                <Link
                  key={id}
                  href={`/${environment}/${id}`}
                  className="block rounded-md border border-warm-white/10 bg-charcoal-900 p-6 shadow-elevated transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
                >
                  <h2 className="text-lg font-medium text-warm-white">{sector.name}</h2>
                  <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">{sector.description}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
