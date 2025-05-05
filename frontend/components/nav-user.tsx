// "use client"

// import {
//   IconCreditCard,
//   IconDotsVertical,
//   IconLogout,
//   IconNotification,
//   IconUserCircle,
// } from "@tabler/icons-react"

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar"

// export function NavUser({
//   user,
// }: {
//   user: {
//     name: string
//     email: string
//     avatar: string
//   }
// }) {
//   const { isMobile } = useSidebar()

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <SidebarMenuButton
//               size="lg"
//               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//             >
//               <Avatar className="h-8 w-8 rounded-lg grayscale">
//                 <AvatarImage src={user.avatar} alt={user.name} />
//                 <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//               </Avatar>
//               <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="truncate font-medium">{user.name}</span>
//                 <span className="text-muted-foreground truncate text-xs">
//                   {user.email}
//                 </span>
//               </div>
//               <IconDotsVertical className="ml-auto size-4" />
//             </SidebarMenuButton>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
//             side={isMobile ? "bottom" : "right"}
//             align="end"
//             sideOffset={4}
//           >
//             <DropdownMenuLabel className="p-0 font-normal">
//               <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                 <Avatar className="h-8 w-8 rounded-lg">
//                   {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
//                   <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//                   <AvatarFallback className="rounded-lg">CN</AvatarFallback>
//                 </Avatar>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <span className="truncate font-medium">{user.name}</span>
//                   <span className="text-muted-foreground truncate text-xs">
//                     {user.email}
//                   </span>
//                 </div>
//               </div>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem>
//                 <IconUserCircle />
//                 Account
//               </DropdownMenuItem>
//               {/* <DropdownMenuItem>
//                 <IconCreditCard />
//                 Billing
//               </DropdownMenuItem> */}
//               <DropdownMenuItem>
//                 <IconNotification />
//                 Notifications
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>
//               <IconLogout />
//               Log out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

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

// The NavUser component, where user data is passed
export function NavUser() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
  })
  const { isMobile } = useSidebar()

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Make sure you send the token if needed
          },
        })
        const data = await response.json()
        
        if (response.ok) {
          setUser(data) // Assuming the backend sends the user object with name, email, and avatar
        } else {
          console.error('Failed to fetch user data:', data.msg)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar || 'https://i.pravatar.cc/150'} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar || 'https://i.pravatar.cc/150'} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

