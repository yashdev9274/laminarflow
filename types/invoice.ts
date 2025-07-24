export interface GeneratedInvoice {
    id: string;
    invoiceName: string;
    invoiceNumber: string;
    date: string;
    dueDate: string;
    status: string;
    currency: string;
    subtotal: number;
    taxAmount: number;
    totalAmount: number;
    fromName: string;
    fromEmail: string;
    fromAddress: string;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    items: any[]; // Parsed JSON array
    paymentTerms?: string;
    paymentMethod?: string;
    note?: string;
    createdAt: string;
  } 