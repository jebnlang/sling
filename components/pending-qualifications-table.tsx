"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building } from "lucide-react"
import Link from "next/link"
import { useSolicitations } from "@/contexts/solicitations-context"

interface PendingQualificationsTableProps {
  onQualificationDecision?: (id: string, decision: string) => void
}

export function PendingQualificationsTable({ onQualificationDecision }: PendingQualificationsTableProps) {
  const { qualificationSolicitations, handleQualificationDecision } = useSolicitations()

  const onDecision = onQualificationDecision || handleQualificationDecision

  const getPriorityBadge = (priority = "Medium") => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return <Badge variant="warning">Medium</Badge>
      case "Low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getScoreColor = (score?: string) => {
    switch (score) {
      case "Excellent":
        return "text-green-600"
      case "Good":
        return "text-blue-600"
      case "Fair":
        return "text-amber-600"
      case "Poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <>
      {qualificationSolicitations.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Solicitation</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Match Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qualificationSolicitations.map((solicitation) => (
              <TableRow key={solicitation.id}>
                <TableCell className="font-medium">
                  <Link href={`/solicitations/${solicitation.id}`} className="hover:underline">
                    {solicitation.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <Link href={`/companies/${solicitation.companyId}`} className="hover:underline">
                      {solicitation.companyName}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {solicitation.dueDate}
                  </div>
                </TableCell>
                <TableCell>{getPriorityBadge(solicitation.priority)}</TableCell>
                <TableCell>
                  {solicitation.score && solicitation.matchPercentage && (
                    <div className={`flex items-center gap-1 ${getScoreColor(solicitation.score)}`}>
                      {solicitation.score} ({solicitation.matchPercentage}%)
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <p className="text-muted-foreground">No pending qualifications</p>
        </div>
      )}
    </>
  )
}
