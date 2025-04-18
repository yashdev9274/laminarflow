import { ReactNode } from "react";
import { requireUser } from "../utils/requireAuth";
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { Users, Shield, CreditCard, Code, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils";
import BackRedirectButton from "../components/backRedirectButton";
import LogoutComponent from "@/components/dashboard/sidebar/logoutCompnent";


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

interface SettingsLayoutProps {
  children: ReactNode
}

export default async function SettingsLayout({ children }: SettingsLayoutProps){

    const session = await requireUser();
    const data = await getUser(session.user?.id as string)

    return(
      <div className="flex min-h-screen bg-black text-white">
        <div className="w-64 border-r border-neutral-700 p-4">
          <div className="flex items-center gap-2 mb-6 px-2">

            <BackRedirectButton href="/dashboard" text="Back"/>
          </div>
          
          {/* <div className="flex items-center gap-2 mb-6 px-2">
            <div className="h-6 w-6 rounded-full bg-white"></div>
            <span className="font-medium">user</span>
          </div> */}

          <nav className="space-y-6">
            <div className="space-y-1">
              <NavItem href="/settings" active>
                Profile
              </NavItem>
              <NavItem href="/settings">General</NavItem>
              <NavItem href="/settings">Calendars</NavItem>
              <NavItem href="/settings">Conferencing</NavItem>
              <NavItem href="/settings">Appearance</NavItem>
              <NavItem href="/settings">Out of office</NavItem>
              <NavItem href="/settings">Push Notifications</NavItem>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1 text-gray-400">
                {/* <Shield className="h-4 w-4" /> */}
                <LogoutComponent/>
                
              </div>
            </div>

            {/* <div className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1 text-gray-400">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </div>
              <NavItem href="/settings/password" indent>
                Password
              </NavItem>
              <NavItem href="/settings/impersonation" indent>
                Impersonation
              </NavItem>
              <NavItem href="/settings/two-factor-auth" indent>
                Two factor auth
              </NavItem>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1 text-gray-400">
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </div>
              <NavItem href="/settings/manage-billing" indent>
                Manage billing
              </NavItem>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1 text-gray-400">
                <Code className="h-4 w-4" />
                <span>Developer</span>
              </div>
              <NavItem href="/settings/webhooks" indent>
                Webhooks
              </NavItem>
              <NavItem href="/settings/api-keys" indent>
                API keys
              </NavItem>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1 text-gray-400">
                <Users className="h-4 w-4" />
                <span>Teams</span>
              </div>
            </div>

            <button className="flex items-center gap-2 px-2 py-1 text-gray-400 hover:text-white transition-colors">
              <UserPlus className="h-4 w-4" />
              <span>Add a team</span>
            </button> */}
          </nav>
        </div>

      <div className="flex-1">{children}</div>
    </div>
    )
}


interface NavItemProps {
  href: string
  children: ReactNode
  active?: boolean
  indent?: boolean
}

function NavItem({ href, children, active, indent }: NavItemProps) {
  return (
    <a
      href={href}
      className={cn(
        "block px-2 py-1 rounded hover:bg-neutral-800 transition-colors",
        active ? "bg-neutral-800" : "text-gray-400 hover:text-white",
        indent && "ml-4",
      )}
    >
      {children}
    </a>
  )
}
