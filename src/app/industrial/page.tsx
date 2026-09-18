import type { Metadata } from "next";
import { EnvironmentIndex } from "@/components/browse/EnvironmentIndex";
import { industrialSectorIds } from "@/content/sectors";

export const metadata: Metadata = {
  title: "Industrial Flooring",
  description: "Concrete and resinous flooring built for manufacturing, food & beverage, warehousing, and more.",
  alternates: { canonical: "/industrial" },
};

export default function IndustrialIndexPage() {
  return <EnvironmentIndex environment="industrial" sectorIds={industrialSectorIds} />;
}
