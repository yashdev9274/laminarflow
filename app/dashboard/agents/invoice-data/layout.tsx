import { ReactNode } from "react";

export default function InvoiceDataLayout({children}:{children: ReactNode}){
    return(
        <div>
            <main>
                {children}
            </main>
        </div>
    )
} 