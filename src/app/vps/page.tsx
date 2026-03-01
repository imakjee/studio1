"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Server, Cpu, Activity, Shield, Zap, Terminal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WHMCS_LINKS } from "@/lib/constants";

export default function VPSPage() {
  const vpsPlans = [
    {
      pid: "4",
      name: "Cloud VPS 1",
      price: "12.00",
      specs: ["1 vCPU Core", "2GB RAM", "40GB NVMe Storage", "1TB Bandwidth"],
      features: ["Full Root Access", "KVM Virtualization", "Dedicated IP Address", "Snapshots Enabled"]
    },
    {
      pid: "5",
      name: "Cloud VPS 2",
      price: "24.00",
      specs: ["2 vCPU Cores", "4GB RAM", "80GB NVMe Storage", "3TB Bandwidth"],
      features: ["Full Root Access", "Weekly Backups", "Managed Option Available", "DDoS Protection"],
      popular: true
    },
    {
      pid: "6",
      name: "Cloud VPS 3",
      price: "48.00",
      specs: ["4 vCPU Cores", "8GB RAM", "160GB NVMe Storage", "5TB Bandwidth"],
      features: ["Full Root Access", "Free Monitoring", "Premium Support", "Anytime Upgrades"]
    }
  ];

  return (
    <div className="min-h-screen bg-deploy-dark text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-deploy-gradient opacity-20 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <Badge className="bg-accent/20 text-accent border border-accent/30 mb-6 font-bold uppercase tracking-widest text-[10px]">Cloud Infrastructure</Badge>
          <h1 className="text-4xl md:text-7xl font-headline font-bold mb-8">
            High Performance <br />
            <span className="text-accent">Scalable VPS Hosting</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-12">
            Isolated resources, full root control, and lightning-fast deployment. 
            Hostxeon VPS is designed for demanding applications and developers.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {vpsPlans.map((plan) => (
            <Card key={plan.pid} className={cn(
              "bg-white/5 border border-white/10 text-white rounded-[40px] overflow-hidden flex flex-col transition-all hover:bg-white/10",
              plan.popular ? "ring-2 ring-accent scale-105" : ""
            )}>
              <CardHeader className="p-10 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  {plan.popular && <Badge className="bg-accent text-black font-bold">BEST VALUE</Badge>}
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black text-accent">${plan.price}</span>
                  <span className="text-white/50 text-sm">/mo</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {plan.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-2 text-xs font-bold text-white/70">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                      {spec}
                    </div>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-6">
                <Button asChild className="w-full h-14 bg-accent hover:bg-accent/90 text-black font-bold rounded-2xl text-lg mb-8 border-none">
                  <a href={WHMCS_LINKS.ORDER_PLAN(plan.pid)}>Configure VPS</a>
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-medium text-white/60">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Spec Comparison */}
      <section className="py-24 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">Built for Reliability</h2>
            <p className="text-white/50 text-lg">Every VPS instance includes enterprise hardware and monitoring.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
              <Terminal className="h-8 w-8 text-accent mb-6" />
              <h4 className="font-bold text-lg mb-2">Instant Deployment</h4>
              <p className="text-white/40 text-sm">Your server is online within seconds of purchase completion.</p>
            </div>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
              <Activity className="h-8 w-8 text-accent mb-6" />
              <h4 className="font-bold text-lg mb-2">99.9% Uptime</h4>
              <p className="text-white/40 text-sm">Reliability backed by our SLA and redundant network infrastructure.</p>
            </div>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
              <Zap className="h-8 w-8 text-accent mb-6" />
              <h4 className="font-bold text-lg mb-2">DDoS Protection</h4>
              <p className="text-white/40 text-sm">Advanced mitigation system to keep your services protected from attacks.</p>
            </div>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
              <Shield className="h-8 w-8 text-accent mb-6" />
              <h4 className="font-bold text-lg mb-2">OS Flexibility</h4>
              <p className="text-white/40 text-sm">Choose from Ubuntu, CentOS, Debian, or even custom ISOs.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { cn } from "@/lib/utils";
