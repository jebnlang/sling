"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SwipeMatchingCard } from "@/components/swipe-matching-card"
import { MatchReasonDialog } from "@/components/match-reason-dialog"

interface SwipeMatchingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  rfps: any[]
  onMatchDecision: (id: string, decision: string, rejectionReason?: string) => void
}

export function SwipeMatchingDialog({ open, onOpenChange, rfps, onMatchDecision }: SwipeMatchingDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reasonDialog, setReasonDialog] = useState<{
    isOpen: boolean
    rfpId: string
    type: "soft" | "reject"
  }>({
    isOpen: false,
    rfpId: "",
    type: "reject",
  })

  const handleMatchDecision = (status: "Yes" | "No" | "Soft") => {
    const currentRfp = rfps[currentIndex]

    if (status === "No") {
      setReasonDialog({
        isOpen: true,
        rfpId: currentRfp.id,
        type: "reject",
      })
      return
    } else if (status === "Soft") {
      setReasonDialog({
        isOpen: true,
        rfpId: currentRfp.id,
        type: "soft",
      })
      return
    }

    onMatchDecision(currentRfp.id, status)

    if (currentIndex < rfps.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onOpenChange(false)
      setCurrentIndex(0)
    }
  }

  const handleReasonSubmit = (reason: string) => {
    const currentRfp = rfps[currentIndex]
    onMatchDecision(reasonDialog.rfpId, reasonDialog.type === "reject" ? "No" : "Soft", reason)

    setReasonDialog({ isOpen: false, rfpId: "", type: "reject" })

    if (currentIndex < rfps.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onOpenChange(false)
      setCurrentIndex(0)
    }
  }

  const handleReasonCancel = () => {
    setReasonDialog({ isOpen: false, rfpId: "", type: "reject" })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Match or Pass</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {rfps.length > 0 && currentIndex < rfps.length ? (
              <div className="space-y-4">
                <div className="text-center text-sm text-muted-foreground">
                  {currentIndex + 1} of {rfps.length}
                </div>
                <SwipeMatchingCard rfp={rfps[currentIndex]} onMatchDecision={handleMatchDecision} />
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No more RFPs to review</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Reason Dialog */}
      <MatchReasonDialog
        open={reasonDialog.isOpen}
        onOpenChange={(open) => !open && handleReasonCancel()}
        onSubmit={handleReasonSubmit}
        onCancel={handleReasonCancel}
        title={reasonDialog.type === "reject" ? "Why is this not a match?" : "Why is this a maybe?"}
        description={
          reasonDialog.type === "reject"
            ? "Please provide a reason for rejection"
            : "Please provide details about your consideration"
        }
        type={reasonDialog.type}
      />
    </>
  )
}
