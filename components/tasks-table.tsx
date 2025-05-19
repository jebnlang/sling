"use client"

import { useState } from "react"
import { CheckCircle2, Circle, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTasks } from "@/contexts/tasks-context"
import { TaskDetailView } from "./task-detail-view"

export function TasksTable() {
  const { tasks, toggleTaskStatus, openTaskDialog, deleteTask } = useTasks()
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

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
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]"></TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Urgency</TableHead>
            <TableHead>Related RFP</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
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
              <TableCell onClick={(e) => e.stopPropagation()}>
                {task.rfpId ? (
                  <Link href={`/solicitations/${task.rfpId}`} className="hover:underline">
                    {task.rfpName}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">None</span>
                )}
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
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openTaskDialog(task)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteTask(task.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TaskDetailView taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} />
    </>
  )
}
