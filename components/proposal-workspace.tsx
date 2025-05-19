"use client"

import { useState } from "react"
import {
  User,
  FileText,
  Edit,
  Download,
  ExternalLink,
  Plus,
  Check,
  X,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

interface ProposalWorkspaceProps {
  proposal: {
    id: string
    name: string
    rfpId: string
    rfpNumber: string
    rfpName: string
    company: string
    companyId: string
    dueDate: string
    status: string
    progress: number
    writer: string
    owner: string
    lastUpdated: string
  }
}

// Define document status types
type DocumentStatus =
  | "Uploaded"
  | "Not Uploaded"
  | "Reviewed"
  | "Not Reviewed"
  | "Signed"
  | "Not Signed"
  | "Not Required"
  | "Ready"
  | "Not Ready"

// Define document interface
interface CriticalDocument {
  id: string
  name: string
  uploadStatus: DocumentStatus
  reviewStatus: DocumentStatus
  signatureStatus: DocumentStatus
  submissionStatus: DocumentStatus
  lastUpdated: string
  updatedBy: string
}

export function ProposalWorkspace({ proposal }: ProposalWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [notes, setNotes] = useState("")
  const [draftDueDate, setDraftDueDate] = useState("2025-04-20")
  const [submissionDueDate, setSubmissionDueDate] = useState("2025-04-23")
  const [editingDraftDate, setEditingDraftDate] = useState(false)
  const [editingSubmissionDate, setEditingSubmissionDate] = useState(false)

  // Sample data for critical documents
  const [criticalDocuments, setCriticalDocuments] = useState<CriticalDocument[]>([
    {
      id: "doc1",
      name: "Detailed Service Approach and Experience",
      uploadStatus: "Uploaded",
      reviewStatus: "Reviewed",
      signatureStatus: "Signed",
      submissionStatus: "Ready",
      lastUpdated: "2025-04-15",
      updatedBy: "Edward Ramirez",
    },
    {
      id: "doc2",
      name: "Bid Form with Pricing Details",
      uploadStatus: "Uploaded",
      reviewStatus: "Not Reviewed",
      signatureStatus: "Not Signed",
      submissionStatus: "Not Ready",
      lastUpdated: "2025-04-14",
      updatedBy: "Sarah Johnson",
    },
    {
      id: "doc3",
      name: "Disclosure Questionnaire",
      uploadStatus: "Not Uploaded",
      reviewStatus: "Not Reviewed",
      signatureStatus: "Not Signed",
      submissionStatus: "Not Ready",
      lastUpdated: "-",
      updatedBy: "-",
    },
    {
      id: "doc4",
      name: "Licenses, Insurance Certificates, and References",
      uploadStatus: "Uploaded",
      reviewStatus: "Reviewed",
      signatureStatus: "Not Required",
      submissionStatus: "Ready",
      lastUpdated: "2025-04-12",
      updatedBy: "Edward Ramirez",
    },
    {
      id: "doc5",
      name: "Company Profile",
      uploadStatus: "Uploaded",
      reviewStatus: "Reviewed",
      signatureStatus: "Not Required",
      submissionStatus: "Ready",
      lastUpdated: "2025-04-10",
      updatedBy: "Edward Ramirez",
    },
  ])

  // Sample data based on screenshots
  const requiredDocuments = [
    {
      name: "Detailed Service Approach and Experience",
      status: "Not Uploaded",
      version: 0,
      clientSignature: true,
      notaryApproval: false,
    },
    {
      name: "Bid Form with Pricing Details",
      status: "Not Uploaded",
      version: 0,
      clientSignature: true,
      notaryApproval: false,
    },
    {
      name: "Disclosure Questionnaire",
      status: "Not Uploaded",
      version: 0,
      clientSignature: false,
      notaryApproval: false,
    },
    {
      name: "Licenses, Insurance Certificates, and References",
      status: "Not Uploaded",
      version: 0,
      clientSignature: false,
      notaryApproval: false,
    },
  ]

  const solicitationDocuments = [
    {
      name: "Sample_Services_Agreement~17.pdf",
      date: "4/2/2025",
    },
    {
      name: "256022_Bid_Manual.pdf",
      date: "4/2/2025",
    },
  ]

  const companyDocuments = [
    { name: "Quote High Rise window clean (1).pdf", date: "3/10/2025" },
    { name: "Zach Long (1).docx", date: "3/10/2025" },
    { name: "Original Articles of Incororpooration (1).pdf", date: "3/10/2025" },
    { name: "James Vanderhorst (1).docx", date: "3/10/2025" },
    { name: "SunBiz Clean Up Group (1).pdf", date: "3/10/2025" },
    { name: "Clean Up Group - Comapny information.docx", date: "3/10/2025" },
    { name: "Quote Cypress Cove (1).pdf", date: "3/10/2025" },
    { name: "Sheila Rollins - Resume (2).pdf", date: "3/10/2025" },
    { name: "Resume 2025 (1).doc", date: "3/10/2025" },
  ]

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    const today = new Date()
    const dueDate = new Date(proposal.dueDate)
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? `${diffDays} days` : "Overdue"
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Uploaded":
      case "Reviewed":
      case "Signed":
      case "Ready":
        return "success"
      case "Not Uploaded":
      case "Not Reviewed":
      case "Not Signed":
      case "Not Ready":
        return "destructive"
      case "Not Required":
        return "outline"
      default:
        return "default"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Uploaded":
      case "Reviewed":
      case "Signed":
      case "Ready":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "Not Uploaded":
      case "Not Reviewed":
      case "Not Signed":
      case "Not Ready":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Not Required":
        return <Check className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  // Check if all required documents are ready
  const allRequiredDocumentsReady = criticalDocuments
    .filter((doc) => doc.required)
    .every((doc) => doc.submissionStatus === "Ready")

  // Function to update document status
  const updateDocumentStatus = (
    docId: string,
    statusType: "uploadStatus" | "reviewStatus" | "signatureStatus" | "submissionStatus",
    newStatus: DocumentStatus,
  ) => {
    const updatedDocuments = criticalDocuments.map((doc) => {
      if (doc.id === docId) {
        const updatedDoc = {
          ...doc,
          [statusType]: newStatus,
          lastUpdated: new Date().toLocaleDateString(),
          updatedBy: "Current User", // In a real app, this would be the current user's name
        }

        // Auto-update submission status if all other statuses are good
        if (statusType !== "submissionStatus") {
          const isUploadGood = updatedDoc.uploadStatus === "Uploaded"
          const isReviewGood = updatedDoc.reviewStatus === "Reviewed"
          const isSignatureGood =
            updatedDoc.signatureStatus === "Signed" || updatedDoc.signatureStatus === "Not Required"

          if (isUploadGood && isReviewGood && isSignatureGood) {
            updatedDoc.submissionStatus = "Ready"
          } else {
            updatedDoc.submissionStatus = "Not Ready"
          }
        }

        return updatedDoc
      }
      return doc
    })

    setCriticalDocuments(updatedDocuments)

    // Show toast notification
    toast({
      title: "Status updated",
      description: `Document status has been updated successfully.`,
    })
  }

  // Available status options for each status type
  const uploadStatusOptions: DocumentStatus[] = ["Uploaded", "Not Uploaded"]
  const reviewStatusOptions: DocumentStatus[] = ["Reviewed", "Not Reviewed"]
  const signatureStatusOptions: DocumentStatus[] = ["Signed", "Not Signed", "Not Required"]
  const submissionStatusOptions: DocumentStatus[] = ["Ready", "Not Ready"]

  return (
    <div className="space-y-6">
      {/* Writer Assignment Header */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold">Writer Assignments</h2>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-bold">
                    {proposal.company} - {proposal.rfpNumber} - {proposal.rfpName}
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Draft Due Date</h3>
                  <Button variant="ghost" size="sm" onClick={() => setEditingDraftDate(!editingDraftDate)}>
                    <Edit className="h-3 w-3" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
                {editingDraftDate ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      value={draftDueDate}
                      onChange={(e) => setDraftDueDate(e.target.value)}
                      className="h-8"
                    />
                    <Button size="sm" variant="ghost" onClick={() => setEditingDraftDate(false)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <p>April 20, 2025</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Submission Due Date</h3>
                  <Button variant="ghost" size="sm" onClick={() => setEditingSubmissionDate(!editingSubmissionDate)}>
                    <Edit className="h-3 w-3" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
                {editingSubmissionDate ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      value={submissionDueDate}
                      onChange={(e) => setSubmissionDueDate(e.target.value)}
                      className="h-8"
                    />
                    <Button size="sm" variant="ghost" onClick={() => setEditingSubmissionDate(false)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <p>April 23, 2025</p>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Days Remaining</h3>
                <p>{calculateDaysRemaining()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Select defaultValue="drafting">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drafting">Drafting</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="revision">Needs Revision</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Proposal Writer</h3>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{proposal.writer}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Proposal Owner</h3>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{proposal.owner}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Document Status Section */}
      <Card className="border-2 border-amber-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Critical Document Status</CardTitle>
              <CardDescription>
                Ensure all required documents are uploaded, reviewed, signed, and ready for submission
              </CardDescription>
            </div>
            <div>
              {allRequiredDocumentsReady ? (
                <Badge variant="success" className="text-sm px-3 py-1">
                  All Required Documents Ready
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-sm px-3 py-1">
                  Missing Required Documents
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-center">Reviewed</TableHead>
                <TableHead className="text-center">Signature</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criticalDocuments.map((doc) => (
                <TableRow key={doc.id} className={doc.required ? "" : "opacity-70"}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {doc.name}
                      {doc.required && (
                        <Badge variant="outline" className="ml-1">
                          Required
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${doc.uploadStatus === "Uploaded" ? "text-green-600" : "text-red-600"}`}
                    >
                      {doc.uploadStatus === "Uploaded" ? "Uploaded" : "Not Uploaded"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{doc.lastUpdated}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={doc.reviewStatus === "Reviewed"}
                      onCheckedChange={(checked) => {
                        updateDocumentStatus(doc.id, "reviewStatus", checked ? "Reviewed" : "Not Reviewed")
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={doc.signatureStatus === "Signed"}
                      onCheckedChange={(checked) => {
                        updateDocumentStatus(doc.id, "signatureStatus", checked ? "Signed" : "Not Signed")
                      }}
                      disabled={doc.signatureStatus === "Not Required"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-start">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Document
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="bg-muted/50 rounded-lg p-1">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="client-info">Client Info</TabsTrigger>
            <TabsTrigger value="submission">Submission</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{proposal.rfpName}</h2>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{proposal.rfpNumber}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Posted Date: March 27, 2025</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Due Date: {proposal.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Days Remaining: {calculateDaysRemaining()}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span>Issued by: City of Salem</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>State: OR</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>POC Name: Kitty Lam</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="h-9">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View External Solicitation Page
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">RFP Summary</h3>
                    <p className="mt-2 text-muted-foreground">
                      This solicitation invites proposals for providing services under a comprehensive Services
                      Agreement as well as competitive bids for window washing and pressure washing services for the
                      City of Salem, Oregon. The documents include detailed requirements regarding insurance, compliance
                      with state and federal laws, nondiscrimination, performance standards, and quality control.
                      Bidders are required to meet rigorous technical and administrative requirements with clear
                      demonstration of past experience and adherence to city policies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Core Requirements</h3>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Maintain liability insurance with a minimum limit of $2,000,000 per occurrence.</li>
                      <li>
                        Comply with all applicable Oregon tax, safety, and nondiscrimination laws and regulations.
                      </li>
                      <li>
                        Demonstrate a minimum of five years' experience in professional pressure washing and window
                        cleaning, including work on city or municipal properties.
                      </li>
                      <li>
                        Submit bids electronically via the designated Equity Hub Bid Locker with complete and signed bid
                        forms.
                      </li>
                      <li>
                        Provide all required supporting documents including technical proposals, cost breakdowns, and
                        contractor disclosure responses.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Buyer Priorities</h3>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Strict adherence to insurance, safety, and nondiscrimination policies.</li>
                      <li>Timely and complete electronic submission through the specified portal.</li>
                      <li>Clear demonstration of relevant past experience and technical capability.</li>
                      <li>
                        Compliance with the City's detailed quality and performance standards, including emergency
                        response and scheduling requirements.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Key Dates</h3>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li>
                        <span className="font-medium">Bid Closing Date:</span> April 23, 2025 11:00 a.m. (Local Time)
                        (256022_Bid_Manual.pdf - Invitation to Bid)
                      </li>
                      <li>
                        <span className="font-medium">Questions/Clarification Deadline:</span> April 16, 2025 at 5:00 PM
                        (Local Time) (256022_Bid_Manual.pdf - Work Description/Inquiry Section)
                      </li>
                      <li>
                        <span className="font-medium">Substitution Request Deadline:</span> April 16, 2025 at 5:00 PM
                        (Local Time) (256022_Bid_Manual.pdf - Substitution Request Form)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Notes</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Requirement Notes (2)</h4>
                      </div>
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">General Notes</h4>
                        <Button variant="outline" size="sm">
                          Add Note
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground italic">No general notes added yet.</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Solicitation Documents</h3>
                    <div className="mt-2 space-y-2">
                      {solicitationDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{doc.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{doc.date}</span>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Client Info Tab */}
        <TabsContent value="client-info" className="mt-4 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Company Profile</h2>
                  <Button variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Company Google Drive Folder
                  </Button>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="general-info">
                    <AccordionTrigger className="text-lg font-semibold">General Company Information</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-muted-foreground">Company Name:</h4>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                            <p>Clean Up Group International Inc.</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-muted-foreground">Address:</h4>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                            <p>1497 Rail Head Boulevard, Naples, FL, 34110, United States</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-muted-foreground">Company Base:</h4>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                            <p>South Florida</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-muted-foreground">US Office:</h4>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                            <p>Yes</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-muted-foreground">Contact Email:</h4>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                            <p>sales@cleanupgroup.com</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-muted-foreground">Contact Phone Number:</h4>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </div>
                            <p>(239) 455-2225</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-muted-foreground">Website URL:</h4>
                            </div>
                            <p>cleanupgroup.com</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="basic-matching">
                    <AccordionTrigger className="text-lg font-semibold">Basic Matching Content</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-muted-foreground">Brief Overview:</h4>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                          <p>
                            Clean Up Group International Inc. specializes in full-service exterior cleaning and
                            maintenance, providing services to both commercial and residential properties. They pride
                            themselves on their reputation and residential properties. They pride themselves on their
                            reputation as South Florida's largest and most successful exterior cleaning company.
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-muted-foreground">Detailed Description:</h4>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                          <p>
                            With over 10 years of experience, Clean Up Group offers a wide array of cleaning services
                            for almost every type of exterior surface, including roofs, windows, driveways, and more.
                            They operate with an extensive fleet of equipment, trained technicians, and a guarantee of
                            customer satisfaction. The company is fully insured and complies with OSHA safety standards.
                            In addition to their operations in South Florida, they opened a new location in Santa Fe,
                            New Mexico, in 2021.
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-muted-foreground">Product List:</h4>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                          <ul className="list-disc list-inside">
                            <li>Roof Cleaning</li>
                            <li>Pressure Washing</li>
                            <li>Window Cleaning</li>
                            <li>Driveway Cleaning</li>
                            <li>Sidewalk Cleaning</li>
                            <li>Parking Lot Cleaning</li>
                            <li>Pool Deck Cleaning</li>
                            <li>Gutter Cleaning</li>
                            <li>Statuary and Decorative Fixtures Cleaning</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="detailed-matching">
                    <AccordionTrigger className="text-lg font-semibold">Detailed Matching Content</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-muted-foreground">General information:</h4>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                          <p className="whitespace-pre-line">
                            • Incorporated in Florida as a Profit Corporation on March 12, 2014 • Active status with a
                            reinstatement dated 12/04/2015 and annual reports filed for 2022, 2023, and 2024 •
                            Registered Agent: Susan Sumner • Registered in eVA for electronic submission • Not debarred
                            by the Commonwealth of Virginia • Does not operate in California and New York •
                            Headquarters/Main Office located at 1497 Rail Head Blvd, Naples, FL 34110 • Telephone:
                            239-455-2225 • Website: www.cleanupgroup.com • Operated under experienced leadership with
                            expertise in high-rise cleaning, window washing, and drone operations
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-muted-foreground">Product Descriptions:</h4>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                          <p className="whitespace-pre-line">
                            • Provides complete cleaning solutions for various exterior surfaces across commercial and
                            residential properties. • Delivers a range of cleaning methods including power washing, soft
                            washing, pressure cleaning, and power sweeping for parking garages and multi-building
                            campuses. • Offers specialized soft wash cleaning for roofs and building exteriors with
                            services from roofline to ground, applicable to residential, high-rise, administration
                            buildings, villas, and specialized areas (e.g., Captains Cove). • Specializes in window
                            cleaning with customizable and separately priced options, including high-rise exterior
                            window cleaning, removal/cleaning/re-installation of screens, and services for penthouse,
                            guest suite, lobby, and common areas. • Provides high-rise cleaning through advanced
                            techniques such as rope-access, aerial lifts, and drone-operated cleaning for hard-to-reach
                            areas. • Performs maintenance tasks including gutter cleaning, debris removal, striping, and
                            pressure cleaning of sidewalks, road gutters, composite boardwalks, and railings. • Serves a
                            diverse clientele including residential, commercial, HOAs, government buildings, educational
                            institutions, automotive dealerships, hospitals, offices, and strip malls. • Commits to
                            sustainable and eco-friendly practices with integrated wastewater collection, recycling
                            systems, eco-friendly detergents (e.g., Dawn Pro III), and biocide/mildew prevention
                            including Citra-Shield applications on sidewalks, curbs, and driveways. • Implements plant,
                            turf, and vegetation protection measures during cleaning processes. • Follows a structured
                            Change Control Policy to manage modifications in scope and pricing, while upholding strict
                            safety protocols.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="company-documents">
                    <AccordionTrigger className="text-lg font-semibold">Company Documents</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <h4 className="font-medium">Uploaded Documents</h4>
                        <div className="space-y-2">
                          {companyDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span>{doc.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{doc.date}</span>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Submission Tab */}
        <TabsContent value="submission" className="mt-4 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Submission Info</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">How to Submit</h3>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Proposals must be submitted electronically through Equity Hub's Bid Locker portal at
                      https://bidlocker.us/a/salem_or/BidLocker. Bidders should ensure that all documents are uploaded
                      in the required format.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Submission Notes & Feedback</h3>
                    <p className="mt-2 text-muted-foreground">
                      All bids must be clearly typed or legibly handwritten using indelible ink. Bidders are advised to
                      complete the submission at least one day in advance to avoid any technical issues. Late
                      submissions will be rejected without exception.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Submission Deadline</h3>
                    <p className="mt-2 text-muted-foreground">April 23, 2025 11:00 a.m. (Local Time)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Required Documents</h3>
                    <p className="text-sm text-muted-foreground">
                      Documents without uploaded files can be deleted during editing
                    </p>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Client Signature</TableHead>
                        <TableHead>Notary Approval</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requiredDocuments.map((doc, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{doc.name}</TableCell>
                          <TableCell>
                            <Badge variant={doc.status === "Uploaded" ? "success" : "default"}>{doc.status}</Badge>
                          </TableCell>
                          <TableCell>{doc.version}</TableCell>
                          <TableCell>
                            {doc.clientSignature ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </TableCell>
                          <TableCell>
                            {doc.notaryApproval ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex justify-start">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Document
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getStatusVariant(status: string) {
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
