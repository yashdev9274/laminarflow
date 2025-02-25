import { ReactNode } from "react";

export default function InvoiceTableAction({children}:{children: ReactNode}){
    return(
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}