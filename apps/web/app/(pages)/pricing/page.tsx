'use client'

import BackRedirectButton from "@/app/components/backRedirectButton";
import FAQ from "@/components/home/faq";
import Footer from "@/components/home/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage(){

   const[isYearly, setIsYearly]  = useState(true);

   const prices={
      lfPlus:{
         monthly: 10,
         yearly: 8,
      },
      lfPro:{
         monthly: 20,
         yearly: 15,
      },
   }
   return(
      <div className="min-h-screen flex flex-col bg-[#0C0C0C] text-white">
         {/* <Button>
            <Link href="https://test.checkout.dodopayments.com/buy/pdt_Qhf4pPY3ZLOCRgqXg80Wx?quantity=1">
               Get Started
            </Link>
         </Button> */}

         <div>
            <header className="absolute left-4 top-4 md:left-8 md:top-8">
                  <div className="flex justify-between items-center container">                    
                     <BackRedirectButton text="Back" href = "/"/>
                  </div>
            </header>
         </div>

         <main className="flex-grow">
            <section className="container mx-auto px-4 py-16 flex flex-col items-center">
               <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Flexible Pricing</h1>
               <span className="max-w-2xl text-center text-gray-400 mb-16">
                  Use for free with your whole team. 
                  <p className="max-w-2xl text-center text-gray-400 mb-16">
                     Upgrade for additional features.
                  </p>
               </span>

               {/* Pricing list */}

               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
                  {/* Free Plan */}
                  <Card className="border border-[#2B2B2B] rounded-lg overflow-hidden bg-[#121212]">
                     <CardHeader className="p-6">
                        <CardTitle className="text-xl font-semibold mb-1">LF</CardTitle>
                        <div className="mb-4">
                           <span className="text-2xl font-bold">$0</span>
                        </div>
                        {/* <Separator className="mb-4 text-white bg-white" /> */}
                        <div className="py-3 border-t border-gray-800 text-sm text-[#878787]">Free for everyone</div>
                     </CardHeader>
                     <div className="px-6 pb-6">
                        <ul className="space-y-3 mb-6">
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>10 invoice generation per month</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>1 User</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Track your transactions</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Financial dashboard</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Fintech CRM</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Create and Manage your customers</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Customer Support</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-neutral-500 mr-2 flex-shrink-0" />
                           <span>Track your transactions</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-neutral-500 mr-2 flex-shrink-0" />
                           <span>Pay your invoices with stripe</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-neutral-500 mr-2 flex-shrink-0" />
                           <span>Branded invoices and transactional receipts</span>
                           </li>
                        </ul>
                        <Button className="w-full border rounded-xl border-[#2B2B2B] bg-black hover:bg-[#121212] text-white font-mono">
                           <Link href="/">
                              Get Started
                           </Link>
                        </Button>
                     </div>
                  </Card>

                  {/* Plus plan */}

                  <Card className="border border-[#2B2B2B] rounded-lg overflow-hidden bg-[#121212]">
                     <CardHeader className="p-6">
                        <CardTitle className="text-xl font-semibold mb-1">LF Plus</CardTitle>
                        <div className="mb-4">
                           <span className="text-2xl font-bold">${isYearly ? prices.lfPlus.yearly : prices.lfPlus.monthly}</span>
                           <span className="text-gray-400 ml-1">per user/month</span>
                        </div>
                        {/* <Separator className="mb-4 text-white bg-white" /> */}

                        <div className="py-3 border-t border-gray-800 text-sm flex items-center">
                           <div 
                              className="w-8 h-4 bg-gray-700 rounded-full relative mr-2 cursor-pointer"
                              onClick={()=>{
                                 setIsYearly(!isYearly)
                              }}
                           >
                              <div className={`w-4 h-4 bg-white rounded-full absolute transition-all ${isYearly? "right-0" : "left-0"}`}>
                              </div>
                           </div>
                           Billed {isYearly?"yearly" : "monthly"}
                        </div>
                     </CardHeader>
                     <div className="px-6 pb-6">
                        <ul className="space-y-3 mb-6">
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>30 invoice generation per month</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Pay your invoices with stripe</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>1 User</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Track your transactions</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Download transactional receipts</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Branded invoices and transactional receipts</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Financial dashboard</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Fintech CRM</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Create and Manage your customers</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Customer Support</span>
                           </li>
                        </ul>
                        <Button className="w-full border rounded-xl border-[#2B2B2B] bg-black hover:bg-[#121212] text-white font-mono">
                           {isYearly ? (
                              <Link href="https://test.checkout.dodopayments.com/buy/pdt_EtovdKYpIfuXmBHxk5DFH?quantity=1&redirect_url=https://www.lamflo.xyz">
                                 Get Started
                              </Link>
                           ) : (
                              <Link href="https://test.checkout.dodopayments.com/buy/pdt_Qhf4pPY3ZLOCRgqXg80Wx?quantity=1&redirect_url=https://www.lamflo.xyz">
                                 Get Started
                              </Link>
                           )}
                        </Button>
                     </div>
                  </Card>

                  {/* Pro plan */}

                  <Card className="border border-white rounded-lg overflow-hidden bg-[#121212]">
                     <CardHeader className="p-6">
                        <CardTitle className="text-xl font-semibold mb-1">LF Pro</CardTitle>
                        <div className="mb-4">
                           <span className="text-2xl font-bold">${isYearly ? prices.lfPro.yearly : prices.lfPro.monthly}</span>
                           <span className="text-gray-400 ml-1">per user/month</span>
                        </div>
                        {/* <Separator className="mb-4 text-white bg-white" /> */}

                        <div className="py-3 border-t border-gray-800 text-sm flex items-center">
                           <div 
                              className="w-8 h-4 bg-gray-700 rounded-full relative mr-2 cursor-pointer"
                              onClick={()=>{
                                 setIsYearly(!isYearly)
                              }}
                           >
                              <div className={`w-4 h-4 bg-white rounded-full absolute transition-all ${isYearly? "right-0" : "left-0"}`}>
                              </div>
                           </div>
                           Billed {isYearly?"yearly" : "monthly"}
                        </div>
                     </CardHeader>
                     <div className="px-6 pb-6">
                        <ul className="space-y-3 mb-6">
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>50 invoice generation per month</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Pay your invoices with stripe</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>1 User</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Track your transactions</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Download transactional receipts</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Branded invoices and transactional receipts</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Financial dashboard</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Fintech CRM</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Create and Manage your customers</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Customer Support</span>
                           </li>
                        </ul>
                        <Button className="w-full border rounded-xl border-white bg-black hover:bg-[#121212] text-white font-mono">
                           {isYearly ? (
                              <Link href="https://test.checkout.dodopayments.com/buy/pdt_EtovdKYpIfuXmBHxk5DFH?quantity=1&redirect_url=https://www.lamflo.xyz">
                                 Get Started
                              </Link>
                           ) : (
                              <Link href="https://test.checkout.dodopayments.com/buy/pdt_Qhf4pPY3ZLOCRgqXg80Wx?quantity=1&redirect_url=https://www.lamflo.xyz">
                                 Get Started
                              </Link>
                           )}
                        </Button>
                     </div>
                  </Card>

                  {/* Enterprise plan */}

                  <Card className="border border-[#2B2B2B] rounded-lg overflow-hidden bg-[#121212]">
                     <CardHeader className="p-6">
                        <CardTitle className="text-xl font-semibold mb-1">Enterprise</CardTitle>
                        <div className="mb-4">
                           <span className="text-2xl font-bold">Contact Us</span>
                        </div>
                        {/* <Separator className="mb-4 text-white bg-white" /> */}
                        <div className="py-3 border-t border-gray-800 text-sm text-[#878787]">Annual billed only</div>
                     </CardHeader>
                     <div className="px-6 pb-6">
                     <ul className="space-y-3 mb-6">
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Unlimited invoice generation per month</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Pay your invoices with stripe</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>1 User</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Track your transactions</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Download transactional receipts</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Branded invoices and transactional receipts</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Financial dashboard</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Fintech CRM</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Create and Manage your customers</span>
                           </li>
                           <li className="flex items-start">
                           <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                           <span>Customer Support</span>
                           </li>
                        </ul>
                        <Button className="w-full border rounded-xl border-[#2B2B2B] bg-black hover:bg-[#121212] text-white font-mono">
                           <Link href="https://cal.link/LF-Founder-chat">
                              Request trial
                           </Link>
                        </Button>
                     </div>
                  </Card>
               </div>

               <FAQ/>

               <Footer/>
            </section>
         </main>
      </div>
   )
}