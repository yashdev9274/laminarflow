import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage(){
   return(
      <div className="flex flex-col items-center justify-center h-screen">
         <Button>
            <Link href="https://test.checkout.dodopayments.com/buy/pdt_Qhf4pPY3ZLOCRgqXg80Wx?quantity=1">
               Get Started
            </Link>
         </Button>
      </div>
   )
}