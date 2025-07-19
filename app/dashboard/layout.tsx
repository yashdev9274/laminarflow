

import { ReactNode } from "react";
import { requireUser } from "../utils/requireAuth";
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger, SidebarRightTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { SidebarRight } from "@/components/ui/sidebar-right";

async function getUser(userId: string){
  const data = await prisma.user.findUnique({
    where:{
      id: userId,
    },
    select:{
      firstName: true,
      lastName: true,
      address: true,
    }
  })

  if(!data?.firstName || !data.lastName || !data.address){
    redirect('/onboarding');
  }
}

export default async function DashboardLayout({children}:{children: ReactNode}){
    const session = await requireUser();
    const userId = (session.user as { id: string }).id;

    await getUser(userId);

    return(
        <SidebarProvider className="relative"> 
            <AppSidebar />
            {/* <div className="flex h-full"> */}
                <SidebarInset className="flex-1">
                    <header className="flex h-16 shrink-0 items-center gap-2">
                      <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                          <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                              <BreadcrumbLink>
                                User Dashboard
                              </BreadcrumbLink>
                            </BreadcrumbItem>
                          </BreadcrumbList>
                        </Breadcrumb>
                        <div className="ml-auto align-right">
                          <SidebarRightTrigger />
                        </div>
                      </div>
                    </header>
                    <main className="p-4">
                      {children}
                    </main>
                </SidebarInset>
                <SidebarRight userId={userId} />
            {/* </div> */}
        </SidebarProvider>
    )
}