import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { signIn } from "./utils/auth";
import Hero from "@/components/home/hero";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <div className="relative h-screen min-h-screen w-full overflow-auto bg-black text-white">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] bg-[linear-gradient(90deg,#ffd5d0_0%,#ffafcc_30%,#dbffe4_70%,#e2d6ff_100%)] rounded-lg blur-[120px] opacity-5 dark:opacity-10" />
      </div>
      {/* <div className="relative mx-auto mb-4 flex flex-col">
        Hello D3Flo user
      </div> */}
      <div className="relative mx-auto  flex flex-col">
        <Hero/>
        <Footer/>
      </div>
    </div>
  );
}
