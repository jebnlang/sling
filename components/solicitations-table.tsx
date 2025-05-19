"use client"

import { useState } from "react"
import { MoreHorizontal, CheckSquare } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { QualificationDialog } from "@/components/qualification-dialog"

// Sample data - would be fetched from API in real implementation
const solicitations = [
  {
    id: "1",
    name: "Enterprise Software Implementation",
    dueDate: "2023-12-15",
    status: "Drafting",
    value: "$250,000",
    type: "Solicitation",
    baseType: "Software Implementation",
    qualificationStatus: "Pending",
  },
  {
    id: "2",
    name: "Cloud Migration Services",
    dueDate: "2023-11-30",
    status: "Qualified",
    value: "$180,000",
    type: "Solicitation",
    baseType: "Cloud Services",
    qualificationStatus: "Qualified",
  },
  {
    id: "3",
    name: "IT Security Assessment",
    dueDate: "2023-12-05",
    status: "Matching",
    value: "$75,000",
    type: "Solicitation",
    baseType: "Security Services",
    qualificationStatus: "Pending",
  },
  {
    id: "4",
    name: "Data Analytics Platform",
    dueDate: "2024-01-10",
    status: "Submitted",
    value: "$320,000",
    type: "Solicitation",
    baseType: "Data Analytics",
    qualificationStatus: "Qualified",
  },
  {
    id: "5",
    name: "Mobile App Development",
    dueDate: "2023-12-20",
    status: "Drafting",
    value: "$150,000",
    type: "Solicitation",
    baseType: "App Development",
    qualificationStatus: "Not Qualified",
  },
]

export function SolicitationsTable() {
  const [selectedQualification, setSelectedQualification] = useState<string | null>(null)

  const handleQualify = (id: string) => {
    setSelectedQualification(id)
  }

  const handleCloseDialog = () => {
    setSelectedQualification(null)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>RFP Name</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Qualification</TableHead>
            <TableHead>Est. Value</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {solicitations.map((rfp) => (
            <TableRow key={rfp.id}>
              <TableCell className="font-medium">
                <Link href={`/solicitations/${rfp.id}`} className="hover:underline">
                  {rfp.name}
                </Link>
              </TableCell>
              <TableCell>{rfp.dueDate}</TableCell>
              <TableCell>
                <StatusBadge status={rfp.status} />
              </TableCell>
              <TableCell>
                <QualificationStatusBadge status={rfp.qualificationStatus} />
              </TableCell>
              <TableCell>{rfp.value}</TableCell>
              <TableCell>{rfp.type}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleQualify(rfp.id)}
                  >
                    <CheckSquare className="h-4 w-4" />
                    Qualify
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/solicitations/${rfp.id}`}>View details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit solicitation</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleQualify(rfp.id)}>Qualification</DropdownMenuItem>
                      <DropdownMenuItem>View tasks</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedQualification && (
        <QualificationDialog
          open={!!selectedQualification}
          onOpenChange={handleCloseDialog}
          qualificationId={selectedQualification}
        />
      )}
    </>
  )
}

function StatusBadge({ status }: { status: string }) {
  const getVariant = (status: string) => {
    switch (status) {
      case "Matching":
        return "secondary"
      case "Qualified":
        return "outline"
      case "Drafting":
        return "default"
      case "Submitted":
        return "success"
      default:
        return "outline"
    }
  }

  return <Badge variant={getVariant(status) as any}>{status}</Badge>
}

function QualificationStatusBadge({ status }: { status: string }) {
  const getVariant = (status: string) => {
    switch (status) {
      case "Qualified":
        return "success"
      case "Not Qualified":
        return "destructive"
      case "Pending":
        return "outline"
      default:
        return "outline"
    }
  }

  return <Badge variant={getVariant(status) as any}>{status}</Badge>
}
