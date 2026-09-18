import type { Metadata } from "next";
import { AudiencePage } from "@/components/landing/AudiencePage";
import { getAudience } from "@/content/audiences";

export const metadata: Metadata = {
  title: "Builders & Developers",
  alternates: { canonical: "/for-the-trade/builders" },
};

export default function BuildersPage() {
  const audience = getAudience("builders-developers")!;
  return <AudiencePage audience={audience} />;
}
