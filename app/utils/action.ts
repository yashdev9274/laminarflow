'use server'

import { requireUser } from "./requireAuth"

export default async function onboarduser(){
    const session = await requireUser(); 
}