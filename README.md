# Sling - RFP Management Platform

Sling is a comprehensive RFP (Request for Proposal) management platform designed to streamline the process of finding, qualifying, and responding to government and enterprise solicitations.

## Project Overview

Sling helps businesses manage their entire RFP workflow:

- **Discover**: Find and research relevant solicitations in a centralized database
- **Qualify**: Assess solicitations for fit with your company's capabilities
- **Collaborate**: Work together on proposal development with team members
- **Track**: Monitor submission deadlines and proposal statuses
- **Manage**: Maintain a repository of company documents and qualifications

## Frontend Tech Stack

### Core Technologies

- **Next.js 14**: React framework with App Router for client and server components
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling and responsive design
- **shadcn/ui**: Component library built on Radix UI primitives

### UI Framework

- Custom component system with consistent design language
- Responsive layout adapting to desktop and mobile views
- Interactive elements including tabs, dialogs, badges, and dropdown menus

### Key Frontend Features

- Chat assistant interfaces for both company and solicitation information
- Collapsible/expandable floating panels for advanced interactions
- Tab-based navigation for content organization
- Comprehensive tables with sorting, filtering, and action menus

## Planned Backend Tech Stack (Recommendations)

### Core Technologies

- **Node.js** with **Express.js** or **NestJS** for API development
- **TypeScript** for type safety and consistency with frontend
- **PostgreSQL** for relational database storage
- **Prisma** as ORM for database interactions

### Authentication & Authorization

- **NextAuth.js**: For authentication with multiple providers
- **JWT** for secure token-based authentication
- Role-based access control for different user levels

### API Architecture

- RESTful API endpoints organized by domain
- GraphQL (optional) for more flexible data fetching
- API versioning for backward compatibility

### Deployment & Infrastructure

- **Docker** for containerization
- **AWS** or **Vercel** for hosting
- **GitHub Actions** for CI/CD pipelines

## Project Structure

```
sling/
├── app/                      # Next.js App Router pages
│   ├── companies/            # Company-related pages
│   │   ├── [id]/             # Dynamic company detail page
│   │   └── page.tsx          # Companies list page
│   └── solicitations/        # Solicitation-related pages
│       ├── [id]/             # Dynamic solicitation detail page
│       └── page.tsx          # Solicitations list page
├── components/               # Reusable React components
│   ├── ui/                   # Base UI components (buttons, cards, etc.)
│   ├── company-*.tsx         # Company-specific components
│   └── solicitation-*.tsx    # Solicitation-specific components
├── lib/                      # Shared utilities and functions
├── public/                   # Static assets
└── styles/                   # Global styles and Tailwind configuration
```

## Backend Development Focus

As the backend developer, you'll need to implement:

1. **API Endpoints**: Create RESTful endpoints for:
   - Companies
   - Solicitations
   - Documents
   - User management
   - Authentication

2. **Database Models**: Design schemas for:
   - Users and roles
   - Companies and contacts
   - Solicitations with versions and status tracking
   - Documents with versioning
   - Qualification criteria

3. **Business Logic**:
   - Document status workflows
   - Solicitation matching algorithms
   - Qualification assessment logic
   - Version control for documents

4. **Integration Points**:
   - Authentication service
   - File storage for documents
   - External data sources for solicitation imports
   - Email notifications

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Start the development server: `npm run dev` or `yarn dev`
4. Access the application at: `http://localhost:3000`

## API Documentation

The backend will need to implement these core endpoints:

```
# Authentication
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh-token

# Companies
GET /api/companies
GET /api/companies/:id
POST /api/companies
PUT /api/companies/:id

# Solicitations
GET /api/solicitations
GET /api/solicitations/:id
POST /api/solicitations
PUT /api/solicitations/:id

# Documents
GET /api/documents/:id
POST /api/documents
PUT /api/documents/:id
DELETE /api/documents/:id

# Qualifications
GET /api/qualifications
GET /api/qualifications/:id
POST /api/qualifications
PUT /api/qualifications/:id
```

## Database Schema (Proposed)

```
User {
  id          String    @id
  email       String    @unique
  password    String    
  name        String
  role        Role      @default(USER)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

Company {
  id          String    @id
  name        String
  description String?
  address     String?
  contact     Json?
  documents   Document[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

Solicitation {
  id                    String    @id
  name                  String
  dueDate               DateTime?
  status                String
  company               Company?  @relation(fields: [companyId], references: [id])
  companyId             String?
  value                 String?
  type                  String?
  baseType              String?
  summary               String?
  submissionRequirements String?
  submissionDate        DateTime?
  solicitationNumber    String?
  issuedBy              String?
  inActivePipeline      Boolean   @default(false)
  qualificationStatus   String?
  documents             Document[]
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
}

Document {
  id              String    @id
  name            String
  type            String?
  status          String
  versions        DocumentVersion[]
  company         Company?  @relation(fields: [companyId], references: [id])
  companyId       String?
  solicitation    Solicitation? @relation(fields: [solicitationId], references: [id])
  solicitationId  String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

DocumentVersion {
  id              String    @id
  document        Document  @relation(fields: [documentId], references: [id])
  documentId      String
  version         Int
  url             String
  status          String
  uploadedBy      User      @relation(fields: [userId], references: [id])
  userId          String
  createdAt       DateTime  @default(now())
}
```

## Development Guidelines

1. Use TypeScript for all backend code
2. Write unit tests for all business logic
3. Follow RESTful API design principles
4. Document all API endpoints with OpenAPI/Swagger
5. Implement proper error handling and validation
6. Use environment variables for configuration
7. Follow a consistent code style (ESLint and Prettier)

## Contact

For questions or clarifications about the project requirements, please contact the project lead. 