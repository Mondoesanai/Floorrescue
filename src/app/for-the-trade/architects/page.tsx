import type { Metadata } from "next";
import { AudiencePage } from "@/components/landing/AudiencePage";
import { getAudience } from "@/content/audiences";

export const metadata: Metadata = {
  title: "Architects & Designers",
  alternates: { canonical: "/for-the-trade/architects" },
};

export default function ArchitectsPage() {
  const audience = getAudience("architects-designers")!;
  return <AudiencePage audience={audience} />;
}
