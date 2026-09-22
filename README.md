# ResumeForge — Resume Builder & Resume Analyzer

A full-stack resume builder and ATS resume analyzer with a modern SaaS UI. Build professional resumes with drag-and-drop section reordering, live preview, multiple templates, and PDF download. Upload PDF/DOCX resumes to get an ATS score, detected skills, formatting issues, and job description matching.

## Features

### Resume Builder
- **Full resume sections**: Personal Info, Summary, Experience, Education, Projects, Skills, Certifications, Achievements, Languages
- **Drag-and-drop section reordering** — reorder resume sections to control the layout
- **Live preview** — see your resume update in real time as you type
- **4 templates**: Modern, Classic, Minimal, Professional
- **PDF download** — export your resume as a polished PDF
- **Auto-save** to the database — your resumes persist across sessions

### Resume Analyzer
- **File upload**: PDF, DOCX, and TXT support with client-side text extraction
- **ATS score** (0-100) based on section completeness, skills, formatting, and content quality
- **Skill detection** — automatically identifies 200+ technical skills from your resume text
- **Formatting issues** — detects missing contact info, bullet points, length problems
- **Content issues** — checks for action verbs, quantified achievements, links
- **Improvement suggestions** — actionable recommendations to improve your resume

### Job Description Matching
- **Match percentage** — see how well your resume aligns with a job description
- **Matching skills** — skills you have that the job requires
- **Missing skills** — skills the job requires that your resume lacks
- **Missing keywords** — specific keywords from the JD not found in your resume

### Authentication & Dashboard
- **Email/password authentication** with secure session management
- **Personal dashboard** — all your resumes and analysis history in one place
- **Stats overview** — resume count, analysis count, average ATS score
- **Recent analyses** — quick view of past analysis results

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Drag & Drop | @dnd-kit/core + @dnd-kit/sortable |
| PDF Generation | jsPDF |
| PDF Text Extraction | pdfjs-dist |
| DOCX Text Extraction | mammoth |
| Backend / Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password, JWT sessions) |
| Security | Row Level Security (RLS) — users can only access their own data |

## Local Setup

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

The following are pre-configured in `.env`:
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anonymous API key

## Database Schema

### Tables

**resumes**
- `id` (uuid, PK)
- `user_id` (uuid, FK to auth.users)
- `title` (text)
- `template` (text)
- `data` (jsonb — full resume content)
- `created_at`, `updated_at` (timestamps)

**analyses**
- `id` (uuid, PK)
- `user_id` (uuid, FK to auth.users)
- `file_name` (text)
- `extracted_text` (text)
- `ats_score` (integer)
- `analysis_data` (jsonb — full analysis results)
- `created_at` (timestamp)

### Security (RLS)

Both tables have Row Level Security enabled with owner-scoped policies:
- Users can only read, insert, update, and delete their own rows
- `user_id` defaults to `auth.uid()` on insert

## How ATS Scoring Works

The ATS score (0-100) is calculated from four categories:

| Category | Max Points | What's Checked |
|----------|-----------|----------------|
| Section completeness | 30 | Presence of Experience, Education, Skills, Summary, Projects, Contact |
| Skills detected | 25 | Number of relevant technical skills found (up to 15) |
| Formatting quality | 20 | Email, phone, bullet points, appropriate length |
| Content quality | 25 | Action verbs, quantified achievements, links |
| JD match bonus | +10 | Keyword overlap with job description (if provided) |

## Deployment

This app is built with Vite and deploys as a static SPA. The database and auth are handled by Supabase (managed cloud).

1. Run `npm run build` to produce the `dist/` folder
2. Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, etc.)
3. Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in your deployment environment

## License

MIT
