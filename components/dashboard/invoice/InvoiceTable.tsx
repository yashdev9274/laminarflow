""

import { prisma } from "@/app/utils/db";
import InvoiceTableAction from "./InvoiceTableAction";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHeader, TableRow } from "../../ui/table";
import { create } from "domain";
import { Prisma } from "@prisma/client";
import { requireUser } from "@/app/utils/requireAuth";
import { formatCurrency } from "@/hooks/formatCurrency";
import { Badge } from "../../ui/badge";
import { SandClockIcon } from "@/components/icons/sandClockIcon";
import { XCircle } from "lucide-react";
import { CheckIcon } from "@/components/icons/checkIcon";

async function getData(userId: string){
    const data = await prisma.invoice.findMany({
        where:{
            userId: userId, 
        },
        select:{
            id: true,
            clientName: true,
            total: true,
            status: true,
            invoiceNumber: true,
            currency: true,
            createdAt: true,
        },
        orderBy:{
            createdAt: "desc",
        }
    })
    return data;
}


const getInvoicesStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
        case "pending":
            return (
                <Badge variant="outline" className="gap-1 rounded bg-yellow-100 text-yellow-800 border-yellow-300 px-2 py-1">
                    <SandClockIcon size={18} aria-hidden="true" className="text-yellow-600"/>
                    {status}
                </Badge>
            );
        
        case "failed":
            return (
                <Badge variant="outline" className="gap-1 rounded bg-red-100 text-red-800 border-red-300 px-2 py-1">
                    <XCircle size={18} aria-hidden="true" className="text-red-600"/>
                    {status}
                </Badge>
            );
        default:
            return (
                <Badge variant="outline" className="gap-1 bg-green-100 text-green-800 border-green-300 px-2 py-1 rounded">
                    <CheckIcon className="text-emerald-500" size={18}/>
                    {status}
                </Badge>
            );
    }
};


export async function InvoiceTable() {

    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    return(
        <div className="overflow-x-auto ml-2 min-h-[450px] mt-7">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        <th className="text-left">Serial No.</th>
                        <th className="text-left">Customer</th>
                        <th className="text-left">Amount</th>
                        <th className="text-left">Date</th>
                        <th className="text-left">Status</th>
                        <th className="text-left">Action</th>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((invoice)=>(
                        <TableRow key={invoice.id}>
                            <TableCell className="text-left">{invoice.invoiceNumber}</TableCell>
                            <TableCell className="text-left">{invoice.clientName}</TableCell>
                            <TableCell className="text-left">{formatCurrency({amount: invoice.total, currency: invoice.currency as any})}</TableCell>
                            <TableCell className="text-left">{new Intl.DateTimeFormat("en-US",{dateStyle: "long"}).format(invoice.createdAt)}</TableCell>
                            <TableCell className="text-left">
                                {getInvoicesStatusBadge(invoice.status)}
                            </TableCell>
                            <TableCell className="text-left"><InvoiceTableAction status={invoice.status} id={invoice.id}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
                <TableCaption> Record of your invoices.</TableCaption>
            </Table>
        </div>
    )
}