import { QualificationFilters } from "@/components/qualification-filters"
import { QualificationTable } from "@/components/qualification-table"

export default function QualificationsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Qualifications</h1>

      <div className="bg-white rounded-lg border p-6 mb-6">
        <QualificationFilters />
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-bold mb-2">Qualification Management</h2>
        <p className="text-muted-foreground mb-6">Review and manage solicitation qualifications</p>
        <QualificationTable />
      </div>
    </div>
  )
}
