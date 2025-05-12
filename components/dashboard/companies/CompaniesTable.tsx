import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CompaniesTableAction from "./companiesTableAction";
import Companies from "@/app/dashboard/companies/page";
import { Checkbox } from "@/components/ui/checkbox";

// Define the Company type
interface Company {
   id: string; // Example property
   name: string; // Example property
   logo: string
   domain: string
   createdBy: string
   accountOwner: string
   creationDate: string
   employees: number
   linkedin: string
   address: string
    // Add other properties as needed
}

interface CompaniesTableProps {
    selectedRows: string[];
    setSelectedRows: (rows: string[]) => void; // Ensure this is correct
    onCompanyClick: (company: Company) => void; // Use the defined Company type
}

export default function CompaniesTable({ selectedRows=[], setSelectedRows, onCompanyClick }: CompaniesTableProps) {
   
   const companies: Company[] = [
      {
        id: "1",
        name: "Airbnb",
        logo: "A",
        domain: "airbnb.com",
        createdBy: "System",
        accountOwner: "",
        creationDate: "less than a minute ago",
        employees: 5000,
        linkedin: "",
        address: "888 Brannan St, San Francisco",
      },
      {
        id: "2",
        name: "Qonto",
        logo: "Q",
        domain: "qonto.com",
        createdBy: "System",
        accountOwner: "",
        creationDate: "less than a minute ago",
        employees: 800,
        linkedin: "",
        address: "18 rue de navarrin, Paris, France",
      },
      {
        id: "3",
        name: "Stripe",
        logo: "S",
        domain: "stripe.com",
        createdBy: "System",
        accountOwner: "",
        creationDate: "less than a minute ago",
        employees: 8000,
        linkedin: "",
        address: "Eutaw Street, Dublin, Ireland",
      },
      {
        id: "4",
        name: "Figma",
        logo: "F",
        domain: "figma.com",
        createdBy: "System",
        accountOwner: "",
        creationDate: "less than a minute ago",
        employees: 800,
        linkedin: "",
        address: "760 Market St, Floor 10, San Francisco",
      },
      {
        id: "5",
        name: "Notion",
        logo: "N",
        domain: "notion.com",
        createdBy: "System",
        accountOwner: "",
        creationDate: "less than a minute ago",
        employees: 400,
        linkedin: "",
        address: "2300 Harrison St, San Francisco",
      },
    ]

   const toggleSelectAll = ()=>{
      if(selectedRows.length === Companies.length){
         setSelectedRows([]);
      } else{
         setSelectedRows(companies.map((company)=>company.id))
      }
   }

   const toggleSelectRow = (id: string)=>{
      if(selectedRows.includes(id)){
         setSelectedRows(selectedRows.filter((row)=> row !== id))
      } else{
         setSelectedRows([...selectedRows, id])
      }
   }
   
   return (
        <div className="overflow-x-auto ml-2 min-h-[450px]">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox 
                              checked={selectedRows.length === companies.length && companies.length>0}
                              onCheckedChange={toggleSelectAll}
                            />
                        </TableHead>
                        {/* <th className="text-left">Serial No.</th> */}
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
                  {companies.map((company)=>(
                    <TableRow
                        key={company.id}
                        className="hover:bg-muted/50 group/row"
                    >
                        <TableCell className="p-2">
                           <Checkbox
                              checked={selectedRows.includes(company.id)}
                              onCheckedChange={() => toggleSelectRow(company.id)}
                           />
                        </TableCell>
                        {/* <TableCell className="text-left">1</TableCell> */}
                        <TableCell className="text-left font-medium">
                           <div
                              onClick={()=>onCompanyClick(company)}
                           >
                              <span>
                                 {company.name}
                              </span>
                           </div>
                        </TableCell>
                        <TableCell className="text-left">
                           <span className="px-2 py-1 bg-muted rounded-md text-sm">{company.domain}</span>
                        </TableCell>
                        <TableCell className="text-left">Yash</TableCell>
                        <TableCell className="text-left">{company.creationDate}</TableCell>
                        <TableCell className="text-left">{company.employees}</TableCell>
                        <TableCell className="text-left">{company.address}</TableCell>
                        <TableCell className="text-right">Edit</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption className="mt-5"> Company's record.</TableCaption>
            </Table>
        </div>
    );
}