
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: "Paid" | "Sent" | "Draft";
}

interface InvoiceListProps {
  data: {
    query: string;
    invoices: Invoice[];
  };
}

export function InvoiceList({ data }: InvoiceListProps) {
  const { query, invoices } = data;

  const getStatusVariant = (status: Invoice['status']) => {
    switch (status) {
      case "Paid": return "success";
      case "Sent": return "secondary";
      case "Draft": return "default";
      default: return "default";
    }
  };

  return (
    <Card className="mt-2 bg-secondary/50 border-border">
      <CardHeader>
        <CardTitle>Invoice Results</CardTitle>
        <CardDescription>Showing results for your query: "{query}"</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                <TableCell>{inv.clientName}</TableCell>
                <TableCell className="text-right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(inv.amount)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getStatusVariant(inv.status)}>{inv.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
