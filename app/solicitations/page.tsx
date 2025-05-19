import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SolicitationsTable } from "@/components/solicitations-table"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="active">Active Pipeline</TabsTrigger>
            <TabsTrigger value="research">Research Database</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Pipeline Solicitations</CardTitle>
                <CardDescription>
                  Solicitations that are matched, qualified, or in progress within your active pipeline.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SolicitationsTable filter="active" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="research" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Research Database</CardTitle>
                <CardDescription>
                  Browse all available solicitations for research and exploration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SolicitationsTable filter="research" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
