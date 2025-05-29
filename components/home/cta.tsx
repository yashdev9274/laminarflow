import Waitlist from "./waitlist"
import starsBg from "@/public/asset/images/stars.png"
import gridLines from "@/public/asset/images/grid-lines.png"


export const CTA=()=>{
   return(
      <section className="py-20 md:py-24">
         <div className="container">
            <div className="border boarder-whiter/15 py-24 rounded-xl overflow-hidden relative"
               style={{
                  brackgroundImage: `url(${starsBg.src})`,
               }}
            >
               <div className="absolute inset-0  bg-[rgb(74,32,138)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)]" style={{
                  backgroundImage: `url(${gridLines.src})`
               }}></div>
               <div className="relative">

                  <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter text-center font-medium">AI-driven Fintech for everyone</h2>
                  <p className="text-center text-lg md:text-xl max-w-xs mx-auto  text-white/70 px-4 mt-5 tracking-tight">Manage your business with <span className="font-mono">LaminarFlow</span> – a
                  modern, powerful, and affordable platform to manage your business&apos;s financial workflow</p>
                  <div className="flex justify-center mt-8">
                     <Waitlist/>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}