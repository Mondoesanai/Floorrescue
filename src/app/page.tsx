import Link from "next/link";
import { ImmersiveJourney } from "@/components/immersive/ImmersiveJourney";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { commercialSectorIds, industrialSectorIds, residentialSectorIds, getSector } from "@/content/sectors";

export default function Home() {
  return (
    <div>
      <ImmersiveJourney />

      {/* Crawlable summary + real links — never relies on the client-only cinematic
          state for essential content or navigation, per implementation/seo-and-directory.md. */}
      <section className="border-t border-warm-white/10 bg-charcoal-900 py-20">
        <Container>
          <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Who We Are</p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.02em] text-warm-white sm:text-4xl">
            We are Floor Rescue — a concrete and resinous flooring company built on decades in the trade.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-warm-white/70">
            We work across residential, commercial, and industrial spaces, and every recommendation starts the same
            way: the slab, the space, and what the floor actually needs to survive.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-warm-white/70">
            Ready to start? Choose My Home, My Business, or My Facility above and we&apos;ll walk you straight to a
            plan built for your space — or request a quote any time and tell us directly.
          </p>
          <Button href="/quote" className="mt-6">
            Request a Quote
          </Button>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <nav aria-label="Residential spaces">
              <h3 className="text-sm font-semibold tracking-wide text-warm-white uppercase">Residential</h3>
              <ul className="mt-3 space-y-2">
                {residentialSectorIds.map((id) => {
                  const sector = getSector(id);
                  if (!sector) return null;
                  return (
                    <li key={id}>
                      <Link href={`/residential/${id}`} className="text-sm text-warm-white/70 hover:text-gold-200">
                        {sector.shortLabel}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <nav aria-label="Commercial spaces">
              <h3 className="text-sm font-semibold tracking-wide text-warm-white uppercase">Commercial</h3>
              <ul className="mt-3 space-y-2">
                {commercialSectorIds.slice(0, 5).map((id) => {
                  const sector = getSector(id);
                  if (!sector) return null;
                  return (
                    <li key={id}>
                      <Link href={`/commercial/${id}`} className="text-sm text-warm-white/70 hover:text-gold-200">
                        {sector.shortLabel}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <nav aria-label="Industrial facilities">
              <h3 className="text-sm font-semibold tracking-wide text-warm-white uppercase">Industrial</h3>
              <ul className="mt-3 space-y-2">
                {industrialSectorIds.slice(0, 5).map((id) => {
                  const sector = getSector(id);
                  if (!sector) return null;
                  return (
                    <li key={id}>
                      <Link href={`/industrial/${id}`} className="text-sm text-warm-white/70 hover:text-gold-200">
                        {sector.shortLabel}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </Container>
      </section>
    </div>
  );
}
