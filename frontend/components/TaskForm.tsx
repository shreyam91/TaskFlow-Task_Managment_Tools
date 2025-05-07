"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"

export function TaskForm() {
  const [dueDate, setDueDate] = useState<Date | undefined>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [assignedTo, setAssignedTo] = useState("") // ← previously `reviewedBy`
  const [projectId, setProjectId] = useState("")
  const [status, setStatus] = useState("not-started")
  const [searchQuery, setSearchQuery] = useState("");


  const [projects, setProjects] = useState<Array<{ id: string; name: string }>>([])
  const [users, setUsers] = useState<Array<{ id: string; name: string }>>([]) // <-- state for users

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/projects/`) // Replace with your actual backend URL
        const data = await res.json()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      }
    }

    fetchProjects()
  }, [])

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
           // Replace with your actual backend URL
        const data = await res.json()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      title,
      description,
      dueDate,
      priority,
      status: "not-started", // optional
      assignedTo,
      project: projectId,
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // or however you store auth
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to create task")

      const data = await res.json()
      console.log("Task created:", data)
    } catch (err) {
      console.error("Error creating task:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Add Task</h2>

      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Row for Priority and Project */}
      <div className="flex gap-4">
        {/* Priority */}
        <div className="flex-1 space-y-1">
          <Label htmlFor="priority">Priority</Label>
          <Select onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Project */}
        <div className="flex-1 space-y-1">
          <Label htmlFor="project">Project</Label>
          <Select onValueChange={setProjectId}>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Due Date */}
      <div className="space-y-1">
        <Label>Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-full text-left border rounded px-3 py-2 text-sm"
            >
              {dueDate ? format(dueDate, "PPP") : <span className="text-muted-foreground">Pick a date</span>}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Row for Assignee and Status */}
      <div className="flex gap-4">
        {/* Assignee */}
        <div className="flex-1 space-y-1">
          <Label htmlFor="assignee">Assigned to</Label>
          <Select onValueChange={setAssignedTo}>
            <SelectTrigger>
              <SelectValue placeholder="Select assignee" />
            </SelectTrigger>
            {/* <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent> */}

<SelectContent>
  <div className="p-2">
    <Input
      placeholder="Search users..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="mb-2"
    />
  </div>
  {users
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((user) => (
      <SelectItem key={user.id} value={user.id}>
        {user.name}
      </SelectItem>
    ))}
</SelectContent>

          </Select>
        </div>

        {/* Status */}
        <div className="flex-1 space-y-1">
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" defaultValue="not-started" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button type="submit" className="w-full">
          Submit Task
        </Button>
      </div>
    </form>
  )
}
