"use client"

import Balancer from "react-wrap-balancer"
import { NavbarDemo } from "../navbar/navbar"
import IntroBar from "@/app/components/introBar"
import { TypingText } from "../ui/typing-text"
import demoImage1 from "@/public/asset/images/1.jpg"
import demoImage2 from "@/public/asset/images/2.png"
import Waitlist from "./waitlist"
import Image from "next/image"
import Pointer from "./pointer"


export default function Hero(){

    return(
        <section className="py-16 md:py-24 mt-10 mb-5">

            <div className="container relative mt-5">
                
                <div className="absolute -left-32 top-16 hidden lg:block">
                    <Image
                        src={demoImage1}
                        alt="Design example 1 image"
                        width={250}
                        height={250}
                    />
                </div>

                <div className="absolute -right-32 -top-16 hidden lg:block">
                    <Image
                        src={demoImage2}
                        alt="Design example 2 image"
                        width={250}
                        height={250}
                    />
                </div>
                <div className="absolute left-56 top-20 hidden lg:block">
                    <Pointer name="Yash"/>
                </div>

                <div className="absolute right-80 -top-4 hidden lg:block">
                    <Pointer name="Dew" color="red"/>
                </div>
            
                <div className="container">
                    <p className="text-center text-4xl font-semibold leading-tight tracking-[-0.03em] text-zinc-400 sm:text-base md:text-lg">The #1 </p>
                    <p className="text-center text-4xl font-bold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left, white, white, rgb(74,32,138), rgb(255,255,255,0.5))] text-transparent bg-clip-text  text-white sm:text-5xl md:text-6xl"> 
                        Open-Sourced <TypingText text="Fintech" cursor cursorClassName="h-9"/>

                    </p>
                </div>
                <div className="grid grid-col mx-auto w-full max-w-2xl md:max-w-4xl">
                    <Balancer className="text-shinyGray mx-auto mt-3 mb-5 text-center text-sm leading-tight sm:text-lg md:text-[22px] ">
                        Manage your business with <span className="font-mono">LaminarFlow</span> – a
                        modern, powerful, and affordable platform to manage your business&apos;s financial workflow
                    </Balancer>
                    {/* <RedirectButton text="Join Waitlist" href='/early-access'/> */}
                    <Waitlist/>
                </div>
            
            </div>
            
            
        </section>
    )
}