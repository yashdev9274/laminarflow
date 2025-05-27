import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { signIn } from "./utils/auth";
import Hero from "@/components/home/hero";
import Footer from "@/components/home/footer";
import FAQ from "@/components/home/faq";
import Demo from "@/components/home/demo/demo";
import { Features } from "@/components/home/feature";
import NewNavbar from "@/components/navbar/newNavbar";
import LogoTicker from "@/components/home/LogoTicker";

export default function Home() {
  return (
    <div className="relative h-screen min-h-screen w-full overflow-auto bg-black text-white">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] bg-[linear-gradient(90deg,#ffd5d0_0%,#ffafcc_30%,#dbffe4_70%,#e2d6ff_100%)] rounded-lg blur-[120px] opacity-5 dark:opacity-10" />
      </div>
      <div className="relative mx-auto flex flex-col max-w-7xl px-4 md:px-6 mb-9">
        <NewNavbar/>
        <Hero/>
        <LogoTicker/>
        <div className="w-full">
          <section className="flex flex-col gap-4 p-4 pt-0 mt-10 mb-9 w-full md:w-5/6 mx-auto">
            <Card>
              <Demo/>
            </Card>
          </section>
        </div>
        <Features/>
        <FAQ/>
        <Footer/>
      </div>
    </div>
  );
}
