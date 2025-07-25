
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, DollarSign, User, Building } from "lucide-react";

interface InvoiceCardProps {
  data: {
    invoiceData?: {
      invoiceName?: string;
      invoiceNumber?: string;
      totalAmount?: number;
      currency?: string;
      fromName?: string;
      clientName?: string;
    };
    analysis?: string;
  };
}

export function InvoiceCard({ data }: InvoiceCardProps) {
  const { invoiceData, analysis } = data;

  if (!invoiceData) {
    return (
      <Card className="mt-2 border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Processing Failed</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{analysis || "The invoice could not be processed."}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-2 bg-secondary/50 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-primary" />
          Invoice Summary: {invoiceData.invoiceName || `#${invoiceData.invoiceNumber}`}
        </CardTitle>
        <CardDescription>Here is the extracted information from the invoice.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <strong>From:</strong>
            <span>{invoiceData.fromName || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <strong>To:</strong>
            <span>{invoiceData.clientName || 'N/A'}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 font-bold text-base">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <strong>Total Amount:</strong>
          <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: invoiceData.currency || 'USD' }).format(invoiceData.totalAmount || 0)}</span>
        </div>
        {analysis && (
          <div className="prose prose-sm prose-invert max-w-none mt-2 border-t border-border/50 pt-4">
            <h4 className="font-semibold">AI Analysis:</h4>
            <p className="text-muted-foreground">{analysis}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
