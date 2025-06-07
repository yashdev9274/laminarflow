// app/api/invoice-analysis/route.ts
import { NextRequest, NextResponse } from 'next/server';
import main from '@/lib/invoiceAgent';

export async function POST(request: NextRequest) {
  try {
    // Create an event-like object that matches what your agent expects
    const event = {
      json: async () => {
        const body = await request.json();
        return { input: body.input || "" };
      }
    };
    
    // Create an env object with the required API keys
    const env = {
      LANGBASE_API_KEY: process.env.LANGBASE_API_KEY || "user_3mEbufY5DQ2PLnUVJ6SvpttjRqUQ4c9MKUEBma9EET3tNWqAmd3qkh79xKgXVvYjmXZLVAtVZkZnmqhYevyHBYs2",
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "AIzaSyAPuwY4qoRyY_Fkec_N6w7fa4GD8WyVFys"
    };

    // Call the agent's main function
    const result = await main(event, env);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Invoice analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze invoice' },
      { status: 500 }
    );
  }
}


// export async function POST(request: NextRequest) {
//   try {
//     const session = await requireUser();
    
//     // Parse the request body
//     let body;
//     try {
//       body = await request.json();
//     } catch (error) {
//       console.error("Error parsing request body:", error);
//       return NextResponse.json(
//         { error: "Invalid JSON in request body" },
//         { status: 400 }
//       );
//     }
    
//     // Check if input exists
//     if (!body.input) {
//       return NextResponse.json(
//         { error: "Missing required field: input" },
//         { status: 400 }
//       );
//     }
    
//     // If input is a string (from AI agent), try to parse it
//     let input = body.input;
//     if (typeof input === 'string') {
//       try {
//         input = JSON.parse(input);
//       } catch (error) {
//         console.error("Error parsing input string:", error);
//         return NextResponse.json(
//           { error: "Invalid JSON in input string" },
//           { status: 400 }
//         );
//       }
//     }
    
//     // Validate the input data
//     const invoiceSchema = z.object({
//       invoiceName: z.string(),
//       invoiceNumber: z.number().or(z.string().transform(val => parseInt(val, 10))),
//       total: z.number().or(z.string().transform(val => parseInt(val, 10))),
//       status: z.enum(["PAID", "PENDING"]).default("PENDING"),
//       date: z.string().or(z.date().transform(d => d.toISOString())),
//       dueDate: z.number().or(z.string().transform(val => parseInt(val, 10))),
//       fromName: z.string(),
//       fromEmail: z.string().email(),
//       fromAddress: z.string(),
//       clientName: z.string(),
//       clientEmail: z.string().email(),
//       clientAddress: z.string(),
//       currency: z.string(),
//       note: z.string().optional(),
//       invoiceItemDescription: z.string(),
//       invoiceItemQuantity: z.number().or(z.string().transform(val => parseInt(val, 10))),
//       invoiceItemRate: z.number().or(z.string().transform(val => parseInt(val, 10))),
//     });
    
//     let validatedData;
//     try {
//       validatedData = invoiceSchema.parse(input);
//     } catch (error) {
//       console.error("Validation error:", error);
//       return NextResponse.json(
//         { error: "Invalid invoice data", details: error },
//         { status: 400 }
//       );
//     }
    
//     // Handle date format
//     let dateValue;
//     try {
//       dateValue = new Date(validatedData.date);
//       if (isNaN(dateValue.getTime())) {
//         throw new Error("Invalid date");
//       }
//     } catch (error) {
//       console.error("Date parsing error:", error);
//       return NextResponse.json(
//         { error: "Invalid date format" },
//         { status: 400 }
//       );
//     }
    
//     // Create the invoice
//     try {
//       const createdInvoice = await prisma.invoice.create({
//         data: {
//           userId: session.user?.id,
//           invoiceName: validatedData.invoiceName,
//           invoiceNumber: validatedData.invoiceNumber,
//           total: validatedData.total,
//           status: validatedData.status,
//           date: dateValue,
//           dueDate: validatedData.dueDate,
//           fromName: validatedData.fromName,
//           fromEmail: validatedData.fromEmail,
//           fromAddress: validatedData.fromAddress,
//           clientName: validatedData.clientName,
//           clientEmail: validatedData.clientEmail,
//           clientAddress: validatedData.clientAddress,
//           currency: validatedData.currency,
//           note: validatedData.note || "",
//           invoiceItemDescription: validatedData.invoiceItemDescription,
//           invoiceItemQuantity: validatedData.invoiceItemQuantity,
//           invoiceItemRate: validatedData.invoiceItemRate,
//         },
//       });
      
//       return NextResponse.json({
//         success: true,
//         invoice: createdInvoice
//       });
//     } catch (error) {
//       console.error("Database error:", error);
//       return NextResponse.json(
//         { error: "Failed to create invoice in database", details: error },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error("Unhandled error in POST route:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }