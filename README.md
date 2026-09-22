# 🚀 Resume Forage Lite

### Smart Resume Builder & ATS Resume Analyzer

<p align="center">

**Build. Analyze. Improve.**

A modern full-stack resume platform for creating professional resumes, analyzing ATS compatibility, and matching resumes with job descriptions.

<br>

<a href="https://resume-forage-lite.netlify.app/" target="_blank">
<img src="https://img.shields.io/badge/🌐%20LIVE%20DEMO-Resume%20Forage%20Lite-155BFF?style=for-the-badge" alt="Live Demo">
</a>

</p>

<p align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">

</p>

<p align="center">

![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Web-orange?style=flat-square)

</p>

---

## 🌐 Live Demo

<p align="center">

### 🚀 Try Resume Forage Lite

<a href="https://resume-forage-lite.netlify.app/" target="_blank">

<img src="https://img.shields.io/badge/OPEN%20LIVE%20WEBSITE-Resume%20Forage%20Lite-155BFF?style=for-the-badge&logo=netlify&logoColor=white">

</a>

</p>

🔗 **Live Website:** https://resume-forage-lite.netlify.app/

---

# 💡 About The Project

**Resume Forage Lite** is a modern full-stack web application that combines resume creation, resume analysis, ATS-oriented evaluation, and job-description matching into one platform.

The goal is to provide users with a single workspace where they can:

```text
📝 Create
   ↓
🎨 Customize
   ↓
👀 Preview
   ↓
📄 Export
   ↓
📊 Analyze
   ↓
🎯 Match
   ↓
💡 Improve
```

---

# ✨ Features

## 📝 Resume Builder

Create professional resumes using structured sections.

### Supported Sections

* 👤 Personal Information
* 🧾 Professional Summary
* 💼 Work Experience
* 🎓 Education
* 🚀 Projects
* 🛠️ Skills
* 📜 Certifications
* 🏆 Achievements
* 🌍 Languages

### Builder Features

* ✅ Live resume preview
* ✅ Drag-and-drop section reordering
* ✅ Multiple professional templates
* ✅ Auto-save
* ✅ Cloud persistence
* ✅ PDF export
* ✅ Structured resume data

---

# 🎨 Resume Templates

| Template        | Description                        |
| --------------- | ---------------------------------- |
| 🔵 Modern       | Contemporary and visually balanced |
| ⚫ Classic       | Traditional professional design    |
| ⚪ Minimal       | Clean and distraction-free         |
| 🟣 Professional | Corporate-oriented layout          |

---

# 📊 ATS Resume Analyzer

Upload an existing resume and receive an automated analysis.

### Supported Formats

```text
📄 PDF
📝 DOCX
📃 TXT
```

### Analysis Includes

* 📈 ATS score
* 🧩 Section completeness
* 🛠️ Skill detection
* 📞 Contact information checks
* 🎨 Formatting analysis
* 📏 Resume length analysis
* 🔹 Bullet-point detection
* ✍️ Action verb analysis
* 🔢 Quantified achievement checks
* 🔗 Link detection
* 💡 Improvement suggestions

---

# 🧠 Skill Detection

Resume Forage Lite can identify **200+ technical skills** from resume content.

### Processing Pipeline

```text
Resume File
    ↓
Text Extraction
    ↓
Content Processing
    ↓
Skill Detection
    ↓
Detected Skills
    ↓
Analysis Report
```

Example technologies:

```text
Python
Java
JavaScript
React
Node.js
SQL
MongoDB
Git
Docker
AWS
Machine Learning
Artificial Intelligence
```

---

# 🎯 Job Description Matching

Compare your resume against a specific job description.

```text
              JOB DESCRIPTION
                     │
                     ▼
              Keyword Analysis
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   Matching      Missing       Missing
    Skills        Skills       Keywords
        │            │            │
        └────────────┼────────────┘
                     ▼
              Match Percentage
                     │
                     ▼
             Improvement Areas
```

