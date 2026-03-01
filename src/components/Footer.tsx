"use client";

import Link from "next/link";
import { Rocket, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter Section */}
        <div className="bg-deploy-gradient rounded-[40px] p-10 md:p-16 mb-24 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Stay Ahead of the Curve</h3>
            <p className="text-white/80 text-lg">Subscribe to our newsletter for exclusive tips, updates, and early access to new features.</p>
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
              Premium web hosting infrastructure designed for modern businesses. Fast, secure, and infinitely scalable solutions for creators worldwide.
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
            <ul className="space-y-4 text-white/40">
              <li><Link href="#" className="hover:text-accent transition-colors">Shared Hosting</Link></li>
              <li><Link href="#vps" className="hover:text-accent transition-colors">VPS Hosting</Link></li>
              <li><Link href="#wordpress" className="hover:text-accent transition-colors">WordPress Hosting</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Cloud Hosting</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Email Hosting</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-lg mb-8">Company</h4>
            <ul className="space-y-4 text-white/40">
              <li><Link href="#" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="#pricing" className="hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Our Blog</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Affiliates</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold text-lg mb-8">Support</h4>
            <ul className="space-y-4 text-white/40">
              <li><Link href="#" className="hover:text-accent transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Status Page</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-sm">
          <p>© {year} Hostxeon Inc. All rights reserved. Powered by AI.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Status</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}