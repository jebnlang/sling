"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, ExternalLink, Edit, Star, Tag, Info, FileText, CheckCircle, XCircle } from "lucide-react"

interface MatchDetailDialogProps {
  rfpId: string
  companyId: string
  open: boolean
  onClose: () => void
}

// Sample match data - would be fetched from API in real implementation
const getMatchDetails = (rfpId: string, companyId: string) => {
  return {
    rfp: {
      id: rfpId,
      name: "Airport Conversion LOI",
      score: "Good",
      postedDate: "3/24/2025",
      responseDeadline: "5/5/2025",
      solicitationNumber: "SP2641-Airport Conversion LOI",
      baseType: "SLED Contract Opportunity",
      type: "Solicitation",
      issuedBy: "Public Works",
      state: "CA",
      value: "$10,000,000",
      externalLink: "https://procurement.opengov.com/portal/santa-monica-ca/projects/157023",
      tags: [],
      scoreReason: "",
      comment:
        "EyeClick's interactive projection technology aligns well with the solicitation's focus on recreational and educational uses of the Santa Monica Airport land. The company has a proven track record in kids' entertainment, education, and community engagement, which are key elements of the project's goals. Their solutions can foster immersive experiences that enhance community uses and attract diverse audiences, although the proposal would need to address specific community benefits and joint-use opportunities as outlined.",
      overview:
        "The City of Santa Monica is seeking innovative partnership opportunities through Letters of Interest (LOIs) for the conceptual development and use of the Santa Monica Airport land, which is set to close on December 31, 2028. The focus is on creating recreational, arts, cultural, educational, and community uses that align with the City Council's Guiding Principles. The goal is to generate revenue to finance the design, construction, operations, maintenance, and programming of the 192-acre site, which is envisioned to be transformed into a park-centered area. The city is looking for proposers to suggest uses that may include short-term pop-up activities or long-term multi-year partnerships, addressing community benefits, financial viability, creativity in design, and sustainability strategies.",
      requirements: [
        {
          id: "1",
          name: "Conceptual Development",
          description:
            "Proposals must outline innovative uses for the airport land that align with recreational, arts, cultural, educational, and community purposes.",
          fulfillable: "Yes",
          gaps: "None identified, company's interactive tech fits well.",
        },
        {
          id: "2",
          name: "Revenue Generation",
          description:
            "Proposed uses should demonstrate potential for sustainable revenue streams to cover operational costs, maintenance, and program funding for the site.",
          fulfillable: "Yes",
          gaps: "EyeClick's solutions are suitable for generating income through interactive experiences.",
        },
        {
          id: "3",
          name: "Community Benefits",
          description:
            "Proposals must articulate how the proposed concepts provide benefits to the community, focusing on engagement and accessibility for all demographics.",
          fulfillable: "Yes",
          gaps: "EyeClick enhances community engagement for youth and seniors, aligning with education and entertainment objectives.",
        },
        {
          id: "4",
          name: "Joint-Use Opportunities",
          description:
            "The proposals should explore opportunities for shared uses with other entities, possibly enhancing the value of the services provided to the community.",
          fulfillable: "Yes",
          gaps: "EyeClick's technology can integrate with various community activities, fostering collaboration.",
        },
        {
          id: "5",
          name: "Creative Design",
          description:
            "Proposals should showcase creativity in the design and implementation of the suggested uses, ensuring it meets aesthetic and functional requirements.",
          fulfillable: "Yes",
          gaps: "EyeClick's interactive products have proven high engagement and innovative design features.",
        },
        {
          id: "6",
          name: "Sustainability",
          description:
            "Proposals must include strategies for sustainability regarding environmental impact and resource management in the concept development.",
          fulfillable: "No",
          gaps: "EyeClick lacks demonstrated experience in sustainability strategies as per the requirement.",
        },
        {
          id: "7",
          name: "Implementation Timeline",
          description:
            "Proposals should provide a clear timeline starting from January 1, 2029, for the execution of the project initiatives outlined in the LOI.",
          fulfillable: "Yes",
          gaps: "Project timelines should be carefully aligned; EyeClick needs to specify expected rollout durations.",
        },
        {
          id: "8",
          name: "Types of Uses",
          description:
            "The scope includes eco-friendly attractions, sports facilities, cultural experiences, educational programs, and local economic generators.",
          fulfillable: "Yes",
          gaps: "EyeClick's products can contribute to educational and recreational uses; however, their application for arts and cultural experiences may need clarification.",
        },
      ],
      evaluation:
        "EyeClick appears to have a strong alignment with several of the requirements outlined in the solicitation. Specifically, their focus on interactive projection technology caters to recreational and educational uses, thus supporting the City's goals of enhancing community engagement and providing innovative entertainment options. The products such as BEAM and Obie can effectively generate revenue through interactive experiences within community centers, educational institutions, and family entertainment venues.\n\nHowever, there are notable gaps with respect to sustainability and alignment with some of the broader uses requested in the solicitation, specifically those tied directly to environmental sustainability and eco-friendly practices. While EyeClick's technologies are engaging, they do not currently highlight any significant initiatives or contributions to sustainability strategies, which may be a critical component of the evaluation process.\n\nOverall, given EyeClick's established market presence and expertise, their innovative interactive solutions can effectively contribute to several dimensions of the solicitation. A clear plan for integrating sustainability measures and ensuring project timelines will be pivotal in fortifying their submission.",
      rating: 4,
      citations: [
        "Conceptual development and community benefits.",
        "Revenue generation requirements and sustainability strategies.",
        "Implementation timeline specifics.",
        "Joint-use opportunities and creative design.",
        "Types of uses referenced in the project goals.",
      ],
      reference: "For reference check the project info at www.smacproject.com.",
    },
    company: {
      id: companyId,
      name: "EyeClick",
    },
  }
}

