"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import Select from "react-select"

interface Project {
  id: string
  name: string
}

interface User {
  id: string
  name: string
}

interface SelectOption {
  value: string
  label: string
}

export function TeamForm() {
  const [teamName, setTeamName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedProject, setSelectedProject] = useState<SelectOption | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState<SelectOption[]>([])
  const [users, setUsers] = useState<SelectOption[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, usersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ])
        const [projectsData, usersData] = await Promise.all([
          projectsRes.json(),
          usersRes.json(),
        ])
        setProjects(Array.isArray(projectsData) ? projectsData.map((project: Project) => ({ 
          value: project.id, 
          label: project.name 
        })) : [])
        setUsers(Array.isArray(usersData) ? usersData.map((user: User) => ({ 
          value: user.id, 
          label: user.name 
        })) : [])
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load projects or users")
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // optional, add if needed
      },
      body: JSON.stringify({
        name: teamName, // ✅ correct field
        description,
        project: selectedProject?.value,
        users: selectedUsers.map((user) => user.value),
      }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Team created successfully!");
      setTeamName("");
      setDescription("");
      setSelectedProject(null);
      setSelectedUsers([]);
    } else {
      console.error("Server error:", result);
      toast.error(result.error || "Failed to create team");
    }
  } catch (error) {
    console.error("Error creating team:", error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
          Create Team
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Invite members and build your project team.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="teamName" className="text-sm font-medium">Team Name</Label>
            <Input
              id="teamName"
              placeholder="e.g. Frontend Engineering"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1.5 flex flex-col flex-1">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              placeholder="What is this team responsible for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 min-h-[200px] resize-none bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5 flex flex-col">

        <div className="space-y-1.5">
          <Label htmlFor="project" className="text-sm font-medium">Associated Project</Label>
          <Select
            id="project"
            value={selectedProject}
            onChange={setSelectedProject}
            options={projects}
            placeholder="Search and select a project"
            isSearchable
            className="mt-1 react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: '44px',
                borderRadius: '0.75rem',
                backgroundColor: 'transparent',
                borderColor: 'var(--border)',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: 'var(--border)'
                }
              })
            }}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="users" className="text-sm font-medium">Team Members</Label>
          <Select
            id="users"
            value={selectedUsers}
            onChange={(newValue) => setSelectedUsers(newValue as SelectOption[])}
            options={users}
            isMulti
            isSearchable
            placeholder="Search and select users"
            className="mt-1 react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: '44px',
                borderRadius: '0.75rem',
                backgroundColor: 'transparent',
                borderColor: 'var(--border)',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: 'var(--border)'
                }
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: 'var(--accent)',
                borderRadius: '0.5rem',
              })
            }}
          />
        </div>

        <div className="pt-2 mt-auto">
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 text-md rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/25"
          >
            {loading ? "Creating Team..." : "Create Team"}
          </Button>
        </div>
        </div>
      </form>
    </div>
  )
}
