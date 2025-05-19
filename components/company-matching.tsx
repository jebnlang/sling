"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, ExternalLink, Star, ThumbsDown, ThumbsUp, Minus, PlayCircle } from "lucide-react"
import { MatchDetailDialog } from "@/components/match-detail-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SwipeMatchingDialog } from "@/components/swipe-matching-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Sample data - would be fetched from API in real implementation
const matchingRfps = [
  {
    id: "1",
    name: "Enterprise Software Implementation",
    status: "Yes",
    comments: "Good fit for their expertise in enterprise solutions.",
    dueDate: "2023-12-15",
    value: "$250,000",
    score: "Good",
    matchPercentage: 85,
    overview:
      "Implementation of enterprise resource planning (ERP) software to streamline business operations and improve efficiency.",
    rejectionReason: "",
  },
  {
    id: "2",
    name: "Cloud Migration Services",
    status: "Pending",
    comments: "Company has strong cloud expertise but limited migration case studies.",
    dueDate: "2023-11-30",
    value: "$180,000",
    score: "Excellent",
    matchPercentage: 92,
    overview:
      "Migration of on-premises infrastructure to cloud-based solutions with minimal disruption to business operations.",
    rejectionReason: "",
  },
  {
    id: "3",
    name: "IT Security Assessment",
    status: "No",
    comments: "Not aligned with their core competencies.",
    dueDate: "2023-12-05",
    value: "$75,000",
    score: "Poor",
    matchPercentage: 45,
    overview:
      "Comprehensive security assessment of IT infrastructure, identifying vulnerabilities and recommending remediation strategies.",
    rejectionReason: "Lack of security expertise and certifications required for this project.",
  },
  {
    id: "4",
    name: "Data Analytics Platform",
    status: "Yes",
    comments: "Strong match with their data expertise.",
    dueDate: "2024-01-10",
    value: "$320,000",
    score: "Good",
    matchPercentage: 78,
    overview:
      "Development of a data analytics platform to provide business intelligence and actionable insights from multiple data sources.",
    rejectionReason: "",
  },
  {
    id: "5",
    name: "Mobile App Development",
    status: "Soft",
    comments: "Has mobile development capabilities but limited portfolio in this specific industry.",
    dueDate: "2023-12-20",
    value: "$150,000",
    score: "Fair",
    matchPercentage: 65,
    overview:
      "Design and development of a mobile application for customer engagement and service delivery across iOS and Android platforms.",
    rejectionReason: "",
  },
  {
    id: "6",
    name: "Network Infrastructure Upgrade",
    status: "Pending",
    comments: "Relevant experience but team availability might be an issue.",
    dueDate: "2024-01-15",
    value: "$200,000",
    score: "Good",
    matchPercentage: 75,
    overview:
      "Upgrade of existing network infrastructure to improve performance, security, and reliability across multiple office locations.",
    rejectionReason: "",
  },
]

interface CompanyMatchingProps {
  companyId: string
}

