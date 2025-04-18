import { signOut } from "@/app/utils/auth";
import { requireUser } from "@/app/utils/requireAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default async function LogoutComponent() {
   const session =await requireUser()
   return(
      <div>
         <form
            action={async()=>{
               "use server"
               await signOut();
            }}
         >
            <Button>

               <LogOut />
               Log out
            </Button>
              </form>
      </div>
   )
}