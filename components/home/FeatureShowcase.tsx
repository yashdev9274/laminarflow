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
} from "lucide-react";
import { SandClockIcon } from "@/components/icons/sandClockIcon";
import { CheckIcon } from "@/components/icons/checkIcon";
import { formatCurrency } from "@/hooks/formatCurrency";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("views");

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
                />
              </div>
              <Button className="w-full" onClick={handleLoginToast}>
                <Send className="mr-2 h-4 w-4" />
                Process Invoice
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}