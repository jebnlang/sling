"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { CalendarIcon, Check, Link2, Paperclip, Pencil, User, X } from "lucide-react"
import { useTasks } from "@/contexts/tasks-context"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Sample data for dropdowns - in a real app, these would come from API/context
const teamMembers = ["Roy", "Yonatan", "Sarah", "Michael"]
const urgencyLevels = ["Low", "Medium", "High", "Critical"]
const rfps = [
  { id: "1", name: "Enterprise Software Implementation" },
  { id: "2", name: "Cloud Migration Services" },
  { id: "3", name: "Data Analytics Platform" },
  { id: "4", name: "Mobile App Development" },
  { id: "5", name: "Network Infrastructure Upgrade" },
]

interface TaskDetailViewProps {
  taskId: string | null
  onClose: () => void
}

export function TaskDetailView({ taskId, onClose }: TaskDetailViewProps) {
  const { tasks, updateTask } = useTasks()
  const [task, setTask] = useState<any>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<any>("")

  useEffect(() => {
    if (taskId) {
      const foundTask = tasks.find((t) => t.id === taskId)
      setTask(foundTask || null)
    } else {
      setTask(null)
    }
    setEditingField(null)
  }, [taskId, tasks])

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

  // Function to convert URLs in text to clickable links
  const linkifyText = (text: string) => {
    if (!text) return ""

    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${url}</a>`
    })
  }

  const startEditing = (field: string, value: any) => {
    setEditingField(field)
    setEditValue(value)
  }

  const cancelEditing = () => {
    setEditingField(null)
  }

  const saveEditing = () => {
    if (!task || !editingField) return

    const updatedTask = { ...task, [editingField]: editValue }

    // If we're editing the title, also update the description for backward compatibility
    if (editingField === "title") {
      updatedTask.description = editValue
    }

    updateTask(updatedTask)
    setTask(updatedTask)
    setEditingField(null)
  }

  if (!task) return null

  return (
    <Dialog open={!!taskId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {editingField === "title" ? (
            <div className="flex items-center gap-2">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="text-xl font-semibold"
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={saveEditing}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={cancelEditing}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <DialogTitle
              className="text-xl font-semibold cursor-pointer hover:bg-muted/50 p-2 rounded-md flex items-center justify-between"
              onClick={() => startEditing("title", task.title || task.description)}
            >
              {task.title || task.description}
              <Pencil className="h-4 w-4 text-muted-foreground ml-2" />
            </DialogTitle>
          )}
          <div className="flex items-center gap-2 mt-2">
            {editingField === "status" ? (
              <div className="flex items-center gap-2">
                <Select value={editValue} onValueChange={setEditValue}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="ghost" onClick={saveEditing}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Badge
                variant={task.status === "Completed" ? "outline" : "default"}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => startEditing("status", task.status)}
              >
                {task.status}
              </Badge>
            )}

            {editingField === "urgency" ? (
              <div className="flex items-center gap-2">
                <Select value={editValue} onValueChange={setEditValue}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="sm" variant="ghost" onClick={saveEditing}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Badge
                variant={getUrgencyVariant(task.urgency)}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => startEditing("urgency", task.urgency)}
              >
                {task.urgency}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {/* Task Owner */}
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Owner:</span>

            {editingField === "assigned" ? (
              <div className="flex items-center gap-2">
                <Select value={editValue} onValueChange={setEditValue}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member} value={member}>
                        {member}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button size="sm" variant="ghost" onClick={saveEditing}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => startEditing("assigned", task.assigned)}
              >
                {task.assigned}
              </Badge>
            )}
          </div>

          {/* Due Date */}
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Due Date:</span>

            {editingField === "dueDate" ? (
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !editValue && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editValue ? format(new Date(editValue), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={editValue ? new Date(editValue) : undefined}
                      onSelect={(date) => setEditValue(date ? date.toISOString() : "")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button size="sm" variant="ghost" onClick={saveEditing}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <span
                className={cn(
                  "cursor-pointer hover:bg-muted/50 p-1 rounded-md",
                  new Date(task.dueDate) < new Date() && task.status !== "Completed"
                    ? "text-destructive font-medium"
                    : "",
                )}
                onClick={() => startEditing("dueDate", task.dueDate)}
              >
                {format(new Date(task.dueDate), "MMMM d, yyyy")}
              </span>
            )}
          </div>

          {/* Related RFP */}
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Related RFP:</span>

            {editingField === "rfpId" ? (
              <div className="flex items-center gap-2">
                <Select
                  value={editValue}
                  onValueChange={(value) => {
                    setEditValue(value)
                    const selectedRfp = rfps.find((rfp) => rfp.id === value)
                    if (selectedRfp) {
                      // We'll update rfpName when saving
                    }
                  }}
                >
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select related RFP" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {rfps.map((rfp) => (
                      <SelectItem key={rfp.id} value={rfp.id}>
                        {rfp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const selectedRfp = rfps.find((rfp) => rfp.id === editValue)
                    const updatedTask = {
                      ...task,
                      rfpId: editValue,
                      rfpName: selectedRfp?.name || "",
                    }
                    updateTask(updatedTask)
                    setTask(updatedTask)
                    setEditingField(null)
                  }}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <span
                className="cursor-pointer hover:bg-muted/50 p-1 rounded-md"
                onClick={() => startEditing("rfpId", task.rfpId)}
              >
                {task.rfpName || "None"}
              </span>
            )}
          </div>

          {/* Description */}
          <Card className="mt-4">
            <CardContent className="pt-4">
              <h3 className="text-sm font-medium mb-2 flex items-center justify-between">
                Description
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => startEditing("description", task.description || "")}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </h3>

              {editingField === "description" ? (
                <div className="space-y-2">
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="min-h-[100px]"
                    placeholder="Enter task description"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={cancelEditing}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={saveEditing}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="text-sm whitespace-pre-wrap cursor-pointer hover:bg-muted/50 p-2 rounded-md"
                  onClick={() => startEditing("description", task.description || "")}
                >
                  {task.description ? (
                    task.description
                  ) : (
                    <span className="text-muted-foreground italic">No description provided. Click to add one.</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Context */}
          <Card className="mt-4">
            <CardContent className="pt-4">
              <h3 className="text-sm font-medium mb-2 flex items-center justify-between">
                Context
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => startEditing("context", task.context || "")}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </h3>

              {editingField === "context" ? (
                <div className="space-y-2">
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="min-h-[100px]"
                    placeholder="Add links, references, or additional context"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={cancelEditing}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={saveEditing}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="text-sm whitespace-pre-wrap cursor-pointer hover:bg-muted/50 p-2 rounded-md"
                  onClick={() => startEditing("context", task.context || "")}
                >
                  {task.context ? (
                    <div dangerouslySetInnerHTML={{ __html: linkifyText(task.context) }} />
                  ) : (
                    <span className="text-muted-foreground italic">
                      No additional context provided. Click to add some.
                    </span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Attachments */}
          {task.attachments && task.attachments.length > 0 && (
            <Card className="mt-4">
              <CardContent className="pt-4">
                <h3 className="text-sm font-medium mb-2">Attachments</h3>
                <div className="space-y-2">
                  {task.attachments.map((attachment: any) => (
                    <div key={attachment.id} className="flex items-center p-2 bg-muted rounded-md">
                      <Paperclip className="h-4 w-4 mr-2 text-primary" />
                      <span>{attachment.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
