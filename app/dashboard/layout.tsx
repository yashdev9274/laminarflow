import { ReactNode } from "react";
import { requireUser } from "../utils/requireAuth";
import { AppSidebar } from "@/components/app-sidebar";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({children}:{children: ReactNode}){

    const session = await requireUser();

    return(
        <>
            <SidebarProvider> 
                <AppSidebar/>
            </SidebarProvider>
        </>
    )
}