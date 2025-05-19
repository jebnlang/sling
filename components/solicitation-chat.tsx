"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Send, User, ChevronRight, MessageSquare } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface SolicitationChatProps {
  solicitationId: string
  solicitationName?: string
}

export function SolicitationChat({ solicitationId, solicitationName = "this solicitation" }: SolicitationChatProps) {
  // Convert initial messages to new format
  const formattedInitialMessages: Message[] = [
    {
      id: "1",
      role: "user",
      content: "What is the Buy Texas policy? Can you explain it?",
      timestamp: new Date("4/2/2025 13:05"),
    },
    {
      id: "2",
      role: "assistant",
      content: "The Buy Texas policy requires the purchase of products and materials produced in the State of Texas when they are available at a price and time comparable to products and materials produced outside the state. This is part of the state's effort to support local businesses and the Texas economy.",
      timestamp: new Date("4/2/2025 13:07"),
    },
  ]

  const [messages, setMessages] = useState<Message[]>(formattedInitialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const response = generateResponse(input, solicitationName)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const generateResponse = (query: string, solicitationName: string): string => {
    const lowerQuery = query.toLowerCase()

    // Basic response logic - expand this based on your needs
    if (lowerQuery.includes("due date") || lowerQuery.includes("deadline")) {
      return `The submission deadline for ${solicitationName} is December 15, 2023.`
    }

    if (lowerQuery.includes("requirements") || lowerQuery.includes("submission")) {
      return `The proposal must include technical approach, implementation timeline, team qualifications, past performance, and detailed pricing breakdown. Submit one original and three copies in sealed envelopes, plus an electronic copy on USB drive. Maximum 50 pages excluding appendices.`
    }

    if (lowerQuery.includes("policy") || lowerQuery.includes("texas")) {
      return `The Buy Texas policy requires state agencies to give preference to Texas products and services when the cost and quality are equal to out-of-state alternatives.`
    }

    return `I'm not sure about that specific detail. You can find more information in the RFP documentation. If you have specific questions about submission requirements, deadlines, or evaluation criteria, I'd be happy to help.`
  }

  return (
    <div
      className={`fixed right-0 top-0 h-full transition-all duration-300 ease-in-out z-50 ${
        isExpanded ? "w-[400px]" : "w-12"
      }`}
    >
      {!isExpanded ? (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-4 h-12 w-12 rounded-l-lg border border-r-0 bg-background shadow-lg"
          onClick={() => setIsExpanded(true)}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      ) : (
        <Card className="h-full w-full rounded-l-lg border-r-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Solicitation Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col h-[calc(100vh-8rem)]">
            <ScrollArea className="flex-1 p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              )}
            </ScrollArea>
            <div className="flex gap-2 p-4 border-t">
              <Input
                placeholder="Ask about solicitation..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={handleSendMessage} disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
