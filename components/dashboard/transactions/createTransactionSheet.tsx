import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";

export async function CreateTransactionSheet(){
   return(
      <div className="flex items-center justify-center w-11">

         <Sheet>
            <SheetTrigger asChild>
               <Button variant="secondary" className="w-4 h-6">
                  <PlusIcon/>
               </Button>
            </SheetTrigger>
            <SheetContent>
               <SheetHeader>
                  <SheetTitle>Transactions</SheetTitle>
               </SheetHeader>
            </SheetContent>
         </Sheet>
         
      </div>
   )
}