"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Rocket, Shield, CreditCard, Loader2, ArrowLeft } from "lucide-react";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const { planId } = useParams();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // In a real app, we'd fetch the plan details from Firestore
  // For this demo, we'll simulate the plan selection
  const plans: Record<string, any> = {
    "starter": { name: "Starter Plan", price: 1.99, features: ["1 Website", "10GB Storage", "Free SSL"] },
    "business": { name: "Business Plan", price: 2.99, features: ["10 Websites", "100GB Storage", "Free Domain"] },
    "cloud-pro": { name: "Cloud Pro", price: 6.99, features: ["Unlimited Websites", "500GB Storage", "Dedicated IP"] }
  };

  const plan = plans[planId as string] || plans["starter"];

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push(`/login?redirect=/checkout/${planId}`);
    }
  }, [user, isUserLoading, router, planId]);

  const handleCompleteOrder = async () => {
    if (!user || !db) return;
    setLoading(true);
    
    try {
      const orderId = `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      await setDoc(doc(db, "orders", orderId), {
        id: orderId,
        userId: user.uid,
        planId: planId,
        planName: plan.name,
        startDate: serverTimestamp(),
        status: "active",
        totalAmount: plan.price,
        currency: "USD",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "Order Successful!",
        description: "Your hosting plan is being activated now.",
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Checkout Failed",
        description: error.message || "An error occurred during checkout.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isUserLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navigation />
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <h1 className="text-4xl font-black font-headline">Secure Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
                <CardHeader className="p-8">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" /> Security Verification
                  </CardTitle>
                  <CardDescription>Confirm your account and payment details</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block">Email Account</label>
                      <Input value={user?.email || ""} disabled className="bg-slate-50 border-none h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block">Billing Cycle</label>
                      <Input value="Yearly (50% Off)" disabled className="bg-slate-50 border-none h-12 rounded-xl" />
                    </div>
                  </div>
                  
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4 mb-4">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <p className="font-bold">Payment Method</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">You will be redirected to our secure payment processor (Stripe) to complete the transaction.</p>
                    <div className="flex gap-4">
                      <div className="h-8 w-12 bg-white rounded border border-slate-200 flex items-center justify-center font-bold text-[10px]">VISA</div>
                      <div className="h-8 w-12 bg-white rounded border border-slate-200 flex items-center justify-center font-bold text-[10px]">MC</div>
                      <div className="h-8 w-12 bg-white rounded border border-slate-200 flex items-center justify-center font-bold text-[10px]">AMEX</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden sticky top-32">
                <CardHeader className="bg-primary p-8 text-white">
                  <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
                  <CardDescription className="text-white/70">Review your selection</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                    <div className="bg-primary/10 p-3 rounded-2xl">
                      <Rocket className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{plan.name}</p>
                      <p className="text-sm text-muted-foreground">Hosting Subscription</p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((f: string) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-bold">${plan.price}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 font-bold">
                      <span>Annual Discount</span>
                      <span>-50%</span>
                    </div>
                    <div className="flex justify-between text-xl font-black pt-4 border-t border-slate-100">
                      <span>Total Due</span>
                      <span className="text-primary">${(plan.price * 12).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Button 
                    onClick={handleCompleteOrder} 
                    disabled={loading}
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl text-lg shadow-xl shadow-primary/20"
                  >
                    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Complete Purchase"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
