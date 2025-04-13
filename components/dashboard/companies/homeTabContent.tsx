import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";
import { Check, Edit2 } from "lucide-react"


export function HomeTabContent(){
   return(
      <div className="p-6">
         <div className="flex items-start gap-4 mb-6">
            <div className="bg-zinc-600 rounded p-2 flex items-center justify-center">
               <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
               <Input 
                  placeholder="Company Name"
                  className="text-2xl font-semibold mb-1 w-full"
               />
               <p className="text-sm text-zinc-400">Added about 17 hours ago</p>
            </div>
         </div>

         <Card className="bg-zinc-800 border-zinc-700 shadow-md">
            <CardContent className="p-0">
               <div className="divide-y divide-zinc-700">

                  {/* address */}
                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                        <svg 
                           width="24px" 
                           height="24px" 
                           stroke-width="1.5" 
                           viewBox="0 0 24 24" 
                           fill="none" 
                           xmlns="http://www.w3.org/2000/svg" 
                           color="#767676"
                        >
                           <line x1="6" x2="6" y1="3" y2="15" />
                           <circle cx="18" cy="6" r="3" />
                           <circle cx="6" cy="18" r="3" />
                           <path d="M9 19L3.78974 20.7368C3.40122 20.8663 3 20.5771 3 20.1675L3 5.43246C3 5.1742 3.16526 4.94491 3.41026 4.86325L9 3M9 19L15 21M9 19L9 3M15 21L20.5897 19.1368C20.8347 19.0551 21 18.8258 21 18.5675L21 3.83246C21 3.42292 20.5988 3.13374 20.2103 3.26325L15 5M15 21L15 5M15 5L9 3" 
                                 stroke="#000000" 
                                 stroke-width="1.5" 
                                 stroke-linecap="round" 
                                 stroke-linejoin="round">
                           </path>
                        </svg>
                        Address
                     </div>
                     <div className="flex-1">
                        <Input 
                           placeholder="Street 123..."
                           className=" bg-zinc-600 text-2xl  font-semibold mb-1 w-full"
                        />
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}