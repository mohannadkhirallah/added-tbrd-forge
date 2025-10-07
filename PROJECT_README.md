# ADDED AI Agent - TBRD Generator Portal

Enterprise internal portal for ADDED staff to create cases, upload Business Requirements Documents (BRDs), and generate Technical BRDs (TBRDs) using AI-powered analysis.

## Features

- **Microsoft Entra ID Authentication**: Secure sign-in with Azure AD
- **Case Management**: Create and manage BRD cases
- **Document Upload**: Drag-and-drop PDF upload with validation
- **AI Pipeline**: Automated TBRD generation workflow
- **Interactive Editing**: Section-based manual and AI-assisted editing
- **Search**: Full-text search across documents
- **Conversation**: Chat interface with AI agent
- **Dashboard**: KPIs and activity monitoring
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Authentication**: @azure/msal-react + @azure/msal-browser
- **State Management**: React Query for server state
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Microsoft Entra ID (Azure AD) application registration
- Backend API endpoint (see API Contract below)

### Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:

```env
# API Configuration
VITE_API_BASE_URL=https://your-api-endpoint.com

# Microsoft Entra ID Configuration
VITE_AAD_CLIENT_ID=your-client-id
VITE_AAD_TENANT_ID=your-tenant-id
VITE_AAD_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
```

### Azure AD Setup

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to Microsoft Entra ID > App registrations > New registration
3. Configure:
   - Name: "ADDED AI Agent Portal"
   - Supported account types: "Accounts in this organizational directory only"
   - Redirect URI: `http://localhost:8080` (for dev)
4. Copy the Application (client) ID and Directory (tenant) ID to your `.env`
5. Under "Authentication", enable "Access tokens" and "ID tokens"
6. Under "API permissions", add "User.Read" (Microsoft Graph)

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication components (AuthProvider, AuthenticatedRoute)
│   ├── cases/         # Case-related components (NewCaseDialog)
│   ├── layout/        # Layout components (AppLayout, Header, Sidebar)
│   └── ui/            # Shadcn UI components
├── hooks/
│   ├── use-theme.tsx  # Dark mode theme provider
│   └── use-mobile.tsx # Mobile detection hook
├── lib/
│   ├── api-client.ts  # API client with auth token handling
│   ├── msal-config.ts # MSAL configuration
│   └── utils.ts       # Utility functions
├── pages/
│   ├── Login.tsx      # Login page
│   ├── Dashboard.tsx  # Dashboard with KPIs
│   ├── Cases.tsx      # Cases list
│   ├── CaseDetail.tsx # Case detail view
│   ├── Upload.tsx     # BRD upload page
│   ├── Pipeline.tsx   # AI pipeline execution
│   ├── TBRD.tsx       # TBRD viewer/editor
│   ├── Search.tsx     # Search interface
│   └── Conversation.tsx # AI chat interface
├── types/
│   └── api.ts         # TypeScript API type definitions
├── App.tsx            # Main app with routing
└── main.tsx           # Entry point
```

## API Contract

The portal expects a backend API with the following endpoints:

### Cases
- `POST /cases?name={name}` - Create new case
- `GET /cases/{case_id}` - Get case details

### Documents
- `POST /cases/{case_id}/documents` - Upload BRD (multipart/form-data, file=PDF)
- `POST /cases/{case_id}/documents/ingest` - Trigger document ingestion

### Pipeline
- `POST /cases/{case_id}/pipeline/run` - Run complete pipeline
- `POST /cases/{case_id}/pipeline/analysis` - Run analysis step
- `POST /cases/{case_id}/pipeline/sections/propose?instruction={text}` - Propose sections
- `POST /cases/{case_id}/pipeline/sections/lock` - Lock sections
- `POST /cases/{case_id}/pipeline/generation` - Generate TBRD
- `GET /cases/{case_id}/pipeline/generation/status` - Poll generation status

### Content
- `GET /cases/{case_id}/content/sections` - Get TBRD sections
- `GET /cases/{case_id}/content/tbrd` - Get full TBRD HTML

### Edits
- `POST /cases/{case_id}/edits/natural?instruction={text}&scope_key={section}` - AI edit
- `PATCH /cases/{case_id}/edits/manual` - Manual section save

### Search
- `GET /cases/{case_id}/search?q={query}&k={limit}` - Search documents

### Conversation
- `GET /cases/{case_id}/conversation/messages?limit={n}` - Get message history
- `POST /cases/{case_id}/conversation/messages?sender=user&role=user&content={text}` - Add message
- `POST /cases/{case_id}/conversation/chat?message={text}` - Chat with agent

All API requests automatically include:
- `Authorization: Bearer {token}` header (MSAL token)
- Content-Type and other headers as needed

## Design System

The portal uses a custom design system defined in `src/index.css` and `tailwind.config.ts`:

### Colors
- **Primary**: Deep blue (hsl(220, 90%, 56%)) - Main brand color
- **Secondary**: Vibrant cyan (hsl(180, 80%, 50%)) - Accent color
- **Success**: Green for completed states
- **Warning**: Orange for warnings
- **Destructive**: Red for errors

### Components
All UI components use semantic tokens from the design system. Never use hardcoded colors like `text-white` or `bg-black`. Use variants like:
- `Button` with variants: default, outline, ghost
- `Card` with shadow-md for elevation
- `Badge` with variants for status indicators

## Authentication Flow

1. User navigates to any protected route
2. `AuthenticatedRoute` checks if user is signed in
3. If not, redirects to `/login`
4. User clicks "Sign in with Microsoft"
5. MSAL redirects to Microsoft login
6. After successful auth, redirects back to app
7. All API requests include Bearer token via `apiRequest()` helper

## Development Notes

- **Mock Data**: Current implementation uses mock data. Replace with actual API calls using `apiRequest()` from `src/lib/api-client.ts`
- **Polling**: Pipeline status should poll every 2 seconds using React Query
- **Error Handling**: 401/403 responses trigger token refresh or re-login
- **File Validation**: Only PDF files up to 10MB are accepted
- **Responsive**: All pages are mobile-friendly
- **Accessibility**: Keyboard navigation and ARIA labels included

## Deployment

1. Build the production bundle:
```bash
npm run build
```

2. Configure your hosting environment variables
3. Deploy the `dist/` folder to your hosting provider
4. Update Azure AD redirect URIs to include production URL
5. Configure API_BASE_URL for production backend

## Security Considerations

- All authentication tokens stored in sessionStorage (MSAL default)
- Bearer tokens included in all API requests
- HTTPS required for production
- CORS must be configured on backend API
- File uploads validated client and server-side

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

Internal ADDED project - All rights reserved
