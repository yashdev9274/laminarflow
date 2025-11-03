import { ReactNode } from "react";

export default function UserAccountLayout({children}:{children: ReactNode}){
    return(
        <div>
            <main>
                {children}
            </main>
        </div>
    )
}