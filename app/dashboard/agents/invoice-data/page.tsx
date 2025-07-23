"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Loader2, Calendar, User, DollarSign } from "lucide-react";
import { Alert, AlertDescription } from "@/components/dashboard/alert";

interface GeneratedInvoice {
  id: string;
  invoiceName: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  status: string;
  currency: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: string; // Stored as JSON string
  paymentTerms?: string;
  paymentMethod?: string;
  note?: string;
  createdAt: string;
}

export default function InvoiceData() {
  const [invoices, setInvoices] = useState<GeneratedInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/agents/invoice/getGeneratedInvoices");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch invoices");
        }

        setInvoices(data);
      } catch (err: any) {
        console.error("Error fetching generated invoices:", err);
        setError(err.message);
        toast.error(err.message || "Failed to load saved invoices.", { closeButton: true, duration: Infinity });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const formatCurrency = (amount: number | undefined | null) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD' // Assuming USD, adjust if currency is dynamic
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading saved invoices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Saved Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <Alert>
              <AlertDescription>No invoices have been saved yet.</AlertDescription>
            </Alert>
          ) : (
            <ScrollArea className="h-[600px] pr-4">
              <div className="grid gap-6">
                {invoices.map((invoice) => (
                  <Card key={invoice.id} className="border-border p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium flex items-center gap-1">
                        <FileText className="h-4 w-4" /> Invoice #{invoice.invoiceNumber}
                      </h3>
                      <span className="text-sm text-muted-foreground">Status: {invoice.status}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                      <p><User className="h-4 w-4 inline-block mr-1" /> From: {invoice.fromName}</p>
                      <p><User className="h-4 w-4 inline-block mr-1" /> Client: {invoice.clientName}</p>
                      <p><Calendar className="h-4 w-4 inline-block mr-1" /> Date: {invoice.date}</p>
                      <p><Calendar className="h-4 w-4 inline-block mr-1" /> Due Date: {invoice.dueDate}</p>
                      <p><DollarSign className="h-4 w-4 inline-block mr-1" /> Total: {formatCurrency(invoice.totalAmount)}</p>
                      <p>Currency: {invoice.currency}</p>
                    </div>
                    {Array.isArray(invoice.items) && invoice.items.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Items:</h4>
                        <ul className="list-disc pl-5 text-sm">
                          {invoice.items.map((item: any, itemIndex: number) => (
                            <li key={itemIndex}>{item.description} (Qty: {item.quantity}, Rate: {formatCurrency(item.unitPrice)})</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {invoice.note && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        <h4 className="font-medium mb-2">Notes:</h4>
                        <p>{invoice.note}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 