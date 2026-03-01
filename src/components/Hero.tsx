
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rocket, Shield, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-deploy-gradient z-0"></div>
      
      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-white font-headline font-bold text-4xl md:text-5xl lg:text-[56px] leading-tight mb-6 max-w-4xl mx-auto">
          Launch Your Website in Minutes, Not Days
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Deploy Hub provides the lightning-fast, secure, and scalable hosting your business needs to grow. Start today with zero configuration.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-16">
          <Input 
            placeholder="Enter your email address" 
            className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent rounded-lg"
          />
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-medium w-full sm:w-auto h-12 px-8 rounded-lg">
            Start Now
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 text-white/90">
          <div className="flex items-center justify-center gap-3">
            <Zap className="h-6 w-6 text-accent" />
            <span className="font-medium">99.9% Uptime</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-6 w-6 text-accent" />
            <span className="font-medium">Free SSL & Security</span>
          </div>
          <div className="flex items-center justify-center gap-3 col-span-2 md:col-span-1">
            <Rocket className="h-6 w-6 text-accent" />
            <span className="font-medium">Global CDN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
