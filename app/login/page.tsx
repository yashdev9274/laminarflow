import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { signIn } from "../utils/auth";

export default function Login() {
    return(
        <div className="flex h-screen w-full items-center justify-center px-4"> 
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl"> Login </CardTitle>
            <CardDescription> Enter your email to login. </CardDescription>
        </CardHeader>
        <CardContent>
          <form 
            action={async()=>{
              "use server"
              await signIn()
            }}
            className="flex flex-col gap-y-4"
          >
            <div className="flex flex-col gap-y-3">
              <label>Email</label>
              <Input placeholder = "example@gmail.com"/>
            </div>
            <Button>Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
    )
}