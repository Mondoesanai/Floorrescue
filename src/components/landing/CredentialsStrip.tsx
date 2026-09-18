import { Container } from "@/components/ui/Container";

const credentials = [
  {
    title: "USDA / FDA Compliant",
    body: "Seamless, non-porous systems approved for food service, food processing, and commercial kitchen environments.",
  },
  {
    title: "Matrix Certified Applicators",
    body: "Our crews are trained and certified on Matrix Products systems — one of North America's leading resinous flooring manufacturers.",
  },
  {
    title: "Low-VOC & Low-Odor Systems",
    body: "Water-based and low-emission formulations available for occupied buildings, schools, healthcare, and LEED projects.",
  },
  {
    title: "Licensed, Insured & Bonded",
    body: "Fully licensed contractor carrying general liability and workers' comp — certificates of insurance provided on request.",
  },
];

export function CredentialsStrip() {
  return (
    <section className="border-t border-warm-white/10 bg-charcoal-900 py-14">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-bold text-gold-200">{c.title}</p>
              <p className="mt-1.5 text-xs leading-[1.6] text-warm-white/60">{c.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
