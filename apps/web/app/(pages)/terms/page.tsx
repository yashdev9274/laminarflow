'use client'

import BackRedirectButton from "@/app/components/backRedirectButton";
import { SectionCards } from "@/components/home/demo/sectionCards";
import Footer from "@/components/home/footer";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { createSectionId } from "@/lib/utils";
import { Github, Link2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const LAST_UPDATED = 'April 23,2025'

export default function TermsPage(){

   const router = useRouter();
   const {copiedValue: copiedSection , copyToClipboard}  = useCopyToClipboard();

   const handleCopyLink = (sectionId: string) => {
      const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
      copyToClipboard(url, sectionId);
   };


   const sections = [
      {
         title: "Introduction",
         content: (
            <div>
               <p>
               Welcome to LaminarFlow, an open-source fintech platform. These Terms of Service ("Terms") govern your access to and use of our website, applications, APIs, and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you are using the Service on behalf of an organization, you are agreeing to these Terms on behalf of that organization.
               </p>
            </div>
         )
      },
      
   ]


   return(
      <div className="relative flex min-h-screen w-full flex-col overflow-auto bg-black">
         <div>
            <header className="absolute left-4 top-4 md:left-8 md:top-8">
                  <div className="flex justify-between items-center container">                    
                     <BackRedirectButton text="Back" href = "/"/>
                  </div>
            </header>
         </div>

         <div className="container mx-auto max-w-4xl px-4 py-16">
            <Card className="overflow-hidden rounded-xl border-none  shadow-xl backdrop-blur-lg bg-black/40">
               <CardHeader className="space-y-4  px-8 py-8 bg-black/60">
               <div className="space-y-2 text-center">
                  <CardTitle className="text-3xl font-bold tracking-tight text-neutral-100 md:text-4xl dark:text-white">
                     LaminarFlow Terms of Service
                  </CardTitle>
                  <div className="flex items-center justify-center gap-2">
                     <p className="dark:text-muted-foreground text-sm text-neutral-500">
                        Last updated: {LAST_UPDATED}
                     </p>
                  </div>
               </div>
               </CardHeader>
            
                  {/* Section  */}
                  <div className="space-y-8 p-8">
                     {sections.map((section)=>{
                        const sectionId = createSectionId(section.title);
                        
                        
                        return(
                           <div
                              key= {section.title}
                              id={sectionId}
                              className=" flex flex-col group rounded-xl border border-gray-200  p-6 transition-all border-gray-800/10 bg-black/20 hover:border-gray-700/30 hover:bg-black/30"
                           >
                              <div className="mb-4 flex flex-col">
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
                                    className="prose prose-sm prose-invert prose-a:text-neutral-100 hover:prose-a:text-blue-200 max-w-none text-neutral-300 "
                                 >
                                    {section.content}
                                 </div>                        
                              </div>
                           </div>
                        )
                     })}
                     <div className="mt-12 flex flex-wrap items-center justify-center gap-4"></div>
                  </div>
            </Card>

            <Footer/>
         </div>
      </div>
   )
}