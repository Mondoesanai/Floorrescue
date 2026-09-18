import type { Metadata } from "next";
import { EnvironmentIndex } from "@/components/browse/EnvironmentIndex";
import { residentialSectorIds } from "@/content/sectors";

export const metadata: Metadata = {
  title: "Residential Flooring",
  description: "Concrete and resinous flooring for interior floors, exteriors, and new-construction homes.",
  alternates: { canonical: "/residential" },
};

export default function ResidentialIndexPage() {
  return <EnvironmentIndex environment="residential" sectorIds={residentialSectorIds} />;
}
