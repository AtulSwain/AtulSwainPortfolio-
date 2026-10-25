import type { EducationEntry, JourneyEntry, Profile, SkillGroup } from "./types";

/* ------------------------------------------------------------------
   Everything about you lives in this file.
   Edit the text, save, and the whole site updates.
------------------------------------------------------------------- */

export const profile: Profile = {
  name: "Atul Swain",
  firstName: "Atul",
  role: "Web developer & AI prompt engineer, moving into data science",
  shortRole: "Developer · AI · Data",
  roles: ["web apps", "AI tools", "data stories", "real-time systems"],
  now: [
    "Building multi-agent tools with LangGraph",
    "Learning statistics & machine learning",
    "Writing up my first data science case study",
  ],
  location: "Mumbai, India",
  timeZone: "Asia/Kolkata",
  email: "swainatul785@gmail.com",
  availability: "Open to internships & freelance",

  // Put your photo at public/images/profile/photo.jpg (portrait, ~4:5 works best).
  photo: "/images/profile/photo.jpg",
  aboutPhoto: "/images/profile/about.jpg",

  tagline: "Building at the intersection of AI, code and ideas",
  headline: "~Turning~ Ideas / into ~Digital~ / Reality.",
  intro:
    "I’m Atul Swain, a developer and AI enthusiast who builds web applications, intelligent tools, and digital experiences that solve real problems.",
  focus: "Building AI tools, learning in public, and growing a stronger foundation in data science.",
  heroQuote: "Technology is more powerful when it helps people.",
  aboutQuote: "A curious mind and consistent effort can turn small ideas into something extraordinary.",
  pillars: [
    { title: "Build", body: "Turn ideas into real products." },
    { title: "Learn", body: "Explore new technologies and AI." },
    { title: "Share", body: "Write, teach and help the community." },
    { title: "Grow", body: "Keep improving and take on bigger challenges." },
  ],

  about: [
    "I like problems that sit between people and data — a shop owner who needs invoices that match the paper pad, an investor who wants to know why a stock moved, a student who learns better when a graph moves on screen.",
    "My path has been hands-on. HTML and CSS taught me to care about detail. JavaScript and Node taught me how the web talks. Python pulled me toward APIs, then toward data: cleaning it, modelling it, and turning it into something a person can actually use.",
    "Today I work across the stack, use AI as a serious engineering tool, and am building a strong foundation in data science. I care about clear interfaces, honest numbers, and code someone else can pick up.",
  ],
  pullQuote: "Start with a question someone actually has. End with something they can use.",

  facts: [
    { label: "Based in", value: "Mumbai, India" },
    { label: "Focus", value: "Full-stack · AI · Data" },
    { label: "Currently", value: "LangGraph agents & market data" },
    { label: "Open to", value: "Internships · Freelance · Collabs" },
  ],

  services: [
    {
      title: "Full-stack web apps",
      body: "Fast, accessible interfaces backed by clean APIs — from a one-page tool to a role-based app with real-time features.",
      tools: ["React", "Next.js", "TypeScript", "FastAPI", "Flask", "Node.js"],
    },
    {
      title: "AI-powered tools",
      body: "Practical AI features with guardrails: prompts that are tested, answers that cite their sources, and agents built as graphs you can reason about.",
      tools: ["Claude API", "LangChain", "LangGraph", "Prompt engineering"],
    },
    {
      title: "Data analysis & products",
      body: "Turning messy data into numbers people can trust — cleaning, modelling and presenting it as a report, a chart or a working tool.",
      tools: ["Python", "pandas", "NumPy", "SQL", "yfinance"],
    },
  ],

  principles: [
    { title: "Start with the question", body: "Understand the decision someone needs to make before writing code or touching data." },
    { title: "Show your working", body: "Every number should say where it came from. Every claim should be checkable." },
    { title: "Keep it simple", body: "The best tool fits how people already work — a small business doesn’t need a database server." },
    { title: "Ship, then improve", body: "Put something real in front of people early, then make it better with what you learn." },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/AtulSwain", handle: "@AtulSwain" },
    // Uncomment and fill in:
    // { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle", handle: "in/your-handle" },
    // { label: "Kaggle", href: "https://www.kaggle.com/your-handle", handle: "@your-handle" },
  ],

  stats: [
    { value: "13+", label: "Projects built" },
    { value: "47", label: "Lessons written" },
    { value: "2024", label: "Coding since" },
    { value: "AI", label: "Always learning" },
  ],

  // Put a PDF at public/resume.pdf and set this to "/resume.pdf" to show a résumé button.
  resume: undefined,
};

