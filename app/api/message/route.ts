import { requireUser } from "@/app/utils/requireAuth";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidators";
import { NextResponse } from "next/server";

export const POST = async(req: NextResponse)=>{

   const body = await req.json()

   const session = await requireUser();
    const userId = (session.user as { id: string }).id;

   //  await getUser(userId);

   if(!userId)
      return new Response('Unauthorized', {status: 401})

   const { fileId, message } =
    SendMessageValidator.parse(body)
}