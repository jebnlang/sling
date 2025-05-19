"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SolicitationRequirementsProps {
  solicitation: {
    id: string
    name: string
    submissionRequirements: string
  }
}

// Sample company data - using just one company as requested
const company = {
  id: "1",
  name: "Acme Inc",
  status: "Qualified",
  matchPercentage: 85,
  lastUpdated: "2023-11-15",
}

// Sample qualification categories and questions
const qualificationCategories = [
  {
    id: "basic",
    title: "Basic RFP Information",
    questions: [
      {
        id: "1",
        question: "What is the submission date/proposal response deadline?",
        requirements: "The proposal response deadline is March 25, 2025 at 10:30 AM Central Time.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "2",
        question: "Where and how to submit questions about the proposal?",
        requirements:
          "Questions or clarifications must be submitted by e-mail to the designated Sole Point of Contact. All such inquiries should be directed to the contact listed in Section 6.1 using the provided e-mail address.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "3",
        question: "When and where are answers to submitted questions posted (date)?",
        requirements:
          "Answers to submitted questions or clarifications are posted as an addendum on the Electronic State Business Daily (ESBD) on March 20, 2025 at 3:30 PM Central Time.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "4",
        question: "Where and how to submit the proposal (e.g. via email, website, etc.)?",
        requirements:
          "Proposals may be submitted via multiple methods: electronically via e-mail to pcsbids@hhsc.state.tx.us, through the HHS Online Bid Room (after completing the two-step registration), or by hand-delivered USB drive as described under the Submission Instructions in Appendix A.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "5",
        question: "Please provide an exact and precise breakdown of the statement of work.",
        requirements:
          "The Statement of Work (SOW) is broken into several parts: (a) Development of a comprehensive marketing plan; (b) Direct Mail – execution of a mailer (postcards) targeting the ten service areas using a value pack distribution list; (c) Print Media – design and placement of 1/2- and 1/4-page advertisements in selected newspapers and senior citizen magazines in the Temple service area; (d) Performance requirements including campaign launch by April 1, 2025, completion of all advertisements by June 30, 2025; (e) Reporting deliverables including biweekly milestone status reports and a final project report summarizing all tactics, creative sets, and geolocations; and (f) Value-added benefits may be proposed at no extra cost, but are optional.",
        answer: "Not applicable",
        fulfilled: true,
      },
    ],
  },
  {
    id: "vendor-registration",
    title: "Vendor Registration Requirements",
    questions: [
      {
        id: "6",
        question: "To submit the proposal, is a notarized document or notary signature needed on any document?",
        requirements: "",
        answer: "Not applicable",
        fulfilled: true,
      },
      {
        id: "7",
        question:
          "Are specific Business Registration requirements mentioned (e.g. Vendor must be registered in a specific state or platform.)?",
        requirements:
          "Yes. Bidders are required to have a valid Texas Identification Number (TIN) and to be registered with state systems (including SAM for a Unique Entity Identifier).",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "8",
        question:
          "Are Specific Legal Business Entity requirements mentioned (e.g. Requirement for a specific type of business entity (e.g., LLC, Corporation). General incorporation is N/A.)?",
        requirements:
          "N/A. The solicitation does not specify a particular legal business entity type (such as LLC or Corporation); it only requires the bidder to be a legally recognized business entity.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "9",
        question:
          "Are Specific State or Local Registration requirements mentioned (e.g. Vendor must be registered in a particular state or locality.)?",
        requirements:
          "Yes. Vendors must be registered in Texas and provide a valid Texas Identification Number (TIN) and UEI. Registration and compliance with state vendor requirements are implied.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "10",
        question:
          "Are there requirements for DUNS / UEI Number (e.g., Requirement to have a unique entity identifier (DUNS or UEI).)?",
        requirements:
          "Yes. The solicitation requires bidders to have a Unique Entity Identifier (UEI) provided by SAM.gov. The bidder's information must include the SAM Unique Entity Identifier (UEI).",
        answer: "Yes",
        fulfilled: true,
      },
    ],
  },
  {
    id: "financials",
    title: "Financials & Past Performance",
    questions: [
      {
        id: "11",
        question:
          "Are there requirements for Financial Statements (e.g., Vendor must submit audited financial statements for the past X years.)?",
        requirements:
          "N/A. While bidders must demonstrate financial capability and solvency, the solicitation does not explicitly require submitting audited financial statements.",
        answer: "N/A",
        fulfilled: true,
      },
      {
        id: "12",
        question:
          "Are there requirements for Minimum Annual Revenue or Net Worth (e.g., Vendor must meet a specific financial threshold.)?",
        requirements: "N/A. There is no stated minimum annual revenue or net worth requirement in the solicitation.",
        answer: "N/A",
        fulfilled: true,
      },
      {
        id: "13",
        question:
          "Are there requirements for Past Performance Requirement (e.g., Vendor must show successful completion of similar contracts in the past X years.)?",
        requirements:
          "Yes. Bidders must have a minimum of one year of relevant experience and demonstrate their capability to perform similar services, as evidenced by prior work. This includes showing past performance on similar contracts.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "14",
        question:
          "Are there requirements for References from Previous Contracts (e.g., Requirement to submit references from past clients/agencies.)?",
        requirements:
          "Yes. Bidders must provide a minimum of three (3) verifiable references from previous contracts or projects of similar size and scope completed within the last year. This is to be submitted on Exhibit D – Bidder Reference Form.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "15",
        question:
          "Are there requirements for past Government Contracting Experience (e.g., Vendor must have past federal, state, or local government contract experience.)?",
        requirements:
          "N/A. While the evaluation may consider past government contracting performance, the solicitation does not explicitly require prior federal, state, or local government contracting experience.",
        answer: "No",
        fulfilled: true,
      },
    ],
  },
  {
    id: "vendor-presence",
    title: "Vendor Presence and Staffing Requirements",
    questions: [
      {
        id: "16",
        question:
          "Are there requirements for Key Personnel Experience (e.g., Certain staff must have specific qualifications, degrees, or certifications.)?",
        requirements:
          "Yes. Key personnel assigned to perform the services must be fully trained and have at least one year of relevant experience. Bidders are required to submit documentation of their experience and qualifications.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "17",
        question:
          "Are there specific Office Location requirements (e.g., Vendor must have a physical office in a specific city, county, or state.)?",
        requirements:
          "N/A. The solicitation does not require the bidder to have an office in a specific location, only that the services be provided in the designated service areas.",
        answer: "N/A",
        fulfilled: true,
      },
      {
        id: "18",
        question:
          "Are there requirements for Work Must Be Performed On-Site (e.g., Some contracts require in-person work rather than remote services.)?",
        requirements:
          "Yes. The services must be performed on site at the specified HHS Agency facilities in the designated service areas during normal business hours. There is an expectation to be present at these locations as required for service delivery and performance monitoring.",
        answer: "TBD",
        fulfilled: true,
      },
      {
        id: "19",
        question:
          "Are there requirements for Face-to-Face Meetings (e.g., The vendor must conduct meetings in-person rather than virtually.)?",
        requirements:
          "Yes. While the solicitation does not mandate routine face-to-face meetings, it does require in-person performance monitoring, biweekly status meetings, and occasional supervisory or performance meetings at HHS facilities.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "20",
        question:
          "Are there requirements for Minimum Number of Employees (e.g., Vendor must have a minimum number of staff members.)?",
        requirements:
          "N/A. The solicitation does not specify a minimum number of employees; however, bidders must demonstrate adequate capacity and resources to perform the work effectively.",
        answer: "N/A",
        fulfilled: true,
      },
    ],
  },
  {
    id: "insurance",
    title: "Insurance, Compliance, Certifications",
    questions: [
      {
        id: "21",
        question:
          "Are there requirements for Minimum Insurance Coverage. If yes, please precisely provide them (e.g., Must provide proof of required insurances such as general liability, worker's compensation, cyber liability, professional liability, etc.)?",
        requirements:
          "Yes. Detailed minimum insurance coverage requirements are provided. Specifically: Workers' Compensation at $1,000,000 per accident/disease per employee; Commercial General Liability with limits of at least $1,000,000 per occurrence and a $2,000,000 aggregate (plus additional coverage for medical expenses and personal injury); Commercial Automobile Liability at $1,000,000; Professional Liability at $1,000,000; and Umbrella Liability Insurance with at least $1,000,000 coverage.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "22",
        question:
          "Are there requirements for Performance Bonds & Payment Bonds (e.g., Some contracts require vendors to provide a performance or payment bond to ensure contract fulfillment.)?",
        requirements:
          "The solicitation states that the Contractor may be required to submit bond documentation at the time of award if requested, but there are no explicit, fixed performance or payment bond requirements set forth.",
        answer: "No",
        fulfilled: true,
      },
      {
        id: "23",
        question:
          "Are there specific Industry Certifications required (e.g., Must hold specific certifications such as ISO 9001, CMMI, SOC 2, PMP, Six Sigma, etc.)?",
        requirements:
          "N/A. The solicitation does not specify any industry certifications such as ISO, CMMI, or others.",
        answer: "No",
        fulfilled: true,
      },
      {
        id: "24",
        question:
          "Are there requirements for Security Clearance (e.g., Employees or company must have a specific security clearance such as Secret, Top Secret.)?",
        requirements:
          "N/A. There are no requirements for security clearances for personnel mentioned in the solicitation.",
        answer: "No",
        fulfilled: true,
      },
      {
        id: "25",
        question:
          "Are there requirements for specific Cybersecurity Requirements (e.g., Compliance with NIST 800-171, CMMC, or FedRAMP if handling government data.)?",
        requirements:
          "N/A. There are no specific cybersecurity standards (e.g., NIST 800-171, CMMC) required in this solicitation.",
        answer: "No",
        fulfilled: true,
      },
    ],
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    questions: [
      {
        id: "26",
        question:
          "Are there requirements for DBE / MWBE / SBA Certifications (e.g., Must be a Disadvantaged Business Enterprise (DBE), Minority/Women-Owned Business Enterprise (MWBE), or meet SBA small business criteria.)? If yes, please precisely state them.",
        requirements:
          "Yes. Bidders are encouraged to include a HUB Subcontracting Plan (HSP) if they intend to subcontract or to document their ability to subcontract to Historically Underutilized Businesses (HUBs). While submission of the HSP is optional, HUB participation is promoted.",
        answer: "No",
        fulfilled: true,
      },
      {
        id: "27",
        question:
          "Are there requirements for Buy American Act / Trade Agreements Act Compliance (e.g., Must use products manufactured in specific countries.)?",
        requirements:
          "Yes. The solicitation includes Buy Texas requirements in the HHS Solicitation Affirmations. Vendors must comply with state preferential policies such as Buy Texas, which prioritize products or services produced in Texas.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "28",
        question:
          "Are there requirements for U.S. Citizenship / Work Authorization (e.g., Employees may need to be U.S. citizens or have certain work authorizations.)?",
        requirements:
          "Yes. All personnel employed by the Contractor must be eligible to work in the United States. Additionally, the Contractor is required to use the U.S. Department of Homeland Security's E-Verify system to verify employment eligibility.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "29",
        question:
          "Are there requirements for Background Checks & Drug Testing (e.g., Employees may need to pass background checks and/or drug testing.)?",
        requirements:
          "Yes. Comprehensive background checks are required for all Contractor and Subcontractor personnel who will perform services at HHS facilities. These checks must include criminal history and verification of Social Security numbers, and must be completed before personnel arrive on site.",
        answer: "Yes",
        fulfilled: true,
      },
      {
        id: "30",
        question:
          "Are there requirements for the use of Specific Software / Technology (e.g., The contract may require the use of proprietary software or government-specified systems.)?",
        requirements:
          "Yes. Proposals must be submitted in specific file formats – Microsoft Office formats (Word, Excel) for text and spreadsheets, and PDF for documents containing signatures. In addition, the response must adhere to the naming conventions and submission guidelines outlined in Appendix A.",
        answer: "Yes",
        fulfilled: true,
      },
    ],
  },
]

