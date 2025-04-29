import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import CompaniesTableAction from "./companiesTableAction";
import Companies from "@/app/dashboard/companies/page";

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
            <TableBody>
               <TableRow>
                  <TableCell className="text-left">1</TableCell>
                  <TableCell className="text-left">Air Bnb</TableCell>
                  <TableCell className="text-left">airbnb.com</TableCell>
                  <TableCell className="text-left">Yash</TableCell>
                  <TableCell className="text-left">12/12/2021</TableCell>
                  <TableCell className="text-left">5,000</TableCell>
                  <TableCell className="text-left">888 Brannan St</TableCell>
                  <TableCell className="text-right">Edit</TableCell>
               </TableRow>
            </TableBody>
            <TableCaption className="mt-5"> Company's record.</TableCaption>
         </Table>
      </div>
   )
}