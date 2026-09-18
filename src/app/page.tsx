import { ImmersiveJourney } from "@/components/immersive/ImmersiveJourney";
import { WhoWeAreSection } from "@/components/home/WhoWeAreSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FindYourSpaceSection } from "@/components/home/FindYourSpaceSection";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { ExploreEverything } from "@/components/home/ExploreEverything";

export default function Home() {
  return (
    <div>
      <ImmersiveJourney />

      {/* Crawlable content below the immersive hero — never relies on the
          client-only cinematic state for essential content or navigation,
          per implementation/seo-and-directory.md. */}
      <WhoWeAreSection />
      <ClientMarquee />
      <ServicesSection />
      <FindYourSpaceSection />
      <TestimonialsPreview />
      <ExploreEverything />
    </div>
  );
}
