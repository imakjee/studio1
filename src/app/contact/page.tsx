import { Metadata } from 'next';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Phone, MapPin, Send, Headphones, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: 'Contact Hostxeon - 24/7 Technical Support & Sales',
  description: 'Need help with your hosting? Contact Hostxeon expert support team available 24/7 for technical assistance, billing, and sales inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-48 pb-20 bg-deploy-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-deploy-gradient opacity-20 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <Badge className="bg-accent/20 text-accent border border-accent/30 mb-6 font-bold uppercase tracking-widest text-[10px]">Get In Touch</Badge>
          <h1 className="text-4xl md:text-7xl font-headline font-bold mb-8">
            How Can We <br />
            <span className="text-accent">Help Your Business?</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto">
            Whether you have a technical question or need a custom enterprise solution, our team is ready to assist you around the clock.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="border-none shadow-2xl rounded-[40px] overflow-hidden p-2">
              <CardContent className="p-10">
                <h3 className="text-3xl font-bold mb-8 text-foreground">Send us a message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                      <Input placeholder="John Doe" className="h-14 bg-slate-50 border-none rounded-2xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                      <Input type="email" placeholder="john@company.com" className="h-14 bg-slate-50 border-none rounded-2xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject</label>
                    <Input placeholder="How can we help?" className="h-14 bg-slate-50 border-none rounded-2xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Message</label>
                    <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[200px] bg-slate-50 border-none rounded-2xl p-6" />
                  </div>
                  <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl text-lg shadow-xl shadow-primary/20">
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="bg-[#F8FAFC] p-8 rounded-[40px] border border-slate-100">
              <h4 className="text-xl font-bold mb-6">Contact Information</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl h-fit text-primary"><Mail className="h-6 w-6" /></div>
                  <div>
                    <p className="text-xs font-black uppercase text-muted-foreground">Email Us</p>
                    <p className="font-bold">support@hostxeon.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl h-fit text-primary"><Phone className="h-6 w-6" /></div>
                  <div>
                    <p className="text-xs font-black uppercase text-muted-foreground">Call Us</p>
                    <p className="font-bold">+92 300 000 000</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl h-fit text-primary"><MapPin className="h-6 w-6" /></div>
                  <div>
                    <p className="text-xs font-black uppercase text-muted-foreground">Office</p>
                    <p className="font-bold text-sm">Tech Hub, Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary p-8 rounded-[40px] text-white">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <Headphones className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold mb-2">24/7 Expert Support</h4>
              <p className="text-white/70 text-sm mb-6">Our engineering team is always online to help you with technical issues.</p>
              <Button className="w-full bg-white text-primary font-bold hover:bg-white/90 rounded-xl">
                Open Support Ticket
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
