"use client"

import Link from "next/link"
import { Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SolicitationInfoProps {
  solicitation: {
    id: string
    name: string
    dueDate: string
    status: string
    company: string
    companyId: string
    value: string
    type: string
    baseType: string
    summary: string
    solicitationNumber: string
    issuedBy: string
  }
}

export function SolicitationInfo({ solicitation }: SolicitationInfoProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">RFP Name</Label>
          <Input id="name" defaultValue={solicitation.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <div className="flex items-center space-x-2">
            <Input id="company" defaultValue={solicitation.company} readOnly />
            <Button variant="outline" size="icon" asChild>
              <Link href={`/companies/${solicitation.companyId}`}>
                <Building className="h-4 w-4" />
                <span className="sr-only">View company</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="solicitationNumber">Solicitation Number</Label>
          <Input id="solicitationNumber" defaultValue={solicitation.solicitationNumber} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="issuedBy">Issued By</Label>
          <Input id="issuedBy" defaultValue={solicitation.issuedBy} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input id="dueDate" type="date" defaultValue={solicitation.dueDate} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={solicitation.status}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Matching">Matching</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="Drafting">Drafting</SelectItem>
              <SelectItem value="Submitted">Submitted</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="value">Estimated Value</Label>
          <Input id="value" defaultValue={solicitation.value} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input id="type" defaultValue={solicitation.type} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="baseType">Base Type</Label>
          <Input id="baseType" defaultValue={solicitation.baseType} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">RFP Summary</Label>
        <Textarea
          id="summary"
          defaultValue={solicitation.summary}
          rows={4}
          placeholder="Enter a summary of the RFP..."
        />
      </div>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
