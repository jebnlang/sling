"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyInfo } from "@/components/company-info"
import { CompanyMatching } from "@/components/company-matching"
import { CompanyQualification } from "@/components/company-qualification"
import { CompanyDocuments } from "@/components/company-documents"
import { CompanyNotes } from "@/components/company-notes"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { CompanyChat } from "@/components/company-chat"

// This would normally be fetched from an API
const getCompany = (id: string) => {
  return {
    id,
    name: "Acme Inc",
    url: "https://acme.com",
    summary: "Global technology provider specializing in enterprise solutions.",
    description: "Acme Inc is a leading technology company that provides innovative solutions for businesses worldwide. With over 20 years of experience, we specialize in enterprise software, cloud services, and digital transformation.",
    address: "123 Tech Street, Silicon Valley, CA 94043",
    contact: {
      email: "contact@acme.com",
      phone: "+1 (555) 123-4567"
    },
    documents: [
      { name: "Company Profile.pdf", date: "2024-03-15" },
      { name: "Financial Report 2023.pdf", date: "2024-02-01" },
      { name: "Service Agreement.pdf", date: "2024-01-10" }
    ]
  }
}

export default function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const { id } = use(params)
  const company = getCompany(id)
  const [companyName, setCompanyName] = useState(company.name)
  const { toast } = useToast()

  const handleNameChange = (newName: string) => {
    if (newName !== companyName) {
      setCompanyName(newName)
      
      toast({
        title: "Company name saved",
        description: "Successfully updated company name",
      })
      
      // In a real application, you would also send this data to your backend
      // e.g., api.updateCompany(company.id, { name: newName })
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center space-y-2 mb-4">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/companies">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onBlur={(e) => handleNameChange(e.target.value)}
            className="text-3xl font-bold tracking-tight bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2"
          />
        </div>

        <Tabs defaultValue="info">
          <div className="bg-muted/50 rounded-lg p-1">
            <TabsList className="w-full grid grid-cols-6">
              <TabsTrigger value="info" className="w-full">
                Company Info
              </TabsTrigger>
              <TabsTrigger value="matching" className="w-full">
                Matching
              </TabsTrigger>
              <TabsTrigger value="qualification" className="w-full">
                Qualification
              </TabsTrigger>
              <TabsTrigger value="documents" className="w-full">
                Documents
              </TabsTrigger>
              <TabsTrigger value="notes" className="w-full">
                Notes
              </TabsTrigger>
              <TabsTrigger value="chat" className="w-full">
                Chat
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-4 w-full">
            <TabsContent value="info" className="w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Basic information about {companyName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyInfo company={{ ...company, name: companyName }} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="matching" className="w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>RFP Matching</CardTitle>
                  <CardDescription>Potential RFP matches for {companyName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyMatching companyId={company.id} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="qualification" className="w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Qualification</CardTitle>
                  <CardDescription>Qualification status for {companyName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyQualification companyId={company.id} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documents" className="w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Manage documents for {companyName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyDocuments companyId={company.id} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Internal Notes</CardTitle>
                  <CardDescription>Notes and communication about {companyName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyNotes companyId={company.id} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chat" className="w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Company Assistant</CardTitle>
                  <CardDescription>Chat with AI about {companyName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompanyChat companyInfo={{ ...company, name: companyName }} />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
