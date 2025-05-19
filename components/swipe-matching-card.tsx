"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ThumbsDown, ThumbsUp, Minus, Building, FileText, ChevronDown, ChevronUp } from "lucide-react"

interface RfpData {
  id: string
  name: string
  status: string
  comments: string
  dueDate: string
  value: string
  score: string
  matchPercentage: number
  overview: string
  companyId?: string
  companyName?: string
  keywords?: string[] // Optional array of keywords to highlight
}

// Update the interface to match how the function is called
interface SwipeMatchingCardProps {
  rfp: RfpData
  onMatchDecision: (status: "Yes" | "No" | "Soft") => void
}

// Function to generate longer overview text for demonstration
const generateLongerOverview = (text: string): string => {
  if (!text) return ""

  // If the text is already long enough, return it as is
  if (text.length > 300) return text

  // Otherwise, repeat the text to make it longer (about 3x)
  const repetitions = Math.ceil(300 / Math.max(text.length, 1))
  return (
    Array(repetitions).fill(text).join(" ") +
    " Additional context: This RFP requires detailed attention to technical specifications and compliance with industry standards. " +
    "The client has emphasized the importance of innovative approaches and cost-effective solutions. " +
    "Previous submissions have been rejected due to lack of specificity in implementation timelines and resource allocation plans."
  )
}

// Default keywords to highlight if none are provided
const DEFAULT_KEYWORDS = [
  "technical specifications",
  "compliance",
  "industry standards",
  "innovative",
  "cost-effective",
  "implementation",
  "timelines",
  "resource allocation",
  "requirements",
  "deadline",
  "budget",
  "proposal",
  "deliverables",
  "milestones",
  "scope",
  "objectives",
  "evaluation criteria",
]

