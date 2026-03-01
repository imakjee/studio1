"use client";

import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Loader2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  const { user } = useUser();
  const db = useFirestore();

  const invoicesQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, "invoices"),
      where("userId", "==", user.uid),
      orderBy("issueDate", "desc")
    );
  }, [db, user]);

  const { data: invoices, isLoading } = useCollection(invoicesQuery);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black font-headline mb-2">Billing & Invoices</h1>
        <p className="text-muted-foreground">Manage your payment methods and view your transaction history.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-primary text-white">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-10">
              <div className="bg-white/20 p-3 rounded-2xl">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-none">ACTIVE</Badge>
            </div>
            <p className="text-sm font-bold opacity-70 uppercase tracking-widest mb-1">Account Balance</p>
            <p className="text-4xl font-black mb-8">$0.00</p>
            <div className="flex gap-4">
              <Button variant="secondary" className="bg-white text-primary font-bold rounded-xl h-12 px-6">
                Add Funds
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10 font-bold rounded-xl h-12 px-6">
                Payment Methods
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-bold">Upcoming Charges</CardTitle>
            <CardDescription>Estimated cost for next billing cycle</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold">Next Invoice</p>
                <p className="text-xs text-muted-foreground">Due on Nov 15, 2024</p>
              </div>
              <p className="font-black text-xl">$0.00</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-xl font-bold">Invoices</CardTitle>
          <CardDescription>Your complete payment history</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          {isLoading ? (
            <div className="py-20 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : invoices && invoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="font-black text-xs uppercase tracking-widest">Number</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest">Date</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest">Amount</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest">Status</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} className="border-slate-100">
                    <TableCell className="font-bold">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                    <TableCell className="font-bold">${invoice.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                        {invoice.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 mt-4">
              <Download className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="font-bold text-slate-400">No invoices found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
