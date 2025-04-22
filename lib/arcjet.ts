import { prisma } from '@/app/utils/db';
import arcjet, { tokenBucket } from '@arcjet/next'

// async function getData(userId: string){
  
//    const data = await prisma.
//    where:{
//       userId: userId,
//    }
// }

const aj = arcjet({
   key: process.env.ARCJET_KEY as string ,
   characteristics:["ip.src"],
   rules:[
      tokenBucket({
         mode: "LIVE",
         refillRate: 10,
         interval: 3600,
         capacity:10, 
      })
   ]
})

export default aj;