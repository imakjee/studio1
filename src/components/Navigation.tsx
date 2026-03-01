"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket, User, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const menuItems = [
    { name: "Hosting", href: "/#features" },
    { name: "VPS", href: "/#vps" },
    { name: "WordPress", href: "/#wordpress" },
    { name: "Pricing", href: "/#pricing" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-accent rounded-lg p-1.5 transition-transform group-hover:scale-110">
            <Rocket className="h-6 w-6 text-black" />
          </div>
          <span className={cn(
            "text-2xl font-headline font-bold transition-colors",
            isScrolled ? "text-foreground" : "text-white"
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
                "text-sm font-medium transition-colors hover:text-accent",
                isScrolled ? "text-foreground" : "text-white/80"
              )}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            {!isUserLoading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={cn("gap-2", isScrolled ? "text-foreground" : "text-white")}>
                      <User className="h-4 w-4" />
                      {user.email?.split('@')[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/tickets" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Support Tickets
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className={cn(
                      "text-sm font-medium flex items-center gap-2",
                      isScrolled ? "text-foreground" : "text-white"
                    )}
                  >
                    Log In
                  </Link>
                  <Button asChild className="bg-accent hover:bg-accent/90 text-black font-bold rounded-lg px-6">
                    <Link href="/register">Get Started</Link>
                  </Button>
                </>
              )
            )}
          </div>
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
          {user ? (
            <Button asChild className="bg-primary text-white font-bold w-full py-6 text-lg">
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
            </Button>
          ) : (
            <Button asChild className="bg-accent hover:bg-accent/90 text-black font-bold w-full py-6 text-lg">
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}