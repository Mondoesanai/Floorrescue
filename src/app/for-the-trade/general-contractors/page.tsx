import type { Metadata } from "next";
import { AudiencePage } from "@/components/landing/AudiencePage";
import { getAudience } from "@/content/audiences";

export const metadata: Metadata = {
  title: "General Contractors",
  alternates: { canonical: "/for-the-trade/general-contractors" },
};

export default function GeneralContractorsPage() {
  const audience = getAudience("general-contractors")!;
  return <AudiencePage audience={audience} />;
}
