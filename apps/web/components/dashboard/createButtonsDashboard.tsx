import CreateButton from "@/app/components/createButton";
import { CreateInvoiceSheet } from "./invoice/createInvoiceSheetButton";
import { Button, buttonVariants } from "@/components/ui/button"
import { BadgeIndianRupee, Building2, CircleCheckBig, ReceiptIndianRupee } from "lucide-react";


export default function DashboardCreateButton(){
   return(
      <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4 mb-5 mt-5">
         <CreateButton
            text="Create Invoice"
            href='/dashboard/invoices'
         >
            <ReceiptIndianRupee className="mr-2"/>
         </CreateButton>

         <CreateButton
            text="Create Transactions"
            href='/dashboard/transactions'
         >
            <BadgeIndianRupee className="mr-2"/>
         </CreateButton>

         <CreateButton
            text="Create Clients"
            href='/dashboard/companies'
         >
            <Building2 className="mr-2"/>
         </CreateButton>

         <CreateButton
            text="Create Task"
            href='/dashboard/'
         >
            <CircleCheckBig className="mr-2"/>
         </CreateButton>
      </div>
   )
} 