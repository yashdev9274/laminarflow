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
                            <TableCell className="text-left"><Badge>{invoice.status}</Badge></TableCell>
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