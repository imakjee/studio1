
"use client";

import { useState, useEffect } from "react";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Loader2, DollarSign, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getClientInvoices } from "@/lib/whmcs-service";
import { WHMCS_URL } from "@/lib/constants";

export default function BillingPage() {
  const { user } = useUser();
  const db = useFirestore();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const profileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, "userProfiles", user.uid);
  }, [db, user]);

  const { data: profile } = useDoc(profileRef);

  useEffect(() => {
    async function fetchInvoices() {
      if (!profile?.whmcsClientId) return;
      try {
        const res = await getClientInvoices(profile.whmcsClientId);
        setInvoices(res.invoices?.invoice || []);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setLoading(false);
      }
    }
    if (profile) fetchInvoices();
  }, [profile]);

  const unpaidTotal = invoices
    .filter(i => i.status === 'Unpaid')
    .reduce((acc, curr) => acc + parseFloat(curr.total), 0);

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
              <Badge className="bg-white/20 text-white border-none font-bold">WHMCS ACCOUNT</Badge>
            </div>
            <p className="text-sm font-bold opacity-70 uppercase tracking-widest mb-1">Total Unpaid</p>
            <p className="text-4xl font-black mb-8">${unpaidTotal.toFixed(2)}</p>
            <div className="flex gap-4">
              <Button asChild variant="secondary" className="bg-white text-primary font-bold rounded-xl h-12 px-6">
                <a href={`${WHMCS_URL}/clientarea.php?action=addfunds`}>Add Funds</a>
              </Button>
              <Button asChild variant="ghost" className="text-white hover:bg-white/10 font-bold rounded-xl h-12 px-6">
                <a href={`${WHMCS_URL}/clientarea.php?action=details`}>Payment Methods</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-bold">Billing Automation</CardTitle>
            <CardDescription>Powered by WHMCS Engine</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold">Next Cycle</p>
                <p className="text-xs text-muted-foreground">Automatic invoice generation</p>
              </div>
              <ExternalLink className="h-5 w-5 text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-xl font-bold">Invoice History</CardTitle>
          <CardDescription>Official billing records from Hostxeon</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          {loading ? (
            <div className="py-20 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : invoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="font-black text-xs uppercase tracking-widest">ID</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest">Due Date</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest">Amount</TableHead>
                  <TableHead className="font-black text-xs uppercase tracking-widest">Status</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} className="border-slate-100">
                    <TableCell className="font-bold">#{invoice.invoicenum || invoice.id}</TableCell>
                    <TableCell>{invoice.duedate}</TableCell>
                    <TableCell className="font-bold">${parseFloat(invoice.total).toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={`border-none font-bold ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                        invoice.status === 'Unpaid' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {invoice.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm" className="font-bold text-primary">
                        <a href={`${WHMCS_URL}/viewinvoice.php?id=${invoice.id}`} target="_blank">Pay Now</a>
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
