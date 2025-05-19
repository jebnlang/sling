// Utility functions for handling solicitation workflow transitions

export type SolicitationStatus =
  | "Pending"
  | "Matched"
  | "Not Matched"
  | "Soft Match"
  | "Qualified"
  | "Not Qualified"
  | "Drafting"
  | "Review"
  | "Submitted"

export type WorkflowStage = "matching" | "qualification" | "proposal"

// Function to determine the next stage based on current status and decision
export function getNextStage(currentStage: WorkflowStage, decision: string): WorkflowStage | null {
  switch (currentStage) {
    case "matching":
      return decision === "Yes" ? "qualification" : null
    case "qualification":
      return decision === "Qualified" ? "proposal" : null
    case "proposal":
      return null // Proposal is the final stage in this workflow
    default:
      return null
  }
}

// Function to get the initial status for a stage
export function getInitialStatusForStage(stage: WorkflowStage): SolicitationStatus {
  switch (stage) {
    case "matching":
      return "Pending"
    case "qualification":
      return "Pending"
    case "proposal":
      return "Drafting"
    default:
      return "Pending"
  }
}

// Function to update solicitation status based on decision
export function updateSolicitationStatus(currentStage: WorkflowStage, decision: string): SolicitationStatus | null {
  switch (currentStage) {
    case "matching":
      if (decision === "Yes") return "Matched"
      if (decision === "No") return "Not Matched"
      if (decision === "Soft") return "Soft Match"
      return null
    case "qualification":
      if (decision === "Qualified") return "Qualified"
      if (decision === "Not Qualified") return "Not Qualified"
      return null
    case "proposal":
      return null
    default:
      return null
  }
}
