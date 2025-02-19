"use client"

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export default function SubmitButton(){
    const {pending} = useFormStatus()

    return (
        <>
            {pending ?(
                <Button disabled>
                    <Loader2 className="size-4 mr-2 animate-spin"/> Please wait...
                </Button>
            ):(
                <Button type= "submit" className="bg-black  text-white font-bold py-2 px-4 rounded">
                    Submit
                </Button>
            )}
        </>
    )
}