
"use client";

import Link from "next/link";
import { Rocket, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deploy-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-accent rounded-lg p-1.5">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-headline font-bold">DeployHub</span>
            </Link>
            <p className="text-white/60 leading-relaxed">
              Premium web hosting infrastructure designed for modern businesses. Fast, secure, and infinitely scalable.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold text-lg mb-6">Hosting</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="#" className="hover:text-white transition-colors">Shared Hosting</Link></li>
              <li><Link href="#vps" className="hover:text-white transition-colors">VPS Hosting</Link></li>
              <li><Link href="#wordpress" className="hover:text-white transition-colors">WordPress Hosting</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cloud Hosting</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© {year} DeployHub Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Status</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
