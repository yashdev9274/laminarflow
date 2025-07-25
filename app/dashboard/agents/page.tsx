"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Bot, User2, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Import the rich response components
import { TransactionTable } from "@/components/chatbot/TransactionTable";
import { CustomerCard } from "@/components/chatbot/CustomerCard";
import { ErrorCard } from "@/components/chatbot/ErrorCard";

// Define the structure for a message, which can now contain structured data
interface Message {
  id: number;
  sender: "user" | "bot";
  timestamp: string;
  content: {
    type: "text" | "invoice_summary" | "transaction_list" | "customer_details" | "error" | "invoice_list" | "invoice_details";
    data: any;
  };
}

// A mapping from content type to its corresponding React component
const componentMap = {
  transaction_list: TransactionTable,
  customer_details: CustomerCard,
  error: ErrorCard,
};

export default function AgentsChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Add initial welcome message from the bot
    setMessages([
      {
        id: 1,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
        content: {
          type: "text",
          data: { message: "Hello! I'm D3Flo.ai, your financial assistant. How can I help you today? You can ask me to process an invoice, show recent transactions, or look up a customer." },
        },
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
      content: { type: "text", data: { message: input } },
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response from the assistant");
      }

      const botResponse = await response.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
        content: botResponse.response || { type: "error", data: { message: "Received an empty response." } },
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error: any) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
        content: { type: "error", data: { message: error.message } },
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (content: Message['content']) => {
    if (content.type === "invoice_details" && content.data.invoiceData) {
      const invoice = content.data.invoiceData;
      let invoiceText = `--- Invoice Details ---
`;
      invoiceText += `Invoice Name: ${invoice.invoiceName || 'N/A'}
`;
      invoiceText += `Invoice Number: ${invoice.invoiceNumber || 'N/A'}
`;
      invoiceText += `Date: ${invoice.date || 'N/A'}
`;
      invoiceText += `Due Date: ${invoice.dueDate || 'N/A'}
`;
      invoiceText += `Status: ${invoice.status || 'N/A'}
`;
      invoiceText += `Currency: ${invoice.currency || 'N/A'}
`;
      invoiceText += `Subtotal: ${invoice.subtotal !== undefined && invoice.subtotal !== null ? '$' + invoice.subtotal.toFixed(2) : 'N/A'}
`;
      invoiceText += `Tax Amount: ${invoice.taxAmount !== undefined && invoice.taxAmount !== null ? '$' + invoice.taxAmount.toFixed(2) : 'N/A'}
`;
      invoiceText += `Total Amount: ${invoice.totalAmount !== undefined && invoice.totalAmount !== null ? '$' + invoice.totalAmount.toFixed(2) : 'N/A'}
`;
      invoiceText += `From: ${invoice.fromName || 'N/A'} (${invoice.fromEmail || 'N/A'})
`;
      invoiceText += `From Address: ${invoice.fromAddress || 'N/A'}
`;
      invoiceText += `Client: ${invoice.clientName || 'N/A'} (${invoice.clientEmail || 'N/A'})
`;
      invoiceText += `Client Address: ${invoice.clientAddress || 'N/A'}
`;
      
      if (Array.isArray(invoice.items) && invoice.items.length > 0) {
        invoiceText += `Items:
`;
        invoice.items.forEach((item: any, index: number) => {
          invoiceText += `  ${index + 1}. Description: ${item.description || 'N/A'}, Quantity: ${item.quantity || 'N/A'}, Unit Price: ${item.unitPrice !== undefined && item.unitPrice !== null ? '$' + item.unitPrice.toFixed(2) : 'N/A'}, Amount: ${item.amount !== undefined && item.amount !== null ? '$' + item.amount.toFixed(2) : 'N/A'}
`;
        });
      }

      if (invoice.paymentTerms) invoiceText += `Payment Terms: ${invoice.paymentTerms}
`;
      if (invoice.paymentMethod) invoiceText += `Payment Method: ${invoice.paymentMethod}
`;
      if (invoice.note) invoiceText += `Note: ${invoice.note}
`;

      return <p className="text-sm whitespace-pre-wrap">{invoiceText}</p>;
    }

    if (content.type === "invoice_list" && Array.isArray(content.data.invoices)) {
      let listText = `--- Recent Invoices ---
`;
      if (content.data.invoices.length === 0) {
        listText += "No recent invoices found.\n";
      } else {
        content.data.invoices.forEach((invoice: any, index: number) => {
          listText += `${index + 1}. Invoice #: ${invoice.invoiceNumber || 'N/A'}, Client: ${invoice.clientName || 'N/A'}, Total: ${invoice.totalAmount !== undefined && invoice.totalAmount !== null ? '$' + invoice.totalAmount.toFixed(2) : 'N/A'}, Status: ${invoice.status || 'N/A'}
`;
        });
      }
      return <p className="text-sm whitespace-pre-wrap">{listText}</p>;
    }

    const Component = componentMap[content.type as keyof typeof componentMap];
    if (Component) {
      return <Component data={content.data} />;
    }
    // Default to rendering plain text
    return <p className="text-sm whitespace-pre-wrap">{content.data.message}</p>;
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="bg-card border-border shadow-lg">
        <CardHeader className="pb-4 border-b border-border">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            D3Flo AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex flex-col h-[600px]">
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === 'bot' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                  <div
                    className={`max-w-[85%] rounded-lg ${message.sender === "user"
                        ? "bg-primary text-primary-foreground p-3"
                        : "bg-muted/40 p-0"
                      }`}
                  >
                    {message.sender === 'user' ? (
                      <p className="text-sm">{message.content.data.message}</p>
                    ) : (
                      renderContent(message.content)
                    )}
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-muted-foreground px-3 pb-2'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                   {message.sender === 'user' && <User2 className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="mt-auto pt-4 border-t border-border">
            <div className="relative">
              <Textarea
                placeholder="Ask about an invoice, transactions, or customers..."
                className="flex-1 w-full min-h-[50px] max-h-[150px] bg-background text-foreground resize-none pr-20"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !input.trim()}
                className="absolute top-1/2 right-3 -translate-y-1/2"
                size="icon"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border pt-4 text-sm text-muted-foreground">
          Powered by D3Flo AI & Langbase
        </CardFooter>
      </Card>
    </div>
  );
} 