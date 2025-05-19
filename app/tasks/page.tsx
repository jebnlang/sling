"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TasksTable } from "@/components/tasks-table"
import { TaskDialog } from "@/components/task-dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useTasks } from "@/contexts/tasks-context"

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { openTaskDialog, isTaskDialogOpen, closeTaskDialog, addTask, updateTask, currentTask } = useTasks()

  const handleSaveTask = (task: any) => {
    if (currentTask) {
      updateTask(task)
    } else {
      addTask(task)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => openTaskDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search tasks..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
            <CardDescription>Manage and track tasks across all RFPs and companies.</CardDescription>
          </CardHeader>
          <CardContent>
            <TasksTable />
          </CardContent>
        </Card>
      </div>

      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={closeTaskDialog}
        onSave={handleSaveTask}
        initialTask={currentTask}
      />
    </div>
  )
}
