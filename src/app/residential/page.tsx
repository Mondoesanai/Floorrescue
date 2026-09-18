import type { Metadata } from "next";
import { EnvironmentIndex } from "@/components/browse/EnvironmentIndex";
import { residentialSectorIds } from "@/content/sectors";
import { WhoWeWorkWith } from "@/components/residential/WhoWeWorkWith";
import { InteriorSystemsStrip } from "@/components/residential/InteriorSystemsStrip";
import { TradePartnersStrip } from "@/components/residential/TradePartnersStrip";
import { PhotoBanner } from "@/components/ui/PhotoBanner";

export const metadata: Metadata = {
  title: "Residential Flooring",
  description: "Concrete and resinous flooring for interior floors, exteriors, and new-construction homes.",
  alternates: { canonical: "/residential" },
};

export default function ResidentialIndexPage() {
  return (
    <>
      <EnvironmentIndex environment="residential" sectorIds={residentialSectorIds} />
      <WhoWeWorkWith />
      <PhotoBanner
        src="/assets/images/team-photos/project-metallic-white-garage.png"
        alt="A real Floor Rescue metallic epoxy residential floor"
        caption="Real Floor Rescue work — metallic epoxy, residential"
      />
      <InteriorSystemsStrip />
      <TradePartnersStrip />
    </>
  );
}
