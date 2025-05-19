"use client"

import { Building, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - would be fetched from API in real implementation
const companies = [
  {
    id: "1",
    name: "Acme Inc",
    activeRfps: 3,
    status: "Drafting",
    url: "https://acme.com",
  },
  {
    id: "2",
    name: "TechCorp",
    activeRfps: 2,
    status: "Qualified",
    url: "https://techcorp.com",
  },
  {
    id: "3",
    name: "Global Solutions",
    activeRfps: 5,
    status: "Matching",
    url: "https://globalsolutions.com",
  },
  {
    id: "4",
    name: "Innovate Ltd",
    activeRfps: 1,
    status: "Submitted",
    url: "https://innovate.com",
  },
  {
    id: "5",
    name: "Future Systems",
    activeRfps: 2,
    status: "Drafting",
    url: "https://futuresystems.com",
  },
]

export function DashboardTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Active RFPs</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell className="font-medium">{company.name}</TableCell>
            <TableCell>{company.activeRfps}</TableCell>
            <TableCell>
              <StatusBadge status={company.status} />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a href={company.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Visit website</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/companies/${company.id}`}>
                    <Building className="h-4 w-4" />
                    <span className="sr-only">View profile</span>
                  </Link>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
