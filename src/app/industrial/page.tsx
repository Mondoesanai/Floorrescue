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
        src="/assets/images/team-photos/crew-jobsite-trailer.png"
        alt="The Floor Rescue crew and jobsite trailer on an active installation"
        caption="On site — the Floor Rescue crew"
      />
      <FacilityConditions />
    </>
  );
}
