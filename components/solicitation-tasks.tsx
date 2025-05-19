"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Circle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/contexts/tasks-context"
import { format } from "date-fns"
import { TaskDetailView } from "./task-detail-view"

interface SolicitationTasksProps {
  solicitationId: string
}

export function SolicitationTasks({ solicitationId }: SolicitationTasksProps) {
  const { tasks, toggleTaskStatus, openTaskDialog } = useTasks()
  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  // Filter tasks related to this solicitation
  useEffect(() => {
    setFilteredTasks(tasks.filter((task) => task.rfpId === solicitationId))
  }, [tasks, solicitationId])

  // Function to get urgency badge variant
  const getUrgencyVariant = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Tasks associated with this solicitation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Task List</h3>
          <Button
            onClick={() =>
              openTaskDialog({
                id: "",
                title: "",
                description: "",
                assigned: "",
                status: "Open",
                urgency: "Medium",
                rfpId: solicitationId,
                rfpName: "", // This will be filled by the dialog
                dueDate: new Date().toISOString(),
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TableRow
                  key={task.id}
                  className={`${task.status === "Completed" ? "opacity-60" : ""} cursor-pointer hover:bg-muted/50`}
                  onClick={() => setSelectedTaskId(task.id)}
                >
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleTaskStatus(task.id)
                    }}
                  >
                    <div
                      className="cursor-pointer"
                      role="checkbox"
                      aria-checked={task.status === "Completed"}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          toggleTaskStatus(task.id)
                        }
                      }}
                    >
                      {task.status === "Completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`font-medium ${task.status === "Completed" ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title || task.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{task.assigned}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getUrgencyVariant(task.urgency)}>{task.urgency}</Badge>
                  </TableCell>
                  <TableCell>
                    {task.dueDate ? (
                      <span
                        className={
                          new Date(task.dueDate) < new Date() && task.status !== "Completed"
                            ? "text-destructive font-medium"
                            : ""
                        }
                      >
                        {format(new Date(task.dueDate), "MMM d, yyyy")}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">No date</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No tasks found for this solicitation. Add a task to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TaskDetailView taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} />
      </CardContent>
    </Card>
  )
}
