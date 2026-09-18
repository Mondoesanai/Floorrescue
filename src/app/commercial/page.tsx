import type { Metadata } from "next";
import { EnvironmentIndex } from "@/components/browse/EnvironmentIndex";
import { commercialSectorIds } from "@/content/sectors";
import { PhotoBanner } from "@/components/ui/PhotoBanner";

export const metadata: Metadata = {
  title: "Commercial Flooring",
  description: "Concrete and resinous flooring systems for retail, restaurants, offices, hospitality, and more.",
  alternates: { canonical: "/commercial" },
};

export default function CommercialIndexPage() {
  return (
    <>
      <EnvironmentIndex environment="commercial" sectorIds={commercialSectorIds} />
      <PhotoBanner
        src="/assets/images/team-photos/project-mclaren-garage.png"
        alt="A real Floor Rescue metallic epoxy commercial floor"
        caption="Real Floor Rescue work — metallic epoxy"
      />
    </>
  );
}
