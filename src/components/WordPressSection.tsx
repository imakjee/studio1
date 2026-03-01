
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function WordPressSection() {
  const wpImage = PlaceHolderImages.find(img => img.id === "wordpress-hosting");
  
  const benefits = [
    "Pre-installed WordPress with 1-click updates",
    "Staging environment for safe testing",
    "Optimized caching for 3x faster loading",
    "Automatic daily backups & restores",
    "Specialized WordPress security patches"
  ];

  return (
    <section id="wordpress" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-deploy-gradient/10 rounded-2xl blur-2xl"></div>
            <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-border">
              {wpImage && (
                <Image
                  src={wpImage.imageUrl}
                  alt={wpImage.description}
                  width={800}
                  height={600}
                  className="rounded-xl object-cover w-full h-auto"
                  data-ai-hint={wpImage.imageHint}
                />
              )}
            </div>
          </div>
          
          <div className="flex-1 order-1 lg:order-2">
            <h2 className="text-foreground font-headline font-semibold text-3xl md:text-[40px] leading-tight mb-6">
              Lightning Fast <span className="text-deploy-gradient bg-clip-text text-transparent bg-deploy-gradient">Managed WordPress</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our Managed WordPress hosting is engineered for speed and built for security. We handle the technical heavy lifting so you can focus on your content.
            </p>
            
            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <Button className="bg-accent hover:bg-accent/90 text-white font-medium h-14 px-10 text-lg rounded-lg shadow-lg shadow-accent/20">
              Get Started with WordPress
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
