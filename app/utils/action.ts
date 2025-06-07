'use server'

import { redirect } from "next/navigation";
import { prisma } from "./db";
import { requireUser } from "./requireAuth"
import { companySchema, earlyAccessSchema, invoiceSchema, onboardingUserSchema, transactionSchema } from "./zodSchema";
import {parseWithZod} from "@conform-to/zod"
import { emailClient } from "./mailtrap";
import { formatCurrency } from "@/hooks/formatCurrency";
import { request } from "@arcjet/next";
import aj from "@/lib/arcjet";
import { useLogSnag } from "@logsnag/next";
import main from "@/lib/invoiceAgent";

export async function onboardUser(prevState: any, formData: FormData){
    const session = await requireUser(); 

    const submission = parseWithZod(formData,{
        schema: onboardingUserSchema,
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.user.update({
        where:{
            id: session.user?.id,
        },
        data:{
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
        },
    });

    return redirect('/dashboard');
}

export async function createInvoice(prevState: any, formData: FormData){
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.invoice.create({
        data: {
            invoiceName: submission.value.invoiceName,
            total: submission.value.total,
            status: submission.value.status,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromName: submission.value.fromName,
            fromEmail: submission.value.fromEmail,
            fromAddress: submission.value.fromAddress,
            clientName: submission.value.clientName,
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            currency: submission.value.currency,
            invoiceNumber: submission.value.invoiceNumber,
            note: submission.value.note,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            userId: session.user?.id,
        }
    });


    const sender={
        email:"hello@demomailtrap.com",
        name: "D3Flo",
    };
    
    try {
        emailClient.send({
            from: sender,
            to: [{ email: "yashdev.yvd@gmail.com" }],
            template_uuid: "ee30e59c-f290-4575-9beb-61b8e50a91e7",
            template_variables: {
            clientName: submission.value.clientName,
            invoiceNumber: submission.value.invoiceNumber,
            dueDate: submission.value.dueDate,
            invoiceAmount: formatCurrency({amount: submission.value.total, currency: submission.value.currency as any}),
            invoiceLink: "Test_InvoiceLink"
            }
        });
    } catch (error) {
        console.error("Failed to send email:", error);
    }

    return redirect('/dashboard/invoices');
}

export async function createEarlyAccessUser(prevState: any, formData: FormData){

    const submission = parseWithZod(formData,{
        schema: earlyAccessSchema
    })

    if(submission.status !== "success"){
        return submission.reply()
    }

    const data = await prisma.earlyAccess.create({
        data:{
            email: submission.value.email
        }
    })

    

    return redirect('/');



}

// export async function createEarlyAccessUser(data: FormData) {
//     try {
//       const email = data.get('email')
//       const validated = earlyAccessSchema.parse({ email })
  
//       const exists = await prisma.earlyAccess.findUnique({
//         where: { email: validated.email }
//       })
  
//       if (exists) {
//         return { error: "You're already on the waitlist!" }
//       }
  
//       await prisma.earlyAccess.create({
//         data: { email: validated.email }
//       })
  
//       return { success: true }
//     } catch (error) {
//       return { error: "Invalid email address" }
//     }
//   }



// Create new transaction

export async function createTransaction(prevState: any, formData: FormData){
    
    
        
        const session = await requireUser();
        const submission = parseWithZod(formData, {
            schema: transactionSchema,
        });

        if(submission.status !== "success"){
            return submission.reply();
        }

        // get request for arcjet
        const req = await request();

        // check rate limit

        // const userId = session?.user?.id as string;

        const decision = await aj.protect(req,{
            requested:1,

        })

        if (decision.isDenied()){
            if(decision.reason.isRateLimit()){
                const {remaining,reset} =  decision.reason;
                console.error({
                    code: "RATE_LIMIT_EXCEEDED",
                    details:{
                        remaining,
                        resetInSeconds: reset,
                    }
                });

                throw new Error("Rate limit exceeded. Please try again later.");
            }
            throw new Error("Request blocked.");
        }

        const data = await prisma.transactions.create({
            data:{
                fromName: submission.value.fromName,
                clientName: submission.value.clientName,
                transactionNumber: submission.value.transactionNumber,
                amount: submission.value.amount,
                currency: submission.value.currency,
                category: submission.value.category,
                transactionDescription: submission.value.transactionDescription,
                accountName: submission.value.accountName,
                date: submission.value.date,
                status: submission.value.status,
                paymentMethod: submission.value.paymentMethod,
                userId: session.user?.id,
            }
        })

        return redirect('/dashboard/transactions');

    

    
}

export async function createCompany(prevState: any, formData: FormData){

    const session = await requireUser();

    const submission = parseWithZod(formData,{
        schema: companySchema,
    })

    if(submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.companies.create({
        data:{
            name: submission.value.name,
            domainName: submission.value.domainName,
            accountOwner: submission.value.accountOwner,
            employees: submission.value.employees,
            address: submission.value.address,
            date: submission.value.date,
            total: submission.value.total,
            description: submission.value.description,
            userId: session.user?.id,
        }
    })

    return redirect("/dashboard/companies")

}

// Invoice agent

export async function createInvoiceAgent(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    const invoice = await prisma.invoice.create({
        data: {
            invoiceName: submission.value.invoiceName,
            total: submission.value.total,
            status: submission.value.status,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromName: submission.value.fromName,
            fromEmail: submission.value.fromEmail,
            fromAddress: submission.value.fromAddress,
            clientName: submission.value.clientName,
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            currency: submission.value.currency,
            invoiceNumber: submission.value.invoiceNumber,
            note: submission.value.note,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            userId: session.user?.id,
        }
    });

    const sender={
        email:"hello@demomailtrap.com",
        name: "D3Flo",
    };
    
    try {
        emailClient.send({
            from: sender,
            to: [{ email: "yashdev.yvd@gmail.com" }],
            template_uuid: "ee30e59c-f290-4575-9beb-61b8e50a91e7",
            template_variables: {
            clientName: submission.value.clientName,
            invoiceNumber: submission.value.invoiceNumber,
            dueDate: submission.value.dueDate,
            invoiceAmount: formatCurrency({amount: submission.value.total, currency: submission.value.currency as any}),
            invoiceLink: "Test_InvoiceLink"
            }
        });
    } catch (error) {
        console.error("Failed to send email:", error);
    }

    // Run invoice analysis in the background (non-blocking)
    try {
        // Create a formatted invoice text for the AI to analyze
        const invoiceText = `
INVOICE #${invoice.invoiceNumber}
Date: ${new Date(invoice.date).toISOString().split('T')[0]}
Due Date: ${invoice.dueDate === 0 ? 'Immediate' : `Net ${invoice.dueDate}`}

From:
${invoice.fromName}
${invoice.fromAddress}
Email: ${invoice.fromEmail}

To:
${invoice.clientName}
${invoice.clientAddress}
Email: ${invoice.clientEmail}

Items:
1. ${invoice.invoiceItemDescription} - ${invoice.invoiceItemQuantity} units @ ${formatCurrency({amount: invoice.invoiceItemRate, currency: invoice.currency as any})} = ${formatCurrency({amount: invoice.total, currency: invoice.currency as any})}

Total: ${formatCurrency({amount: invoice.total, currency: invoice.currency as any})}

Payment Terms: ${invoice.dueDate === 0 ? 'Due Immediately' : `Net ${invoice.dueDate}`}
`;

        // We don't await this to avoid blocking the redirect
        const event = {
            json: async () => ({ input: invoiceText })
        };

        const env = {
            LANGBASE_API_KEY: process.env.LANGBASE_API_KEY!,
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY!,
        };

        // Call the agent in the background
        main(event, env).then(result => {
            // Store the analysis in the database
            prisma.invoiceAnalysis.create({
                data: {
                    invoiceId: invoice.id,
                    analysis: result.analysis,
                    paymentReminder: result.paymentReminder || null,
                }
            }).catch(error => {
                console.error("Failed to store invoice analysis:", error);
            });
        }).catch(error => {
            console.error("Invoice analysis failed:", error);
        });
    } catch (error) {
        console.error("Failed to start invoice analysis:", error);
    }

    return redirect('/dashboard/invoices');
}