"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
  IconActivity,
  IconBrandGithub,
  IconChartBar,
  IconChecklist,
  IconChevronDown,
  IconCompass,
  IconDashboard,
  IconMessageCircle,
  IconSettings,
  IconUser,
  IconUsers,
  IconFolder,
  IconUserPlus,
} from "@tabler/icons-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { WorkspaceSwitcher } from "./workspace-switcher"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const params = useParams();
  const router = useRouter();
  
  // Extract workspace ID from URL if present (e.g., /dashboard/workspace/[id])
  const workspaceId = params?.id as string | undefined;

  const navigation = {
    main: [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    ],
    projectManagement: [
      { title: "My Projects", url: "/dashboard/owner", icon: IconFolder },
      { title: "Project Requests", url: "/dashboard/owner/requests", icon: IconUserPlus },
    ],
    workspace: [
      { title: "Overview", url: workspaceId ? `/dashboard/workspace/${workspaceId}` : "#", icon: IconDashboard },
      { title: "Tasks", url: workspaceId ? `/dashboard/workspace/${workspaceId}/tasks` : "#", icon: IconChecklist },
      { title: "Team", url: workspaceId ? `/dashboard/workspace/${workspaceId}/team` : "#", icon: IconUsers },
      { title: "GitHub", url: workspaceId ? `/dashboard/workspace/${workspaceId}/github` : "#", icon: IconBrandGithub },
      { title: "Analytics", url: workspaceId ? `/dashboard/workspace/${workspaceId}/analytics` : "#", icon: IconChartBar },
      { title: "Activity", url: workspaceId ? `/dashboard/workspace/${workspaceId}/activity` : "#", icon: IconActivity },
    ],
    discover: [
      { title: "Discover Projects", url: "/dashboard/projects", icon: IconCompass },
    ],
    communication: [
      { title: "Messages", url: "/dashboard/messages", icon: IconMessageCircle },
    ],
  }

  const handleWorkspaceSwitch = (id: string) => {
    router.push(`/dashboard/workspace/${id}`);
  }

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <SidebarHeader className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-4">
        {/* Brand */}
        <div className="flex items-center gap-2 px-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <span className="font-bold text-lg">D</span>
          </div>
          <span className="font-bold text-lg tracking-tight truncate">DevDesk</span>
        </div>

        {/* Workspace Selector */}
        <WorkspaceSwitcher workspaceId={workspaceId} />
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 space-y-6">
        
        {/* MAIN */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4 text-slate-500" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* PROJECT MANAGEMENT */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Project Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.projectManagement.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4 text-slate-500" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* WORKSPACE - Only visible if a workspace is selected */}
        {workspaceId && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.workspace.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4 text-slate-500" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* DISCOVER */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Discover</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.discover.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4 text-slate-500" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* COMMUNICATION */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Communication</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.communication.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4 text-slate-500" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200 dark:border-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/dashboard/settings">
                <IconSettings className="w-4 h-4 text-slate-500" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="User Profile">
              <Link href="/dashboard/account">
                <IconUser className="w-4 h-4 text-slate-500" />
                <span>User Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
