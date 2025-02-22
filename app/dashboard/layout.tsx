import { ReactNode } from "react";
import { requireUser } from "../utils/requireAuth";
import { AppSidebar } from "@/components/app-sidebar";
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";

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
    const data = await getUser(session.user?.id as string)

    return(
        <>
            <SidebarProvider> 
                <AppSidebar/>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2">
                      <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                          <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                              <BreadcrumbLink href="/dashboard">
                                Manage your Invoices
                              </BreadcrumbLink>
                            </BreadcrumbItem>
                          </BreadcrumbList>
                        </Breadcrumb>
                      </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                      </div>
                      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                    </div>
                    <main>
                      {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}