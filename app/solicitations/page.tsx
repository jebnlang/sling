import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SolicitationsTable } from "@/components/solicitations-table"
import { Plus } from "lucide-react"

export default function SolicitationsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Solicitations (RFPs)</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Solicitation
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search solicitations..." className="max-w-sm" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Solicitations</CardTitle>
            <CardDescription>Manage and view all RFPs and solicitations.</CardDescription>
          </CardHeader>
          <CardContent>
            <SolicitationsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
