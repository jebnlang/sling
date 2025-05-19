"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SolicitationInfo } from "@/components/solicitation-info"
import { SolicitationTimeline } from "@/components/solicitation-timeline"
import { SolicitationRequirements } from "@/components/solicitation-requirements"
import { SolicitationDocuments } from "@/components/solicitation-documents"
import { SolicitationChat } from "@/components/solicitation-chat"
import { ArrowLeft, Building } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

// This would normally be fetched from an API
const getSolicitation = (id: string) => {
  return {
    id,
    name: "Enterprise Software Implementation",
    dueDate: "2023-12-15",
    status: "Drafting",
    company: "Acme Inc",
    companyId: "1",
    value: "$250,000",
    type: "Solicitation",
    baseType: "Software Implementation",
    summary:
      "Implementation of enterprise resource planning (ERP) software to streamline business operations and improve efficiency.",
    submissionRequirements:
      "Proposal must include technical approach, implementation timeline, team qualifications, past performance, and detailed pricing breakdown. Submit one original and three copies in sealed envelopes, plus an electronic copy on USB drive. Maximum 50 pages excluding appendices.",
    submissionDate: "2023-12-12",
    solicitationNumber: "BD-25-1290-LFDPW-DPW-112753",
    issuedBy: "Town of Lynnfield",
    source: "qualification", // Added to track where the user came from
  }
}

export default function SolicitationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const solicitation = getSolicitation(id)
  const [activeTab, setActiveTab] = useState("info")

  // Function to handle back navigation
  const handleBackNavigation = () => {
    // Check if the user came from qualifications and navigate accordingly
    if (solicitation.source === "qualification") {
      router.push("/qualifications")
    } else {
      router.push("/solicitations")
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handleBackNavigation}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground font-medium">{solicitation.company}</span>
                <Badge variant="outline">Qualification</Badge>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">{solicitation.name}</h2>
            </div>
          </div>
        </div>

        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="info">RFP Info</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="docs">Docs</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Solicitation Information</CardTitle>
                  <CardDescription>Basic information about {solicitation.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <SolicitationInfo solicitation={solicitation} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle>Submission Requirements</CardTitle>
                  <CardDescription>Detailed requirements for {solicitation.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <SolicitationRequirements solicitation={solicitation} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="docs">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Documents related to {solicitation.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <SolicitationDocuments solicitationId={solicitation.id} solicitationName={solicitation.name} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                  <CardDescription>Key dates for {solicitation.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <SolicitationTimeline solicitationId={id} companyName={solicitation.company} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <SolicitationChat solicitationId={solicitation.id} solicitationName={solicitation.name} />
    </div>
  )
}
