"use client";

import { Button } from "@/components/ui/button";
import { Zap, Layout, Globe, Search } from "lucide-react";
import Link from "next/link";

export function WordPressSection() {
  const benefits = [
    { text: "Automatic 1-click install", icon: <Zap className="h-4 w-4" /> },
    { text: "Staging environments", icon: <Layout className="h-4 w-4" /> },
    { text: "Optimized caching system", icon: <Zap className="h-4 w-4" /> },
    { text: "Free SSL certificates", icon: <Globe className="h-4 w-4" /> },
    { text: "Advanced security suite", icon: <Search className="h-4 w-4" /> },
  ];

  return (
    <section id="wordpress" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 order-2 lg:order-1 relative">
            <div className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="relative bg-[#F1F5F9] p-6 rounded-[40px] shadow-2xl border border-border">
              {/* WP Admin Interface Mockup */}
              <div className="bg-white rounded-[24px] shadow-xl overflow-hidden border border-border/50">
                <div className="h-10 bg-[#1E293B] flex items-center px-4 gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <div className="ml-4 bg-white/10 px-3 py-1 rounded text-[8px] text-white/60">wp-admin / dashboard</div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="font-bold text-xl">Site Performance</h4>
                    <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">OPTIMIZED</span>
                  </div>
                  <div className="w-full bg-[#F8FAFC] h-32 rounded-2xl flex items-end justify-between px-6 pb-4">
                    {[30, 45, 60, 40, 70, 95, 85].map((h, i) => (
                      <div key={i} className="w-6 bg-primary/40 rounded-t-lg transition-all hover:bg-primary" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="p-4 bg-primary/5 rounded-xl">
                      <div className="text-[10px] text-primary/60 font-bold uppercase mb-1">Load Time</div>
                      <div className="text-xl font-black text-primary">0.8s</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="text-[10px] text-green-600/60 font-bold uppercase mb-1">Uptime</div>
                      <div className="text-xl font-black text-green-600">99.9%</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating notification */}
              <div className="absolute -bottom-6 -right-6 bg-accent text-black p-4 rounded-2xl shadow-xl font-bold flex items-center gap-3 animate-float border-4 border-white">
                <div className="bg-black/10 p-2 rounded-lg"><Zap className="h-5 w-5" /></div>
                <span>1-Click Restore Ready</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 order-1 lg:order-2">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">For WordPress Lovers</span>
            <h2 className="text-foreground font-headline font-bold text-4xl md:text-6xl mt-4 mb-8 leading-tight">
              WordPress Hosting <br />
              <span className="text-primary">Optimized to Perfection</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl">
              Experience the fastest WordPress hosting on the market. Our custom technology stack is engineered specifically for WordPress performance and security.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-primary">
                    {benefit.icon}
                  </div>
                  <span className="text-foreground font-bold text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-10 text-lg rounded-xl shadow-xl shadow-primary/20">
                <Link href="/wordpress">Get Started Now</Link>
              </Button>
              <div className="text-muted-foreground text-xs">
                Starting from <br />
                <span className="text-foreground font-bold text-base">$2.99 /mo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
