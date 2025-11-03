"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Eye,
  Workflow,
  ArrowRight,
  Building2,
  Users,
  Zap,
  CheckCircle,
  MoreHorizontal,
  Plus,
  XCircle,
  Bot,
  ClipboardCheck,
  Send,
  FileUp,
  Copy,
  Loader2,
  FileText,
  Calendar,
  ShoppingCart,
} from "lucide-react";
import { SandClockIcon } from "@/components/icons/sandClockIcon";
import { CheckIcon } from "@/components/icons/checkIcon";
import { formatCurrency } from "@/hooks/formatCurrency";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/dashboard/alert";
import jsPDF from "jspdf";


interface InvoiceResult {
  invoiceData?: {
    invoiceName?: string;
    invoiceNumber?: string;
    date?: string;
    dueDate?: string;
    status?: string;
    currency?: string;
    subtotal?: number;
    taxAmount?: number;
    totalAmount?: number;
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
    }[];
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
    id?: string; // Added for potential future use
  };
  paymentReminder?: string;
  analysis?: string;
}

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("views");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<InvoiceResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const features = [
    {
      id: "views",
      icon: Eye,
      title: "Views",
      description: "Personalize views",
      color: "bg-pink-900/20 text-pink-400 border-pink-500/30",
    },
    {
      id: "tasks",
      icon: ClipboardCheck,
      title: "Tasks",
      description: "Manage your team's work",
      color: "bg-indigo-900/20 text-indigo-400 border-indigo-500/30",
    },
    {
      id: "ai-agents",
      icon: Bot,
      title: "LF-AI ",
      description: "Automate with AI",
      color: "bg-purple-900/20 text-purple-400 border-purple-500/30",
    },
    {
      id: "workflows",
      icon: Workflow,
      title: "Workspace",
      description: "Automate tasks and processes",
      color: "bg-cyan-900/20 text-cyan-400 border-cyan-500/30",
    },
  ];

  const workflowSteps = [
    {
      id: 1,
      type: "trigger",
      title: "Person is Created",
      icon: Users,
      status: "completed",
    },
    {
      id: 2,
      type: "action",
      title: "Find Stripe Customer",
      icon: Building2,
      status: "completed",
    },
    {
      id: 3,
      type: "condition",
      title: "Assess Subscription Amount",
      icon: Zap,
      status: "active",
    },
    {
      id: 4,
      type: "action",
      title: "Update Company",
      icon: Building2,
      status: "pending",
    },
  ];

  const invoices = [
    {
      invoiceNumber: "INV-001",
      clientName: "Stripe",
      total: 1250.0,
      status: "paid",
      currency: "USD",
      createdAt: new Date("2024-07-15"),
    },
    {
      invoiceNumber: "INV-002",
      clientName: "Vercel",
      total: 750.5,
      status: "pending",
      currency: "USD",
      createdAt: new Date("2024-07-18"),
    },
    {
      invoiceNumber: "INV-003",
      clientName: "GitHub",
      total: 2000.0,
      status: "failed",
      currency: "USD",
      createdAt: new Date("2024-07-20"),
    },
    {
      invoiceNumber: "INV-004",
      clientName: "Netlify",
      total: 500.0,
      status: "paid",
      currency: "USD",
      createdAt: new Date("2024-07-21"),
    },
  ];

  const tasks = [
    {
      title: "Follow up with Stripe",
      status: "In Progress",
      dueDate: "2024-08-01",
      assignee: "Alex",
    },
    {
      title: "Prepare Q3 financial report",
      status: "To Do",
      dueDate: "2024-08-15",
      assignee: "Jane",
    },
    {
      title: "Onboard new customer: Vercel",
      status: "Done",
      dueDate: "2024-07-25",
      assignee: "Alex",
    },
    {
      title: "Review agent performance",
      status: "To Do",
      dueDate: "2024-08-05",
      assignee: "Alex",
    },
  ];

  const getInvoicesStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="gap-1 rounded bg-yellow-900/20 text-yellow-400 border-yellow-500/30 px-2 py-1"
          >
            <SandClockIcon size={18} aria-hidden="true" />
            {status}
          </Badge>
        );

      case "failed":
        return (
          <Badge
            variant="outline"
            className="gap-1 rounded bg-red-900/20 text-red-400 border-red-500/30 px-2 py-1"
          >
            <XCircle size={18} aria-hidden="true" />
            {status}
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="gap-1 rounded bg-green-900/20 text-green-400 border-green-500/30 px-2 py-1"
          >
            <CheckIcon size={18} />
            {status}
          </Badge>
        );
    }
  };

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-900/20 text-blue-400 border-blue-500/30"
          >
            {status}
          </Badge>
        );
      case "To Do":
        return (
          <Badge
            variant="outline"
            className="bg-gray-700 text-gray-300 border-gray-600"
          >
            {status}
          </Badge>
        );
      case "Done":
        return (
          <Badge
            variant="outline"
            className="bg-green-900/20 text-green-400 border-green-500/30"
          >
            {status}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const samplePrompt = `INVOICE #INV-2023-1234
Date: 2023-10-15
Due Date: 2023-11-15

From:
Acme Corporation
123 Business St, Business City, BC 12345
Phone: (555) 123-4567
Email: billing@acmecorp.com

To:
John Smith Enterprises
456 Client Ave, Client City, CC 67890
Phone: (555) 987-6543
Email: accounts@johnsmith.com

Items:
1. Web Development Services - 40 hours @ $75/hour = $3,000
2. Server Hosting (Monthly) - 1 unit @ $150 = $150
3. SSL Certificate (Annual) - 1 unit @ $100 = $100

Subtotal: $3,250
Tax (8%): $260
Total: $3,510

Payment Terms: Net 30
Payment Method: Bank Transfer`;

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
    setResult(null);

    try {
      const response = await fetch("/api/agents/invoice/postInvoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

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

  const formatLocalCurrency = (amount: number | undefined | null) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(samplePrompt)
      .then(() => {
        toast.success("Sample prompt copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy text: " + err.message);
      });
  };

  const handleLoginToast = () => {
    toast.info("Login to our platform to get started");
  };

  const handleDownloadPdf = (invoiceDataParam: InvoiceResult['invoiceData']) => {
    if (!invoiceDataParam) {
      toast.error("No invoice data available to download.", { closeButton: true });
      return;
    }

    const invoiceData = invoiceDataParam; // Type narrowed to non-nullable

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pdf.setFont("helvetica");

    pdf.setFontSize(24);
    pdf.text(invoiceData.invoiceName ?? "Invoice", 20, 20);

    pdf.setFontSize(12);
    pdf.text("From", 20, 40);
    pdf.setFontSize(10);
    pdf.text(
      [
        invoiceData.fromName || invoiceData.vendor?.name || 'N/A',
        invoiceData.fromEmail || invoiceData.vendor?.contactInfo || 'N/A',
        invoiceData.fromAddress || invoiceData.vendor?.address || 'N/A',
      ],
      20,
      45
    );

    pdf.setFontSize(12);
    pdf.text("Bill to", 20, 70);
    pdf.setFontSize(10);
    pdf.text(
      [
        invoiceData.clientName || invoiceData.client?.name || 'N/A',
        invoiceData.clientEmail || invoiceData.client?.contactInfo || 'N/A',
        invoiceData.clientAddress || invoiceData.client?.address || 'N/A',
      ],
      20,
      75
    );

    pdf.setFontSize(10);
    pdf.text(`Invoice Number: #${invoiceData.invoiceNumber || 'N/A'}`, 120, 40);
    pdf.text(`Date: ${invoiceData.date || 'N/A'}`, 120, 45);
    pdf.text(`Due Date: ${invoiceData.dueDate || 'N/A'}`, 120, 50);

    let yOffset = 100;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Description", 20, yOffset);
    pdf.text("Quantity", 80, yOffset);
    pdf.text("Rate", 120, yOffset);
    pdf.text("Amount", 160, yOffset);
    pdf.line(20, yOffset + 2, 190, yOffset + 2);
    yOffset += 10;

    pdf.setFont("helvetica", "normal");
    invoiceData.items?.forEach((item: any) => {
      pdf.text(item.description || 'N/A', 20, yOffset);
      pdf.text(item.quantity?.toString() || 'N/A', 80, yOffset);
      pdf.text(formatLocalCurrency(item.unitPrice), 120, yOffset);
      pdf.text(formatLocalCurrency(item.amount), 160, yOffset);
      yOffset += 7;
    });

    yOffset += 5; // Extra space after items

    pdf.line(20, yOffset, 190, yOffset);
    yOffset += 5;

    pdf.setFont("helvetica", "normal");
    pdf.text(`Subtotal:`, 130, yOffset);
    pdf.text(formatLocalCurrency(invoiceData.subtotal || 0), 160, yOffset);
    yOffset += 7;

    pdf.text(`Tax:`, 130, yOffset);
    pdf.text(formatLocalCurrency(invoiceData.taxAmount || 0), 160, yOffset);
    yOffset += 7;

    pdf.setFont("helvetica", "bold");
    pdf.text(`Total (${invoiceData.currency ?? 'USD'}):`, 130, yOffset);
    pdf.text(formatLocalCurrency(invoiceData.totalAmount), 160, yOffset);
    yOffset += 10;

    if (invoiceData.paymentTerms) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(`Payment Terms: ${invoiceData.paymentTerms}`, 20, yOffset);
      yOffset += 7;
    }

    if (invoiceData.paymentMethod) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(`Payment Method: ${invoiceData.paymentMethod}`, 20, yOffset);
      yOffset += 7;
    }

    if (invoiceData.note) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text("Note:", 20, yOffset);
      pdf.text(invoiceData.note, 20, yOffset + 5);
    }

    pdf.save(`invoice_${invoiceData.invoiceNumber || 'generated'}.pdf`);
    toast.success("Invoice PDF downloaded successfully!", { closeButton: true });
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
                <Building2 className="h-4 w-4" />
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
                <Users className="h-4 w-4" />
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
                  {Array.isArray(invoiceData.items) && invoiceData.items.length > 0 ? (
                    invoiceData.items.map((item, index) => (
                      <tr key={index} className="border-b border-border/30">
                        <td className="p-2">{item.description || 'N/A'}</td>
                        <td className="p-2 text-right">{item.quantity || 'N/A'}</td>
                        <td className="p-2 text-right">{formatLocalCurrency(item.unitPrice)}</td>
                        <td className="p-2 text-right">{formatLocalCurrency(item.amount)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-2 text-center text-muted-foreground">No items found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between border-t border-border pt-2">
              <span>Subtotal:</span>
              <span>{formatLocalCurrency(invoiceData.subtotal || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>{formatLocalCurrency(invoiceData.taxAmount || 0)}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-border pt-2">
              <span>Total:</span>
              <span>{formatLocalCurrency(invoiceData.totalAmount)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Payment Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-3 rounded-md">
                <div className="text-sm font-medium">Payment Terms</div>
                <div className="text-sm">{invoiceData.paymentTerms || 'N/A'}</div>
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
    <section className="container mx-auto px-4 md:px-6 pb-16 mt-11 py-7">
      <Card className="shadow-2xl border-0 bg-card/50 backdrop-blur-sm">
        <div className="border-b border-border bg-background/20">
          <div className="flex flex-wrap gap-1 p-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === feature.id
                      ? "bg-background/80 shadow-sm border border-border"
                      : "hover:bg-background/40"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border ${feature.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">
                      {feature.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {feature.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <CardContent className="p-4 md:p-8 min-h-[600px]">
          {activeTab === "workflows" && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    Workflow Builder
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleLoginToast}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Step
                  </Button>
                </div>

                <div className="space-y-4">
                  {workflowSteps.map((step, index) => (
                    <div key={step.id} className="relative">
                      <div
                        className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${
                          step.status === "active"
                            ? "border-blue-500/50 bg-blue-900/20"
                            : step.status === "completed"
                            ? "border-green-500/50 bg-green-900/20"
                            : "border-border bg-secondary/50"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.status === "completed"
                              ? "bg-green-500 text-white"
                              : step.status === "active"
                              ? "bg-blue-500 text-white"
                              : "bg-muted-foreground text-muted"
                          }`}
                        >
                          {step.status === "completed" ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <step.icon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">
                            {step.title}
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {step.type}
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      {index < workflowSteps.length - 1 && (
                        <div className="flex justify-center py-2">
                          <ArrowRight
                            className="w-5 h-5 text-muted-foreground"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    Update Company
                  </h3>
                  <Badge variant="secondary">Action</Badge>
                </div>

                <Card className="bg-secondary/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center space-x-2 text-foreground">
                      <Building2 className="w-5 h-5" />
                      <span>Companies</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Record
                      </label>
                      <div className="mt-1 p-3 bg-blue-900/20 rounded-lg border border-blue-500/50">
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-300 font-medium">
                            Company
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Fields to update
                      </label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center space-x-3 p-3 bg-background/30 rounded-lg">
                          <Building2
                            className="w-4 h-4 text-muted-foreground"
                          />
                          <span className="font-medium text-foreground">
                            Name
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-background/30 rounded-lg">
                          <Users
                            className="w-4 h-4 text-muted-foreground"
                          />
                          <span className="font-medium text-foreground">
                            Account Owner
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "views" && (
            <div className="space-y-6 mt-9">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Financial View
                </h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">4 records</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleLoginToast}
                  >
                    Customize
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-border mt-9">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Serial No.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-background/50 divide-y divide-border">
                    {invoices.map((invoice) => (
                      <tr
                        key={invoice.invoiceNumber}
                        className="hover:bg-secondary/40"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-foreground">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium text-foreground">
                              {invoice.clientName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                          {formatCurrency({
                            amount: invoice.total,
                            currency: invoice.currency as any,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                          {new Intl.DateTimeFormat("en-US", {
                            dateStyle: "long",
                          }).format(invoice.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getInvoicesStatusBadge(invoice.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="space-y-6 mt-9">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Tasks
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLoginToast}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
              </div>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Task
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Assignee
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-background/50 divide-y divide-border">
                    {tasks.map((task, index) => (
                      <tr key={index} className="hover:bg-secondary/40">
                        <td className="px-6 py-4 whitespace-nowrap text-foreground">
                          {task.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getTaskStatusBadge(task.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                          {task.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Avatar className="w-8 h-8 mr-3">
                              <AvatarFallback className="text-xs bg-primary/20 text-foreground">
                                {task.assignee.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">
                              {task.assignee}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "ai-agents" && (
            <div className="space-y-4">
              <div
                className="p-4 rounded-lg border border-dashed border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                onClick={handleCopy}
              >
                <div className="flex items-center gap-3">
                  <Copy className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Copy Sample Prompt
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Click here to copy a sample invoice text to your
                      clipboard.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FileUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Paste invoice text
                  </span>
                </div>
                <Textarea
                  placeholder="Paste your invoice text here..."
                  className="min-h-[400px] bg-background text-foreground"
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
                        {result.invoiceData && (
                          <div className="mt-6 flex justify-end">
                            <Button onClick={() => handleDownloadPdf(result.invoiceData)} className="gap-2">
                              <FileText className="h-4 w-4" /> Download PDF
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="analysis" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <FileText className="h-5 w-5" />
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
                          <FileText className="h-5 w-5" />
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
          )}
        </CardContent>
      </Card>
    </section>
  );
}