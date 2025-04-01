import { Table, TableHeader, TableRow } from "@/components/ui/table";

export default function CompaniesTable(){
   return(
      <div className="overflow-x-auto ml-2 min-h-[450px]">
         <Table className="min-w-full">
            <TableHeader>
               <TableRow>
                  <th className="text-left">Serial No.</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Domain Name</th>
                  <th className="text-left">Account Owner</th>
                  <th className="text-left">Creation Date</th>
                  <th className="text-left">Employees</th>
                  <th className="text-left">Address</th>
                  <th className="text-right">Action</th>
               </TableRow>
            </TableHeader>
         </Table>
      </div>
   )
}