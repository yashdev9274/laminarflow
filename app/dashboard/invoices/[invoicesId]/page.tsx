
import { prisma } from "@/app/utils/db";
import { notFound } from "next/navigation";
import { requireUser } from "@/app/utils/requireAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, MapPin, Twitter, User2Icon, X } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SandClockIcon } from "@/components/icons/sandClockIcon";
import { XCircle } from "lucide-react";
import { CheckIcon } from "@/components/icons/checkIcon";


async function getData(invoiceId: string, userId: string){
    if (!invoiceId || !userId) {
        // console.error("Missing invoiceId or userId:", { invoiceId, userId });
        return null;
    }

    const data = await prisma.invoice.findUnique({
        where:{
            id: invoiceId,
            userId: userId,
        },
    });

    // console.log("Fetched Data:", data);

    if(!data){
        return null;
    }

    return data;
}

// The folder name is [invoicesId] so we use that exact name here
export default async function InvoicesIdPage({
    params
}: {
    params: { invoicesId: string }
}){
    // console.log("Raw params:", params);
    
    // Directly access the parameter using the name from your folder structure
    const {invoicesId} = await params;
    // console.log("invoicesId value:", invoicesId);
    
    const session = await requireUser();
    
    if (!invoicesId) {
        // console.error("Invoice ID is undefined");
        return <div className="text-red-500">Invalid invoice ID.</div>;
    }
    
    const data = await getData(invoicesId, session.user?.id as string);
    
    if (!data) {
        return notFound();
    }

    // invoiceData

    const invoiceData = data;

    // status badges

    
const getInvoicesStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
        case "pending":
            return (
                <Badge variant="outline" className="gap-1 rounded bg-yellow-100 text-yellow-800 border-yellow-300 px-2 py-1">
                    <SandClockIcon size={18} aria-hidden="true" className="text-yellow-600"/>
                    {status}
                </Badge>
            );
        
        case "failed":
            return (
                <Badge variant="outline" className="gap-1 rounded bg-red-100 text-red-800 border-red-300 px-2 py-1">
                    <XCircle size={18} aria-hidden="true" className="text-red-600"/>
                    {status}
                </Badge>
            );
        default:
            return (
                <Badge variant="outline" className="gap-1 bg-green-100 text-green-800 border-green-300 px-2 py-1 rounded">
                    <CheckIcon className="text-emerald-500" size={18}/>
                    {status}
                </Badge>
            );
    }
};

    return(
        <div className="flex text-gray-300">    
            {/* Left side */}

            <div className="w-[410px]  p-6 ml-9 flex flex-col gap-4">
                <Card >
                    <CardContent className="flex flex-col gap-4">
                        <div className="mb-8 mt-5">
                            <div className="mb-4">
                                <User2Icon
                                    className="w-8 h-8 text-gray-400 rounded-md"
                                />
                                <h1 className="text-white text-2xl font-semibold mb-1">{invoiceData.clientName}</h1>
                                {/* <p className="text-gray-500 text-sm">Added about 4 hours ago</p> */}
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                        <span className="mr-2">
                                            <MapPin/> Address
                                        </span>
                                    </div>
                                    <div className="flex-1 text-white"> {invoiceData.clientAddress}</div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">🏢</span>
                                    ARR
                                    </div>
                                    <div className="flex-1 text-gray-500">N/A</div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">👤</span>
                                    Created by
                                    </div>
                                    <div className="flex-1 text-white">
                                        <span className="bg-gray-700 text-xs px-2 py-1 rounded">{(session.user && session.user.email) ? session.user.email.split('@')[0] : 'Unknown User'}</span>
                                    </div>
                                </div>

                                {/* <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">🔗</span>
                                    Domain Name
                                    </div>
                                    <div className="flex-1 text-white">
                                    <span className="bg-gray-800 text-xs px-2 py-1 rounded">{invoiceData.domain}</span>
                                    </div>
                                </div> */}

                                {/* <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">👥</span>
                                    Employees
                                    </div>
                                    <div className="flex-1 text-white">5,000</div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">🔍</span>
                                    ICP
                                    </div>
                                    <div className="flex-1 text-white">
                                    <span className="flex items-center">
                                        False
                                    </span>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">🔗</span>
                                    LinkedIn
                                    </div>
                                    <div className="flex-1 text-gray-500">Empty</div>
                                </div> */}

                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">🕒</span>
                                    Last update
                                    </div>
                                    <div className="flex-1 text-white">{invoiceData.updatedAt.toLocaleDateString()}</div>
                                </div>

                                {/* <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">𝕏</span>X
                                    </div>
                                    <div className="flex-1 text-gray-500">Empty</div>
                                </div> */}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Separator orientation="vertical" className=" bg-neutral-100 text-white"/>
            {/* Main content */}

            <div className="flex-1 p-6 overflow-auto">
                <Card >
                    <CardHeader className="text-lg font-medium text-neutral-100" >
                        <div>
                            
                            <Link href="/dashboard/invoices">
                                <Button 
                                    variant="ghost" 
                                    className="hover:bg-neutral-900 font-bold py-2 px-4 rounded  w-4 h-6 "
                                >
                                    <ChevronLeft className="h-4 w-4 align-right" />
                                </Button>
                            </Link>
                            Invoices to {invoiceData.clientName}
                        </div>
                    </CardHeader>
                    <Separator className="bg-neutral-600"/>
                    <CardContent className="p-6 space-y-6">
                        
                        {/* Invoices status */}
                        <div>
                            {getInvoicesStatusBadge(invoiceData.status)}
                        </div>

                        {/* Amount */}

                        <div>
                            <h1 className="text-4xl font-bold text-neutral-100">{invoiceData.total}</h1>
                        </div>

                        {/* Payment Details */}

                        <div className="space-y-1">
                            <h3 className="text-lg font-medium text-neutral-300">Paid on Apr 25</h3>
                            <p className="text-neutral-500">Paid via- <Badge>Unknown</Badge></p>
                        </div>

                        <Separator className="bg-neutral-600"/>

                        {/* Invoices details */}

                        <div className="space-y-4 pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-400">Due date</span>
                                <span className="text-neutral-300 font-medium">{invoiceData.dueDate}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-neutral-400">Invoice date</span>
                                <span className="text-neutral-300 font-medium">{invoiceData.createdAt.toLocaleDateString()}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-neutral-400">Invoice no.</span>
                                <span className="text-neutral-300 font-medium">{invoiceData.invoiceNumber}</span>
                            </div>
                        </div>

                        {/* Invoice download */}

                        <div className="space-y-2 pt-3">
                            <Label className="block text-neutral-200">Download Invoice</Label>
                            <div className="flex">
                                <div 
                                    className="bg-[#1c1c1c] border-[#333] text-white h-8 w-full rounded"
                                >
                                    <span className="flex items-center justify-between ml-5 mt-1">
                                        <Link href={`/api/invoices/${invoicesId}`}>
                                            <span className="text-blue-500 hover:underline">Preview</span>
                                        </Link>
                                    </span>
                                </div>
                                {/* Copy button */}
                                <Button variant="ghost" className="hover:bg-neutral-900 font-bold py-2 px-4 rounded  w-6 h-8 gap-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                </Button>

                                {/* Download Button */}
                                <Link
                                    href={`/api/invoices/${invoicesId}`}
                                >
                                    <Button variant="secondary" className="w-8 h-8 p-3 gap-x-2 rounded-md text-blue-500 hover:text-gray-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* <div className="space-y-2 border-t pt-4">
                            <label className="block text-neutral-300">Destination account</label>
                            <div className="border rounded p-3 flex items-center justify-between">
                                <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gray-500">AR</span>
                                </div>
                                <div>
                                    <span className="text-gray-700">{invoiceData.}</span>
                                    <div className="text-gray-500 text-sm">$0.00 / Checking ••4296</div>
                                </div>
                                </div>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <div className="flex items-center text-neutral-600 text-sm">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                                </svg>
                                Using virtual account number
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-1 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                                </svg>
                            </div>
                        </div> */}

                            {/* Internal Note */}
                            <div className="space-y-2 border-t pt-4">
                            <label className="block text-neutral-300">Internal note</label>
                            <div className="border rounded p-3 text-neutral-500">{invoiceData.note}</div>
                            </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}