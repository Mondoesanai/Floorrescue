import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/explore", label: "Explore Floor Rescue", description: "Browse the entire site without the guided journey." },
  { href: "/residential", label: "Residential", description: "Homes, estates, and new-construction floors." },
  { href: "/commercial", label: "Commercial", description: "Retail, restaurants, offices, hospitality, and more." },
  { href: "/industrial", label: "Industrial", description: "Manufacturing, food & beverage, warehousing, and more." },
  { href: "/systems", label: "Floor Systems", description: "Every concrete and resinous system we install." },
  { href: "/projects", label: "Projects", description: "Real Floor Rescue project history." },
  { href: "/resources", label: "Resources", description: "Education on how the trade actually works." },
  { href: "/testimonials", label: "Testimonials", description: "What real clients say about the work." },
  { href: "/for-the-trade", label: "For the Trade", description: "Architects, builders, developers, and GCs." },
  { href: "/about", label: "About", description: "Built from the jobsite up." },
];

export function ExploreEverything() {
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-950 py-20 sm:py-24">
      <Container>
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">Everywhere Else On The Site</p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-bold tracking-[-0.02em] text-warm-white sm:text-4xl">
          Find anything, from anywhere
        </h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col rounded-xl border border-warm-white/10 bg-charcoal-900 p-5 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
            >
              <span className="text-sm font-bold text-warm-white">{link.label}</span>
              <span className="mt-1.5 flex-1 text-xs leading-[1.6] text-warm-white/55">{link.description}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.1em] text-gold-300 uppercase">
                Go
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/quote">Request a Quote</Button>
        </div>
      </Container>
    </section>
  );
}
