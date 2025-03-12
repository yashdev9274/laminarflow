"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  Wallet,
  LayoutDashboard,
  ReceiptIndianRupee,
  BadgeIndianRupee,
  BriefcaseBusiness,
  Building2, 
  CircleCheckBig,
  Settings
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavCrm } from "./nav-crm"

const data = {
  user: {
    name: "LaminarFlow",
    email: "LF@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Finance",
      url: "#",
      icon: Wallet,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard 
        },
        {
          title: "Invoices",
          url: "/dashboard/invoices",
          icon: ReceiptIndianRupee 
        },
        {
          title: "Transactions",
          url: "/dashboard",
          icon: BadgeIndianRupee 
        },
      ],
    },
    
  ],

  navCrm: [
    {
      title: "Workspace",
      url: "#",
      icon: BriefcaseBusiness,
      isActive: true,
      items: [
        {
          title: "Companies",
          url: "/dashboard",
          icon: Building2  
        },
        {
          title: "Tasks",
          url: "/dashboard",
          icon: CircleCheckBig  
        },
      ],
    },
    
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/",
      icon: Settings,
    },
    {
      title: "Contact",
      url: "https://dub.sh/yashdew",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">LaminarFlow</span>
                  <span className="truncate text-xs">Organization</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavCrm items={data.navCrm} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
