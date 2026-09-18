import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CredentialsStrip } from "@/components/landing/CredentialsStrip";
import { environmentCopy } from "@/content/environments";
import { getSector } from "@/content/sectors";
import { getEnvironmentPoster } from "@/lib/video/registry";
import type { Environment } from "@/content/types";

export function EnvironmentIndex({ environment, sectorIds }: { environment: Environment; sectorIds: string[] }) {
  const copy = environmentCopy[environment];

  return (
    <div>
      <section className="relative flex min-h-[55svh] items-end overflow-hidden bg-charcoal-950">
        <Image src={getEnvironmentPoster(environment)} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/55 to-charcoal-950/15" />
        <Container className="relative z-10 pb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{copy.navLabel}</p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-bold tracking-[-0.03em] text-warm-white sm:text-5xl">
            {copy.label} Flooring
          </h1>
          <p className="mt-4 max-w-xl text-base leading-[1.7] text-warm-white/80">{copy.description}</p>
          <Button href="/quote" className="mt-6">
            Request a Quote
          </Button>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mb-8 max-w-xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Select a Card</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-warm-white sm:text-3xl">
              What are you interested in?
            </h2>
            <p className="mt-2 text-sm text-warm-white/60">
              Press the one closest to your space — it opens straight into what we do there.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectorIds.map((id) => {
              const sector = getSector(id);
              if (!sector) return null;
              return (
                <Link
                  key={id}
                  href={`/${environment}/${id}`}
                  className="group block rounded-xl border border-warm-white/10 bg-charcoal-900 p-6 shadow-elevated transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
                >
                  <h3 className="text-lg font-bold text-warm-white">{sector.name}</h3>
                  <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">{sector.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.1em] text-gold-300 uppercase">
                    Select
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {environment !== "residential" ? <CredentialsStrip /> : null}
    </div>
  );
}
