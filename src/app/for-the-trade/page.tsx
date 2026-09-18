import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { audiences } from "@/content/audiences";
import { PhotoBanner } from "@/components/ui/PhotoBanner";

export const metadata: Metadata = {
  title: "For the Trade",
  description: "Resources for architects, designers, builders, developers, and general contractors working with Floor Rescue.",
  alternates: { canonical: "/for-the-trade" },
};

const slugs: Record<string, string> = {
  "architects-designers": "architects",
  "builders-developers": "builders",
  "general-contractors": "general-contractors",
  "developers-owners": "developers",
};

export default function ForTheTradeIndexPage() {
  return (
    <div>
      <PhotoBanner
        src="/assets/images/team-photos/crew-jobsite-trailer.png"
        alt="Floor Rescue on an active jobsite"
        caption="On site, on schedule"
      />
      <div className="py-16">
      <Container>
        <SectionHeading eyebrow="For the Trade" title="Built for how you actually work" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <Link
              key={audience.id}
              href={`/for-the-trade/${slugs[audience.id]}`}
              className="block rounded-md border border-warm-white/10 bg-charcoal-900 p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-gold-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
            >
              <h2 className="text-lg font-medium text-warm-white">{audience.name}</h2>
              <p className="text-gold-gradient mt-1 text-sm font-medium">{audience.positioningLine}</p>
              <p className="mt-3 text-sm leading-[1.7] text-warm-white/65">{audience.description}</p>
            </Link>
          ))}
        </div>
      </Container>
      </div>
    </div>
  );
}
