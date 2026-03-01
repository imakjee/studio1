import { Metadata } from 'next';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Cloud, Zap, Shield, Globe, Layers, Activity, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WHMCS_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Cloud Hosting Pakistan - Scalable & Reliable Infrastructure',
  description: 'Experience next-gen cloud hosting in Pakistan. Highly available, self-healing infrastructure with instant resource scaling and 99.99% uptime.',
};

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
            Scalable <br />
            <span className="text-primary">Cloud Hosting Pakistan</span>
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

      <Footer />
    </div>
  );
}
