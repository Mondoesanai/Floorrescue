import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getResourcesByIds } from "@/content/resources";
import type { ProfessionalAudience } from "@/content/types";

export function AudiencePage({ audience }: { audience: ProfessionalAudience }) {
  const resources = getResourcesByIds(audience.relevantResourceIds);

  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">For the Trade</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white">{audience.name}</h1>
        <p className="text-gold-gradient mt-2 text-xl font-medium">{audience.positioningLine}</p>
        <p className="mt-5 text-base leading-[1.7] text-warm-white/75">{audience.description}</p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {audience.focus.map((item) => (
            <li key={item} className="rounded-md border border-warm-white/10 bg-charcoal-900 px-4 py-3 text-sm text-warm-white/75">
              {item}
            </li>
          ))}
        </ul>

        {resources.length ? (
          <div className="mt-10">
            <h2 className="text-sm font-semibold tracking-[0.15em] text-gold-300 uppercase">Related Resources</h2>
            <ul className="mt-3 space-y-2">
              {resources.map((r) => (
                <li key={r.id} className="text-sm text-warm-white/70">
                  {r.title}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Button href="/quote" className="mt-10">
          Request a Quote
        </Button>
      </Container>
    </div>
  );
}
