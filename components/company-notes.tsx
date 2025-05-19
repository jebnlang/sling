"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

// Sample data - would be fetched from API in real implementation
const initialNotes = [
  {
    id: "1",
    content:
      "Initial meeting with company representatives. They expressed interest in our services and requested more information about our capabilities.",
    author: "Roy",
    createdAt: "2023-10-15 14:30",
  },
  {
    id: "2",
    content:
      "Follow-up call to discuss specific requirements. They are particularly interested in our experience with similar projects in their industry.",
    author: "Yonatan",
    createdAt: "2023-10-17 10:15",
  },
  {
    id: "3",
    content: "Sent additional information about our past projects and client testimonials. Awaiting their feedback.",
    author: "Roy",
    createdAt: "2023-10-18 16:45",
  },
]

interface CompanyNotesProps {
  companyId: string
}

export function CompanyNotes({ companyId }: CompanyNotesProps) {
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState("")
  const { toast } = useToast()

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const note = {
      id: Date.now().toString(),
      content: newNote,
      author: "Roy", // This would be the current user in a real app
      createdAt: new Date().toLocaleString(),
    }

    setNotes([note, ...notes])
    setNewNote("")
    
    toast({
      title: "Note added",
      description: "Successfully added new note",
    })
    
    // In a real application, you would also send this data to your backend
    // e.g., api.addCompanyNote(companyId, note)
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Add Note</h3>
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add internal notes about this company..."
          className="min-h-[120px]"
        />
        <Button onClick={handleAddNote}>Add Note</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notes History</h3>
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{note.author}</CardTitle>
              <CardDescription>{note.createdAt}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
