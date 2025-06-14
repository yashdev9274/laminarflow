'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface iAppProps{
   text: string;
   href: string;
   className?: string;
   children?: React.ReactNode;
}

export default function CreateButton({text, href, className="", children}: iAppProps){
   return(
      <div className="flex justify-center items-center">
         <Link href={href}>
            <Button variant="secondary" className="hover:bg-neutral-900 font-bold py-2 px-4 rounded-xl">
               <div className="flex items-center">
                  {children}
                  {text}
               </div>
            </Button>
         </Link>
      </div>
   )
}