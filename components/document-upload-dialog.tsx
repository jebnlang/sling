"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileUp, File, X, FileText, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DocumentUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  qualificationId: string
  qualificationName: string
  documents?: Document[]
}

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  category: string
}

export function DocumentUploadDialog({
  open,
  onOpenChange,
  qualificationId,
  qualificationName,
  documents: initialDocuments = [],
}: DocumentUploadDialogProps) {
  // Initialize documents state only once with initialDocuments
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [isDragging, setIsDragging] = useState(false)

  // Remove the problematic useEffect that was causing the infinite loop

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

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
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
        return <File className="h-4 w-4 text-gray-500" />
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Qualification Documents</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm">
            Documents for <span className="font-medium">{qualificationName}</span>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">Drag and drop files here</p>
            <p className="text-xs text-muted-foreground mt-1">or</p>
            <div className="mt-2">
              <Button variant="default" size="sm" className="mx-auto" asChild>
                <label htmlFor="file-upload">
                  Browse files
                  <input id="file-upload" type="file" className="sr-only" onChange={handleFileInputChange} />
                </label>
              </Button>
            </div>
          </div>

          {documents.length > 0 ? (
            <div className="border rounded-md">
              <div className="p-3 border-b bg-muted/50">
                <h3 className="text-sm font-medium">Uploaded Documents</h3>
              </div>
              <div className="divide-y">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-medium">{doc.type}</span>
                          <span className="text-xs text-muted-foreground">{doc.size}</span>
                          <span className="text-xs text-muted-foreground">{doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No documents uploaded yet</p>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
