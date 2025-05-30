import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function FAQ(){

    const faqs = [
        {
          question: "What is LaminarFlow?",
          answer: "LaminarFlow is a modern financial solution that helps businesses create, manage, and track financial workflow efficiently."
        },
        {
          question: "How does billing work?",
          answer: "We offer flexible billing plans based on your usage. You can start with our free tier and upgrade as your needs grow."
        },
        {
          question: "Can I export my data?",
          answer: "Yes, you can export your financial data in multiple formats including PDF, CSV, and Excel."
        },
        {
          question: "Is my data secure?",
          answer: "We take security seriously. All your data is encrypted and stored securely in compliance with industry standards."
        }
      ]


    return(
         <section className="container px-10 md:px-6 py-5 md:py-20">
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

            <div className="mx-auto mt-4 md:mt-16 max-w-2xl md:max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b py-2">
                        <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline">
                            What is LaminarFlow?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm md:text-base text-muted-foreground">
                            LaminarFlow is a modern financing system that helps startups, SMBs and builders create, manage, and track finances efficiently.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-b py-2">
                        <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline">
                            How do I get started?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm md:text-base text-muted-foreground">
                            Simply create your account, complete your business profile, and you can start managing your finances right away.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-b py-2">
                        <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline">
                            Is my data secure?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm md:text-base text-muted-foreground">
                            Yes, we use industry-standard encryption and security measures to protect your data and ensure privacy.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border-b py-2">
                        <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline">
                            Can I customize my account?
                        </AccordionTrigger>
                        <AccordionContent className="text-sm md:text-base text-muted-foreground">
                            Yes, you can customize your account with your logo, colors, and preferred layout templates.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}