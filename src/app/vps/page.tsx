import { Metadata } from 'next';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Server, Cpu, Activity, Shield, Zap, Terminal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WHMCS_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'VPS Hosting Pakistan - High-Performance Cloud VPS Servers',
  description: 'Scalable and high-performance VPS hosting in Pakistan. Get full root access, NVMe SSD storage, and 99.9% uptime on our cloud infrastructure.',
};

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
            Scalable <br />
            <span className="text-accent">VPS Hosting Pakistan</span>
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

      <Footer />
    </div>
  );
}
