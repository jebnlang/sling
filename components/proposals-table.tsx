"use client"
import { FileText, Calendar, Building, User } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useProposalFilters } from "@/contexts/proposal-filter-context"
import { useMemo, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// Sample data - would be fetched from API in real implementation
const proposals = [
  {
    id: "1",
    name: "Enterprise Software Implementation",
    rfpId: "1",
    company: "Acme Inc",
    companyId: "1",
    dueDate: "2023-12-15",
    status: "Drafting",
    progress: 25,
    writer: "Roy",
    owner: "Michael",
    lastUpdated: "2023-11-20",
  },
  {
    id: "2",
    name: "Cloud Migration Services",
    rfpId: "2",
    company: "TechCorp",
    companyId: "2",
    dueDate: "2023-11-30",
    status: "Review",
    progress: 75,
    writer: "Yonatan",
    owner: "Sarah",
    lastUpdated: "2023-11-22",
  },
  {
    id: "3",
    name: "IT Security Assessment",
    rfpId: "3",
    company: "Global Solutions",
    companyId: "3",
    dueDate: "2023-12-05",
    status: "Revision",
    progress: 60,
    writer: "Sarah",
    owner: "Michael",
    lastUpdated: "2023-11-18",
  },
  {
    id: "4",
    name: "Data Analytics Platform",
    rfpId: "4",
    company: "Innovate Ltd",
    companyId: "4",
    dueDate: "2024-01-10",
    status: "Final",
    progress: 100,
    writer: "Michael",
    owner: "Roy",
    lastUpdated: "2023-11-15",
  },
  {
    id: "5",
    name: "Mobile App Development",
    rfpId: "5",
    company: "Future Systems",
    companyId: "5",
    dueDate: "2023-12-20",
    status: "Submitted",
    progress: 100,
    writer: "Roy",
    owner: "Yonatan",
    lastUpdated: "2023-11-10",
  },
]

export function ProposalsTable() {
  const { filters } = useProposalFilters()
  const [searchTerm, setSearchTerm] = useState("")
  const [writerFilter, setWriterFilter] = useState("all")
  const [ownerFilter, setOwnerFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Get unique writers and owners for filter dropdowns
  const writers = [...new Set(proposals.map((p) => p.writer))].sort()
  const owners = [...new Set(proposals.map((p) => p.owner))].sort()
  const statuses = [...new Set(proposals.map((p) => p.status))].sort()

  // Filter proposals based on active filters
  const filteredProposals = useMemo(() => {
    return proposals.filter((proposal) => {
      // Search filter
      if (
        searchTerm &&
        !proposal.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !proposal.company.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Writer filter
      if (writerFilter !== "all" && proposal.writer !== writerFilter) {
        return false
      }

      // Owner filter
      if (ownerFilter !== "all" && proposal.owner !== ownerFilter) {
        return false
      }

      // Status filter
      if (statusFilter !== "all" && proposal.status !== statusFilter) {
        return false
      }

      // Due date filter from context
      if (filters.dueDate) {
        const today = new Date()
        const dueDate = new Date(proposal.dueDate)
        const oneWeek = 7 * 24 * 60 * 60 * 1000
        const oneMonth = 30 * 24 * 60 * 60 * 1000

        if (filters.dueDate === "this-week") {
          const nextWeek = new Date(today.getTime() + oneWeek)
          if (dueDate > nextWeek || dueDate < today) {
            return false
          }
        } else if (filters.dueDate === "next-week") {
          const nextWeek = new Date(today.getTime() + oneWeek)
          const twoWeeks = new Date(today.getTime() + 2 * oneWeek)
          if (dueDate < nextWeek || dueDate > twoWeeks) {
            return false
          }
        } else if (filters.dueDate === "this-month") {
          const nextMonth = new Date(today.getTime() + oneMonth)
          if (dueDate > nextMonth || dueDate < today) {
            return false
          }
        } else if (filters.dueDate === "next-month") {
          const nextMonth = new Date(today.getTime() + oneMonth)
          const twoMonths = new Date(today.getTime() + 2 * oneMonth)
          if (dueDate < nextMonth || dueDate > twoMonths) {
            return false
          }
        }
      }

      return true
    })
  }, [searchTerm, writerFilter, ownerFilter, statusFilter, filters.dueDate])

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={writerFilter} onValueChange={setWriterFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Writer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Writers</SelectItem>
              {writers.map((writer) => (
                <SelectItem key={writer} value={writer}>
                  {writer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ownerFilter} onValueChange={setOwnerFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              {owners.map((owner) => (
                <SelectItem key={owner} value={owner}>
                  {owner}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setWriterFilter("all")
              setOwnerFilter("all")
              setStatusFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {filteredProposals.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-muted-foreground">No proposals match your filters</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proposal Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Writer</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProposals.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell className="font-medium">
                  <Link href={`/proposals/${proposal.id}`} className="hover:underline flex items-center gap-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {proposal.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/companies/${proposal.companyId}`} className="hover:underline flex items-center gap-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {proposal.company}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {proposal.dueDate}
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={proposal.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {proposal.writer}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {proposal.owner}
                  </div>
                </TableCell>
                <TableCell>{proposal.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const getVariant = (status: string) => {
    switch (status) {
      case "Drafting":
        return "default"
      case "Review":
        return "secondary"
      case "Revision":
        return "warning"
      case "Final":
        return "success"
      case "Submitted":
        return "outline"
      default:
        return "outline"
    }
  }

  return <Badge variant={getVariant(status) as any}>{status}</Badge>
}
