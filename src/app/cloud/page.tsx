"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Cloud, Zap, Shield, Globe, Layers, Activity, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WHMCS_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function CloudHostingPage() {
  const cloudPlans = [
    {
      pid: "13",
      name: "Cloud Basic",
      price: "15.99",
      desc: "Perfect for startups and scaling applications.",
      specs: ["2 vCPU Cores", "4GB RAM", "80GB SSD Storage", "High Availability"],
      features: ["Instant Resource Scaling", "Free Global CDN", "Daily Cloud Backups", "Standard Support"]
    },
    {
      pid: "14",
      name: "Cloud Plus",
      price: "29.99",
      desc: "Optimized for growing business workloads.",
      specs: ["4 vCPU Cores", "8GB RAM", "160GB SSD Storage", "99.99% Uptime SLA"],
      features: ["Auto-healing Infrastructure", "Dedicated IP Address", "Priority VIP Support", "Advanced Security Suite"],
      popular: true
    },
    {
      pid: "15",
      name: "Cloud Elite",
      price: "59.99",
      desc: "Enterprise-grade performance and isolation.",
      specs: ["8 vCPU Cores", "16GB RAM", "320GB SSD Storage", "Custom Networking"],
      features: ["Isolated Resources", "Managed Load Balancing", "24/7 VIP Specialists", "Global Edge Caching"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 bg-deploy-dark text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-deploy-gradient opacity-20 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <Badge className="bg-primary/20 text-primary border border-primary/30 mb-6 font-bold uppercase tracking-widest text-[10px]">Next-Gen Infrastructure</Badge>
          <h1 className="text-4xl md:text-7xl font-headline font-bold mb-8">
            Infinite Scalability <br />
            <span className="text-primary">Reliable Cloud Hosting</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-12">
            Hostxeon Cloud provides a self-healing architecture that scales with your traffic. 
            Experience the power of distributed infrastructure with 100% resource availability.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {cloudPlans.map((plan) => (
            <Card key={plan.pid} className={cn(
              "border-none shadow-xl rounded-[40px] overflow-hidden flex flex-col transition-all hover:scale-[1.02]",
              plan.popular ? "ring-2 ring-primary relative scale-105 z-10" : ""
            )}>
              {plan.popular && (
                <div className="absolute top-0 right-0 p-6">
                  <Badge className="bg-primary text-white font-bold">BEST PERFORMANCE</Badge>
                </div>
              )}
              <CardHeader className="p-10 pb-6">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.desc}</CardDescription>
                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground text-sm">/mo</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8 bg-slate-50 p-4 rounded-2xl">
                  {plan.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      {spec}
                    </div>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-0 flex-1">
                <Button asChild className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl text-lg mb-8 shadow-xl shadow-primary/20">
                  <a href={WHMCS_LINKS.ORDER_PLAN(plan.pid)}>Deploy Cloud Instance</a>
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Cloud? */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">Cloud That Just Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our cloud infrastructure is built on a distributed network of tier-3 data centers for ultimate redundancy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
              <Layers className="h-12 w-12 text-primary mb-6" />
              <h4 className="text-xl font-bold mb-4">Self-Healing</h4>
              <p className="text-muted-foreground">If a hardware failure occurs, your site is instantly moved to a healthy node with zero downtime.</p>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
              <Activity className="h-12 w-12 text-primary mb-6" />
              <h4 className="text-xl font-bold mb-4">Instant Scaling</h4>
              <p className="text-muted-foreground">Traffic spike? Upgrade your CPU and RAM instantly from your dashboard without reboots.</p>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
              <Shield className="h-12 w-12 text-primary mb-6" />
              <h4 className="text-xl font-bold mb-4">Daily Snapshots</h4>
              <p className="text-muted-foreground">We take full snapshots of your entire server daily, allowing you to restore at any time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 bg-deploy-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-deploy-gradient opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20 relative z-10">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8">Low Latency, <br /><span className="text-primary">High Availability</span></h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Our cloud platform is globally distributed. Deploy your applications closer to your users for the fastest possible load times and 100% network uptime.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/80 font-bold">
                <Globe className="h-5 w-5 text-primary" /> 12 Global Regions
              </li>
              <li className="flex items-center gap-3 text-white/80 font-bold">
                <Zap className="h-5 w-5 text-primary" /> 10Gbps Network Backbone
              </li>
              <li className="flex items-center gap-3 text-white/80 font-bold">
                <Shield className="h-5 w-5 text-primary" /> Anycast DDoS Mitigation
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="relative w-full aspect-square max-w-md">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
              <Cloud className="relative w-full h-full text-primary opacity-20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-6xl font-black text-white">99.99%</div>
                <div className="text-primary font-bold tracking-widest uppercase text-xs">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}