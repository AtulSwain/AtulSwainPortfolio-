import type { Project } from "./types";

/* ------------------------------------------------------------------
   Your projects. Order here = order on the site.
   - Put images in public/images/projects/<slug>/ and reference them below.
   - No cover? Leave `cover` out and a designed cover is generated
     from `palette`.
   - Each project gets its own page at /work/<slug>.
------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: "otakuva",
    title: "OTAKUVA",
    tagline: "Your personal anime life archive.",
    summary:
      "An editorial, cinematic home for the anime you watch, the people and studios behind it, and your own anime history — with discovery, schedules, a personal library, community threads and real-time chat.",
    year: "2026",
    category: "Full-stack",
    role: "Product, design & engineering",
    featured: true,
    status: "In active development · private repo",
    cover: "/images/projects/otakuva/cover.webp",
    palette: ["#0b0b10", "#c8f04a"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.IO", "JWT", "Cloudflare R2"],
    links: {},
    highlights: [
      "Anime dossier pages: scene-backdrop hero, Vibe score breakdown, credits, cast, schedule and production timeline",
      "Explore by type, genre, year, season, studio, score and rating; a full release schedule and calendar",
      "Personal library (watching, completed, plan to watch…) with movies treated as first-class content",
      "Community threads, 1:1 messages and a live chat room per anime title over Socket.IO",
      "Data from Jikan (MyAnimeList) and AniList, normalised through an ingestion layer",
    ],
    metrics: [
      { value: "2", label: "Data providers unified" },
      { value: "8", label: "Core product areas" },
      { value: "5", label: "Design principles" },
    ],
    sections: [
      {
        heading: "The idea",
        body: "Not a streaming service and not another tracker dashboard. OTAKUVA combines a Letterboxd-style personal archive, MUBI’s editorial pacing and AniList’s depth of information — with its own visual language: restrained dark UI, row-based layouts instead of boxed cards, and artwork as the main visual anchor.",
      },
      {
        heading: "Design principles",
        body: "Every screen is built against five rules before anything else.",
        bullets: [
          "Content over containers",
          "Information over decoration",
          "Typography over borders",
          "Spacing over UI chrome",
          "Hierarchy over card density",
        ],
      },
      {
        heading: "Under the hood",
        body: "Next.js App Router with TypeScript and CSS Modules, PostgreSQL through Prisma, JWT authentication, Socket.IO for real-time messaging and Cloudflare R2 for user media. Provider data from Jikan and AniList passes through an ingestion layer so every anime, studio, person, episode and news item is cross-linked — nothing is a dead end.",
      },
      {
        heading: "What’s next",
        body: "Finishing the row-based editorial redesign of the home page and anime dossier, personalised discovery (“because you watched…”), and moderation tools for public chat rooms.",
      },
    ],
  },
  {
    slug: "investiq",
    title: "InvestIQ",
    tagline: "A research terminal that shows its working.",
    summary:
      "A stock-research and financial-intelligence terminal for Indian (NSE/BSE) and US stocks. Every metric shows its source, period, currency and whether it is reported, estimated or calculated.",
    year: "2026",
    category: "Data",
    role: "Design, data & engineering",
    featured: true,
    cover: "/images/projects/investiq/cover.webp",
    palette: ["#0f1a2b", "#3b82f6"],
    stack: ["Python", "FastAPI", "pandas", "NumPy", "yfinance", "Claude API", "pytest"],
    links: {
      live: "https://atulswain.github.io/InvestIQ-AI/",
      code: "https://github.com/AtulSwain/InvestIQ-AI",
    },
    highlights: [
      "One workflow: discover → research → compare → value → monitor → build a thesis",
      "~45 metrics per company, a screener, and side-by-side comparison of up to four stocks",
      "Reverse DCF, scenarios and a 10-dimension risk profile with evidence",
      "AI research answers where every claim links to a numbered source",
    ],
    metrics: [
      { value: "~45", label: "Metrics per company" },
      { value: "10", label: "Risk dimensions" },
      { value: "2", label: "Markets covered" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Retail investors in India jump between five or six sites to answer one question: is this stock worth it, and why did it just move? Numbers disagree, sources are hidden, and AI tools answer confidently without citing anything.",
      },
      {
        heading: "The approach",
        body: "I organised the whole product around a single research workflow and made provenance a first-class feature. Hover any value and you see where it came from, for which period, and whether it is reported or calculated.",
        bullets: [
          "Market data from Yahoo Finance via yfinance — free and keyless — with an offline demo mode",
          "News classified into earnings, M&A, regulatory, insider and more, then linked to that day’s price move",
          "AI answers built on InvestIQ’s own data first, with numbered citations",
        ],
      },
      {
        heading: "What I learned",
        body: "Financial data is messy in ways that matter: currencies, fiscal years and restatements. Treating every number as a claim with a source made the product more trustworthy — and made the code easier to test.",
      },
    ],
  },
  {
    slug: "langgraph-universe",
    title: "LangGraph Universe",
    tagline: "Learning agents by watching them think.",
    summary:
      "An interactive, 3D study guide to LangGraph and the LangChain ecosystem — 47 lessons in 9 modules, with animated diagrams of 12 agent architectures and code in Python and TypeScript.",
    year: "2026",
    category: "AI",
    role: "Author, design & engineering",
    featured: true,
    cover: "/images/projects/langgraph-universe/cover.webp",
    palette: ["#0b0b10", "#a78bfa"],
    gallery: [
      { src: "/images/projects/langgraph-universe/study-guide.webp", alt: "Study guide lesson page", caption: "47 lessons in 9 modules, with progress tracking" },
      { src: "/images/projects/langgraph-universe/lesson-3d.webp", alt: "Animated 3D map-reduce graph above code", caption: "3D diagrams beside Python & TypeScript code" },
      { src: "/images/projects/langgraph-universe/patterns.webp", alt: "Supervisor multi-agent pattern in 3D", caption: "12 agent architectures, animated step by step" },
      { src: "/images/projects/langgraph-universe/architecture.webp", alt: "3D stack of the LangChain ecosystem", caption: "The LangChain ecosystem as a 3D stack" },
    ],
    stack: ["React", "TypeScript", "three.js", "React Three Fiber", "Framer Motion", "Vite"],
    links: {
      live: "https://atulswain.github.io/LangGraph/",
      code: "https://github.com/AtulSwain/LangGraph",
    },
    highlights: [
      "47 lessons across 9 modules with progress tracking",
      "12 agent patterns animated step by step in 3D",
      "Every lesson pairs a diagram with Python and TypeScript code",
      "A playground and guided project walkthroughs",
    ],
    metrics: [
      { value: "47", label: "Lessons" },
      { value: "9", label: "Modules" },
      { value: "12", label: "Agent patterns" },
    ],
    sections: [
      {
        heading: "Why I built it",
        body: "Agent frameworks are easiest to understand when you can see state flow between nodes. Most docs show static boxes and arrows. I wanted a guide where the graph actually runs in front of you.",
      },
      {
        heading: "How it works",
        body: "Each lesson pairs a live three.js scene with the code that produces it. Patterns like supervisor, map-reduce and human-in-the-loop are animated one step at a time, so you can follow exactly what each node receives and returns.",
      },
      {
        heading: "What I learned",
        body: "Teaching a topic is the fastest way to find the gaps in your own understanding. Writing 47 lessons forced me to learn LangGraph properly — and to keep a large React codebase organised.",
      },
    ],
  },
  {
    slug: "invoice-system",
    title: "Vinayak Creation Invoicing",
    tagline: "Software built around how a real shop works.",
    summary:
      "A web app for making GST tax invoices laid out exactly like the shop’s paper pad, plus a one-click monthly report for the accountant. Works on a phone or a laptop.",
    year: "2026",
    category: "Business",
    role: "Sole developer",
    featured: true,
    cover: "/images/projects/invoice-system/cover.webp",
    palette: ["#fff7ed", "#c2410c"],
    stack: ["Python", "Flask", "SQLite", "ReportLab", "openpyxl", "Waitress"],
    links: { code: "https://github.com/AtulSwain/Invoice-system" },
    highlights: [
      "Invoices that print exactly like the paper pad the business already used",
      "Owner and worker roles with different permissions",
      "Monthly Excel report for the CA, PDF export for every invoice",
      "Only five dependencies; all data in one SQLite file that backs up by copying",
    ],
    sections: [
      {
        heading: "The brief",
        body: "A small business wanted to stop writing GST invoices by hand without changing how their invoices looked, and wanted the monthly numbers ready for their accountant.",
      },
      {
        heading: "Decisions",
        body: "I chose Flask and SQLite deliberately: no database server to install or pay for, and backups are a file copy. PDFs are generated in pure Python so it runs on Windows, Mac, Linux or a cheap host.",
        bullets: [
          "Invoice numbering is confirmed once against the paper ledger, then locked",
          "Past ledger bills can be imported from a spreadsheet template",
          "Daily automatic database backups",
        ],
      },
      {
        heading: "Outcome",
        body: "It runs from phones on the shop’s Wi-Fi or online on a cheap host. It taught me that the best software for a business is often the simplest software that fits how they already work.",
      },
    ],
  },
  {
    slug: "berserk-archive",
    title: "Berserk Archive",
    tagline: "A fan encyclopedia, engineered to grow.",
    summary:
      "A fan-made encyclopedia and community platform for the Berserk series. Phase one lays the foundation: a modular React frontend, a FastAPI backend, and a structure ready for forums, search and profiles.",
    year: "2026",
    category: "Full-stack",
    role: "Architecture & engineering",
    palette: ["#140c0c", "#b91c1c"],
    stack: ["React", "TypeScript", "Tailwind CSS", "GSAP", "FastAPI", "SQLAlchemy", "PostgreSQL"],
    links: { code: "https://github.com/AtulSwain/BerserkFanMadeClub" },
    highlights: [
      "Typed React + Vite frontend with routing and motion",
      "FastAPI backend with SQLAlchemy, Alembic migrations and PostgreSQL",
      "Roadmap for auth, forums, search (Meilisearch), caching (Redis) and Docker",
    ],
    sections: [
      {
        heading: "Goal",
        body: "Build something I’d genuinely use as a fan, and use it to practise designing a codebase that can scale beyond a weekend project.",
      },
      {
        heading: "Architecture",
        body: "Clear boundaries between frontend, backend, database and docs. Business logic lives in services, not route handlers, so features like forums and search can be added without rewrites.",
      },
    ],
  },
  {
    slug: "flowdesk",
    title: "FlowDesk",
    tagline: "A workspace for managers and their teams.",
    summary:
      "A team workspace with separate manager and employee views, secure login and registration, live chat, calls and real-time updates.",
    year: "2026",
    category: "Real-time",
    role: "Full-stack developer",
    palette: ["#0c1222", "#22d3ee"],
    stack: ["Node.js", "Express", "Socket.IO", "JWT", "bcrypt", "MySQL", "Nodemailer"],
    links: { code: "https://github.com/AtulSwain/Flow" },
    highlights: [
      "Role-based workspaces for managers and employees",
      "JWT auth with hashed passwords and email flows",
      "Live chat and presence over Socket.IO",
      "File uploads with Multer",
    ],
    sections: [
      {
        heading: "Overview",
        body: "FlowDesk brings approvals, team attendance, a kanban board, chat and calls into one place, with a different view depending on who signs in.",
      },
      {
        heading: "What I learned",
        body: "Authentication, authorisation and real-time state are each simple alone and tricky together. Building them in one app taught me to design the data model before the screens.",
      },
    ],
  },
  {
    slug: "webspace",
    title: "WebSpace",
    tagline: "Private video calls, peer to peer.",
    summary:
      "Room-based video and voice calls with chat, typing indicators and screen sharing. The server only does signalling — media flows directly between browsers over WebRTC.",
    year: "2026",
    category: "Real-time",
    role: "Full-stack developer",
    cover: "/images/projects/webspace/cover.webp",
    palette: ["#0a0f1f", "#60a5fa"],
    stack: ["Node.js", "Express", "Socket.IO", "WebRTC", "JavaScript"],
    links: { code: "https://github.com/AtulSwain/WebSpace" },
    highlights: [
      "Real-time video, voice and chat in private rooms",
      "Screen sharing, mute and camera toggles",
      "SDP offer/answer and ICE exchange over Socket.IO",
      "No database and no accounts — privacy by design",
    ],
    sections: [
      {
        heading: "The idea",
        body: "A video call between two people shouldn’t need an account, a database or a company in the middle. WebSpace is a small app where you pick a name and a room ID, share it with a friend, and talk.",
      },
      {
        heading: "How it works",
        body: "Socket.IO joins users to a room and relays the WebRTC handshake: one browser sends an SDP offer, the other answers, and ICE candidates are exchanged until a direct path is found. After that, audio and video never touch the server.",
        bullets: [
          "The server only handles signalling, chat and room membership",
          "Typing indicators and connection status keep both sides informed",
          "Screen sharing swaps the outgoing video track without renegotiating the call",
        ],
      },
      {
        heading: "What I learned",
        body: "Networking is full of edge cases — permissions, NAT traversal, one side joining before the other. Getting a reliable call working taught me to think in events and states rather than in pages.",
      },
    ],
  },
  {
    slug: "webstack",
    title: "WebStack",
    tagline: "An employee collaboration dashboard.",
    summary:
      "A dashboard for internal teams — conversations, task board, people online and support shortcuts in one calm layout.",
    year: "2026",
    category: "Frontend",
    role: "Design & frontend",
    cover: "/images/projects/webstack/cover.webp",
    palette: ["#f5f7ff", "#4f46e5"],
    stack: ["HTML", "CSS", "JavaScript"],
    links: { code: "https://github.com/AtulSwain/WebStrack" },
    highlights: ["Information-dense dashboard that stays readable", "Priority tags, presence and quick actions"],
    sections: [
      {
        heading: "The brief",
        body: "Internal tools are often cluttered. I set out to fit an entire team’s day — conversations, tasks, people and support — on one screen without it feeling crowded.",
      },
      {
        heading: "What’s on the screen",
        body: "Eight panels, each answering one question at a glance.",
        bullets: [
          "Quick chat, channels and a call centre for conversations",
          "A task board with priority tags and due dates",
          "Today’s activity feed and who’s online right now",
          "Support shortcuts, plus a modal to request a private chat",
        ],
      },
      {
        heading: "What I learned",
        body: "Hierarchy beats decoration: consistent spacing, a small type scale and one accent colour did more for readability than any border or shadow.",
      },
    ],
  },
  {
    slug: "codeatlas",
    title: "CodeAtlas",
    tagline: "My first real JavaScript app.",
    summary:
      "A responsive explorer of programming languages with search, expandable cards, sample code and light/dark themes. Built for students and beginners.",
    year: "2026",
    category: "Frontend",
    role: "Design & frontend",
    cover: "/images/projects/codeatlas/cover.webp",
    palette: ["#0b1324", "#38bdf8"],
    stack: ["HTML", "CSS", "JavaScript"],
    links: { code: "https://github.com/AtulSwain/CodeAtlas" },
    highlights: ["Live search", "Expandable cards with sample code", "Dark/light mode", "Mobile to desktop"],
    sections: [
      {
        heading: "The idea",
        body: "Beginners often ask “which language should I learn?”. CodeAtlas answers with a searchable set of cards — what each language is for, where it’s used, and a short sample of what its code looks like.",
      },
      {
        heading: "How it works",
        body: "Plain HTML, CSS and JavaScript: cards expand in place to reveal details and sample code, the search filters as you type, and a theme toggle switches between light and dark.",
        bullets: ["Responsive from phone to desktop", "No frameworks — just the DOM and events"],
      },
      {
        heading: "Why it matters",
        body: "This is where JavaScript clicked — state, events and the DOM working together for the first time.",
      },
    ],
  },
  {
    slug: "superman",
    title: "Superman — The Man of Steel",
    tagline: "An editorial tribute page.",
    summary: "A cinematic, single-page tribute with a floating navigation bar, layered hero and smooth sections.",
    year: "2026",
    category: "Frontend",
    role: "Design & frontend",
    cover: "/images/projects/superman/cover.webp",
    palette: ["#0b1a3a", "#ef4444"],
    stack: ["HTML", "CSS"],
    links: { code: "https://github.com/AtulSwain/Superman---Fanmade" },
    highlights: ["Layered hero composition", "Glass navigation", "Typographic hierarchy"],
    sections: [
      {
        heading: "The idea",
        body: "A cinematic, magazine-style page about Superman: origin story, powers and abilities, films and shows — using nothing but HTML and CSS.",
      },
      {
        heading: "Design",
        body: "A floating glass navigation bar, a layered hero with the emblem, and organised sections for core powers and sensory abilities. The challenge was atmosphere: depth from layering and light instead of heavy effects.",
      },
    ],
  },
  {
    slug: "cr7",
    title: "CR7 — The Legacy",
    tagline: "A tribute in stats and story.",
    summary: "A tribute page to Cristiano Ronaldo — career timeline, records and a loading intro.",
    year: "2026",
    category: "Frontend",
    role: "Design & frontend",
    palette: ["#0b0b0b", "#d4af37"],
    stack: ["HTML", "Tailwind CSS", "JavaScript"],
    links: { code: "https://github.com/AtulSwain/CR7-Fan-made" },
    highlights: ["Career timeline", "Animated stats", "Intro loader"],
    sections: [
      {
        heading: "The idea",
        body: "A tribute to Cristiano Ronaldo told through his career and his numbers — an early hint of where my interests were heading.",
      },
      {
        heading: "What’s inside",
        body: "A loading intro, then the story in chapters.",
        bullets: [
          "A career timeline: Sporting CP, Manchester United, Real Madrid, Juventus, Al-Nassr",
          "“The Impossible Numbers” — records presented as stats",
          "“The Cabinet” — Ballon d’Or, Champions League and Golden Shoe honours",
          "Scroll-revealed sections built with Tailwind CSS",
        ],
      },
    ],
  },
  {
    slug: "profile-card",
    title: "Hover Profile Card",
    tagline: "Micro-interactions, by hand.",
    summary: "A profile card with a soft hover interaction — an early study in spacing and states.",
    year: "2026",
    category: "Frontend",
    role: "Design & frontend",
    cover: "/images/projects/profile-card/cover.webp",
    palette: ["#a8a29e", "#1c1917"],
    stack: ["HTML", "CSS"],
    links: { code: "https://github.com/AtulSwain/Hover-Profile-page-for-Beginner-" },
    highlights: ["Hover states", "Centered card layout"],
    sections: [
      {
        heading: "Focus",
        body: "A single profile card with a soft hover interaction. Small, but it’s where I learned how much transitions, shadows and spacing change how an interface feels.",
      },
    ],
  },
  {
    slug: "hello-world",
    title: "Hello World",
    tagline: "Where it all started.",
    summary: "An Instagram-style post in pure HTML and CSS — my very first project.",
    year: "2026",
    category: "Frontend",
    role: "First project",
    cover: "/images/projects/hello-world/cover.webp",
    palette: ["#3b0764", "#a855f7"],
    stack: ["HTML", "CSS"],
    links: { code: "https://github.com/AtulSwain/first-css-code-Hello-World" },
    highlights: ["Gradient background", "Centered layout", "No frameworks, no JavaScript"],
    sections: [
      {
        heading: "Why it’s here",
        body: "Every journey needs a first step. This was mine: an Instagram-style post built with pure HTML and CSS — centred layout, gradient background, and a lot of trial and error.",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const categories = Array.from(new Set(projects.map((p) => p.category)));
