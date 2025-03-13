import { ReactNode } from "react";

export default function TransactionsLayout({children}:{children: ReactNode}){
    return(
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}