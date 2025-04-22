'use client'

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useRouter } from "next/navigation";

export default function PrivacyPage(){

   const router = useRouter();
   const {copiedValue: copiedSection , copyToClipboard}  = useCopyToClipboard();

   return(
      <div>
         Privacy Policy
      </div>
   )
}