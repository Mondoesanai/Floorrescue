import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problems } from "@/content/problems";

export const metadata: Metadata = {
  title: "Floor Problems & Restoration",
  description: "Common flooring problems Floor Rescue diagnoses and solves — moisture, washdown, failed coatings, and more.",
  alternates: { canonical: "/problems" },
};

export default function ProblemsIndexPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionHeading eyebrow="Floor Problems / Restoration" title="Tell us what's going wrong" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              href={`/problems/${problem.id}`}
              className="block rounded-md border border-warm-white/10 bg-charcoal-900 p-5 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-gold-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
            >
              <h2 className="text-base font-medium text-warm-white">{problem.label}</h2>
              <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">{problem.shortDescription}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
