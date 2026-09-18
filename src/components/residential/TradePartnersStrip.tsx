import { Container } from "@/components/ui/Container";
import { residentialBuilders, residentialArchitects } from "@/content/residentialPartners";

export function TradePartnersStrip() {
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-950 py-16 sm:py-20">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Who We&apos;ve Worked Alongside</p>
        <h2 className="mt-2 max-w-xl text-balance text-2xl font-bold tracking-[-0.02em] text-warm-white sm:text-3xl">
          Builders and architects Floor Rescue has partnered with.
        </h2>
        <div className="mt-9 grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-warm-white/40 uppercase">Builders</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-warm-white/70">
              {residentialBuilders.map((b) => (
                <li key={b} className="rounded-full border border-warm-white/10 px-3 py-1.5">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-warm-white/40 uppercase">Architects & Designers</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-warm-white/70">
              {residentialArchitects.map((a) => (
                <li key={a} className="rounded-full border border-warm-white/10 px-3 py-1.5">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
