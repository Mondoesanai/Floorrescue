import Link from "next/link";
import { Container } from "@/components/ui/Container";

const columns = [
  {
    title: "Environments",
    links: [
      { href: "/residential", label: "Residential" },
      { href: "/commercial", label: "Commercial" },
      { href: "/industrial", label: "Industrial" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/systems", label: "Floor Systems" },
      { href: "/projects", label: "Projects" },
      { href: "/resources", label: "Resources" },
      { href: "/about", label: "About" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
  {
    title: "For the Trade",
    links: [
      { href: "/for-the-trade/architects", label: "Architects & Designers" },
      { href: "/for-the-trade/builders", label: "Builders & Developers" },
      { href: "/for-the-trade/general-contractors", label: "General Contractors" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-warm-white/10 bg-charcoal-900">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-gold-gradient text-xl font-semibold tracking-[-0.02em]">FLOOR RESCUE</p>
          <p className="mt-3 max-w-xs text-sm leading-[1.7] text-warm-white/60">
            Concrete and resinous flooring systems for homes, commercial spaces, and industrial facilities.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold tracking-[0.2em] text-warm-white/40 uppercase">{col.title}</p>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-warm-white/70 transition-colors hover:text-gold-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-warm-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-warm-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Floor Rescue. All rights reserved.</p>
          <Link href="/quote" className="hover:text-gold-200">
            Request a Quote
          </Link>
        </Container>
      </div>
    </footer>
  );
}
