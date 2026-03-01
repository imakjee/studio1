
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      q: "What is Managed WordPress Hosting?",
      a: "Managed WordPress Hosting means we take care of all the technical aspects of running WordPress. This includes automatic updates, security patches, daily backups, and server-level speed optimization tailored specifically for WordPress."
    },
    {
      q: "How easy is it to migrate my site?",
      a: "Very easy! We offer free professional migration for all new accounts. Our migration team will move your site with zero downtime and ensure everything is working perfectly on our platform."
    },
    {
      q: "Do you offer a money-back guarantee?",
      a: "Yes, we offer a 30-day money-back guarantee for all our shared hosting and WordPress plans. If you're not satisfied, we'll refund your payment, no questions asked."
    },
    {
      q: "Can I upgrade my plan as I grow?",
      a: "Absolutely! You can upgrade or downgrade your plan at any time through your dashboard. The process is instant and requires no migration or downtime."
    },
    {
      q: "Where are your data centers located?",
      a: "We have global data centers in North America, Europe, Asia, and Oceania. During setup, you can choose the location closest to your audience for the best performance."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-foreground font-headline font-semibold text-3xl md:text-[32px] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our platform and services.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-xl px-6 bg-[#F8FAFC]">
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
