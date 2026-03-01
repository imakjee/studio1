"use client";

import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Package, CreditCard, LifeBuoy, ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useUser();
  const db = useFirestore();

  // Query user orders
  const ordersQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, "orders"), where("userId", "==", user.uid));
  }, [db, user]);

  const { data: orders, isLoading: isOrdersLoading } = useCollection(ordersQuery);

  const stats = [
    { name: "Active Services", value: orders?.filter(o => o.status === 'active').length || 0, icon: <Package className="h-6 w-6" />, color: "bg-blue-500" },
    { name: "Open Tickets", value: 0, icon: <LifeBuoy className="h-6 w-6" />, color: "bg-amber-500" },
    { name: "Unpaid Invoices", value: 0, icon: <CreditCard className="h-6 w-6" />, color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black font-headline mb-2">Welcome back, {user?.email?.split('@')[0]}!</h1>
        <p className="text-muted-foreground">Manage your infrastructure and services from one central dashboard.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
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
            {orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold">Hosting Plan Order</p>
                        <p className="text-xs text-muted-foreground">ID: {order.id.substring(0, 8)}</p>
                      </div>
                    </div>
                    <Badge className={order.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Rocket className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="font-bold text-slate-400">No active services found</p>
                <Button asChild variant="link" className="text-primary font-bold mt-2">
                  <Link href="/#pricing">Browse Hosting Plans</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-bold">Recommended for You</CardTitle>
            <CardDescription>Enhance your online presence</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-4">
            <div className="group p-5 bg-deploy-dark rounded-2xl text-white flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-accent" />
                <div>
                  <p className="font-bold">Enterprise Security</p>
                  <p className="text-xs text-white/50">Protect your site from DDoS</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-accent" />
            </div>
            <div className="group p-5 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-4">
                <Globe className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-bold text-slate-800">Domain Privacy</p>
                  <p className="text-xs text-muted-foreground">Keep your details private</p>
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
