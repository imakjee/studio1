
"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "1.99",
      features: ["1 Website", "10GB NVMe Storage", "Free SSL", "Standard Support"],
      highlight: false,
    },
    {
      name: "Standard",
      price: "2.99",
      features: ["5 Websites", "50GB NVMe Storage", "Free Domain (1 yr)", "24/7 Priority Support", "Daily Backups"],
      highlight: true,
      badge: "Most Popular",
    },
    {
      name: "Premium",
      price: "6.99",
      features: ["Unlimited Websites", "200GB NVMe Storage", "Free Domain & SSL", "Dedicated Account Manager", "Advanced Analytics"],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-foreground font-headline font-semibold text-3xl md:text-[32px] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that's right for your business. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <Card 
              key={idx} 
              className={`relative flex flex-col transition-all duration-300 hover:-translate-y-2 ${
                plan.highlight 
                  ? "border-2 border-accent shadow-xl scale-105 z-10" 
                  : "border border-border shadow-sm"
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-accent hover:bg-accent text-white px-4 py-1 text-sm rounded-full">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl text-muted-foreground font-medium uppercase tracking-wider">
                  {plan.name}
                </CardTitle>
                <div className="flex items-center justify-center gap-1 mt-4">
                  <span className="text-2xl font-bold align-top mt-2">$</span>
                  <span className="text-[56px] font-bold text-foreground leading-none">{plan.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-muted-foreground">
                      <div className="bg-deploy-gradient/10 rounded-full p-1">
                        <Check className="h-4 w-4 text-deploy-gradient" stroke="#0F766E" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button 
                  variant={plan.highlight ? "default" : "outline"} 
                  className={`w-full py-6 text-lg rounded-lg font-medium ${
                    plan.highlight 
                      ? "bg-accent hover:bg-accent/90 text-white" 
                      : "border-accent text-accent hover:bg-accent/5"
                  }`}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
