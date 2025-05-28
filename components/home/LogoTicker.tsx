import quantumLogo from "@/public/asset/images/quantum.svg";
import acmeLogo from "@/public/asset/images/acme-corp.svg";
import echoValleyLogo from "@/public/asset/images/echo-valley.svg";
import pulseLogo from "@/public/asset/images/pulse.svg";
import outsideLogo from "@/public/asset/images/outside.svg";
import apexLogo from "@/public/asset/images/apex.svg";
import celestialLogo from "@/public/asset/images/celestial.svg";
import twiceLogo from "@/public/asset/images/twice.svg";
import Image from "next/image";

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

        <section className="py-24 overflow-x-clip">
            <div className="container">
                <h3 className="text-center text-white/50 text-xl"> Companies of all sizes trust LaminarFlow to manage their business.</h3>
                <div className="overflow-hidden mt-12 [max-mage: linear-gradient(to_right, transparent, black_10%, black_90%,transparent)]">
                    <div className="flex gap-24 pr-24">
                        {logos.map((logos)=>(
                            <Image
                                src={logos.image}
                                key={logos.name}
                                alt={logos.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    ) 
}
