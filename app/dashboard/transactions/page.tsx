import { CreateTransactionSheet } from "@/components/dashboard/transactions/createTransactionSheet";
import TransactionInfo from "@/components/dashboard/transactions/transactionInfo";
import { TransactionTable } from "@/components/dashboard/transactions/TransactionTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeIndianRupee } from "lucide-react";

export default function Transactions(){
   return(
      <div className="flex flex-col gap-4 p-4 pt-0">
         <Card>
            <CardHeader>
               <div className="flex items-center justify-between ml-2">
                  <div >
                     <CardTitle className="text-lg font-semibold">
                        <div className="flex items-center gap-4">
                           <BadgeIndianRupee/> 
                           Transactions
                           <TransactionInfo/>

                        </div>
                     </CardTitle>
                     <CardDescription className="text-sm">
                        Get real-time updates on your transactions.
                     </CardDescription>
                  </div>
                  <CreateTransactionSheet/>
               </div>
            </CardHeader>
            <CardContent>
               <TransactionTable/>
            </CardContent>
         </Card>
      </div>
   )
}