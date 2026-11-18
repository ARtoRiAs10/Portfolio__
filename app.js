/* ============================================================
   Gaurav Kumar — Portfolio interactions
   Single source of truth: CONFIG + PROJECTS below.
   ============================================================ */

const CONFIG = {
  name: "Gaurav Kumar",
  email: "hello@gauravkumar.dev",
  github: "https://github.com/ARtoRiAs10",
  location: "Remote · Worldwide",
  availability: "Open for select projects",
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const arrowSvg =
  '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8"/></svg>';

/* ============================================================
   Cover artwork — small, hand-built SVG scenes per project
   ============================================================ */

function patternGrid() {
  let out = "";
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const rx = 100 + x * 50;
      const ry = 60 + y * 50;
      if (x === 1 && y === 2) {
        out += `<rect x="${rx}" y="${ry}" width="38" height="38" rx="6" fill="var(--accent)"/>`;
      } else if ((x === 3 && y === 0) || (x === 0 && y === 3)) {
        out += `<rect x="${rx}" y="${ry}" width="38" height="38" rx="6" stroke="var(--accent)" stroke-opacity=".6"/>`;
      } else {
        out += `<rect x="${rx}" y="${ry}" width="38" height="38" rx="6" stroke="currentColor" stroke-opacity=".3"/>`;
      }
    }
  }
  return out;
}

