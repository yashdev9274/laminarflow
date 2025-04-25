import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, MapPin, Twitter, User2Icon, X } from "lucide-react";
import Link from "next/link";


export default function InvoicesIdPage(){
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
                                <h1 className="text-white text-2xl font-semibold mb-1">Airbnb</h1>
                                <p className="text-gray-500 text-sm">Added about 4 hours ago</p>
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                        <span className="mr-2">
                                            <MapPin/> Address
                                        </span>
                                    </div>
                                    <div className="flex-1 text-white"> India</div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">🏢</span>
                                    ARR
                                    </div>
                                    <div className="flex-1 text-gray-500">Empty</div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">👤</span>
                                    Created by
                                    </div>
                                    <div className="flex-1 text-white">
                                    <span className="bg-gray-700 text-xs px-2 py-1 rounded">System</span>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">🔗</span>
                                    Domain Name
                                    </div>
                                    <div className="flex-1 text-white">
                                    <span className="bg-gray-800 text-xs px-2 py-1 rounded">airbnb.com</span>
                                    </div>
                                </div>

                                <div className="flex items-start">
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
                                </div>

                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">🕒</span>
                                    Last update
                                    </div>
                                    <div className="flex-1 text-white">about 4 hours ago</div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-32 text-gray-500 flex items-center">
                                    <span className="mr-2">𝕏</span>X
                                    </div>
                                    <div className="flex-1 text-gray-500">Empty</div>
                                </div>
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
                            Invoices to BNL Inc.
                        </div>
                    </CardHeader>
                    <Separator className="bg-white text-white"/>
                    <CardContent className="p-6 space-y-6">
                        
                        {/* Invoices status */}
                        <div>
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">PAID</span>
                        </div>

                        {/* Amount */}

                        <div>
                            <h1 className="text-4xl font-bold text-neutral-100">$400</h1>
                        </div>

                        {/* Payment Details */}

                        <div className="space-y-1">
                            <h3 className="text-lg font-medium text-neutral-300">Paid on Apr 25</h3>
                            <p className="text-neutral-500">Paid via Pay with Mercury</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}