import { ReactNode } from "react";

export default function InvoiceLayout({children}:{children: ReactNode}){
    return(
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}