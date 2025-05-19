"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

export interface Solicitation {
  id: string
  name: string
  status: string
  stage: string
  comments?: string
  dueDate: string
  value?: string
  score?: string
  matchPercentage?: number
  overview?: string
  rejectionReason?: string
  softMatchReason?: string
  companyId: string
  companyName: string
  priority?: string
  accountManager?: string
  proposalStatus?: string
  proposalProgress?: number
  writer?: string
}

interface SolicitationsContextType {
  solicitations: Solicitation[]
  matchingSolicitations: Solicitation[]
  qualificationSolicitations: Solicitation[]
  proposalSolicitations: Solicitation[]
  handleMatchDecision: (id: string, decision: string, reason?: string) => void
  handleQualificationDecision: (id: string, decision: string) => void
  updateSolicitation: (id: string, updates: Partial<Solicitation>) => void
}

// Initial data for the solicitation funnel
const initialSolicitations = [
  {
    id: "2",
    name: "Cloud Migration Services",
    status: "Pending",
    stage: "matching",
    comments: "Company has strong cloud expertise but limited migration case studies.",
    dueDate: "2023-11-30",
    value: "$180,000",
    score: "Excellent",
    matchPercentage: 92,
    overview:
      "Migration of on-premises infrastructure to cloud-based solutions with minimal disruption to business operations.",
    rejectionReason: "",
    softMatchReason: "",
    companyId: "1",
    companyName: "Acme Inc",
    priority: "High",
    accountManager: "Roy",
  },
  {
    id: "6",
    name: "Network Infrastructure Upgrade",
    status: "Pending",
    stage: "matching",
    comments: "Relevant experience but team availability might be an issue.",
    dueDate: "2024-01-15",
    value: "$200,000",
    score: "Good",
    matchPercentage: 75,
    overview:
      "Upgrade of existing network infrastructure to improve performance, security, and reliability across multiple office locations.",
    rejectionReason: "",
    softMatchReason: "",
    companyId: "2",
    companyName: "TechCorp",
    priority: "Medium",
    accountManager: "Yonatan",
  },
  {
    id: "7",
    name: "Healthcare Data Integration",
    status: "Pending",
    stage: "matching",
    comments: "Strong technical capabilities but limited healthcare industry experience.",
    dueDate: "2024-02-10",
    value: "$275,000",
    score: "Fair",
    matchPercentage: 68,
    overview:
      "Integration of healthcare data systems to enable seamless data exchange between different departments and external partners.",
    rejectionReason: "",
    softMatchReason: "",
    companyId: "3",
    companyName: "Global Solutions",
    priority: "High",
    accountManager: "Sarah",
  },
  {
    id: "8",
    name: "E-commerce Platform Redesign",
    status: "Matched",
    stage: "qualification",
    comments: "Previous e-commerce projects show promising results.",
    dueDate: "2024-01-25",
    value: "$190,000",
    score: "Good",
    matchPercentage: 82,
    overview:
      "Redesign of an existing e-commerce platform to improve user experience, mobile responsiveness, and conversion rates.",
    rejectionReason: "",
    softMatchReason: "",
    companyId: "5",
    companyName: "Future Systems",
    priority: "Medium",
    accountManager: "Roy",
  },
  {
    id: "9",
    name: "Customer Relationship Management System",
    status: "Qualified",
    stage: "proposal",
    comments: "Excellent track record with similar implementations.",
    dueDate: "2024-02-28",
    value: "$220,000",
    score: "Excellent",
    matchPercentage: 95,
    overview: "Implementation of a comprehensive CRM system to improve customer engagement and sales processes.",
    rejectionReason: "",
    softMatchReason: "",
    companyId: "1",
    companyName: "Acme Inc",
    priority: "High",
    accountManager: "Michael",
    proposalStatus: "Drafting",
    proposalProgress: 15,
    writer: "Sarah",
  },
]

const SolicitationsContext = createContext<SolicitationsContextType | undefined>(undefined)

export function SolicitationsProvider({ children }: { children: ReactNode }) {
  const [solicitations, setSolicitations] = useState<Solicitation[]>(initialSolicitations)
  const { toast } = useToast()

  // Filter solicitations by stage
  const matchingSolicitations = solicitations.filter((sol) => sol.stage === "matching")

  const qualificationSolicitations = solicitations.filter(
    (sol) => sol.stage === "qualification" && (sol.status === "Matched" || sol.status === "Pending"),
  )

  const proposalSolicitations = solicitations.filter((sol) => sol.stage === "proposal" && sol.status === "Qualified")

  // Handle match decision
  const handleMatchDecision = (id: string, decision: string, reason = "") => {
    setSolicitations(
      solicitations.map((sol) => {
        if (sol.id === id) {
          // If matched (Yes), move to qualification stage
          if (decision === "Yes") {
            toast({
              title: "Match approved",
              description: `${sol.name} has been moved to qualifications.`,
            })

            return {
              ...sol,
              status: "Matched",
              stage: "qualification",
            }
          }

          // For No decision
          if (decision === "No") {
            return {
              ...sol,
              status: "No",
              rejectionReason: reason,
            }
          }

          // For Soft decision
          if (decision === "Soft") {
            return {
              ...sol,
              status: "Soft",
              softMatchReason: reason,
            }
          }

          // Default case
          return {
            ...sol,
            status: decision,
          }
        }
        return sol
      }),
    )
  }

  // Handle qualification decision
  const handleQualificationDecision = (id: string, decision: string) => {
    setSolicitations(
      solicitations.map((sol) => {
        if (sol.id === id) {
          // If qualified, move to proposal stage
          if (decision === "Qualified") {
            toast({
              title: "Solicitation qualified",
              description: `${sol.name} has been moved to proposals.`,
            })

            return {
              ...sol,
              status: "Qualified",
              stage: "proposal",
              proposalStatus: "Drafting",
              proposalProgress: 0,
              writer: sol.accountManager, // Default the writer to the account manager
            }
          }

          // For Not Qualified decision
          return {
            ...sol,
            status: decision,
          }
        }
        return sol
      }),
    )
  }

  // Update a solicitation
  const updateSolicitation = (id: string, updates: Partial<Solicitation>) => {
    setSolicitations(
      solicitations.map((sol) => {
        if (sol.id === id) {
          return { ...sol, ...updates }
        }
        return sol
      }),
    )
  }

  return (
    <SolicitationsContext.Provider
      value={{
        solicitations,
        matchingSolicitations,
        qualificationSolicitations,
        proposalSolicitations,
        handleMatchDecision,
        handleQualificationDecision,
        updateSolicitation,
      }}
    >
      {children}
    </SolicitationsContext.Provider>
  )
}

export function useSolicitations() {
  const context = useContext(SolicitationsContext)
  if (context === undefined) {
    throw new Error("useSolicitations must be used within a SolicitationsProvider")
  }
  return context
}
