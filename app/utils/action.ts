'use server'

import { redirect } from "next/navigation";
import { prisma } from "./db";
import { requireUser } from "./requireAuth"
import { onboardingUserSchema } from "./zodSchema";
import {parseWithZod} from "@conform-to/zod"

export default async function onboardUser(prevState: any, formData: FormData){
    const session = await requireUser(); 

    const submission = parseWithZod(formData,{
        schema: onboardingUserSchema,
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.user.update({
        where:{
            id: session.user?.id,
        },
        data:{
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
        },
    });

    return redirect('/dashboard');
}