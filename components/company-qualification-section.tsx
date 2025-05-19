"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, CheckSquare } from "lucide-react"
import Link from "next/link"
import { QualificationDialog } from "@/components/qualification-dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CompanyQualificationSectionProps {
  companyId: string
}

// Sample data - would be fetched from API in real implementation
const getCompanyQualifications = (companyId: string) => [
  {
    id: "1",
    name: "Enterprise Software Implementation",
    dueDate: "2023-12-15",
    priority: "High",
    status: "Pending",
  },
  {
    id: "2",
    name: "Cloud Migration Services",
    dueDate: "2023-11-30",
    priority: "Medium",
    status: "Qualified",
  },
  {
    id: "5",
    name: "Mobile App Development",
    dueDate: "2023-12-20",
    priority: "Medium",
    status: "Not Qualified",
  },
  {
    id: "6",
    name: "Network Infrastructure Upgrade",
    dueDate: "2024-01-15",
    priority: "Low",
    status: "Pending",
  },
]

export function CompanyQualificationSection({ companyId }: CompanyQualificationSectionProps) {
  const [selectedQualification, setSelectedQualification] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("pending")
  const [qualifications, setQualifications] = useState(getCompanyQualifications(companyId))

  const handleQualify = (id: string) => {
    setSelectedQualification(id)
  }

  const handleCloseDialog = () => {
    setSelectedQualification(null)
  }

  const handleQualificationStatusChange = (id: string, newStatus: string) => {
    setQualifications(
      qualifications.map((qualification) => {
        if (qualification.id === id) {
          return { ...qualification, status: newStatus }
        }
        return qualification
      }),
    )
  }

  const getPriorityBadge = (priority: string) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Qualified":
        return <Badge variant="success">Qualified</Badge>
      case "Not Qualified":
        return <Badge variant="destructive">Not Qualified</Badge>
      case "Pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter qualifications based on active tab
  const filteredQualifications = qualifications.filter((qualification) => {
    if (activeTab === "pending") {
      return qualification.status === "Pending" || qualification.status === "In Progress"
    } else if (activeTab === "qualified") {
      return qualification.status === "Qualified"
    } else if (activeTab === "not-qualified") {
      return qualification.status === "Not Qualified"
    }
    return true
  })

  // Count qualifications by status
  const pendingCount = qualifications.filter((q) => q.status === "Pending" || q.status === "In Progress").length
  const qualifiedCount = qualifications.filter((q) => q.status === "Qualified").length
  const notQualifiedCount = qualifications.filter((q) => q.status === "Not Qualified").length

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Qualifications</CardTitle>
              <CardDescription>Manage solicitation qualifications for this company</CardDescription>
            </div>
            <Button asChild>
              <Link href="/qualifications">
                <CheckSquare className="mr-2 h-4 w-4" />
                View All Qualifications
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                Pending <Badge variant="outline">{pendingCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="qualified" className="flex items-center gap-2">
                Qualified <Badge variant="outline">{qualifiedCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="not-qualified" className="flex items-center gap-2">
                Not Qualified <Badge variant="outline">{notQualifiedCount}</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {filteredQualifications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Solicitation</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQualifications.map((qualification) => (
                  <TableRow key={qualification.id}>
                    <TableCell className="font-medium">
                      <Link href={`/solicitations/${qualification.id}`} className="hover:underline">
                        {qualification.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {qualification.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(qualification.priority)}</TableCell>
                    <TableCell>{getStatusBadge(qualification.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleQualify(qualification.id)}>
                        {qualification.status === "Pending" ? "Qualify" : "Review"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">No {activeTab.replace("-", " ")} qualifications found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedQualification && (
        <QualificationDialog
          open={!!selectedQualification}
          onOpenChange={handleCloseDialog}
          qualificationId={selectedQualification}
          onStatusChange={(id, status) => handleQualificationStatusChange(id, status)}
        />
      )}
    </>
  )
}
