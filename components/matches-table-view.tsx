"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Calendar, Building, ThumbsUp, ThumbsDown, Minus, DollarSign, User } from "lucide-react"
import Link from "next/link"
import type { Solicitation } from "@/contexts/solicitations-context"
import { MatchReasonDialog } from "@/components/match-reason-dialog"
import { Badge } from "@/components/ui/badge"

interface MatchesTableViewProps {
  solicitations: Solicitation[]
  onMatchDecision: (id: string, decision: string, rejectionReason?: string) => void
}

export function MatchesTableView({ solicitations, onMatchDecision }: MatchesTableViewProps) {
  const [reasonDialog, setReasonDialog] = useState<{
    isOpen: boolean
    solicitationId: string
    type: "soft" | "reject"
  }>({
    isOpen: false,
    solicitationId: "",
    type: "reject",
  })

  const getScoreColor = (score: string) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Matched":
      case "Yes":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
      case "No":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
      case "Soft":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Maybe</Badge>
      case "Pending":
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Pending</Badge>
    }
  }

  const handleDecision = (id: string, decision: "Yes" | "No" | "Soft") => {
    if (decision === "No") {
      setReasonDialog({
        isOpen: true,
        solicitationId: id,
        type: "reject",
      })
    } else if (decision === "Soft") {
      setReasonDialog({
        isOpen: true,
        solicitationId: id,
        type: "soft",
      })
    } else {
      onMatchDecision(id, decision)
    }
  }

  const handleReasonSubmit = (reason: string) => {
    onMatchDecision(reasonDialog.solicitationId, reasonDialog.type === "reject" ? "No" : "Soft", reason)
    setReasonDialog({ isOpen: false, solicitationId: "", type: "reject" })
  }

  const handleReasonCancel = () => {
    setReasonDialog({ isOpen: false, solicitationId: "", type: "reject" })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>RFP Name</TableHead>
            <TableHead>Overview</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Estimated Amount</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {solicitations.length > 0 ? (
            solicitations.map((solicitation) => (
              <TableRow key={solicitation.id}>
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
                    <User className="h-4 w-4 text-muted-foreground" />
                    {solicitation.accountManager || "Unassigned"}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <Link href={`/solicitations/${solicitation.id}`} className="hover:underline">
                    {solicitation.name}
                  </Link>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p
                    className="truncate text-sm text-muted-foreground group-hover:overflow-visible group-hover:whitespace-normal group-hover:absolute group-hover:bg-white group-hover:p-2 group-hover:shadow-lg group-hover:rounded group-hover:border group-hover:z-10 group-hover:max-w-md"
                    title={solicitation.overview}
                  >
                    {solicitation.overview}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {solicitation.dueDate}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    {solicitation.value}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`flex items-center gap-1 ${getScoreColor(solicitation.score || "")}`}>
                    {solicitation.score} ({solicitation.matchPercentage}%)
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(solicitation.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleDecision(solicitation.id, "No")}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      No
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                      onClick={() => handleDecision(solicitation.id, "Soft")}
                    >
                      <Minus className="h-4 w-4" />
                      Maybe
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-green-200 hover:bg-green-50 hover:text-green-600"
                      onClick={() => handleDecision(solicitation.id, "Yes")}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Yes
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                <p className="text-muted-foreground">No pending matches to review</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Reason Dialog */}
      <MatchReasonDialog
        open={reasonDialog.isOpen}
        onOpenChange={(open) => !open && handleReasonCancel()}
        onSubmit={handleReasonSubmit}
        onCancel={handleReasonCancel}
        title={reasonDialog.type === "reject" ? "Why is this not a match?" : "Why is this a maybe?"}
        description={
          reasonDialog.type === "reject"
            ? "Please provide a reason for rejection"
            : "Please provide details about your consideration"
        }
        type={reasonDialog.type}
      />
    </div>
  )
}