export function SolicitationRequirements({ solicitation }: SolicitationRequirementsProps) {
  const [stats, setStats] = useState({
    total: 0,
    yes: 0,
    no: 0,
    tbd: 0,
    na: 0,
  })
  const [questions, setQuestions] = useState(qualificationCategories)

  // Calculate stats when component mounts or questions change
  useEffect(() => {
    calculateStats()
  }, [questions])

  // Function to calculate stats based on current answers
  const calculateStats = () => {
    const allQuestions = questions.flatMap((cat) => cat.questions)
    const totalQuestions = allQuestions.length
    const yesCount = allQuestions.filter((q) => q.answer === "Yes").length
    const noCount = allQuestions.filter((q) => q.answer === "No").length
    const tbdCount = allQuestions.filter((q) => q.answer === "TBD").length
    const naCount = allQuestions.filter((q) => q.answer === "N/A" || q.answer === "Not applicable").length

    setStats({
      total: totalQuestions,
      yes: yesCount,
      no: noCount,
      tbd: tbdCount,
      na: naCount,
    })
  }

  // Handle answer change
  const handleAnswerChange = (categoryId: string, questionId: string, newAnswer: string) => {
    setQuestions((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            questions: category.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  answer: newAnswer,
                }
              }
              return question
            }),
          }
        }
        return category
      }),
    )
  }

  useEffect(() => {
    // Simulate automatic saving whenever questions change
    const saveChanges = async () => {
      // In a real app, this would be an API call to save the data
      console.log("Changes saved automatically")
      // You could add a toast notification here if desired
    }

    // Don't save on initial render, only when questions actually change
    if (questions !== qualificationCategories) {
      saveChanges()
    }
  }, [questions])

  return (
    <div className="space-y-6">
      {/* RFP Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">RFP Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            The solicitation seeks competitive bids for a multimedia advertising campaign to increase awareness and
            stimulate volunteer recruitment for the Foster Grandparents Program across ten designated service areas in
            Texas. The campaign involves developing a marketing plan that includes direct mail and print media
            components, as well as performance monitoring and reporting.
          </p>
        </CardContent>
      </Card>

      {/* Company qualification details - directly showing the qualification view */}
      <div className="space-y-4">
        {/* Company-specific qualification view */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{company.name} Qualification</h3>
          <div className="flex gap-2">
            <Select defaultValue={company.status}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Disqualified">Disqualified</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm">Save Status</Button>
          </div>
        </div>

        {/* Qualification stats */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">All: {stats.total}</Badge>
              <Badge variant="default">
                Yes: {stats.yes} ({Math.round((stats.yes / stats.total) * 100)}%)
              </Badge>
              <Badge variant="destructive">
                No: {stats.no} ({Math.round((stats.no / stats.total) * 100)}%)
              </Badge>
              <Badge variant="secondary">
                TBD: {stats.tbd} ({Math.round((stats.tbd / stats.total) * 100)}%)
              </Badge>
              <Badge variant="outline">
                N/A: {stats.na} ({Math.round((stats.na / stats.total) * 100)}%)
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Qualification questions */}
        <Accordion type="multiple" className="w-full">
          {questions.map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger className="text-base font-medium">{category.title}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {category.questions.map((question) => (
                    <div key={question.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{question.question}</div>
                        <Select
                          value={question.answer}
                          onValueChange={(value) => handleAnswerChange(category.id, question.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="TBD">TBD</SelectItem>
                            <SelectItem value="Not applicable">Not applicable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {question.requirements && (
                        <div className="text-sm text-muted-foreground mt-2 border-l-2 pl-4 py-1">
                          {question.requirements}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
