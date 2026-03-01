"use client";

import Link from "next/link";
import { Rocket, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WHMCS_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter Section */}
        <div className="bg-deploy-gradient rounded-[40px] p-10 md:p-16 mb-24 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Stay Ahead of the Curve</h3>
            <p className="text-white/80 text-lg">Subscribe for exclusive tips and updates on our high-performance infrastructure.</p>
          </div>
          <div className="w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur-md">
              <Input 
                placeholder="Enter your email" 
                className="bg-transparent border-none text-white placeholder:text-white/50 focus-visible:ring-0 h-12"
              />
              <Button className="bg-accent hover:bg-accent/90 text-black font-bold h-12 px-8 rounded-xl shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Column 1 */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-accent rounded-lg p-1.5">
                <Rocket className="h-6 w-6 text-black" />
              </div>
              <span className="text-2xl font-headline font-bold">Hostxeon</span>
            </Link>
            <p className="text-white/50 leading-relaxed max-w-sm">
              Enterprise hosting infrastructure powered by WHMCS. Fast, secure, and infinitely scalable solutions for creators worldwide.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-black transition-all"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-black transition-all"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-black transition-all"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-black transition-all"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-lg mb-8">Hosting</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><Link href="/hosting" className="hover:text-accent transition-colors">Shared Hosting</Link></li>
              <li><Link href="/vps" className="hover:text-accent transition-colors">VPS Hosting</Link></li>
              <li><Link href="/wordpress" className="hover:text-accent transition-colors">WordPress Hosting</Link></li>
              <li><Link href="/dedicated" className="hover:text-accent transition-colors">Dedicated Servers</Link></li>
              <li><Link href="/cloud" className="hover:text-accent transition-colors">Cloud Hosting</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-lg mb-8">Company</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Company Blog</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Support</Link></li>
              <li><a href={WHMCS_LINKS.CLIENT_AREA} className="hover:text-accent transition-colors">Affiliate Program</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold text-lg mb-8">Client Resources</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href={WHMCS_LINKS.KNOWLEDGEBASE} className="hover:text-accent transition-colors">Knowledgebase</a></li>
              <li><a href={WHMCS_LINKS.CLIENT_AREA} className="hover:text-accent transition-colors">Client Portal</a></li>
              <li><a href={WHMCS_LINKS.SUPPORT_TICKETS} className="hover:text-accent transition-colors">Submit Ticket</a></li>
              <li><Link href="/login" className="hover:text-accent transition-colors">Account Login</Link></li>
              <li><Link href="/register" className="hover:text-accent transition-colors">Register Account</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-sm">
          <p>© {year} Hostxeon Inc. Integrated with WHMCS Automation.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Legal</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
