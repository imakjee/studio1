"use client";

import { useState, useEffect } from "react";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Shield, Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const profileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, "userProfiles", user.uid);
  }, [db, user]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || ""
      });
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileRef) return;
    
    setLoading(true);
    try {
      await updateDoc(profileRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Profile Updated",
        description: "Your information has been successfully saved.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || "An error occurred while saving your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isProfileLoading) return <div className="py-20 flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black font-headline mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your personal information and account preferences.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-8 text-center">
              <Avatar className="h-32 w-32 mx-auto mb-6 border-4 border-slate-50 shadow-xl">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-white text-3xl font-black">
                  {formData.firstName?.[0]}{formData.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold">{formData.firstName} {formData.lastName}</h3>
              <p className="text-muted-foreground text-sm mb-6">{formData.email}</p>
              <Badge className="bg-slate-100 text-slate-600 border-none font-bold uppercase tracking-widest text-[10px] px-4 py-1">
                {profile?.role || 'CLIENT'}
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="bg-white p-2 rounded-lg text-primary shadow-sm"><Shield className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs font-black uppercase text-muted-foreground">Status</p>
                  <p className="font-bold">Verified Account</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="bg-white p-2 rounded-lg text-primary shadow-sm"><Mail className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs font-black uppercase text-muted-foreground">Member Since</p>
                  <p className="font-bold">{profile?.createdAt ? new Date(profile.createdAt.toDate()).getFullYear() : '2024'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
              <CardDescription>Update your basic profile details</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-4">
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="h-12 pl-12 bg-slate-50 border-none rounded-xl" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="h-12 pl-12 bg-slate-50 border-none rounded-xl" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground block">Email Address (Read-only)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      value={formData.email}
                      disabled
                      className="h-12 pl-12 bg-slate-100 border-none rounded-xl" 
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-primary/20"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="mr-2 h-5 w-5" /> Save Changes</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${className}`}>
      {children}
    </span>
  );
}
