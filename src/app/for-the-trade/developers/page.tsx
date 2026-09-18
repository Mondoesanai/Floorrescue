import type { Metadata } from "next";
import { AudiencePage } from "@/components/landing/AudiencePage";
import { getAudience } from "@/content/audiences";

export const metadata: Metadata = {
  title: "Developers & Owners",
  alternates: { canonical: "/for-the-trade/developers" },
};

export default function DevelopersPage() {
  const audience = getAudience("developers-owners")!;
  return <AudiencePage audience={audience} />;
}
