"use client"

import { CalendarClock, FileCheck, FileClock, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - would be fetched from API in real implementation
const criticalDates = [
  {
    id: "1",
    rfpName: "Cloud Migration Services",
    company: "TechCorp",
    dueDate: "2023-11-30",
    submissionDate: "2023-11-28",
    companyId: "2",
    rfpId: "2",
    type: "submission",
  },
  {
    id: "2",
    rfpName: "IT Security Assessment",
    company: "Global Solutions",
    dueDate: "2023-12-05",
    submissionDate: "2023-12-03",
    companyId: "3",
    rfpId: "3",
    type: "draft",
  },
  {
    id: "3",
    rfpName: "Enterprise Software Implementation",
    company: "Acme Inc",
    dueDate: "2023-12-15",
    submissionDate: "2023-12-12",
    companyId: "1",
    rfpId: "1",
    type: "submission",
  },
  {
    id: "4",
    rfpName: "Mobile App Development",
    company: "Future Systems",
    dueDate: "2023-12-20",
    submissionDate: "2023-12-18",
    companyId: "5",
    rfpId: "5",
    type: "draft",
  },
  {
    id: "5",
    rfpName: "Data Analytics Platform",
    company: "Innovate Ltd",
    dueDate: "2024-01-10",
    submissionDate: "2024-01-07",
    companyId: "4",
    rfpId: "4",
    type: "task",
  },
].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

export function CriticalDates() {
  // Calculate days remaining and urgency
  const today = new Date()
  const criticalDatesWithMeta = criticalDates.map((date) => {
    const dueDate = new Date(date.dueDate)
    const daysRemaining = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    let urgency
    if (daysRemaining <= 7) {
      urgency = "high"
    } else if (daysRemaining <= 14) {
      urgency = "medium"
    } else {
      urgency = "low"
    }

    return {
      ...date,
      daysRemaining,
      urgency,
    }
  })

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>RFP</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Days Remaining</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {criticalDatesWithMeta.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <EventTypeBadge type={item.type} />
              </TableCell>
              <TableCell className="font-medium">
                <Link href={`/solicitations/${item.rfpId}`} className="hover:underline">
                  {item.rfpName}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/companies/${item.companyId}`} className="hover:underline">
                  {item.company}
                </Link>
              </TableCell>
              <TableCell>{item.dueDate}</TableCell>
              <TableCell>
                <UrgencyBadge daysRemaining={item.daysRemaining} urgency={item.urgency} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/solicitations/${item.rfpId}`}>View RFP</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function EventTypeBadge({ type }: { type: string }) {
  switch (type) {
    case "submission":
      return (
        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
          <FileCheck className="h-3 w-3" />
          Final Submission
        </Badge>
      )
    case "draft":
      return (
        <Badge variant="warning" className="flex items-center gap-1 w-fit">
          <FileClock className="h-3 w-3" />
          Draft Due
        </Badge>
      )
    case "task":
      return (
        <Badge variant="default" className="flex items-center gap-1 w-fit">
          <Clock className="h-3 w-3" />
          Task
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="flex items-center gap-1 w-fit">
          <CalendarClock className="h-3 w-3" />
          Event
        </Badge>
      )
  }
}

function UrgencyBadge({ daysRemaining, urgency }: { daysRemaining: number; urgency: string }) {
  const getVariant = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "destructive"
      case "medium":
        return "warning"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Badge variant={getVariant(urgency) as any} className="flex items-center gap-1 w-fit">
      <CalendarClock className="h-3 w-3" />
      {daysRemaining} days
    </Badge>
  )
}
