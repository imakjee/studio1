"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/firebase";
import { Navigation } from "@/components/Navigation";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, Package, CreditCard, LifeBuoy, Settings, Loader2 } from "lucide-react";
import Link from "next/link";

/**
 * Dashboard Layout - Restricted from SEO indexing
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const sidebarItems = [
    { name: "Overview", icon: <LayoutDashboard className="h-5 w-5" />, href: "/dashboard" },
    { name: "My Services", icon: <Package className="h-5 w-5" />, href: "/dashboard/services" },
    { name: "Billing", icon: <CreditCard className="h-5 w-5" />, href: "/dashboard/billing" },
    { name: "Support", icon: <LifeBuoy className="h-5 w-5" />, href: "/dashboard/tickets" },
    { name: "Profile", icon: <Settings className="h-5 w-5" />, href: "/dashboard/profile" },
  ];

  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <div className="flex flex-1 pt-20">
          <SidebarProvider>
            <Sidebar className="hidden md:flex border-r border-slate-200 pt-6">
              <SidebarHeader className="px-6 mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">User Control Panel</span>
              </SidebarHeader>
              <SidebarContent className="px-3">
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild className="h-12 rounded-xl hover:bg-slate-100 px-4">
                        <Link href={item.href} className="flex items-center gap-3 font-bold text-slate-600 hover:text-primary">
                          {item.icon}
                          {item.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            <main className="flex-1 p-6 md:p-10 bg-[#F8FAFC]">
              <div className="max-w-6xl mx-auto">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </div>
      </div>
    </>
  );
}
