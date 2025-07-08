# Project Setup Guide

Welcome to the D3Flo Invoice Intelligence Platform! This guide walks you through the full setup required to run the application locally or in a development environment.

--- 
## Prerequisites
Ensure you have the following installed:

*  **Node.js** ≥ v18+

*  **pnpm** ≥ v8+

Install it with:
```
npm install -g pnpm
```

* PostgreSQL or compatible DB (used by Prisma)
---
## Directory Structure Overview

```
/app             - App routes, API, UI components
/components      - Reusable UI elements
/lib             - Utilities (CSV export, invoice agents)
/trpc            - Backend procedures and logic
/styles          - Tailwind and global styles
```
---

## Getting started
### 1. Clone the reporsitory
```
git clone <your-repo-url>
cd your-project
```
### 2. Install dependencies
```
pnpm install
```
### 3. Set up your environment variables
Create a `.env` file at the root of your project. You can copy from `.env.example` if provided, and define the following:
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
LANGBASE_API_KEY=your_langbase_key
GOOGLE_API_KEY=your_google_api_key
ARCJET_KEY=your_arcjet_key
```
### 4. Run the database migration
```
npx prisma migrate dev --name init
```
You can also introspect the existing DB schema if needed:
```
npx prisma db pull
```
### 5. Start the development server
```
pnpm dev
```

Visit [Preview Website](http://localhost:3000) to view the app.

---

## Key Features
### 1. Invoice Intelligence (AI-powered)
Located in `/lib/invoiceAgent.ts`

* Extracts structured data from invoice text
* Performs financial insights analysis
* Auto-generates payment reminder emails using Gemini 2.0 via Langbase

### 2. CSV Export Utility
Found in `lib/downloadCSV.ts`

* Converts arrays of invoice data into CSV
* Adds timestamped filenames
* Displays toast notifications using `sonner`

### 3. API Rate Limiting
Uses `@arcjet/next` in `lib/` and `trpc/`:
* Based on IP (`ip.src`)
* Token bucket model (10 requests/hour)

---
## Tooling & Configuration:
ESLint (`.eslintrc.json`)
* Uses `next/core-web-vitals` config
* Custom rules for TS usage and relaxed JSX handling

TypeScript (`tsconfig.json`)
* Strict mode enabled
* JSX support (`preserve`)
* Modern module resolution
* Path aliasing (`@/*` → `./*`)

---
## Quality & Linting
Run lint checks:
```
pnpm lint
```

Or auro-fix:
```
pnpm lint --fix
```

---
## Deployment

You can deploy to Vercel, Netlify, or any Node-compatible environment. Make sure to configure all `.env` variables in your hosting provider's dashboard.

---

## Aditional Notes
* Uses `tailwind-merge` and `clsx` for clean class name composition
* Generates consistent section IDs with `createSectionId` helper
* Prisma Client and database utils found under `app/utils/db.ts`

## Licences
MIT License – free to use and modify.