'use client'

import quantumLogo from "@/public/asset/images/quantum.svg";
import acmeLogo from "@/public/asset/images/acme-corp.svg";
import echoValleyLogo from "@/public/asset/images/echo-valley.svg";
import pulseLogo from "@/public/asset/images/pulse.svg";
import outsideLogo from "@/public/asset/images/outside.svg";
import apexLogo from "@/public/asset/images/apex.svg";
import celestialLogo from "@/public/asset/images/celestial.svg";
import twiceLogo from "@/public/asset/images/twice.svg";
import Image from "next/image";
import {motion} from "framer-motion"

const logos = [
    { name: "Quantum", image: quantumLogo },
    { name: "Acme Corp", image: acmeLogo },
    { name: "Echo Valley", image: echoValleyLogo },
    { name: "Pulse", image: pulseLogo },
    { name: "Outside", image: outsideLogo },
    { name: "Apex", image: apexLogo },
    { name: "Celestial", image: celestialLogo },
    { name: "Twice", image: twiceLogo },
];

export default function LogoTicker() {
    return(

        <section className="py-24 mt-11 overflow-x-clip">
            <div className="container">
                <h3 className="text-center text-white/50 text-xl"> Companies of all sizes trust LaminarFlow to manage their business.</h3>
                <div className="flex flex-1 overflow-hidden mt-12 [max-image: linear-gradient(to_right, transparent, black_10%, black_90%,transparent)]">
                    <motion.div 
                        initial={{translateX: "-50%"}}
                        animate={{translateX: "0"}}
                        transition={{
                            repeat: Infinity,
                            duration: 30,
                            ease: 'linear',
                        }}
                        className="flex flex-none gap-24 pr-24 -translate-x-1/2">
                        {[
                            quantumLogo,
                            acmeLogo,
                            echoValleyLogo,
                            pulseLogo,
                            outsideLogo,
                            apexLogo,
                            celestialLogo,
                            twiceLogo,
                            quantumLogo,
                            acmeLogo,
                            echoValleyLogo,
                            pulseLogo,
                            outsideLogo,
                            apexLogo,
                            celestialLogo,
                            twiceLogo,

                        ].map((logo,index)=>(
                            <img
                                key={index}
                                src={logo.src}
                                alt={logo.src}
                                className="h-6 w-auto flex-none"
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    ) 
}
