"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Calendar, CheckCircle, XCircle, Info } from "lucide-react"

interface QualificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  qualificationId: string
  onStatusChange?: (id: string, status: string) => void
}

// Sample data - would be fetched from API in real implementation
const getQualificationDetails = (id: string) => {
  return {
    id,
    name: "Enterprise Software Implementation",
    company: "Acme Inc",
    companyId: "1",
    dueDate: "2023-12-15",
    priority: "High",
    status: "Pending",
    accountManager: "Roy",
    matchScore: "Good",
    matchPercentage: 85,
    overview:
      "Implementation of enterprise resource planning (ERP) software to streamline business operations and improve efficiency.",
    requirements: [
      {
        id: "1",
        name: "Experience with similar projects",
        description: "The company must have experience with similar ERP implementation projects.",
        status: "Qualified",
      },
      {
        id: "2",
        name: "Required certifications",
        description: "The company must have the required certifications for the ERP software.",
        status: "Pending",
      },
      {
        id: "3",
        name: "Financial stability",
        description: "The company must be financially stable.",
        status: "Qualified",
      },
      {
        id: "4",
        name: "Adequate resources",
        description: "The company must have adequate resources for the project.",
        status: "Not Qualified",
      },
      {
        id: "5",
        name: "Technology stack compatibility",
        description: "The company's technology stack must be compatible with the requirements.",
        status: "Qualified",
      },
    ],
    questions: [
      {
        id: "1",
        question: "Does the company have experience with similar projects?",
        answer: "Yes",
        notes: "The company has completed 5 similar ERP implementations in the past 2 years.",
      },
      {
        id: "2",
        question: "Does the company have the required certifications?",
        answer: "Pending",
        notes: "",
      },
      {
        id: "3",
        question: "Is the company financially stable?",
        answer: "Yes",
        notes: "Financial statements reviewed and approved.",
      },
      {
        id: "4",
        question: "Does the company have adequate resources for the project?",
        answer: "No",
        notes: "The company is currently understaffed for a project of this size.",
      },
      {
        id: "5",
        question: "Is the company's technology stack compatible with requirements?",
        answer: "Yes",
        notes: "Technology stack is fully compatible.",
      },
    ],
  }
}

export function QualificationDialog({ open, onOpenChange, qualificationId, onStatusChange }: QualificationDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const qualification = getQualificationDetails(qualificationId)
  const [finalDecision, setFinalDecision] = useState<"Qualified" | "Not Qualified" | null>(null)
  const [decisionNotes, setDecisionNotes] = useState("")

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

  const handleSave = () => {
    // Here you would save the qualification decision
    console.log("Saving qualification decision:", finalDecision, decisionNotes)

    // Update the qualification status if a final decision was made
    if (finalDecision && onStatusChange) {
      onStatusChange(qualification.id, finalDecision)

      // If the solicitation is qualified, move it to proposals
      if (finalDecision === "Qualified") {
        console.log(`Moving solicitation ${qualification.id} to proposals stage`)

        // In a real app, we would make an API call to update the status
        // For now, we'll just log it

        // Show a toast notification (in a real app)
        // toast({
        //   title: "Solicitation qualified",
        //   description: `${qualification.name} has been moved to proposals.`,
        // });
      }
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Qualification: {qualification.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Company:</span> {qualification.company}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Due Date:</span> {qualification.dueDate}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Priority:</span> {qualification.priority}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Account Manager:</span> {qualification.accountManager}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Match Score:</span> {qualification.matchScore} (
              {qualification.matchPercentage}%)
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Status:</span> {qualification.status}
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-2">Solicitation Overview</h3>
                <p className="text-sm">{qualification.overview}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-4">Qualification Decision</h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant={finalDecision === "Qualified" ? "default" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => setFinalDecision("Qualified")}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Qualified
                    </Button>

                    <Button
                      variant={finalDecision === "Not Qualified" ? "destructive" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => setFinalDecision("Not Qualified")}
                    >
                      <XCircle className="h-4 w-4" />
                      Not Qualified
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="decision-notes">Decision Notes</Label>
                    <Textarea
                      id="decision-notes"
                      placeholder="Enter notes about your qualification decision..."
                      value={decisionNotes}
                      onChange={(e) => setDecisionNotes(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-4">Qualification Requirements</h3>

                <div className="space-y-4">
                  {qualification.requirements.map((requirement) => (
                    <div key={requirement.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{requirement.name}</div>
                        <Select defaultValue={requirement.status}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Qualified">Qualified</SelectItem>
                            <SelectItem value="Not Qualified">Not Qualified</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-sm text-muted-foreground">{requirement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-4">Qualification Questions</h3>

                <div className="space-y-4">
                  {qualification.questions.map((question) => (
                    <div key={question.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{question.question}</div>
                        <Select defaultValue={question.answer}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select answer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="N/A">N/A</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 mt-2">
                        <Label htmlFor={`notes-${question.id}`}>Notes</Label>
                        <Textarea
                          id={`notes-${question.id}`}
                          placeholder="Enter notes..."
                          defaultValue={question.notes}
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Qualification</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
