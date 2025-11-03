// lib/agents/invoice-analysis.ts
import { Langbase, Workflow } from "langbase";
import { z } from "zod";

// Define the environment type
interface InvoiceAnalysisEnv {
  LANGBASE_API_KEY: string;
  GOOGLE_API_KEY: string;
}

async function invoiceAnalysisWorkflow({ input, env }: { input: string; env: InvoiceAnalysisEnv }) {
  const langbase = new Langbase({
    apiKey: env.LANGBASE_API_KEY,
  });

  const { step } = new Workflow({
    debug: true,
  });

  // Step 1: Parse and extract structured invoice data from the input
  const extractedInvoice = await step({
    id: "extract_invoice_data",
    run: async () => {
      // Define schema matching your existing invoice structure
      const invoiceSchemaZod = z.object({
        invoiceName: z.string(),
        invoiceNumber: z.union([z.string(), z.number().transform(val => String(val))]),
        date: z.string(),
        dueDate: z.union([z.string(), z.number().transform(val => String(val))]),
        status: z.string(),
        currency: z.string(),
        subtotal: z.number(),
        taxAmount: z.number(),
        totalAmount: z.number(),
        fromName: z.string(),
        fromEmail: z.string(),
        fromAddress: z.string(),
        clientName: z.string(),
        clientEmail: z.string(),
        clientAddress: z.string(),
        items: z.array(z.object({
          description: z.string(),
          quantity: z.number(),
          unitPrice: z.number(),
          amount: z.number(),
        })).optional(),
        paymentTerms: z.string().optional(),
        paymentMethod: z.string().optional(),
        note: z.string().optional(),
      });
      
      // For Gemini, include schema in instructions
      const schemaDescription = `
      Extract the invoice information and return it in the following JSON format:
      {
        "invoiceName": "string - The name of the invoice",
        "invoiceNumber": "string - The invoice number",
        "date": "string - The invoice date (ISO format)",
        "dueDate": "string - Payment terms (e.g., "Net 30" or "Due on Receipt")",
        "status": "string - Current status (Draft, Sent, Paid, etc.)",
        "currency": "string - Currency code (INR, USD, EUR)",
        "subtotal": "number - Subtotal invoice amount",
        "taxAmount": "number - Tax amount",
        "totalAmount": "number - Total invoice amount",
        "fromName": "string - Sender's name",
        "fromEmail": "string - Sender's email",
        "fromAddress": "string - Sender's address",
        "clientName": "string - Client's name",
        "clientEmail": "string - Client's email",
        "clientAddress": "string - Client's address",
        "items": [
          {
            "description": "string - Description of the service/product",
            "quantity": "number - Quantity of items",
            "unitPrice": "number - Rate per item",
            "amount": "number - Total amount for this item"
          }
        ],
        "paymentTerms": "string - Payment terms (e.g., 'Due on receipt', 'Net 30')",
        "paymentMethod": "string - Preferred payment method (e.g., 'Bank Transfer', 'Credit Card')",
        "note": "string - Additional notes (optional)"
      }
      
      If information is not available, use reasonable placeholder values or 'N/A' for strings and 0 for numbers.
      Ensure the response is valid JSON that can be parsed.
      `;
      
      const tools = [
        {
          type: "function",
          function: {
            name: "extract_invoice_data",
            description: "Extracts data from an invoice."
            // Add any other necessary fields here
          }
        }
      ];
      
      const response = await langbase.agent.run({
        model: "google:gemini-2.0-flash-exp",
        apiKey: env.GOOGLE_API_KEY,
        instructions: `You are an invoice processing assistant for D3Flo. Extract all relevant invoice information from the text provided by the user. ${schemaDescription}`,
        input: [
          { role: "user", content: input }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_invoice_data",
              description: "Extracts data from an invoice."
              // Add any other necessary fields here
            }
          }
        ],
        stream: false,
      });
      
      try {
        // Parse the output as JSON
        return JSON.parse(response.output);
      } catch (error) {
        // If parsing fails, try to extract JSON from the text
        const jsonMatch = response.output.match(/```json\n([\s\S]*?)\n```/) || 
                          response.output.match(/{[\s\S]*}/);
        
        if (jsonMatch) {
          return JSON.parse(jsonMatch[1] || jsonMatch[0]);
        }
        
        // If all else fails, return a structured error
        return {
          error: "Failed to parse invoice data",
          rawOutput: response.output
        };
      }
    },
  });

  console.log("Extracted Invoice Data:", extractedInvoice);

  // Step 2: Analyze the invoice and provide business insights
  const invoiceAnalysis = await step({
    id: "analyze_invoice",
    run: async () => {
      // Check if we have valid invoice data
      if (extractedInvoice.error) {
        return `Error analyzing invoice: ${extractedInvoice.error}`;
      }
      
      const { output } = await langbase.agent.run({
        model: "google:gemini-2.0-flash-exp",
        apiKey: env.GOOGLE_API_KEY,
        instructions: `
          You are a financial analysis assistant for D3Flo. 
          Analyze the invoice data and provide business insights including:
          1. Payment timeline analysis (based on due date)
          2. Revenue implications
          3. Client relationship insights
          4. Suggestions for follow-up actions
          5. Any potential issues or discrepancies in the invoice
          
          Be specific, practical, and business-oriented in your analysis.
          Provide the analysis as a clear, concise text response, without any JSON formatting.
        `,
        input: [
          { 
            role: "user", 
            content: `Please analyze this invoice data for my business: ${JSON.stringify(extractedInvoice, null, 2)}` 
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_invoice_data",
              description: "Analyzes the invoice data for insights."
              // Add any other necessary fields here
            }
          }
        ],
        stream: false,
      });
      
      console.log("Invoice Analysis LLM Output:", output);
      return output;
    },
  });

  // Step 3: Generate payment reminder content if needed
  const paymentReminder = await step({
    id: "generate_payment_reminder",
    run: async () => {
      // Only generate payment reminder if invoice is not marked as paid
      if (extractedInvoice.error || extractedInvoice.status === "Paid") {
        return null;
      }
      
      const { output } = await langbase.agent.run({
        model: "google:gemini-2.0-flash-exp",
        apiKey: env.GOOGLE_API_KEY,
        instructions: `
          You are a professional communication assistant for D3Flo.
          Create a polite, professional payment reminder email template for the client.
          The email should:
          1. Be friendly but firm
          2. Reference the specific invoice details
          3. Clearly state the amount due and deadline
          4. Provide payment instructions
          5. End with a professional closing
          
          Format the email with appropriate subject line, greeting, body, and signature.
        `,
        input: [
          { 
            role: "user", 
            content: `Generate a payment reminder email for this invoice: ${JSON.stringify(extractedInvoice, null, 2)}` 
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_payment_reminder_data",
              description: "Generates a payment reminder email."
              // Add any other necessary fields here
            }
          }
        ],
        stream: false,
      });
      
      return output;
    },
  });

  // Step 4: Generate a final response with structured data and all analyses
  const finalResponse = await step({
    id: "generate_response",
    run: async () => {
      return {
        invoiceData: extractedInvoice,
        analysis: invoiceAnalysis,
        paymentReminder: paymentReminder,
        message: extractedInvoice.error 
          ? "Invoice processing encountered an error" 
          : "Invoice processed successfully."
      };
    },
  });

  return finalResponse;
}

async function main(event: { json: () => Promise<{ input: string }> }, env: InvoiceAnalysisEnv) {
  const { input } = await event.json();
  const result = await invoiceAnalysisWorkflow({ input, env });
  return result;
}

export default main;