"use client";

import { Zap, Shield, Globe, Headphones, Cpu, Database, Layout, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Features() {
  const features = [
    {
      title: "Lightning-fast performance",
      desc: "Our optimized stack ensures your website loads instantly across all devices.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Enterprise Security",
      desc: "Advanced DDoS protection and custom firewalls keep your data safe 24/7.",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Global CDN Network",
      desc: "Deliver content from 250+ locations worldwide for minimal latency.",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Expert Support",
      desc: "Dedicated support team available round the clock to solve any issue.",
      icon: <Headphones className="h-6 w-6" />,
    },
    {
      title: "Powerful NVMe Storage",
      desc: "Industry-leading storage performance for database-heavy applications.",
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      title: "Automatic Backups",
      desc: "Never lose data with our automated daily backup and restore system.",
      icon: <Database className="h-6 w-6" />,
    },
    {
      title: "Intuitive Dashboard",
      desc: "Manage all your sites and resources from one beautiful interface.",
      icon: <Layout className="h-6 w-6" />,
    },
    {
      title: "SSL Certificates",
      desc: "Free Let's Encrypt SSL for all your domains and subdomains.",
      icon: <Lock className="h-6 w-6" />,
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">Everything included</span>
          <h2 className="text-foreground font-headline font-bold text-3xl md:text-5xl mt-2 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Build and grow your online presence with professional tools and infrastructure designed for modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-8 pb-8 px-6">
                <div className="bg-primary/5 w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
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