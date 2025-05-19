"use client"

import { useState } from "react"
import { FileText, Trash2, Upload, Download, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProposalDocumentsProps {
  proposalId: string
}

// Sample data - would be fetched from API in real implementation
const documents = [
  {
    id: "1",
    name: "Proposal Draft v1.docx",
    uploadedAt: "2023-11-15",
    size: "2.4 MB",
    status: "Draft",
    version: "1.0",
    uploadedBy: "Roy",
  },
  {
    id: "2",
    name: "Proposal Draft v2.docx",
    uploadedAt: "2023-11-18",
    size: "2.8 MB",
    status: "In Review",
    version: "2.0",
    uploadedBy: "Roy",
  },
  {
    id: "3",
    name: "Technical Approach.docx",
    uploadedAt: "2023-11-20",
    size: "1.5 MB",
    status: "Draft",
    version: "1.0",
    uploadedBy: "Yonatan",
  },
  {
    id: "4",
    name: "Pricing Sheet.xlsx",
    uploadedAt: "2023-11-22",
    size: "0.8 MB",
    status: "Final",
    version: "1.0",
    uploadedBy: "Sarah",
  },
]

const templates = [
  {
    id: "1",
    name: "Executive Summary Template.docx",
    category: "Executive Summary",
    lastUsed: "2023-10-15",
    size: "1.2 MB",
  },
  {
    id: "2",
    name: "Technical Approach Template.docx",
    category: "Technical",
    lastUsed: "2023-10-20",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Pricing Template.xlsx",
    category: "Pricing",
    lastUsed: "2023-11-01",
    size: "0.5 MB",
  },
  {
    id: "4",
    name: "Past Performance Template.docx",
    category: "Past Performance",
    lastUsed: "2023-09-28",
    size: "1.4 MB",
  },
]

export function ProposalDocuments({ proposalId }: ProposalDocumentsProps) {
  const [activeTab, setActiveTab] = useState("documents")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Draft":
        return <Badge variant="default">Draft</Badge>
      case "In Review":
        return <Badge variant="secondary">In Review</Badge>
      case "Needs Revision":
        return <Badge variant="warning">Needs Revision</Badge>
      case "Final":
        return <Badge variant="success">Final</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="documents">Proposal Documents</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="mt-4 space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Proposal Documents</h3>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>

          <div className="border-2 border-dashed rounded-lg p-12 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Upload className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Drag & drop files</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop files here or click to browse your computer
              </p>
              <Button className="mt-4" variant="outline">
                Browse Files
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          {doc.name}
                        </div>
                      </TableCell>
                      <TableCell>{doc.version}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell>{doc.uploadedAt}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-4 space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Document Templates</h3>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Template
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          {template.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {template.lastUsed}
                        </div>
                      </TableCell>
                      <TableCell>{template.size}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Use Template
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
