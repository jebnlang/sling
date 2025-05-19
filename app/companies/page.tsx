import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CompaniesTable } from "@/components/companies-table"
import { Plus } from "lucide-react"

export default function CompaniesPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search companies..." className="max-w-sm" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Companies</CardTitle>
            <CardDescription>Manage and view all companies in your RFP pipeline.</CardDescription>
          </CardHeader>
          <CardContent>
            <CompaniesTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
