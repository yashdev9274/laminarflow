"use client"

import Balancer from "react-wrap-balancer"
import { Card, CardContent } from "../ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useActionState, useEffect, useState } from "react"
import { createEarlyAccessUser } from "@/app/utils/action"
import { useForm } from "@conform-to/react"
import { earlyAccessSchema } from "@/app/utils/zodSchema"
import { parseWithZod } from "@conform-to/zod"
import SubmitButton from "@/app/components/submitButton"
import RedirectButton from "@/app/components/redirectButton"
import Image from "next/image"
import Link from "next/link"
import { NavbarDemo } from "../navbar/navbar"
import IntroBar from "@/app/components/introBar"
import { TypingText } from "../ui/typing-text"


export default function Hero(){

    return(
        <div className="mt-7">
            <header className="sticky border rounded border-[#565555] bg-neutral-900/60 top-0 mb-5 mx-auto backdrop-blur">
            {/* you can replace sticky -> relative */}
                {/* <div className="flex justify-between items-center container"> */}
                    {/* <Link href='/' className='relative mr-6 flex items-center space-x-2'> */}
                        {/* <span className="text-2xl font-bold px-10 text-white">LF</span> */}
                        {/* <Image
                            src="/LF-logo.png"
                            alt="LaminarFlow Logo"
                            width={50}
                            height={50}
                        /> */}
                    {/* </Link> */}
                {/* <TalkToFounder text="Talk to Founder" redirectTo="https://cal.com/yash-dewasthale/talk-finance-management-with-lf-global" className="align-right rounded" /> */}
                    {/* <div className="flex justify-between items-center mr-10"> */}
                        {/* <RedirectButton text="Contact for Demo" href = "https://cal.link/LF-Founder-chat" className="align-right rounded" /> */}
                    {/* </div> */}
{/*  */}
                {/* </div> */}
                <NavbarDemo/>
            </header>

            <IntroBar text="LaminarFlow v0.1 Public Launch" href="https://x.com/dew_yashtwt/status/1920101314387673094"/>
            <div>
                <p className="text-center text-sm font-semibold leading-tight tracking-[-0.03em]  text-zinc-400 sm:text-6xl md:px-0">The #1 </p>
                <p className="text-center text-4xl font-bold leading-tight tracking-[-0.03em]  text-white sm:text-6xl md:px-0"> 
                    Open-Sourced <TypingText text="Fintech" cursor cursorClassName="h-9"/>

                </p>
            </div>
            <div className="grid grid-col mx-auto w-full max-w-4xl">
                <Balancer className="text-shinyGray mx-auto mt-3 mb-5 text-center text-[15px] leading-tight sm:text-[22px] ">
                    Manage your business with <span className="font-mono">LaminarFlow</span> – a
                    modern, powerful, and affordable platform to manage your business' financial workflow
                </Balancer>
                <RedirectButton text="Join Waitlist" href='/early-access'/>
            </div>
            
        </div>
    )
}