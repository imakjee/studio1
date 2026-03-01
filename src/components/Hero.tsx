"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Headphones, RefreshCcw, Search, LayoutGrid, Globe, Cloud, Zap, Server, Mail } from "lucide-react";

export function Hero() {
  const categories = [
    { name: "Shared Hosting", icon: <LayoutGrid className="h-5 w-5" /> },
    { name: "Website Builder", icon: <Globe className="h-5 w-5" /> },
    { name: "Cloud Hosting", icon: <Cloud className="h-5 w-5" /> },
    { name: "WordPress Hosting", icon: <Zap className="h-5 w-5" /> },
    { name: "VPS Hosting", icon: <Server className="h-5 w-5" /> },
    { name: "Email Hosting", icon: <Mail className="h-5 w-5" /> },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-deploy-dark">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-deploy-gradient opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 blur-[100px] rounded-full"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-accent font-bold px-4 py-1.5 rounded-full mb-8 border border-white/10 text-sm">
          <span className="bg-accent text-black px-2 py-0.5 rounded-full text-[10px] mr-1">NEW</span>
          AI Powered Hosting Solution
        </div>
        
        <h1 className="text-white font-headline font-bold text-4xl md:text-5xl lg:text-[64px] leading-tight mb-8 max-w-5xl mx-auto">
          Launch Your Website <br className="hidden md:block" />
          <span className="text-accent">in Minutes, Not Days</span>
        </h1>
        
        <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-12">
          Experience high-performance hosting powered by cutting-edge technology. Join 500,000+ happy customers who trust Hostxeon with their online presence.
        </p>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-2xl shadow-2xl">
            <div className="flex-1 flex items-center px-4 gap-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Find your perfect domain name" 
                className="border-none bg-transparent focus-visible:ring-0 text-lg h-12 p-0"
              />
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-black font-bold h-14 px-10 rounded-xl text-lg shrink-0">
              Get Started
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4 text-accent" />
              <span>45-day money back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              <span>Free domain for 1 year</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-accent" />
              <span>24/7/365 support</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {categories.map((cat, idx) => (
            <button key={idx} className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent/50 transition-all group">
              <div className="bg-white/10 p-3 rounded-xl group-hover:bg-accent group-hover:text-black transition-colors text-white">
                {cat.icon}
              </div>
              <span className="text-sm font-semibold text-white/80">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}