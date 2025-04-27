'use client'

import BackRedirectButton from "@/app/components/backRedirectButton";
import { SectionCards } from "@/components/home/demo/sectionCards";
import Footer from "@/components/home/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { createSectionId } from "@/lib/utils";
import { Github, Link2, Mail } from "lucide-react";
import Image from "next/image";
import LFlogo from "@/public/LF-logo.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PUBLISH_DATE = 'April 23,2025'

export default function LaminarFlowLaunchPage(){

   const router = useRouter();

   const {copiedValue: copiedSection , copyToClipboard}  = useCopyToClipboard();

   const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({})
   const handleCopyLink = (sectionId: string) => {
      const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
      copyToClipboard(url, sectionId);
   };


   const sections = [
      {
         title: "Our commitment to privacy",
         content: (
            <div>
               <p>
                  At LaminarFlow, we respects your privacy and is committed to protecting the personal information you provide when you interact with our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services, including through our website, web application, support communications, and integrated services.
               </p>
               <p className="mt-4">
                  This Privacy Policy also explains your rights regarding your personal information and how you can contact us with questions.
               </p>
            </div>
         )
      },
      {
         title: "1. Information we collect",
         content: (
            <div>
               <h2>We collect personal information in the following ways:</h2>
               
               <div className="mt-4 mb-4">
                  <h4 className="mt-3 font-semibold">Google Account Integration:</h4>
                  <p className="mb-4 mt-4">When you use Zero with your Google Account:</p>
                  <ul className="ml-4 list-disc space-y-2">
                     <li>We request access to your Gmail data only after receiving your explicit consent</li>
                     <li>We access only the necessary Gmail API scopes required for email functionality</li>
                     <li>Your Google account credentials are never stored on our servers</li>
                     <li>We use secure OAuth 2.0 authentication provided by Google</li>
                     <li>
                        You can revoke our access to your Google account at any time through your Google Account
                        settings
                     </li>
                  </ul>
               </div>
               <div className="mt-4 mb-4">
                  <h4 className="mt-3 mb-4">Directly from you:</h4>
                  <ul className="ml-4 list-disc space-y-2">
                     <li>When you create an account, manage billing, or interact with our support team.</li>
                     <li>When you submit or view invoices, upload documents, or communicate with clients.</li>
                  </ul>
               </div>

            </div>
         )
      },
      {
         title: "2. How We Use Your Information",
         content: (
            <div>
                  <p >We use your information to:</p>
               <ul className="ml-4 list-disc space-y-2 mt-2">
                  <li>Deliver and operate LaminarFlow’s services.</li>
                  <li>Process invoices, track project milestones, and manage financial workflows.</li>
                  <li>Send service-related emails and updates.</li>
               </ul>
            </div>
         )
      },
      {
         title:"3. Contact Us",
         content: (
            <div className="space-y-3">
               <p>For any questions about this policy or your personal data, reach out to:</p>
               <div className="flex flex-col space-y-2">
                  <a
                     href="mailto:yashdev.yvd@gmail.com"
                     className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                     <Mail className="mr-2 h-4 w-4"/>
                     yashdev.yvd@gmail.com
                  </a>
                  <a
                     href="https://github.com/yashdev9274/laminarflow"
                     className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                     <Github className="mr-2 h-4 w-4" />
                     Open an issue on GitHub
                  </a>
               </div>
            </div>
         )
      },
      {
         title:"Updates to this Policy",
         content: (
            <div>
               LaminarFlow is an open-sourced product, and this Privacy Policy may be updated from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </div>
         )
      }
   ]


   return(
      <div className="relative flex min-h-screen w-full flex-col overflow-auto bg-black">

         <div>
            <header className="absolute left-4 top-4 md:left-8 md:top-8">
                  <div className="flex justify-between items-center container">                    
                     <BackRedirectButton text="Back" href = "/blog/company"/>
                  </div>
            </header>
         </div>

         <div className="container mx-auto max-w-6xl px-4 py-16">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                     <Card className="overflow-hidden rounded-xl border-none shadow-md backdrop-blur-lg bg-black/40">

                        <CardHeader className="space-y-4  px-8 py-8 bg-black/60">
                           <div className="space-y-6 text-center">
                              
                              <div className="flex flex-wrap gap-3">
                                 <Link href="/blog/laminarflow-launch">
                                    <span className="inline-flex rounded items-center border bg-white border-[#565555] px-3 py-1 text-sm text-black">
                                       Company News
                                    </span>
                                 </Link>
                                 <div className="flex items-center justify-center gap-2">
                                    <p className="dark:text-muted-foreground text-sm text-neutral-500">
                                       Publish Date: {PUBLISH_DATE}
                                    </p>
                                 </div>
                              </div>
                              <CardTitle className="text-4xl font-bold tracking-tight text-neutral-100 md:text-4xl dark:text-white">
                                 Introducing LaminarFlow
                              </CardTitle>
                              
                              <p className="text-lg text-neutral-500">
                                 Introducing LaminarFlow.
                              </p>
                           </div>
                        </CardHeader>
                     
                           {/* Section  */}
                           <div className="space-y-8 p-8">

                              <div className="px-8">
                                 <div className="relative aspect-video w-full overflow-hidden rou mb-8">
                                    <Image
                                       src="/placeholder.svg?height=480&width=800"
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

                  <div className="lg:col-span-1">
                     <div className="sticky top-20 space-y-8">
                        <Card className="rounded-xl border border-[#565555] bg-neutral-900 p-6 shadow-sm">
                           <CardTitle className="mb-4 text-lg font-medium">Written by</CardTitle>
                              <CardContent>
                                 <div className="flex items-center gap-3">
                                    <Avatar>
                                       <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Yash Dewasthale" />
                                       <AvatarFallback>YD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                       <Link href="https://dub.sh/yashdew"><p className="font-medium">Yash Dewasthale</p></Link>
                                       <p className=" relative text-sm text-gray-500">Creator of <Link href="https://www.lamflo.xyz"><p className="text-sm text-gray-200">LaminarFlow</p></Link></p>
                                    </div>
                                 </div>
                              </CardContent>
                        </Card>

                        {/* side-navigation */}
                        
                     </div>
                  </div>
               </div>

            <Footer/>
         </div>
      </div>
   )
}