"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useProposalFilters } from "@/contexts/proposal-filter-context"

export function ProposalFilters() {
  const { filters, setSearch, setWriter, setStatus, setDueDate, addFilter, removeFilter, clearFilters } =
    useProposalFilters()

  // Handle search input with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)

    // Only add to active filters if not empty
    if (e.target.value) {
      addFilter(`Search: ${e.target.value}`)
    } else {
      // Remove any existing search filters
      filters.activeFilters.filter((filter) => filter.startsWith("Search:")).forEach((filter) => removeFilter(filter))
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search proposals..."
                className="pl-8"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="writer">Writer</Label>
            <Select
              value={filters.writer}
              onValueChange={(value) => {
                setWriter(value)
                if (value) {
                  addFilter(`Writer: ${value}`)
                }
              }}
            >
              <SelectTrigger id="writer">
                <SelectValue placeholder="Select writer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Writers</SelectItem>
                <SelectItem value="Roy">Roy</SelectItem>
                <SelectItem value="Yonatan">Yonatan</SelectItem>
                <SelectItem value="Sarah">Sarah</SelectItem>
                <SelectItem value="Michael">Michael</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={filters.status}
              onValueChange={(value) => {
                setStatus(value)
                if (value) {
                  addFilter(`Status: ${value}`)
                }
              }}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Drafting">Drafting</SelectItem>
                <SelectItem value="Review">In Review</SelectItem>
                <SelectItem value="Revision">Needs Revision</SelectItem>
                <SelectItem value="Final">Final</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due-date">Due Date</Label>
            <Select
              value={filters.dueDate}
              onValueChange={(value) => {
                setDueDate(value)
                if (value) {
                  addFilter(`Due Date: ${value}`)
                }
              }}
            >
              <SelectTrigger id="due-date">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Due Dates</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="next-week">Next Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="next-month">Next Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filters.activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium">Active Filters:</span>
            {filters.activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {filter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-2 h-7 text-xs">
              Clear All
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
