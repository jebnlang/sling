"use client"

import type React from "react"

import { useState } from "react"
import { X, Plus, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface CompanyExclusionsProps {
  initialExclusions?: string[]
}

export function CompanyExclusions({ initialExclusions = [] }: CompanyExclusionsProps) {
  const [exclusions, setExclusions] = useState<string[]>(initialExclusions)
  const [newExclusion, setNewExclusion] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [bulkExclusions, setBulkExclusions] = useState("")

  const handleAddExclusion = () => {
    if (newExclusion.trim()) {
      setExclusions([...exclusions, newExclusion.trim()])
      setNewExclusion("")
    }
  }

  const handleRemoveExclusion = (index: number) => {
    const updatedExclusions = [...exclusions]
    updatedExclusions.splice(index, 1)
    setExclusions(updatedExclusions)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddExclusion()
    }
  }

  const handleBulkSave = () => {
    const newExclusions = bulkExclusions
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    setExclusions(newExclusions)
    setEditMode(false)
  }

  const toggleEditMode = () => {
    if (!editMode) {
      setBulkExclusions(exclusions.join("\n"))
    }
    setEditMode(!editMode)
  }

  return (
    <Card className="border-red-200 bg-red-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Matching Exclusions</CardTitle>
            <CardDescription>
              Add statements about what this company does not do to improve matching accuracy
            </CardDescription>
          </div>
          {exclusions.length > 0 && (
            <Button variant="outline" size="sm" onClick={toggleEditMode}>
              {editMode ? "Cancel" : "Bulk Edit"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {editMode ? (
          <div className="space-y-4">
            <Textarea
              value={bulkExclusions}
              onChange={(e) => setBulkExclusions(e.target.value)}
              placeholder="Enter one exclusion per line, e.g.&#10;This company does not do web design.&#10;This company does not work with government clients."
              className="min-h-[150px]"
            />
            <Button onClick={handleBulkSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-2 mb-4">
              <Input
                placeholder="e.g., This company does not do web design"
                value={newExclusion}
                onChange={(e) => setNewExclusion(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={handleAddExclusion}>
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>

            {exclusions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {exclusions.map((exclusion, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm flex items-center gap-1 bg-red-50 text-red-800 hover:bg-red-100"
                  >
                    {exclusion}
                    <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => handleRemoveExclusion(index)} />
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No exclusions added yet</p>
                <p className="text-sm mt-1">
                  Add statements like "This company does not do web design" to improve matching accuracy
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