### Results

* ✅ Matching skills
* ❌ Missing skills
* 🔎 Missing keywords
* 📊 Match percentage
* 💡 Improvement suggestions

---

# 📈 ATS Scoring System

Resume Forage Lite calculates an application-specific analytical score using multiple categories.

| Category                | Maximum Points | What's Checked                                            |
| ----------------------- | -------------: | --------------------------------------------------------- |
| 📑 Section Completeness |             30 | Experience, Education, Skills, Summary, Projects, Contact |
| 🛠️ Skills Detected     |             25 | Relevant technical skills                                 |
| 🎨 Formatting Quality   |             20 | Email, phone, bullets, length                             |
| ✍️ Content Quality      |             25 | Action verbs, achievements, links                         |
| 🎯 JD Match Bonus       |            +10 | Job-description keyword overlap                           |

### Scoring Pipeline

```text
                    RESUME
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      Sections       Skills     Formatting
          │            │            │
          └────────────┼────────────┘
                       ▼
                Content Quality
                       │
                       ▼
             Job Description Match
                       │
                       ▼
                 ATS Analysis
                       │
                       ▼
              Improvement Insights
```

> **Note:** The ATS score is an application-specific analytical metric and does not guarantee compatibility with every external ATS platform.

---

# 🔐 Authentication & Security

Resume Forage Lite uses **Supabase Authentication** and **Row Level Security (RLS)**.

### Authentication

* 🔐 Email/password authentication
* 🔑 Secure session management
* 🪪 JWT-based authentication
* 👤 User-specific dashboard

### Database Security

```text
              Authenticated User
                       │
                       ▼
                    user_id
                       │
                       ▼
              Row Level Security
                       │
              ┌────────┴────────┐
              ▼                 ▼
           Resumes           Analyses
              │                 │
              └──── Owner ─────┘
```

Users can only access their own resume and analysis records according to the configured RLS policies.

---

# 📊 Personal Dashboard

The dashboard provides a centralized overview of resume activity.

### Dashboard Includes

* 📄 Resume count
* 📊 Analysis count
* ⭐ Average ATS score
* 🕒 Recent analyses
* 📁 Resume management
* 🔍 Analysis history

---

# 🏗️ Application Architecture

```text
                    RESUME FORAGE LITE
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
      RESUME BUILDER                RESUME ANALYZER
             │                             │
       ┌─────┼─────┐                 ┌─────┼─────┐
       ▼     ▼     ▼                 ▼     ▼     ▼
    Sections Templates Preview     Upload Extract Analysis
       │     │     │                 │     │     │
       └─────┴─────┘                 └─────┴─────┘
             │                             │
             ▼                             ▼
         PDF Export                  ATS Evaluation
                                           │
                                           ▼
                                  Job Description Match
                                           │
                                           ▼
                                  Improvement Insights
                                           │
                                           ▼
                                    Supabase Backend
                                           │
                                  ┌────────┴────────┐
                                  ▼                 ▼
                               Resumes           Analyses
                                  │                 │
                                  └────────┬────────┘
                                           ▼
                                      PostgreSQL
```

---

# 🛠️ Technology Stack

| Layer              | Technology                        |
| ------------------ | --------------------------------- |
| 🎨 Frontend        | React 18                          |
| 🔷 Language        | TypeScript                        |
| ⚡ Build Tool       | Vite                              |
| 🎨 Styling         | Tailwind CSS                      |
| 🧩 Icons           | Lucide React                      |
| 🖱️ Drag & Drop    | @dnd-kit/core + @dnd-kit/sortable |
| 📄 PDF Generation  | jsPDF                             |
| 📖 PDF Extraction  | pdfjs-dist                        |
| 📝 DOCX Extraction | mammoth                           |
| 🗄️ Database       | Supabase PostgreSQL               |
| 🔐 Authentication  | Supabase Auth                     |
| 🛡️ Security       | Row Level Security                |
| ☁️ Deployment      | Netlify                           |

