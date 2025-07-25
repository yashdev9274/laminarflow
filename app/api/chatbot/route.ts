import { NextRequest, NextResponse } from 'next/server';
import invoiceAgentMain from '@/lib/invoiceAgent';
import { Langbase } from "langbase";
import { requireUser } from "@/app/utils/requireAuth";
import { prisma } from "@/app/utils/db";

// A more detailed, conversational set of instructions for the main agent
const AGENT_INSTRUCTIONS = `You are D3Flo.ai, a world-class AI financial assistant. Your goal is to help users manage their business finances by intelligently using the tools at your disposal.

- **Be Conversational:** Interact with users in a friendly, professional, and helpful manner.
- **Clarify Ambiguity:** If a user's request is vague, ask clarifying questions. For example, if they say "show transactions," ask for a date range or a specific client.
- **Use Your Tools:** You have access to an Invoice Agent, a Transaction Agent, and a Customer Agent. Analyze the user's request to determine which tool is most appropriate.
- **Provide Rich Information:** When you return information, make it as useful as possible. For example, after processing an invoice, don't just say it's done; provide a summary.
- **User Context is Key:** Pay close attention to the provided user context to personalize your responses and understand their data.`;

// --- MOCK TOOL IMPLEMENTATIONS ---
// These simulate calling other agents or services.

async function process_invoice(invoiceText: string, env: { LANGBASE_API_KEY: string; GOOGLE_API_KEY: string; }) {
  console.log("Tool: process_invoice called");
  try {
    const event = { json: async () => ({ input: invoiceText }) };
    const result = await invoiceAgentMain(event, env);
    return {
      type: "invoice_summary",
      data: result,
    };
  } catch (error: any) {
    return { type: "error", data: { message: error.message } };
  }
}

async function get_transactions(query: string, userId: string) {
  console.log(`Tool: get_transactions called with query: "${query}"`);
  // In a real app, you'd query the database via Prisma
  // const transactions = await prisma.transaction.findMany({ where: { userId, ... } });
  return {
    type: "transaction_list",
    data: {
      query,
      // Mock data for demonstration
      transactions: [
        { id: "txn_1", date: "2025-07-24", amount: 150.00, description: "Web Development Services", status: "Paid" },
        { id: "txn_2", date: "2025-07-22", amount: -25.50, description: "Cloud Hosting Subscription", status: "Paid" },
        { id: "txn_3", date: "2025-07-21", amount: 750.00, description: "Design Consultation", status: "Pending" },
      ],
    },
  };
}

async function get_customer_info(customerIdentifier: string, userId: string) {
  console.log(`Tool: get_customer_info called for: "${customerIdentifier}"`);
  // In a real app, you'd query the database
  // const customer = await prisma.company.findFirst({ where: { userId, name: { contains: customerIdentifier } } });
  return {
    type: "customer_details",
    data: {
      // Mock data for demonstration
      name: "Acme Inc.",
      email: "contact@acme.com",
      totalBilled: 5250.00,
      outstandingBalance: 750.00,
      lastContact: "2025-07-15",
    },
  };
}

