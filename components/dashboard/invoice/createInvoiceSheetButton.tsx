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
import { Card, CardContent } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Select, SelectContent, SelectItem } from "../../ui/select"
import { SelectGroup, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { useActionState, useState } from "react"
import { Calendar } from "../../ui/calendar"
// import { ScrollArea } from "@radix-ui/react-scroll-area"
import { ScrollArea, ScrollBar } from "../../ui/scroll-area"
import { Textarea } from "../../ui/textarea"
import { Separator } from "../../ui/separator"
import { createInvoice } from "@/app/utils/action"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { invoiceSchema } from "@/app/utils/zodSchema"
import { formatCurrency } from "@/hooks/formatCurrency"
import SubmitButton from "@/app/components/submitButton"


export function CreateInvoiceSheet() {

    const [lastResult, action] = useActionState(createInvoice, undefined);
    const [form, fields]  = useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData,{schema: invoiceSchema});
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",

    })

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [currency, setCurrency] = useState("INR")
    const [quantity, setQuantity]  = useState("");
    const [rate, setRate] = useState("");
    const [amount, setAmount] =  useState("");

    const calculateTotalAmount = (Number(quantity) || 0)* (Number(rate) || 0)

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
                                    <form
                                        className="grid gap-4"
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

                                        <input
                                            type="hidden"
                                            name={fields.total.name}
                                            value={calculateTotalAmount}
                                        />
                                        <div className="flex flex-col gap-1 w-fit mb-6">
                                            <div className="flex items-center gap-4">
                                                <Badge variant='secondary'>Draft</Badge>  
                                                <Input
                                                    placeholder="Invoice Name"
                                                    name={fields.invoiceName.name}
                                                    key={fields.invoiceName.key}
                                                    defaultValue={fields.invoiceName.initialValue}
                                                />      
                                            </div>
                                            <p className="text-sm text-red-500">
                                                {fields.invoiceName.errors}
                                            </p>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                                            <div>
                                                <Label>Invoice No.</Label>
                                                <div>
                                                    <Input
                                                        placeholder="00"
                                                        className="rounded-1"
                                                        name = {fields.invoiceNumber.name}
                                                        key = {fields.invoiceNumber.key}
                                                        defaultValue={fields.invoiceNumber.initialValue}
                                                    />
                                                </div>
                                                <p className="text-sm text-red-500">
                                                    {fields.invoiceNumber.errors}
                                                </p>
                                            </div>
                                            <div>
                                                <Label>Currency</Label>
                                                <Select
                                                    defaultValue='INR'
                                                    name={fields.currency.name}
                                                    key={fields.currency.key}
                                                    onValueChange={(value)=>setCurrency(value)}
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
                                            <p className="text-sm text-red-500">
                                                {fields.currency.errors}
                                            </p>
                                        </div>

                                        {/* User and Client Details */}
                                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                                            
                                            {/* User Details */}
                                            <div>
                                                <Label>From:</Label>
                                                <div className="space-y-2">
                                                    <Input
                                                        placeholder="Name"
                                                        name={fields.fromName.name}
                                                        key={fields.fromName.key}
                                                        defaultValue={fields.fromName.initialValue}
                                                    />
                                                    <p className="text-sm text-red-500">{fields.fromName.errors}</p>
                                                    <Input
                                                        placeholder="Email"
                                                        name={fields.fromEmail.name}
                                                        key={fields.fromEmail.key}
                                                        defaultValue={fields.fromEmail.initialValue}
                                                    />
                                                    <p className="text-sm text-red-500">{fields.fromEmail.errors}</p>
                                                    <Input
                                                        placeholder="Address"
                                                        name={fields.fromAddress.name}
                                                        key={fields.fromAddress.key}
                                                        defaultValue={fields.fromAddress.initialValue}
                                                    />
                                                    <p className="text-sm text-red-500">{fields.fromAddress.errors}</p>
                                                </div>
                                            </div>

                                            {/* Client Details */}
                                            <div>
                                                <Label>Client:</Label>
                                                <div className="space-y-2">
                                                    <Input
                                                        placeholder="Name"
                                                        name={fields.clientName.name}
                                                        key={fields.clientName.key}
                                                        defaultValue={fields.clientName.initialValue}
                                                    />
                                                    <p className="text-sm text-red-500">{fields.clientName.errors}</p>
                                                    <Input
                                                        placeholder="Email"
                                                        name={fields.clientEmail.name}
                                                        key={fields.clientEmail.key}
                                                        defaultValue={fields.clientEmail.initialValue}
                                                    />
                                                    <p className="text-sm text-red-500">{fields.clientEmail.errors}</p>
                                                    <Input
                                                        placeholder="Address"
                                                        name={fields.clientAddress.name}
                                                        key={fields.clientAddress.key}
                                                        defaultValue={fields.clientAddress.initialValue}
                                                    />
                                                    <p className="text-sm text-red-500">{fields.clientAddress.errors}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Calendar */}
                                        
                                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                                            

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
                                                <Select
                                                    name={fields.dueDate.name}
                                                    key={fields.dueDate.key}
                                                    defaultValue={fields.dueDate.initialValue}
                                                >
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
                                                <p className="text-sm text-red-500">
                                                    {fields.dueDate.errors}
                                                </p>
                                            </div>

                                        {/* Payment Details */}

                                        <div className="mb-6">
                                            <Label className="mb-6">Payment Details</Label>
                                            <div className="grid grid-cols-12 gap-2 mb-6">
                                                <div className="col-span-10">
                                                    <Label className="flex justify-start">Description:</Label>
                                                    <Textarea
                                                        placeholder="Description"
                                                        name={fields.invoiceItemDescription.name}
                                                        key={fields.invoiceItemDescription.key}
                                                        defaultValue={fields.invoiceItemDescription.initialValue}
                                                    />
                                                    <p className="text-sm text-red-500">
                                                        {fields.invoiceItemDescription.errors}
                                                    </p>
                                                </div>
                                                <div className="col-span-4">
                                                    <Label>Quantity</Label>
                                                    <Input
                                                        name={fields.invoiceItemQuantity.name}
                                                        key={fields.invoiceItemQuantity.key}
                                                        type="number"
                                                        placeholder="0"
                                                        value={quantity}
                                                        onChange={(e)=>setQuantity(e.target.value)}
                                                    />
                                                    <p className="text-sm text-red-500">
                                                        {fields.invoiceItemQuantity.errors}
                                                    </p>
                                                </div>
                                                <div className="col-span-4">
                                                    <Label>Rate</Label>
                                                        <Input
                                                            name={fields.invoiceItemRate.name}
                                                            key={fields.invoiceItemRate.key}
                                                            type="number"
                                                            placeholder="0"
                                                            value={rate}
                                                            onChange={(e)=>setRate(e.target.value)}
                                                        />
                                                        <p className="text-sm text-red-500">
                                                            {fields.invoiceItemRate.errors}
                                                        </p>
                                                </div>
                                                <div className="col-span-4">
                                                    <Label>Amount</Label>
                                                        <Input
                                                            value={formatCurrency({amount: calculateTotalAmount, currency: currency as any})}
                                                            disabled
                                                        />
                                                </div>
                                            </div>

                                            {/* Invoice subtotal */}

                                            <div className="flex justify-end gap-4">
                                                <div className="w-1/3">
                                                    <div className="flex justify-between py-2">
                                                        <span>Subtotal</span>
                                                        <span>
                                                            {formatCurrency({amount: calculateTotalAmount, currency: currency as any})} 
                                                        </span>
                                                    </div>
                                                    <Separator/>
                                                    <div className="flex justify-between py-2">
                                                        <span>Total({currency})</span>
                                                        <span className="font-medium underline underline-offset-2">
                                                            {formatCurrency({amount: calculateTotalAmount, currency: currency as any})}        
                                                        </span>
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
                                                name = {fields.note.name}
                                                key={fields.note.key}
                                                defaultValue={fields.note.initialValue}
                                            />
                                            <p className="text-red-500 text-sm">{fields.note.errors}</p>
                                        </div>
                                        <SheetFooter className="flex justify-end mt-5">
                                            <SheetClose asChild>
                                                <SubmitButton text="Create Invoice"/>
                                            </SheetClose>
                                        </SheetFooter>
                                    </form>
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
