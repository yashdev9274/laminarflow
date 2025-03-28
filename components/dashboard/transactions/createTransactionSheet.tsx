import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export async function CreateTransactionSheet(){
   return(
      <div className="flex items-center justify-end">
         <Button variant="secondary" className="w-4 h-6">
            <PlusIcon/>
         </Button>
      </div>
   )
}