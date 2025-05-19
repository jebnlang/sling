"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"

interface SolicitationChatProps {
  solicitationId: string
}

// Sample chat messages
const initialMessages = [
  {
    id: "1",
    sender: "user",
    name: "Roy",
    content: "What is the Buy Texas policy? Can you explain it?",
    timestamp: "4/2/25, 1:05 PM",
  },
  {
    id: "2",
    sender: "assistant",
    name: "Assistant",
    content:
      "The Buy Texas policy requires the purchase of products and materials produced in the State of Texas when they are available at a price and time comparable to products and materials produced outside the state. This is part of the state's effort to support local businesses and the Texas economy.",
    timestamp: "4/2/25, 1:07 PM",
  },
]

export function SolicitationChat({ solicitationId }: SolicitationChatProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      sender: "user",
      name: "Roy",
      content: newMessage,
      timestamp: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="pb-2">
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <Avatar className="h-8 w-8">
                <AvatarFallback>{message.name[0]}</AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs mt-1 opacity-70">{message.timestamp}</div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Chat with Assistant..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
