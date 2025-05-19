import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProposalsTable } from "@/components/proposals-table"
import { ProposalFilters } from "@/components/proposal-filters"
import { Plus } from "lucide-react"
import { ProposalFilterProvider } from "@/contexts/proposal-filter-context"

export default function ProposalsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Proposals</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Proposal
            </Button>
          </div>
        </div>

        <ProposalFilterProvider>
          <ProposalFilters />

          <Card>
            <CardHeader>
              <CardTitle>Proposal Management</CardTitle>
              <CardDescription>Manage and track proposal drafting progress</CardDescription>
            </CardHeader>
            <CardContent>
              <ProposalsTable />
            </CardContent>
          </Card>
        </ProposalFilterProvider>
      </div>
    </div>
  )
}
