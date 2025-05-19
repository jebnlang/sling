"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckSquare, Calendar, Building } from "lucide-react"
import Link from "next/link"
import { QualificationDialog } from "@/components/qualification-dialog"

// Sample data - would be fetched from API in real implementation
const pendingQualifications = [
  {
    id: "1",
    name: "Enterprise Software Implementation",
    company: "Acme Inc",
    companyId: "1",
    dueDate: "2023-12-15",
    priority: "High",
  },
  {
    id: "3",
    name: "IT Security Assessment",
    company: "Global Solutions",
    companyId: "3",
    dueDate: "2023-12-05",
    priority: "High",
  },
  {
    id: "4",
    name: "Data Analytics Platform",
    company: "Innovate Ltd",
    companyId: "4",
    dueDate: "2024-01-10",
    priority: "Low",
  },
  {
    id: "6",
    name: "Network Infrastructure Upgrade",
    company: "TechCorp",
    companyId: "2",
    dueDate: "2024-01-15",
    priority: "Medium",
  },
]

export function DashboardQualificationSection() {
  const [selectedQualification, setSelectedQualification] = useState<string | null>(null)

  const handleQualify = (id: string) => {
    setSelectedQualification(id)
  }

  const handleCloseDialog = () => {
    setSelectedQualification(null)
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>
      case "Medium":
        return <Badge variant="warning">Medium</Badge>
      case "Low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <>
      <Card className="col-span-7">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Pending Qualifications</CardTitle>
            <CardDescription>Solicitations waiting for qualification</CardDescription>
          </div>
          <Button asChild>
            <Link href="/qualifications">
              <CheckSquare className="mr-2 h-4 w-4" />
              View All ({pendingQualifications.length})
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pendingQualifications.map((qualification) => (
              <Card
                key={qualification.id}
                className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleQualify(qualification.id)}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base truncate" title={qualification.name}>
                      {qualification.name}
                    </CardTitle>
                    {getPriorityBadge(qualification.priority)}
                  </div>
                  <CardDescription className="truncate" title={qualification.company}>
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {qualification.company}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {qualification.dueDate}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleQualify(qualification.id)
                    }}
                  >
                    Qualify Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedQualification && (
        <QualificationDialog
          open={!!selectedQualification}
          onOpenChange={handleCloseDialog}
          qualificationId={selectedQualification}
        />
      )}
    </>
  )
}
