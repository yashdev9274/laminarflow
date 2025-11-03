import { ArrowDownFromLine, ArrowDownToLine, ArrowRightLeft, ArrowUpRight, Banknote, Wallet } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import transactionComponent from '@/public/asset/images/m4.png'
import Image from "next/image";

export default function TransactionCheckout(){
   return(
      <div className="dark:bg-polar-900 rounded-lg hidden w-full flex-col overflow-hidden bg-[#101011] md:flex">
         <div className="flex flex-col items-center gap-y-8 px-8 pt-8 md:px-16 md:pt-16">
         <span className="dark:text-polar-500 text-lg text-gray-400">
            Simplifying Your Financial Management
         </span>
         <h1 className="w-fit max-w-2xl text-pretty text-center text-2xl md:text-4xl md:leading-normal">
            Seamless Transaction Management Made Easy
         </h1>
         <Link href="">
            <Button
               variant="secondary"
               className="flex flex-row items-center gap-x-2 rounded-full"
            >
               <span>Track your transactions</span>
               <ArrowUpRight fontSize="inherit" />
            </Button>
         </Link>
         </div>
         <div className="relative h-[490px] overflow-hidden">
         <div className="shadow-3xl rounded-4xl pointer-events-none absolute left-8 right-8 top-16 flex flex-col items-center md:left-16 md:right-16">
            <Image
               src={transactionComponent}
               alt="Transaction Component Image"
               width={900}
               height={900}
            />
         </div>
         </div>
      </div>
   )
}