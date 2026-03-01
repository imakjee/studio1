"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket, LogIn, Server, LayoutGrid, Cpu, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { WHMCS_LINKS } from "@/lib/constants";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Web Hosting", href: "/hosting", icon: <LayoutGrid className="h-4 w-4" /> },
    { name: "VPS Hosting", href: "/vps", icon: <Server className="h-4 w-4" /> },
    { name: "Dedicated Servers", href: "/dedicated", icon: <Cpu className="h-4 w-4" /> },
    { name: "Pricing", href: "/#pricing", icon: <Zap className="h-4 w-4" /> },
  ];

  const isDarkNav = pathname === "/" || pathname === "/vps" || pathname === "/dedicated";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-accent rounded-lg p-1.5 transition-transform group-hover:scale-110">
            <Rocket className="h-6 w-6 text-black" />
          </div>
          <span className={cn(
            "text-2xl font-headline font-bold transition-colors",
            (isScrolled || !isDarkNav) ? "text-foreground" : "text-white"
          )}>
            Hostxeon
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-bold flex items-center gap-2 transition-colors hover:text-accent",
                (isScrolled || !isDarkNav) ? "text-slate-600 hover:text-primary" : "text-white/80 hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            <a 
              href={WHMCS_LINKS.LOGIN}
              className={cn(
                "text-sm font-bold flex items-center gap-2 transition-colors hover:text-accent",
                (isScrolled || !isDarkNav) ? "text-slate-600" : "text-white"
              )}
            >
              <LogIn className="h-4 w-4" />
              Client Login
            </a>
            <Button asChild className="bg-accent hover:bg-accent/90 text-black font-bold rounded-xl px-6 shadow-lg shadow-accent/20 border-none transition-transform hover:scale-105 active:scale-95">
              <a href={WHMCS_LINKS.CLIENT_AREA}>Client Area</a>
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={cn("h-6 w-6", (isScrolled || !isDarkNav) ? "text-foreground" : "text-white")} />
          ) : (
            <Menu className={cn("h-6 w-6", (isScrolled || !isDarkNav) ? "text-foreground" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t p-6 flex flex-col gap-4 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground text-lg font-bold py-3 flex items-center gap-3 border-b last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <Button asChild className="bg-primary text-white font-bold w-full py-6 text-lg mt-4 rounded-2xl">
            <a href={WHMCS_LINKS.LOGIN}>Client Login</a>
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-black font-bold w-full py-6 text-lg rounded-2xl">
            <a href={WHMCS_LINKS.CLIENT_AREA}>Client Area</a>
          </Button>
        </div>
      )}
    </nav>
  );
}
