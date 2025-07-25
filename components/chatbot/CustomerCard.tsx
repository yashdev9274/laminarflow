
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Mail, DollarSign, Calendar } from "lucide-react";

interface CustomerCardProps {
  data: {
    name: string;
    email: string;
    totalBilled: number;
    outstandingBalance: number;
    lastContact: string;
  };
}

export function CustomerCard({ data }: CustomerCardProps) {
  return (
    <Card className="mt-2 bg-secondary/50 border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          Customer Details: {data.name}
        </CardTitle>
        <CardDescription>Contact and financial summary for this customer.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <strong>Email:</strong>
          <a href={`mailto:${data.email}`} className="text-primary hover:underline">
            {data.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <strong>Last Contact:</strong>
          <span>{data.lastContact}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <strong>Total Billed:</strong>
          <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.totalBilled)}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-destructive" />
          <strong>Outstanding:</strong>
          <span className="font-bold text-destructive">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.outstandingBalance)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