async function get_invoice_details(userId: string, invoiceIdentifier?: string) {
  console.log(`Tool: get_invoice_details called for user: ${userId}, identifier: ${invoiceIdentifier}`);
  const selectFields = {
    id: true,
    invoiceName: true,
    invoiceNumber: true,
    date: true,
    dueDate: true,
    status: true,
    currency: true,
    subtotal: true,
    taxAmount: true,
    totalAmount: true,
    fromName: true,
    fromEmail: true,
    fromAddress: true,
    clientName: true,
    clientEmail: true,
    clientAddress: true,
    items: true,
    paymentTerms: true,
    paymentMethod: true,
    note: true,
    createdAt: true,
    updatedAt: true,
  };

  let invoices;
  if (invoiceIdentifier) {
    // Try to find a specific invoice by number or ID
    invoices = await prisma.generatedInvoice.findMany({
      where: {
        userId: userId,
        OR: [
          { invoiceNumber: invoiceIdentifier },
          { id: invoiceIdentifier }
        ]
      },
      select: selectFields,
      take: 1, // Only need one if searching by identifier
    });
  } else {
    // If no identifier, return a list of recent invoices
    invoices = await prisma.generatedInvoice.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      select: selectFields,
      take: 5, // Get the 5 most recent invoices if no specific identifier is provided
    });
  }

  if (invoices.length > 0) {
    // Ensure `items` is an array for consistency with frontend InvoiceCard
    const formattedInvoices = invoices.map(invoice => ({
      ...invoice,
      // Ensure numeric fields are correctly parsed as floats
      subtotal: parseFloat(invoice.subtotal as any) || 0,
      taxAmount: parseFloat(invoice.taxAmount as any) || 0,
      totalAmount: parseFloat(invoice.totalAmount as any) || 0,
      // For items, iterate and parse if items exist and are an array
      items: Array.isArray(invoice.items) ? invoice.items.map((item: any) => ({
        ...item,
        quantity: parseFloat(item.quantity as any) || 0,
        unitPrice: parseFloat(item.unitPrice as any) || 0,
        amount: parseFloat(item.amount as any) || 0,
      })) : [],
    }));

    if (invoiceIdentifier && formattedInvoices.length > 0) {
      return {
        type: "invoice_details", // This type will be handled by InvoiceCard for single invoice
        data: { invoiceData: formattedInvoices[0] },
      };
    } else if (!invoiceIdentifier) {
      return {
        type: "invoice_list", // New type for listing multiple invoices
        data: { invoices: formattedInvoices },
      };
    } else {
      // If an identifier was provided but no invoice found
      return {
        type: "text",
        data: { message: `No invoice found with identifier: '${invoiceIdentifier}'.` },
      };
    }
  } else {
    return {
      type: "text",
      data: { message: "You don't have any saved invoices yet. Try processing and saving an invoice first!" },
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userMessage = body.message;
    const session = await requireUser();

    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!userMessage) return NextResponse.json({ error: "Message not provided" }, { status: 400 });

    const { LANGBASE_API_KEY, GOOGLE_API_KEY } = process.env;
    if (!LANGBASE_API_KEY || !GOOGLE_API_KEY) throw new Error("Missing API keys.");

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { firstName: true, email: true, _count: { select: { invoices: true, transactions: true, companies: true } } },
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const userContext = `User: ${user.firstName || user.email}. Invoices: ${user._count.invoices}, Transactions: ${user._count.transactions}, Companies: ${user._count.companies}.`;

    const langbase = new Langbase({ apiKey: LANGBASE_API_KEY });

    const tools = [
      { type: "function", function: { name: "process_invoice", description: "Processes an invoice from text to extract its data and analyze it.", parameters: { type: "object", properties: { invoiceText: { type: "string", description: "The full text of the invoice." } }, required: ["invoiceText"] } } } as const,
      { type: "function", function: { name: "get_transactions", description: "Retrieves a list of financial transactions based on a query.", parameters: { type: "object", properties: { query: { type: "string", description: "The user's query, e.g., 'last 5 transactions' or 'July payments'. If no specific query, summarize all transactions." } }, required: ["query"] } } } as const,
      { type: "function", function: { name: "get_customer_info", description: "Gets information about a specific customer.", parameters: { type: "object", properties: { customerIdentifier: { type: "string", description: "The name or ID of the customer." } } , required: ["customerIdentifier"] } } } as const,
      { type: "function", function: { name: "get_invoice_details", description: "Retrieves details for a specific invoice by its number or ID, or lists recent invoices if no identifier is provided.", parameters: { type: "object", properties: { invoiceIdentifier: { type: "string", description: "The invoice number or ID to retrieve." } }, required: [] } } } as const,
    ];

    const agentResponse = await langbase.agent.run({
      model: "google:gemini-2.0-flash-exp",
      apiKey: GOOGLE_API_KEY,
      instructions: `${AGENT_INSTRUCTIONS}\n\n${userContext}\n\n**IMPORTANT:** When the user asks for *any* information about invoices, such as "show my invoices," "details about invoices," "my invoice history," or "the last one generated with invoice agent," you MUST use the 'get_invoice_details' tool. If the user provides an invoice number or ID, pass it as 'invoiceIdentifier'; otherwise, call the tool without any parameters to list recent invoices. Do NOT try to answer directly about invoice details without using this tool.`,
      input: [{ role: "user", content: userMessage }],
      tools: tools,
      stream: false,
    });

    console.log("Langbase Agent Response:", JSON.stringify(agentResponse, null, 2));

    let botResponse;

    const messageContent = agentResponse.choices?.[0]?.message;

    if (messageContent?.content) { // Changed from messageContent?.output to messageContent?.content
      botResponse = { type: "text", data: { message: messageContent.content } };
    } else if (messageContent?.tool_calls && Array.isArray(messageContent.tool_calls) && messageContent.tool_calls.length > 0) {
      const toolCall = messageContent.tool_calls[0];
      console.log("Tool Call Detected:", JSON.stringify(toolCall, null, 2));
      const { name, arguments: argsString } = toolCall.function;

      let args: any = {};
      try {
        if (argsString) {
          args = JSON.parse(argsString);
        }
      } catch (parseError: any) {
        console.error("Error parsing tool arguments:", parseError);
        botResponse = { type: "error", data: { message: `Failed to parse tool arguments: ${parseError.message || "Unknown parsing error"}` } };
        return NextResponse.json({ response: botResponse }); // Exit early if arguments parsing fails
      }

      try {
        switch (name) {
          case "process_invoice":
            botResponse = await process_invoice(args.invoiceText, { LANGBASE_API_KEY, GOOGLE_API_KEY });
            break;
          case "get_transactions":
            botResponse = await get_transactions(args.query, session.user.id);
            break;
          case "get_customer_info":
            botResponse = await get_customer_info(args.customerIdentifier, session.user.id);
            break;
          case "get_invoice_details": // Handle the new tool
            botResponse = await get_invoice_details(session.user.id, args.invoiceIdentifier);
            break;
          default:
            botResponse = { type: "error", data: { message: `Unknown tool: ${name}` } };
        }
      } catch (toolError: any) {
        console.error(`Error executing tool '${name}':`, toolError);
        // Ensure the error message is always a string and not null/undefined
        const errorMessage = toolError.message || "An unknown error occurred during tool execution.";
        botResponse = { type: "error", data: { message: errorMessage } };
      }
    } else {
      botResponse = { type: "error", data: { message: "Sorry, I couldn't process that request. No tool calls or output from agent." } };
    }

    console.log("Final Bot Response sent to client:", JSON.stringify(botResponse, null, 2));

    // Ensure botResponse is a plain JSON object before sending
    const finalSerializableResponse = JSON.parse(JSON.stringify(botResponse));
    return NextResponse.json({ response: finalSerializableResponse });

  } catch (error) {
    console.error('Chatbot API error:', error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}