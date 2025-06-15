import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireAuth";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import {  CreditCard, Wallet, XCircle } from "lucide-react";
import TransactionTableAction from "./transactionTableAction";
import { SmartphoneNfc } from "@/components/icons/smartphonenfc";
import { CheckIcon } from "@/components/icons/checkIcon";
import { SandClockIcon } from "@/components/icons/sandClockIcon";

async function getData(userId: string){
   const data = await prisma.transactions.findMany({
      where: {
         userId: userId,
      },
      select:{
         id: true,
         clientName: true,
         transactionNumber: true,
         amount: true,
         accountName: true,
         date: true,
         paymentMethod: true,
         status: true,
         createdAt: true,
      },
      orderBy:{
         createdAt: "desc",
      }
   })
   return data;
}

const getPaymentMethodBadge = (method: string) => {
    switch (method.toLowerCase()) {
        case "upi":
            return (
                <Badge variant="outline" className="bg-orange-200  text-orange-800 border-gray-300 gap-1 rounded px-2 py-1">
                  <SmartphoneNfc className="text-orange-600 "/>
                    {method}
                </Badge>
            );
        case "stripe":
            return (
                <Badge variant="secondary" className="gap-1 rounded px-2 py-1">
                  <CreditCard size={18} className="text-purple-600"/>
                    {method}
                </Badge>
            );
        case "cash":
            return (
                <Badge variant="outline" className="gap-1 rounded bg-blue-100 text-blue-800 border-blue-300 px-2 py-1">
                  <Wallet size={18} className="text-green-600"/>
                    {method}
                </Badge>
            );
        default:
            return (
                <Badge variant="outline" className="gap-1 rounded px-2 py-1">
                    {method}
                </Badge>
            );
    }
};

const getTransactionStatusBadge = (status: string) => {
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

export async function TransactionTable(){


   const session = await requireUser();

   const data = await getData(session.user?.id as string);
   return(
      <div className="overflow-x-auto ml-2 min-h-[450px]">
         <Table className="min-w-full">
            <TableHeader>
               <TableRow>
                  <th className="text-left">Serial No.</th>
                  <th className="text-left">To</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Account</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Payment Method</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Action</th>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.map((transactions)=>(
                  <TableRow key={transactions.id}>
                     <TableCell className="text-left">{transactions.transactionNumber}</TableCell>
                     <TableCell className="text-left">{transactions.clientName}</TableCell>
                     <TableCell className="text-left">{transactions.amount}</TableCell>
                     <TableCell className="text-left">{transactions.accountName}</TableCell>
                     <TableCell className="text-left">{new Intl.DateTimeFormat("en-US",{dateStyle: "long"}).format(transactions.createdAt)}</TableCell>
                     <TableCell className="text-left">
                        {getPaymentMethodBadge(transactions.paymentMethod)}
                     </TableCell>
                     <TableCell className="text-left">
                        {getTransactionStatusBadge(transactions.status)}
                     </TableCell>
                     <TableCell className="text-left"><TransactionTableAction status={transactions.status} id={transactions.id}/> </TableCell>
                  </TableRow>
               ))}
            </TableBody>
            <TableCaption className="mt-5"> Record of your transactions.</TableCaption>

         </Table>
      </div>
   )
}