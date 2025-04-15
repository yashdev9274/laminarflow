import {z} from "zod";

export const onboardingUserSchema = z.object({
    firstName: z.string().min(2, "First Name is required"),
    lastName: z.string().min(2, "Last Name is required"),
    address: z.string().min(2, "Address is required"),
});

export const earlyAccessSchema = z.object({
    email:z.string().email("Invalid Email")
})

export const invoiceSchema = z.object({
    invoiceName: z.string().min(2, "Invoice Name is required"),
    invoiceNumber: z.number().min(1, "Minimum value is 1"),
    total:  z.number().min(1, "Total is required"),
    status: z.enum(["PAID","PENDING"]).default("PENDING"),
    date: z.string().min(1,"Date is required"),
    dueDate: z.number().min(0, "Due Date is required"),
    fromName: z.string().min(2, "From Name is required"),
    fromEmail: z.string().email("Invalid Email"),
    fromAddress: z.string().min(2,"Address is required"),
    clientName: z.string().min(2, "Client Name is required"),
    clientEmail: z.string().email("Invalid Email"),
    clientAddress: z.string().min(2,"Client address is required"),
    currency: z.string().min(1, "Currency is required"),
    note: z.string().optional(),
    invoiceItemDescription: z.string().min(2,"Description is required"),
    invoiceItemQuantity: z.number().min(1, "Quantity is required"),
    invoiceItemRate: z.number().min(1, "Price is required"),
});

export const transactionSchema = z.object({
    fromName: z.string().min(2, "Sender Name is required"),
    clientName: z.string().min(2,"Receiver Name is required"),
    transactionNumber: z.number().min(1,"Transaction Number is required"),
    amount: z.number().min(1, "Amount is required"),
    currency: z.string().min(1,"Currency Number is required"),
    category: z.string().min(1,"Category Number is required"),
    transactionDescription: z.string().min(1,"Transactional Description Number is required"),
    accountName: z.string().min(1,"Account Name is required"),
    date: z.string().min(1,"Date is required"),
    status: z.enum(["PENDING", "COMPLETED", "FAILED"]).default("PENDING"),
    paymentMethod: z.string().min(1,"Payment Method is required"),
});