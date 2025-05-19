"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Paperclip, Plus, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Task, TaskAttachment } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (task: Task) => void
  initialTask?: Task
}

export function TaskDialog({ open, onOpenChange, onSave, initialTask }: TaskDialogProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    context: "",
    assigned: teamMembers[0],
    status: "Open",
    urgency: "Medium",
    rfpId: "",
    rfpName: "",
    dueDate: new Date().toISOString(),
    attachments: [],
  })

  // For file attachment simulation
  const [attachmentName, setAttachmentName] = useState("")

  // Reset form when dialog opens with a new task
  useEffect(() => {
    if (open) {
      if (initialTask) {
        // Handle backward compatibility with old task format
        const updatedTask = {
          ...initialTask,
          title: initialTask.title || initialTask.description,
          description: initialTask.description && !initialTask.title ? "" : initialTask.description,
        }
        setTask(updatedTask)
      } else {
        setTask({
          id: Date.now().toString(),
          title: "",
          description: "",
          context: "",
          assigned: teamMembers[0],
          status: "Open",
          urgency: "Medium",
          rfpId: "",
          rfpName: "",
          dueDate: new Date().toISOString(),
          attachments: [],
        })
      }
      setActiveTab("details")
    }
  }, [open, initialTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Ensure backward compatibility
    const taskToSave = {
      ...task,
      description: task.title, // Keep the old description field updated with title for backward compatibility
    }

    onSave(taskToSave)
    onOpenChange(false)
  }

  const handleRfpChange = (rfpId: string) => {
    const selectedRfp = rfps.find((rfp) => rfp.id === rfpId)
    setTask({
      ...task,
      rfpId,
      rfpName: selectedRfp?.name || "",
    })
  }

  const addAttachment = () => {
    if (!attachmentName.trim()) return

    const newAttachment: TaskAttachment = {
      id: Date.now().toString(),
      name: attachmentName,
      url: "#", // In a real app, this would be a real URL
      type: "document",
    }

    setTask({
      ...task,
      attachments: [...(task.attachments || []), newAttachment],
    })

    setAttachmentName("")
  }

  const removeAttachment = (id: string) => {
    setTask({
      ...task,
      attachments: task.attachments?.filter((a) => a.id !== id) || [],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialTask ? "Edit Task" : "Create New Task"}</DialogTitle>
            <DialogDescription>
              {initialTask ? "Make changes to this task." : "Add a new task to your list."}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Task Details</TabsTrigger>
              <TabsTrigger value="context">Context & Attachments</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="required">
                  Task Title
                </Label>
                <Input
                  id="title"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assigned" className="required">
                    Task Owner
                  </Label>
                  <Select
                    value={task.assigned}
                    onValueChange={(value) => setTask({ ...task, assigned: value })}
                    required
                  >
                    <SelectTrigger id="assigned">
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
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="urgency">Urgency</Label>
                  <Select value={task.urgency} onValueChange={(value) => setTask({ ...task, urgency: value })}>
                    <SelectTrigger id="urgency">
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
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rfp">Related RFP</Label>
                  <Select value={task.rfpId} onValueChange={handleRfpChange}>
                    <SelectTrigger id="rfp">
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
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="dueDate"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !task.dueDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {task.dueDate ? format(new Date(task.dueDate), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={task.dueDate ? new Date(task.dueDate) : undefined}
                        onSelect={(date) => setTask({ ...task, dueDate: date ? date.toISOString() : "" })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Task Description</Label>
                <Textarea
                  id="description"
                  value={task.description || ""}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                  placeholder="Enter detailed task description"
                  className="min-h-[100px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="context" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="context">Task Context</Label>
                <Textarea
                  id="context"
                  value={task.context || ""}
                  onChange={(e) => setTask({ ...task, context: e.target.value })}
                  placeholder="Add links, references, or additional context"
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  URLs will be automatically converted to clickable links.
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Attachments</Label>
                <div className="space-y-2">
                  {task.attachments && task.attachments.length > 0 ? (
                    <div className="space-y-2">
                      {task.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center p-2 bg-background border rounded-md">
                          <Paperclip className="h-4 w-4 mr-2 text-primary" />
                          <span className="flex-1">{attachment.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(attachment.id)}
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground italic p-2">No attachments</div>
                  )}

                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Attachment name"
                      value={attachmentName}
                      onChange={(e) => setAttachmentName(e.target.value)}
                    />
                    <Button type="button" variant="outline" onClick={addAttachment} disabled={!attachmentName.trim()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    In a real application, you would be able to upload actual files here.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="submit">{initialTask ? "Save Changes" : "Create Task"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
