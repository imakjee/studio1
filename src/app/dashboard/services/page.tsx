
"use client";

import { useState, useEffect } from "react";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Zap, ExternalLink, Loader2, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getClientProducts } from "@/lib/whmcs-service";
import { WHMCS_URL } from "@/lib/constants";

export default function ServicesPage() {
  const { user } = useUser();
  const db = useFirestore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const profileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, "userProfiles", user.uid);
  }, [db, user]);

  const { data: profile } = useDoc(profileRef);

  useEffect(() => {
    async function fetchProducts() {
      if (!profile?.whmcsClientId) return;
      try {
        const res = await getClientProducts(profile.whmcsClientId);
        setProducts(res.products?.product || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    if (profile) fetchProducts();
  }, [profile]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black font-headline mb-2">My Services</h1>
        <p className="text-muted-foreground">Manage your active hosting plans and configurations.</p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>
      ) : products.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="border-none shadow-sm rounded-[32px] overflow-hidden group hover:shadow-xl transition-all">
              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-start">
                  <div className="bg-primary/5 p-3 rounded-2xl text-primary">
                    <Server className="h-6 w-6" />
                  </div>
                  <Badge className={`border-none font-bold ${
                    product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {product.status.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold mt-4">{product.name}</CardTitle>
                <CardDescription className="font-mono text-primary font-bold">{product.domain}</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Next Due Date</p>
                    <p className="font-bold">{product.nextduedate}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Amount</p>
                    <p className="font-bold">${parseFloat(product.amount).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button asChild className="flex-1 h-12 rounded-xl bg-primary font-bold shadow-lg shadow-primary/20">
                    <a href={`${WHMCS_URL}/clientarea.php?action=productdetails&id=${product.id}`}>
                      Manage <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="h-12 w-12 rounded-xl border-slate-200">
                    <a href={`${WHMCS_URL}/clientarea.php?action=productdetails&id=${product.id}&dologin=true`}>
                      <Zap className="h-5 w-5 text-amber-500" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[40px] shadow-sm border-2 border-dashed border-slate-100">
          <Package className="h-16 w-16 text-slate-200 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-2">No Active Services</h3>
          <p className="text-muted-foreground mb-8">Ready to launch your project? Browse our hosting plans.</p>
          <Button asChild size="lg" className="rounded-2xl px-10 h-14 bg-primary font-bold">
            <a href="/hosting">Get Started</a>
          </Button>
        </div>
      )}
    </div>
  );
}
