'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { downloadCSV } from "@/lib/csv";
import { prisma } from "../utils/db";
// import { prisma } from "@/lib/prisma"; // Ensure you have a Prisma client instance


// interface View {
//   id: string;
//   viewerEmail: string | null;
//   documentName: string;
//   linkName: string;
//   viewedAt: Date;
//   totalDuration: number;
//   completionRate: number;
//   verified?: boolean;
//   internal?: boolean;
//   agreementResponse?: any;
//   downloadedAt?: Date;
//   dataroomId?: string;
//   feedbackResponse?: any;
//   versionNumber?: number;
//   versionNumPages?: number;
//   documentId?: string;
//   teamId?: string;
// }

export default function ExportButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      // Fetch data from the database using Prisma
      const data = await prisma.transactions.findMany(); // Replace 'yourTableName' with your actual table name

      // Use the downloadCSV function to export the data
      downloadCSV(data, "exported_data");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="outline" size="sm" onClick={handleExport} disabled={loading}>
        {/* <Download className="!size-4" /> */}
        {loading ? "Exporting..." : "Export"}
      </Button>
    </div>
  );
}