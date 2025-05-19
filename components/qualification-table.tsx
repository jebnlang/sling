"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building, User, FileUp } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DocumentUploadDialog } from "./document-upload-dialog"

// Sample data - would be fetched from API in real implementation
const qualifications = [
  {
    id: "1",
    name: "Enterprise Software Implementation",
    company: "Acme Inc",
    companyId: "1",
    dueDate: "2023-12-15",
    priority: "High",
    status: "Waiting for files", // Updated status
    matchScore: "Good",
    matchPercentage: 85,
    owner: "Roy Chen",
    solicitationId: "1",
    documents: [
      {
        id: "1",
        name: "Requirements.pdf",
        type: "PDF",
        size: "2.4 MB",
        uploadDate: "2023-12-01",
        category: "Original",
      },
      {
        id: "2",
        name: "Proposal_Draft.docx",
        type: "DOCX",
        size: "1.8 MB",
        uploadDate: "2023-12-03",
        category: "Proposal",
      },
    ],
  },
  {
    id: "2",
    name: "Cloud Migration Services",
    company: "TechCorp",
    companyId: "2",
    dueDate: "2023-11-30",
    priority: "Medium",
    status: "Ready for qualification", // Updated status
    matchScore: "Excellent",
    matchPercentage: 92,
    owner: "Sarah Johnson",
    solicitationId: "2",
    documents: [
      {
        id: "1",
        name: "RFP Original Document.pdf",
        type: "PDF",
        size: "3.2 MB",
        uploadDate: "2023-10-15",
        category: "Original",
      },
      {
        id: "2",
        name: "Technical Requirements.docx",
        type: "DOCX",
        size: "1.5 MB",
        uploadDate: "2023-10-16",
        category: "Requirements",
      },
    ],
  },
  {
    id: "3",
    name: "IT Security Assessment",
    company: "Global Solutions",
    companyId: "3",
    dueDate: "2023-12-05",
    priority: "High",
    status: "Waiting for files", // Updated status
    matchScore: "Fair",
    matchPercentage: 68,
    owner: "Michael Wong",
    solicitationId: "3",
    documents: [],
  },
  {
    id: "4",
    name: "Data Analytics Platform",
    company: "Innovate Ltd",
    companyId: "4",
    dueDate: "2024-01-10",
    priority: "Low",
    status: "Ready for qualification", // Updated status
    matchScore: "Good",
    matchPercentage: 78,
    owner: "Yonatan Katz",
    solicitationId: "4",
    documents: [
      {
        id: "1",
        name: "Pricing Template.xlsx",
        type: "XLSX",
        size: "0.8 MB",
        uploadDate: "2023-10-17",
        category: "Pricing",
      },
      {
        id: "2",
        name: "Draft Proposal v1.pdf",
        type: "PDF",
        size: "4.7 MB",
        uploadDate: "2023-11-05",
        category: "Proposal",
      },
    ],
  },
  {
    id: "5",
    name: "Mobile App Development",
    company: "Future Systems",
    companyId: "5",
    dueDate: "2023-12-20",
    priority: "Medium",
    status: "In Progress",
    matchScore: "Good",
    matchPercentage: 75,
    owner: "Roy Chen",
    solicitationId: "5",
    documents: [
      {
        id: "1",
        name: "Q&A Responses.pdf",
        type: "PDF",
        size: "1.2 MB",
        uploadDate: "2023-11-10",
        category: "Clarification",
      },
    ],
  },
]

export function QualificationTable() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("pending")
  const [qualificationsData, setQualificationsData] = useState(qualifications)
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false)
  const [selectedQualification, setSelectedQualification] = useState<(typeof qualifications)[0] | null>(null)

  const handleQualificationClick = (qualification: (typeof qualifications)[0]) => {
    // Navigate to the solicitation detail page with source=qualification
    // This will help the back button know where to return
    router.push(`/solicitations/${qualification.solicitationId}?source=qualification`)
  }

  const handleDocumentButtonClick = (e: React.MouseEvent, qualification: (typeof qualifications)[0]) => {
    e.stopPropagation() // Prevent row click
    setSelectedQualification(qualification)
    setDocumentDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Qualified":
        return <Badge variant="success">Qualified</Badge>
      case "Not Qualified":
        return <Badge variant="destructive">Not Qualified</Badge>
      case "Waiting for files":
        return <Badge variant="destructive">Waiting for files</Badge>
      case "Ready for qualification":
        return <Badge variant="success">Ready for qualification</Badge>
      case "In Progress":
        return <Badge variant="outline">In Progress</Badge>
      case "Pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

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

  // Filter qualifications based on active tab
  const filteredQualifications = qualificationsData.filter((qualification) => {
    if (activeTab === "pending") {
      return (
        qualification.status === "Pending" ||
        qualification.status === "In Progress" ||
        qualification.status === "Waiting for files" ||
        qualification.status === "Ready for qualification"
      )
    } else if (activeTab === "qualified") {
      return qualification.status === "Qualified"
    } else if (activeTab === "not-qualified") {
      return qualification.status === "Not Qualified"
    }
    return true
  })

  // Count qualifications by status
  const pendingCount = qualificationsData.filter(
    (q) =>
      q.status === "Pending" ||
      q.status === "In Progress" ||
      q.status === "Waiting for files" ||
      q.status === "Ready for qualification",
  ).length
  const qualifiedCount = qualificationsData.filter((q) => q.status === "Qualified").length
  const notQualifiedCount = qualificationsData.filter((q) => q.status === "Not Qualified").length

  return (
    <>
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
              <TableHead>Company</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Match Score</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQualifications.map((qualification) => (
              <TableRow
                key={qualification.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleQualificationClick(qualification)}
              >
                <TableCell className="font-medium">{qualification.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {qualification.company}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {qualification.owner}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {qualification.dueDate}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(qualification.status)}</TableCell>
                <TableCell>
                  <div className={`flex items-center gap-1 ${getScoreColor(qualification.matchScore)}`}>
                    {qualification.matchScore} ({qualification.matchPercentage}%)
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={(e) => handleDocumentButtonClick(e, qualification)}
                  >
                    <FileUp className="h-4 w-4" />
                    Documents {qualification.documents.length > 0 && `(${qualification.documents.length})`}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No {activeTab.replace("-", " ")} qualifications found</p>
        </div>
      )}

      {selectedQualification && (
        <DocumentUploadDialog
          open={documentDialogOpen}
          onOpenChange={setDocumentDialogOpen}
          qualificationId={selectedQualification.id}
          qualificationName={selectedQualification.name}
        />
      )}
    </>
  )
}
