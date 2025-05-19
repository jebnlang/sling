"use client"

import { useState } from "react"
import { User, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProposalFeedbackProps {
  proposalId: string
}

// Sample data - would be fetched from API in real implementation
const feedbackThreads = [
  {
    id: "1",
    title: "Executive Summary Feedback",
    status: "Open",
    createdAt: "2023-11-18",
    createdBy: "Michael",
    messages: [
      {
        id: "1",
        content: "The executive summary needs to be more concise and focused on the client's specific needs.",
        author: "Michael",
        timestamp: "2023-11-18 14:30",
      },
      {
        id: "2",
        content: "I'll revise it to highlight the key pain points mentioned in the RFP and our specific solutions.",
        author: "Roy",
        timestamp: "2023-11-18 15:45",
      },
      {
        id: "3",
        content: "Also, please make sure to include our past performance with similar clients.",
        author: "Michael",
        timestamp: "2023-11-18 16:10",
      },
    ],
  },
  {
    id: "2",
    title: "Technical Approach Section",
    status: "Resolved",
    createdAt: "2023-11-20",
    createdBy: "Sarah",
    messages: [
      {
        id: "1",
        content:
          "The technical approach section needs more detail on the implementation methodology and timeline. Please expand this section.",
        author: "Sarah",
        timestamp: "2023-11-20 10:15",
      },
      {
        id: "2",
        content: "I've added more details about our phased approach and included a preliminary timeline.",
        author: "Roy",
        timestamp: "2023-11-20 13:20",
      },
      {
        id: "3",
        content: "This looks good now. The additional details on the implementation phases are helpful.",
        author: "Sarah",
        timestamp: "2023-11-21 09:45",
      },
    ],
  },
  {
    id: "3",
    title: "Pricing Structure",
    status: "Open",
    createdAt: "2023-11-22",
    createdBy: "Yonatan",
    messages: [
      {
        id: "1",
        content:
          "The pricing structure needs to be more transparent. Please break down the costs for each phase of the project.",
        author: "Yonatan",
        timestamp: "2023-11-22 11:30",
      },
    ],
  },
]

export function ProposalFeedback({ proposalId }: ProposalFeedbackProps) {
  const [selectedThread, setSelectedThread] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [newThreadTitle, setNewThreadTitle] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // In a real app, this would send the message to the API
    console.log("Sending message:", newMessage)
    setNewMessage("")
  }

  const handleCreateThread = () => {
    if (!newThreadTitle.trim()) return
    // In a real app, this would create a new thread via the API
    console.log("Creating thread:", newThreadTitle)
    setNewThreadTitle("")
  }

  const getStatusBadge = (status: string) => {
    return status === "Open" ? <Badge variant="secondary">Open</Badge> : <Badge variant="success">Resolved</Badge>
  }

  const selectedThreadData = selectedThread ? feedbackThreads.find((thread) => thread.id === selectedThread) : null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Feedback & Review</h3>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Threads</SelectItem>
              <SelectItem value="open">Open Threads</SelectItem>
              <SelectItem value="resolved">Resolved Threads</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setSelectedThread(null)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            All Threads
          </Button>
        </div>
      </div>

      {!selectedThread ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create New Feedback Thread</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Thread title..."
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <Button onClick={handleCreateThread}>Create Thread</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Feedback Threads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {feedbackThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className="flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedThread(thread.id)}
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{thread.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Created by {thread.createdBy} on {thread.createdAt} • {thread.messages.length} messages
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(thread.status)}
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">{selectedThreadData?.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Created by {selectedThreadData?.createdBy} on {selectedThreadData?.createdAt}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(selectedThreadData?.status || "Open")}
              <Select defaultValue={selectedThreadData?.status}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto p-2">
              {selectedThreadData?.messages.map((message) => (
                <div key={message.id} className="flex gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{message.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.author}</span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
