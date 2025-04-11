import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CreateCompaniesSheet(){
   return(
      <div className="flex items-center justify-center w-11">

         <Sheet>
            <SheetTrigger asChild>
               <Button variant="secondary" className="w-4 h-6">
                  <PlusIcon/>
               </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-7xl mx-">
               <SheetHeader>
                  <SheetTitle>Transactions</SheetTitle>

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
            </SheetContent>
         </Sheet>
         
      </div>
   )
}