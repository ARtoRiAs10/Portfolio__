export type CategoryKey = "pinned" | "ai" | "fullstack" | "infra" | "realtime";
export type FilterKey = CategoryKey | "all";

export type Project = {
  slug: string;
  name: string;
  command: string;
  tagline: string;
  description: string;
  category: Exclude<CategoryKey, "pinned">;
  categoryLabel: string;
  pinned: boolean;
  collab?: boolean;
  featured?: boolean;
  year: string;
  modified: string;
  size: string;
  role: string;
  stack: string[];
  highlights: string[];
  problem: string;
  approach: string;
  outcome?: string;
  metrics?: { label: string; value: string }[];
  repo: string;
  upstream?: string;
  live?: string;
  stars?: number;
  glyph: string;
};

export const projects: Project[] = [
  {
    slug: "orchestra",
    name: "Orchestra",
    command: "orchestra/",
    tagline: "Distributed CI/CD control plane with worker fleets, live logs, and a billing layer.",
    description:
      "A master/control plane accepts YAML DAG pipelines, schedules steps on a shared queue, and tracks status and logs. Stateless worker agents register, send heartbeats, execute shell or SSH steps, and stream logs back over WebSockets.",
    category: "infra",
    categoryLabel: "infra",
    pinned: false,
    featured: true,
    year: "2026",
    modified: "nov 18",
    size: "122k",
    role: "solo — design, build, deploy",
    stack: [
      "TypeScript",
      "Node.js",
      "BullMQ",
      "Redis",
      "Postgres",
      "Socket.IO",
      "Next.js",
      "Docker",
      "Razorpay",
    ],
    highlights: [
      "DAG scheduler with dependency-aware parallelism and skip-cascade",
      "Worker fleet with heartbeats, horizontal scaling, and stalled-job recovery",
      "Live logs across three Socket.IO namespaces",
      "Razorpay billing webhooks + per-plan Redis rate limits",
    ],
    problem:
      "CI/CD platforms are usually either simple hosted runners or heavy enterprise tools. I wanted a self-hostable middle ground: a control plane that schedules real work across a fleet without locking teams into a vendor.",
    approach:
      "Built a Next.js dashboard, a Node/TypeScript master that turns YAML DAGs into BullMQ jobs, and stateless workers that execute shell or SSH steps and stream logs back. Added heartbeats, exponential backoff, stalled-job recovery, Clerk auth, and plan-based rate limiting.",
    outcome:
      "A self-hostable CI/CD control plane that a small team can run without an enterprise contract — DAG scheduling, live logs, worker recovery, and billing in one place.",
    metrics: [
      { label: "pipelines", value: "YAML DAGs" },
      { label: "workers", value: "horizontal" },
      { label: "logs", value: "live" },
    ],
    repo: "https://github.com/ARtoRiAs10/Orchestra",
    glyph: "dag",
  },
  {
    slug: "marketlens",
    name: "MarketLens",
    command: "marketlens/",
    tagline: "Quantitative finance SaaS: nine strategy engines, walk-forward backtesting, portfolio optimization.",
    description:
      "A full-stack research platform with a Next.js app, a FastAPI ETL service, and an ML lab. It applies institutional-grade factor models, risk analytics, and cost-aware backtests to a usable product.",
    category: "ai",
    categoryLabel: "ai",
    pinned: false,
    featured: true,
    year: "2026",
    modified: "nov 18",
    size: "650k",
    role: "solo — full-stack & quant",
    stack: [
      "Next.js 14",
      "TypeScript",
      "FastAPI",
      "Python",
      "Prisma",
      "Postgres",
      "Recharts",
      "Razorpay",
    ],
    highlights: [
      "9 strategy engines: Piotroski, Altman Z, Beneish, Fama–French, DCF",
      "Cost-aware walk-forward backtesting with deflated Sharpe",
      "Constrained optimizer: max Sharpe, min variance, risk parity, Black–Litterman",
      "FastAPI ETL microservice + ML lab (ARIMA/GARCH, Ledoit–Wolf, RL)",
    ],
    problem:
      "Retail investing tools show prices, not reasoning. I wanted a platform that applies institutional-grade research — factor models, risk analytics, and backtests — in a way a founder or analyst can actually use.",
    approach:
      "Built a Next.js app with a Python FastAPI ETL service and an ML research lab. Nine strategy engines cover quality, value, momentum, and distress; the portfolio layer adds correlation, Brinson attribution, efficient frontiers, and constrained optimization.",
    outcome:
      "An institutional-grade research workflow behind a usable product UI: nine strategy engines, cost-aware backtests, and portfolio optimization that explains itself.",
    metrics: [
      { label: "strategies", value: "09" },
      { label: "backtests", value: "walk-forward" },
      { label: "optimizer", value: "constrained" },
    ],
    repo: "https://github.com/ARtoRiAs10/market_len",
    live: "https://market-len.vercel.app",
    glyph: "qty",
  },
  {
    slug: "visionvibe",
    name: "VisionVibe",
    command: "visionvibe/",
    tagline: "AI interior design studio with provider failover, img2img room editing, and art-directed prompts.",
    description:
      "Turns an empty room into a designed interior. A provider router picks the best engine per capability and fails over automatically; an art-direction prompt engine expands themes, styles, and budgets into materials, lighting, and camera language.",
    category: "ai",
    categoryLabel: "ai",
    pinned: false,
    featured: true,
    year: "2026",
    modified: "oct 22",
    size: "194k",
    role: "solo — product & engineering",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind v4",
      "Drizzle",
      "Neon",
      "Clerk",
      "Gemini",
      "Pollinations",
    ],
    highlights: [
      "Provider routing with automatic failover across five engines",
      "Art-direction prompt engine: 8 themes, 40+ styles, 5 budgets",
      "Before/after compare, favourites, one-click variations, gallery",
      "Works with zero API keys; Gemini img2img for real room photos",
    ],
    problem:
      "AI interior design demos are usually one-shot prompt generators. They fall over when a model is down, and they don't respect the room you actually have.",
    approach:
      "Built a provider router that selects the best engine per capability — text-to-image, image-to-image, vision, text — and fails over automatically. The prompt engine translates themes, styles, and budget tiers into materials, lighting, and camera direction.",
    outcome:
      "A working AI design studio that keeps rendering when a provider fails, with art-directed prompts that respect the actual room, style, and budget.",
    metrics: [
      { label: "providers", value: "05 failover" },
      { label: "styles", value: "40+" },
      { label: "inputs", value: "text + image" },
    ],
    repo: "https://github.com/ARtoRiAs10/VisionVibe_",
    live: "https://vision-vibe-zeta.vercel.app",
    glyph: "img",
  },
  {
    slug: "deployhub",
    name: "DeployHub",
    command: "deployhub/",
    tagline: "A Vercel-like deployment platform: push a repo or ZIP and get a live URL.",
    description:
      "A Next.js dashboard, Express API, Redis/Bull build queue, Dockerode workers, S3 static output, and Nginx-proxied deployment URLs. Includes auth, project metadata, and deployment history.",
    category: "infra",
    categoryLabel: "infra",
    pinned: true,
    year: "2026",
    modified: "may 25",
    size: "658k",
    role: "solo",
    stack: [
      "Next.js",
      "Express",
      "Bull",
      "Redis",
      "Dockerode",
      "AWS S3",
      "Prisma",
      "Postgres",
      "Clerk",
    ],
    highlights: [
      "Queue-based builds with Redis/Bull and Dockerode workers",
      "Automatic Dockerfile detection and S3 static output",
      "Nginx-proxied deployment URLs with history",
      "Clerk auth + Prisma/Postgres project metadata",
    ],
    problem:
      "Deploying a side project still means configuring servers, Dockerfiles, and DNS. I wanted the Vercel experience, but self-hosted and built on primitives I control.",
    approach:
      "A Next.js dashboard talks to an Express API, which enqueues builds with Bull on Redis. Workers detect Dockerfiles, build images, extract static output to S3, and register the deployment behind an Nginx proxy.",
    outcome:
      "A self-hosted deployment platform: push a repo or ZIP, get a live URL, with a real build queue and deployment history.",
    metrics: [
      { label: "input", value: "repo / zip" },
      { label: "queue", value: "Bull + Redis" },
      { label: "output", value: "live URL" },
    ],
    repo: "https://github.com/ARtoRiAs10/DeployHub",
    live: "https://deploy-hub-97j1.vercel.app",
    glyph: "shp",
  },
  {
    slug: "opendocs",
    name: "OpenDocs",
    command: "opendocs/",
    tagline: "Real-time collaborative document editor with mentions, reactions, and presence.",
    description:
      "A Google Docs-style editor built on Convex for reactive data, Tiptap for rich text, and Liveblocks for presence and sync. Includes templates, search, mentions, reactions, and share settings.",
    category: "realtime",
    categoryLabel: "realtime",
    pinned: true,
    year: "2025–26",
    modified: "may 10",
    size: "1.2m",
    role: "solo",
    stack: ["Next.js 14", "TypeScript", "Convex", "Clerk", "Tiptap", "Liveblocks", "Tailwind"],
    highlights: [
      "Real-time multi-user editing with presence",
      "Tiptap rich-text editor with mentions and reactions",
      "Document templates, search, and share settings",
      "Convex reactive backend + Clerk auth",
    ],
    problem:
      "Collaborative editing is usually either a realtime database demo or a heavy editor. I wanted the document experience — rich text, mentions, comments, reactions — with presence that feels instant.",
    approach:
      "Built on Convex for reactive data, Tiptap for the editor, and Liveblocks for presence and sync. Added document templates, search, mentions, reactions, and role-aware sharing.",
    repo: "https://github.com/ARtoRiAs10/OpenDocs",
    live: "https://google-docs-clone-git-main-gaurav-kumars-projects-928a4134.vercel.app",
    glyph: "doc",
  },
  {
    slug: "patternvault",
    name: "PatternVault",
    command: "patternvault/",
    tagline: "DSA pattern tracker with sandboxed code execution and LLM-assisted spaced repetition.",
    description:
      "A Django REST backend, React/Vite frontend, Monaco editor, and self-hosted Judge0 sandbox. Imports problems from Codeforces and CodeChef; OpenRouter generates pattern-level review plans and spaced repetition schedules.",
    category: "fullstack",
    categoryLabel: "fullstack",
    pinned: false,
    year: "2026",
    modified: "jul 09",
    size: "85k",
    role: "solo",
    stack: [
      "Django",
      "DRF",
      "React",
      "TypeScript",
      "Monaco",
      "Judge0",
      "Neon Postgres",
      "OpenRouter",
    ],
    highlights: [
      "Monaco editor with sandboxed Judge0 execution",
      "Spaced-repetition scheduling with LLM review plans",
      "Codeforces + CodeChef API imports",
      "Django tests for auth, ownership isolation, and review math",
    ],
    problem:
      "Most DSA trackers log problems but don't teach patterns. Practice is fragmented across platforms, with no feedback loop.",
    approach:
      "Built a Django REST API with per-user isolation and token auth, a React/Vite frontend with Monaco, and a self-hosted Judge0 sandbox. OpenRouter turns solved problems into pattern-level review plans.",
    repo: "https://github.com/ARtoRiAs10/PatternVault",
    glyph: "dsa",
  },
  {
    slug: "learnify",
    name: "Learnify",
    command: "learnify/",
    tagline: "Turn any YouTube video or PDF into flashcards, quizzes, and a grounded AI chat.",
    description:
      "A FastAPI backend extracts transcripts and PDF text, chunks and embeds with MiniLM, and stores vectors in ChromaDB. Gemini generates flashcards and quizzes; chat is grounded in retrieved chunks and streamed to Next.js.",
    category: "ai",
    categoryLabel: "ai",
    pinned: true,
    year: "2026",
    modified: "apr 05",
    size: "129k",
    role: "solo",
    stack: ["Next.js 14", "FastAPI", "Gemini", "Sentence Transformers", "ChromaDB", "Clerk"],
    highlights: [
      "YouTube + PDF ingestion with chunked embeddings",
      "ChromaDB RAG with streaming, grounded answers",
      "Auto-generated flashcards and scored quizzes",
      "Clerk auth + polished dark UI",
    ],
    problem:
      "Watching a lecture or reading a PDF is passive. The useful part is retrieval practice — questions, flashcards, and a tutor that knows the material.",
    approach:
      "Built a FastAPI backend for extraction, chunking, embedding, and RAG. Gemini generates study artifacts; the Next.js frontend streams answers and renders the learning UI.",
    repo: "https://github.com/ARtoRiAs10/Learnify",
    live: "https://learnify-two-nu.vercel.app",
    glyph: "rag",
  },
  {
    slug: "ecomshop",
    name: "EcomShop",
    command: "ecomshop/",
    tagline: "AI customer-support platform for e-commerce with order context and human handoff.",
    description:
      "A Spring Boot backend with JWT auth and role-based access, plus a Next.js frontend for customers and agents. The Claude-powered assistant pulls live order/product context and escalates to a human when needed.",
    category: "fullstack",
    categoryLabel: "fullstack",
    pinned: false,
    year: "2026",
    modified: "mar 17",
    size: "102k",
    role: "solo",
    stack: ["Next.js 14", "Spring Boot 3.2", "Java 17", "Claude", "H2", "JWT"],
    highlights: [
      "Claude support agent with live order/product context",
      "Human handoff + ticket lifecycle for agents",
      "Role-based admin: customer, agent, admin",
      "Order tracking, product catalog, reply suggestions",
    ],
    problem:
      "Support chatbots answer generically because they don't know the order. Agents repeat the same questions, and context is lost between channels.",
    approach:
      "Built a Spring Boot backend with JWT auth and role-based access, and a Next.js frontend for customers and agents. The assistant pulls live context, suggests replies, and escalates on sentiment or complexity.",
    repo: "https://github.com/ARtoRiAs10/EcomShop",
    live: "https://ecom-shop-ashen.vercel.app",
    glyph: "ai",
  },
  {
    slug: "neonmeet",
    name: "NeonMeet",
    command: "neonmeet/",
    tagline: "WebRTC video conferencing with screen sharing, chat, and instant meeting links.",
    description:
      "A React app with WebRTC peer connections signaled over Socket.IO, plus an Express/MongoDB backend for auth and meetings. Includes screen sharing, in-call chat, meeting codes, and a responsive MUI interface.",
    category: "realtime",
    categoryLabel: "realtime",
    pinned: false,
    year: "2026",
    modified: "mar 05",
    size: "5.4m",
    role: "solo",
    stack: ["React 19", "Node.js", "Express", "Socket.IO", "WebRTC", "MongoDB", "JWT"],
    highlights: [
      "P2P WebRTC video + screen sharing",
      "Socket.IO signaling with meeting rooms",
      "In-call chat + shareable meeting codes",
      "JWT auth + MongoDB persistence",
    ],
    problem:
      "Most video call tools require an account, a download, or a calendar invite. For quick collaboration, the friction is the product.",
    approach:
      "Built a React app with WebRTC peer connections signaled over Socket.IO, plus an Express/MongoDB backend for auth and meetings. Added screen sharing, chat, meeting codes, and a responsive MUI interface.",
    repo: "https://github.com/ARtoRiAs10/NeonMeet",
    live: "https://neon-meet-brown.vercel.app",
    glyph: "rtc",
  },
  {
    slug: "lingo",
    name: "Lingo",
    command: "lingo/",
    tagline: "Duolingo-inspired language learning with hearts, XP, streaks, leaderboards, and a shop.",
    description:
      "A gamified learning platform built with Next.js 14, TypeScript, Drizzle ORM, and Clerk. Lessons award XP, wrong answers cost hearts, streaks build habits, and gems buy streak freezes and heart refills.",
    category: "fullstack",
    categoryLabel: "fullstack",
    pinned: true,
    year: "2026",
    modified: "feb 23",
    size: "902k",
    role: "solo",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Drizzle ORM",
      "Clerk",
      "PostgreSQL",
      "Zustand",
      "Tailwind",
      "shadcn/ui",
    ],
    highlights: [
      "Gamified lessons with multiple question types",
      "Hearts, XP, streaks, leaderboard, and in-app shop",
      "Clerk auth with Google/GitHub OAuth",
      "Postgres persistence via Drizzle ORM",
    ],
    problem:
      "Language apps are good at content and bad at motivation. I wanted the feedback loops — streaks, hearts, XP, leaderboards — to feel as polished as the lessons.",
    approach:
      "Built a Next.js App Router app with Drizzle/Postgres, Clerk auth, and Zustand client state. The lesson engine, hearts economy, streak logic, and shop are all backed by persisted progress.",
    repo: "https://github.com/ARtoRiAs10/lingo",
    live: "https://lingo-blond.vercel.app",
    glyph: "lang",
  },
  {
    slug: "foodvision",
    name: "FoodVision",
    command: "foodvision/",
    tagline: "Computer vision food classifier using EfficientNetB2 transfer learning, deployed on Hugging Face.",
    description:
      "A PyTorch image classifier that labels pizza, steak, or sushi. EfficientNetB2 is used as a frozen ImageNet feature extractor; only the classification head is trained. Deployed as a Gradio app on Hugging Face Spaces.",
    category: "ai",
    categoryLabel: "ai",
    pinned: true,
    year: "2026",
    modified: "feb 23",
    size: "116k",
    role: "solo",
    stack: ["Python", "PyTorch", "torchvision", "EfficientNetB2", "Gradio", "Hugging Face"],
    highlights: [
      "EfficientNetB2 transfer learning with a frozen backbone",
      "3-class classification with confidence scores",
      "Gradio interface for instant image predictions",
      "Public Hugging Face Spaces deployment",
    ],
    problem:
      "Training a strong image classifier from scratch is expensive. I wanted a small, fast model that could reach useful accuracy with limited data.",
    approach:
      "Used EfficientNetB2 as a fixed feature extractor, trained only the final classification head on a food dataset, and wrapped inference in Gradio for a public demo.",
    repo: "https://github.com/ARtoRiAs10/FoodVision",
    live: "https://huggingface.co/spaces/ARtOrias11/foodvision_mini__",
    glyph: "cv",
  },
  {
    slug: "melosynthia",
    name: "MeloSynthiaAI",
    command: "melosynthia/",
    tagline: "NFT-based AI music marketplace for generating, minting, and trading AI music.",
    description:
      "A pinned showcase of an AI music marketplace: generate lyrics and music, mint creations as NFTs, and trade them. Uses VQ-VAE for audio, BERT for lyrics, and CVAE for text-to-speech and music generation.",
    category: "ai",
    categoryLabel: "ai",
    pinned: true,
    collab: true,
    year: "2023",
    modified: "oct 26",
    size: "33m",
    role: "pinned showcase · original by AYUSHMAN0503",
    stack: ["TypeScript", "Next.js", "VQ-VAE", "BERT", "CVAE", "NFTs"],
    highlights: [
      "AI-generated lyrics and music",
      "Song snippets with user vocals",
      "Free NFT minting and marketplace trading",
      "Collaboration through owned music NFTs",
    ],
    problem:
      "Music creation is collaborative, but ownership and reuse are messy. The idea was to make generated music ownable, tradable, and reusable by other artists.",
    approach:
      "A pinned project from my GitHub showcase. The original build by AYUSHMAN0503 combines VQ-VAE audio generation, BERT lyric generation, and CVAE text-to-speech in an NFT marketplace UI.",
    repo: "https://github.com/ARtoRiAs10/MeloSynthiaAI",
    upstream: "https://github.com/AYUSHMAN0503/MeloSynthiaAI",
    live: "https://melosynthiaai.vercel.app/",
    stars: 15,
    glyph: "nft",
  },
  {
    slug: "jotion",
    name: "Jotion",
    command: "jotion/",
    tagline: "Notion-style workspace with nested pages, rich text, and real-time sync.",
    description:
      "A Next.js app on Convex for reactive sync, with a block-based editor, nested pages, cover images, icons, trash/restore, and Clerk auth. Dark mode and responsive layout included.",
    category: "realtime",
    categoryLabel: "realtime",
    pinned: false,
    year: "2024–26",
    modified: "oct 20",
    size: "8.9m",
    role: "solo",
    stack: ["Next.js 14", "TypeScript", "Convex", "Clerk", "Tailwind", "shadcn/ui"],
    highlights: [
      "Infinite nested pages with real-time sync",
      "Rich-text blocks, covers, custom icons",
      "Trash + restore with soft deletes",
      "Clerk auth + dark mode",
    ],
    problem:
      "Notes tools either feel like a document or a database. I wanted the calm, nested-page feel of Notion with real-time sync and no setup.",
    approach:
      "Built a Next.js app on Convex for reactive sync, with a block-based editor, nested pages, covers, icons, trash/restore, and Clerk auth.",
    repo: "https://github.com/ARtoRiAs10/Jotion",
    live: "https://notion-clone-blush-nu.vercel.app",
    glyph: "doc",
  },
  {
    slug: "fluxdeck",
    name: "FluxDeck",
    command: "fluxdeck/",
    tagline: "Jira-inspired project management with Kanban, calendar, and analytics.",
    description:
      "Multi-workspace project management with drag-and-drop Kanban, table and calendar views, member roles and invite links, and an analytics dashboard. TanStack Query handles server state.",
    category: "fullstack",
    categoryLabel: "fullstack",
    pinned: false,
    year: "2025–26",
    modified: "feb 23",
    size: "245k",
    role: "solo",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "TanStack Query",
      "@hello-pangea/dnd",
      "Clerk",
    ],
    highlights: [
      "Drag-and-drop Kanban with multiple task views",
      "Workspaces, projects, roles, invite links",
      "Task priorities, assignees, due dates",
      "Analytics: velocity, completion, team activity",
    ],
    problem:
      "Project trackers get heavy fast. Small teams need boards, assignments, and a clear view of progress — not another enterprise suite.",
    approach:
      "Built multi-workspace project management with drag-and-drop Kanban, table/calendar views, member roles, invite links, and an analytics dashboard.",
    repo: "https://github.com/ARtoRiAs10/FluxDeck",
    glyph: "pm",
  },
  {
    slug: "cybernauts",
    name: "Cybernauts",
    command: "cybernauts/",
    tagline: "Graph-based network of people, friendships, and hobbies with hybrid recommendations.",
    description:
      "An Express/TypeScript API over SQLite and a React Flow frontend that visualizes users, friendships, and hobbies as an interactive graph. A hybrid scoring service combines graph proximity, shared interests, and lightweight AI recommendations.",
    category: "fullstack",
    categoryLabel: "fullstack",
    pinned: false,
    year: "2026",
    modified: "may 22",
    size: "206k",
    role: "solo",
    stack: ["React", "React Flow", "TypeScript", "Express", "SQLite", "Node.js"],
    highlights: [
      "Interactive React Flow graph of people and interests",
      "Hybrid scoring: graph, interests, AI",
      "REST API with tested service layer",
      "Clean TypeScript domain models",
    ],
    problem:
      "Social apps optimize for engagement, not for finding people you'd actually get along with. Recommendations are usually a ranked list with no explanation.",
    approach:
      "Built an Express/TypeScript API over SQLite and a React Flow frontend. A hybrid scoring service combines graph proximity, shared interests, and lightweight AI recommendations.",
    repo: "https://github.com/ARtoRiAs10/Cybernauts",
    live: "https://cybernauts-theta.vercel.app",
    glyph: "net",
  },
];

