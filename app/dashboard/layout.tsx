import { ReactNode } from "react";
import { requireUser } from "../utils/requireAuth";

export default async function DashboardLayout({children}:{children: ReactNode}){

    const session = await requireUser();

    return(
        <>
            <div> 
                Hello 
                {children}
            </div>
        </>
    )
}