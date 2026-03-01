import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Hostxeon - Affordable Hosting Pakistan | High-Performance Web Hosting',
  description: 'Hostxeon offers the best affordable hosting in Pakistan with 99.9% uptime, NVMe SSD storage, and free migrations. Start your online journey today!',
  keywords: ['Affordable Hosting Pakistan', 'Best Web Hosting', 'Shared Hosting Pakistan', 'VPS Hosting Pakistan'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hostxeon - Professional Web Hosting Solutions',
    description: 'High-performance, secure, and affordable hosting infrastructure powered by WHMCS.',
    url: 'https://hostxeon.com',
    type: 'website',
  }
};

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
