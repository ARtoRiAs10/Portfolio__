export type ServiceTier = {
  id: "basic" | "standard" | "premium";
  name: string;
  tagline: string;
  price: string;
  timeline: string;
  outcome: string;
  features: string[];
  featured?: boolean;
};

export const serviceTiers: ServiceTier[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "A sharp landing page that makes the first 10 seconds count.",
    price: "from $450",
    timeline: "5–7 days",
    outcome: "A credible, fast, responsive page with a clear call to action.",
    features: [
      "One-page Next.js site",
      "Responsive + accessible",
      "SEO + Open Graph",
      "Contact / booking CTA",
      "One revision round",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "A full-stack MVP with auth, data, and a real backend.",
    price: "from $2,400",
    timeline: "3–5 weeks",
    outcome: "A working product you can put in front of users.",
    features: [
      "Next.js + TypeScript",
      "Database + auth",
      "Admin / dashboard",
      "Payments or email",
      "Deploy + handover",
      "Two revision rounds",
    ],
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "An AI workflow or platform with the hard parts handled.",
    price: "from $4,800",
    timeline: "4–8 weeks",
    outcome: "A defensible AI feature or internal tool with guardrails.",
    features: [
      "AI provider routing",
      "RAG / retrieval + evals",
      "Realtime or async jobs",
      "Observability + rate limits",
      "Architecture docs",
      "30-day post-launch support",
    ],
  },
];

export type ProjectType = "landing" | "mvp" | "ai" | "realtime" | "rescue";
export type Timeline = "rush" | "standard" | "relaxed" | "flexible";
export type Integration =
  | "none"
  | "auth"
  | "payments"
  | "ai"
  | "realtime"
  | "cms";

export type EstimatorAnswers = {
  projectType: ProjectType | null;
  timeline: Timeline | null;
  integrations: Integration[];
};

export const emptyEstimatorAnswers: EstimatorAnswers = {
  projectType: null,
  timeline: null,
  integrations: [],
};

type ProjectOption = {
  id: ProjectType;
  label: string;
  description: string;
  base: number;
  weeks: string;
};

export const projectTypeOptions: ProjectOption[] = [
  {
    id: "landing",
    label: "Landing page",
    description: "One page, one offer, one clear action.",
    base: 650,
    weeks: "1–2 weeks",
  },
  {
    id: "mvp",
    label: "Full-stack MVP",
    description: "Auth, database, dashboard, and a working product.",
    base: 2800,
    weeks: "3–5 weeks",
  },
  {
    id: "ai",
    label: "AI workflow",
    description: "Retrieval, automation, or an AI-assisted feature.",
    base: 2200,
    weeks: "2–4 weeks",
  },
  {
    id: "realtime",
    label: "Realtime app",
    description: "Collaboration, presence, chat, or live data.",
    base: 3200,
    weeks: "3–5 weeks",
  },
  {
    id: "rescue",
    label: "Rescue / audit",
    description: "A stuck build, a slow app, or a second opinion.",
    base: 1200,
    weeks: "1–2 weeks",
  },
];

type TimelineOption = {
  id: Timeline;
  label: string;
  description: string;
  multiplier: number;
};

export const timelineOptions: TimelineOption[] = [
  {
    id: "rush",
    label: "ASAP",
    description: "This week — I will move other work.",
    multiplier: 1.35,
  },
  {
    id: "standard",
    label: "2–4 weeks",
    description: "A focused, normal sprint.",
    multiplier: 1,
  },
  {
    id: "relaxed",
    label: "1–2 months",
    description: "Room for research and iteration.",
    multiplier: 0.95,
  },
  {
    id: "flexible",
    label: "Flexible",
    description: "Quality first; we can shape the scope.",
    multiplier: 0.9,
  },
];

type IntegrationOption = {
  id: Integration;
  label: string;
  description: string;
  add: number;
};

export const integrationOptions: IntegrationOption[] = [
  {
    id: "none",
    label: "None yet",
    description: "Keep the first version small.",
    add: 0,
  },
  {
    id: "auth",
    label: "Auth + database",
    description: "Clerk / Convex / Postgres and user accounts.",
    add: 300,
  },
  {
    id: "payments",
    label: "Payments",
    description: "Razorpay / Stripe checkout and billing.",
    add: 500,
  },
  {
    id: "ai",
    label: "AI provider",
    description: "OpenAI / Claude / Gemini with routing.",
    add: 700,
  },
  {
    id: "realtime",
    label: "Realtime",
    description: "WebSockets, presence, or live sync.",
    add: 600,
  },
  {
    id: "cms",
    label: "CMS / admin",
    description: "Editable content and an admin view.",
    add: 350,
  },
];

export type EstimateResult = {
  low: number;
  high: number;
  weeks: string;
  lineItems: { label: string; value: number }[];
};

const round50 = (value: number) => Math.round(value / 50) * 50;

export function estimateProject(
  answers: EstimatorAnswers,
): EstimateResult | null {
  if (!answers.projectType || !answers.timeline) return null;

  const project =
    projectTypeOptions.find((option) => option.id === answers.projectType) ??
    projectTypeOptions[0];
  const timeline =
    timelineOptions.find((option) => option.id === answers.timeline) ??
    timelineOptions[1];

  const integrationTotal = answers.integrations.reduce((total, id) => {
    const option = integrationOptions.find((item) => item.id === id);
    return total + (option?.add ?? 0);
  }, 0);

  const subtotal = project.base + integrationTotal;
  const total = subtotal * timeline.multiplier;

  return {
    low: round50(total * 0.85),
    high: round50(total * 1.2),
    weeks: project.weeks,
    lineItems: [
      { label: project.label, value: project.base },
      ...integrationOptions
        .filter(
          (option) =>
            option.id !== "none" && answers.integrations.includes(option.id),
        )
        .map((option) => ({ label: option.label, value: option.add })),
    ],
  };
}

export function buildEstimateBrief(answers: EstimatorAnswers): string {
  const result = estimateProject(answers);
  if (!result) return "";

  const project =
    projectTypeOptions.find((option) => option.id === answers.projectType)
      ?.label ?? "Project";
  const timeline =
    timelineOptions.find((option) => option.id === answers.timeline)?.label ??
    "Flexible";
  const integrations = answers.integrations.length
    ? answers.integrations
        .map(
          (id) =>
            integrationOptions.find((option) => option.id === id)?.label ?? id,
        )
        .join(", ")
    : "None yet";

  return [
    "Project inquiry — Gaurav Kumar",
    "",
    `Project type: ${project}`,
    `Timeline: ${timeline}`,
    `Integrations: ${integrations}`,
    `Estimated budget: $${result.low.toLocaleString()}–$${result.high.toLocaleString()}`,
    `Estimated delivery: ${result.weeks}`,
    "",
    "A short description of what I am building:",
    "",
  ].join("\n");
}