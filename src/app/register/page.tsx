
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Rocket, Mail, Lock, ArrowLeft, Loader2, User } from "lucide-react";
import Link from "next/link";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in Firestore
      await setDoc(doc(db, "userProfiles", user.uid), {
        id: user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: "client",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "An error occurred during registration.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deploy-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-deploy-gradient opacity-10 blur-[120px] rounded-full"></div>
      
      <Link href="/" className="absolute top-10 left-10 flex items-center gap-2 text-white/60 hover:text-accent transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <Card className="w-full max-w-lg bg-white border-none shadow-2xl rounded-[32px] overflow-hidden">
        <CardHeader className="pt-10 pb-6 px-10 text-center">
          <div className="bg-accent rounded-2xl p-3 w-14 h-14 mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Rocket className="h-8 w-8 text-black" />
          </div>
          <CardTitle className="text-3xl font-bold">Join Hostxeon</CardTitle>
          <CardDescription>Launch your professional website in minutes</CardDescription>
        </CardHeader>
        <CardContent className="px-10 pb-8">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John" 
                    className="h-14 pl-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-primary/20 text-lg"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block">Last Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe" 
                    className="h-14 pl-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-primary/20 text-lg"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="h-14 pl-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-primary/20 text-lg"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="h-14 pl-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-primary/20 text-lg"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-slate-50 border-t border-slate-100 p-8 text-center flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">Already have an account?</p>
          <Link href="/login" className="text-primary font-bold hover:underline">Sign in to your account</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
