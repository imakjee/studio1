import { Metadata } from 'next';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Check, Zap, Layout, Globe, Search, Shield, Clock, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WHMCS_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'WordPress Hosting Pakistan - Managed & Optimized WP Hosting',
  description: 'Fastest WordPress hosting in Pakistan. Managed solutions with automatic updates, expert WP support, and optimized caching for peak performance.',
};

export default function WordPressPage() {
  const wpPlans = [
    {
      pid: "10",
      name: "WP Starter",
      price: "2.99",
      desc: "Perfect for personal blogs and portfolios.",
      features: ["1 WordPress Site", "20GB NVMe Storage", "Free SSL & Backups", "Automatic Updates", "Standard Caching"]
    },
    {
      pid: "11",
      name: "WP Business",
      price: "5.99",
      desc: "Ideal for business sites and stores.",
      features: ["Unlimited WP Sites", "100GB NVMe Storage", "Free Domain (1st Year)", "Staging Environment", "Object Cache Pro", "Priority Support"],
      popular: true
    },
    {
      pid: "12",
      name: "WP Enterprise",
      price: "12.99",
      desc: "Built for high-traffic WooCommerce.",
      features: ["Unlimited WP Sites", "Unlimited Storage", "Dedicated IP", "Premium Security Suite", "VIP WP Specialists", "Global Edge Caching"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-48 pb-32 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <Badge className="bg-primary/10 text-primary border-none mb-6 font-bold uppercase tracking-widest text-[10px]">Managed Solutions</Badge>
          <h1 className="text-4xl md:text-7xl font-headline font-bold mb-8">
            Optimized <br />
            <span className="text-primary">WordPress Hosting Pakistan</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-12">
            Focus on your content, let us handle the performance. Our WordPress-optimized stack delivers peak speeds and iron-clad security out of the box.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" asChild className="h-16 px-10 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20">
              <a href="#pricing">View WP Plans</a>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-2 border-primary text-primary font-bold text-lg">
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {wpPlans.map((plan) => (
            <Card key={plan.pid} className={cn(
              "border-none shadow-xl rounded-[40px] overflow-hidden flex flex-col transition-transform hover:scale-[1.02]",
              plan.popular ? "ring-2 ring-primary relative" : ""
            )}>
              {plan.popular && (
                <div className="absolute top-0 right-0 p-6">
                  <Badge className="bg-primary text-white font-bold">BEST PERFORMANCE</Badge>
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
                  <a href={WHMCS_LINKS.ORDER_PLAN(plan.pid)}>Install WordPress</a>
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

      <Footer />
    </div>
  );
}
