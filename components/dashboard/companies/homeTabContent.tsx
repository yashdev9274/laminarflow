'use client'

import SubmitButton from "@/app/components/submitButton";
import { createCompany } from "@/app/utils/action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Building2, MailIcon, MapPinned } from "lucide-react";
import { Check, Edit2 } from "lucide-react"
import { useActionState, useState } from "react";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { companySchema } from "@/app/utils/zodSchema"
import DomainInput from "../domainInput";



export function HomeTabContent(){

   const [lastResult,action] = useActionState(createCompany, undefined);

   const[form,fields] = useForm({
      lastResult,

      onValidate({formData}){
         return parseWithZod(formData,{schema: companySchema})
      },

      shouldValidate: "onBlur",
      shouldRevalidate: "onInput",
   })

   const [selectedDate, setSelectedDate] = useState(new Date())

   return(
      <div className="p-6">
         

         <Card className="bg-[#1B1B1B] bg-opacity-50 backdrop-blur-md border  shadow-md">
            <CardContent className="p-0">
               <form 
                  className="flex flex-col"
                  action={action}
                  id={form.id}
                  onSubmit={form.onSubmit}
               >

                  <input
                     type="hidden"
                     name={fields.date.name}
                     value={selectedDate.toISOString()}
                  />


               <div className="flex items-start gap-4 mb-6 ml-5 mt-5">
                  <div className="bg-zinc-600 rounded p-2 flex items-center justify-center">
                     <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                     <Input 
                        placeholder="LaminarFlow"
                        className="border-zinc-700 border-spacing-3 text-sm font-semibold mb-1 w-[400px]"
                     />
                     <p className="text-sm text-zinc-400">Added about 17 hours ago</p>
                  </div>
               </div>
                  
                  {/* address */}
                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                        <svg 
                           width="24px" 
                           height="24px" 
                           strokeWidth="1.5" 
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
                                 strokeWidth="1.5" 
                                 strokeLinecap="round" 
                                 strokeLinejoin="round">
                           </path>
                        </svg>
                        Address
                     </div>
                     <div className="relative">
                        <Input 
                           placeholder="India..."
                           className=" peer pe-9 border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                           <MapPinned size={16} aria-hidden="true" />
                        </div>
                     </div>
                  </div>

                  {/* account owner */}

                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                        <svg 
                           width="24px" 
                           height="24px" 
                           strokeWidth="1.5" 
                           viewBox="0 0 24 24" 
                           fill="none" 
                           xmlns="http://www.w3.org/2000/svg" 
                           color="#767676"
                        >
                           <line x1="6" x2="6" y1="3" y2="15" />
                           <circle cx="18" cy="6" r="3" />
                           <circle cx="6" cy="18" r="3" />
                           <path d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        Domain
                     </div>
                     <div className="flex-1 flex items-center gap-2">
                        {/* <Avatar className="h-6 w-6 bg-violet-600">
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar> */}
                        <DomainInput/>
                     </div>
                  </div>

                  {/* account owner */}

                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                        <svg 
                           width="24px" 
                           height="24px" 
                           strokeWidth="1.5" 
                           viewBox="0 0 24 24" 
                           fill="none" 
                           xmlns="http://www.w3.org/2000/svg" 
                           color="#767676"
                        >
                           <line x1="6" x2="6" y1="3" y2="15" />
                           <circle cx="18" cy="6" r="3" />
                           <circle cx="6" cy="18" r="3" />
                           <path d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        Acc. Owner
                     </div>
                     <div className="flex-1 flex items-center gap-2">
                        {/* <Avatar className="h-6 w-6 bg-violet-600">
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar> */}
                        <Input 
                           placeholder="Yash Dewasthale"
                           className=" border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                        />
                     </div>
                  </div>

                  {/* Employees */}

                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                        <svg 
                           width="24px" 
                           height="24px" 
                           strokeWidth="1.5" 
                           viewBox="0 0 24 24" 
                           fill="none" 
                           xmlns="http://www.w3.org/2000/svg" 
                           color="#767676"
                        >
                           <line x1="6" x2="6" y1="3" y2="15" />
                           <circle cx="18" cy="6" r="3" />
                           <circle cx="6" cy="18" r="3" />
                           <path d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path><path d="M13 14V14C13 11.2386 15.2386 9 18 9V9C20.7614 9 23 11.2386 23 14V14.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path><path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        Employees
                     </div>
                     <div className="flex-1">
                        <Input 
                           placeholder="50"
                           className=" border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                        />
                     </div>
                  </div>

                  {/* domain name */}
                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                     <svg 
                        width="24px" 
                        height="24px" 
                        strokeWidth="1.5" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg" 
                        color="#000000"
                     >
                        <path d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.52241 7 7.41904 7.00001 7.14286 7.00001C4.30254 7.00001 2 9.23752 2 11.9976C2 14.376 3.70973 16.3664 6 16.8714C6.36756 16.9525 6.75006 16.9952 7.14286 16.9952" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10 11.9976C10 14.4893 12.317 16.9952 15.1429 16.9952C15.4776 16.9952 16.581 16.9952 16.8571 16.9952C19.6975 16.9952 22 14.7577 22 11.9976C22 9.6192 20.2903 7.62884 18 7.12383C17.6324 7.04278 17.2499 6.99999 16.8571 6.99999" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                     </svg>
                        Description
                     </div>

                     <div className="flex-1">
                        <Textarea
                           placeholder="LaminarFlow is a..."
                           className=" border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                        />
                     </div>
                  </div>

                  
                     <SheetFooter className="flex justify-end mt-6 mb-5 mr-5">
                        <SheetClose asChild>
                           <SubmitButton text="Create Record"/>
                        </SheetClose>
                     </SheetFooter>
               </form>

            </CardContent>
         </Card>
      </div>
   )
}