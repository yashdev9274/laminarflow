"use client"

import * as React from "react"
import ChatWrapper from "@/components/chat/chatWrapper"
import { Sidebar,SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { useSidebar } from "./sidebar"
import { cn } from "@/lib/utils"

interface SidebarRightProps {
  userId: string;
  className?: string;
}

export function SidebarRight({ userId, className }: SidebarRightProps) {
  const { isRightCollapsed } = useSidebar();

  if (isRightCollapsed) {
    return null;
  }

  return (
    <div
      className={cn(
        "sticky top-0 h-svh w-80 border-l flex-col lg:flex",
        className
      )}
    >
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <h2 className="text-lg font-semibold p-4">AI Assistant</h2>
      </SidebarHeader>
      <SidebarContent className="p-0 flex-1">
        <ChatWrapper userId={userId} />
      </SidebarContent>
    </div>
  )
}
