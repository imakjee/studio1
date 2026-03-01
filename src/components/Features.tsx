
"use client";

import { Cloud, Cpu, Globe, Lock, Smartphone, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Features() {
  const features = [
    {
      title: "Ultra-Fast NVMe Storage",
      desc: "Up to 10x faster than traditional SSDs for near-instant load times.",
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      title: "Global Edge Network",
      desc: "Content delivered from 250+ locations worldwide for global speed.",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Enterprise Security",
      desc: "DDoS protection, firewalls, and free SSL certificates come standard.",
      icon: <Lock className="h-6 w-6" />,
    },
    {
      title: "One-Click Installs",
      desc: "Deploy WordPress, Magento, or custom apps with a single click.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Cloud Scalability",
      desc: "Resources that scale with your traffic, so you never go down.",
      icon: <Cloud className="h-6 w-6" />,
    },
    {
      title: "Mobile Management",
      desc: "Manage your servers and sites from anywhere with our dashboard.",
      icon: <Smartphone className="h-6 w-6" />,
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-foreground font-headline font-semibold text-3xl md:text-[32px] mb-4">
            Everything You Need to Scale
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform is built for speed, security, and simplicity. We handle the infrastructure so you can focus on building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="border-none shadow-soft hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8 pb-8 px-8">
                <div className="bg-deploy-gradient w-12 h-12 rounded-lg flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
