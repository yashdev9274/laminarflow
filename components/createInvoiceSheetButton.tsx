import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PlusIcon } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem } from "./ui/select"
import { SelectTrigger, SelectValue } from "@radix-ui/react-select"

export function CreateInvoiceSheet() {
  return (
    <div className="flex items-center justify-center w-11 ">
        <Sheet>
            <SheetTrigger asChild>
                <Button className={buttonVariants()}>
                    <PlusIcon/>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-4xl mx-auto">
                <SheetHeader>
                <SheetTitle>Create Invoices</SheetTitle>
                <Card className="w-full max-w-4xl mx-auto ">
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-1 w-fit mb-6">
                            <div className="flex items-center gap-4">
                                <Badge variant='secondary'>Draft</Badge>  
                                <Input
                                    placeholder="Invoice Title"
                                />      
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <Label>Invoice No.</Label>
                                <div>
                                    <Input
                                        placeholder="00"
                                        className="rounded-1-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Currency</Label>
                                <Select
                                    defaultValue='INR'
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select Currency'/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='INR'>INR</SelectItem>
                                        <SelectItem value='USD'>USD</SelectItem>
                                        <SelectItem value='EUR'>EUR</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* User and Client Details */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            
                            {/* User Details */}
                            <div>
                                <Label>From:</Label>
                                <div className="space-y-2">
                                    <Input
                                        placeholder="Your Name"
                                    />
                                    <Input
                                        placeholder="Your Email"
                                    />
                                    <Input
                                        placeholder="Your Address"
                                    />
                                </div>
                            </div>

                            {/* Client Details */}
                            <div>
                                <Label>To:</Label>
                                <div className="space-y-2">
                                    <Input
                                        placeholder="Client Name"
                                    />
                                    <Input
                                        placeholder="Client Email"
                                    />
                                    <Input
                                        placeholder="Client Address"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <Label>Date</Label>
                                {/* <Popover */}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                </SheetHeader>
                <SheetFooter className="flex justify-end mt-5">
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </div>
  )
}
