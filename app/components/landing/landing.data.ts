export const HERO_TYPEWRITER_WORDS = [
  "get more interviews",
  "beat the ATS bots",
  "land your dream job",
];

export const CLAUDE_TYPEWRITER_WORDS = [
  "Analyzing tone and style...",
  "Matching ATS keywords...",
  "Scoring resume structure...",
  "Generating improvement tips...",
];

export const CLAUDE_MOBILE_STATUS_ITEMS = [
  "Tone & Style",
  "ATS Keywords",
  "Resume Score",
  "Improvement Tips",
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: "Upload Resume",
    description: "Drop your PDF or DOCX resume. Our AI reads and parses every section instantly.",
  },
  {
    number: 2,
    title: "AI Analysis",
    description: "Claude 4.5 Sonnet scans for ATS keywords, tone, structure, and missing skills.",
  },
  {
    number: 3,
    title: "Get Results",
    description: "Receive your ATS score, actionable fixes, and a polished resume in seconds.",
  },
];

export const PLATFORM_TABS = [
  {
    id: "Match Report",
    label: "Match Report",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    id: "AI Insights",
    label: "AI Insights",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    id: "One-Click Optimize",
    label: "One-Click Optimize",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
  {
    id: "Job Match",
    label: "Job Match",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
] as const;

export type PlatformTabId = (typeof PLATFORM_TABS)[number]["id"];

export const AI_INSIGHT_FEATURES = [
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    label: "Overall ATS Score",
    desc: "Instant score out of 100 with grade breakdown",
  },
  {
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    label: "Tone & Style + Content",
    desc: "Are you sounding professional and relevant?",
  },
  {
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    label: "Skills Gap Detection",
    desc: "Missing keywords the ATS is filtering for",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    label: "Actionable Fix Tips",
    desc: "Specific improvements ranked by impact",
  },
];

export const FOOTER_ANALYSIS_FEATURES = [
  "ATS Score",
  "Resume Content",
  "Tone & Style",
  "Skills Match",
  "Resume Structure",
  "Improvement Tips",
];

export const FOOTER_PRODUCT_LINKS = [
  { label: "Upload Resume", to: "/upload" },
  { label: "Dashboard", to: "/" },
  { label: "Insights", to: "/insights" },
];

export const FOOTER_POWERED_BY = [
  { name: "Claude claude-sonnet-4.5", sub: "by Anthropic" },
  { name: "Puter Cloud", sub: "Free AI infrastructure" },
  { name: "React Router v7", sub: "Frontend framework" },
  { name: "Tailwind CSS", sub: "Styling" },
];

export const FOOTER_SOCIALS = [
  { name: "GitHub", href: "https://github.com/IBs-DevStudio", hoverBg: "hover:bg-slate-700 hover:border-slate-600" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ikrambanadarwebdev",
    hoverBg: "hover:bg-[#0a66c2] hover:border-[#0a66c2]",
  },
  { name: "X (Twitter)", href: "https://x.com/IkramBanadar", hoverBg: "hover:bg-black hover:border-black" },
  { name: "YouTube", href: "https://youtube.com/@ikrambanadar", hoverBg: "hover:bg-[#ff0000] hover:border-[#ff0000]" },
];
