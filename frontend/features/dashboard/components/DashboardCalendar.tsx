"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react"
import { format, isSameDay } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  priority: string
  status: string
  dueDate: string | null
}

export function DashboardCalendar() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (res.ok) {
          const data = await res.json()
          setTasks(data)
        }
      } catch (error) {
        console.error("Error fetching tasks for calendar:", error)
      }
    }
    fetchTasks()
  }, [])

  // Filter tasks for the selected date
  const tasksForSelectedDate = tasks.filter(task => {
    if (!task.dueDate) return false
    return selectedDate && isSameDay(new Date(task.dueDate), selectedDate)
  })

  // Modifiers for dates that have tasks
  const daysWithTasks = tasks
    .filter(task => task.dueDate)
    .map(task => new Date(task.dueDate!))

  const modifiers = {
    hasTask: daysWithTasks
  }

  const modifiersStyles = {
    hasTask: {
      fontWeight: 'bold',
    }
  }

  // Get priority color for tasks
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-600 border-red-200 dark:border-red-900"
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-900"
      default: return "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900"
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-center p-2">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="rounded-md border-0 bg-transparent shadow-none"
          components={{
            DayContent: (props) => {
              const { date } = props
              const dateTasks = tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), date))
              const hasHighPriority = dateTasks.some(t => t.priority === "high")
              const hasMediumPriority = dateTasks.some(t => t.priority === "medium")
              
              let dotColor = "bg-blue-500"
              if (hasHighPriority) dotColor = "bg-red-500"
              else if (hasMediumPriority) dotColor = "bg-yellow-500"

              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  <span>{format(date, "d")}</span>
                  {dateTasks.length > 0 && (
                    <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${dotColor}`} />
                  )}
                </div>
              )
            }
          }}
        />
      </div>

      {/* Task List for selected day */}
      <div className="mt-4 px-4 pb-4 flex-1 overflow-y-auto">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            Tasks for {selectedDate ? format(selectedDate, "MMM d") : "None"}
            {tasksForSelectedDate.length > 0 && (
              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs py-0.5 px-2 rounded-full">
                {tasksForSelectedDate.length}
              </span>
            )}
          </h4>
          
          {tasksForSelectedDate.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 italic text-center py-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              No tasks pending for this day.
            </p>
          ) : (
            <div className="space-y-2">
              {tasksForSelectedDate.map(task => (
                <div key={task.id} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-tight">
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={`text-[10px] px-1.5 h-5 ${getPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </Badge>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize bg-slate-200/50 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
