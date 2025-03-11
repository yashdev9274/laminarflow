import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function FAQ(){

    const faqs = [
        {
          question: "What is D3 Invoice?",
          answer: "D3 Invoice is a modern invoicing solution that helps businesses create, manage, and track invoices efficiently."
        },
        {
          question: "How does billing work?",
          answer: "We offer flexible billing plans based on your usage. You can start with our free tier and upgrade as your needs grow."
        },
        {
          question: "Can I export my data?",
          answer: "Yes, you can export your invoice data in multiple formats including PDF, CSV, and Excel."
        },
        {
          question: "Is my data secure?",
          answer: "We take security seriously. All your data is encrypted and stored securely in compliance with industry standards."
        }
      ]


    return(
         <section className="container py-20">
            {/* <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
                <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                    Frequently Asked Questions
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    <Balancer>
                        Everything you need to know about D3Flo Invoice System
                    </Balancer>
                </p>
            </div> */}

            <div className="mx-auto mt-16 max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b py-2">
                        <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                            What is D3Flo?
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            D3Flo is a modern financing system that helps businesses and builders create, manage, and track finances efficiently.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-b py-2">
                        <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                            How do I get started?
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            Simply sign up for an account, complete your business profile, and you can start creating invoices right away.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-b py-2">
                        <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                            Is my data secure?
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            Yes, we use industry-standard encryption and security measures to protect your data and ensure privacy.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border-b py-2">
                        <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                            Can I customize my invoices?
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            Yes, you can customize your invoices with your logo, colors, and preferred layout templates.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}