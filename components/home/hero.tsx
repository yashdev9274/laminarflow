"use client"

import Balancer from "react-wrap-balancer"
import { Card, CardContent } from "../ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


export default function Hero(){
    return(
        <div className="mt-11">
            <p className="text-center text-4xl font-semibold leading-tight tracking-[-0.03em]  text-white sm:text-6xl md:px-0">
                The future of TechFinance is here
            </p>
            <div className="mx-auto w-full max-w-4xl">
                <Balancer className="text-shinyGray mx-auto mt-3 text-center text-[15px] leading-tight sm:text-[22px] ">
                    Manage your finances the way you want with <span className="font-mono">D3Flo</span> – an
                    open sourced Finance app that puts your privacy and safety first.
                </Balancer>
            </div>
            <Card className="mt-4 w-full border-none bg-transparent shadow-none">
                <CardContent className="flex flex-col items-center justify-center px-0">
                <div className="flex items-center justify-center gap-4 mt-7">
                    <Input type="text" placeholder="you@example.com" className="placeholder:text-sm md:w-80" />
                    <Button className="ml-2 px-4 py-2 rounded-lg bg-white text-black">
                        Join waitlist
                    </Button>
                </div>
                <div className="text-center text-white mt-4">
                    20 people have already joined the waitlist
                </div>
                </CardContent>
            </Card>
            
        </div>
    )
}