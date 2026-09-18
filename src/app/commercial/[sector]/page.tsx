import type { Metadata } from "next";
import { SectorLandingPage } from "@/components/landing/SectorLandingPage";
import { commercialSectorIds } from "@/content/sectors";
import { requireSector, sectorMetadata } from "@/lib/sectorPageHelpers";

export function generateStaticParams() {
  return commercialSectorIds.map((sector) => ({ sector }));
}

export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> {
  const { sector } = await params;
  return sectorMetadata(sector, "commercial");
}

export default async function CommercialSectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector: sectorId } = await params;
  const sector = requireSector(sectorId, "commercial");
  return <SectorLandingPage sector={sector} />;
}
