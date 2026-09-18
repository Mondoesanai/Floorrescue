import type { Metadata } from "next";
import { EnvironmentIndex } from "@/components/browse/EnvironmentIndex";
import { industrialSectorIds } from "@/content/sectors";
import { FacilityConditions } from "@/components/industrial/FacilityConditions";
import { PhotoBanner } from "@/components/ui/PhotoBanner";

export const metadata: Metadata = {
  title: "Industrial Flooring",
  description: "Concrete and resinous flooring built for manufacturing, food & beverage, warehousing, and more.",
  alternates: { canonical: "/industrial" },
};

export default function IndustrialIndexPage() {
  return (
    <>
      <EnvironmentIndex environment="industrial" sectorIds={industrialSectorIds} />
      <PhotoBanner
        src="/assets/images/team-photos/project-industrial-warehouse-polished.png"
        alt="A large polished concrete warehouse floor, a real Floor Rescue industrial project"
        caption="Real Floor Rescue work — industrial warehouse floor"
      />
      <FacilityConditions />
    </>
  );
}
