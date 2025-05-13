'use client'

import React, { useActionState, useEffect, useState } from "react"
import { createEarlyAccessUser } from "@/app/utils/action"
import { z } from "zod"
import { useForm } from "@conform-to/react"
import { earlyAccessSchema } from "@/app/utils/zodSchema"
import { parseWithZod } from "@conform-to/zod"
import SubmitButton from "@/app/components/submitButton"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { AnimatedGridPattern } from "@/components/earlyAccess/sqaureBgGrid"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { AnimatedNumber } from "@/components/earlyAccess/animated-number"
import BackRedirectButton from "../components/backRedirectButton"
import { useLogSnag } from "@logsnag/next"
import WaitlistSubmitButton from "../components/waitlistSubmitButton"


export default function EarlyAccess(){

   const [lastResult, action] = useActionState(createEarlyAccessUser, undefined);

    const [form, fields]  = useForm({
      lastResult,

      onValidate({formData}){
            return parseWithZod(formData,{schema: earlyAccessSchema});
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",

    });

    // LogSnag

    const {track} = useLogSnag();

    const handleSuccess = ()=>{
        // event.preventDefault();

        // const formData = new FormData();
        // formData.append("email", fields.email.initialValue || "");

        try {
            // action(formData); // Call the action with formData
    
            // If we reach here, it means the action was successful
            track({
                channel: "early-user",
                event: "User signed up for Early Access",
                user_id: fields.email.initialValue || "",
                description: "User signed up for Early Access",
                icon: "🚀",
                notify: true,
                tags: {
                    email: fields.email.initialValue || "",
                },
            });
        } catch (error) {
            console.error("Error during signup:", error);
            // Handle the error (e.g., show a message to the user)
        }
    }

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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div>
            <header className="absolute left-4 top-4 md:left-8 md:top-8">
                    <div className="flex justify-between items-center container">                    
                        <BackRedirectButton text="Return Home" href = "/"/>
                    </div>
            </header>
        </div>
        
        <Card className="mt-4 w-full border-none bg-transparent shadow-none md:px-6 py-12 md:py-20">
                <CardContent className="flex flex-col items-center justify-center px-0">
                    <p>
                        <span className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-6xl md:px-0">
                            Become our Early User!
                        </span>
                    </p>
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
                            className="bg-[#1c1c1c] border-[#333] text-white h-8 w-full rounded"
                            name={fields.email.name}
                            key={fields.email.key}
                            defaultValue={fields.email.initialValue}
                        />
                        <WaitlistSubmitButton
                             text="Join Waiting List"
                             dataChannel="early-user"
                             dataEvent="User signed up for Early Access"
                             dataUserId={fields.email.initialValue || ""}
                             dataDescription="User signed up for Early Access"
                             dataIcon="🚀"
                        />
                    </form>
                </div>
                <div className="text-center text-white mt-4">
                {/* <span>{earlyAccessCount}</span> people already joined */}
                    {/* <span>
                    <AnimatedNumber
                    springOptions={{
                        bounce: 0,
                        duration: 3000,
                    }}
                    value={100}
                    />
                    </span> users have already joined the waitlist! */}

                </div>
                </CardContent>
            </Card>
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                )}
            />
      </div>
   )
}