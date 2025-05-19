"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  category: string
}

interface SolicitationDocumentsProps {
  solicitationId: string
  solicitationName: string
}

export function SolicitationDocuments({ solicitationId, solicitationName }: SolicitationDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([
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
    {
      id: "3",
      name: "Pricing Template.xlsx",
      type: "XLSX",
      size: "0.8 MB",
      uploadDate: "2023-10-17",
      category: "Pricing",
    },
    {
      id: "4",
      name: "Draft Proposal v1.pdf",
      type: "PDF",
      size: "4.7 MB",
      uploadDate: "2023-11-05",
      category: "Proposal",
    },
    {
      id: "5",
      name: "Q&A Responses.pdf",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: "2023-11-10",
      category: "Clarification",
    },
  ])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    // In a real implementation, you would handle the file upload here
    // For now, we'll just simulate adding a new document
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      const newDocument: Document = {
        id: `${documents.length + 1}`,
        name: file.name,
        type: file.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split("T")[0],
        category: "Original", // Default category
      }

      setDocuments([...documents, newDocument])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, you would handle the file upload here
    // For now, we'll just simulate adding a new document
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const newDocument: Document = {
        id: `${documents.length + 1}`,
        name: file.name,
        type: file.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split("T")[0],
        category: "Original", // Default category
      }

      setDocuments([...documents, newDocument])
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4 text-red-500" />
      case "DOCX":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "XLSX":
        return <FileText className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Original":
        return <Badge className="bg-gray-800 text-white">Original</Badge>
      case "Requirements":
        return <Badge className="bg-blue-600 text-white">Requirements</Badge>
      case "Pricing":
        return <Badge className="bg-green-600 text-white">Pricing</Badge>
      case "Proposal":
        return <Badge className="bg-green-500 text-white">Proposal</Badge>
      case "Clarification":
        return <Badge className="bg-amber-500 text-white">Clarification</Badge>
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Documents</h2>
          <p className="text-sm text-muted-foreground">Documents related to {solicitationName}</p>
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">RFP Documents</h3>

        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">Drag & drop files</p>
          <p className="text-xs text-muted-foreground mt-1">
            Drag and drop files here or click to browse your computer
          </p>
          <div className="mt-2">
            <Button variant="outline" size="sm" className="mx-auto" asChild>
              <label htmlFor="file-upload-detail">
                Browse Files
                <input id="file-upload-detail" type="file" className="sr-only" onChange={handleFileInputChange} />
              </label>
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <div className="grid grid-cols-5 gap-4 p-3 border-b bg-muted/50 text-sm font-medium">
            <div>Document Name</div>
            <div>Category</div>
            <div>Uploaded</div>
            <div>Size</div>
            <div></div>
          </div>
          <div className="divide-y">
            {documents.map((doc) => (
              <div key={doc.id} className="grid grid-cols-5 gap-4 p-3 items-center">
                <div className="flex items-center gap-2">
                  {getFileIcon(doc.type)}
                  <span className="text-sm font-medium">{doc.name}</span>
                </div>
                <div>{getCategoryBadge(doc.category)}</div>
                <div className="text-sm text-muted-foreground">{doc.uploadDate}</div>
                <div className="text-sm text-muted-foreground">{doc.size}</div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
