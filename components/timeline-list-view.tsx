"use client"

import { useState, useMemo } from "react"
import { format, differenceInDays } from "date-fns"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CheckCircle2,
  Circle,
  Clock,
  FileCheck,
  FileClock,
  SearchIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { CalendarEvent, EventType } from "./solicitation-timeline"

interface TimelineListViewProps {
  events?: CalendarEvent[]
  onToggleTaskCompletion?: (eventId: string) => void
}

type SortField = "date" | "title" | "type"
type SortDirection = "asc" | "desc"

export function TimelineListView({ events = [], onToggleTaskCompletion = () => {} }: TimelineListViewProps) {
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [filterType, setFilterType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedEvents = useMemo(() => {
    // Filter events
    let filtered = [...events]

    if (filterType !== "all") {
      filtered = filtered.filter((event) => event.type === filterType)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((event) => event.title.toLowerCase().includes(query))
    }

    // Sort events
    return filtered.sort((a, b) => {
      let comparison = 0

      if (sortField === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortField === "title") {
        comparison = a.title.localeCompare(b.title)
      } else if (sortField === "type") {
        comparison = a.type.localeCompare(b.type)
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [events, sortField, sortDirection, filterType, searchQuery])

  // Get event type color and icon
  const getEventTypeStyles = (type: EventType, completed = false) => {
    if (completed) {
      return {
        bgColor: "bg-gray-200",
        textColor: "text-gray-500",
        icon: <CheckCircle2 className="h-4 w-4" />,
        label: "Completed",
      }
    }

    switch (type) {
      case "submission":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          icon: <FileCheck className="h-4 w-4" />,
          label: "Final Submission",
        }
      case "draft":
        return {
          bgColor: "bg-amber-100",
          textColor: "text-amber-700",
          icon: <FileClock className="h-4 w-4" />,
          label: "Draft Due",
        }
      case "task":
        return {
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          icon: <Circle className="h-4 w-4" />,
          label: "Task",
        }
      case "meeting":
        return {
          bgColor: "bg-purple-100",
          textColor: "text-purple-700",
          icon: <Clock className="h-4 w-4" />,
          label: "Meeting",
        }
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          icon: <CalendarIcon className="h-4 w-4" />,
          label: "Event",
        }
    }
  }

  // Calculate days remaining and urgency
  const getDaysRemaining = (dateStr: string) => {
    const today = new Date()
    const eventDate = new Date(dateStr)
    const daysRemaining = differenceInDays(eventDate, today)

    let urgencyClass = ""
    if (daysRemaining < 0) {
      urgencyClass = "text-red-500 font-bold"
    } else if (daysRemaining <= 3) {
      urgencyClass = "text-red-500"
    } else if (daysRemaining <= 7) {
      urgencyClass = "text-amber-500"
    }

    return {
      days: daysRemaining,
      urgencyClass,
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="submission">Final Submission</SelectItem>
            <SelectItem value="draft">Draft Due</SelectItem>
            <SelectItem value="task">Task</SelectItem>
            <SelectItem value="meeting">Meeting</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort("date")}>
                <div className="flex items-center">
                  Date
                  {sortField === "date" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="ml-1 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                <div className="flex items-center">
                  Title
                  {sortField === "title" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="ml-1 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="w-[150px] cursor-pointer" onClick={() => handleSort("type")}>
                <div className="flex items-center">
                  Type
                  {sortField === "type" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="ml-1 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="w-[120px] text-right">Days Remaining</TableHead>
              <TableHead className="w-[100px] text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No events found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedEvents.map((event) => {
                const { bgColor, textColor, icon, label } = getEventTypeStyles(event.type as EventType, event.completed)
                const { days, urgencyClass } = getDaysRemaining(event.date)

                return (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{format(new Date(event.date), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      {event.type === "task" ? (
                        <button
                          onClick={() => onToggleTaskCompletion(event.id)}
                          className="flex items-center gap-2 hover:underline"
                        >
                          <span className={cn(event.completed && "line-through")}>{event.title}</span>
                        </button>
                      ) : (
                        event.title
                      )}
                    </TableCell>
                    <TableCell>
                      <div
                        className={cn(
                          "flex items-center gap-2 rounded-full px-2 py-1 text-xs w-fit",
                          bgColor,
                          textColor,
                        )}
                      >
                        {icon}
                        <span>{label}</span>
                      </div>
                    </TableCell>
                    <TableCell className={cn("text-right", urgencyClass)}>
                      {days < 0 ? "Overdue" : days === 0 ? "Today" : `${days} days`}
                    </TableCell>
                    <TableCell className="text-right">
                      {event.type === "task" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => onToggleTaskCompletion(event.id)}
                        >
                          {event.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                          <span className="sr-only">{event.completed ? "Mark as incomplete" : "Mark as complete"}</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