export function CompanyMatching({ companyId }: CompanyMatchingProps) {
  const [selectedRfp, setSelectedRfp] = useState<string | null>(null)
  const [rfps, setRfps] = useState(matchingRfps)
  const [isSwipeDialogOpen, setIsSwipeDialogOpen] = useState(false)
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState<{
    isOpen: boolean
    rfpId: string
    previousStatus: string
  }>({ isOpen: false, rfpId: "", previousStatus: "" })

  const handleRowClick = (rfpId: string) => {
    setSelectedRfp(rfpId)
  }

  const handleCloseDialog = () => {
    setSelectedRfp(null)
  }

  const handleMatchDecision = (rfpId: string, status: string, rejectionReason = "") => {
    setRfps(
      rfps.map((rfp) => {
        if (rfp.id === rfpId) {
          return {
            ...rfp,
            status,
            rejectionReason: status === "No" ? rejectionReason : "",
          }
        }
        return rfp
      }),
    )
  }

  const handleStatusChange = (rfpId: string, newStatus: string) => {
    // If changing to "No", we should prompt for a reason
    if (newStatus === "No") {
      setSelectedRfp(rfpId)
      // We'll use a timeout to allow the dialog to open after the dropdown closes
      setTimeout(() => {
        const rfp = rfps.find((r) => r.id === rfpId)
        if (rfp) {
          setRejectionDialogOpen({
            isOpen: true,
            rfpId: rfpId,
            previousStatus: rfp.status,
          })
        }
      }, 100)
      return
    }

    // Otherwise just update the status
    handleMatchDecision(rfpId, newStatus)
  }

  const handleRejectionReason = (reason: string) => {
    if (rejectionDialogOpen.rfpId) {
      handleMatchDecision(rejectionDialogOpen.rfpId, "No", reason)
      setRejectionDialogOpen({ isOpen: false, rfpId: "", previousStatus: "" })
    }
  }

  const handleRejectionCancel = () => {
    // Revert to previous status
    setRfps(
      rfps.map((rfp) => {
        if (rfp.id === rejectionDialogOpen.rfpId) {
          return {
            ...rfp,
            status: rejectionDialogOpen.previousStatus,
          }
        }
        return rfp
      }),
    )
    setRejectionDialogOpen({ isOpen: false, rfpId: "", previousStatus: "" })
  }

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

  // Group RFPs by status
  const matchedRfps = rfps.filter((rfp) => rfp.status === "Yes")
  const notMatchedRfps = rfps.filter((rfp) => rfp.status === "No")
  const softMatchRfps = rfps.filter((rfp) => rfp.status === "Soft")
  const pendingRfps = rfps.filter((rfp) => rfp.status === "Pending")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Potential RFP Matches</h3>
        {pendingRfps.length > 0 && (
          <Button onClick={() => setIsSwipeDialogOpen(true)}>
            <PlayCircle className="mr-2 h-4 w-4" />
            Start Matching Game ({pendingRfps.length})
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Matched RFPs */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md flex items-center">
                <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />
                Matched RFPs
              </CardTitle>
              <Badge variant="outline">{matchedRfps.length}</Badge>
            </div>
            <CardDescription>RFPs that have been matched with this company</CardDescription>
          </CardHeader>
          <CardContent>
            {matchedRfps.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFP Name</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Est. Value</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matchedRfps.map((rfp) => (
                    <TableRow
                      key={rfp.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(rfp.id)}
                    >
                      <TableCell className="font-medium">{rfp.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {rfp.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>{rfp.value}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className={`h-4 w-4 ${getScoreColor(rfp.score)}`} />
                          <span className={getScoreColor(rfp.score)}>{rfp.score}</span>
                          <span className="text-xs text-muted-foreground">({rfp.matchPercentage}%)</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={rfp.comments}>
                        {rfp.comments || "No comments"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Select
                            defaultValue={rfp.status}
                            onValueChange={(value) => handleStatusChange(rfp.id, value)}
                          >
                            <SelectTrigger className="w-[100px]" onClick={(e) => e.stopPropagation()}>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent onClick={(e) => e.stopPropagation()}>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="Soft">Soft Match</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(`/solicitations/${rfp.id}`, "_blank")
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View RFP</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No matched RFPs yet</div>
            )}
          </CardContent>
        </Card>

        {/* Soft Match RFPs */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md flex items-center">
                <Minus className="h-4 w-4 mr-2 text-amber-500" />
                Soft Match RFPs
              </CardTitle>
              <Badge variant="outline">{softMatchRfps.length}</Badge>
            </div>
            <CardDescription>RFPs that have been marked as potential matches requiring further review</CardDescription>
          </CardHeader>
          <CardContent>
            {softMatchRfps.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFP Name</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Est. Value</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {softMatchRfps.map((rfp) => (
                    <TableRow
                      key={rfp.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(rfp.id)}
                    >
                      <TableCell className="font-medium">{rfp.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {rfp.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>{rfp.value}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className={`h-4 w-4 ${getScoreColor(rfp.score)}`} />
                          <span className={getScoreColor(rfp.score)}>{rfp.score}</span>
                          <span className="text-xs text-muted-foreground">({rfp.matchPercentage}%)</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={rfp.comments}>
                        {rfp.comments || "No comments"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Select
                            defaultValue={rfp.status}
                            onValueChange={(value) => handleStatusChange(rfp.id, value)}
                          >
                            <SelectTrigger className="w-[100px]" onClick={(e) => e.stopPropagation()}>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent onClick={(e) => e.stopPropagation()}>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="Soft">Soft Match</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(`/solicitations/${rfp.id}`, "_blank")
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View RFP</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No soft match RFPs</div>
            )}
          </CardContent>
        </Card>

        {/* Pending RFPs */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md flex items-center">
                <Badge variant="outline" className="mr-2">
                  ?
                </Badge>
                Pending Review
              </CardTitle>
              <Badge variant="outline">{pendingRfps.length}</Badge>
            </div>
            <CardDescription>RFPs waiting for match decision</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingRfps.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFP Name</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Est. Value</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRfps.map((rfp) => (
                    <TableRow
                      key={rfp.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(rfp.id)}
                    >
                      <TableCell className="font-medium">{rfp.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {rfp.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>{rfp.value}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className={`h-4 w-4 ${getScoreColor(rfp.score)}`} />
                          <span className={getScoreColor(rfp.score)}>{rfp.score}</span>
                          <span className="text-xs text-muted-foreground">({rfp.matchPercentage}%)</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={rfp.comments}>
                        {rfp.comments || "No comments"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Select
                            defaultValue={rfp.status}
                            onValueChange={(value) => handleStatusChange(rfp.id, value)}
                          >
                            <SelectTrigger className="w-[100px]" onClick={(e) => e.stopPropagation()}>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent onClick={(e) => e.stopPropagation()}>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="Soft">Soft Match</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(`/solicitations/${rfp.id}`, "_blank")
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View RFP</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No pending RFPs</div>
            )}
          </CardContent>
        </Card>

        {/* Not Matched RFPs */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md flex items-center">
                <ThumbsDown className="h-4 w-4 mr-2 text-red-500" />
                Not Matched RFPs
              </CardTitle>
              <Badge variant="outline">{notMatchedRfps.length}</Badge>
            </div>
            <CardDescription>RFPs that have been marked as not a match</CardDescription>
          </CardHeader>
          <CardContent>
            {notMatchedRfps.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RFP Name</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Est. Value</TableHead>
                    <TableHead>Match Score</TableHead>
                    <TableHead>Rejection Reason</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notMatchedRfps.map((rfp) => (
                    <TableRow
                      key={rfp.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(rfp.id)}
                    >
                      <TableCell className="font-medium">{rfp.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {rfp.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>{rfp.value}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className={`h-4 w-4 ${getScoreColor(rfp.score)}`} />
                          <span className={getScoreColor(rfp.score)}>{rfp.score}</span>
                          <span className="text-xs text-muted-foreground">({rfp.matchPercentage}%)</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={rfp.rejectionReason}>
                        {rfp.rejectionReason || "No reason provided"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Select
                            defaultValue={rfp.status}
                            onValueChange={(value) => handleStatusChange(rfp.id, value)}
                          >
                            <SelectTrigger className="w-[100px]" onClick={(e) => e.stopPropagation()}>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent onClick={(e) => e.stopPropagation()}>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="Soft">Soft Match</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(`/solicitations/${rfp.id}`, "_blank")
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View RFP</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No rejected RFPs</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rejection Reason Dialog */}
      <Dialog open={rejectionDialogOpen.isOpen} onOpenChange={(open) => !open && handleRejectionCancel()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Why is this not a match?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectionReason">Rejection Reason (Optional)</Label>
              <Textarea id="rejectionReason" placeholder="Enter reason for rejection..." className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={handleRejectionCancel}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const reason = document.getElementById("rejectionReason") as HTMLTextAreaElement
                handleRejectionReason(reason?.value || "")
              }}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedRfp && (
        <MatchDetailDialog rfpId={selectedRfp} companyId={companyId} open={!!selectedRfp} onClose={handleCloseDialog} />
      )}

      <SwipeMatchingDialog
        open={isSwipeDialogOpen}
        onOpenChange={setIsSwipeDialogOpen}
        rfps={pendingRfps}
        onMatchDecision={handleMatchDecision}
      />
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const getVariant = (status: string) => {
    switch (status) {
      case "Yes":
        return "success"
      case "No":
        return "destructive"
      case "Soft":
        return "warning"
      case "Pending":
        return "outline"
      default:
        return "outline"
    }
  }

  return <Badge variant={getVariant(status) as any}>{status}</Badge>
}
