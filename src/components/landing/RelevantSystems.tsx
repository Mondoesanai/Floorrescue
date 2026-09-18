import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFloorSystems } from "@/content/floorSystems";
import type { Environment } from "@/content/types";

export function RelevantSystems({ systemIds, environment }: { systemIds: string[]; environment: Environment }) {
  const systems = getFloorSystems(systemIds);
  if (systems.length === 0) return null;

  return (
    <section id="relevant-systems" className="border-t border-warm-white/10 bg-charcoal-900 py-16">
      <Container>
        <SectionHeading eyebrow="Relevant System Families" title="Floor systems that fit this kind of space" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((system) => (
            <div
              key={system.id}
              className="rounded-md border border-warm-white/10 bg-charcoal-950/60 p-5 shadow-elevated transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
            >
              <p className="text-xs font-semibold tracking-[0.15em] text-gold-300 uppercase">{system.family}</p>
              <h3 className="mt-2 text-lg font-medium text-warm-white">{system.name}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">
                {system.summaryByAudience[environment] ?? system.summaryByAudience.trade}
              </p>
              {system.claimsStatus === "needs-review" ? (
                <p className="mt-2 text-xs text-warm-white/35">Exact performance figures confirmed on request.</p>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-warm-white/40">
          This is a starting point, not a diagnosis — Floor Rescue confirms the right system after evaluating the
          slab and the space.
        </p>
      </Container>
    </section>
  );
}
