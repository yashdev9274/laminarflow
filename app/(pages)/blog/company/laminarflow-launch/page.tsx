'use client'

import BackRedirectButton from "@/app/components/backRedirectButton";
import { SectionCards } from "@/components/home/demo/sectionCards";
import Footer from "@/components/home/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { createSectionId } from "@/lib/utils";
import { ArrowRight, ArrowUpRight, Github, Link2, Mail } from "lucide-react";
import Image from "next/image";
import LFlogo from "@/public/LF-logo.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const PUBLISH_DATE = 'May 1,2025'

export default function LaminarFlowLaunchPage(){

   const router = useRouter();

   const {copiedValue: copiedSection , copyToClipboard}  = useCopyToClipboard();

   const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({})
   const handleCopyLink = (sectionId: string) => {
      const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
      copyToClipboard(url, sectionId);
   };

   const scrollToSection = (sectionId: string) =>{
      const section = document.getElementById(sectionId);
      if(section){
         section.scrollIntoView({behavior: "smooth"})
      }
   }

   const [activeSection, setActiveSection] = useState<string>("")

   useEffect(()=>{
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(entry.target.id)
              }
            })
          },
          { rootMargin: "-100px 0px -80% 0px" },
      )

      Object.values(sectionRefs.current).forEach((ref) => {
         if (ref) observer.observe(ref)
       })
   
       return () => {
         Object.values(sectionRefs.current).forEach((ref) => {
           if (ref) observer.unobserve(ref)
         })
       }
   },[])


   const sections = [
      {
         title: "",
         content: (
            <div>
               <p>
                  Since we have first announced LaminarFlow about a month ago, more than 150 users have signed up for waitlist.
               </p>
               <p className="mt-4">
                  Today we're excited to announce the public launch of LaminarFlow v0.1 + waitlist to help you manage your business faster and easier.
               </p>
            </div>
         )
      },
      {
         title: "What is LaminarFlow?",
         content: (
            <div>               
               <div className="mt-4">
                  {/* <h4 className="mt-3 font-semibold">Google Account Integration:</h4> */}
                  <p className="mb-4 mt-4 text-mid text-neutral-400">
                     LaminarFlow is a modern, powerful, and affordable platform
                     to manage your business's financial workflow.
                     <p className="mt-3">
                        We are in world which is growing faster than we can ever imagine, 
                        and in such world it is very hectic to build business with managing your finances, clients, and projects.
                        <p>
                           This is where LaminarFLow comes in.
                        </p>
                     </p>
                  </p>

                  <div className="text-sm">
                     <h3 className="mb-3">LaminarFlow helps you:</h3>
                     <ul className="ml-4 list-disc space-y-2">
                        <li>Track your business's income and expenses.</li>
                        <li>Monitor and automate payments.</li>
                        <li>Manage and track your transactions.</li>
                        <li>Create and customizable professional invoices.</li>
                        <li>Get a report on your business finances.</li>
                        <li>Manage your customers/clients.</li>
                     </ul>
                  </div>
               </div>
            </div>
         )
      },
      {
         title: "How does it works?",
         content: (
            <div>
               <div className="w-full mt-4 max-w-2xl rounded-lg overflow-hidden shadow-lg bg-black">
               <iframe
                  className="w-full aspect-video"
                  src="https://cap.link/sk4tch3rqvnpdwc"
                  title="How does it work?"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
               ></iframe>
               </div>
               <p className="mb-4 mt-4 text-mid text-neutral-300">We use your information to:</p>
               <ul className="ml-4 list-disc space-y-2 mt-2 text-mid">
                  <li>Deliver and operate LaminarFlow's services.</li>
                  <li>Create and manage payments, transactions.</li>
                  <li>Process invoices, track project milestones, and manage financial workflows.</li>
                  <li>Send service-related emails and updates.</li>
               </ul>
            </div>
         )
      },
      {
         title:"Create Invoices",
         content: (
            <div className="space-y-3">
               <span className="mb-4 mt-4 text-mid text-neutral-400">
                  You can easily create invoices for your business, and track them:
                  <ul className="ml-4 list-disc text-mid space-y-2 mt-2">
                     <li> Go to Invoices</li>
                     <li> Click on plus icon</li>
                     <li> Fill out all the details and create new record</li>
                     <li> In order to pay respective invoice click action button and pay with DoDoPayments</li>
                  </ul>
               </span>
               <div className="w-full mt-8 max-w-2xl rounded-lg overflow-hidden shadow-lg bg-black">
                  <iframe
                     className="w-full aspect-video"
                     src="https://cap.link/webhty92jdm77bs"
                     title="How does it work?"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                  ></iframe>
               </div>
               
            </div>
         )
      },
      {
         title:"Create transactions",
         content: (
            <div>
               <span className="mb-4 mt-4 text-mid text-neutral-400">
                  You can easily create transactions for your business, and track them:
                  <ul className="ml-4 list-disc text-mid space-y-2 mt-2">
                     <li> Go to Transactions</li>
                     <li> Click on plus icon</li>
                     <li> Fill out all the details and create new record</li>
                     <li> In order to pay respective transactions click action button and pay with DoDoPayments</li>
                  </ul>
               </span>
               <div className="w-full mt-8 max-w-2xl rounded-lg overflow-hidden shadow-lg bg-black">
                  <iframe
                     className="w-full aspect-video"
                     src="https://cap.link/q5nnp3gbpkxxq0v"
                     title="How does it work?"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                  ></iframe>
               </div>
               
            </div>
         )
      },
      {
         title:"Export your financial data",
         content: (
            <div>
               <span className="mb-4 mt-4 text-mid text-neutral-400">
                  You can easily export financial data and report your business:
                  <ul className="ml-4 list-disc text-mid space-y-2 mt-2">
                     <li> Go to table action</li>
                     <li> Click on download</li>
                     <li> You'll be redirected to export page</li>
                     <li> Now you can download your data in pdf</li>
                  </ul>
               </span>
            </div>
         )
      },
      {
         title:"Your financial analytics",
         content: (
            <div>
               LaminarFlow is an open-sourced product, and this Privacy Policy may be updated from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </div>
         )
      },
      {
         title:"Create your client",
         content: (
            <div>
               <span className="mb-4 mt-4 text-mid text-neutral-400">
                  You can also create your client's details:
                  <ul className="ml-4 list-disc text-mid space-y-2 mt-2">
                     <li> Go to Companies section</li>
                     <li> Click on plus icon</li>
                     <li> Fill out all the details and create new record</li>
                  </ul>
               </span>
               <div className="w-full mt-8 max-w-2xl rounded-lg overflow-hidden shadow-lg bg-black">
                  <iframe
                     className="w-full aspect-video"
                     src="https://cap.link/fyavbvyrfqz0gy0"
                     title="How does it work?"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                  ></iframe>
               </div>
            </div>
         )
      },
      {
         title:"On what LaminarFlow is built upon?",
         content: (
            <div>
               <span className="mb-4 mt-4 text-mid text-neutral-400">
                  LaminarFlow is built upon modern tools and technologies to provide you with the best experience:
                  <ul className="ml-4 list-disc text-mid space-y-2 mt-2">
                     <li> Next.js</li>
                     <li>TypeScript</li>
                     <li>Tailwind CSS</li>
                     <li>ShadcnUI</li>
                     <li>Auth.js</li>
                     <li>Prisma</li>
                     <li>PostgreSQL</li>
                     <li>Neon</li>
                     <li>Resend</li>
                     <li>Arcjet</li>
                     <li>DoDoPayment + Stripe</li>
                  </ul>
               </span>
            </div>
         )
      },
      {
         title:"Get started today",
         content: (
            <div>
               <span className="mb-4 mt-4 text-mid text-neutral-400">
                  Join us now:

                  <div className="mt-3">
                     Feel free to contact me in case you need help 
                     <div className="mt-3">
                        We're excited to see how good you'll manage your finances with <Link href="https://www.lamflo.xyz" className="underline">lamflo.xyz</Link>.
                     </div>
                     <div className="mt-3">
                        You can follow us <Link href="https://x.com/dew_yashtwt" className="underline">@dew_yashtwt on X</Link> to get updates.
                     </div>
                  </div>
                  <div className="mt-5">
                     <Link
                        href="https://www.lamflo.xyz"
                     >
                        <Button
                           className=" inline-flex items-center group justify-center rounded-full bg-neutral-950 border border-[#565555] px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-zinc-800 mt-2"
                        >
                           Get started
                           <ArrowUpRight
                              className="-ms-1 me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                              size={16}
                              aria-hidden="true"
                           />
                        </Button>
                     </Link>
                  </div>
               </span>
            </div>
         )
      }
   ]


   return(
      <div className="relative flex min-h-screen w-full flex-col overflow-auto bg-black">

         {/* Back button */}
         <div>
            <header className="absolute left-4 top-4 md:left-8 md:top-8">
                  <div className="flex justify-between items-center container">                    
                     <BackRedirectButton text="Back" href = "/blog/company"/>
                  </div>
            </header>
         </div>

         <div className="container mx-auto max-w-6xl px-4 py-8 md:py-16">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                  <div className="lg:col-span-2">
                     <Card className="overflow-hidden rounded-xl border-none shadow-md backdrop-blur-lg bg-black/40">

                        <CardHeader className="space-y-4  px-4 py-4 md:px-8 md:py-8 bg-black/60">
                           <div className="space-y-6 text-center">
                              
                              <div className="flex flex-wrap gap-3 justify-center">
                                 <Link href="/blog/company">
                                    <span className="inline-flex rounded items-center border bg-white border-[#565555] px-3 py-1 text-sm text-black">
                                       Company
                                    </span>
                                 </Link>
                                 <div className="flex items-center justify-center gap-2">
                                    <p className="dark:text-muted-foreground text-sm text-neutral-500">
                                       Publish Date: {PUBLISH_DATE}
                                    </p>
                                 </div>
                              </div>
                              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-100 dark:text-white">
                                 Introducing LaminarFlow "v0.1"
                              </CardTitle>
                              
                              <div>
                                 
                                 <p className="text-lg text-neutral-500">
                                    A modern, powerful, and affordable platform
                                    <p>

                                       to manage your business's financial workflow.
                                    </p>
                                 </p>
                              </div>
                           </div>
                        </CardHeader>
                     
                           {/* Section  */}
                           <div className="space-y-8 p-4 md:p-8">

                              {/* Image Banner */}
                              <div className="px-8">
                                 <div className="relative rounded-2xl aspect-video w-full overflow-hidden rou mb-8">
                                    <Image
                                       src="/banner-2.png"
                                       alt="LaminarFlow Logo"
                                       width={800}
                                       height={480}
                                       className="object-cover object-center"
                                       priority
                                    />
                                    <div className="absolute top-4 right-4 bg-gray-900/80 text-white text-xs px-2 py-1 rounded-full">
                                       NEW
                                    </div>
                                 </div>
                              </div>

                              {/* Mapping blog content */}

                              {sections.map((section)=>{
                                 const sectionId = createSectionId(section.title);
                                 return(
                                    <div
                                       key={section.title}
                                       id={sectionId}
                                       // ref={(el) => (sectionRefs.current[sectionId] = el)}
                                       ref={(el) => { if (el) sectionRefs.current[sectionId] = el; }}
                                       className="flex flex-col group rounded-xl border border-gray-200 p-6 transition-all border-gray-800/10 bg-black/20"
                                    >
                                       <div className="mb-4 flex flex-col">
                                          {/* <div className="flex items-center"> */}
                                             <h1 className="text-xl font-semibold tracking-tight text-neutral-100 dark:text-white">
                                                {section.title}
                                             </h1>
                                             <button
                                                onClick={()=> handleCopyLink(sectionId)}
                                                className="text-muted-foreground text-neutral-400 transition-all hover:text-neutral-700 dark:hover:text-white ml-auto"
                                                aria-label={`Copy link to ${section.title} section`}
                                             >
                                                <Link2
                                                   className={`h-4 w-4 ${copiedSection === sectionId ? 'text-red-600 dark:text-black' : ''}`}
                                                />
                                             </button>      
                                             <div
                                                className="prose prose-lg max-w-none text-neutral-300 "
                                             >
                                                {section.content}
                                             </div>                        
                                          {/* </div> */}
                                       </div>
                                    </div>
                                 )
                              })}
                              <div className="mt-12 flex flex-wrap items-center justify-center gap-4"></div>
                           </div>
                     </Card>
                  </div>

                  {/* side-content */}

                  <div className="lg:col-span-1 sticky top-20 space-y-8">
                     <div className="sticky top-20 space-y-8">

                        {/* Author Card */}
                        <Card className="rounded-xl border border-[#565555] bg-neutral-900 p-6 shadow-sm">
                           <CardTitle className="mb-4 text-lg font-medium">Written by</CardTitle>
                              <CardContent>
                                 <div className="flex items-center gap-3">
                                    <Avatar>
                                       {/* <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Yash Dewasthale" /> */}
                                       <AvatarFallback>
                                          <AvatarImage src="/pfp.png" alt="pfp" />
                                       </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                       <Link href="https://dub.sh/yashdew"><p className="font-medium">Yash Dewasthale</p></Link>
                                       <Link href="https://www.lamflo.xyz"><p className="text-sm text-gray-200"> Creator of LaminarFlow</p></Link>
                                    </div>
                                 </div>
                              </CardContent>
                        </Card>

                        {/* side-navigation */}

                        <div className="rounded-xl border border-[#565555] p-6 shadow-sm">
                           <h3 className="mb-4 text-lg font-medium flex items-center">
                              <span>On this page</span>
                           </h3>
                           <nav
                              className="space-y-1">
                              {sections.map((section)=>{
                                 const sectionId = createSectionId(section.title)
                                 return(
                                    <button
                                       key={section.title}
                                       onClick={()=> scrollToSection(sectionId)}
                                       className={`block w-full text-left px-3 py-2 text-black text-sm rounded transition-colors ${activeSection === sectionId ? "bg-gray-100 text-black font-medium"
                           : "text-white hover:bg-gray-50 hover:text-black"} `}
                                    >
                                       {section.title}

                                    </button>
                                 )
                              })}
                           </nav>
                        </div>
                        
                        {/* LF Card */}
                        <div className="rounded-xl border border-[#565555] p-6 shadow-sm">
                           <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                              <Image
                              src="/LF-banner.png"
                              alt="Dub dashboard"
                              width={300}
                              height={200}
                              className="object-cover rounded"
                              />
                           </div>
                           <h3 className="text-xl font-bold mb-2">Try LaminarFlow for free</h3>
                           <Link
                              href="https://www.lamflo.xyz"
                           >
                              <Button
                                 className=" inline-flex items-center group justify-center rounded-full bg-neutral-950 border border-[#565555] px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-zinc-800 mt-2"

                              >
                                 Get started
                                 <ArrowRight
                                    className="-ms-1 me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                                    size={16}
                                    aria-hidden="true"
                                 />
                              </Button>
                           </Link>
                        </div>
                        
                     </div>
                  </div>
               </div>

            <Footer/>
         </div>
      </div>
   )
}