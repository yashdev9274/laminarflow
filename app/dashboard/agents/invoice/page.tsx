"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Send, Loader2, DollarSign, Calendar, User, Building, ShoppingCart, FileUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/dashboard/alert";
import CopyToClipboard, { samplePrompt } from "@/components/dashboard/agents/samplePropmptTab";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the expected structure of the result
interface InvoiceResult {
  invoiceData?: {
    invoiceNumber?: string;
    date?: string;
    dueDate?: string;
    fromName?: string;
    fromAddress?: string;
    fromEmail?: string;
    clientName?: string;
    clientAddress?: string;
    clientEmail?: string;
    items?: {
      description?: string;
      quantity?: number;
      unitPrice?: number;
      amount?: number;
    };
    subtotal?: number;
    taxAmount?: number;
    totalAmount?: number;
    paymentTerms?: string;
    paymentMethod?: string;
    note?: string;
    vendor?: {
      name?: string;
      address?: string;
      contactInfo?: string;
    };
    client?: {
      name?: string;
      address?: string;
      contactInfo?: string;
    };
  };
  paymentReminder?: string;
  analysis?: string;
}

export default function Agent() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<InvoiceResult | null>(null);
  const [error, setError] = useState(null);

  const processInvoice = async () => {
    if (!input.trim()) {
      toast.warning("Please enter invoice text to process", {
        closeButton: true,
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/agents/invoice/postInvoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      // Parse the response
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Check for error conditions
      if (!response.ok || (data && typeof data === 'object' && (data.success === false || data.error))) {
        const errorMessage = 
          typeof data === "object" && data.error 
            ? data.error 
            : typeof data === "object" && data.message
              ? data.message
              : `Error: ${response.status}`;
        throw new Error(errorMessage);
      }

      setResult(data);
      toast.success("Invoice processed successfully", {
        closeButton: true,
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error processing invoice:", error);
      setError(error.message);
      toast.error(error.message || "Failed to process invoice", {
        closeButton: true,
        duration: Infinity,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number | undefined | null) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  const renderInvoiceData = () => {
    if (!result || !result.invoiceData) {
      return (
        <Alert variant="destructive">
          <AlertDescription>
            Invoice data is missing or in an unexpected format. Please try again.
          </AlertDescription>
        </Alert>
      );
    }

    const { invoiceData } = result;

    return (
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-1">
                <FileText className="h-4 w-4" /> 
                Invoice #{invoiceData.invoiceNumber || 'N/A'}
              </h3>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Date: {invoiceData.date || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Due: {invoiceData.dueDate || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-1">
                <Building className="h-4 w-4" />
                Vendor
              </h4>
              <div className="bg-secondary/50 p-3 rounded-md">
                <div className="font-medium">{invoiceData.fromName || invoiceData.vendor?.name || 'N/A'}</div>
                <div className="text-sm text-muted-foreground">{invoiceData.fromAddress || invoiceData.vendor?.address || 'N/A'}</div>
                <div className="text-sm text-muted-foreground">{invoiceData.fromEmail || invoiceData.vendor?.contactInfo || 'N/A'}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-1">
                <User className="h-4 w-4" />
                Client
              </h4>
              <div className="bg-secondary/50 p-3 rounded-md">
                <div className="font-medium">{invoiceData.clientName || invoiceData.client?.name || 'N/A'}</div>
                <div className="text-sm text-muted-foreground">{invoiceData.clientAddress || invoiceData.client?.address || 'N/A'}</div>
                <div className="text-sm text-muted-foreground">{invoiceData.clientEmail || invoiceData.client?.contactInfo || 'N/A'}</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-1">
              <ShoppingCart className="h-4 w-4" />
              Items
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary/50 text-left">
                    <th className="p-2 rounded-tl-md">Description</th>
                    <th className="p-2 text-right">Qty</th>
                    <th className="p-2 text-right">Unit Price</th>
                    <th className="p-2 text-right rounded-tr-md">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(invoiceData.items) ? (
                    invoiceData.items.map((item, index) => (
                      <tr key={index} className="border-b border-border/30">
                        <td className="p-2">{item.description || 'N/A'}</td>
                        <td className="p-2 text-right">{item.quantity || 'N/A'}</td>
                        <td className="p-2 text-right">{formatCurrency(item.unitPrice)}</td>
                        <td className="p-2 text-right">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-border/30">
                      <td className="p-2">{invoiceData.items?.description || 'N/A'}</td>
                      <td className="p-2 text-right">{invoiceData.items?.quantity || 'N/A'}</td>
                      <td className="p-2 text-right">{formatCurrency(invoiceData.items?.unitPrice)}</td>
                      <td className="p-2 text-right">{formatCurrency(invoiceData.items?.amount)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between border-t border-border pt-2">
              <span>Subtotal:</span>
              <span>{formatCurrency(invoiceData.subtotal || invoiceData.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>{formatCurrency(invoiceData.taxAmount || 0)}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-border pt-2">
              <span>Total:</span>
              <span>{formatCurrency(invoiceData.totalAmount || invoiceData.totalAmount)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Payment Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-3 rounded-md">
                <div className="text-sm font-medium">Payment Terms</div>
                <div className="text-sm">{invoiceData.paymentTerms || invoiceData.dueDate || 'N/A'}</div>
              </div>
              <div className="bg-secondary/50 p-3 rounded-md">
                <div className="text-sm font-medium">Payment Method</div>
                <div className="text-sm">{invoiceData.paymentMethod || 'N/A'}</div>
              </div>
            </div>
          </div>

          {invoiceData.note && (
            <div className="space-y-2">
              <h4 className="font-medium">Notes</h4>
              <div className="bg-secondary/50 p-3 rounded-md">
                <div className="text-sm">{invoiceData.note}</div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    );
  };

  const renderPaymentReminder = () => {
    if (!result || !result.paymentReminder) {
      return (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No payment reminder available or needed.</p>
        </div>
      );
    }

    return (
      <ScrollArea className="h-[400px] pr-4">
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap">{result.paymentReminder}</div>
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <CopyToClipboard text={samplePrompt} />

      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Invoice Agent
          </CardTitle>
          <CardDescription>
            Paste your invoice text below and let AI extract and analyze the information for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FileUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Paste invoice text or upload an invoice file</span>
              </div>
              <Textarea
                placeholder="Paste your invoice text here..."
                className="min-h-[200px] bg-background text-foreground"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={processInvoice} 
              disabled={isLoading || !input.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Process Invoice
                </>
              )}
            </Button>

            {result && (
              <Tabs defaultValue="invoice" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="invoice">Invoice Data</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="reminder">Payment Reminder</TabsTrigger>
                </TabsList>
                
                <TabsContent value="invoice" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Invoice Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderInvoiceData()}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="analysis" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Invoice Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="prose prose-invert max-w-none">
                          <div className="whitespace-pre-wrap">{result?.analysis || 'No analysis available'}</div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reminder" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Payment Reminder
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderPaymentReminder()}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Powered by AI invoice processing technology (Gemini 2.0 Flash)
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}