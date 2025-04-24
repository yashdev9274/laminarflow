import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireAuth";
import { TransactionsStatsBlocks } from "@/components/dashboard/analytics/transactionsStatsBlcoks";
import { DashboardEmptyState } from "@/components/dashboard/emptyStates/dashboardEmptystate";
import { CreateTransactionSheet } from "@/components/dashboard/transactions/createTransactionSheet";
import TransactionInfo from "@/components/dashboard/transactions/transactionInfo";
import { TransactionTable } from "@/components/dashboard/transactions/TransactionTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeIndianRupee } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

async function getData(userId: string){
   const data = await prisma.transactions.findMany({
      where:{
         userId: userId,
      },
      select:{
         id:true,
      }
   })
   return data
}


export default async function Transactions(){

   const session = await requireUser();
   const data = await getData(session.user?.id as string)
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
            <Separator/>
            {data.length < 1 ? (
               <DashboardEmptyState
                  title="No transactions found"
                  description="Create a transaction to see it right here"
                  buttontext="Create Transaction"
                  href="/dashboard/transactions/"
               />
            ) : (
               <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
                  <TransactionsStatsBlocks/>
                  <Separator className="mb-5"/>
                  <CardContent className="mt-5">
                     <TransactionTable/>
                  </CardContent>
               </Suspense>
            )}
         </Card>
      </div>
   )
}