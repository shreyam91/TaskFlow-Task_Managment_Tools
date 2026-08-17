/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner" // ✅ Correct Sonner import

export function CardWithForm() {
  const [projectName, setProjectName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
      // First, check if project with same name exists
      const checkResponse = await fetch(`${apiUrl}/api/projects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!checkResponse.ok) {
        throw new Error("Failed to check existing projects");
      }

      const existingProjects = await checkResponse.json();
      const projectExists = existingProjects.some(
        (project: { name: string }) => 
          project.name.toLowerCase() === projectName.toLowerCase()
      );

      if (projectExists) {
        toast.error("A project with this name already exists");
        setIsSubmitting(false);
        return;
      }

      // If no duplicate found, create the project
      const response = await fetch(`${apiUrl}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: projectName }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Project created successfully!")
        setProjectName("")
      } else {
        toast.error(data.error || "Something went wrong")
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Network error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
          Create Project
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Initialize a new workspace for your team.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Project Name</Label>
          <Input
            id="name"
            placeholder="e.g. Q4 Marketing Campaign"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="h-12 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-12 text-md rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25"
        >
          {isSubmitting ? "Creating Project..." : "Create Project"}
        </Button>
      </form>
    </div>
  )
}
