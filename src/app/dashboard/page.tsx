
"use client";

import { useState, useEffect } from "react";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, CreditCard, LifeBuoy, ArrowRight, Zap, Shield, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getClientProducts, getClientInvoices, getClientTickets } from "@/lib/whmcs-service";

export default function DashboardPage() {
  const { user } = useUser();
  const db = useFirestore();
  const [stats, setStats] = useState({
    products: 0,
    invoices: 0,
    tickets: 0,
  });
  const [loading, setLoading] = useState(true);
  const [whmcsProducts, setWhmcsProducts] = useState<any[]>([]);

  const profileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, "userProfiles", user.uid);
  }, [db, user]);

  const { data: profile } = useDoc(profileRef);

  useEffect(() => {
    async function fetchWhmcsData() {
      if (!profile?.whmcsClientId) return;
      
      setLoading(true);
      try {
        const [productsRes, invoicesRes, ticketsRes] = await Promise.all([
          getClientProducts(profile.whmcsClientId),
          getClientInvoices(profile.whmcsClientId),
          getClientTickets(profile.whmcsClientId),
        ]);

        setStats({
          products: productsRes.totalresults || 0,
          invoices: (invoicesRes.invoices?.invoice || []).filter((i: any) => i.status === 'Unpaid').length,
          tickets: (ticketsRes.tickets?.ticket || []).filter((t: any) => t.status === 'Open').length,
        });

        setWhmcsProducts(productsRes.products?.product || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (profile) fetchWhmcsData();
  }, [profile]);

  const statCards = [
    { name: "Active Services", value: stats.products, icon: <Package className="h-6 w-6" />, color: "bg-blue-500" },
    { name: "Open Tickets", value: stats.tickets, icon: <LifeBuoy className="h-6 w-6" />, color: "bg-amber-500" },
    { name: "Unpaid Invoices", value: stats.invoices, icon: <CreditCard className="h-6 w-6" />, color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black font-headline mb-2">Welcome back, {profile?.firstName || 'User'}!</h1>
          <p className="text-muted-foreground">Manage your Hostxeon infrastructure and services.</p>
        </div>
        {loading && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.name} className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-8 flex items-center gap-6">
              <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.name}</p>
                <p className="text-3xl font-black">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">My Active Hosting</CardTitle>
                <CardDescription>Recently active plans</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/services" className="font-bold text-primary">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            {whmcsProducts.length > 0 ? (
              <div className="space-y-4">
                {whmcsProducts.slice(0, 3).map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.domain}</p>
                      </div>
                    </div>
                    <Badge className={product.status === 'Active' ? 'bg-green-100 text-green-700 border-none' : 'bg-amber-100 text-amber-700 border-none'}>
                      {product.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="font-bold text-slate-400">No active services found</p>
                <Button asChild variant="link" className="text-primary font-bold mt-2">
                  <Link href="/hosting">Order Hosting</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-bold">Account Health</CardTitle>
            <CardDescription>Infrastructure & Security</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-4">
            <div className="group p-5 bg-deploy-dark rounded-2xl text-white flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-accent" />
                <div>
                  <p className="font-bold">DDoS Protection</p>
                  <p className="text-xs text-white/50">Always-on mitigation active</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-accent" />
            </div>
            <div className="group p-5 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-4">
                <Globe className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-bold text-slate-800">Global DNS</p>
                  <p className="text-xs text-muted-foreground">Optimized edge routing</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
