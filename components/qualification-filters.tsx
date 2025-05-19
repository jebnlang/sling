"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function QualificationFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const clearFilters = () => {
    setActiveFilters([])
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="search" placeholder="Search solicitations..." className="pl-8" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner">Owner</Label>
            <Select onValueChange={(value) => addFilter(`Owner: ${value}`)}>
              <SelectTrigger id="owner">
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="roy">Roy</SelectItem>
                <SelectItem value="yonatan">Yonatan</SelectItem>
                <SelectItem value="sarah">Sarah</SelectItem>
                <SelectItem value="michael">Michael</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-profile">Company Profile</Label>
            <Select onValueChange={(value) => addFilter(`Company Profile: ${value}`)}>
              <SelectTrigger id="company-profile">
                <SelectValue placeholder="Select profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="onboarding">Onboarding</SelectItem>
                <SelectItem value="ready">Ready to Submit</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select onValueChange={(value) => addFilter(`Priority: ${value}`)}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium">Active Filters:</span>
            {activeFilters.map((filter) => (
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
