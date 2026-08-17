"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { 
  IconSearch, 
  IconBell, 
  IconLogout, 
  IconUserCircle,
  IconSettings
} from "@tabler/icons-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const [isMac, setIsMac] = useState(false)
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    avatar: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
    
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/users/user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const getInitials = (firstname: string, lastname: string) => {
    const first = firstname?.charAt(0).toUpperCase() || ''
    const last = lastname?.charAt(0).toUpperCase() || ''
    return `${first}${last}` || 'CN'
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) bg-white dark:bg-slate-950">
      <div className="flex w-full items-center gap-4 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        
        {/* Search */}
        <div className="flex-1 flex justify-center sm:justify-start max-w-xl">
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground bg-slate-50 dark:bg-slate-900/50 shadow-none border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-lg px-4 transition-all"
            onClick={() => window.dispatchEvent(new Event("open-spotlight"))}
          >
            <IconSearch className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline-flex">Search workspace...</span>
            <span className="inline-flex sm:hidden">Search</span>
            <kbd className="pointer-events-none absolute right-3 hidden h-5 select-none items-center gap-1 rounded bg-slate-200 dark:bg-slate-800 px-1.5 font-mono text-[10px] font-medium sm:flex">
              <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>K
            </kbd>
          </Button>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-slate-100" asChild>
            <Link href="/dashboard/notifications">
              <IconBell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center outline-none">
                {loading ? (
                  <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                ) : (
                  <Avatar className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-800 hover:ring-2 hover:ring-indigo-500/20 transition-all cursor-pointer">
                    <AvatarImage alt={user.username} />
                    <AvatarFallback className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 font-medium text-xs">
                      {getInitials(user.firstname, user.lastname)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-slate-200 dark:border-slate-800">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.firstname} {user.lastname}</p>
                  <p className="text-xs leading-none text-slate-500">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/account" className="cursor-pointer">
                    <IconUserCircle className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <IconSettings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer">
                <IconLogout className="w-4 h-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
