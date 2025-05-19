"use client"

import { useState } from "react"
import { Copy, Search, Tag, Clock, Star, StarOff, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProposalReusableContentProps {
  proposalId: string
  companyId: string
}

// Sample data - would be fetched from API in real implementation
const reusableContent = [
  {
    id: "1",
    title: "Company Introduction",
    content:
      "Acme Inc. is a global technology provider specializing in enterprise solutions with over 20 years of experience delivering innovative software solutions to Fortune 500 companies. Our team of certified professionals has successfully implemented ERP systems for clients across various industries, resulting in significant operational efficiencies and cost savings.",
    category: "Company Profile",
    tags: ["introduction", "company overview"],
    lastUsed: "2023-11-10",
    favorite: true,
  },
  {
    id: "2",
    title: "Implementation Methodology",
    content:
      "Our proven implementation methodology follows a phased approach that minimizes disruption to your business operations while ensuring a smooth transition to the new system. Phase 1: Discovery and Planning, Phase 2: Design and Configuration, Phase 3: Development and Testing, Phase 4: Training and Deployment, Phase 5: Post-Implementation Support.",
    category: "Technical Approach",
    tags: ["methodology", "implementation"],
    lastUsed: "2023-11-15",
    favorite: false,
  },
  {
    id: "3",
    title: "Quality Assurance Process",
    content:
      "Our comprehensive quality assurance process includes rigorous testing at each phase of the implementation. This includes unit testing, integration testing, system testing, user acceptance testing, and performance testing. Our QA team uses automated testing tools to ensure thorough coverage and identify potential issues before they impact your business.",
    category: "Technical Approach",
    tags: ["quality", "testing"],
    lastUsed: "2023-10-28",
    favorite: true,
  },
  {
    id: "4",
    title: "Client References",
    content:
      'Our clients consistently rate our services highly, with a 95% satisfaction rate. "Acme Inc. transformed our operations with their ERP implementation. Their team was professional, knowledgeable, and responsive throughout the project." - John Smith, CIO, XYZ Corporation. "The Acme team went above and beyond to ensure our specific requirements were met. Their attention to detail and commitment to quality is unmatched." - Jane Doe, CFO, ABC Company.',
    category: "Past Performance",
    tags: ["references", "testimonials"],
    lastUsed: "2023-11-05",
    favorite: false,
  },
  {
    id: "5",
    title: "Standard Pricing Model",
    content:
      "Our pricing model is transparent and comprehensive, covering all aspects of the implementation process. The total cost includes software licensing, implementation services, training, and ongoing support. We offer flexible payment options to accommodate your budget constraints, including milestone-based payments and financing options.",
    category: "Pricing",
    tags: ["pricing", "cost"],
    lastUsed: "2023-11-12",
    favorite: true,
  },
]

export function ProposalReusableContent({ proposalId, companyId }: ProposalReusableContentProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newContent, setNewContent] = useState({
    title: "",
    content: "",
    category: "Company Profile",
    tags: "",
  })

  const handleCopyContent = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        // Could show a toast notification here
        console.log("Content copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy content: ", err)
      })
  }

  const handleToggleFavorite = (id: string) => {
    // In a real app, this would update the favorite status via the API
    console.log("Toggle favorite for content:", id)
  }

  const handleAddContent = () => {
    // In a real app, this would add the new content via the API
    console.log("Adding new content:", newContent)
    setIsAddDialogOpen(false)
    setNewContent({
      title: "",
      content: "",
      category: "Company Profile",
      tags: "",
    })
  }

  // Filter content based on active tab and search term
  const filteredContent = reusableContent.filter((content) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "favorites" && content.favorite) ||
      content.category.toLowerCase() === activeTab.toLowerCase()

    const matchesSearch =
      searchTerm === "" ||
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesTab && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Reusable Content Library</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Content
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="Company Profile">Company</TabsTrigger>
          <TabsTrigger value="Technical Approach">Technical</TabsTrigger>
          <TabsTrigger value="Past Performance">Past Performance</TabsTrigger>
          <TabsTrigger value="Pricing">Pricing</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4 space-y-4">
          {filteredContent.length > 0 ? (
            filteredContent.map((content) => (
              <Card key={content.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">{content.title}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleFavorite(content.id)}
                    className="h-8 w-8"
                  >
                    {content.favorite ? (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ) : (
                      <StarOff className="h-4 w-4" />
                    )}
                    <span className="sr-only">{content.favorite ? "Remove from favorites" : "Add to favorites"}</span>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline">{content.category}</Badge>
                      {content.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Last used: {content.lastUsed}
                    </div>
                  </div>
                  <div className="border rounded-md p-3 bg-muted/50 relative group">
                    <p className="text-sm">{content.content}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleCopyContent(content.content)}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy content</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No content found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Reusable Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newContent.title}
                onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                placeholder="Enter a descriptive title..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newContent.content}
                onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                placeholder="Enter the reusable content..."
                className="min-h-[150px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newContent.category}
                  onValueChange={(value) => setNewContent({ ...newContent, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Company Profile">Company Profile</SelectItem>
                    <SelectItem value="Technical Approach">Technical Approach</SelectItem>
                    <SelectItem value="Past Performance">Past Performance</SelectItem>
                    <SelectItem value="Pricing">Pricing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newContent.tags}
                  onChange={(e) => setNewContent({ ...newContent, tags: e.target.value })}
                  placeholder="e.g., introduction, company"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddContent}>Add Content</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
