
"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Testimonials() {
  const avatars = PlaceHolderImages.filter(img => img.id.startsWith("avatar-"));

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "E-commerce Founder",
      content: "Switching to DeployHub was the best decision for our store. Our load times dropped by 60% instantly and support has been incredible.",
      avatar: avatars[0]?.imageUrl,
      hint: avatars[0]?.imageHint
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      content: "The VPS control panel is light-years ahead of the competition. Deployment is seamless, and the performance is rock solid.",
      avatar: avatars[1]?.imageUrl,
      hint: avatars[1]?.imageHint
    },
    {
      name: "Emma Williams",
      role: "Creative Director",
      content: "Managed WordPress hosting that actually feels managed. I don't worry about updates or security anymore. 5 stars all around!",
      avatar: avatars[2]?.imageUrl,
      hint: avatars[2]?.imageHint
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-foreground font-headline font-semibold text-3xl md:text-[32px] mb-4">
            Loved by 50,000+ Customers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what businesses are saying about their experience with DeployHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8 pb-8 px-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground text-lg italic leading-relaxed mb-8">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent">
                    {t.avatar && (
                      <Image 
                        src={t.avatar} 
                        alt={t.name} 
                        fill 
                        className="object-cover" 
                        data-ai-hint={t.hint}
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-muted-foreground text-sm">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
