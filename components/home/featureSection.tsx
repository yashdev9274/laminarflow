"use client"

import {DotLottieCommonPlayer, DotLottiePlayer} from "@dotlottie/react-player"
import Image from "next/image";
import productImage1 from "@/public/asset/images/m1.png"
import { useEffect, useRef } from "react";
import { animate, motion,useMotionTemplate, useMotionValue, ValueAnimationTransition } from "framer-motion";

const tabs = [
   {
     icon: "/asset/images/vroom.lottie",
     title: "User-friendly dashboard",
     isNew: false,
     backgroundPositionX: 0,
     backgroundPositionY: 0,
     backgroundSizeX: 150,
   },
   {
     icon: "/asset/images/click.lottie",
     title: "Invoices",
     isNew: false,
     backgroundPositionX: 98,
     backgroundPositionY: 100,
     backgroundSizeX: 135,
   },
   {
     icon: "/asset/images/stars.lottie",
     title: "Transactions",
     isNew: true,
     backgroundPositionX: 100,
     backgroundPositionY: 27,
     backgroundSizeX: 177,
   },
 ];
 

 const FeatureTab=(tab: typeof tabs[number])=>{

  const dotLottieRef = useRef<DotLottieCommonPlayer>(null);

  const xPercentage = useMotionValue(100);
  const yPercentage = useMotionValue(50);


  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black,transparent)`
  
  useEffect(()=>{

    const options: ValueAnimationTransition={
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop"
    };


    animate(xPercentage, [0,100,100,0,0],options);

    animate(yPercentage, [0,0,100,100,0],options);
  }),[];

  const handleTabHover = ()=>{
    if(dotLottieRef.current === null) return;
    dotLottieRef.current.seek(0);
    dotLottieRef.current.play();
  };
  return(
    <div onMouseEnter ={handleTabHover} key={tab.title} className=" border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center flex-1 relative">
        <motion.div 
          style={{
            maskImage,
          }}
          className="absolute inset-0 -m-px border border-[#A369FF] rounded-xl "></motion.div>
        <div className="h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center">
          <DotLottiePlayer 
            ref={dotLottieRef}
            src={tab.icon} className="w-5 h-5"
            autoplay
          />
        </div>
        <div className="font-medium">{tab.title}</div>
        {tab.isNew && (
          <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold">
            new
          </div>
        )}
    </div>
  )
 }

 export const Features = () => {
   return(
    <section className="py-20 md:py-24">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">Elevate your business finance</h2>
          <p className="text-white/70 text-lg md:text-xl max-wid-2xl mx-auto tracking-tight text-center mt-5">From small startups to large enterprises, our AI-driven tool has revolutionized the way businesses manage their finance</p>
              <div className="mt-10 flex flex-col lg:flex-row gap-3">
                {tabs.map(tab => (
                  <FeatureTab{...tab} key={tab.title}/>
                ))}
              </div>
              <div className="border border-white/20 p-2.5 rounded-xl mt-3">
                <div className="aspect-video bg-cover border border-white/20 rounded-lg"
                  style={{
                    backgroundImage: `url(${productImage1.src})`,
                  }}
                >   

                  {/* <Image src={productImage1} alt="Product Image"/> */}
                </div>

              </div>
        </div>
    </section>
   );
 };
 