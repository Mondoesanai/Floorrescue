import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoBanner } from "@/components/ui/PhotoBanner";
import { Marquee } from "@/components/ui/Marquee";
import { FilterBrowser, type BrowserItem } from "@/components/browse/FilterBrowser";
import { resourceCategories, resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Education & Resources",
  description: "Concrete fundamentals, resinous systems, why floors fail, and other Floor Rescue education resources.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesIndexPage() {
  const items: BrowserItem[] = resources.map((r) => ({
    id: r.id,
    href: `/resources/${r.slug}`,
    title: r.title,
    meta: r.category,
    summary: r.summary,
    group: r.category,
  }));
  const groups = resourceCategories.filter((c) => resources.some((r) => r.category === c)).map((c) => ({ id: c, label: c }));

  return (
    <div>
      <PhotoBanner
        src="/assets/images/team-photos/crew-metallic-blue-application.png"
        alt="A Floor Rescue crew member applying a metallic epoxy system"
        caption="The knowledge behind the install"
      />
      <Marquee items={resourceCategories as unknown as string[]} seconds={45} />
      <div className="py-16">
        <Container>
          <SectionHeading eyebrow="Education / Resources" title="Learn how the trade actually works" />
          <div className="mt-8">
            <FilterBrowser items={items} groups={groups} searchLabel="Search articles — e.g. moisture, polished, epoxy" cta="Read" />
          </div>
        </Container>
      </div>
    </div>
  );
}
