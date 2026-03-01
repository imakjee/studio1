"use client";

import { useState } from "react";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { WHMCS_LINKS } from "@/lib/constants";

export function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  // Note: WHMCS PIDs (Product IDs) should match your WHMCS configuration
  const plans = [
    {
      id: "starter",
      whmcsPid: "1", // Example WHMCS Product ID
      name: "Starter",
      desc: "Perfect for a small personal website",
      price: isYearly ? "1.99" : "3.99",
      features: ["1 Website", "10GB NVMe Storage", "Free SSL", "Standard Support"],
      highlight: false,
    },
    {
      id: "business",
      whmcsPid: "2", // Example WHMCS Product ID
      name: "Business",
      desc: "Best for growing business websites",
      price: isYearly ? "2.99" : "5.99",
      features: ["10 Websites", "100GB NVMe Storage", "Free Domain (1 yr)", "24/7 Priority Support", "Daily Backups"],
      highlight: true,
      badge: "Best Value",
    },
    {
      id: "cloud-pro",
      whmcsPid: "3", // Example WHMCS Product ID
      name: "Cloud Pro",
      desc: "Designed for high-traffic platforms",
      price: isYearly ? "6.99" : "12.99",
      features: ["Unlimited Websites", "500GB NVMe Storage", "Dedicated IP", "Advanced Security Suite", "24/7 Priority Support"],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="border-primary text-primary px-4 py-1 mb-4 rounded-full font-bold">PRICING PLANS</Badge>
          <h2 className="text-foreground font-headline font-bold text-3xl md:text-5xl mb-6">
            Choose Your Perfect Plan
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <Label className={!isYearly ? "text-foreground font-bold" : "text-muted-foreground"}>Monthly</Label>
            <Switch 
              checked={isYearly} 
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <div className="flex items-center gap-2">
              <Label className={isYearly ? "text-foreground font-bold" : "text-muted-foreground"}>Yearly</Label>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold">Save 50%</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <Card 
              key={idx} 
              className={`relative flex flex-col transition-all duration-300 border-none shadow-lg ${
                plan.highlight 
                  ? "ring-2 ring-primary scale-105 z-10" 
                  : "hover:scale-[1.02]"
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <Badge className="bg-primary text-white px-6 py-1 text-sm rounded-full font-bold uppercase tracking-wider">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-left pt-8 pb-4">
                <CardTitle className="text-2xl font-bold mb-1">
                  {plan.name}
                </CardTitle>
                <p className="text-muted-foreground text-sm">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mt-6">
                  <span className="text-2xl font-bold">$</span>
                  <span className="text-5xl font-black text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground font-medium">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-4">
                <Button 
                  asChild
                  className={`w-full h-14 mb-8 font-bold rounded-2xl text-lg ${
                    plan.highlight 
                      ? "bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20" 
                      : "bg-white border-2 border-primary text-primary hover:bg-primary/5 shadow-none"
                  }`}
                >
                  <a href={WHMCS_LINKS.ORDER_PLAN(plan.whmcsPid)}>Buy Now</a>
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3 text-foreground text-sm font-medium">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pb-8 pt-4">
                <a 
                  href={WHMCS_LINKS.KNOWLEDGEBASE} 
                  className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
                >
                  <Info className="h-3 w-3" /> Learn more in Knowledgebase
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
