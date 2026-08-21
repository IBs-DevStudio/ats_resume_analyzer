# JobFit — AI-Powered ATS Resume Analyzer

JobFit is a full-stack web application that analyzes resumes against job descriptions and returns an ATS (Applicant Tracking System) compatibility score along with actionable feedback — helping job seekers understand how their resume will be read by automated screening systems before they hit submit.

🔗 **Live:** [jobfit-ats.vercel.app](https://jobfit-ats.vercel.app/)
🔗 **GitHub:** [IBs-DevStudio](https://github.com/IBs-DevStudio)

---

## What JobFit Does

- **Resume Upload & Parsing** — Users upload a resume (PDF) which is parsed and prepared for analysis.
- **Job Description Matching** — Users paste or provide a target job description; JobFit compares it against the resume content.
- **AI-Driven ATS Scoring** — An LLM (Claude Sonnet) evaluates the resume against the job description and returns a structured ATS compatibility score.
- **Actionable Feedback** — Beyond just a score, JobFit surfaces specific gaps, missing keywords, and improvement suggestions so users can revise their resume before applying.
- **Cloud-Native Storage & Auth** — File storage, hosting, and backend services are handled via Puter Cloud, removing the need for a traditional custom backend/database for core functionality.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React Router v7 (full-stack React, SSR-capable) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS (with responsive utility classes + CSS `clamp()` for fluid mobile scaling) |
| **AI / LLM** | Claude Sonnet (Anthropic) — model `claude-sonnet-4-5` |
| **Cloud Platform** | Puter Cloud — file storage, hosting, and serverless backend primitives |
| **Deployment** | Vercel |
| **Build Tooling** | Vite (via React Router's built-in bundling and HMR) |

---

## Engineering Highlights

A few notable problems solved during development:

- **Mobile Responsiveness** — Rebuilt layout breakpoints using responsive Tailwind classes combined with CSS `clamp()` for fluid typography and spacing across screen sizes, rather than fixed breakpoints alone.
- **Model Configuration Fix** — Corrected an invalid/outdated model identifier in the AI integration to the correct `claude-sonnet-4-5` string, resolving failed API calls.
- **Robust AI Response Parsing** — Fixed JSON parsing failures caused by the AI model wrapping structured JSON output in markdown code fences (` ```json ... ``` `), by stripping markdown formatting before parsing the response — making the ATS scoring pipeline reliable in production.

---

## Skills & Concepts Demonstrated

- Full-stack React application architecture with React Router v7 (loaders, actions, SSR)
- TypeScript across the entire stack for type safety
- LLM integration and prompt design for structured (JSON) output extraction
- Defensive parsing of AI-generated responses in production
- Cloud-native app design using Puter Cloud (auth/storage without a custom backend)
- Responsive, fluid UI design with Tailwind CSS and CSS `clamp()`
- Production deployment and debugging on Vercel

---

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

---

## Deployment

JobFit is deployed on **Vercel**. The built-in React Router app server is production-ready and can also be deployed to any Node-compatible or Docker-based platform (AWS ECS, Google Cloud Run, Fly.io, Railway, etc.) if self-hosting is preferred.

```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

---

## Author

**Ikram Banadar** — IBs-DevStudio
[Portfolio](https://ikram-portfolio-main.vercel.app/) · [GitHub](https://github.com/IBs-DevStudio) · [LinkedIn](https://www.linkedin.com/in/ikrambanadarwebdev/)

---

Built with ❤️ using React Router, TypeScript, and Claude.
