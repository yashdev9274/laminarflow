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
  Settings,
  Search
} from "lucide-react"

import { NavMain } from "@/components/dashboard/sidebar/nav-main"
import { NavProjects } from "@/components/dashboard/sidebar/nav-projects"
import { NavSecondary } from "@/components/dashboard/sidebar/nav-secondary"
import { NavUser } from "@/components/dashboard/sidebar/nav-user"
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
import NavCommand  from "./nav-command"
import Image from "next/image"

const data = {
  user: {
    name: "LaminarFlow",
    email: "LF@gmail.com",
    avatar: "/LF-logo.png",
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
          url: "/dashboard/transactions",
          icon: BadgeIndianRupee 
        },
        {
          title: "Travel",
          url: "/dashboard",
          icon: Map 
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
          url: "/dashboard/companies",
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
      url: "/settings",
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
                <div >
                  {/* <Command className="size-4" /> */}
                  <Image 
                    src="/LF-logo.png" 
                    alt="LaminarFlow logo" 
                    width={32} 
                    height={32} 
                    priority
                  />
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
        {/* <NavCommand/> */}
        <NavMain items={data.navMain} />
        <NavCrm items={data.navCrm} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
