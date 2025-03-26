'use client'

import { useActionState, useEffect, useState } from "react"
import { createEarlyAccessUser } from "@/app/utils/action"
import { z } from "zod"
import { useForm } from "@conform-to/react"
import { earlyAccessSchema } from "@/app/utils/zodSchema"
import { parseWithZod } from "@conform-to/zod"
import SubmitButton from "@/app/components/submitButton"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"


export default function EarlyAccess(){

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
      <div className="flex flex-col items-center justify-center min-h-screen">
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
                <span>100</span> users have already joined the waitlist!

                </div>
                </CardContent>
            </Card>
      </div>
   )
}