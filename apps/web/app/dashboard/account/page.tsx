'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useSession } from "next-auth/react";
import { useActionState } from "react";
import { toast } from "sonner";


export default function AccountGeneral(){

   // const [lastResult, action] = useActionState();
   //  const [form, fields]  = useForm({
   //      lastResult,

   //      onValidate({formData}){
   //          return parseWithZod(formData,{schema: invoicSchema});
   //      },

   //      shouldValidate: "onBlur",
   //      shouldRevalidate: "onInput",

   //  })

   // const { data: session, update } = useSession();
   return(
      <main className="relative mx-2 mb-10 mt-4 space-y-8 overflow-hidden px-1 sm:mx-3 md:mx-5 md:mt-5 lg:mx-7 lg:mt-8 xl:mx-10">
         <header>
            <section className="mb-4 flex items-center justify-between md:mb-8 lg:mb-12">
               <div className="space-y-1">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                     User Account
                  </h3>
                  <p className="text-sm text-muted-foreground">Manage your profile</p>
               </div>
            </section>
         </header>
         <div>
            <Card>
               <CardHeader>
                  <CardTitle>Your Name</CardTitle>
                  <CardDescription>This will be your display name on LaminarFlow.</CardDescription>
                  {/* <form
                     title="Your Name"
                     onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const data = Object.fromEntries(formData.entries());
                        fetch("/api/account", {
                           method: "PATCH",
                           headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                     }).then(async (res) => {
                        if (res.status === 200) {
                           update();
                           toast.success("Successfully updated your name!");
                        } else {
                           const { error } = await res.json();
                           toast.error(error?.message);
                        }
                     })
                     }
                  /> */}
                  <form>
                     
                </form>
               </CardHeader>
            </Card>
            
         </div>
      </main>
   )
}