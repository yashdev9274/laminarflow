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
  Search,
  MessageCircle,
  FileTextIcon,
  Archive
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { NavAgents } from "./nav-agent"
import { WalletIcon } from "@/components/icons/walletIcon"
import { NavLocker } from "./nav-locker"
// import { NavAgent } from "./nav-agent"

const data = {
  user: {
    name: "LaminarFlow",
    email: "LF@gmail.com",
    avatar: "/LF-logo.png",
  },
  navMain: [
    {
      title: "Finance",
      url: "/dashboard",
      icon: WalletIcon,
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
      url: "/dashboard/companies",
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

  navAgents: [
    {
      title: "Automation",
      url: "/dashboard/agents/invoice",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "InvoiceAgent",
          url: "/dashboard/agents/invoice",
          icon: FileTextIcon  
        },
        {
          title: "TransactionAgent",
          url: "",
          icon: BadgeIndianRupee
        },
      ],
    },
    
  ],

  navLocker: [
    {
      title: "Safe",
      url: "/dashboard/safe",
      icon: Archive,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings/profile",
      icon: Settings,
    },
    {
      title: "Feedback",
      url: "https://dub.sh/yashdew",
      icon: MessageCircle,
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

export function AppSidebar({ ...props }:  &React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" className="sticky sidebar"  {...props}>
      <SidebarHeader className="mt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a  className="flex gap-3">
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
                      <span className="truncate text-xs">Open-source Fintech</span>
                    </div>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent className="w-[320px] rounded ">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h2 className="font-semibold">
                        Welcome to LaminarFlow
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        LaminarFlow is a modern, powerful, and affordable platform to manage your business's financial workflow
                      </p>
                    </div>
                    {/* <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <span>8 min read</span>
                      <span>·</span>
                      <span>Updated 2 days ago</span>
                    </div> */}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        {/* <NavCommand/> */}
        <NavMain items={data.navMain} />
        <NavCrm items={data.navCrm} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavAgents items={data.navAgents} />
        <NavLocker items={data.navLocker} />
        <NavSecondary items={data.navSecondary} className="mt-auto mb-5" />
      </SidebarContent>
      <SidebarFooter className="mb-5">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
