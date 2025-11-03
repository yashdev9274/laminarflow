import { ReactNode } from "react";

export default function InvoiceIdPageLayout({children}:{children: ReactNode}){
    return(
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}