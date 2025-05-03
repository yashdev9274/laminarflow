'use client'


import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CircleHelp,
  CreditCard,
  Home,
  LogOut,
  MailOpenIcon,
  Settings,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { toast } from "sonner";
import Link from "next/link"
import { requireUser } from "@/app/utils/requireAuth"
import { prisma } from "@/app/utils/db"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { BPUDialogButton } from "../billPlanUpgrade"


// async function getUser(userId: string){
  
//   const data = await prisma.user.findUnique({

//     where:{
//       id: userId,
//     },
//     select:{
//       firstName: true,
//       lastName: true,
//       address: true,
//     }
//   })

//   if(!data?.firstName || !data.lastName || !data.address){
//     redirect('/onboarding');
//   }
// }

export function NavUser() {
  const { isMobile } = useSidebar()

  const {data: session, status}  = useSession();
  
  // const session = await requireUser();
  // const data = await getUser(session.user?.id as string)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                <AvatarFallback className="rounded-lg">
                {session?.user?.name?.charAt(0) ||
                  session?.user?.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{session?.user?.name || ""}</span>
                <span className="truncate text-xs">{session?.user?.email || ""}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                  <AvatarFallback className="rounded-lg">
                  {session?.user?.name?.charAt(0) ||
                  session?.user?.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{session?.user?.name || ""}</span>
                  <span className="truncate text-xs">{session?.user?.email || ""}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                {/* <Link href="/"> */}
                  <BPUDialogButton/>
                {/* </Link> */}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/">
                  <Home />
                  Home
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                {/* <div className="flex items-center gap-2"> */}
                  <Link href="/dashboard/account">
                    <Settings/>
                    User Settings
                  </Link>
                {/* </div> */}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText("yashdev.yvd@gmail.com");
                  toast.success("yashdev.yvd@gmail.com copied to clipboard");
                }}
              >
                <MailOpenIcon/>
                Contact Us
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
