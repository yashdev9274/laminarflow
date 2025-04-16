'use server'

import { redirect } from "next/navigation";
import { prisma } from "./db";
import { requireUser } from "./requireAuth"
import { earlyAccessSchema, invoiceSchema, onboardingUserSchema, transactionSchema } from "./zodSchema";
import {parseWithZod} from "@conform-to/zod"
import { emailClient } from "./mailtrap";
import { formatCurrency } from "@/hooks/formatCurrency";

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