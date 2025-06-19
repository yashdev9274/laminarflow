import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PaymentProvider(){
   return(
      <main className="relative mx-2 mb-10 mt-4 space-y-8 overflow-hidden px-1 sm:mx-3 md:mx-5 md:mt-5 lg:mx-7 lg:mt-8 xl:mx-10">
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
         <div>
            <Card>
               <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                     <div className="space-y-1">
                        <CardTitle>Polar</CardTitle>
                        <CardDescription>Connect with your polar account.</CardDescription>
                     </div>
                     <Button variant="secondary" className="bg-blue-800 text-neutral-200 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                        Polar Sh
                     </Button>
                  </div>
                  <Separator/>
                  <div className="flex items-center justify-between mt-4 mb-4">
                     <div className="space-y-1">
                        <CardTitle>Stripe</CardTitle>
                        <CardDescription>Connect with your stripe account.</CardDescription>
                     </div>
                     <Button variant="secondary" className="bg-blue-800 text-neutral-200 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                        Stripe
                     </Button>
                  </div>
                  <Separator/>
               </CardHeader>
            </Card>
         </div>
      </main>
   )
}