export function MatchDetailDialog({ rfpId, companyId, open, onClose }: MatchDetailDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const matchDetails = getMatchDetails(rfpId, companyId)

  const getScoreColor = (score: string) => {
    switch (score) {
      case "Excellent":
        return "text-green-600"
      case "Good":
        return "text-blue-600"
      case "Fair":
        return "text-amber-600"
      case "Poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} />
      ))
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>Match Qualification Page</span>
            <Badge variant="outline" className="ml-2">
              Score: {matchDetails.rfp.score}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Evaluating {matchDetails.company.name} for {matchDetails.rfp.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Posted Date:</span> {matchDetails.rfp.postedDate}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Response Deadline:</span> {matchDetails.rfp.responseDeadline}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Solicitation Number:</span> {matchDetails.rfp.solicitationNumber}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Base Type:</span> {matchDetails.rfp.baseType}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Type:</span> {matchDetails.rfp.type}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Issued by:</span> {matchDetails.rfp.issuedBy}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">State:</span> {matchDetails.rfp.state}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Tags:</span>
            </div>
            {matchDetails.rfp.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {matchDetails.rfp.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">No tags</span>
            )}
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Edit className="h-3 w-3" />
              <span className="sr-only">Edit</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Score Reason:</span>
            </div>
            {matchDetails.rfp.scoreReason ? (
              <span className="text-sm">{matchDetails.rfp.scoreReason}</span>
            ) : (
              <span className="text-sm text-muted-foreground">No reason</span>
            )}
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Edit className="h-3 w-3" />
              <span className="sr-only">Edit</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">External Link:</span>
          </div>
          <a
            href={matchDetails.rfp.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline truncate"
          >
            {matchDetails.rfp.externalLink}
          </a>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Comment</h3>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm">{matchDetails.rfp.comment}</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Overview of the Solicitation's Scope of Work</h3>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm">{matchDetails.rfp.overview}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-4">
            <h3 className="text-lg font-medium mb-2">Requirements Table</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px]">Fulfillable (yes/no)</TableHead>
                  <TableHead>Gaps/Concerns</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matchDetails.rfp.requirements.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.name}</TableCell>
                    <TableCell>{req.description}</TableCell>
                    <TableCell>
                      {req.fulfillable === "Yes" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>{req.gaps}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="evaluation" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Critical Evaluation</h3>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm whitespace-pre-line">{matchDetails.rfp.evaluation}</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Match Rating</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(matchDetails.rfp.rating)}
                      <span className="ml-2 text-sm font-medium">{matchDetails.rfp.rating} out of 5</span>
                    </div>
                    <p className="text-sm">
                      Based on the analysis, I would rate the match as {matchDetails.rfp.rating} out of 5.
                      {matchDetails.rfp.rating < 5 &&
                        " EyeClick's products align well with many of the proposal requirements but face challenges in addressing sustainability explicitly."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Citations</h3>
              <Card>
                <CardContent className="p-4">
                  <ol className="list-decimal list-inside space-y-1">
                    {matchDetails.rfp.citations.map((citation, index) => (
                      <li key={index} className="text-sm">
                        {citation}
                      </li>
                    ))}
                  </ol>
                  {matchDetails.rfp.reference && <p className="text-sm mt-4">{matchDetails.rfp.reference}</p>}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Save Match</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
