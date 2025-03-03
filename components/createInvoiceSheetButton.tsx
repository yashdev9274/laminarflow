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
// import { ScrollArea } from "@radix-ui/react-scroll-area"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { Textarea } from "./ui/textarea"
import { Separator } from "./ui/separator"


export function CreateInvoiceSheet() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [quantity, setQuantity]  = useState("");
    const [rate, setRate] = useState("");
    const [amount, setAmount] =  useState("");

  return (
    <div className="flex items-center justify-center w-11 ">

        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary" className="w-4 h-7">
                    <PlusIcon/>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-7xl mx-">
                    <SheetHeader>
                    <SheetTitle>Create Invoices</SheetTitle>
                        <ScrollArea className="w-full h-96">

                            <Card className="w-full "> 
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
                                        
                                        <div className="flex items-center gap-2 mb-6">
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
                                                        <SelectItem value='15'>Net 15</SelectItem>
                                                        <SelectItem value='30'>Net 30</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                    {/* Payment Details */}

                                    <div className="mb-6">
                                        <Label className="mb-6">Payment Details</Label>
                                        <div className="grid grid-cols-12 gap-2 mb-6">
                                            <div className="col-span-10">
                                                <Label className="flex justify-start">Description:</Label>
                                                <Textarea
                                                    placeholder="Description"
                                                />
                                            </div>
                                            <div className="col-span-4">
                                                <Label>Quantity</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    value={quantity}
                                                    onChange={(e)=>setQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-4">
                                                <Label>Rate</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        value={rate}
                                                        onChange={(e)=>setRate(e.target.value)}
                                                    />
                                            </div>
                                            <div className="col-span-4">
                                                <Label>Amount</Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        value={amount}
                                                        onChange={(e)=>setAmount(e.target.value)}
                                                    />
                                            </div>
                                        </div>

                                        {/* Invoice subtotal */}

                                        <div className="flex justify-end gap-4">
                                            <div className="w-1/3">
                                                <div className="flex justify-between py-2">
                                                    <span>Subtotal</span>
                                                    <span>5.00</span>
                                                </div>
                                                <Separator/>
                                                <div className="flex justify-between py-2">
                                                    <span>Total(INR)</span>
                                                    <span className="font-medium underline underline-offset-2">5.00</span>
                                                </div>
                                            </div>
                                        </div>                            
                                    </div>

                                    <div>
                                        <label className="flex justify-start">
                                            Note:
                                        </label>
                                        <Textarea
                                            className="w-full justify-start mt-2"
                                            placeholder="Add a note"
                                        />
                                    </div>
                                    <SheetFooter className="flex justify-end mt-5">
                                        <SheetClose asChild>
                                            <Button 
                                                type="submit" 
                                                className="w-full sm:w-auto px-6 py-2 text-base font-medium"
                                            >
                                                Save changes
                                            </Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </CardContent>
                            </Card>
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>    
                    </SheetHeader>
            </SheetContent>
        </Sheet>
    </div>
  )
}
