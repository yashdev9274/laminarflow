import { Copy } from "lucide-react"; // Import the Copy icon
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample prompt text
export const samplePrompt = `INVOICE #INV-2023-1234
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

// New CopyToClipboard component
const CopyToClipboard = ({ text }: { text: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Sample prompt copied to clipboard!", {
        closeButton: true,
        duration: 3000,
      });
    }).catch((err) => {
      toast.error("Failed to copy text: " + err.message, {
        closeButton: true,
        duration: 3000,
      });
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Sample Invoice Prompt</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleCopy} className="flex items-center">
          <Copy className="mr-2" />
          Copy Sample Prompt
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CopyToClipboard; // Export the component