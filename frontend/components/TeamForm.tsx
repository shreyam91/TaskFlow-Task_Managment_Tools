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
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ])
        const [projectsData, usersData] = await Promise.all([
          projectsRes.json(),
          usersRes.json(),
        ])
        setProjects(projectsData.map((project: Project) => ({ 
          value: project.id, 
          label: project.name 
        })))
        setUsers(usersData.map((user: User) => ({ 
          value: user.id, 
          label: user.name 
        })))
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="teamName">Team Name</Label>
        <Input
          id="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="project">Project</Label>
        <Select
          id="project"
          value={selectedProject}
          onChange={setSelectedProject}
          options={projects}
          placeholder="Select a project"
        />
      </div>

      <div>
        <Label htmlFor="users">Users</Label>
        <Select
          id="users"
          value={selectedUsers}
          onChange={(newValue) => setSelectedUsers(newValue as SelectOption[])}
          options={users}
          isMulti
          placeholder="Select users"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  )
}
