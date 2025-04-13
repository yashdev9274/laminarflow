'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { IndianRupee, PlusIcon } from "lucide-react";
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
                        <CardContent className="p-6">
                           <form
                              className="grid gap-4"
                           >
                              <div className="flex flex-col gap-1 w-fit mb-6">
                                 <div className="flex items-start gap-4 mb-6">
                                    <div className="bg-zinc-600 rounded p-2 flex items-center justify-center">
                                       <IndianRupee  className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                       <Input 
                                          placeholder="100"
                                          className=" border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                                       />
                                       <p className="text-sm text-zinc-400">Added about 17 hours ago</p>
                                    </div>
                                 </div>

                                 {/* Timeline Item */}

                                 <div className="space-y-4 mt-5">
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
                                 </div>
                                 
                                 <div className="flex items-center p-4">
                                    <div className="grid md:grid-cols-1 gap-6 mb-6">
                                       <div className="flex items-center gap-4">
                                          <Label>Transaction No.</Label>
                                          <div className="space-y-1">
                                             <Input
                                                placeholder="#00"
                                                className=" border-zinc-700 border-spacing-3 text-2xl font-semibold mb-1 w-full"
                                             />
                                          </div>
                                       </div>
                                       <div className="flex items-center gap-11">
                                          <Label className="mr-2">Currency</Label>
                                          <Select
                                             defaultValue="INR"
                                          >
                                             <SelectTrigger className="w-[80px] h-8">
                                                <SelectValue/>
                                             </SelectTrigger>
                                             <SelectContent>
                                                <SelectItem value = "INR">INR</SelectItem>
                                                <SelectItem value = "USD">USD</SelectItem>
                                                <SelectItem value = "EUR">EUR</SelectItem>
                                             </SelectContent>
                                          </Select>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <SheetFooter className="flex justify-end mt-5">
                                 <SheetClose asChild>
                                    <SubmitButton text="Create Record"/>
                                 </SheetClose>
                              </SheetFooter>
                           </form>
                        </CardContent>
                     </Card>
                  </SheetHeader>
               </div>
            </SheetContent>
         </Sheet>
         
      </div>
   )
}