export const categoryFilters: { key: FilterKey; label: string; count: number }[] = [
  { key: "all", label: "all", count: projects.length },
  { key: "pinned", label: "pinned", count: projects.filter((p) => p.pinned).length },
  { key: "ai", label: "ai", count: projects.filter((p) => p.category === "ai").length },
  { key: "fullstack", label: "fullstack", count: projects.filter((p) => p.category === "fullstack").length },
  { key: "infra", label: "infra", count: projects.filter((p) => p.category === "infra").length },
  { key: "realtime", label: "realtime", count: projects.filter((p) => p.category === "realtime").length },
];

export const skillGroups = [
  {
    file: "languages",
    items: ["TypeScript", "Python", "Go", "Java", "SQL", "Bash"],
  },
  {
    file: "frontend",
    items: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "Framer Motion", "React Flow"],
  },
  {
    file: "backend",
    items: ["Node.js", "FastAPI", "Django", "Spring Boot", "Express", "WebSockets"],
  },
  {
    file: "data",
    items: ["Postgres", "Redis", "Prisma", "Convex", "MongoDB", "SQLite"],
  },
  {
    file: "ai",
    items: ["OpenAI", "Claude", "Gemini", "OpenRouter", "FAISS", "ChromaDB", "PyTorch"],
  },
  {
    file: "infra",
    items: ["Docker", "AWS S3", "BullMQ", "Vercel", "Nginx", "CI/CD"],
  },
];

export const processSteps = [
  {
    hash: "a1b2c3d",
    command: "discover",
    title: "Scope the real constraint",
    description: "A focused conversation about the product, users, and the constraints that actually matter.",
  },
  {
    hash: "e4f5g6h",
    command: "architect",
    title: "Design the simplest system",
    description: "Map the data model, boundaries, and delivery plan before writing code.",
  },
  {
    hash: "i7j8k9l",
    command: "build",
    title: "Ship in weekly increments",
    description: "Demos, clean commits, and a working environment from day one. No big reveal at the end.",
  },
  {
    hash: "m0n1o2p",
    command: "ship",
    title: "Deploy with a handover",
    description: "CI/CD, monitoring, docs, and a proper handover — not a folder of files.",
  },
  {
    hash: "q3r4s5t",
    command: "evolve",
    title: "Iterate with a partner",
    description: "Post-launch performance, product iteration, and a retainer if you want an engineering partner.",
  },
];

export const stats = [
  { label: "projects", value: String(projects.length).padStart(2, "0") },
  { label: "pinned", value: "06" },
  { label: "domains", value: "04" },
  { label: "since", value: "2024" },
];