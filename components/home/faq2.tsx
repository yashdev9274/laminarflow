import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
 } from "@/components/ui/accordion"
import Balancer from "react-wrap-balancer"
 
 const items = [
   {
     id: "1",
     title: "What is LaminarFlow?",
     content:
       "LaminarFlow is a modern financial solution that helps businesses create, manage, and track financial workflow efficiently.",
   },
   {
     id: "2",
     title: "How does billing work",
     content:
       "We offer flexible billing plans based on your usage. You can start with our free tier and upgrade as your needs grow.",
   },
   {
     id: "3",
     title: "Can I export my data?",
     content:
       "Yes, you can export your financial data in multiple formats including PDF, CSV, and Excel.",
   },
   {
     id: "4",
     title: "Is my data secure?",
     content:
       "We take security seriously. All your data is encrypted and stored securely in compliance with industry standards.",
   },
 ]
 
 export default function FAQ2() {
   return (
      <section className="container px-10 md:px-6 py-5 md:py-20">
         <div className="space-y-4">
            
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
                <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                    Frequently Asked Questions
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    <Balancer>
                        Everything you need to know about LaminarFlow
                    </Balancer>
                </p>
            </div>

            {/* Accordian */}
            <div className="mx-auto mt-4 md:mt-16 max-w-2xl md:max-w-3xl">
               <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-2"
                  defaultValue="3"
                  >
                  {items.map((item) => (
                     <AccordionItem
                        value={item.id}
                        key={item.id}
                        className="bg-zinc-900 has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
                     >
                        <AccordionTrigger className="py-2 text-[15px] text-neutral-100 leading-6 hover:no-underline focus-visible:ring-0">
                        {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-2">
                        {item.content}
                        </AccordionContent>
                     </AccordionItem>
                  ))}
               </Accordion>
            </div>
         </div>
      </section>
   )
 }
 