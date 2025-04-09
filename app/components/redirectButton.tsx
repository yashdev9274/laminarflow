'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface iAppProps{
   text: string;
   href: string;
   className?: string;
}

export default function RedirectButton({text, href, className=""}: iAppProps){
   return(
      <div className="flex justify-center items-center">
         <Link href={href}>
            <Button className="bg-neutral-100 text-zinc-800 hover:bg-neutral-400 font-bold py-2 px-4 rounded">
               {text}
               <ArrowRight />
            </Button>
         </Link>
      </div>
   )
}