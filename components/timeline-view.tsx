"use client"

import { useState } from "react"
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileCheck,
  FileClock,
  CheckCircle2,
  Circle,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { CalendarEvent, EventType } from "./solicitation-timeline"

interface TimelineViewProps {
  events?: CalendarEvent[]
  onToggleTaskCompletion?: (eventId: string) => void
  onAddEvent?: (event: Omit<CalendarEvent, "id">) => void
}

export function TimelineView({
  events = [],
  onToggleTaskCompletion = () => {},
  onAddEvent = () => {},
}: TimelineViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, "id">>({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    type: "task",
    rfpId: "1",
    completed: false,
  })

  const firstDayOfMonth = startOfMonth(currentDate)
  const lastDayOfMonth = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth })

  const prevMonth = () => {
    setCurrentDate((prev) => addDays(prev, -30))
  }

  const nextMonth = () => {
    setCurrentDate((prev) => addDays(prev, 30))
  }

  const today = new Date()

  const handleAddEvent = () => {
    onAddEvent(newEvent)
    setIsAddEventDialogOpen(false)
    setNewEvent({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      type: "task",
      rfpId: "1",
      completed: false,
    })
  }

  // Count events per day to identify high workload days
  const eventCountByDay = days.reduce(
    (acc, day) => {
      const dateStr = format(day, "yyyy-MM-dd")
      const count = events.filter((event) => {
        const eventDate = format(new Date(event.date), "yyyy-MM-dd")
        return eventDate === dateStr
      }).length
      acc[dateStr] = count
      return acc
    },
    {} as Record<string, number>,
  )

  // Get event type color and icon
  const getEventTypeStyles = (type: EventType, completed = false) => {
    if (completed) {
      return {
        bgColor: "bg-gray-200",
        textColor: "text-gray-500",
        icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
      }
    }

    switch (type) {
      case "submission":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          icon: <FileCheck className="h-3 w-3 mr-1" />,
        }
      case "draft":
        return {
          bgColor: "bg-amber-100",
          textColor: "text-amber-700",
          icon: <FileClock className="h-3 w-3 mr-1" />,
        }
      case "task":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          icon: <Circle className="h-3 w-3 mr-1" />,
        }
      case "meeting":
        return {
          bgColor: "bg-purple-100",
          textColor: "text-purple-700",
          icon: <Clock className="h-3 w-3 mr-1" />,
        }
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          icon: <CalendarClock className="h-3 w-3 mr-1" />,
        }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{format(currentDate, "MMMM yyyy")}</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
          <Button onClick={() => setIsAddEventDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Important Date
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-1 font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth.getDay() }).map((_, index) => (
          <div key={`empty-${index}`} className="h-24 rounded-md border border-dashed border-gray-200" />
        ))}

        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd")
          const dayEvents = events.filter((event) => {
            const eventDate = format(new Date(event.date), "yyyy-MM-dd")
            return eventDate === dateStr
          })

          // Determine if this is a high workload day (3+ events)
          const isHighWorkload = eventCountByDay[dateStr] >= 3

          return (
            <Card
              key={day.toISOString()}
              className={cn(
                "h-auto min-h-24 overflow-hidden",
                isSameDay(day, today) && "border-2 border-primary",
                isHighWorkload && "border-2 border-orange-400 bg-orange-50",
              )}
            >
              <CardContent className="p-1">
                <div className="text-right text-xs font-medium">
                  {format(day, "d")}
                  {isHighWorkload && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 inline-block h-2 w-2 rounded-full bg-orange-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>High workload day</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <div className="mt-1 space-y-1 max-h-20 overflow-y-auto">
                  {dayEvents.map((event) => {
                    const { bgColor, textColor, icon } = getEventTypeStyles(event.type as EventType, event.completed)

                    return (
                      <div
                        key={event.id}
                        className={cn("flex items-center rounded px-1 py-0.5 text-xs", bgColor, textColor)}
                        title={event.title}
                      >
                        {event.type === "task" ? (
                          <button
                            onClick={() => onToggleTaskCompletion(event.id)}
                            className="flex items-center w-full text-left"
                            aria-label={event.completed ? "Mark as incomplete" : "Mark as complete"}
                          >
                            {event.completed ? (
                              <CheckCircle2 className="h-3 w-3 mr-1 flex-shrink-0" />
                            ) : (
                              <Circle className="h-3 w-3 mr-1 flex-shrink-0" />
                            )}
                            <span className={cn("truncate", event.completed && "line-through")}>{event.title}</span>
                          </button>
                        ) : (
                          <>
                            {icon}
                            <span className="truncate">{event.title}</span>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Important Date</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-title" className="text-right">
                Title
              </label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-date" className="text-right">
                Date
              </label>
              <Input
                id="event-date"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-type" className="text-right">
                Type
              </label>
              <Select
                value={newEvent.type}
                onValueChange={(value) => setNewEvent({ ...newEvent, type: value as EventType })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="submission">Final Submission</SelectItem>
                  <SelectItem value="draft">Draft Due</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="event-rfp" className="text-right">
                RFP
              </label>
              <Select value={newEvent.rfpId} onValueChange={(value) => setNewEvent({ ...newEvent, rfpId: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select RFP" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Enterprise Software Implementation</SelectItem>
                  <SelectItem value="2">Cloud Migration Services</SelectItem>
                  <SelectItem value="3">IT Security Assessment</SelectItem>
                  <SelectItem value="5">Mobile App Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-6 flex flex-wrap gap-2">
        <div className="flex items-center text-xs">
          <div className="mr-1 h-3 w-3 rounded-full bg-red-100" />
          <span>Final Submission</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="mr-1 h-3 w-3 rounded-full bg-amber-100" />
          <span>Draft Due</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="mr-1 h-3 w-3 rounded-full bg-blue-100" />
          <span>Task</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="mr-1 h-3 w-3 rounded-full bg-purple-100" />
          <span>Meeting</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="mr-1 h-3 w-3 rounded-full bg-orange-400" />
          <span>High Workload Day</span>
        </div>
      </div>
    </div>
  )
}
