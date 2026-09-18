import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resourceCategories, resources } from "@/content/resources";
import { PhotoBanner } from "@/components/ui/PhotoBanner";

export const metadata: Metadata = {
  title: "Education & Resources",
  description: "Concrete fundamentals, resinous systems, why floors fail, and other Floor Rescue education resources.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesIndexPage() {
  return (
    <div>
      <PhotoBanner
        src="/assets/images/team-photos/crew-metallic-blue-application.png"
        alt="A Floor Rescue crew member applying a metallic epoxy system"
        caption="The knowledge behind the install"
      />
      <div className="py-16">
      <Container>
        <SectionHeading eyebrow="Education / Resources" title="Learn how the trade actually works" />
        {resourceCategories.map((category) => {
          const inCategory = resources.filter((r) => r.category === category);
          if (inCategory.length === 0) return null;
          return (
            <div key={category} className="mt-12">
              <h2 className="text-sm font-semibold tracking-[0.2em] text-gold-300 uppercase">{category}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {inCategory.map((resource) => (
                  <Link
                    key={resource.id}
                    href={`/resources/${resource.slug}`}
                    className="block rounded-md border border-warm-white/10 bg-charcoal-900 p-5 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-gold-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
                  >
                    <h3 className="text-base font-medium text-warm-white">{resource.title}</h3>
                    <p className="mt-2 text-sm leading-[1.7] text-warm-white/65">{resource.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </Container>
      </div>
    </div>
  );
}
