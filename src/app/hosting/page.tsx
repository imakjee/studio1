"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Check, Zap, Shield, Globe, HardDrive, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WHMCS_LINKS } from "@/lib/constants";

export default function HostingPage() {
  const plans = [
    {
      pid: "1",
      name: "Starter",
      price: "1.99",
      desc: "Perfect for personal projects and blogs.",
      features: ["1 Website", "10GB NVMe Storage", "Free SSL Certificate", "24/7 Standard Support", "Free Migration"]
    },
    {
      pid: "2",
      name: "Business",
      price: "4.99",
      desc: "Ideal for growing business sites.",
      features: ["Unlimited Websites", "50GB NVMe Storage", "Free Domain (1st Year)", "24/7 Priority Support", "Daily Backups", "Staging Environment"],
      popular: true
    },
    {
      pid: "3",
      name: "Enterprise",
      price: "9.99",
      desc: "Built for high-traffic commerce sites.",
      features: ["Unlimited Websites", "200GB NVMe Storage", "Dedicated IP", "Premium Security Suite", "24/7 VIP Support", "Advanced Caching"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="bg-primary/10 text-primary border-none mb-6 font-bold uppercase tracking-widest text-[10px]">Web Hosting</Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground mb-8">
            Lightning Fast <br />
            <span className="text-primary">Shared Web Hosting</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            Experience peak performance with our optimized NVMe-powered hosting stack. 
            The perfect balance of speed, security, and affordability.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-500">
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-green-500" /> 99.9% Uptime Guarantee</div>
            <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-green-500" /> Free SSL & Backups</div>
            <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-green-500" /> LiteSpeed Performance</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.pid} className={cn(
              "border-none shadow-xl rounded-[40px] overflow-hidden flex flex-col transition-transform hover:scale-[1.02]",
              plan.popular ? "ring-2 ring-primary relative" : ""
            )}>
              {plan.popular && (
                <div className="absolute top-0 right-0 p-6">
                  <Badge className="bg-primary text-white font-bold">MOST POPULAR</Badge>
                </div>
              )}
              <CardHeader className="p-10 pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.desc}</CardDescription>
                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black">${plan.price}</span>
                  <span className="text-muted-foreground text-sm">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-0 flex-1">
                <Button asChild className="w-full h-14 rounded-2xl font-bold text-lg mb-8">
                  <a href={WHMCS_LINKS.ORDER_PLAN(plan.pid)}>Get Started</a>
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-medium">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm text-primary">
                <HardDrive className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">NVMe SSD Storage</h3>
              <p className="text-muted-foreground">Up to 10x faster than standard SSDs, ensuring your site and databases load instantly.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Global Data Centers</h3>
              <p className="text-muted-foreground">Choose from our tier-3 data center locations across the globe for minimal latency.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">cPanel Management</h3>
              <p className="text-muted-foreground">The industry-standard control panel for easy management of files, databases, and emails.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { cn } from "@/lib/utils";
