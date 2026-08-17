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
import { toast } from "sonner"


export function TaskForm() {
  const [dueDate, setDueDate] = useState<Date | undefined>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [assignedTo, setAssignedTo] = useState("") // ← previously `reviewedBy`
  const [projectId, setProjectId] = useState("")
  const [status, setStatus] = useState("not-started")
  const [searchQuery, setSearchQuery] = useState("");
  const [nlpText, setNlpText] = useState("");
  const [isParsing, setIsParsing] = useState(false);


  const [projects, setProjects] = useState<Array<{ id: string; name: string }>>([])
  const [users, setUsers] = useState<Array<{ id: string; name: string }>>([]) // <-- state for users

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
        const data = await res.json()
        if (Array.isArray(data)) {
          setProjects(data)
        } else {
          setProjects([])
          console.error("API did not return an array of projects:", data)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        setProjects([])
      }
    }

    fetchProjects()
  }, [])

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        const data = await res.json()
        if (Array.isArray(data)) {
          setUsers(data)
        } else {
          setUsers([])
          console.error("API did not return an array of users:", data)
        }
      } catch (error) {
        console.error("Error fetching users:", error)
        setUsers([])
      }
    }

    fetchUsers()
  }, [])

  const handleParse = async () => {
    if (!nlpText) return;
    setIsParsing(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parse/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: nlpText,
          users,
          projects
        })
      });
      if (!res.ok) throw new Error("Parse request failed");
      const data = await res.json();
      
      if (data.title) setTitle(data.title);
      if (data.description) setDescription(data.description);
      if (data.priority) setPriority(data.priority);
      if (data.status) setStatus(data.status);
      if (data.assignee?.id) setAssignedTo(data.assignee.id);
      if (data.project?.id) setProjectId(data.project.id);
      if (data.dueDate) setDueDate(new Date(data.dueDate)); // Ensure timezone compatibility if needed
      
      toast.success("Task details extracted!");
      if (data.ambiguousFields?.length > 0) {
        toast.warning(`Please review ambiguous fields: ${data.ambiguousFields.join(", ")}`);
      }
      setNlpText(""); // Clear input after successful parse
    } catch (error) {
       console.error("Error parsing text:", error);
       toast.error("Failed to parse text.");
    } finally {
       setIsParsing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    const payload = {
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      project: projectId,
    }
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      })
  
      if (!res.ok) throw new Error("Failed to create task")
  
      const data = await res.json()
      toast.success("Task created successfully!")
  
      // Optional: Reset form
      setTitle("")
      setDescription("")
      setDueDate(undefined)
      setPriority("")
      setAssignedTo("")
      setProjectId("")
      setStatus("not-started")
    } catch (err) {
      console.error("Error creating task:", err)
      toast.error("Failed to create task. Please try again.")
    }
  }
  

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
          Create Task
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Assign new work to your team.
        </p>
      </div>

      {/* NLP Magic Parse Input */}
      <div className="mb-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
         <Label htmlFor="nlp" className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-2 mb-2">
           ✨ Magic Parse
         </Label>
         <div className="flex gap-2">
           <Input 
             id="nlp"
             placeholder="e.g. Frontend task will be done by tomorrow before 10 PM and assigned to Ram..."
             value={nlpText}
             onChange={(e) => setNlpText(e.target.value)}
             className="bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800 h-11"
             onKeyDown={(e) => {
               if (e.key === 'Enter') {
                 e.preventDefault();
                 handleParse();
               }
             }}
           />
           <Button type="button" onClick={handleParse} disabled={isParsing} className="h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md">
             {isParsing ? "Parsing..." : "Extract"}
           </Button>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Title & Description */}
        <div className="flex flex-col space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-sm font-medium">Task Title</Label>
            <Input
              id="title"
              placeholder="e.g. Design Landing Page"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1.5 flex flex-col flex-1">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide task details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 min-h-[200px] resize-none bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Column: Details & Submit */}
        <div className="space-y-5">

        {/* Row for Priority and Project */}
        <div className="grid grid-cols-2 gap-4">
          {/* Priority */}
          <div className="space-y-1.5">
            <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800 shadow-xl">
                <SelectItem value="low" className="rounded-lg">Low</SelectItem>
                <SelectItem value="medium" className="rounded-lg">Medium</SelectItem>
                <SelectItem value="high" className="rounded-lg">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project */}
          <div className="space-y-1.5">
            <Label htmlFor="project" className="text-sm font-medium">Project</Label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger className="h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800 shadow-xl">
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id} className="rounded-lg">
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row for Assignee and Status */}
        <div className="grid grid-cols-2 gap-4">
          {/* Assignee */}
          <div className="space-y-1.5">
            <Label htmlFor="assignee" className="text-sm font-medium">Assigned to</Label>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger className="h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all">
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="p-2">
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-2 h-9 rounded-lg"
                  />
                </div>
                {users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                  <div className="px-3 py-2 text-sm text-slate-500">No user found</div>
                ) : (
                  users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())).map((user) => (
                    <SelectItem key={user.id} value={user.id} className="rounded-lg">
                      {user.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label htmlFor="status" className="text-sm font-medium">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all">
                <SelectValue placeholder="Select status" defaultValue="not-started" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800 shadow-xl">
                <SelectItem value="not-started" className="rounded-lg">Not Started</SelectItem>
                <SelectItem value="in-progress" className="rounded-lg">In Progress</SelectItem>
                <SelectItem value="completed" className="rounded-lg">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Due Date */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full text-left h-11 px-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-sm focus:ring-2 focus:ring-indigo-500 transition-all flex items-center"
              >
                {dueDate ? format(dueDate, "PPP") : <span className="text-slate-400">Pick a date</span>}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-2xl border-slate-200 dark:border-slate-800 shadow-xl">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
                className="rounded-xl"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button type="submit" className="w-full h-12 text-md rounded-xl bg-gradient-to-r from-emerald-400 to-teal-600 hover:from-emerald-500 hover:to-teal-700 text-white font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/25">
            Submit Task
          </Button>
        </div>
        </div>
      </form>
    </div>
  )
}
