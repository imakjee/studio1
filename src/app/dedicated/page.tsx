import { Metadata } from 'next';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Cpu, Server, Shield, Network, Zap, Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WHMCS_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Dedicated Server Pakistan - Bare Metal Performance',
  description: 'Enterprise-grade dedicated servers in Pakistan. 100% dedicated hardware, Intel Xeon/AMD EPYC processors, and high-speed NVMe storage.',
};

export default function DedicatedPage() {
  const dedicatedPlans = [
    {
      pid: "7",
      name: "Entry Level Dedicated",
      price: "159.00",
      specs: {
        cpu: "Intel Xeon E-2276G",
        ram: "32GB DDR4 ECC",
        storage: "2x 500GB SSD NVMe",
        bandwidth: "1Gbps Unmetered"
      },
      features: ["IPMI Access", "100% Dedicated Resources", "Tier 3 Data Center", "Standard Support"]
    },
    {
      pid: "8",
      name: "Enterprise Dedicated",
      price: "299.00",
      specs: {
        cpu: "Dual Intel Xeon Silver 4210",
        ram: "128GB DDR4 ECC",
        storage: "2x 1TB SSD NVMe",
        bandwidth: "10Gbps Burst"
      },
      features: ["Full Customization", "Priority VIP Support", "Redundant PSU", "Hardware RAID Options"],
      popular: true
    },
    {
      pid: "9",
      name: "Core Infrastructure",
      price: "499.00",
      specs: {
        cpu: "AMD EPYC 7542 (32 Cores)",
        ram: "256GB DDR4 ECC",
        storage: "4x 2TB SSD NVMe",
        bandwidth: "10Gbps Unmetered"
      },
      features: ["Custom Network Config", "Managed Firewall", "White-Label Support", "Enterprise SLA"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-deploy-dark">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <Badge className="bg-primary/20 text-primary border border-primary/30 mb-6 font-bold uppercase tracking-widest text-[10px]">Bare Metal Servers</Badge>
          <h1 className="text-4xl md:text-7xl font-headline font-bold mb-8">
            Dedicated <br />
            <span className="text-primary">Server Pakistan</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto">
            Zero virtualization overhead. 100% hardware power. 
            Hostxeon dedicated servers provide the ultimate stability for enterprise workloads.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {dedicatedPlans.map((plan) => (
            <Card key={plan.pid} className={cn(
              "bg-deploy-dark border border-white/5 text-white rounded-[40px] overflow-hidden flex flex-col transition-all hover:border-primary/50",
              plan.popular ? "ring-2 ring-primary relative scale-105" : ""
            )}>
              <CardHeader className="p-10 pb-6">
                <div className="flex justify-between items-start mb-6">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  {plan.popular && <Badge className="bg-primary text-white font-bold">STAFF PICK</Badge>}
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black text-white">${plan.price}</span>
                  <span className="text-white/40 text-sm">/mo</span>
                </div>
                
                <div className="space-y-4 mb-8 bg-white/5 p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 text-sm">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span className="font-bold">{plan.specs.cpu}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="font-bold">{plan.specs.ram}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Server className="h-4 w-4 text-primary" />
                    <span className="font-bold">{plan.specs.storage}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Network className="h-4 w-4 text-primary" />
                    <span className="font-bold">{plan.specs.bandwidth}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-0 flex-1">
                <Button asChild className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl text-lg mb-8 shadow-xl shadow-primary/20">
                  <a href={WHMCS_LINKS.ORDER_PLAN(plan.pid)}>Order Server</a>
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-medium text-white/50">
                      <Check className="h-4 w-4 text-primary shrink-0" />
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
