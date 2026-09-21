import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getProblem } from "@/content/problems";
import { getFloorSystem } from "@/content/floorSystems";

/** The specific things that go wrong in this kind of space, each linked to its explainer and the systems that answer it. */
export function ConcernCards({ concernIds, sectorName }: { concernIds: string[]; sectorName: string }) {
  const concerns = concernIds.map(getProblem).filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (concerns.length === 0) return null;

  return (
    <section className="border-t border-warm-white/10 bg-charcoal-950 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Where Floors Get Tested"
          title={`What a ${sectorName.toLowerCase()} floor has to survive`}
          support="Every space asks something different of its floor. These are the pressures that decide which system belongs here — and what goes wrong when the wrong one goes down."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {concerns.map((c, i) => {
            const systems = c.relevantSystemIds.map(getFloorSystem).filter((s): s is NonNullable<typeof s> => Boolean(s));
            return (
              <Reveal key={c.id} delay={i * 90} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-warm-white/10 bg-charcoal-900 p-6 shadow-elevated transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold-300/40">
                  <span className="text-gold-gradient text-4xl font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-lg font-bold text-warm-white">{c.label}</h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.7] text-warm-white/65">{c.shortDescription}</p>
                  {systems.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {systems.slice(0, 3).map((s) => (
                        <Link
                          key={s.id}
                          href={`/systems/${s.id}`}
                          className="rounded-full border border-warm-white/15 px-2.5 py-1 text-[11px] font-medium text-warm-white/70 transition-colors hover:border-gold-300 hover:text-gold-100"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                  <Link
                    href={`/problems/${c.id}`}
                    className="mt-5 text-xs font-bold tracking-[0.12em] text-gold-300 uppercase transition-transform group-hover:translate-x-0.5"
                  >
                    Read the full breakdown →
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
