"use client";

import { useState } from "react";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, addDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { LifeBuoy, Plus, MessageSquare, Clock, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function TicketsPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: "", description: "", priority: "medium" });

  const ticketsQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, "tickets"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
  }, [db, user]);

  const { data: tickets, isLoading } = useCollection(ticketsQuery);

  const handleCreateTicket = async () => {
    if (!user || !db || !newTicket.subject || !newTicket.description) return;
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "tickets"), {
        userId: user.uid,
        subject: newTicket.subject,
        description: newTicket.description,
        status: "open",
        priority: newTicket.priority,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "Ticket Created",
        description: "A support specialist will review your request shortly.",
      });
      
      setNewTicket({ subject: "", description: "", priority: "medium" });
      setIsCreateModalOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Could not create ticket.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-100 text-blue-700";
      case "in_progress": return "bg-amber-100 text-amber-700";
      case "closed": return "bg-slate-100 text-slate-700";
      case "awaiting_response": return "bg-green-100 text-green-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline mb-2">Support Tickets</h1>
          <p className="text-muted-foreground">Need help? Open a ticket and our experts will assist you.</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl px-6">
              <Plus className="mr-2 h-5 w-5" /> Open New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-[32px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">New Support Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject</label>
                <Input 
                  placeholder="Summarize your issue"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                  className="bg-slate-50 border-none h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Description</label>
                <Textarea 
                  placeholder="Provide details about your problem..."
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  className="bg-slate-50 border-none min-h-[150px] rounded-xl"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleCreateTicket} 
                disabled={isSubmitting || !newTicket.subject || !newTicket.description}
                className="w-full bg-primary h-12 rounded-xl font-bold"
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit Ticket"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-20 flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>
          ) : tickets && tickets.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {tickets.map((ticket) => (
                <Link 
                  href={`/dashboard/tickets/${ticket.id}`} 
                  key={ticket.id}
                  className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-6">
                    <div className="bg-slate-100 p-3 rounded-2xl group-hover:bg-primary/10 transition-colors">
                      <MessageSquare className="h-6 w-6 text-slate-400 group-hover:text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{ticket.subject}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {new Date(ticket.createdAt?.toDate()).toLocaleDateString()}
                        </span>
                        <Badge className={`${getStatusColor(ticket.status)} border-none text-[10px] font-black`}>
                          {ticket.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50">
              <LifeBuoy className="h-16 w-16 text-slate-200 mx-auto mb-4" />
              <p className="font-bold text-slate-400">No support tickets found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
