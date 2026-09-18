import type { Metadata } from "next";
import { EnvironmentIndex } from "@/components/browse/EnvironmentIndex";
import { commercialSectorIds } from "@/content/sectors";
import { PhotoBanner } from "@/components/ui/PhotoBanner";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { getFAQsForEnvironment, getGeneralFAQs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Commercial Flooring",
  description: "Concrete and resinous flooring systems for retail, restaurants, offices, hospitality, and more.",
  alternates: { canonical: "/commercial" },
};

export default function CommercialIndexPage() {
  const faqs = [...getGeneralFAQs(), ...getFAQsForEnvironment("commercial")];

  return (
    <>
      <EnvironmentIndex environment="commercial" sectorIds={commercialSectorIds} />
      <PhotoBanner
        src="/assets/images/team-photos/project-mclaren-garage.png"
        alt="A real Floor Rescue metallic epoxy commercial floor"
        caption="Real Floor Rescue work — metallic epoxy"
      />
      {faqs.length ? (
        <div className="py-16">
          <Container>
            <SectionHeading
              eyebrow="Common Questions"
              title="Commercial flooring — frequently asked questions"
            />
            <div className="mt-8">
              <FAQAccordion faqs={faqs} />
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
}