---

# 📁 Project Structure

```text
Resume-Forage-Lite/
│
├── public/
│   ├── assets/
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── resume/
│   │   ├── analyzer/
│   │   ├── dashboard/
│   │   └── ui/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Dashboard/
│   │   ├── ResumeBuilder/
│   │   ├── Analyzer/
│   │   └── ...
│   │
│   ├── services/
│   │   ├── resume/
│   │   ├── analyzer/
│   │   └── ...
│   │
│   ├── lib/
│   │   └── supabase.ts
│   │
│   ├── types/
│   ├── utils/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

> Update the structure above if your actual repository folders differ.

---

# ⚙️ Local Setup

## Prerequisites

* Node.js 18+
* npm
* Supabase project

## 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Resume-Forage-Lite
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a local `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Start Development Server

```bash
npm run dev
```

## 5. Build Production Version

```bash
npm run build
```

## 6. Preview Production Build

```bash
npm run preview
```

---

# 🗄️ Database Schema

## `resumes`

```text
id
user_id
title
template
data
created_at
updated_at
```

## `analyses`

```text
id
user_id
file_name
extracted_text
ats_score
analysis_data
created_at
```

---

# 🔒 Security Practices

Resume Forage Lite follows an owner-scoped data model.

* 🔐 Authentication-protected data
* 🛡️ Row Level Security
* 👤 User-specific records
* 🔑 Environment-based configuration
* 🚫 No database passwords in source control
* 🚫 No service-role keys exposed in frontend code

> Never upload `.env`, database passwords, private API keys, service-role keys, or other secrets to GitHub.

---

# ☁️ Deployment

Resume Forage Lite is built as a Vite Single Page Application.

### Deployment Pipeline

```text
Source Code
     ↓
npm run build
     ↓
dist/
     ↓
Netlify
     ↓
🌐 Live Application
```

### Production Environment Variables

Configure:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

---

# 🗺️ Roadmap

## ✅ Completed

* [x] Resume Builder
* [x] Live Preview
* [x] Drag-and-Drop Sections
* [x] Multiple Templates
* [x] PDF Export
* [x] PDF/DOCX/TXT Upload
* [x] ATS Analysis
* [x] Skill Detection
* [x] Formatting Analysis
* [x] Job Description Matching
* [x] Authentication
* [x] Personal Dashboard
* [x] Resume Persistence
* [x] Analysis History
* [x] Supabase Integration
* [x] Row Level Security
* [x] Netlify Deployment

## 🔄 Planned

* [ ] AI-powered resume rewriting
* [ ] AI-generated professional summaries
* [ ] AI bullet-point enhancement
* [ ] Advanced keyword recommendations
* [ ] Additional resume templates
* [ ] Resume version comparison
* [ ] Resume duplication
* [ ] Shareable resume links
* [ ] Advanced analytics
* [ ] Job-specific resume optimization
* [ ] Enhanced ATS analysis
* [ ] More customization options

---

# 🔬 Future Development

### 🧠 Semantic Resume Matching

Explore semantic similarity between resume content and job descriptions beyond simple keyword overlap.

### 🔍 Context-Aware Skill Detection

Analyze relationships between technologies, frameworks, tools, and experience.

```text
Technology
     +
Framework
     +
Tools
     +
Experience
     ↓
Contextual Skill Profile
```

### 💡 Explainable Resume Analysis

Provide clearer explanations for why specific content contributes to the application's analytical results.

### 🎯 Personalized Optimization

```text
Candidate Profile
       +
Resume
       +
Target Job
       ↓
Personalized Resume Insights
```

### 📊 Resume Version Analytics

Compare different resume versions and track changes in application-specific analysis metrics.

---

# 🎯 Use Cases

### 👨‍🎓 Students

Create internship, placement, and entry-level resumes.

### 💻 Developers

