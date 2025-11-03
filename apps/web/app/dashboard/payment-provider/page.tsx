import BackRedirectButton from "@/app/components/backRedirectButton";
import PaymentTab from "@/app/components/paymentTabs";

export default function PaymentProvider(){
   return(
      <main className="relative mx-2 mb-10 mt-4 space-y-8 overflow-hidden px-1 sm:mx-3 md:mx-5 md:mt-5 lg:mx-7 lg:mt-8 xl:mx-10">
         <div className="mb-4 flex items-center justify-between md:mb-8 lg:mb-12">   
            <BackRedirectButton
               href="/dashboard"
               text="Back to dashboard"
            />
         </div>
         
         <header>
            <section className="mb-4 flex items-center justify-between md:mb-8 lg:mb-12">
               <div className="space-y-1">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                     Payment Provider
                  </h3>
                  <p className="text-sm text-muted-foreground">Connect your provider</p>
               </div>
            </section>
         </header>
         <div className="mb-4 flex items-center justify-center md:mb-8 lg:mb-12">
            <PaymentTab/>
         </div>

         
      </main>
   )
}