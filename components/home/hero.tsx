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


export default function Hero(){

    const [lastResult, action] = useActionState(createEarlyAccessUser, undefined);

    const [form, fields]  = useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData,{schema: earlyAccessSchema});
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",

    })

    // const [earlyAccessCount, setEarlyAccessCount] = useState(0)

    // useEffect(()=>{
    //     const fetchEarlyAccessCount = async ()=>{
    //         try {
    //             const response = await fetch('/api/earlyaccess/count/route')
    //             const data = await response.json()
    //             setEarlyAccessCount(data.count)
    //         } catch (error) {
    //             console.log('Error fetching waitlist count:', error)
    //         }
    //     } 
    //     fetchEarlyAccessCount()
    // },[])

    return(
        <div className="mt-11">
            <p className="text-center text-4xl font-semibold leading-tight tracking-[-0.03em]  text-white sm:text-6xl md:px-0">
                The future of TechFinance is here
            </p>
            <div className="mx-auto w-full max-w-4xl">
                <Balancer className="text-shinyGray mx-auto mt-3 text-center text-[15px] leading-tight sm:text-[22px] ">
                    Manage your finances the way you want with <span className="font-mono">LaminarFlow</span> – an
                    open sourced Finance app that puts your privacy and safety first.
                </Balancer>
            </div>
            <Card className="mt-4 w-full border-none bg-transparent shadow-none">
                <CardContent className="flex flex-col items-center justify-center px-0">
                <div className="flex items-center justify-center gap-4 mt-7">
                    <form
                        action={action}
                        id={form.id}
                        onSubmit={form.onSubmit}
                        noValidate
                        className="flex w-full max-w-md items-center gap-2"
                    >
                        <Input 
                            type="text" 
                            placeholder="you@example.com" 
                            className="placeholder:text-sm md:w-80" 
                            name={fields.email.name}
                            key={fields.email.key}
                            defaultValue={fields.email.initialValue}
                        />
                        <SubmitButton text="Join Waiting List" />
                    </form>
                </div>
                <div className="text-center text-white mt-4">
                {/* <span>{earlyAccessCount}</span> people already joined */}
                <span>20</span> people already joined the waitlist!

                </div>
                </CardContent>
            </Card>
            
        </div>
    )
}