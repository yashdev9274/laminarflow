'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Banknote, IndianRupee, PlusIcon, Wallet } from "lucide-react";
import { TimelineItem } from "./TimelineItem";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import SubmitButton from "@/app/components/submitButton";

export function CreateTransactionSheet(){

   const [open, setOpen] = useState(false)

   return(
      <div className="flex items-center justify-center w-11">

         <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
               <Button variant="secondary" className="hover:bg-neutral-900 font-bold py-2 px-4 rounded  w-4 h-6">
                  <PlusIcon/>
               </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl p-0 bg-zinc-900 text-zinc-100 border-zinc-800">
               <div className="flex flex-col h-full">
                  <SheetHeader className="flex items-center justify-between p-4 border-b border-zinc-800">
                     
                     <div className="flex items-center gap-2">
                           <Button
                              variant={"secondary"}
                              size='icon'
                              className="text-zinc-400 hover:text-zinc-200 rounded h-6 w-6"
                              onClick={()=> setOpen(false)}
                           >
                              {/* <ArrowLeft className="h-4 w-4"/> */}
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                           </Button>
                           <div className="flex items-center gap-2">
                              <IndianRupee className="h-5 w-5"/>
                              <SheetTitle>Transaction</SheetTitle>
                           </div>
                     </div>
                     <Separator className="my-4" />

                     <Card className="bg-zinc-800 border-zinc-700 shadow-md">
                        <CardContent className="p-3">

                           {/* <div className="divide-y divide-zinc-700"> */}
                              <form
                                 className="divide-y divide-zinc-700"
                              >
                                 {/* <div className="flex flex-col gap-1 w-fit mb-6"> */}
                                 <div className="flex items-start gap-4 mb-6 ml-5 mt-5">
                                    <div className=" bg-zinc-600 rounded p-2 flex items-center justify-center">
                                       <Banknote className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                       <Input 
                                          placeholder="Amount"
                                          className="  border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                                       />
                                       <p className="text-sm text-zinc-400">Added about 17 hours ago</p>

                                    </div>
                                 </div>

                                    {/* Timeline Item */}

                                    {/* <div className="space-y-4 mt-5"> */}
                                       {/* <TimelineItem
                                          title="Payment from Acme Corp"
                                          date="Apr 7 at 5:03PM"
                                          variant="gray"
                                       />
                                       <TimelineItem 
                                          title="AR"
                                          date="Apr 7 at 5:03PM"
                                          variant="green"
                                       /> */}
                                    {/* </div> */}
                                    
                                    <div className="flex items-center p-4">
                                       <div className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                                          <svg 
                                             width="24px" 
                                             height="24px" 
                                             strokeWidth="1.5" 
                                             viewBox="0 0 24 24" 
                                             fill="none" 
                                             xmlns="http://www.w3.org/2000/svg" 
                                             color="#adacac"
                                          >
                                             <line x1="6" x2="6" y1="3" y2="15" />
                                             <circle cx="18" cy="6" r="3" />
                                             <circle cx="6" cy="18" r="3" />
                                             <path d="M17 20V4M17 4L20 7M17 4L14 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7 4V20M7 20L10 17M7 20L4 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                          </svg>
                                          Transaction No.
                                       </div>
                                       <div className="flex-1">
                                          <Input 
                                             placeholder="100"
                                             className="  border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                                          />
                                       </div>
                                    </div>

                                    {/* Currency type */}
                                    <div className="flex items-center p-4">
                                       <Label className="w-32 text-sm text-zinc-400 flex items-center gap-2">
                                          <Wallet/> 
                                          Currency
                                       </Label>
                                       <Select
                                          defaultValue="INR"
                                       >
                                          <SelectTrigger className="border-zinc-700 border-spacing-3 text-sm font-semibold mb-1 w-[80px] h-8">
                                             <SelectValue/>
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value = "INR">INR</SelectItem>
                                             <SelectItem value = "USD">USD</SelectItem>
                                             <SelectItem value = "EUR">EUR</SelectItem>
                                          </SelectContent>
                                       </Select>
                                    </div>
                                 {/* </div> */}
                                 <SheetFooter className="flex justify-end mt-6">
                                    <SheetClose asChild>
                                       <SubmitButton text="Create Record"/>
                                    </SheetClose>
                                 </SheetFooter>
                              </form>
                           {/* </div> */}
                        </CardContent>
                     </Card>
                  </SheetHeader>
               </div>
            </SheetContent>
         </Sheet>
         
      </div>
   )
}