"use client"

import { useState } from "react"
import { ExternalLink, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CompanyExclusions } from "@/components/company-exclusions"

interface CompanyInfoProps {
  company: {
    id: string
    name: string
    url: string
    summary: string
  }
}

export function CompanyInfo({ company }: CompanyInfoProps) {
  const [activeTab, setActiveTab] = useState("general")

  // Sample exclusions - in a real app, these would be fetched from an API
  const sampleExclusions = [
    "This company does not do web design",
    "This company does not work with government clients",
    "This company does not provide on-site support",
  ]

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="w-full grid grid-cols-4">
        <TabsTrigger value="general" className="w-full">
          General Info
        </TabsTrigger>
        <TabsTrigger value="matching" className="w-full">
          Matching Content
        </TabsTrigger>
        <TabsTrigger value="detailed" className="w-full">
          Detailed Info
        </TabsTrigger>
        <TabsTrigger value="team" className="w-full">
          Team & Financial
        </TabsTrigger>
      </TabsList>

      {/* General Company Information Tab */}
      <TabsContent value="general" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">General Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <div className="flex items-center space-x-2">
                  <Input id="name" defaultValue={company.name} />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <div className="flex items-center space-x-2">
                  <Input id="url" defaultValue={company.url} />
                  <Button variant="outline" size="icon" asChild>
                    <a href={company.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Visit website</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="flex items-center space-x-2">
                <Textarea
                  id="address"
                  placeholder="Enter company address..."
                  defaultValue="The postal address for this company is not explicitly provided in the sources. For specific contact details or a physical address, you would need to visit their official website or contact them directly through their provided channels."
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <div className="flex items-center space-x-2">
                  <Input id="contactPerson" placeholder="Enter contact person..." />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <div className="flex items-center space-x-2">
                  <Input id="contactEmail" placeholder="Enter contact email..." />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone Number</Label>
                <div className="flex items-center space-x-2">
                  <Input id="contactPhone" placeholder="Enter contact phone..." />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Where is the company based?</Label>
                <div className="flex items-center space-x-2">
                  <Input id="location" placeholder="Enter company location..." />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="usOffice">Does the company have a US office?</Label>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="Yes">
                    <SelectTrigger id="usOffice">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryNaics">Primary NAICS Code</Label>
                <div className="flex items-center space-x-2">
                  <Input id="primaryNaics" placeholder="Enter primary NAICS code..." />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNaics">Additional NAICS Codes</Label>
              <div className="flex items-center space-x-2">
                <Input id="additionalNaics" placeholder="Enter additional NAICS codes..." />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </div>
            </div>

            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Matching Content Tab */}
      <TabsContent value="matching" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Matching Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="briefOverview">Brief Overview*</Label>
              <div className="flex items-center space-x-2">
                <Textarea
                  id="briefOverview"
                  placeholder="Enter a brief overview of the company..."
                  defaultValue={company.summary}
                  rows={3}
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailedDescription">Detailed Description*</Label>
              <div className="flex items-center space-x-2">
                <Textarea
                  id="detailedDescription"
                  placeholder="Enter a detailed description of the company..."
                  rows={5}
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productList">Product List*</Label>
              <div className="flex items-center space-x-2">
                <Textarea id="productList" placeholder="Enter a list of products or services..." rows={4} />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="matchingSentences">L1 Matching Sentences</Label>
              <div className="flex items-center space-x-2">
                <Textarea
                  id="matchingSentences"
                  placeholder="Enter key matching sentences (one per line)..."
                  rows={6}
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter one sentence per line. These will be used for matching algorithms.
              </p>
            </div>

            {/* New Exclusions Section */}
            <CompanyExclusions initialExclusions={sampleExclusions} />

            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Detailed Info Tab */}
      <TabsContent value="detailed" className="space-y-6">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="generalInfo">
            <AccordionTrigger className="text-base font-medium">General Information</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter general information about the company..." rows={8} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="productDescriptions">
            <AccordionTrigger className="text-base font-medium">Product Descriptions</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter detailed product descriptions..." rows={8} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="technologies">
            <AccordionTrigger className="text-base font-medium">Technologies Used</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter technologies used by the company..." rows={6} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="targetIndustries">
            <AccordionTrigger className="text-base font-medium">Target Industries</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter target industries..." rows={6} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="certifications">
            <AccordionTrigger className="text-base font-medium">Business Certifications</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter business certifications..." rows={4} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="compliance">
            <AccordionTrigger className="text-base font-medium">Compliance Standards</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter compliance standards..." rows={4} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="security">
            <AccordionTrigger className="text-base font-medium">Security Standards</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter security standards..." rows={4} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="govContracts">
            <AccordionTrigger className="text-base font-medium">Government Contracts</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter government contract experience..." rows={6} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="caseStudies">
            <AccordionTrigger className="text-base font-medium">Case Studies</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter case studies..." rows={10} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="testimonials">
            <AccordionTrigger className="text-base font-medium">Testimonials/References</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter testimonials and references..." rows={6} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="other">
            <AccordionTrigger className="text-base font-medium">Other Information</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter any other relevant information..." rows={8} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button>Save Changes</Button>
      </TabsContent>

      {/* Team & Financial Tab */}
      <TabsContent value="team" className="space-y-6">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="insurances">
            <AccordionTrigger className="text-base font-medium">Insurances</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter insurance information..." rows={6} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="financialInfo">
            <AccordionTrigger className="text-base font-medium">Financial Information</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter financial information..." rows={8} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="teamInfo">
            <AccordionTrigger className="text-base font-medium">Team Information</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter team information..." rows={10} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="procurementSites">
            <AccordionTrigger className="text-base font-medium">Listed Procurement Sites</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Textarea placeholder="Enter procurement sites..." rows={4} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button>Save Changes</Button>
      </TabsContent>
    </Tabs>
  )
}
