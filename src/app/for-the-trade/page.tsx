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

const provides = [
  { title: "Technical Documentation", body: "Spec sheets, technical data sheets, and system comparisons for every floor family we install." },
  { title: "Samples & Mockups", body: "Physical samples and on-site mockups under your actual lighting before full production begins — especially for metallic and decorative systems." },
  { title: "Pre-Pour & Substrate Coordination", body: "Slab flatness, joint layout, moisture strategy, and finish expectations set before the concrete ever goes down." },
  { title: "Scheduling & RFIs", body: "Fast-cure system options for tight timelines, direct coordination with other trades, and a dedicated project superintendent on every job." },
];

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
        <p className="mt-4 max-w-2xl text-base leading-[1.7] text-warm-white/70">
          Architects, builders, developers, and general contractors don&apos;t need homeowner language — they need
          slabs, specs, samples, and a schedule that holds. Floor Rescue works directly with your project team from
          specification through installation, on twelve floor system families across residential, commercial, and
          industrial work.
        </p>
        <p className="mt-8 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.01em] text-warm-white">
          &ldquo;We Show Up. We Hit Our Numbers. We Don&apos;t Create Problems.&rdquo;
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

        <div className="mt-16 border-t border-warm-white/10 pt-12">
          <h2 className="text-sm font-semibold tracking-[0.15em] text-gold-300 uppercase">What We Provide</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {provides.map((p) => (
              <div key={p.title} className="rounded-md border border-warm-white/10 bg-charcoal-900 p-5">
                <h3 className="text-base font-bold text-warm-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
      </div>
    </div>
  );
}
