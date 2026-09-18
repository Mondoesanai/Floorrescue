import type { Metadata } from "next";
import { EnvironmentIndex } from "@/components/browse/EnvironmentIndex";
import { commercialSectorIds } from "@/content/sectors";

export const metadata: Metadata = {
  title: "Commercial Flooring",
  description: "Concrete and resinous flooring systems for retail, restaurants, offices, hospitality, and more.",
  alternates: { canonical: "/commercial" },
};

export default function CommercialIndexPage() {
  return <EnvironmentIndex environment="commercial" sectorIds={commercialSectorIds} />;
}
