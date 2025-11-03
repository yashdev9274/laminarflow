
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface ErrorCardProps {
  data: {
    message: string;
  };
}

export function ErrorCard({ data }: ErrorCardProps) {
  return (
    <Card className="mt-2 border-destructive bg-destructive/10">
      <CardHeader className="flex flex-row items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <CardTitle className="text-destructive text-lg">An Error Occurred</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-destructive">{data.message || "An unknown error occurred."}</p>
      </CardContent>
    </Card>
  );
}
