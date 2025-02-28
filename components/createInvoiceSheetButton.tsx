"use client"

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
import { CalendarX2Icon, PlusIcon } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem } from "./ui/select"
import { SelectGroup, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useState } from "react"
import { Calendar } from "./ui/calendar"


export function CreateInvoiceSheet() {
    const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="flex items-center justify-center w-11 ">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary" className="w-4 h-7">
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

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                
                                {/* Calendar */}

                                <div className="flex items-center gap-2">
                                    <Label>Date:</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-17 text-left justify-center mr-5"
                                            >
                                                <CalendarX2Icon/>
                                                {selectedDate ? (
                                                    new Intl.DateTimeFormat("en-US", {
                                                        dateStyle: "short",
                                                    }).format(selectedDate)
                                                    ) : (
                                                    <span>Pick a Date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar
                                                selected = {selectedDate}
                                                onSelect={(date: any)=>setSelectedDate(date || new Date())}
                                                mode="single"
                                                fromDate={new Date()}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                            </div>
                                {/* Invoice Status */}
                                
                                <div >
                                    <Label>Invoice Status:</Label>
                                    <Select>
                                        <SelectTrigger className="w-17 text-left justify-center mr-5 gap-2">
                                            <SelectValue 
                                                placeholder='Due'
                                                className="w-17 text-left justify-center mr-5 gap-2"
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value='0'>Due</SelectItem>
                                                <SelectItem value='Paid'>Paid</SelectItem>
                                                <SelectItem value='Sent'>Sent</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                            {/*  */}

                            <div></div>
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
