import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { residentialSectorIds, commercialSectorIds, industrialSectorIds, getSector } from "@/content/sectors";

const rows = [
  {
    environment: "residential" as const,
    label: "My Home",
    title: "Residential",
    description: "Interior floors, exteriors, and new-construction homes — built to look incredible and hold up.",
    image: "/assets/images/card-residential.jpg",
    sectorIds: residentialSectorIds,
  },
  {
    environment: "commercial" as const,
    label: "My Business",
    title: "Commercial",
    description: "Retail, restaurants, offices, hospitality, healthcare, and more — a floor built for how the space runs.",
    image: "/assets/images/card-commercial.jpg",
    sectorIds: commercialSectorIds,
  },
  {
    environment: "industrial" as const,
    label: "My Facility",
    title: "Industrial",
    description: "Manufacturing, food & beverage, warehousing, and other facilities — engineered for what the floor has to survive.",
    image: "/assets/images/card-industrial.jpg",
    sectorIds: industrialSectorIds,
  },
];

export function FindYourSpaceSection() {
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-20 sm:py-24">
      <Container>
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Find What You&apos;re Looking For</p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
          Every environment, one system
        </h2>

        <div className="mt-12 space-y-6">
          {rows.map((row, i) => {
            const photo = (
              <div className="deboss group/photo relative h-64 w-full overflow-hidden rounded-xl lg:h-auto lg:min-h-[22rem] lg:rounded-none">
                <Image
                  src={row.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent" />
              </div>
            );
            const content = (
              <div className="p-6 sm:p-10">
                <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{row.label}</p>
                <h3 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-warm-white">{row.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-[1.7] text-warm-white/70">{row.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {row.sectorIds.map((id) => {
                    const sector = getSector(id);
                    if (!sector) return null;
                    return (
                      <Link
                        key={id}
                        href={`/${row.environment}/${id}`}
                        className="rounded-full border border-warm-white/15 px-3.5 py-1.5 text-xs font-medium text-warm-white/75 transition-colors hover:border-gold-300 hover:text-gold-100"
                      >
                        {sector.shortLabel}
                      </Link>
                    );
                  })}
                </div>
                <Button href={`/${row.environment}`} variant="secondary" className="mt-6">
                  Explore {row.title}
                </Button>
              </div>
            );
            return (
              <div
                key={row.environment}
                className="grid items-center gap-8 rounded-2xl border border-warm-white/10 bg-charcoal-950 p-3 shadow-elevated lg:grid-cols-2 lg:gap-0 lg:p-0"
              >
                {i % 2 === 1 ? (
                  <>
                    <div className="lg:order-2 lg:rounded-r-2xl lg:[&>div]:rounded-r-2xl">{photo}</div>
                    <div className="lg:order-1">{content}</div>
                  </>
                ) : (
                  <>
                    <div className="lg:rounded-l-2xl lg:[&>div]:rounded-l-2xl">{photo}</div>
                    {content}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
