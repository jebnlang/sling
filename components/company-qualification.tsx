"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

// Sample data - would be fetched from API in real implementation
const initialQuestions = [
  {
    id: "1",
    question: "Does the company have experience with similar projects?",
    status: "Qualified",
  },
  {
    id: "2",
    question: "Does the company have the required certifications?",
    status: "Pending",
  },
  {
    id: "3",
    question: "Is the company financially stable?",
    status: "Qualified",
  },
  {
    id: "4",
    question: "Does the company have adequate resources for the project?",
    status: "Not Qualified",
  },
  {
    id: "5",
    question: "Is the company's technology stack compatible with requirements?",
    status: "Qualified",
  },
]

interface CompanyQualificationProps {
  companyId: string
}

export function CompanyQualification({ companyId }: CompanyQualificationProps) {
  const [qualificationQuestions, setQualificationQuestions] = useState(initialQuestions)
  const { toast } = useToast()
  
  const handleStatusChange = (questionId: string, newStatus: string) => {
    setQualificationQuestions(
      qualificationQuestions.map((q) => {
        if (q.id === questionId) {
          return { ...q, status: newStatus }
        }
        return q
      })
    )
    
    toast({
      title: "Status updated",
      description: "Successfully updated qualification status",
    })
    
    // In a real application, you would also send this data to your backend
    // e.g., api.updateQualificationStatus(companyId, questionId, newStatus)
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Qualification Questions</h3>
        <Button>Add Question</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60%]">Question</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qualificationQuestions.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.question}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell className="text-right">
                <Select 
                  defaultValue={item.status}
                  onValueChange={(value) => handleStatusChange(item.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Not Qualified">Not Qualified</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const getVariant = (status: string) => {
    switch (status) {
      case "Qualified":
        return "success"
      case "Not Qualified":
        return "destructive"
      case "Pending":
        return "outline"
      default:
        return "outline"
    }
  }

  return <Badge variant={getVariant(status) as any}>{status}</Badge>
}
