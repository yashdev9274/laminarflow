import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CompaniesTableAction from "./companiesTableAction";
import Companies from "@/app/dashboard/companies/page";
import { Checkbox } from "@/components/ui/checkbox";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireAuth";

// Define the Company type
// interface Company {
//    id: string; // Example property
//    name: string; // Example property
//    logo: string
//    domain: string
//    createdBy: string
//    accountOwner: string
//    creationDate: string
//    employees: number
//    linkedin: string
//    address: string
//     // Add other properties as needed
// }

// interface CompaniesTableProps {
//     selectedRows: string[];
//     setSelectedRows: (rows: string[]) => void; // Ensure this is correct
//     onCompanyClick: (company: Company) => void; // Use the defined Company type
// }

async function getData(userId: string){
   const data = await prisma.companies.findMany({
      where:{
         userId: userId,
      },
      select:{
         id: true,
         name: true,
         domainName: true,
         accountOwner: true,
         employees: true,
         address: true,
         createdAt: true,
      }
   })
   return data;
}

// prop: { selectedRows=[], setSelectedRows, onCompanyClick }: CompaniesTableProps

export async function CompaniesTable() {
   
   // const companies: Company[] = [
   //    {
   //      id: "1",
   //      name: "Airbnb",
   //      logo: "A",
   //      domain: "airbnb.com",
   //      createdBy: "System",
   //      accountOwner: "",
   //      creationDate: "less than a minute ago",
   //      employees: 5000,
   //      linkedin: "",
   //      address: "888 Brannan St, San Francisco",
   //    },
   //    {
   //      id: "2",
   //      name: "Qonto",
   //      logo: "Q",
   //      domain: "qonto.com",
   //      createdBy: "System",
   //      accountOwner: "",
   //      creationDate: "less than a minute ago",
   //      employees: 800,
   //      linkedin: "",
   //      address: "18 rue de navarrin, Paris, France",
   //    },
   //    {
   //      id: "3",
   //      name: "Stripe",
   //      logo: "S",
   //      domain: "stripe.com",
   //      createdBy: "System",
   //      accountOwner: "",
   //      creationDate: "less than a minute ago",
   //      employees: 8000,
   //      linkedin: "",
   //      address: "Eutaw Street, Dublin, Ireland",
   //    },
   //    {
   //      id: "4",
   //      name: "Figma",
   //      logo: "F",
   //      domain: "figma.com",
   //      createdBy: "System",
   //      accountOwner: "",
   //      creationDate: "less than a minute ago",
   //      employees: 800,
   //      linkedin: "",
   //      address: "760 Market St, Floor 10, San Francisco",
   //    },
   //    {
   //      id: "5",
   //      name: "Notion",
   //      logo: "N",
   //      domain: "notion.com",
   //      createdBy: "System",
   //      accountOwner: "",
   //      creationDate: "less than a minute ago",
   //      employees: 400,
   //      linkedin: "",
   //      address: "2300 Harrison St, San Francisco",
   //    },
   //  ]

   // const toggleSelectAll = ()=>{
   //    if(selectedRows.length === Companies.length){
   //       setSelectedRows([]);
   //    } else{
   //       setSelectedRows(companies.map((company)=>company.id))
   //    }
   // }

   // const toggleSelectRow = (id: string)=>{
   //    if(selectedRows.includes(id)){
   //       setSelectedRows(selectedRows.filter((row)=> row !== id))
   //    } else{
   //       setSelectedRows([...selectedRows, id])
   //    }
   // }

   const session = await requireUser();
   const data = await getData(session.user?.id as string);

   return (
        <div className="overflow-x-auto ml-2 min-h-[450px]">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox 
                              // checked={selectedRows.length === companies.length && companies.length>0}
                              // onCheckedChange={toggleSelectAll}
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
                  {data.map((companies)=>(
                    <TableRow
                        key={companies.id}
                        className="hover:bg-muted/50 group/row"
                    >
                        <TableCell className="p-2">
                           <Checkbox
                              // checked={selectedRows.includes(companies.id)}
                              // onCheckedChange={() => toggleSelectRow(companies.id)}
                           />
                        </TableCell>
                        {/* <TableCell className="text-left">1</TableCell> */}
                        <TableCell className="text-left font-medium">
                           <div
                              // onClick={()=>onCompanyClick(companies)}
                           >
                              <span>
                                 {companies.name}
                              </span>
                           </div>
                        </TableCell>
                        <TableCell className="text-left">
                           <span className="px-2 py-1 bg-muted rounded-md text-sm">{companies.domainName}</span>
                        </TableCell>
                        <TableCell className="text-left">{companies.accountOwner}</TableCell>
                        <TableCell className="text-left">{new Intl.DateTimeFormat("en-US",{dateStyle: "long"}).format(companies.createdAt)}</TableCell>
                        <TableCell className="text-left">{companies.employees}</TableCell>
                        <TableCell className="text-left">{companies.address}</TableCell>
                        <TableCell className="text-right">Edit</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption className="mt-5"> Company's record.</TableCaption>
            </Table>
        </div>
    );
}