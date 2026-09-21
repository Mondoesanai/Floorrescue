import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { StickyQuoteBar } from "@/components/layout/StickyQuoteBar";
import { Footer } from "@/components/layout/Footer";
import { JourneyProvider } from "@/lib/journey/context";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// One-line switch: false returns the flat black look (also tagged in git as before-concrete-theme).
const CONCRETE_THEME = true;

export const metadata: Metadata = {
  metadataBase: new URL("https://floorrescue.com"),
  title: {
    default: "Floor Rescue — Concrete & Resinous Flooring Systems",
    template: "%s | Floor Rescue",
  },
  description:
    "Concrete and resinous flooring systems for homes, commercial spaces, and industrial facilities. The power is in the install.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className={`flex min-h-full flex-col bg-charcoal-950 text-warm-white ${CONCRETE_THEME ? "theme-concrete" : ""}`}>
        <JourneyProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyQuoteBar />
        </JourneyProvider>
      </body>
    </html>
  );
}
