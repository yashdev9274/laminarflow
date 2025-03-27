import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Transactions(){
   return(
      <div className="flex flex-col gap-4 p-4 pt-0">
         <Card>
            <CardHeader>
               <div className="flex items-center justify-between ml-2">
                  <div >
                     <CardTitle className="text-lg font-semibold">
                        Transactions
                     </CardTitle>
                     <CardDescription className="text-sm">
                        Get real-time updates on your transactions.
                     </CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               TransactionTable
            </CardContent>
         </Card>
      </div>
   )
}