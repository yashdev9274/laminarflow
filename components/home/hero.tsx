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


export default function Hero(){

    return(
        <div className="mt-5">

            <header className="relative top-0 mb-5 ml-10 bg-background/60 backdrop-blur">
                <div className="flex justify-between items-center container">
                    <Link href='/' className='relative mr-6 flex items-center space-x-2'>
                        {/* <span className="text-2xl font-bold px-10 text-white">LF</span> */}
                        <Image
                            src="/LF-logo.png"
                            alt="LaminarFlow Logo"
                            width={50}
                            height={50}
                        />
                    </Link>
                {/* <TalkToFounder text="Talk to Founder" redirectTo="https://cal.com/yash-dewasthale/talk-finance-management-with-lf-global" className="align-right rounded" /> */}
                    <div className="flex justify-between items-center mr-10">
                        <RedirectButton text="Talk to Founder" href = "https://cal.link/LF-Founder-chat" className="align-right rounded" />
                    </div>

                </div>
            </header>
            <p className="text-center text-4xl font-semibold leading-tight tracking-[-0.03em]  text-white sm:text-6xl md:px-0">
                The future of TechFinance is here
            </p>
            <div className="grid grid-col mx-auto w-full max-w-4xl">
                <Balancer className="text-shinyGray mx-auto mt-3 mb-5 text-center text-[15px] leading-tight sm:text-[22px] ">
                    Manage your finances the way you want with <span className="font-mono">LaminarFlow</span> – an
                    open sourced Finance app that puts your privacy and safety first.
                </Balancer>
                <RedirectButton text="Join Waitlist" href='/early-access'/>
            </div>
            
        </div>
    )
}