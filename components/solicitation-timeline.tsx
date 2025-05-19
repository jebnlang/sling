"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TimelineView } from "@/components/timeline-view"
import { TimelineListView } from "@/components/timeline-list-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Define event types
export type EventType = "submission" | "draft" | "task" | "meeting"

// Define event interface
export interface CalendarEvent {
  id: string
  title: string
  date: string
  type: EventType
  rfpId: string
  completed?: boolean
}

// Sample data - would be fetched from API in real implementation
export const initialEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Cloud Migration Services Final Submission",
    date: "2023-11-30",
    type: "submission",
    rfpId: "2",
    completed: false,
  },
  {
    id: "2",
    title: "Cloud Migration Services Draft Due",
    date: "2023-11-28",
    type: "draft",
    rfpId: "2",
    completed: false,
  },
  {
    id: "3",
    title: "IT Security Assessment Final Submission",
    date: "2023-12-05",
    type: "submission",
    rfpId: "3",
    completed: false,
  },
  {
    id: "4",
    title: "IT Security Assessment Draft Due",
    date: "2023-12-03",
    type: "draft",
    rfpId: "3",
    completed: false,
  },
  {
    id: "5",
    title: "Enterprise Software Implementation Final Submission",
    date: "2023-12-15",
    type: "submission",
    rfpId: "1",
    completed: false,
  },
  {
    id: "6",
    title: "Enterprise Software Implementation Draft Due",
    date: "2023-12-12",
    type: "draft",
    rfpId: "1",
    completed: false,
  },
  {
    id: "7",
    title: "Mobile App Development Final Submission",
    date: "2023-12-20",
    type: "submission",
    rfpId: "5",
    completed: false,
  },
  {
    id: "8",
    title: "Mobile App Development Draft Due",
    date: "2023-12-18",
    type: "draft",
    rfpId: "5",
    completed: false,
  },
  {
    id: "9",
    title: "Prepare Technical Requirements",
    date: "2023-12-10",
    type: "task",
    rfpId: "1",
    completed: false,
  },
  {
    id: "10",
    title: "Gather Past Performance Examples",
    date: "2023-12-08",
    type: "task",
    rfpId: "1",
    completed: true,
  },
  {
    id: "11",
    title: "Review Pricing Strategy",
    date: "2023-12-11",
    type: "task",
    rfpId: "3",
    completed: false,
  },
  {
    id: "12",
    title: "Team Kickoff Meeting",
    date: "2023-12-01",
    type: "meeting",
    rfpId: "2",
    completed: false,
  },
]

interface SolicitationTimelineProps {
  solicitationId?: string
  companyName?: string
}

export function SolicitationTimeline({ solicitationId = "", companyName = "Company" }: SolicitationTimelineProps) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)

  const toggleTaskCompletion = (eventId: string) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId && event.type === "task") {
          return { ...event, completed: !event.completed }
        }
        return event
      }),
    )
  }

  const addEvent = (newEvent: Omit<CalendarEvent, "id">) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now().toString(),
    }
    setEvents([...events, eventWithId])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{companyName}</CardTitle>
        <CardDescription>Timeline and important dates for this solicitation</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar">
          <TabsList className="mb-4">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar">
            <TimelineView events={events} onToggleTaskCompletion={toggleTaskCompletion} onAddEvent={addEvent} />
          </TabsContent>
          <TabsContent value="list">
            <TimelineListView events={events} onToggleTaskCompletion={toggleTaskCompletion} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
