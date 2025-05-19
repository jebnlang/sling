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
  Upload,
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

// Define version history interface
interface DocumentVersion {
  id: string;
  versionNumber: number;
  uploadedAt: string;
  uploadedBy: string;
  status: "Uploaded" | "Not Uploaded" | "Completed";
  notes?: string;
}

// Define document status types
type DocumentStatus =
  | "Uploaded"
  | "Not Uploaded"
  | "Completed"

// Define document interface
interface CriticalDocument {
  id: string
  name: string
  status: DocumentStatus
  lastUpdated: string
  updatedBy: string
  required?: boolean
  versionHistory: DocumentVersion[]
  currentVersion: number
}

export function ProposalWorkspace({ proposal }: ProposalWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [notes, setNotes] = useState("")
  const [draftDueDate, setDraftDueDate] = useState("2025-04-20")
  const [submissionDueDate, setSubmissionDueDate] = useState("2025-04-23")
  const [editingDraftDate, setEditingDraftDate] = useState(false)
  const [editingSubmissionDate, setEditingSubmissionDate] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<CriticalDocument | null>(null)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [uploadNotes, setUploadNotes] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [statusNotes, setStatusNotes] = useState("")
  const [selectedReviewStatus, setSelectedReviewStatus] = useState<DocumentStatus | null>(null)
  const [selectedSignatureStatus, setSelectedSignatureStatus] = useState<DocumentStatus | null>(null)

  // Sample data for critical documents - now with version history
  const [criticalDocuments, setCriticalDocuments] = useState<CriticalDocument[]>([
    {
      id: "doc1",
      name: "Detailed Service Approach and Experience",
      status: "Uploaded",
      lastUpdated: "2025-04-15",
      updatedBy: "Edward Ramirez",
      required: true,
      currentVersion: 3,
      versionHistory: [
        {
          id: "v1-doc1",
          versionNumber: 1,
          uploadedAt: "2025-04-10 09:15",
          uploadedBy: "Sarah Johnson",
          status: "Uploaded",
          notes: "Initial draft"
        },
        {
          id: "v2-doc1",
          versionNumber: 2,
          uploadedAt: "2025-04-12 14:30",
          uploadedBy: "Sarah Johnson",
          status: "Not Uploaded",
          notes: "Missing service details for high-rise buildings"
        },
        {
          id: "v3-doc1",
          versionNumber: 3,
          uploadedAt: "2025-04-15 10:45",
          uploadedBy: "Edward Ramirez",
          status: "Completed",
          notes: "Final version with all required details"
        }
      ]
    },
    {
      id: "doc2",
      name: "Bid Form with Pricing Details",
      status: "Uploaded",
      lastUpdated: "2025-04-14",
      updatedBy: "Sarah Johnson",
      required: true,
      currentVersion: 1,
      versionHistory: [
        {
          id: "v1-doc2",
          versionNumber: 1,
          uploadedAt: "2025-04-14 16:20",
          uploadedBy: "Sarah Johnson",
          status: "Uploaded",
          notes: "Initial pricing details"
        }
      ]
    },
    {
      id: "doc3",
      name: "Disclosure Questionnaire",
      status: "Not Uploaded",
      lastUpdated: "-",
      updatedBy: "-",
      required: true,
      currentVersion: 0,
      versionHistory: []
    },
    {
      id: "doc4",
      name: "Licenses, Insurance Certificates, and References",
      status: "Completed",
      lastUpdated: "2025-04-12",
      updatedBy: "Edward Ramirez",
      required: true,
      currentVersion: 2,
      versionHistory: [
        {
          id: "v1-doc4",
          versionNumber: 1,
          uploadedAt: "2025-04-08 11:30",
          uploadedBy: "Sarah Johnson",
          status: "Uploaded",
          notes: "Initial documentation"
        },
        {
          id: "v2-doc4",
          versionNumber: 2,
          uploadedAt: "2025-04-12 09:45",
          uploadedBy: "Edward Ramirez",
          status: "Completed",
          notes: "Updated with current insurance certificates"
        }
      ]
    },
    {
      id: "doc5",
      name: "Company Profile",
      status: "Completed",
      lastUpdated: "2025-04-10",
      updatedBy: "Edward Ramirez",
      required: false,
      currentVersion: 1,
      versionHistory: [
        {
          id: "v1-doc5",
          versionNumber: 1,
          uploadedAt: "2025-04-10 15:20",
          uploadedBy: "Edward Ramirez",
          status: "Completed",
          notes: "Standard company profile"
        }
      ]
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
      case "Completed":
        return "success"
      case "Not Uploaded":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Uploaded":
      case "Completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "Not Uploaded":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  // Check if all required documents are ready
  const allRequiredDocumentsReady = criticalDocuments
    .filter((doc) => doc.required)
    .every((doc) => doc.status === "Completed")

  // Function to update document status
  const updateDocumentStatus = (
    docId: string,
    statusType: "status",
    newStatus: DocumentStatus,
  ) => {
    const updatedDocuments = criticalDocuments.map((doc) => {
      if (doc.id === docId) {
        const updatedDoc = {
          ...doc,
          status: newStatus,
          lastUpdated: new Date().toLocaleDateString(),
          updatedBy: "Current User", // In a real app, this would be the current user's name
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
  const statusOptions: DocumentStatus[] = ["Uploaded", "Not Uploaded", "Completed"]

  // Add this function to handle opening the version history modal
  const handleViewVersionHistory = (document: CriticalDocument) => {
    setSelectedDocument(document);
    setShowVersionHistory(true);
  };

  // Add this function to handle opening the upload dialog
  const handleOpenUploadDialog = (document: CriticalDocument) => {
    setSelectedDocument(document);
    setUploadNotes("");
    setSelectedFile(null);
    setShowUploadDialog(true);
  };

  // Add this function to handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Add this function to handle document upload
  const handleUploadDocument = () => {
    if (!selectedDocument || !selectedFile) return;
    
    // Create a new version
    const newVersion = {
      id: `v${selectedDocument.currentVersion + 1}-${selectedDocument.id}`,
      versionNumber: selectedDocument.currentVersion + 1,
      uploadedAt: new Date().toLocaleString(),
      uploadedBy: "Current User", // In a real app, this would be the current user's name
      status: "Uploaded" as const,
      notes: uploadNotes || undefined
    };
    
    // Update the document with the new version
    const updatedDocuments = criticalDocuments.map(doc => {
      if (doc.id === selectedDocument.id) {
        return {
          ...doc,
          status: "Uploaded" as DocumentStatus,
          currentVersion: doc.currentVersion + 1,
          versionHistory: [...doc.versionHistory, newVersion],
          lastUpdated: new Date().toLocaleDateString(),
          updatedBy: "Current User" // In a real app, this would be the current user's name
        };
      }
      return doc;
    });
    
    setCriticalDocuments(updatedDocuments);
    setShowUploadDialog(false);
    
    // Show toast notification
    toast({
      title: "Document uploaded",
      description: `Version ${newVersion.versionNumber} of ${selectedDocument.name} has been uploaded successfully.`,
    });
  };

  // Add this function to handle opening the status dialog
  const handleOpenStatusDialog = (document: CriticalDocument) => {
    setSelectedDocument(document);
    setStatusNotes("");
    setSelectedReviewStatus(document.status);
    setSelectedSignatureStatus(document.status);
    setShowStatusDialog(true);
  };

  // Add this function to handle updating document status with notes
  const handleUpdateDocumentStatus = () => {
    if (!selectedDocument || (!selectedReviewStatus && !selectedSignatureStatus)) return;

    const updatedDocuments = criticalDocuments.map((doc) => {
      if (doc.id === selectedDocument.id) {
        const updatedDoc = {
          ...doc,
          ...(selectedReviewStatus && { status: selectedReviewStatus }),
          ...(selectedSignatureStatus && { status: selectedSignatureStatus }),
          lastUpdated: new Date().toLocaleDateString(),
          updatedBy: "Current User", // In a real app, this would be the current user's name
        };

        // Auto-update submission status if all other statuses are good
        const isUploadGood = updatedDoc.status === "Completed";

        if (isUploadGood) {
          updatedDoc.status = "Completed";
        } else {
          updatedDoc.status = "Not Uploaded";
        }

        // Add status update to version history if there are notes
        if (statusNotes && updatedDoc.versionHistory.length > 0) {
          const currentVersion = updatedDoc.versionHistory[updatedDoc.versionHistory.length - 1];
          
          // Create an updated version with the same version number but updated status
          const updatedVersion = {
            ...currentVersion,
            status: selectedReviewStatus === "Completed" ? "Completed" as const : 
                   selectedReviewStatus === "Not Uploaded" ? "Not Uploaded" as const : 
                   currentVersion.status,
            notes: `${currentVersion.notes || ""}\n\nStatus Update (${new Date().toLocaleString()}): ${statusNotes}`
          };
          
          updatedDoc.versionHistory = [
            ...updatedDoc.versionHistory.slice(0, -1),
            updatedVersion
          ];
        }

        return updatedDoc;
      }
      return doc;
    });

    setCriticalDocuments(updatedDocuments);
    setShowStatusDialog(false);

    // Show toast notification
    toast({
      title: "Status updated",
      description: `Document status has been updated successfully.`,
    });
  };

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
                <TableHead>Version</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-center">Actions</TableHead>
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
                    <Select 
                      defaultValue={doc.status}
                      onValueChange={(value) => {
                        const updatedDocuments = criticalDocuments.map((d) => {
                          if (d.id === doc.id) {
                            return {
                              ...d,
                              status: value as DocumentStatus,
                              lastUpdated: new Date().toLocaleDateString(),
                              updatedBy: "Current User"
                            };
                          }
                          return d;
                        });
                        setCriticalDocuments(updatedDocuments);
                      }}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Uploaded">Uploaded</SelectItem>
                        <SelectItem value="Not Uploaded">Not Uploaded</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {doc.currentVersion > 0 ? (
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => handleViewVersionHistory(doc)}>
                        v{doc.currentVersion}
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({doc.versionHistory.length} {doc.versionHistory.length === 1 ? 'version' : 'versions'})
                        </span>
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{doc.lastUpdated}</span>
                      {doc.updatedBy !== "-" && (
                        <span className="text-xs text-muted-foreground ml-1">by {doc.updatedBy}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewVersionHistory(doc)}
                        disabled={doc.versionHistory.length === 0}>
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View Versions</span>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleOpenUploadDialog(doc)}>
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Upload</span>
                      </Button>
                    </div>
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

      {/* Version History Dialog */}
      {showVersionHistory && selectedDocument && (
        <Dialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Version History - {selectedDocument.name}</DialogTitle>
              <DialogDescription>
                All versions of this document with upload and review history
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {selectedDocument.versionHistory.length > 0 ? (
                <div className="space-y-4">
                  {[...selectedDocument.versionHistory].reverse().map((version) => (
                    <div key={version.id} className="border rounded-md p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Version {version.versionNumber}</span>
                        </div>
                        <Badge 
                          variant={
                            version.status === "Completed" ? "success" :
                            "default"
                          }
                        >
                          {version.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Uploaded by {version.uploadedBy} on {version.uploadedAt}
                      </div>
                      {version.notes && (
                        <div className="bg-muted/50 p-2 rounded text-sm">
                          <span className="font-medium">Notes: </span>{version.notes}
                        </div>
                      )}
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No versions have been uploaded yet
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowVersionHistory(false)}>
                Close
              </Button>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload New Version
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Document Upload Dialog */}
      {showUploadDialog && selectedDocument && (
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload New Version</DialogTitle>
              <DialogDescription>
                Upload a new version of {selectedDocument.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Document File</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  {selectedFile ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedFile.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mx-auto">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Drag and drop a file here or click to browse
                      </div>
                      <Input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileSelect} 
                      />
                      <Button variant="outline" size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
                        Browse Files
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="version-notes">Version Notes (Optional)</Label>
                <Textarea
                  id="version-notes"
                  placeholder="Add notes about this version..."
                  value={uploadNotes}
                  onChange={(e) => setUploadNotes(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Document Details</h4>
                <div className="bg-muted/50 p-3 rounded-md space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Version:</span>
                    <span>v{selectedDocument.currentVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New Version:</span>
                    <span>v{selectedDocument.currentVersion + 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{selectedDocument.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUploadDocument} disabled={!selectedFile}>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Document Status Dialog */}
      {showStatusDialog && selectedDocument && (
        <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Manage Document Status</DialogTitle>
              <DialogDescription>
                Update the status of {selectedDocument.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Document Information</h4>
                  <Badge variant={selectedDocument.status === "Completed" ? "success" : "destructive"}>
                    {selectedDocument.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Version:</span>
                    <span>v{selectedDocument.currentVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{selectedDocument.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Updated By:</span>
                    <span>{selectedDocument.updatedBy}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="review-status">Review Status</Label>
                  <Select 
                    defaultValue={selectedDocument.status}
                    onValueChange={(value) => setSelectedReviewStatus(value as DocumentStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select review status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Uploaded">Uploaded</SelectItem>
                      <SelectItem value="Not Uploaded">Not Uploaded</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Set to "Uploaded" when the document has been reviewed and approved.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status-notes">Status Update Notes (Optional)</Label>
                <Textarea
                  id="status-notes"
                  placeholder="Add notes about this status update..."
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  These notes will be added to the version history.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateDocumentStatus}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

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
