import { useState } from "react";
import { toast } from "sonner";

export function useCopyToClipboard(resetDelay=2000){

   const [copiedValue, setCopiedValue]  = useState<string | null>(null);

   const copyToClipboard = (value: string, id: string) =>{
      navigator.clipboard.writeText(value);
      setCopiedValue(id);
      toast.success("Copied to clipboard");

      setTimeout(()=>{
         setCopiedValue(null);
      }, resetDelay);
   }

   return {copiedValue, copyToClipboard};

}


/*

 export function useCopyToClipboard(resetDelay=2000){

+   const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [copiedValue, setCopiedValue]  = useState<string | null>(null);

    const copyToClipboard = (value: string, id: string) =>{
       navigator.clipboard.writeText(value);
       setCopiedValue(id);
       toast.success("Copied to clipboard");

-      setTimeout(()=>{
+      // Clear any existing timer
+      if (timerRef.current) {
+         clearTimeout(timerRef.current);
+      }
+      
+      // Set new timer and store the ID
+      timerRef.current = setTimeout(()=>{
          setCopiedValue(null);
+         timerRef.current = null;
       }, resetDelay);
    }

+   // Clean up timer on unmount
+   useEffect(() => {
+      return () => {
+         if (timerRef.current) {
+            clearTimeout(timerRef.current);
+         }
+      };
+   }, []);

    return {copiedValue, copyToClipboard};
 }


*/