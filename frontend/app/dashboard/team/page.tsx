"use client"

import { useEffect, useState } from "react"
import { IconUsers, IconUserPlus, IconMail, IconDotsVertical, IconLoader2, IconBriefcase } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

interface TeamUser {
  name: string
  email: string
}

interface Team {
  id: string
  name: string
  description?: string
  project?: { name: string }
  users: TeamUser[]
}

// Helper to generate a consistent hue based on a string
function hashStringToHue(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash % 360)
}

function getInitials(name: string) {
  if (!name) return "U"
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
}

export default function TeamPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setLoading(false)
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error("Failed to fetch")
        
        const data = await response.json()
        setTeams(Array.isArray(data) ? data : [])
      } catch (err) {
        toast.error("Failed to load teams")
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 relative min-h-[calc(100vh-4rem)]">
      {/* Decorative blurred blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="flex items-center justify-between space-y-2 relative z-10 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Team</h2>
          <p className="text-muted-foreground mt-1">Manage your teams and members.</p>
        </div>
        <Button className="rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95">
          <IconUserPlus className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>

      <div className="relative z-10 space-y-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <IconLoader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : teams.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl rounded-3xl p-6 text-center">
            <IconUsers className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No teams found</h3>
            <p className="text-muted-foreground mt-2 max-w-sm">Create a team to start collaborating with others.</p>
            <Button className="mt-6 rounded-xl hover:-translate-y-0.5 active:scale-95 transition-all">
              <IconUserPlus className="mr-2 h-4 w-4" /> Create Team
            </Button>
          </div>
        ) : (
          teams.map((team) => {
            const color = `hsl(${hashStringToHue(team.name)}, 70%, 50%)`
            
            return (
              <div key={team.id} className="bg-card/60 backdrop-blur-xl border border-border/50 shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 border-b border-border/50 relative overflow-hidden flex justify-between items-center">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundColor: color }} />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-background/80 shadow-sm backdrop-blur-sm">
                      <IconUsers style={{ color }} size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{team.name}</h3>
                      {team.description && <p className="text-sm text-muted-foreground">{team.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {team.project && (
                      <div className="relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border border-border/50 text-sm font-medium">
                        <IconBriefcase size={16} className="text-muted-foreground" />
                        {team.project.name}
                      </div>
                    )}
                    <Button variant="ghost" size="icon" className="relative z-10 rounded-full h-8 w-8">
                      <IconDotsVertical size={16} className="text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  {team.users.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground text-sm">No members in this team yet.</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {team.users.map((user, idx) => {
                        const userColorHue = hashStringToHue(user.name)
                        return (
                          <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-background/30 hover:bg-secondary/50 transition-colors border border-transparent hover:border-border/50 cursor-pointer">
                            <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                              <AvatarImage alt={user.name} />
                              <AvatarFallback style={{ backgroundColor: `hsl(${userColorHue}, 70%, 90%)`, color: `hsl(${userColorHue}, 70%, 30%)`}}>
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                              <h4 className="text-sm font-medium truncate">{user.name}</h4>
                              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-50 hover:opacity-100">
                              <IconMail size={16} />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
