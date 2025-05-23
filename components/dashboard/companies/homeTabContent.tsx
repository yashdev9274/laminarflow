// 'use client'

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
                  noValidate
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
                        name = {fields.name.name}
                        key={fields.name.key}
                        defaultValue={fields.name.initialValue}
                     />
                     <p className="text-sm text-zinc-400">Added about 17 hours ago</p>
                  </div>
               </div>
                  
                  {/* address */}
                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><mask id="lineMdMapMarkerAltFilledLoop0"><g fill="none" fillOpacity={0} stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path fill="#fff" d="M12 20.5C12 20.5 11 19 11 18C11 17.5 11.5 17 12 17C12.5 17 13 17.5 13 18C13 19 12 20.5 12 20.5z"><animate fill="freeze" attributeName="d" dur="0.2s" keyTimes="0;0.7;1" values="M12 20.5C12 20.5 11 19 11 18C11 17.5 11.5 17 12 17C12.5 17 13 17.5 13 18C13 19 12 20.5 12 20.5z;M12 20.5C12 20.5 5 13 5 8C5 4.5 8 1 12 1C16 1 19 4.5 19 8C19 13 12 20.5 12 20.5z;M12 20.5C12 20.5 6 13.5 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9C18 13.5 12 20.5 12 20.5z"></animate><animate fill="freeze" attributeName="fill-opacity" begin="0.25s" dur="0.25s" values="0;1"></animate><animateTransform attributeName="transform" dur="1.5s" keyTimes="0;0.3;0.4;0.54;0.6;0.68;0.7;1" repeatCount="indefinite" type="rotate" values="0 12 20.5;0 12 20.5;-8 12 20.5;0 12 20.5;5 12 20.5;-2 12 20.5;0 12 20.5;0 12 20.5"></animateTransform></path><circle cx={12} cy={9} r={2.5} fill="#000" stroke="none"><animate fill="freeze" attributeName="fill-opacity" begin="0.5s" dur="0.25s" values="0;1"></animate></circle></g></mask><rect width={24} height={24} fill="#fff" mask="url(#lineMdMapMarkerAltFilledLoop0)"></rect></svg>
                        Address
                     </div>
                     <div className="relative">
                        <Input 
                           placeholder="India..."
                           className=" peer pe-9 border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                           name={fields.address.name}
                           key={fields.address.key}
                           defaultValue={fields.address.initialValue}
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                           <MapPinned size={16} aria-hidden="true" />
                        </div>
                     </div>
                  </div>

                  {/* account owner */}

                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeDasharray={28} strokeDashoffset={28} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="28;0"></animate></path></svg>
                        Domain
                     </div>
                     <div className="flex-1 flex items-center gap-2">
                        {/* <Avatar className="h-6 w-6 bg-violet-600">
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar> */}
                        {/* <DomainInput/> */}
                        <div className="*:not-first:mt-2">
                           <div className="flex rounded-md shadow-xs">
                           <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm border-zinc-700 border-spacing-3 font-semibold ">
                              https://
                           </span>
                           <Input
                              className="-ms-px rounded-s-none shadow-none border-zinc-700 border-spacing-3 text-2xl font-semibold w-full"
                              placeholder="google.com"
                              type="text"
                              name={fields.domainName.name}
                              key={fields.domainName.key}
                              defaultValue={fields.domainName.initialValue}
                           />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* account owner */}

                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="#fff" fillOpacity={0} stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={20} strokeDashoffset={20} d="M12 5c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.24s" values="20;0"></animate></path><path strokeDasharray={36} strokeDashoffset={36} d="M12 14c4 0 7 2 7 3v2h-14v-2c0 -1 3 -3 7 -3Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.3s" values="36;0"></animate></path><animate fill="freeze" attributeName="fill-opacity" begin="0.66s" dur="0.3s" values="0;1"></animate></g></svg>
                        Acc. Owner
                     </div>
                     <div className="flex-1 flex items-center gap-2">
                        {/* <Avatar className="h-6 w-6 bg-violet-600">
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar> */}
                        <Input 
                           placeholder="Yash Dewasthale"
                           className=" border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                           name={fields.accountOwner.name}
                           key={fields.accountOwner.key}
                           defaultValue={fields.accountOwner.initialValue}
                        />
                     </div>
                  </div>

                  {/* Employees */}

                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="#fff" fill-opacity="0" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="20" stroke-dashoffset="20" d="M12 5c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.24s" values="20;0"/></path><path stroke-dasharray="36" stroke-dashoffset="36" d="M12 14c4 0 7 2 7 3v2h-14v-2c0 -1 3 -3 7 -3Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.3s" values="36;0"/></path><animate fill="freeze" attributeName="fill-opacity" begin="0.66s" dur="0.3s" values="0;1"/></g></svg>
                        Employees
                     </div>
                     <div className="flex-1">
                        <Input 
                           placeholder="50"
                           className=" border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                           name={fields.employees.name}
                           key={fields.employees.key}
                           defaultValue={fields.employees.initialValue}
                        />
                     </div>
                  </div>

                  {/* Total */}

                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                        {/* You can use an icon here if you want */}
                        Total
                     </div>
                     <div className="flex-1">
                        <Input
                           placeholder="1000"
                           className="border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                           name={fields.total.name}
                           key={fields.total.key}
                           defaultValue={fields.total.initialValue}
                           type="number"
                           min={1}
                        />
                        {/* Optionally show errors */}
                        {fields.total.errors && (
                           <p className="text-sm text-red-500">{fields.total.errors}</p>
                        )}
                     </div>
                  </div>

                  {/* domain name */}
                  <div className="flex items-center p-4">
                     <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={56} strokeDashoffset={56} d="M3 21l2 -6l11 -11c1 -1 3 -1 4 0c1 1 1 3 0 4l-11 11l-6 2"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.36s" values="56;0"></animate></path><path strokeDasharray={8} strokeDashoffset={8} d="M15 5l4 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.36s" dur="0.12s" values="8;0"></animate></path><path strokeDasharray={6} strokeDashoffset={6} strokeWidth={1} d="M6 15l3 3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.36s" dur="0.12s" values="6;0"></animate></path></g></svg>
                        Description
                     </div>

                     <div className="flex-1">
                        <Textarea
                           placeholder="LaminarFlow is a..."
                           className=" border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                           name={fields.description.name}
                           key={fields.description.key}
                           defaultValue={fields.description.initialValue}
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