import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Explore Floor Rescue",
  description: "Browse Floor Rescue by environment, floor system, project, resource, or professional audience.",
  alternates: { canonical: "/explore" },
};

const sections = [
  {
    title: "By Environment",
    links: [
      { href: "/residential", label: "Residential" },
      { href: "/commercial", label: "Commercial" },
      { href: "/industrial", label: "Industrial" },
    ],
  },
  {
    title: "By Topic",
    links: [
      { href: "/systems", label: "Floor Systems" },
      { href: "/problems", label: "Problems / Restoration" },
      { href: "/projects", label: "Projects" },
      { href: "/resources", label: "Education / Resources" },
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
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/quote", label: "Request a Quote" },
    ],
  },
];

export default function ExplorePage() {
  return (
    <div className="py-16">
      <Container>
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Explore Floor Rescue</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] text-warm-white sm:text-5xl">
          Browse everything, no guided questions.
        </h1>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="text-sm font-semibold tracking-[0.2em] text-warm-white/40 uppercase">{section.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-base text-warm-white/75 hover:text-gold-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
    </div>
  );
}
