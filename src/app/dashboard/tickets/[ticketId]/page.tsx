"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { collection, query, where, addDoc, serverTimestamp, orderBy, doc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Clock, User, ArrowLeft, Loader2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TicketDetailPage() {
  const { ticketId } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const [reply, setReply] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ticketRef = useMemoFirebase(() => {
    if (!db || !ticketId) return null;
    return doc(db, "tickets", ticketId as string);
  }, [db, ticketId]);

  const { data: ticket, isLoading: isTicketLoading } = useDoc(ticketRef);

  const messagesQuery = useMemoFirebase(() => {
    if (!db || !ticketId) return null;
    return query(
      collection(db, "tickets", ticketId as string, "messages"),
      orderBy("createdAt", "asc")
    );
  }, [db, ticketId]);

  const { data: messages, isLoading: isMessagesLoading } = useCollection(messagesQuery);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !db || !ticketId || !reply.trim()) return;
    
    setIsSending(true);
    try {
      await addDoc(collection(db, "tickets", ticketId as string, "messages"), {
        ticketId: ticketId,
        userId: user.uid,
        content: reply,
        isInternalNote: false,
        createdAt: serverTimestamp(),
      });
      setReply("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: error.message,
      });
    } finally {
      setIsSending(false);
    }
  };

  if (isTicketLoading) return <div className="py-20 flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;
  if (!ticket) return <div className="text-center py-20">Ticket not found</div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-black font-headline line-clamp-1">{ticket.subject}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-muted-foreground">ID: {ticket.id.substring(0, 8)}</span>
            <Badge className="bg-blue-100 text-blue-700 border-none text-[10px] font-black">
              {ticket.status.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden flex flex-col h-[600px]">
        <ScrollArea className="flex-1 p-6 md:p-8">
          <div className="space-y-8">
            {/* Initial ticket description */}
            <div className="flex gap-4">
              <div className="bg-primary/10 p-2 rounded-xl h-fit">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <Clock className="h-3 w-3" /> {new Date(ticket.createdAt?.toDate()).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Conversation history */}
            {messages?.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.userId === user?.uid ? 'flex-row-reverse' : ''}`}>
                <div className={`${msg.userId === user?.uid ? 'bg-primary/10' : 'bg-slate-100'} p-2 rounded-xl h-fit`}>
                  {msg.userId === user?.uid ? <User className="h-5 w-5 text-primary" /> : <Shield className="h-5 w-5 text-slate-500" />}
                </div>
                <div className={`max-w-[80%] p-6 rounded-2xl border ${
                  msg.userId === user?.uid 
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10' 
                    : 'bg-white border-slate-100'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <div className={`mt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                    msg.userId === user?.uid ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    <Clock className="h-3 w-3" /> {new Date(msg.createdAt?.toDate()).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        <CardFooter className="p-6 bg-slate-50 border-t border-slate-100">
          <form onSubmit={handleSendReply} className="flex gap-2 w-full">
            <Input 
              placeholder="Type your message..." 
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="flex-1 h-14 bg-white border-none rounded-2xl shadow-sm px-6"
            />
            <Button 
              type="submit" 
              disabled={isSending || !reply.trim()}
              className="h-14 w-14 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20"
            >
              {isSending ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
