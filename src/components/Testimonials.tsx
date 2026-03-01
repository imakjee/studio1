"use client";

import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  const avatars = PlaceHolderImages.filter(img => img.id.startsWith("avatar-"));

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "E-commerce Founder",
      content: "Switching to DeployHub was the best decision for our store. Our load times dropped by 60% instantly and support has been incredible. Truly a game-changer.",
      avatar: avatars[0]?.imageUrl,
      hint: avatars[0]?.imageHint
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      content: "The VPS control panel is light-years ahead of the competition. Deployment is seamless, and the performance is rock solid. No more late-night server issues.",
      avatar: avatars[1]?.imageUrl,
      hint: avatars[1]?.imageHint
    },
    {
      name: "Emma Williams",
      role: "Creative Director",
      content: "Managed WordPress hosting that actually feels managed. I don't worry about updates or security anymore. Their team is truly top-notch and always there.",
      avatar: avatars[2]?.imageUrl,
      hint: avatars[2]?.imageHint
    }
  ];

  return (
    <section className="py-24 bg-[#075985] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-white font-headline font-bold text-3xl md:text-5xl mb-4">
            Trusted by Thousands of Businesses
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            See what our customers are saying about their journey with DeployHub.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl rounded-[40px] bg-white text-black overflow-hidden p-2">
            <CardContent className="pt-12 pb-12 px-10 md:px-20 text-center">
              <div className="flex justify-center gap-1 mb-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground text-xl md:text-2xl font-medium italic leading-relaxed mb-12">
                "DeployHub provides the most stable and performant hosting we've ever used. The support team is incredibly knowledgeable and proactive. Highly recommended for any serious business."
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-accent shadow-xl">
                  {avatars[0]?.imageUrl && (
                    <Image 
                      src={avatars[0].imageUrl} 
                      alt="Sarah Johnson" 
                      fill 
                      className="object-cover" 
                      data-ai-hint={avatars[0].imageHint}
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-black text-xl">Sarah Johnson</h4>
                  <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest">Founder, EcoStyle Co.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center gap-4 mt-12">
            <Button size="icon" variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-black">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 bg-accent rounded-full"></div>
              <div className="w-2 h-2 bg-white/20 rounded-full"></div>
              <div className="w-2 h-2 bg-white/20 rounded-full"></div>
            </div>
            <Button size="icon" variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-black">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}