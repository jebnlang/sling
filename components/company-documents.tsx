"use client"

import { useState } from "react"
import { FileText, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

// Sample data - would be fetched from API in real implementation
const initialDocuments = [
  {
    id: "1",
    name: "Company Profile.pdf",
    uploadedAt: "2023-10-15",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Financial Statement.xlsx",
    uploadedAt: "2023-10-12",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Technical Capabilities.docx",
    uploadedAt: "2023-10-10",
    size: "3.2 MB",
  },
  {
    id: "4",
    name: "Past Projects.pdf",
    uploadedAt: "2023-10-05",
    size: "5.1 MB",
  },
]

interface CompanyDocumentsProps {
  companyId: string
}

export function CompanyDocuments({ companyId }: CompanyDocumentsProps) {
  const [documents, setDocuments] = useState(initialDocuments)
  const { toast } = useToast()
  
  const handleDownload = (docId: string, docName: string) => {
    // In a real app, this would initiate a file download
    toast({
      title: "Downloading file",
      description: `Starting download of ${docName}`,
    })
    
    // Mock API call: api.downloadDocument(companyId, docId)
  }
  
  const handleDelete = (docId: string, docName: string) => {
    // Remove the document from the state
    setDocuments(documents.filter(doc => doc.id !== docId))
    
    toast({
      title: "Document deleted",
      description: `Successfully deleted ${docName}`,
    })
    
    // In a real application, you would also send this data to your backend
    // e.g., api.deleteDocument(companyId, docId)
  }
  
  const handleUpload = () => {
    // In a real app, this would open a file dialog
    toast({
      title: "Upload feature",
      description: "File upload functionality would be implemented here",
    })
    
    // Mock API call: api.uploadDocument(companyId, file)
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Company Documents</h3>
        <Button onClick={handleUpload}>
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
          <Button className="mt-4" variant="outline" onClick={handleUpload}>
            Browse Files
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document Name</TableHead>
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
              <TableCell>{doc.uploadedAt}</TableCell>
              <TableCell>{doc.size}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(doc.id, doc.name)}
                  >
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleDelete(doc.id, doc.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
