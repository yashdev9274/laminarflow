import { ReactNode } from "react";

export default function AgentsLayout({children}:{children: ReactNode}){
    return(
        <div>
            <main>
                {children}
            </main>
        </div>
    )
} 