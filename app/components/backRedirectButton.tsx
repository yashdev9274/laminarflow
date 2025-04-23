'use client'

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface iAppProps{
   text: string;
   href: string;
}

export default function BackRedirectButton({text, href}: iAppProps){
   return(
      <div className="flex justify-center items-center">
         <Link href={href}>
            <Button variant="ghost" className="group bg-neutral-950 text-white hover:bg-neutral-800 font-bold  w-full rounded">
               <ArrowLeft 
                  className="-ms-1 me-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
                  size={16}
                  aria-hidden="true"
               />
               {text}
            </Button>
         </Link>
      </div>
   )
}