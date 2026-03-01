import { Metadata } from 'next';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Rocket, Shield, Headphones, Award, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'About Hostxeon - Leading Web Hosting Provider in Pakistan',
  description: 'Learn about Hostxeon\'s mission to provide the world\'s most stable and performant hosting infrastructure in Pakistan and globally.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-48 pb-24 bg-deploy-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-deploy-gradient opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Badge className="bg-accent/20 text-accent border border-accent/30 mb-6 font-bold uppercase tracking-widest text-[10px]">Our Story</Badge>
          <h1 className="text-4xl md:text-7xl font-headline font-bold mb-8">
            Powering the Future <br />
            <span className="text-accent">of Global Web Hosting</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto">
            Hostxeon was founded with a simple mission: to provide developers and business owners with the world's most stable and performant hosting infrastructure.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground leading-tight">
              A commitment to <br />
              <span className="text-primary">Performance and Reliability</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Since our inception, we've invested millions in high-end NVMe storage, tier-3 global data centers, and a proprietary network backbone that ensures your data reaches your users instantly.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-primary/5 w-12 h-12 rounded-2xl flex items-center justify-center text-primary">
                  <Award className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-xl">Top Rated</h4>
                <p className="text-muted-foreground text-sm">Ranked #1 for stability by independent industry benchmarks.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-primary/5 w-12 h-12 rounded-2xl flex items-center justify-center text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-xl">100k+ Users</h4>
                <p className="text-muted-foreground text-sm">Trusted by agencies, creators, and enterprises worldwide.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop" 
                alt="Hostxeon office workspace providing technical support" 
                width={1000} 
                height={800} 
                className="object-cover"
                data-ai-hint="office workspace"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
