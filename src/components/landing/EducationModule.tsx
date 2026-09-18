import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Resource } from "@/content/types";

export function EducationModule({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) return null;

  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-16">
      <Container>
        <SectionHeading eyebrow="Worth Knowing" title="Why floors fail — and how to avoid it" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {resources.map((resource) => (
            <Link
              key={resource.id}
              href={`/resources/${resource.slug}`}
              className="block rounded-md border border-warm-white/10 bg-charcoal-950/60 p-5 transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
            >
              <p className="text-xs font-semibold tracking-[0.15em] text-gold-300 uppercase">{resource.category}</p>
              <h3 className="mt-2 text-lg font-medium text-warm-white">{resource.title}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">{resource.summary}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
