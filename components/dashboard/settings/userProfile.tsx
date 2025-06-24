'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Avatar,AvatarImage,
   AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function UserProfile(){
   const {data: session, status}  = useSession();

   return(
      <div>
          <Card className="border border-gray-300 rounded-lg shadow-md max-w-xs"> {/* Reduced width */}
              <CardContent className="flex justify-between items-center p-4"> {/* Flex for alignment */}
                  <div className="flex items-center gap-4"> {/* Profile info */}
                      <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                          <AvatarFallback className="rounded-lg">
                          {session?.user?.name?.charAt(0) ||
                          session?.user?.email?.charAt(0)}
                          </AvatarFallback>
                      </Avatar>
                      <div>
                          <h2 className="font-semibold">{session?.user?.email ?session?.user?.email.split('@')[0]: ""}</h2> {/* User name */}
                          <p className="text-sm text-gray-500">{session?.user?.email || ""}</p> {/* Email */}
                      </div>
                  </div>
                  {/* <Button variant="outline" className="text-red-500">Delete</Button> Delete button */}
              </CardContent>
          </Card>
      </div>
   )
}