import { signOut } from "@/app/utils/auth";
import { requireUser } from "@/app/utils/requireAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default async function LogoutComponent() {
   const session =await requireUser()
   return(
      <div className="flex items-center gap-2 px-2 py-1 text-gray-400 hover:text-white transition-colors">
         <form
            action={async()=>{
               "use server"
               await signOut();
            }}
         >
            <Button 
               className="flex items-center group gap-2 px-2 py-1 text-black transition-colors"
               
            >

               <LogOut 
                  className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                  size={16}
                  aria-hidden="true"
               />
               <span>Log out</span>
            </Button>
              </form>
      </div>
   )
}