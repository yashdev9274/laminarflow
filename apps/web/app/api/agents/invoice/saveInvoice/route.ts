import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireAuth";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const session = await requireUser();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const generatedInvoiceSchema = z.object({
      invoiceName: z.string(),
      invoiceNumber: z.string(),
      date: z.string(),
      dueDate: z.string(),
      status: z.string(),
      currency: z.string(),
      subtotal: z.number().int(),
      taxAmount: z.number().int(),
      totalAmount: z.number().int(),
      fromName: z.string(),
      fromEmail: z.string().email(),
      fromAddress: z.string(),
      clientName: z.string(),
      clientEmail: z.string().email(),
      clientAddress: z.string(),
      items: z.array(z.object({
        description: z.string(),
        quantity: z.number().int(),
        unitPrice: z.number().int(),
        amount: z.number().int(),
      })).optional(),
      paymentTerms: z.string().optional(),
      paymentMethod: z.string().optional(),
      note: z.string().optional(),
    });

    let validatedData;
    try {
      validatedData = generatedInvoiceSchema.parse(body.invoiceData);
    } catch (error) {
      console.error("Validation error:", error);
      return NextResponse.json(
        { error: "Invalid invoice data", details: error },
        { status: 400 }
      );
    }

    try {
      const createdGeneratedInvoice = await prisma.generatedInvoice.create({
        data: {
          userId: session.user.id,
          invoiceName: validatedData.invoiceName,
          invoiceNumber: validatedData.invoiceNumber,
          date: validatedData.date,
          dueDate: validatedData.dueDate,
          status: validatedData.status,
          currency: validatedData.currency,
          subtotal: validatedData.subtotal,
          taxAmount: validatedData.taxAmount,
          totalAmount: validatedData.totalAmount,
          fromName: validatedData.fromName,
          fromEmail: validatedData.fromEmail,
          fromAddress: validatedData.fromAddress,
          clientName: validatedData.clientName,
          clientEmail: validatedData.clientEmail,
          clientAddress: validatedData.clientAddress,
          items: validatedData.items, // Pass the object directly
          paymentTerms: validatedData.paymentTerms,
          paymentMethod: validatedData.paymentMethod,
          note: validatedData.note,
        },
      });

      return NextResponse.json({
        success: true,
        generatedInvoice: createdGeneratedInvoice,
      });
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to save generated invoice to database", details: error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unhandled error in POST route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 