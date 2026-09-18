import type { Metadata } from "next";
import { SectorLandingPage } from "@/components/landing/SectorLandingPage";
import { residentialSectorIds } from "@/content/sectors";
import { requireSector, sectorMetadata } from "@/lib/sectorPageHelpers";

export function generateStaticParams() {
  return residentialSectorIds.map((space) => ({ space }));
}

export async function generateMetadata({ params }: { params: Promise<{ space: string }> }): Promise<Metadata> {
  const { space } = await params;
  return sectorMetadata(space, "residential");
}

export default async function ResidentialSpacePage({ params }: { params: Promise<{ space: string }> }) {
  const { space } = await params;
  const sector = requireSector(space, "residential");
  return <SectorLandingPage sector={sector} />;
}
