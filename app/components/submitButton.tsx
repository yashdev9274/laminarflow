"use client"

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface iAppProp{
    text: string;
}

export default function SubmitButton({text}:iAppProp){
    const {pending} = useFormStatus()

    return (
        <>
            {pending ?(
                <Button disabled>
                    <Loader2 className="size-4 mr-2 animate-spin"/> Please wait...
                </Button>
            ):(
                <Button type= "submit" className="bg-white  text-black font-bold py-2 px-4 rounded">
                    {text}
                </Button>
            )}
        </>
    )
}