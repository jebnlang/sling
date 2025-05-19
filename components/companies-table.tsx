"use client"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - would be fetched from API in real implementation
const companies = [
  {
    id: "1",
    name: "Acme Inc",
    url: "https://acme.com",
    activeRfps: 3,
    matchedRfps: 5,
    qualifiedRfps: 4,
    summary: "Global technology provider specializing in enterprise solutions.",
  },
  {
    id: "2",
    name: "TechCorp",
    url: "https://techcorp.com",
    activeRfps: 2,
    matchedRfps: 3,
    qualifiedRfps: 2,
    summary: "Software development company focused on AI and machine learning.",
  },
  {
    id: "3",
    name: "Global Solutions",
    url: "https://globalsolutions.com",
    activeRfps: 5,
    matchedRfps: 8,
    qualifiedRfps: 6,
    summary: "Consulting firm providing business strategy and implementation services.",
  },
  {
    id: "4",
    name: "Innovate Ltd",
    url: "https://innovate.com",
    activeRfps: 1,
    matchedRfps: 2,
    qualifiedRfps: 1,
    summary: "Research and development company specializing in emerging technologies.",
  },
  {
    id: "5",
    name: "Future Systems",
    url: "https://futuresystems.com",
    activeRfps: 2,
    matchedRfps: 4,
    qualifiedRfps: 3,
    summary: "IT infrastructure and cloud services provider.",
  },
]

export function CompaniesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Summary</TableHead>
          <TableHead>Active RFPs</TableHead>
          <TableHead>Matched</TableHead>
          <TableHead>Qualified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell className="font-medium">
              <Link href={`/companies/${company.id}`} className="hover:underline block w-full">
                {company.name}
              </Link>
            </TableCell>
            <TableCell className="max-w-xs truncate">{company.summary}</TableCell>
            <TableCell>{company.activeRfps}</TableCell>
            <TableCell>{company.matchedRfps}</TableCell>
            <TableCell>{company.qualifiedRfps}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
