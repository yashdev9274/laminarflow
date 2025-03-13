"use client"

import * as React from "react"
import { Search, type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
   Calculator,
   Calendar,
   CreditCard,
   Settings,
   Smile,
   User,
 } from "lucide-react"
  
 import {
   Command,
   CommandDialog,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
   CommandShortcut,
 } from "@/components/ui/command"

   

export function NavCommand() {

   const [open, setOpen] = React.useState(false)
  
   React.useEffect(() => {
     const down = (e: KeyboardEvent) => {
       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
         e.preventDefault()
         setOpen((open) => !open)
       }
     }
     document.addEventListener("keydown", down)
     return () => document.removeEventListener("keydown", down)
   }, [])

   return (
      <SidebarGroup >
      <SidebarGroupContent>
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="sm">
                  <span>
                     <Search/> Search
                  </span>
                  <CommandDialog open={open} onOpenChange={setOpen}>
                     <CommandInput placeholder="Type a command or search..." />
                     <CommandList>
                     <CommandEmpty>No results found.</CommandEmpty>
                     <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                     </CommandGroup>
                     </CommandList>
                  </CommandDialog>
              </SidebarMenuButton>
            </SidebarMenuItem>
         
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
)
}
