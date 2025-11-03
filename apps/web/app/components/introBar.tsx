
'use client'

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import Link from "next/link";
import { Rocket } from "lucide-react";


interface iAppProps{
   text: string;
   href: string;
   className?: string;
}

export default function IntroBar({text, href, className=""}: iAppProps){
   return(
      <div className="z-10 flex mt-9 mb-9 items-center justify-center">
         <div
            className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}
         >
            <Link href={href}>
               <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 gap-2 transition ease-out hover:text-neutral-700 hover:duration-300 hover:dark:text-neutral-400">
               {/* <span> Introducing LaminarFlow</span> */}
                  <Rocket className="w-5 h-5"/> 
                  {text}
                  <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
               </AnimatedShinyText>
            </Link>
         </div>
      </div>
   )
}