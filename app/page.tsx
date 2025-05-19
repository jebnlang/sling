"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardTable } from "@/components/dashboard-table"
import { StatusDistribution } from "@/components/status-distribution"
import { TimelineView } from "@/components/timeline-view"
import { MatchesView } from "@/components/matches-view"
import { PendingQualificationsTable } from "@/components/pending-qualifications-table"
import { PendingProposalsTable } from "@/components/pending-proposals-table"
import { Button } from "@/components/ui/button"
import { CheckSquare, FileText, ListTodo } from "lucide-react"
import Link from "next/link"
import { TasksTable } from "@/components/tasks-table"

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Status</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Overview Tab - Combined Home and Task Management */}
          <TabsContent value="overview" className="space-y-4">
            {/* Task Management Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Task Management</CardTitle>
                  <CardDescription>Manage and track your daily tasks</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/tasks">
                    <ListTodo className="mr-2 h-4 w-4" />
                    View All Tasks
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <TasksTable />
              </CardContent>
            </Card>

            {/* Pending Matches Section */}
            <MatchesView />

            {/* Pending Qualifications Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Pending Qualifications</CardTitle>
                  <CardDescription>Solicitations waiting for qualification</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/qualifications">
                    <CheckSquare className="mr-2 h-4 w-4" />
                    View All
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <PendingQualificationsTable />
              </CardContent>
            </Card>

            {/* Pending Proposals Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Pending Proposals</CardTitle>
                  <CardDescription>Proposals in progress</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/proposals">
                    <FileText className="mr-2 h-4 w-4" />
                    View All
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <PendingProposalsTable />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics & Status Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active RFPs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Submitted Proposals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Companies Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <DashboardTable />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Status Distribution</CardTitle>
                  <CardDescription>RFP status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <StatusDistribution />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Critical Dates Calendar</CardTitle>
                <CardDescription>Visual timeline of upcoming deadlines and submission dates</CardDescription>
              </CardHeader>
              <CardContent>
                <TimelineView />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
