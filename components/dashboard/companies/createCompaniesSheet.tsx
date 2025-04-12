'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function CreateCompaniesSheet(){

  const [open, setOpen] = useState(false)
   return(
      <div className="flex items-center justify-center w-11">

         <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
               <Button variant="secondary" className=" hover:bg-neutral-900 font-bold py-2 px-4 rounded  w-4 h-6">
                  <PlusIcon/>
               </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl p-0 bg-zinc-900 text-zinc-100 border-zinc-800">
               <div className="flex flex-col h-full">
                  <SheetHeader className="flex items-center justify-between p-4 border-b border-zinc-800">
                     <SheetTitle>Companies</SheetTitle>

                     <Card className="w-full">
                        <CardContent className="p-6">
                           <form
                              className="grid gap-4"
                           >
                              <div className="flex flex-col gap-1 w-fit mb-6">
                                 <div className="flex items-center gap-10">
                                    <Badge variant='secondary'>Amount</Badge>
                                    <div className="space-y-1">
                                       <Input
                                          placeholder="$200"
                                          className="text-4xl font-medium border-spacing-1 px-2 h-auto"
                                       />
                                    </div>
                                 </div>

                                 <div className="grid md:grid-cols-1 gap-6 mb-6">
                                    <div className="flex items-center gap-4">
                                       <Label>Transaction No.</Label>
                                       <div className="space-y-1">
                                          <Input
                                             placeholder="#00"
                                             className="text-4xl font-medium border-spacing-1 px-2 h-auto"
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