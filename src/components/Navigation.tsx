
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Hosting", href: "#" },
    { name: "VPS", href: "#vps" },
    { name: "WordPress", href: "#wordpress" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-accent rounded-lg p-1.5 transition-transform group-hover:scale-110">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <span className={cn(
            "text-2xl font-headline font-bold transition-colors",
            isScrolled ? "text-foreground" : "text-white"
          )}>
            DeployHub
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button className="bg-accent hover:bg-accent/90 text-white font-medium rounded-lg">
            Get Started
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
          ) : (
            <Menu className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
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
              className="text-foreground text-lg font-medium py-2 border-b last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Button className="bg-accent hover:bg-accent/90 text-white font-medium w-full py-6 text-lg">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
}
