
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: "Paid" | "Pending" | "Failed";
}

interface TransactionTableProps {
  data: {
    query: string;
    transactions: Transaction[];
  };
}

export function TransactionTable({ data }: TransactionTableProps) {
  const { query, transactions } = data;

  const getStatusVariant = (status: Transaction['status']) => {
    switch (status) {
      case "Paid": return "success";
      case "Pending": return "secondary";
      case "Failed": return "destructive";
      default: return "default";
    }
  };

  return (
    <Card className="mt-2 bg-secondary/50 border-border">
      <CardHeader>
        <CardTitle>Transaction Results</CardTitle>
        <CardDescription>Showing results for your query: "{query}"</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell className="text-right font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tx.amount)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getStatusVariant(tx.status)}>{tx.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
