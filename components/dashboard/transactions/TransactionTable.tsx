import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";

export async function TransactionTable(){
   return(
      <div className="overflow-x-auto ml-2 min-h-[450px]">
         <Table className="min-w-full">
            <TableHeader>
               <TableRow>
                  <th className="text-left">Serial No.</th>
                  <th className="text-left">To/From</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Account</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Payment Method</th>
                  <th className="text-right">Action</th>
               </TableRow>
            </TableHeader>
            <TableBody>
               <TableRow>
                  <TableCell className="text-left">1</TableCell>
                  <TableCell className="text-left">John Doe</TableCell>
                  <TableCell className="text-left">$5000</TableCell>
                  <TableCell className="text-left">GTBank</TableCell>
                  <TableCell className="text-left">12/12/2021</TableCell>
                  <TableCell className="text-left">Bank Transfer</TableCell>
                  <TableCell className="text-right">Edit</TableCell>
               </TableRow>
            </TableBody>
            <TableCaption className="mt-5"> Record of your transactions.</TableCaption>

         </Table>
      </div>
   )
}