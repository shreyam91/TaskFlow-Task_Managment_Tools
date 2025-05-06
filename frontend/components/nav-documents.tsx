"use client"

import React, { useEffect, useState } from "react"
import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
} from "@tabler/icons-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { toast } from 'sonner'

// 🔹 Helper to generate a consistent hue based on a string
function hashStringToHue(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash % 360)
}

export function NavDocuments() {
  const { isMobile } = useSidebar()
  const [items, setItems] = useState<
    { id: string; name: string; url: string }[] | null
  >(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 🔸 Fetch project data
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }
        const data = await response.json()
        setItems(data)
      } catch (err) {
        setError("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  async function handleDeleteProject(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this project?")
    if (!confirmed) return
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`,
        {
          method: "DELETE",
        }
      )
  
      if (!response.ok) {
        throw new Error("Failed to delete project")
      }
  
      // Update UI by removing deleted project
      setItems((prev) => prev?.filter((item) => item.id !== id) || null)
      toast.success("Project deleted successfully")
    } catch (error) {
      alert("Error deleting project")
      toast.error("Error deleting project")
      console.error(error)
    }
  }
  

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
  {/* Scrollable list wrapper if more than 3 items */}
  <div className={items && items.length > 3 ? "max-h-48 overflow-y-auto pr-1" : ""}>
    {items?.map((item) => {
      const color = `hsl(${hashStringToHue(item.name)}, 70%, 50%)`
      return (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild>
            <a href={item.url} className="flex items-center gap-2">
              <span
                style={{
                  color,
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  width: "1.25rem",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                #
              </span>
              <span>{item.name}</span>
            </a>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction
                showOnHover
                className="data-[state=open]:bg-accent rounded-sm"
              >
                <IconDots />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-24 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align={isMobile ? "end" : "start"}
            >
              <DropdownMenuItem>
                <IconFolder />
                <span>Open</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconShare3 />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
  variant="destructive"
  onSelect={(e) => {
    e.preventDefault() // Prevent dropdown closing instantly
    handleDeleteProject(item.id)
  }}
>
  <IconTrash />
  <span>Delete</span>
</DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      )
    })}
  </div>

  {/* "More" button only appears if more than 3 items */}
  {items && items.length > 3 && (
    <SidebarMenuItem>
      <SidebarMenuButton className="text-sidebar-foreground/70">
        <IconDots className="text-sidebar-foreground/70" />
        <span>More</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )}
</SidebarMenu>


    </SidebarGroup>
  )
}
