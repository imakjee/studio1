"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function FAQ() {
  const faqs = [
    {
      q: "What is Managed WordPress Hosting?",
      a: "Managed WordPress Hosting means we take care of all the technical aspects of running WordPress. This includes automatic updates, security patches, daily backups, and server-level speed optimization tailored specifically for WordPress performance."
    },
    {
      q: "How easy is it to migrate my site?",
      a: "Extremely easy! We provide a free professional migration service for all new accounts. Our expert migration team will handle the move with zero downtime and ensure everything works perfectly on our high-speed platform."
    },
    {
      q: "Do you offer a money-back guarantee?",
      a: "Yes, we offer a generous 45-day money-back guarantee for all our hosting plans. If you're not absolutely satisfied within the first 45 days, we'll refund your payment in full, no questions asked."
    },
    {
      q: "Can I upgrade my plan as I grow?",
      a: "Absolutely! Our platform is built for growth. You can upgrade or downgrade your plan at any time with a single click from your dashboard. The process is instant and requires no data migration or downtime."
    },
    {
      q: "Where are your data centers located?",
      a: "We operate a global network of data centers across North America, Europe, Asia, and Oceania. You can choose the location closest to your target audience for the lowest possible latency and best performance."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-primary text-primary px-4 py-1 mb-4 rounded-full font-bold">HELP CENTER</Badge>
          <h2 className="text-foreground font-headline font-bold text-3xl md:text-5xl mb-6">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our platform, services, and how we help your business succeed.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-[20px] px-8 bg-slate-50 border-none transition-all hover:bg-slate-100">
              <AccordionTrigger className="text-left text-lg font-bold hover:no-underline py-8">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-8">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}