// Function to highlight keywords in text
const highlightKeywords = (text: string, keywords: string[] = DEFAULT_KEYWORDS): React.ReactNode => {
  if (!text) return null
  if (!keywords || keywords.length === 0) return text

  // Sort keywords by length (longest first) to avoid partial matches
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length)

  // Create a regex pattern for all keywords (case insensitive)
  const pattern = new RegExp(`(${sortedKeywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi")

  // Split the text by the pattern and create an array of text and highlighted spans
  const parts = text.split(pattern)

  return parts.map((part, index) => {
    // Check if this part matches any keyword (case insensitive)
    const isKeyword = sortedKeywords.some((keyword) => part.toLowerCase() === keyword.toLowerCase())

    return isKeyword ? (
      <span key={index} className="bg-yellow-100 text-yellow-800 px-1 rounded-sm font-medium">
        {part}
      </span>
    ) : (
      part
    )
  })
}

export function SwipeMatchingCard({ rfp, onMatchDecision }: SwipeMatchingCardProps) {
  const [exitX, setExitX] = useState<number | null>(null)
  const [exitY, setExitY] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])
  const background = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [
      "rgba(239, 68, 68, 0.1)",
      "rgba(239, 68, 68, 0.05)",
      "rgba(0, 0, 0, 0)",
      "rgba(34, 197, 94, 0.05)",
      "rgba(34, 197, 94, 0.1)",
    ],
  )

  // Generate longer overview text
  const extendedOverview = generateLongerOverview(rfp.overview)

  // Reset motion values when RFP changes
  useEffect(() => {
    setExitX(null)
    setExitY(null)
    x.set(0)
    y.set(0)
    setIsExpanded(false)
  }, [rfp.id, x, y])

  const getScoreColor = (score: string) => {
    switch (score) {
      case "Excellent":
        return "text-green-600"
      case "Good":
        return "text-blue-600"
      case "Fair":
        return "text-amber-600"
      case "Poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      setExitX(200)
      setTimeout(() => onMatchDecision("Yes"), 500)
    } else if (info.offset.x < -100) {
      setExitX(-200)
      setTimeout(() => onMatchDecision("No"), 500)
    } else if (info.offset.y < -100) {
      setExitY(-200)
      setTimeout(() => onMatchDecision("Soft"), 500)
    }
  }

  // Function to truncate text to roughly 3-4 lines
  const truncateText = (text: string, maxLength = 180) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="relative w-full">
      <motion.div
        ref={cardRef}
        style={{
          x,
          y,
          rotate,
          background,
        }}
        drag={true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        animate={{ x: exitX || 0, y: exitY || 0 }}
        className="relative w-full cursor-grab active:cursor-grabbing"
      >
        <Card className="w-full shadow-lg border-2">
          {/* Decision overlay */}
          {exitX === -200 && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50/80 rounded-lg z-10 animate-in fade-in zoom-in duration-300">
              <div className="bg-red-100 rounded-full p-6">
                <ThumbsDown className="h-12 w-12 text-red-600" />
              </div>
            </div>
          )}
          {exitY === -200 && (
            <div className="absolute inset-0 flex items-center justify-center bg-amber-50/80 rounded-lg z-10 animate-in fade-in zoom-in duration-300">
              <div className="bg-amber-100 rounded-full p-6">
                <Minus className="h-12 w-12 text-amber-600" />
              </div>
            </div>
          )}
          {exitX === 200 && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-50/80 rounded-lg z-10 animate-in fade-in zoom-in duration-300">
              <div className="bg-green-100 rounded-full p-6">
                <ThumbsUp className="h-12 w-12 text-green-600" />
              </div>
            </div>
          )}
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{rfp.name}</CardTitle>
              <Badge variant="outline" className={getScoreColor(rfp.score)}>
                {rfp.score} ({rfp.matchPercentage}%)
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Due: {rfp.dueDate}</span>
              <span>•</span>
              <span>{rfp.value}</span>
            </div>
            {rfp.companyName && (
              <div className="flex items-center gap-2 text-sm mt-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{rfp.companyName}</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* RFP Overview Section - Now with keyword highlighting */}
            <div className="space-y-3 bg-muted/10 p-4 rounded-md border border-muted">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-base flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  RFP Overview
                  <span className="text-xs font-normal text-muted-foreground">
                    Client Requirements & Specifications
                  </span>
                </h4>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-2">Keywords highlighted</span>
                  <div className="h-3 w-3 rounded-full bg-yellow-100 border border-yellow-300"></div>
                </div>
              </div>
              <div className="border-l-3 border-primary pl-4 py-2">
                <p className="text-base leading-relaxed">
                  {isExpanded
                    ? highlightKeywords(extendedOverview, rfp.keywords)
                    : highlightKeywords(truncateText(extendedOverview), rfp.keywords)}
                </p>
                {extendedOverview.length > 180 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-2 text-primary hover:text-primary/80 flex items-center gap-1 p-0 h-auto"
                  >
                    {isExpanded ? (
                      <>
                        <span>Show less</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>See more</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 border-t">
            <div className="flex justify-between w-full gap-2">
              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 rounded-full border-red-200 transition-all duration-300 ${
                  exitX === -200
                    ? "bg-red-100 text-red-600 scale-110 border-red-400"
                    : "hover:bg-red-50 hover:text-red-600"
                }`}
                onClick={() => onMatchDecision("No")}
              >
                <ThumbsDown className="h-5 w-5" />
                <span className="sr-only">Not a match</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 rounded-full border-amber-200 transition-all duration-300 ${
                  exitY === -200
                    ? "bg-amber-100 text-amber-600 scale-110 border-amber-400"
                    : "hover:bg-amber-50 hover:text-amber-600"
                }`}
                onClick={() => onMatchDecision("Soft")}
              >
                <Minus className="h-5 w-5" />
                <span className="sr-only">Soft match</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 rounded-full border-green-200 transition-all duration-300 ${
                  exitX === 200
                    ? "bg-green-100 text-green-600 scale-110 border-green-400"
                    : "hover:bg-green-50 hover:text-green-600"
                }`}
                onClick={() => onMatchDecision("Yes")}
              >
                <ThumbsUp className="h-5 w-5" />
                <span className="sr-only">It's a match</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Swipe indicators */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start pointer-events-none"
        style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
      >
        <div className="ml-4 p-2 bg-red-100 rounded-full">
          <ThumbsDown className="h-8 w-8 text-red-500" />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-end pointer-events-none"
        style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
      >
        <div className="mr-4 p-2 bg-green-100 rounded-full">
          <ThumbsUp className="h-8 w-8 text-green-500" />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-start justify-center pointer-events-none"
        style={{ opacity: useTransform(y, [-100, 0], [1, 0]) }}
      >
        <div className="mt-4 p-2 bg-amber-100 rounded-full">
          <Minus className="h-8 w-8 text-amber-500" />
        </div>
      </motion.div>
    </div>
  )
}
