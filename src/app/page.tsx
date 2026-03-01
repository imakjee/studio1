
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { VPSSection } from "@/components/VPSSection";
import { WordPressSection } from "@/components/WordPressSection";
import { AiWebsiteTool } from "@/components/AiWebsiteTool";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <VPSSection />
        <WordPressSection />
        <AiWebsiteTool />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
