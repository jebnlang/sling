"use client"

import { Building, FileText, Home, ListTodo, CheckSquare, FileEdit, User, ThumbsUp, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { GoogleAuthDialog } from "./google-auth-dialog"
import { useTasks } from "@/contexts/tasks-context"

export function AppSidebar() {
  const pathname = usePathname()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const { openTaskDialog } = useTasks()

  const navigation = [
    {
      title: "Home",
      icon: Home,
      href: "/",
    },
  ]

  const companySection = [
    {
      title: "Companies",
      icon: Building,
      href: "/companies",
    },
  ]

  const solicitationSection = [
    {
      title: "Solicitations",
      icon: FileText,
      href: "/solicitations",
    },
  ]

  const rfpManagementSection = [
    {
      title: "Matches",
      icon: ThumbsUp,
      href: "/matches",
    },
    {
      title: "Qualifications",
      icon: CheckSquare,
      href: "/qualifications",
    },
    {
      title: "Proposals",
      icon: FileEdit,
      href: "/proposals",
    },
  ]

  const tasksSection = [
    {
      title: "Tasks",
      icon: ListTodo,
      href: "/tasks",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center p-4">
          <h1 className="text-xl font-bold">Sling</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href} className="relative">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badge && <Badge className="absolute right-2 top-1/2 -translate-y-1/2">{item.badge}</Badge>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* RFP Management Section */}
        <div className="px-4 pt-4">
          <h2 className="mb-2 text-xs font-semibold text-muted-foreground">RFP Management</h2>
        </div>
        <SidebarMenu>
          {rfpManagementSection.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href} className="relative">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badge && <Badge className="absolute right-2 top-1/2 -translate-y-1/2">{item.badge}</Badge>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Tasks Section */}
        <div className="px-4 pt-4">
          <h2 className="mb-2 text-xs font-semibold text-muted-foreground">Tasks</h2>
        </div>
        <SidebarMenu>
          {tasksSection.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href} className="relative">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badge && <Badge className="absolute right-2 top-1/2 -translate-y-1/2">{item.badge}</Badge>}
                </Link>
              </SidebarMenuButton>
              <SidebarMenuAction onClick={() => openTaskDialog()} showOnHover tooltip="Create Task">
                <Plus className="h-4 w-4" />
              </SidebarMenuAction>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Companies Section */}
        <div className="px-4 pt-4">
          <h2 className="mb-2 text-xs font-semibold text-muted-foreground">Companies</h2>
        </div>
        <SidebarMenu>
          {companySection.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href} className="relative">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badge && <Badge className="absolute right-2 top-1/2 -translate-y-1/2">{item.badge}</Badge>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Solicitations Section */}
        <div className="px-4 pt-4">
          <h2 className="mb-2 text-xs font-semibold text-muted-foreground">Solicitations</h2>
        </div>
        <SidebarMenu>
          {solicitationSection.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href} className="relative">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badge && <Badge className="absolute right-2 top-1/2 -translate-y-1/2">{item.badge}</Badge>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Account Section at the bottom */}
      <div className="mt-auto border-t">
        <div className="px-4 pt-4">
          <h2 className="mb-2 text-xs font-semibold text-muted-foreground">Account</h2>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Account" onClick={() => setAuthDialogOpen(true)}>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>Account</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      <SidebarFooter className="border-t p-4">
        <div className="text-xs text-muted-foreground">Sling RFP Management v1.0</div>
      </SidebarFooter>
      <SidebarRail />

      <GoogleAuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </Sidebar>
  )
}
