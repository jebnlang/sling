"use client"

import { MatchesView } from "@/components/matches-view"

export default function MatchesPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Matches</h2>
        </div>
        <MatchesView showTabs={true} />
      </div>
    </div>
  )
}
