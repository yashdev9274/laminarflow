""

import { prisma } from "@/app/utils/db";
import InvoiceTableAction from "./InvoiceTableAction";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHeader, TableRow } from "../../ui/table";
import { create } from "domain";
import { Prisma } from "@prisma/client";
import { requireUser } from "@/app/utils/requireAuth";
import { formatCurrency } from "@/hooks/formatCurrency";
import { Badge } from "../../ui/badge";

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

export async function InvoiceTable() {

    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    return(
        <div className="overflow-x-auto ml-2 min-h-[450px]">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        <th className="text-left">Serial No.</th>
                        <th className="text-left">Customer</th>
                        <th className="text-left">Amount</th>
                        <th className="text-left">Date</th>
                        <th className="text-left">Status</th>
                        <th className="text-right">Action</th>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((invoice)=>(
                        <TableRow key={invoice.id}>
                            <TableCell>{invoice.invoiceNumber}</TableCell>
                            <TableCell>{invoice.clientName}</TableCell>
                            <TableCell>{formatCurrency({amount: invoice.total, currency: invoice.currency as any})}</TableCell>
                            <TableCell>{new Intl.DateTimeFormat("en-US",{dateStyle: "long"}).format(invoice.createdAt)}</TableCell>
                            <TableCell><Badge>{invoice.status}</Badge></TableCell>
                            <TableCell><InvoiceTableAction status={invoice.status} id={invoice.id}/></TableCell>
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