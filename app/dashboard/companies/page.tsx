// 'use client';

import CompaniesInfo from "@/components/dashboard/companies/companiesInfo";
import { CompaniesTable } from "@/components/dashboard/companies/CompaniesTable";
// import CompaniesTable from "@/components/dashboard/companies/CompaniesTable";
import { CreateCompaniesSheet } from "@/components/dashboard/companies/createCompaniesSheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Filter, SortAsc } from "lucide-react";
import { useState } from "react";
// import { Company } from "@/components/dashboard/companies/CompaniesTable";



export default function Companies(){
   

   return(
      <div className="flex flex-col gap-4 p-4 pt-0">
         <Card className="border-0 shadow-none bg-background">
            <CardHeader className="px-2 pt-0 pb-2">
               <div className="flex items-center justify-between ml-2">
                  <div>
                     <CardTitle  className="text-lg font-semibold">
                        <div className="flex items-center gap-4">
                           <Building2/> Companies
                           <CompaniesInfo/>
                        </div>
                     </CardTitle>
                     <CardDescription className="text-sm">
                     </CardDescription>
                  </div>
                  {/* <CreateCompaniesSheet/> */}

                  <div className="flex items-center gap-2">
                     <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                     </Button>
                     <Button variant="outline" size="sm">
                        <SortAsc className="h-4 w-4 mr-2" />
                        Sort
                     </Button>
                     <Button variant="outline" size="sm">
                        Options
                     </Button>
                     <CreateCompaniesSheet />
                  </div>
               </div>
            </CardHeader>
            <CardContent className="mt-5">
               <CompaniesTable />
            </CardContent>
         </Card>
      </div>
   )
}