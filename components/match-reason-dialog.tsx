"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface MatchReasonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (reason: string) => void
  onCancel: () => void
  title: string
  description: string
  type: "soft" | "reject"
}

export function MatchReasonDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
  title,
  description,
  type,
}: MatchReasonDialogProps) {
  const [reason, setReason] = useState("")

  const handleSubmit = () => {
    onSubmit(reason)
    setReason("")
  }

  const handleCancel = () => {
    onCancel()
    setReason("")
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">{description}</Label>
            <Textarea
              id="reason"
              placeholder={`Enter ${type === "reject" ? "rejection" : "consideration"} reason...`}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className={type === "reject" ? "bg-red-600 hover:bg-red-700" : "bg-amber-600 hover:bg-amber-700"}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
