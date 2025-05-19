"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ProposalWorkspace } from "@/components/proposal-workspace"

// This would normally be fetched from an API
const getProposal = (id: string) => {
  return {
    id,
    name: "Enterprise Software Implementation",
    rfpId: "1",
    rfpNumber: "Bid NO. 256022",
    rfpName: "Window Washing and Pressure Washing Contractor of Record",
    company: "Clean Up Group International Inc.",
    companyId: "1",
    dueDate: "2025-04-23",
    status: "Drafting",
    progress: 25,
    writer: "Edward Ramirez",
    owner: "Michael Johnson",
    lastUpdated: "2025-04-16",
  }
}

export default function ProposalPage({ params }: { params: { id: string } }) {
  const proposal = getProposal(params.id)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/proposals">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">Proposal Details</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link href={`/solicitations/${proposal.rfpId}`}>View RFP</Link>
            </Button>
          </div>
        </div>

        <ProposalWorkspace proposal={proposal} />
      </div>
    </div>
  )
}