export const skills: SkillGroup[] = [
  { title: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
  { title: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS", "three.js", "Framer Motion"] },
  { title: "Backend", items: ["FastAPI", "Flask", "Node.js", "Express", "Socket.IO", "WebRTC"] },
  { title: "Data", items: ["pandas", "NumPy", "yfinance", "PostgreSQL", "SQLite", "MySQL"] },
  { title: "AI", items: ["Prompt engineering", "Claude API", "LangChain", "LangGraph"] },
  { title: "Workflow", items: ["Git", "pytest", "GitHub Actions", "Render", "GitHub Pages"] },
];

export const journey: JourneyEntry[] = [
  {
    date: "Nov 2024",
    title: "Learning in public",
    body: "Opened a GitHub account with one rule: small steps, every day, out in the open.",
  },
  {
    date: "Jan 2026",
    title: "First lines of CSS",
    body: "An Instagram-style “Hello World” post and a hover profile card. Layout, spacing and gradients — learned by hand.",
    projects: ["hello-world", "profile-card"],
  },
  {
    date: "Jan 2026",
    title: "The first real app",
    body: "CodeAtlas: a searchable explorer of programming languages with expandable cards and a dark mode. The moment JavaScript clicked.",
    projects: ["codeatlas"],
  },
  {
    date: "Feb — Mar 2026",
    title: "Interfaces that tell a story",
    body: "An employee collaboration dashboard and editorial tribute pages — practising composition, rhythm and motion.",
    projects: ["webstack", "superman"],
  },
  {
    date: "May 2026",
    title: "Real-time, on the network",
    body: "Private video calls, chat and screen sharing over WebRTC. My first look at how the internet actually moves data between people.",
    projects: ["webspace"],
  },
  {
    date: "Oct 2026",
    title: "Production work, driven by data",
    body: "Invoicing software for a real business, a stock-research terminal for Indian and US markets, a full-stack fan encyclopedia, a team workspace, and a 47-lesson LangGraph guide.",
    projects: ["investiq", "invoice-system", "langgraph-universe", "flowdesk", "berserk-archive"],
  },
  {
    date: "Now",
    title: "Going deeper into data science",
    body: "Statistics, machine learning and analysis — building case studies that start with a question and end with a decision.",
    current: true,
  },
];

export const education: EducationEntry[] = [
  {
    // EDIT: your degree / school.
    period: "Year — Year",
    title: "Your degree or programme",
    place: "Institution name, Mumbai",
    body: "Relevant coursework, achievements, or the focus of your studies.",
    tags: ["Add", "Your", "Subjects"],
  },
  {
    period: "Ongoing",
    title: "Data science, self-directed",
    place: "Courses, books & projects",
    body: "Learning by building — every topic ends in a notebook or a project.",
    tags: ["Statistics", "Python for data", "Machine learning"],
  },
  {
    period: "2026",
    title: "AI engineering",
    place: "Self-study, then teaching it",
    body: "Studied LangChain and LangGraph deeply enough to teach them — the result is LangGraph Universe, a 47-lesson interactive guide.",
    tags: ["LangChain", "LangGraph", "Prompt engineering"],
  },
];

export const studying: string[] = [
  "Statistics & probability",
  "Machine learning with scikit-learn",
  "SQL for analysis",
  "Data visualisation",
  "Multi-agent systems",
];
