"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, CheckCircle, Building } from "lucide-react"
import { SwipeMatchingDialog } from "@/components/swipe-matching-dialog"

interface Solicitation {
  id: string
  name: string
  status: string
  comments: string
  dueDate: string
  value: string
  score: string
  matchPercentage: number
  overview: string
  rejectionReason: string
  companyId: string
  companyName: string
}

interface CompanyMatches {
  companyId: string
  companyName: string
  matchCount: number
  solicitations: Solicitation[]
}

interface PendingMatchesSectionProps {
  solicitations: Solicitation[]
  onMatchDecision: (id: string, decision: string, rejectionReason?: string) => void
}

export function PendingMatchesSection({ solicitations, onMatchDecision }: PendingMatchesSectionProps) {
  const [isSwipeDialogOpen, setIsSwipeDialogOpen] = useState(false)
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)
  const [companyMatches, setCompanyMatches] = useState<CompanyMatches[]>([])

  // Group solicitations by company
  const groupedByCompany = solicitations.reduce((acc: CompanyMatches[], sol) => {
    const existingCompany = acc.find((company) => company.companyId === sol.companyId)

    if (existingCompany) {
      existingCompany.matchCount += 1
      existingCompany.solicitations.push(sol)
      return acc
    } else {
      return [
        ...acc,
        {
          companyId: sol.companyId,
          companyName: sol.companyName,
          matchCount: 1,
          solicitations: [sol],
        },
      ]
    }
  }, [])

  // Sort companies by match count (descending)
  const sortedCompanies = [...groupedByCompany].sort((a, b) => b.matchCount - a.matchCount)

  const handleStartMatching = (companyId: string) => {
    setSelectedCompanyId(companyId)
    setCompanyMatches(sortedCompanies.filter((company) => company.companyId === companyId))
    setIsSwipeDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsSwipeDialogOpen(false)
    setSelectedCompanyId(null)
  }

  return (
    <>
      <Card className="col-span-7">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Pending Matches</CardTitle>
            <CardDescription>RFPs waiting for your match decision, grouped by company</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {sortedCompanies.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedCompanies.map((company) => (
                <Card
                  key={company.companyId}
                  className="overflow-hidden border-2 hover:border-primary transition-colors"
                >
                  <CardHeader className="p-4 pb-2 bg-muted/20">
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{company.companyName}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-3">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-sm px-2 py-1">
                        {company.matchCount} {company.matchCount === 1 ? "match" : "matches"} pending
                      </Badge>
                    </div>
                    <Button className="w-full" onClick={() => handleStartMatching(company.companyId)}>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start Matching
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-1">All caught up!</h3>
              <p className="text-muted-foreground max-w-md">
                You have no pending matches to review. Check back later or visit the Companies section to see all
                matched RFPs.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedCompanyId && companyMatches.length > 0 && (
        <SwipeMatchingDialog
          open={isSwipeDialogOpen}
          onOpenChange={handleDialogClose}
          rfps={companyMatches[0].solicitations}
          onMatchDecision={onMatchDecision}
          startingIndex={0}
          companyName={companyMatches[0].companyName}
        />
      )}
    </>
  )
}
