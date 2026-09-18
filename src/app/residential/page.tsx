import type { Metadata } from "next";
import { EnvironmentIndex } from "@/components/browse/EnvironmentIndex";
import { residentialSectorIds } from "@/content/sectors";
import { WhoWeWorkWith } from "@/components/residential/WhoWeWorkWith";
import { InteriorSystemsStrip } from "@/components/residential/InteriorSystemsStrip";
import { TradePartnersStrip } from "@/components/residential/TradePartnersStrip";
import Image from "next/image";

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
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
        {[
          { src: "/assets/images/team-photos/project-residential-kitchen-polished.png", alt: "A polished concrete kitchen floor in a real Floor Rescue residential project" },
          { src: "/assets/images/team-photos/project-residential-home-office.png", alt: "A polished concrete home office floor" },
          { src: "/assets/images/team-photos/project-residential-slide-polished.png", alt: "A polished concrete floor in a home with a play slide" },
        ].map((photo) => (
          <div key={photo.src} className="relative aspect-[4/3] overflow-hidden">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>
      <InteriorSystemsStrip />
      <TradePartnersStrip />
    </>
  );
}
