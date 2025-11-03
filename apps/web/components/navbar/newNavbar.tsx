import { NavbarDemo } from "./navbar";

export default function NewNavbar() {
   return (
         <header className="border rounded border-[#565555] bg-neutral-900/60 top-0 mt-4 md:mt-7 mb-4 md:mb-5 w-[98vw] max-w-4xl mx-auto backdrop-blur">
               {/* you can replace sticky -> relative */}
                  {/* <div className="flex justify-between items-center container"> */}
                     {/* <Link href='/' className='relative mr-6 flex items-center space-x-2'> */}
                           {/* <span className="text-2xl font-bold px-10 text-white">LF</span> */}
                           {/* <Image
                              src="/LF-logo.png"
                              alt="LaminarFlow Logo"
                              width={50}
                              height={50}
                           /> */}
                     {/* </Link> */}
                  {/* <TalkToFounder text="Talk to Founder" redirectTo="https://cal.com/yash-dewasthale/talk-finance-management-with-lf-global" className="align-right rounded" /> */}
                     {/* <div className="flex justify-between items-center mr-10"> */}
                           {/* <RedirectButton text="Contact for Demo" href = "https://cal.link/LF-Founder-chat" className="align-right rounded" /> */}
                     {/* </div> */}
   {/*  */}
                  {/* </div> */}
                  <NavbarDemo/>
         </header>
   )
}