import { MapPin, Twitter, User2Icon } from "lucide-react";

export default function InvoicesIdPage(){
    return(
        <div className="flex h-screen bg-black text-gray-300">
            
            {/* Left side */}

            <div className="w-[410px] border-r border-gray-800 p-6 ml-9 flex flex-ocl gap-4">
                <div className="mb-8">
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
            </div>
        </div>
    )
}