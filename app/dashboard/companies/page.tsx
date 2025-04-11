import CompaniesTable from "@/components/dashboard/companies/CompaniesTable";
import { CreateCompaniesSheet } from "@/components/dashboard/companies/createCompaniesSheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function Companies(){
   return(
      <div className="flex flex-col gap-4 p-4 pt-0">
         <Card>
            <CardHeader>
               <div className="flex items-center justify-between ml-2">
                  <div>
                     <CardTitle  className="text-lg font-semibold">
                        <div className="flex items-center gap-4">
                           <Building2/> Companies
                        </div>
                     </CardTitle>
                     <CardDescription className="text-sm">
                     </CardDescription>
                  </div>
                  <CreateCompaniesSheet/>
               </div>
            </CardHeader>
            <CardContent>
               <CompaniesTable/>
            </CardContent>
         </Card>
      </div>
   )
}