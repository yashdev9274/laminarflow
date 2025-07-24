import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import { formatCurrency } from "@/hooks/formatCurrency";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { generatedInvoiceId: string };
  }
) {
  const { generatedInvoiceId } = await params;

  const data = await prisma.generatedInvoice.findUnique({
    where: {
      id: generatedInvoiceId,
    },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      date: true,
      dueDate: true,
      items: true, // This is JSON string
      totalAmount: true,
      subtotal: true,
      taxAmount: true,
      paymentTerms: true,
      paymentMethod: true,
      note: true,
    },
  });

  if (!data) {
    return NextResponse.json({ error: "Generated Invoice not found" }, { status: 404 });
  }

  let itemsArray: any[] = [];
  if (data.items) {
    // items is already parsed by Prisma, no need for JSON.parse()
    itemsArray = data.items as any[];
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  pdf.setFont("helvetica");

  pdf.setFontSize(24);
  pdf.text(data.invoiceName, 20, 20);

  pdf.setFontSize(12);
  pdf.text("From", 20, 40);
  pdf.setFontSize(10);
  pdf.text([data.fromName, data.fromEmail, data.fromAddress], 20, 45);

  pdf.setFontSize(12);
  pdf.text("Bill to", 20, 70);
  pdf.setFontSize(10);
  pdf.text([data.clientName, data.clientEmail, data.clientAddress], 20, 75);

  pdf.setFontSize(10);
  pdf.text(`Invoice Number: #${data.invoiceNumber}`, 120, 40);
  pdf.text(`Date: ${data.date}`, 120, 45);
  pdf.text(`Due Date: ${data.dueDate}`, 120, 50);

  let yOffset = 100;

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Description", 20, yOffset);
  pdf.text("Quantity", 80, yOffset);
  pdf.text("Rate", 120, yOffset);
  pdf.text("Amount", 160, yOffset);
  pdf.line(20, yOffset + 2, 190, yOffset + 2);
  yOffset += 10;

  pdf.setFont("helvetica", "normal");
  itemsArray.forEach((item: any) => {
    pdf.text(item.description || 'N/A', 20, yOffset);
    pdf.text(item.quantity?.toString() || 'N/A', 80, yOffset);
    pdf.text(formatCurrency({ amount: item.unitPrice, currency: data.currency as any }), 120, yOffset);
    pdf.text(formatCurrency({ amount: item.amount, currency: data.currency as any }), 160, yOffset);
    yOffset += 7;
  });

  yOffset += 5; // Extra space after items

  pdf.line(20, yOffset, 190, yOffset);
  yOffset += 5;

  pdf.setFont("helvetica", "normal");
  pdf.text(`Subtotal:`, 130, yOffset);
  pdf.text(formatCurrency({ amount: data.subtotal, currency: data.currency as any }), 160, yOffset);
  yOffset += 7;

  pdf.text(`Tax:`, 130, yOffset);
  pdf.text(formatCurrency({ amount: data.taxAmount, currency: data.currency as any }), 160, yOffset);
  yOffset += 7;

  pdf.setFont("helvetica", "bold");
  pdf.text(`Total (${data.currency}):`, 130, yOffset);
  pdf.text(formatCurrency({ amount: data.totalAmount, currency: data.currency as any }), 160, yOffset);
  yOffset += 10;

  if (data.paymentTerms) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(`Payment Terms: ${data.paymentTerms}`, 20, yOffset);
    yOffset += 7;
  }

  if (data.paymentMethod) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(`Payment Method: ${data.paymentMethod}`, 20, yOffset);
    yOffset += 7;
  }

  if (data.note) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("Note:", 20, yOffset);
    pdf.text(data.note, 20, yOffset + 5);
  }

  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="invoice-${data.invoiceNumber}.pdf"`,
    },
  });
} 