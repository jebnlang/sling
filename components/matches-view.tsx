"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, CheckCircle, Building } from "lucide-react"
import { SwipeMatchingDialog } from "@/components/swipe-matching-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSolicitations, type Solicitation } from "@/contexts/solicitations-context"
import { MatchesTableView } from "@/components/matches-table-view"

interface CompanyMatches {
  companyId: string
  companyName: string
  matchCount: number
  solicitations: Solicitation[]
}

interface MatchesViewProps {
  showTabs?: boolean
}

export function MatchesView({ showTabs = false }: MatchesViewProps) {
  const { matchingSolicitations, handleMatchDecision } = useSolicitations()
  const [isSwipeDialogOpen, setIsSwipeDialogOpen] = useState(false)
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)
  const [companyMatches, setCompanyMatches] = useState<CompanyMatches[]>([])

  // Group solicitations by company
  const groupedByCompany = matchingSolicitations.reduce((acc: CompanyMatches[], sol) => {
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

  const renderCompanyView = () => {
    return sortedCompanies.length > 0 ? (
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Pending Matches</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCompanies.map((company) => (
              <TableRow key={company.companyId}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{company.companyName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-sm px-2 py-1">
                    {company.matchCount} {company.matchCount === 1 ? "match" : "matches"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" onClick={() => handleStartMatching(company.companyId)}>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Start Matching
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-12 text-center w-full">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium mb-1">All caught up!</h3>
        <p className="text-muted-foreground max-w-md">
          You have no pending matches to review. Check back later or visit the Companies section to see all matched
          RFPs.
        </p>
      </div>
    )
  }

  return (
    <>
      <Card className="col-span-7 w-full">
        <CardHeader className="p-4 pb-0 w-full">
          {showTabs ? (
            <div className="w-full max-w-[calc(100%-2rem)]">
              <MatchesTableView solicitations={matchingSolicitations} onMatchDecision={handleMatchDecision} />
            </div>
          ) : (
            <div className="w-full">{renderCompanyView()}</div>
          )}
        </CardHeader>
        <CardContent className="p-4"></CardContent>
      </Card>

      {selectedCompanyId && companyMatches.length > 0 && (
        <SwipeMatchingDialog
          open={isSwipeDialogOpen}
          onOpenChange={handleDialogClose}
          rfps={companyMatches[0].solicitations}
          onMatchDecision={handleMatchDecision}
          startingIndex={0}
          companyName={companyMatches[0].companyName}
        />
      )}
    </>
  )
}