const covers = {
  orchestra: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g stroke="currentColor" stroke-opacity=".15"><path d="M0 75h400M0 150h400M0 225h400M100 0v300M200 0v300M300 0v300"/></g>
    <g stroke="currentColor" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round">
      <path d="M80 80C80 112 200 112 200 150"/>
      <path d="M320 80C320 112 200 112 200 150"/>
      <path d="M200 150C200 188 80 188 80 220"/>
      <path d="M200 150C200 188 320 188 320 220"/>
      <path d="M200 150v70" stroke-dasharray="4 6" stroke-opacity=".3"/>
    </g>
    <g fill="var(--accent)">
      <circle cx="80" cy="80" r="5"/><circle cx="320" cy="80" r="5"/>
      <circle cx="80" cy="220" r="5"/><circle cx="320" cy="220" r="5"/>
      <circle cx="200" cy="220" r="5"/>
    </g>
    <circle cx="200" cy="150" r="10" fill="#0b0d10" stroke="var(--accent)" stroke-width="1.5"/>
    <circle cx="200" cy="150" r="3" fill="var(--accent)"/>
    <g stroke="currentColor" stroke-opacity=".25"><path d="M160 150h-22M262 150h-22"/></g>
  </svg>`,

  marketlens: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g stroke="currentColor" stroke-opacity=".15"><path d="M60 60v180h280"/></g>
    <g stroke="currentColor" stroke-opacity=".11"><path d="M60 200h280M60 160h280M60 120h280M60 80h280"/></g>
    <path d="M60 215 110 195 160 205 210 160 260 170 310 110 340 90V240H60Z" fill="var(--accent)" fill-opacity=".07"/>
    <path d="M60 215 110 195 160 205 210 160 260 170 310 110 340 90" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="var(--accent)">
      <circle cx="60" cy="215" r="3"/><circle cx="110" cy="195" r="3"/><circle cx="160" cy="205" r="3"/>
      <circle cx="210" cy="160" r="3"/><circle cx="260" cy="170" r="3"/><circle cx="310" cy="110" r="4"/><circle cx="340" cy="90" r="4"/>
    </g>
    <path d="M310 110l14-18 14 18" stroke="var(--accent)" stroke-opacity=".55" stroke-width="1.5"/>
  </svg>`,

  visionvibe: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g stroke="currentColor" stroke-opacity=".3" stroke-width="1.2">
      <path d="M120 95h160v120H120z"/>
      <path d="M120 215 40 285M280 215l80 70M40 285h320"/>
      <path d="M120 215v70M280 215v70" stroke-opacity=".18"/>
    </g>
    <rect x="150" y="120" width="70" height="55" stroke="currentColor" stroke-opacity=".5"/>
    <path d="M185 120v55M150 147.5h70" stroke="currentColor" stroke-opacity=".3"/>
    <circle cx="252" cy="145" r="14" fill="var(--accent)" fill-opacity=".85"/>
    <ellipse cx="200" cy="272" rx="74" ry="9" fill="var(--accent)" fill-opacity=".12"/>
    <path d="M60 215c20-18 40-18 60 0" stroke="currentColor" stroke-opacity=".25"/>
  </svg>`,

  deployhub: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g stroke="currentColor" stroke-opacity=".28"><path d="M60 130V70h70M130 100h35M235 100h35"/></g>
    <g stroke="currentColor" stroke-opacity=".5" stroke-width="1.3">
      <rect x="60" y="70" width="70" height="60" rx="6"/>
      <rect x="165" y="70" width="70" height="60" rx="6"/>
      <rect x="270" y="70" width="70" height="60" rx="6"/>
    </g>
    <g stroke="currentColor" stroke-opacity=".65" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M160 96l5 4-5 4M265 96l5 4-5 4"/>
    </g>
    <rect x="165" y="190" width="70" height="52" rx="6" fill="var(--accent)" fill-opacity=".1" stroke="var(--accent)" stroke-opacity=".55"/>
    <path d="M184 216l10 10 21-23" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M95 150v20M305 150v20" stroke="currentColor" stroke-opacity=".2"/>
  </svg>`,

  opendocs: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect x="120" y="50" width="160" height="210" rx="8" stroke="currentColor" stroke-opacity=".4" stroke-width="1.3"/>
    <g stroke="currentColor" stroke-opacity=".22" stroke-width="1.2">
      <path d="M145 90h110M145 115h110M145 165h110M145 190h85M145 215h100"/>
    </g>
    <rect x="145" y="140" width="95" height="18" rx="2" fill="var(--accent)" fill-opacity=".18"/>
    <g fill="var(--accent)"><path transform="translate(215 128)" d="M0 0v18l5-5 4 7 3-2-4-7 7-1z"/></g>
    <g fill="var(--accent-2)"><path transform="translate(258 196)" d="M0 0v18l5-5 4 7 3-2-4-7 7-1z"/></g>
    <circle cx="300" cy="70" r="4" fill="var(--accent)" fill-opacity=".7"/>
  </svg>`,

  patternvault: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g stroke="currentColor" stroke-opacity=".1"><path d="M60 40h280M60 240h280M60 40v200M340 40v200"/></g>
    ${patternGrid()}
    <path d="M163 176l8 8 15-18" stroke="#08090b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M240 205v18l5-5 4 7 3-2-4-7 7-1z" fill="var(--accent-2)"/>
  </svg>`,

  learnify: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g transform="rotate(-8 200 150)"><rect x="110" y="75" width="180" height="150" rx="10" stroke="currentColor" stroke-opacity=".22"/></g>
    <g transform="rotate(6 200 150)"><rect x="110" y="75" width="180" height="150" rx="10" stroke="currentColor" stroke-opacity=".22"/></g>
    <rect x="110" y="75" width="180" height="150" rx="10" fill="#0b0d10" stroke="currentColor" stroke-opacity=".42" stroke-width="1.3"/>
    <path d="M186 122l44 26-44 26z" fill="var(--accent)"/>
    <g stroke="currentColor" stroke-opacity=".22"><path d="M140 205h120M140 190h60"/></g>
    <circle cx="140" cy="100" r="4" fill="var(--accent)"/>
    <path d="M250 100h20M250 108h14" stroke="var(--accent)" stroke-opacity=".4"/>
  </svg>`,

  ecomshop: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect x="60" y="80" width="170" height="70" rx="12" stroke="currentColor" stroke-opacity=".35" stroke-width="1.3"/>
    <g stroke="currentColor" stroke-opacity=".25"><path d="M80 105h90M80 125h70"/></g>
    <rect x="175" y="160" width="170" height="70" rx="12" fill="var(--accent)" fill-opacity=".09" stroke="var(--accent)" stroke-opacity=".45" stroke-width="1.3"/>
    <g stroke="var(--accent)" stroke-opacity=".55"><path d="M195 185h110M195 205h80"/></g>
    <circle cx="75" cy="190" r="14" stroke="currentColor" stroke-opacity=".3"/>
    <path d="M70 190h10M75 185v10" stroke="currentColor" stroke-opacity=".35"/>
    <circle cx="322" cy="72" r="4" fill="var(--accent)"/>
    <circle cx="95" cy="235" r="3" fill="var(--accent-2)" fill-opacity=".8"/>
  </svg>`,

  neonmeet: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g stroke="currentColor" stroke-opacity=".28" stroke-width="1.3">
      <rect x="70" y="70" width="120" height="80" rx="8"/>
      <rect x="210" y="70" width="120" height="80" rx="8"/>
      <rect x="70" y="170" width="120" height="80" rx="8"/>
      <rect x="210" y="170" width="120" height="80" rx="8"/>
    </g>
    <g fill="var(--accent)">
      <circle cx="130" cy="98" r="11" fill-opacity=".75"/>
      <path d="M110 132c0-11 9-18 20-18s20 7 20 18" fill-opacity=".45"/>
      <circle cx="270" cy="98" r="11" fill-opacity=".75"/>
      <path d="M250 132c0-11 9-18 20-18s20 7 20 18" fill-opacity=".45"/>
    </g>
    <g stroke="currentColor" stroke-opacity=".25"><path d="M95 200h70M95 215h45M235 200h70M235 215h45"/></g>
    <rect x="210" y="170" width="120" height="80" rx="8" stroke="var(--accent)" stroke-opacity=".55" stroke-width="1.4"/>
    <circle cx="322" cy="186" r="4" fill="var(--accent-2)"/>
  </svg>`,

  jotion: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect x="90" y="50" width="170" height="210" rx="6" stroke="currentColor" stroke-opacity=".2"/>
    <rect x="110" y="68" width="170" height="210" rx="6" stroke="currentColor" stroke-opacity=".25"/>
    <rect x="130" y="86" width="170" height="210" rx="6" fill="#0b0d10" stroke="currentColor" stroke-opacity=".4" stroke-width="1.3"/>
    <rect x="130" y="86" width="170" height="34" fill="var(--accent)" fill-opacity=".22"/>
    <g stroke="currentColor" stroke-opacity=".2"><path d="M150 145h110M150 168h110M150 191h70M150 214h95M150 237h80"/></g>
    <circle cx="290" cy="70" r="15" fill="var(--accent)" fill-opacity=".14" stroke="var(--accent)" stroke-opacity=".5"/>
    <path d="M283 70h14M290 63v14" stroke="var(--accent)" stroke-width="1.4"/>
    <path d="M150 270h40" stroke="var(--accent)" stroke-opacity=".5" stroke-width="2"/>
  </svg>`,

  cybernauts: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g stroke="currentColor" stroke-opacity=".3" stroke-width="1.2">
      <path d="M100 90l100 60 100-60M100 90l20 130 80-70 80 70 20-130M120 220h160M200 150v110"/>
    </g>
    <g fill="#0b0d10" stroke="currentColor" stroke-opacity=".5" stroke-width="1.3">
      <circle cx="100" cy="90" r="9"/><circle cx="300" cy="90" r="9"/>
      <circle cx="120" cy="220" r="9"/><circle cx="280" cy="220" r="9"/>
      <circle cx="200" cy="260" r="7"/>
    </g>
    <circle cx="200" cy="150" r="19" fill="var(--accent)"/>
    <circle cx="200" cy="150" r="29" stroke="var(--accent)" stroke-opacity=".25"/>
    <path d="M191 150l6 6 13-15" stroke="#08090b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  fluxdeck: `<svg class="cover-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g stroke="currentColor" stroke-opacity=".28" stroke-width="1.3">
      <rect x="55" y="65" width="90" height="180" rx="6"/>
      <rect x="155" y="65" width="90" height="180" rx="6"/>
      <rect x="255" y="65" width="90" height="180" rx="6"/>
    </g>
    <g fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-opacity=".22">
      <rect x="65" y="95" width="70" height="38" rx="4"/>
      <rect x="65" y="143" width="70" height="38" rx="4"/>
      <rect x="165" y="95" width="70" height="38" rx="4"/>
      <rect x="165" y="143" width="70" height="38" rx="4"/>
    </g>
    <rect x="265" y="95" width="70" height="38" rx="4" fill="var(--accent)" fill-opacity=".16" stroke="var(--accent)" stroke-opacity=".5"/>
    <rect x="265" y="143" width="70" height="38" rx="4" fill="var(--accent)" fill-opacity=".3"/>
    <g fill="var(--accent)"><circle cx="76" cy="80" r="3"/><circle cx="176" cy="80" r="3"/><circle cx="276" cy="80" r="3"/></g>
  </svg>`,
};

/* ============================================================
   Project data
   ============================================================ */

const projects = [
  {
    id: "orchestra",
    num: "01",
    title: "Orchestra",
    tagline:
      "A distributed CI/CD control plane with worker fleets, live logs, and a SaaS billing layer.",
    category: "infra",
    categoryLabel: "Infra & DevOps",
    year: "2026",
    role: "Solo — design, build, deploy",
    featured: true,
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
    problem:
      "CI/CD platforms are usually either simple hosted runners or complex enterprise tools. I wanted a self-hostable middle ground: a control plane that schedules real work across a fleet, without locking teams into a vendor.",
    approach:
      "Built a three-part system: a Next.js dashboard, a Node/TypeScript master that turns YAML DAGs into BullMQ jobs, and stateless worker agents that execute shell or SSH steps and stream logs back over Socket.IO. Added heartbeats, retries with exponential backoff, stalled-job recovery, Clerk auth, and Razorpay plans with per-tier rate limits.",
    highlights: [
      "DAG scheduler with dependency-aware parallelism and automatic skip-cascade",
      "Worker fleet with heartbeats, horizontal scaling, and stalled-job recovery",
      "Live log streaming across three Socket.IO namespaces",
      "Razorpay billing webhooks plus per-plan rate limiting in Redis",
    ],
    live: "",
    repo: "https://github.com/ARtoRiAs10/Orchestra",
  },
  {
    id: "marketlens",
    num: "02",
    title: "MarketLens",
    tagline:
      "A quantitative finance SaaS: nine strategy engines, walk-forward backtesting, and portfolio optimization.",
    category: "ai",
    categoryLabel: "AI & Data",
    year: "2026",
    role: "Solo — full-stack & quant",
    featured: true,
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
    problem:
      "Retail investing tools show prices, not reasoning. I wanted a platform that applies institutional-grade research — factor models, risk analytics, and backtests — in a way a founder or analyst can actually use.",
    approach:
      "Built a Next.js app with a Python FastAPI ETL service and an ML research lab. Nine registered strategy engines cover quality, value, momentum, and distress; the portfolio layer adds correlation, Brinson attribution, efficient frontiers, and constrained optimization. Backtests are cost-aware, with deflated Sharpe and block-bootstrap confidence intervals.",
    highlights: [
      "9 strategy engines: Piotroski, Altman Z, Beneish, Fama–French, DCF, and more",
      "Walk-forward, cost-aware backtesting with deflated Sharpe",
      "Constrained portfolio optimizer: max Sharpe, min variance, risk parity, Black–Litterman",
      "FastAPI ETL microservice plus ML lab (ARIMA/GARCH, Ledoit–Wolf, RL agents)",
    ],
    live: "https://market-len.vercel.app",
    repo: "https://github.com/ARtoRiAs10/market_len",
  },
  {
    id: "visionvibe",
    num: "03",
    title: "VisionVibe",
    tagline:
      "An AI interior design studio that turns a room photo into art-directed concepts — with automatic model failover.",
    category: "ai",
    categoryLabel: "AI & Data",
    year: "2026",
    role: "Solo — product & engineering",
    featured: true,
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
    problem:
      "AI interior design demos are usually one-shot prompt generators. They fall over when a model is down, and they don't respect the room you actually have.",
    approach:
      "Built a provider router that selects the best engine per capability — text-to-image, image-to-image, vision, text — and fails over automatically. A prompt engine translates 8 themes × 40+ styles × budget tiers into materials, lighting, and camera language. With Gemini, it edits the actual room photo; without keys, it still works on free engines.",
    highlights: [
      "Provider routing with automatic failover across five engines",
      "Art-direction prompt engine: 8 themes, 40+ styles, 5 budget tiers",
      "Before/after compare, favourites, one-click variations, community gallery",
      "Works with zero API keys; optional Gemini img2img for real room photos",
    ],
    live: "https://vision-vibe-zeta.vercel.app",
    repo: "https://github.com/ARtoRiAs10/VisionVibe_",
  },
  {
    id: "deployhub",
    num: "04",
    title: "DeployHub",
    tagline:
      "A Vercel-like deployment platform: push a GitHub repo or ZIP, and get a live URL.",
    category: "infra",
    categoryLabel: "Infra & DevOps",
    year: "2026",
    role: "Solo",
    featured: false,
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
    problem:
      "Deploying a side project still means configuring servers, Dockerfiles, and DNS. I wanted the Vercel experience, but self-hosted and built on primitives I control.",
    approach:
      "A Next.js dashboard talks to an Express API, which enqueues builds with Bull on Redis. Workers detect Dockerfiles, build images, extract static output to S3, and register the deployment behind an Nginx proxy. Auth, project settings, and deployment history are handled with Clerk and Prisma/Postgres.",
    highlights: [
      "Queue-based builds with Redis/Bull and Dockerode workers",
      "Automatic Dockerfile detection and S3 static output",
      "Nginx-proxied deployment URLs with history",
      "Clerk auth plus Prisma/Postgres project metadata",
    ],
    live: "https://deploy-hub-97j1.vercel.app",
    repo: "https://github.com/ARtoRiAs10/DeployHub",
  },
  {
    id: "opendocs",
    num: "05",
    title: "OpenDocs",
    tagline:
      "A real-time collaborative editor with mentions, reactions, and Google Docs-style presence.",
    category: "realtime",
    categoryLabel: "Real-time",
    year: "2025–26",
    role: "Solo",
    featured: false,
    stack: [
      "Next.js 14",
      "TypeScript",
      "Convex",
      "Clerk",
      "Tiptap",
      "Liveblocks",
      "Tailwind",
    ],
    problem:
      "Collaborative editing is usually either a realtime database demo or a heavy editor. I wanted the document experience — rich text, mentions, comments, reactions — with presence that feels instant.",
    approach:
      "Built on Convex for reactive data, Tiptap for the editor, and Liveblocks for presence and sync. Added document templates, search, mentions, reactions, and a clean dark-mode-friendly UI with role-aware sharing.",
    highlights: [
      "Real-time multi-user editing with presence",
      "Tiptap rich-text editor with mentions and reactions",
      "Document templates, search, and share settings",
      "Convex reactive backend plus Clerk auth",
    ],
    live: "https://google-docs-clone-git-main-gaurav-kumars-projects-928a4134.vercel.app",
    repo: "https://github.com/ARtoRiAs10/OpenDocs",
  },
  {
    id: "patternvault",
    num: "06",
    title: "PatternVault",
    tagline:
      "A DSA pattern tracker with sandboxed code execution and LLM-assisted spaced repetition.",
    category: "full",
    categoryLabel: "Full-stack",
    year: "2026",
    role: "Solo",
    featured: false,
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
    problem:
      "Most DSA trackers log problems but don't teach patterns. Practice is also fragmented across Codeforces, CodeChef, and LeetCode, with no feedback loop.",
    approach:
      "Built a Django REST API with per-user isolation and token auth, a React/Vite frontend with a Monaco editor, and a self-hosted Judge0 sandbox for running code. Problems import from Codeforces and CodeChef; OpenRouter generates pattern-level review plans and spaced-repetition schedules.",
    highlights: [
      "Monaco editor with sandboxed Judge0 execution",
      "Spaced-repetition scheduling with LLM-generated review plans",
      "Codeforces and CodeChef API imports",
      "Django tests for auth, ownership isolation, and review math",
    ],
    live: "",
    repo: "https://github.com/ARtoRiAs10/PatternVault",
  },
  {
    id: "learnify",
    num: "07",
    title: "Learnify",
    tagline:
      "Turn any YouTube video or PDF into flashcards, quizzes, and a grounded AI chat.",
    category: "ai",
    categoryLabel: "AI & Data",
    year: "2026",
    role: "Solo",
    featured: false,
    stack: [
      "Next.js 14",
      "FastAPI",
      "Gemini",
      "Sentence Transformers",
      "ChromaDB",
      "Clerk",
    ],
    problem:
      "Watching a lecture or reading a PDF is passive. The useful part is retrieval practice — questions, flashcards, and a tutor that knows the material.",
    approach:
      "A FastAPI backend extracts transcripts and PDF text, chunks and embeds it with MiniLM, and stores vectors in ChromaDB. Gemini generates flashcards and quizzes; chat is grounded in the retrieved chunks and streamed to the Next.js frontend.",
    highlights: [
      "YouTube and PDF ingestion with chunked embeddings",
      "ChromaDB RAG with streaming, grounded answers",
      "Auto-generated flashcards and scored quizzes",
      "Clerk auth and a polished dark UI",
    ],
    live: "https://learnify-two-nu.vercel.app",
    repo: "https://github.com/ARtoRiAs10/Learnify",
  },
  {
    id: "ecomshop",
    num: "08",
    title: "EcomShop",
    tagline:
      "An AI customer-support platform for e-commerce — with order context and human handoff.",
    category: "full",
    categoryLabel: "Full-stack",
    year: "2026",
    role: "Solo",
    featured: false,
    stack: [
      "Next.js 14",
      "Spring Boot 3.2",
      "Java 17",
      "Claude",
      "H2",
      "JWT",
    ],
    problem:
      "Support chatbots answer generically because they don't know the order. Agents then repeat the same questions, and context is lost between channels.",
    approach:
      "Built a Spring Boot backend with JWT auth and role-based access, and a Next.js frontend for customers and agents. The Claude-powered assistant pulls live order/product context, suggests replies, and escalates to a human when sentiment or complexity crosses a threshold.",
    highlights: [
      "Claude support agent with live order and product context",
      "Human handoff plus ticket lifecycle for agents",
      "Role-based admin: customer, agent, admin",
      "Order tracking, product catalog, and reply suggestions",
    ],
    live: "https://ecom-shop-ashen.vercel.app",
    repo: "https://github.com/ARtoRiAs10/EcomShop",
  },
  {
    id: "neonmeet",
    num: "09",
    title: "NeonMeet",
    tagline:
      "WebRTC video conferencing with screen sharing, chat, and instant meeting links.",
    category: "realtime",
    categoryLabel: "Real-time",
    year: "2026",
    role: "Solo",
    featured: false,
    stack: [
      "React 19",
      "Node.js",
      "Express",
      "Socket.IO",
      "WebRTC",
      "MongoDB",
      "JWT",
    ],
    problem:
      "Most video call tools require an account, a download, or a calendar invite. For quick collaboration, the friction is the product.",
    approach:
      "Built a React app with WebRTC peer connections signaled over Socket.IO, plus an Express/MongoDB backend for auth and meetings. Added screen sharing, in-call chat, meeting codes, and a responsive MUI interface.",
    highlights: [
      "P2P WebRTC video plus screen sharing",
      "Socket.IO signaling with meeting rooms",
      "In-call chat and shareable meeting codes",
      "JWT auth plus MongoDB persistence",
    ],
    live: "https://neon-meet-brown.vercel.app",
    repo: "https://github.com/ARtoRiAs10/NeonMeet",
  },
  {
    id: "jotion",
    num: "10",
    title: "Jotion",
    tagline:
      "A Notion-style workspace with nested pages, rich text, and real-time sync.",
    category: "realtime",
    categoryLabel: "Real-time",
    year: "2024–26",
    role: "Solo",
    featured: false,
    stack: [
      "Next.js 14",
      "TypeScript",
      "Convex",
      "Clerk",
      "Tailwind",
      "shadcn/ui",
    ],
    problem:
      "Notes tools either feel like a document or a database. I wanted the calm, nested-page feel of Notion with real-time sync and no setup.",
    approach:
      "Built a Next.js app on Convex for reactive sync, with a block-based editor, nested pages, cover images, icons, trash/restore, and Clerk auth. Dark mode and a responsive layout are included.",
    highlights: [
      "Infinite nested pages with real-time sync",
      "Rich-text blocks, covers, and custom icons",
      "Trash and restore with soft deletes",
      "Clerk auth and dark mode",
    ],
    live: "https://notion-clone-blush-nu.vercel.app",
    repo: "https://github.com/ARtoRiAs10/Jotion",
  },
  {
    id: "cybernauts",
    num: "11",
    title: "Cybernauts",
    tagline:
      "A graph-based network of people, friendships, and hobbies with hybrid recommendations.",
    category: "full",
    categoryLabel: "Full-stack",
    year: "2026",
    role: "Solo",
    featured: false,
    stack: ["React", "React Flow", "TypeScript", "Express", "SQLite", "Node.js"],
    problem:
      "Social apps optimize for engagement, not for finding people you'd actually get along with. Recommendations are usually a ranked list with no explanation.",
    approach:
      "Built an Express/TypeScript API over SQLite and a React Flow frontend that visualizes users, friendships, and hobbies as an interactive graph. A hybrid scoring service combines graph proximity, shared interests, and lightweight AI recommendations.",
    highlights: [
      "Interactive React Flow graph of people and interests",
      "Hybrid scoring: graph, interests, and AI",
      "REST API with a tested service layer",
      "Clean TypeScript domain models",
    ],
    live: "https://cybernauts-theta.vercel.app",
    repo: "https://github.com/ARtoRiAs10/Cybernauts",
  },
  {
    id: "fluxdeck",
    num: "12",
    title: "FluxDeck",
    tagline:
      "A Jira-inspired project management suite with Kanban, calendar, and analytics.",
    category: "full",
    categoryLabel: "Full-stack",
    year: "2025–26",
    role: "Solo",
    featured: false,
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "TanStack Query",
      "@hello-pangea/dnd",
      "Clerk",
    ],
    problem:
      "Project trackers get heavy fast. Small teams need boards, assignments, and a clear view of progress — not another enterprise suite.",
    approach:
      "Built multi-workspace project management with drag-and-drop Kanban, table and calendar views, member roles and invite links, and an analytics dashboard. TanStack Query handles server state; shadcn/ui keeps the interface consistent.",
    highlights: [
      "Drag-and-drop Kanban with multiple task views",
      "Workspaces, projects, roles, and invite links",
      "Task priorities, assignees, and due dates",
      "Analytics: velocity, completion, team activity",
    ],
    live: "",
    repo: "https://github.com/ARtoRiAs10/FluxDeck",
  },
];

/* ============================================================
   Ticker
   ============================================================ */

function buildTicker() {
  const tech = [
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "Python",
    "FastAPI",
    "Django",
    "Spring Boot",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "Prisma",
    "Convex",
    "Tailwind",
    "WebRTC",
    "OpenRouter",
    "FAISS",
    "BullMQ",
    "Vercel",
  ];
  const group = tech.map((t) => `<span class="ticker-item">${t}</span>`).join("");
  const track = $("#ticker-track");
  if (track) {
    track.innerHTML = `<div class="ticker-group">${group}</div><div class="ticker-group" aria-hidden="true">${group}</div>`;
  }
}

/* ============================================================
   Rendering
   ============================================================ */

const featuredGrid = $("#featured-grid");
const projectList = $("#project-list");
const state = { filter: "all" };

function caseCard(p) {
  return `<a class="case-card reveal" href="#${p.id}" data-project="${p.id}" aria-label="Read case study: ${p.title}">
    <div class="case-card-cover">
      <div class="cover">${covers[p.id] || ""}</div>
      <span class="case-index">${p.num} / ${projects.length}</span>
      <span class="case-badge">Featured</span>
    </div>
    <div class="case-card-body">
      <div class="case-meta"><span>${p.year}</span><span>${p.categoryLabel}</span></div>
      <h3>${p.title}</h3>
      <p>${p.tagline}</p>
      <ul class="case-tags">${p.stack.slice(0, 3).map((s) => `<li>${s}</li>`).join("")}</ul>
      <div class="case-foot"><span>Read case study</span><span class="arrow">${arrowSvg}</span></div>
    </div>
  </a>`;
}

function projectRow(p) {
  return `<a class="project-row reveal" href="#${p.id}" data-project="${p.id}">
    <span class="row-index">${p.num}</span>
    <div class="row-main"><h3>${p.title}</h3><p>${p.tagline}</p></div>
    <div class="row-stack">${p.stack.slice(0, 4).join(" · ")}</div>
    <span class="row-year">${p.year}</span>
    <span class="row-arrow">${arrowSvg}</span>
  </a>`;
}

function render() {
  const filtered =
    state.filter === "all"
      ? projects
      : projects.filter((p) => p.category === state.filter);

  if (state.filter === "all") {
    featuredGrid.hidden = false;
    featuredGrid.innerHTML = filtered.filter((p) => p.featured).map(caseCard).join("");
    projectList.innerHTML = filtered
      .filter((p) => !p.featured)
      .map(projectRow)
      .join("");
  } else {
    featuredGrid.hidden = true;
    featuredGrid.innerHTML = "";
    projectList.innerHTML = filtered.map(projectRow).join("");
  }

  initRevealObserver();
  bindPeek();
}

/* ============================================================
   Reveal on scroll
   ============================================================ */

let revealObserver = null;

function initRevealObserver() {
  const items = $$(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
  }
  items.forEach((el) => revealObserver.observe(el));
}

/* ============================================================
   Filters
   ============================================================ */

function bindFilters() {
  $$(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.filter = chip.dataset.filter || "all";
      $$(".chip").forEach((c) => {
        const active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-pressed", String(active));
      });
      render();
    });
  });
}

/* ============================================================
   Case study dialog
   ============================================================ */

const dialog = $("#case-dialog");
const panel = $("#case-panel");

function openCase(id) {
  const p = projects.find((item) => item.id === id);
  if (!p) return;
  hidePeek();

  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  panel.innerHTML = `
    <div class="case-top">
      <span class="case-top-label">${p.num} / ${projects.length} — Case study</span>
      <button class="case-close" type="button" data-close aria-label="Close case study">
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 2l10 10M12 2 2 12"/></svg>
      </button>
    </div>
    <div class="case-cover"><div class="cover">${covers[p.id] || ""}</div></div>
    <div class="case-body">
      <div class="case-kicker"><span>${p.year}</span><span>${p.categoryLabel}</span><span>${p.role}</span></div>
      <h2 id="case-title">${p.title}</h2>
      <p class="case-tagline">${p.tagline}</p>
      <div class="case-facts">
        <div class="case-fact"><span>Role</span><strong>${p.role}</strong></div>
        <div class="case-fact"><span>Year</span><strong>${p.year}</strong></div>
        <div class="case-fact"><span>Focus</span><strong>${p.categoryLabel}</strong></div>
      </div>
      <section class="case-section"><h3>The problem</h3><p>${p.problem}</p></section>
      <section class="case-section"><h3>What I built</h3><p>${p.approach}</p></section>
      <section class="case-section">
        <h3>Highlights</h3>
        <ul class="case-highlights">${p.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
      </section>
      <section class="case-section">
        <h3>Stack</h3>
        <ul class="case-stack">${p.stack.map((s) => `<li>${s}</li>`).join("")}</ul>
      </section>
      <div class="case-links">
        ${
          p.live
            ? `<a class="btn btn-accent" href="${p.live}" target="_blank" rel="noopener">Live demo ${arrowSvg}</a>`
            : ""
        }
        <a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noopener">Source on GitHub ${arrowSvg}</a>
      </div>
      <button class="case-next" type="button" data-next="${next.id}">
        <span>Next — ${next.title}</span>
        ${arrowSvg}
      </button>
    </div>`;

  document.body.classList.add("modal-open");
  if (!dialog.open) dialog.showModal();
  panel.scrollTop = 0;
  requestAnimationFrame(() => {
    const close = panel.querySelector("[data-close]");
    if (close) close.focus();
  });
}

function bindDialog() {
  if (!dialog) return;
  dialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-close]")) {
      dialog.close();
      return;
    }
    const next = event.target.closest("[data-next]");
    if (next) {
      openCase(next.dataset.next);
      return;
    }
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });
}

function bindProjectLinks() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project]");
    if (!trigger) return;
    event.preventDefault();
    openCase(trigger.dataset.project);
  });
}

/* ============================================================
   Hover preview (desktop only)
   ============================================================ */

const peek = $("#peek");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

let mouseX = 0;
let mouseY = 0;
let curX = 0;
let curY = 0;
let peekVisible = false;
let peekInitialized = false;

function animatePeek() {
  if (!peek) return;
  curX += (mouseX - curX) * 0.16;
  curY += (mouseY - curY) * 0.16;

  const w = 300;
  const h = 225;
  const gap = 26;
  let x = curX + gap;
  if (x + w > window.innerWidth - 16) x = curX - w - gap;
  x = Math.max(16, Math.min(x, window.innerWidth - w - 16));
  const minY = 76 + h / 2 + 14;
  const y = Math.max(minY, Math.min(curY, window.innerHeight - h / 2 - 16));

  const scale = peekVisible ? 1 : 0.94;
  peek.style.transform = `translate3d(${x}px, ${y}px, 0) translate(0, -50%) scale(${scale})`;
  requestAnimationFrame(animatePeek);
}

function showPeek(id) {
  if (!peek || !finePointer.matches) return;
  const p = projects.find((item) => item.id === id);
  if (!p) return;
  peek.innerHTML = `<div class="cover">${covers[p.id] || ""}</div>
    <span class="peek-caption">${p.title} · ${p.categoryLabel}</span>`;
  if (!peekInitialized) {
    curX = mouseX;
    curY = mouseY;
    peekInitialized = true;
  }
  peekVisible = true;
  peek.classList.add("is-visible");
}

function hidePeek() {
  if (!peek) return;
  peekVisible = false;
  peek.classList.remove("is-visible");
}

function bindPeek() {
  if (!projectList) return;
  projectList.onpointerover = (event) => {
    const row = event.target.closest(".project-row");
    if (row) showPeek(row.dataset.project);
  };
  projectList.onpointerout = (event) => {
    const row = event.target.closest(".project-row");
    if (row && !row.contains(event.relatedTarget)) hidePeek();
  };
}

document.addEventListener("pointermove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

window.addEventListener("scroll", hidePeek, { passive: true });
window.addEventListener("blur", hidePeek);

/* ============================================================
   Header, menu, progress, active nav
   ============================================================ */

function bindChrome() {
  const header = $("#site-header");
  const progress = $("#progress-bar");
  const menuBtn = $("#menu-btn");
  const mobileMenu = $("#mobile-menu");

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 12);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    mobileMenu.hidden = true;
  };

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!isOpen));
      menuBtn.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      mobileMenu.hidden = isOpen;
    });
    mobileMenu.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const navLinks = $$(".nav a");
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => navObserver.observe(section));
  }
}

/* ============================================================
   Copy email, toast, time
   ============================================================ */

const toast = $("#toast");
let toastTimer = null;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(CONFIG.email);
    showToast(`Email copied — ${CONFIG.email}`);
  } catch (error) {
    const area = document.createElement("textarea");
    area.value = CONFIG.email;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      showToast(`Email copied — ${CONFIG.email}`);
    } catch (fallbackError) {
      showToast(CONFIG.email);
    }
    area.remove();
  }
}

function bindEmail() {
  $$("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", copyEmail);
  });

  $$('a[href^="mailto:"]').forEach((link) => {
    link.setAttribute("href", `mailto:${CONFIG.email}`);
  });

  $$("[data-email-label]").forEach((label) => {
    label.textContent = CONFIG.email;
  });

  const contactMail = $(".contact-actions .btn-dark");
  if (contactMail) {
    contactMail.innerHTML = `${CONFIG.email} ${arrowSvg}`;
  }
}

function bindClock() {
  const year = $("#year");
  const time = $("#local-time");
  const thisYear = String(new Date().getFullYear());
  if (year) year.textContent = thisYear;
  const dossierYear = $("#dossier-year");
  if (dossierYear) dossierYear.textContent = thisYear;
  const statBuilds = $("#stat-builds");
  if (statBuilds) statBuilds.textContent = String(projects.length);
  const tick = () => {
    if (time) {
      time.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };
  tick();
  window.setInterval(tick, 30000);
}

/* ============================================================
   Init
   ============================================================ */

buildTicker();
bindFilters();
bindDialog();
bindProjectLinks();
bindChrome();
bindEmail();
bindClock();
render();
requestAnimationFrame(animatePeek);