"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Calendar, Building, ThumbsUp, ThumbsDown, Minus } from "lucide-react"
import Link from "next/link"

interface Solicitation {
  id: string
  name: string
  status: string
  comments: string
  dueDate: string
  value: string
  score: string
  matchPercentage: number
  overview: string
  rejectionReason: string
  companyId: string
  companyName: string
}

interface PendingMatchesListProps {
  solicitations: Solicitation[]
  onMatchDecision: (id: string, decision: string, rejectionReason?: string) => void
}

export function PendingMatchesList({ solicitations, onMatchDecision }: PendingMatchesListProps) {
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

  const handleDecision = (id: string, decision: "Yes" | "No" | "Soft") => {
    onMatchDecision(id, decision)
  }

  return (
    <>
      {solicitations.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Solicitation</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Match Score</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solicitations.map((match) => (
              <TableRow key={match.id}>
                <TableCell className="font-medium">
                  <Link href={`/solicitations/${match.id}`} className="hover:underline">
                    {match.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <Link href={`/companies/${match.companyId}`} className="hover:underline">
                      {match.companyName}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {match.dueDate}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`flex items-center gap-1 ${getScoreColor(match.score)}`}>
                    {match.score} ({match.matchPercentage}%)
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleDecision(match.id, "No")}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      No
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                      onClick={() => handleDecision(match.id, "Soft")}
                    >
                      <Minus className="h-4 w-4" />
                      Soft
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 border-green-200 hover:bg-green-50 hover:text-green-600"
                      onClick={() => handleDecision(match.id, "Yes")}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Yes
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No pending matches to review</p>
        </div>
      )}
    </>
  )
}
