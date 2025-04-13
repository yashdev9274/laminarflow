'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, Building2, PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Separator } from "@/components/ui/separator"
import { HomeTabContent } from "./homeTabContent";

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
                           <Building2 className="h-5 w-5"/>
                           <SheetTitle>Companies</SheetTitle>
                        </div>
                     </div>
                     <Separator className="my-4" />

                     {/* Navigation Tabs */}
                     <div className="border-b border-zinc-800 w-full">
                        <Tabs defaultValue="home" className="w-full">
                           <TabsList className="bg-transparent h-12 p-0 pl-4">
                              <TabsTrigger
                              value="home"
                              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-zinc-100 data-[state=active]:shadow-none rounded-none h-12 px-4"
                              >
                              <div className="flex items-center gap-2">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-home"
                                 >
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                 </svg>
                                 Home
                              </div>
                              </TabsTrigger>
                              <TabsTrigger
                              value="files"
                              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-zinc-100 data-[state=active]:shadow-none rounded-none h-12 px-4"
                              >
                              <div className="flex items-center gap-2">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-file"
                                 >
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                    <polyline points="14 2 14 8 20 8" />
                                 </svg>
                                 Files
                              </div>
                              </TabsTrigger>
                           </TabsList>


                           {/* Tabs content */}
                           <div className="flex-1 overflow-auto">
                              <TabsContent value="home" className="h-full m-0">
                                 <HomeTabContent />
                              </TabsContent>
                              <TabsContent value="files" className="h-full m-0">
                                 {/* <FilesTabContent /> */}
                              </TabsContent>
                           </div>
                        </Tabs>
                     </div>



                     {/* <div className="flex-1 overflow-auto p-6"> */}
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
                     {/* </div> */}

                  </SheetHeader>
               </div>
               
            </SheetContent>
         </Sheet>
         
      </div>
   )
}