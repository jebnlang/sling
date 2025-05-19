"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building, User, FileText } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { useSolicitations } from "@/contexts/solicitations-context"

export function PendingProposalsTable() {
  const { proposalSolicitations } = useSolicitations()

  // Function to get the appropriate badge variant based on status
  const getStatusBadge = (status = "Drafting") => {
    switch (status) {
      case "Drafting":
        return <Badge variant="default">Drafting</Badge>
      case "Review":
        return <Badge variant="secondary">Review</Badge>
      case "Revision":
        return <Badge variant="warning">Revision</Badge>
      case "Final":
        return <Badge variant="success">Final</Badge>
      case "Submitted":
        return <Badge variant="outline">Submitted</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      {proposalSolicitations.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proposal</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Writer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposalSolicitations.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell className="font-medium">
                  <Link href={`/proposals/${proposal.id}`} className="hover:underline flex items-center gap-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {proposal.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <Link href={`/companies/${proposal.companyId}`} className="hover:underline">
                      {proposal.companyName}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {proposal.dueDate}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(proposal.proposalStatus)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={proposal.proposalProgress || 0} className="h-2 w-[60px]" />
                    <span className="text-xs text-muted-foreground">{proposal.proposalProgress || 0}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {proposal.writer || "Unassigned"}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <p className="text-muted-foreground">No pending proposals</p>
        </div>
      )}
    </>
  )
}
