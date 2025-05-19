"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Task } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Review RFP requirements",
    description:
      "Go through all the technical requirements in the RFP document and identify any areas that need clarification or might be challenging to implement.",
    context:
      "See the requirements document at https://example.com/docs/rfp-requirements.pdf\nDiscuss with the technical team about feasibility.",
    assigned: "Roy",
    status: "Open",
    urgency: "High",
    rfpId: "1",
    rfpName: "Enterprise Software Implementation",
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    company: "Acme Inc",
    companyId: "1",
    attachments: [
      {
        id: "a1",
        name: "Requirements.pdf",
        url: "#",
        type: "document",
      },
    ],
  },
  {
    id: "2",
    title: "Prepare technical proposal section",
    description:
      "Draft the technical approach section of the proposal, including methodology, tools, and implementation timeline.",
    context: "Use our previous proposal for TechCorp as a reference: https://example.com/proposals/techcorp",
    assigned: "Yonatan",
    status: "Open",
    urgency: "Medium",
    rfpId: "1",
    rfpName: "Enterprise Software Implementation",
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    company: "Acme Inc",
    companyId: "1",
  },
  {
    id: "3",
    title: "Gather past performance examples",
    description:
      "Collect 3-5 relevant past performance examples that demonstrate our capability to deliver similar projects.",
    assigned: "Roy",
    status: "Completed",
    urgency: "Low",
    rfpId: "2",
    rfpName: "Cloud Migration Services",
    dueDate: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    company: "TechCorp",
    companyId: "2",
  },
  {
    id: "4",
    title: "Prepare pricing estimate",
    description:
      "Create a detailed pricing estimate for all components of the project, including labor, materials, and contingency.",
    context: "Coordinate with Finance team to ensure accurate pricing.",
    assigned: "Yonatan",
    status: "Open",
    urgency: "Critical",
    rfpId: "4",
    rfpName: "Data Analytics Platform",
    dueDate: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 day from now
    company: "Innovate Ltd",
    companyId: "4",
  },
  {
    id: "5",
    title: "Final proposal review",
    description:
      "Conduct a comprehensive review of the entire proposal to ensure consistency, quality, and compliance with RFP requirements.",
    assigned: "Roy",
    status: "Open",
    urgency: "High",
    rfpId: "5",
    rfpName: "Mobile App Development",
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    company: "Future Systems",
    companyId: "5",
  },
]

interface TasksContextType {
  tasks: Task[]
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
  toggleTaskStatus: (id: string) => void
  openTaskDialog: (task?: Task) => void
  closeTaskDialog: () => void
  isTaskDialogOpen: boolean
  currentTask?: Task
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined)
  const { toast } = useToast()

  const addTask = (task: Task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }])
    toast({
      title: "Task created",
      description: "Your task has been created successfully.",
    })
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    })
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
    toast({
      title: "Task deleted",
      description: "Your task has been deleted.",
    })
  }

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newStatus = task.status === "Completed" ? "Open" : "Completed"
          return { ...task, status: newStatus }
        }
        return task
      }),
    )
  }

  const openTaskDialog = (task?: Task) => {
    setCurrentTask(task)
    setIsTaskDialogOpen(true)
  }

  const closeTaskDialog = () => {
    setIsTaskDialogOpen(false)
    setCurrentTask(undefined)
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        openTaskDialog,
        closeTaskDialog,
        isTaskDialogOpen,
        currentTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider")
  }
  return context
}
