export interface Task {
  id: string
  title: string // Renamed from description to title
  description?: string // New field for detailed description
  context?: string // New field for links, attachments, additional text
  assigned: string // Task owner
  status: string
  urgency: string
  rfpId: string
  rfpName: string
  dueDate: string
  company?: string
  companyId?: string
  attachments?: TaskAttachment[] // New field for attachments
}

export interface TaskAttachment {
  id: string
  name: string
  url: string
  type: string // file type: document, image, etc.
}
