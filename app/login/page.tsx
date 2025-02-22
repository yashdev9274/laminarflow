import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { auth, signIn } from "../utils/auth";
import { requireUser } from "../utils/requireAuth";
import { redirect } from "next/navigation";
import SubmitButton from "../components/submitButton";

 export default async function Login() {
    const session = await auth()
    if(session?.user){
        redirect("/dashboard")
    }
    return(
        <div className="flex h-screen w-full items-center justify-center px-4"> 
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl"> Login </CardTitle>
            <CardDescription> Enter your email to login. </CardDescription>
        </CardHeader>
        <CardContent>
          <form 
            action={async(formData)=>{
              "use server"
              await signIn("nodemailer", formData)
            }}
            className="flex flex-col gap-y-4"
          >
            <div className="flex flex-col gap-y-3">
              <label>Email</label>
              <Input name="email" type="email" required placeholder = "example@gmail.com"/>
            </div>
            <SubmitButton text="LogIn"/>
          </form>
        </CardContent>
      </Card>
    </div>
    )
}