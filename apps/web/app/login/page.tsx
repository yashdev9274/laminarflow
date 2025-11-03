import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { auth, signIn } from "../utils/auth";
import { requireUser } from "../utils/requireAuth";
import { redirect } from "next/navigation";
import SubmitButton from "../components/submitButton";
import BackRedirectButton from "../components/backRedirectButton";

 export default async function Login() {
    const session = await auth()
    if(session?.user){
        redirect("/dashboard")
    }
    return(
      <div className="flex h-screen w-full items-center justify-center">

        <div className="flex h-mid-screen w-full max-w-md flex-col items-center space-y-6 mt-5"> 
          <div className="text-center">
            <h1 className="text-xl font-medium text-white">
              {/* <Image
                src="/LF-logo.png"
                alt="Logo"
                width={56}
                height={56}
                className="border-white"
                
              />   */}
              LaminarFlow
            </h1>
          </div>

          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          
          <Card className="w-full h-mid-screen bg-[#1c1c1c] border-[#333] shadow-lg">
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
                  <label htmlFor="email" className="block text-sm font-medium text-white">Email address</label>
                  <Input name="email" type="email" required placeholder = "example@gmail.com" className="bg-[#1c1c1c] border-[#333] text-white h-8 w-sm rounded"/>
                </div>
                <SubmitButton text="LogIn"/>
              </form>
              <div className="flex flex-col items-center justify-center mt-3">
                <div className="flex items-center">
                  <p className="text-sm text-neutral-500 mb-3">
                    or
                  </p>
                </div>
                <BackRedirectButton text="Back to homepage" href="/" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mt-5 ">
                  Once you login, you will need to verify your email address to access LaminarFLow.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
}