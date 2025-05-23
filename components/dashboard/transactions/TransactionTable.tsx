import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireAuth";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { CheckIcon, Ellipsis } from "lucide-react";
import TransactionTableAction from "./transactionTableAction";

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
                     <TableCell className="text-left">{transactions.paymentMethod}</TableCell>
                     <TableCell className="text-left">
                        <Badge variant="outline" className="gap-1 rounded">
                           <CheckIcon className="text-emerald-500" size={12} aria-hidden="true"/>
                           {transactions.status}

                        </Badge>
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