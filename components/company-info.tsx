"use client"

import { ExternalLink } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CompanyExclusions } from "@/components/company-exclusions"
import { useToast } from "@/components/ui/use-toast"

interface CompanyInfoProps {
  company: {
    id: string
    name: string
    url: string
    summary: string
  }
}

export function CompanyInfo({ company }: CompanyInfoProps) {
  const { toast } = useToast()
  const [companyData, setCompanyData] = useState({
    ...company
  })

  const handleSave = (field: string, value: string) => {
    // Update local state
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Show toast notification
    toast({
      title: "Changes saved",
      description: `Successfully updated ${field}`,
    })
    
    // In a real application, you would also send this data to your backend
    // e.g., api.updateCompany(company.id, { [field]: value })
  }

  const sampleExclusions = [
    "This company does not do web design",
    "This company does not work with government clients",
    "This company does not provide on-site support",
  ]

  return (
    <Accordion type="multiple" className="w-full space-y-4" defaultValue={["general", "matching"]}>
      <AccordionItem value="general">
        <AccordionTrigger className="text-lg font-medium hover:no-underline">General Company Information</AccordionTrigger>
        <AccordionContent className="space-y-6 pt-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input 
                id="name" 
                defaultValue={company.name} 
                onBlur={(e) => handleSave('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  id="url" 
                  defaultValue={company.url}
                  onBlur={(e) => handleSave('url', e.target.value)}
                />
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
            <Textarea
              id="address"
              placeholder="Enter company address..."
              defaultValue="The postal address for this company is not explicitly provided in the sources. For specific contact details or a physical address, you would need to visit their official website or contact them directly through their provided channels."
              onBlur={(e) => handleSave('address', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input 
                id="contactPerson" 
                placeholder="Enter contact person..." 
                onBlur={(e) => handleSave('contactPerson', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input 
                id="contactEmail" 
                placeholder="Enter contact email..." 
                onBlur={(e) => handleSave('contactEmail', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone Number</Label>
              <Input 
                id="contactPhone" 
                placeholder="Enter contact phone..." 
                onBlur={(e) => handleSave('contactPhone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Where is the company based?</Label>
              <Input 
                id="location" 
                placeholder="Enter company location..." 
                onBlur={(e) => handleSave('location', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="usOffice">Does the company have a US office?</Label>
              <Select 
                defaultValue="Yes"
                onValueChange={(value) => handleSave('usOffice', value)}
              >
                <SelectTrigger id="usOffice">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="primaryNaics">Primary NAICS Code</Label>
              <Input 
                id="primaryNaics" 
                placeholder="Enter primary NAICS code..." 
                onBlur={(e) => handleSave('primaryNaics', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNaics">Additional NAICS Codes</Label>
            <Input 
              id="additionalNaics" 
              placeholder="Enter additional NAICS codes..." 
              onBlur={(e) => handleSave('additionalNaics', e.target.value)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="matching">
        <AccordionTrigger className="text-lg font-medium hover:no-underline">Basic Matching Content</AccordionTrigger>
        <AccordionContent className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="briefOverview">Brief Overview*</Label>
            <Textarea
              id="briefOverview"
              placeholder="Enter a brief overview of the company..."
              defaultValue={company.summary}
              rows={3}
              onBlur={(e) => handleSave('summary', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="detailedDescription">Detailed Description*</Label>
            <Textarea
              id="detailedDescription"
              placeholder="Enter a detailed description of the company..."
              rows={5}
              onBlur={(e) => handleSave('detailedDescription', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productList">Product List*</Label>
            <Textarea 
              id="productList" 
              placeholder="Enter a list of products or services..." 
              rows={4} 
              onBlur={(e) => handleSave('productList', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="matchingSentences">L1 Matching Sentences</Label>
            <Textarea
              id="matchingSentences"
              placeholder="Enter key matching sentences (one per line)..."
              rows={6}
              onBlur={(e) => handleSave('matchingSentences', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Enter one sentence per line. These will be used for matching algorithms.
            </p>
          </div>

          <CompanyExclusions initialExclusions={sampleExclusions} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="detailed">
        <AccordionTrigger className="text-lg font-medium hover:no-underline">Detailed Info</AccordionTrigger>
        <AccordionContent className="pt-2">
          <Accordion type="multiple" className="w-full space-y-2">
            <AccordionItem value="generalInfo">
              <AccordionTrigger className="text-base font-medium">General Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter general information about the company..." 
                    rows={8} 
                    onBlur={(e) => handleSave('generalInfo', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="productDescriptions">
              <AccordionTrigger className="text-base font-medium">Product Descriptions</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter detailed product descriptions..." 
                    rows={8} 
                    onBlur={(e) => handleSave('productDescriptions', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="technologies">
              <AccordionTrigger className="text-base font-medium">Technologies Used</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter technologies used by the company..." 
                    rows={6} 
                    onBlur={(e) => handleSave('technologies', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="targetIndustries">
              <AccordionTrigger className="text-base font-medium">Target Industries</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter target industries..." 
                    rows={6} 
                    onBlur={(e) => handleSave('targetIndustries', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="certifications">
              <AccordionTrigger className="text-base font-medium">Business Certifications</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter business certifications..." 
                    rows={4} 
                    onBlur={(e) => handleSave('certifications', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="compliance">
              <AccordionTrigger className="text-base font-medium">Compliance Standards</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter compliance standards..." 
                    rows={4} 
                    onBlur={(e) => handleSave('compliance', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security">
              <AccordionTrigger className="text-base font-medium">Security Standards</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter security standards..." 
                    rows={4} 
                    onBlur={(e) => handleSave('security', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="govContracts">
              <AccordionTrigger className="text-base font-medium">Government Contracts</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter government contract experience..." 
                    rows={6} 
                    onBlur={(e) => handleSave('govContracts', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="caseStudies">
              <AccordionTrigger className="text-base font-medium">Case Studies</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter case studies..." 
                    rows={10} 
                    onBlur={(e) => handleSave('caseStudies', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="testimonials">
              <AccordionTrigger className="text-base font-medium">Testimonials/References</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter testimonials and references..." 
                    rows={6} 
                    onBlur={(e) => handleSave('testimonials', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="other">
              <AccordionTrigger className="text-base font-medium">Other Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter any other relevant information..." 
                    rows={8} 
                    onBlur={(e) => handleSave('otherInfo', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="team">
        <AccordionTrigger className="text-lg font-medium hover:no-underline">Team & Financial</AccordionTrigger>
        <AccordionContent className="pt-2">
          <Accordion type="multiple" className="w-full space-y-2">
            <AccordionItem value="insurances">
              <AccordionTrigger className="text-base font-medium">Insurances</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter insurance information..." 
                    rows={6} 
                    onBlur={(e) => handleSave('insurances', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="financialInfo">
              <AccordionTrigger className="text-base font-medium">Financial Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter financial information..." 
                    rows={8} 
                    onBlur={(e) => handleSave('financialInfo', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="teamInfo">
              <AccordionTrigger className="text-base font-medium">Team Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter team information..." 
                    rows={10} 
                    onBlur={(e) => handleSave('teamInfo', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="procurementSites">
              <AccordionTrigger className="text-base font-medium">Listed Procurement Sites</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <Textarea 
                    placeholder="Enter procurement sites..." 
                    rows={4} 
                    onBlur={(e) => handleSave('procurementSites', e.target.value)}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