Highlight technical skills, projects, certifications, and experience.

### 👔 Job Seekers

Analyze resumes against specific job descriptions.

### 🎓 Fresh Graduates

Identify missing sections, keywords, and content improvements.

### 🔄 Career Switchers

Compare an existing profile against requirements for a target role.

---

# 🌟 Project Highlights

| Area              | Implementation       |
| ----------------- | -------------------- |
| 🖥️ Interface     | Modern SaaS-style UI |
| ⚡ Development     | Vite + React         |
| 🔷 Type Safety    | TypeScript           |
| 🎨 Styling        | Tailwind CSS         |
| 🗄️ Database      | PostgreSQL           |
| 🔐 Authentication | Supabase Auth        |
| 🛡️ Security      | Row Level Security   |
| 📄 Documents      | PDF / DOCX / TXT     |
| 📊 Analysis       | ATS + JD Matching    |
| 🎨 Templates      | 4 Resume Designs     |
| ☁️ Deployment     | Netlify              |

---

# 📸 Screenshots

Add your actual screenshots inside:

```text
screenshots/
├── landing-page.png
├── resume-builder.png
├── resume-preview.png
├── ats-analyzer.png
├── job-matching.png
└── dashboard.png
```

Then add:

```md
## 📸 Application Preview

![Landing Page](./screenshots/landing-page.png)

![Resume Builder](./screenshots/resume-builder.png)

![ATS Analyzer](./screenshots/ats-analyzer.png)

![Dashboard](./screenshots/dashboard.png)
```

---

# 🧪 Quality Checklist

Before deploying a new version:

```bash
npm run build
```

Check:

* [ ] Authentication
* [ ] Resume creation
* [ ] Resume editing
* [ ] Auto-save
* [ ] Template switching
* [ ] PDF export
* [ ] File upload
* [ ] ATS analysis
* [ ] Job description matching
* [ ] Dashboard
* [ ] Database access
* [ ] Responsive UI

---

# 🤝 Contributing

Contributions, ideas, improvements, and bug reports are welcome.

### Contribution Flow

```text
Fork
  ↓
Create Feature Branch
  ↓
Make Changes
  ↓
Test
  ↓
Commit
  ↓
Pull Request
```

Please keep contributions focused, tested, and consistent with the existing project architecture.

---

# 🐛 Issues & Feedback

Found a bug or have an idea?

Open an issue with:

```text
Problem
Expected Behavior
Actual Behavior
Steps to Reproduce
Screenshots
Environment
```

---

# 🔮 Vision

> **Turn resume creation from a static document-writing task into an intelligent, structured career-preparation workflow.**

Resume Forage Lite brings together:

```text
Resume Creation
       +
Resume Analysis
       +
Skill Detection
       +
Job Matching
       +
Improvement Insights
```

into one unified career toolkit.

---

# ⚠️ Disclaimer

Resume Forage Lite provides automated analysis based on the application's own scoring and matching logic.

ATS scores and job-description match percentages are **indicative metrics** and should not be interpreted as guarantees of how a particular employer, ATS platform, or recruitment process will evaluate a resume.

Users should review all recommendations and make final decisions based on their own experience, qualifications, and the requirements of the target role.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# ⭐ Support Resume Forage Lite

If you find this project useful:

⭐ Star the repository
🐛 Report bugs
💡 Suggest features
🔧 Contribute improvements
📢 Share the project

Every contribution helps Resume Forage Lite grow.

---

<p align="center">

## 🚀 Resume Forage Lite

### Build smarter resumes. Analyze better. Improve continuously.

<br>

<a href="https://resume-forage-lite.netlify.app/" target="_blank">
<img src="https://img.shields.io/badge/🌐%20VISIT%20LIVE%20WEBSITE-155BFF?style=for-the-badge" alt="Visit Live Website">
</a>

<br><br>

**Built with ❤️ using React • TypeScript • Tailwind CSS • Supabase**

</p>
