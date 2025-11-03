'use client';

import CreateButton from "@/app/components/createButton";
import { ReceiptIndianRupee } from "lucide-react";

export function ClientCreateInvoiceButton() {
  return (
    <CreateButton
      text="Create Invoice"
      href="/dashboard/invoices"
      Icon={ReceiptIndianRupee}
    />
  );
} 