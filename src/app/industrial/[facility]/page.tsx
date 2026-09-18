import type { Metadata } from "next";
import { SectorLandingPage } from "@/components/landing/SectorLandingPage";
import { industrialSectorIds } from "@/content/sectors";
import { requireSector, sectorMetadata } from "@/lib/sectorPageHelpers";

export function generateStaticParams() {
  return industrialSectorIds.map((facility) => ({ facility }));
}

export async function generateMetadata({ params }: { params: Promise<{ facility: string }> }): Promise<Metadata> {
  const { facility } = await params;
  return sectorMetadata(facility, "industrial");
}

export default async function IndustrialFacilityPage({ params }: { params: Promise<{ facility: string }> }) {
  const { facility } = await params;
  const sector = requireSector(facility, "industrial");
  return <SectorLandingPage sector={sector} />;
}
