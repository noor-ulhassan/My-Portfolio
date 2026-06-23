/* ============================================================================
   SITE CONTENT — single source of truth
   ----------------------------------------------------------------------------
   This is the ONLY file you need to edit to make the portfolio yours.
   Replace the placeholder copy, links, and lists below with your real details.
   Every section on the page reads from the exports here.
   ============================================================================ */

export const profile = {
  name: "Noor ul Hassan",
  /** Shown in the browser tab and OG image. */
  shortName: "Noor",
  role: "Software Engineer",
  /** One punchy line for the hero. Keep it human. */
  tagline: "I build full-stack products with the MERN stack & Next.js.",
  /** 2–3 sentences. The recruiter-skim version of who you are. */
  summary:
    "I'm a full-stack developer who builds web apps with the MERN stack and Next.js — from the database and API to the parts people actually click. I like clean, readable code and apps that stay fast and simple to use.",
  location: "Pakistan",
  /** Set false to show a muted “open to opportunities” chip instead of “available”. */
  available: true,
  email: "noorulhassan01.dev@gmail.com",
  /** Put your resume PDF in /public and point here. */
  resumeUrl: "/noor-ul-hassan.pdf",
} as const;

export type SocialLink = {
  label: string;
  /** Icon key — see ICONS map in components/icon.tsx */
  icon: "github" | "linkedin" | "twitter" | "mail" | "globe";
  href: string;
  /** Short handle shown in the footer/contact list. */
  handle: string;
};

export const socials: SocialLink[] = [
  { label: "GitHub", icon: "github", href: "https://github.com/noor-ulhassan", handle: "@noor-ulhassan" },
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/noor-ul-hassan01/", handle: "noor-ul-hassan01" },
  { label: "Twitter / X", icon: "twitter", href: "https://x.com/nurulhassan01", handle: "@nurulhassan01" },
  { label: "Email", icon: "mail", href: `mailto:${profile.email}`, handle: profile.email },
];

/* --------------------------------------------------------------------------- */

export type Project = {
  title: string;
  /** e.g. "Full-stack · 2024" */
  meta: string;
  description: string;
  /** Highlighted outcomes — quantify where you can. */
  highlights: string[];
  tech: string[];
  links: { live?: string; repo?: string };
  /** Marks the most important 1–2 projects for visual emphasis. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Edu Quest",
    meta: "Gamified CS learning platform",
    description:
      "A real-time invoicing and expense platform for freelancers. Multi-tenant workspaces, Stripe billing, and PDF generation, with an editor that feels instant.",
    highlights: [
      "Cut initial load to <1.2s with route-level streaming and edge caching",
      "Designed a normalized Postgres schema powering 10k+ monthly invoices",
      "Built role-based access control across 4 workspace tiers",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Tailwind"],
    links: { live: "https://example.com", repo: "https://github.com/your-handle/ledgerly" },
    featured: true,
  },
 /* {
    title: "Convo",
    meta: "Realtime app · 2023",
    description:
      "A team chat app with presence, typing indicators, threaded replies, and optimistic UI. WebSocket backbone with a REST fallback.",
    highlights: [
      "Scaled Socket.IO to 5k concurrent connections with Redis pub/sub",
      "Implemented optimistic message sync with conflict resolution",
    ],
    tech: ["React", "Node.js", "Express", "Socket.IO", "MongoDB", "Redis"],
    links: { live: "https://example.com", repo: "https://github.com/your-handle/convo" },
    featured: true,
  },
  {
    title: "Atlas UI",
    meta: "Open source · 2023",
    description:
      "An accessible, themeable React component library with 30+ headless primitives, full keyboard support, and zero runtime CSS.",
    highlights: [
      "400+ GitHub stars and 12 external contributors",
      "Ships fully typed APIs with 95% test coverage",
    ],
    tech: ["React", "TypeScript", "Radix", "Vitest"],
    links: { repo: "https://github.com/your-handle/atlas-ui" },
  },
  {
    title: "Pulse",
    meta: "Data viz · 2022",
    description:
      "A self-hosted analytics dashboard that ingests events and renders live charts without a third-party tracker.",
    highlights: [
      "Processes 1M+ events/day on a single small instance",
      "Privacy-first: no cookies, no PII, GDPR-friendly by default",
    ],
    tech: ["Next.js", "ClickHouse", "D3", "Docker"],
    links: { live: "https://example.com", repo: "https://github.com/your-handle/pulse" },
  },*/
];



export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Redux"] },
  { label: "Backend", items: ["Node.js", "Express", "REST", "GraphQL", "WebSockets"] },
  { label: "Data", items: ["MongoDB", "PostgreSQL", "Prisma", "Redis"] },
  { label: "Tooling", items: ["Git", "Docker", "Vercel", "Jest", "CI/CD"] },
];

/* --------------------------------------------------------------------------- */

export type JourneyEntry = {
  /** e.g. "2024" or "Next". */
  year: string;
  title: string;
  description: string;
  /** Marks the final, forward-looking node (rendered with emphasis). */
  current?: boolean;
};

/** "The journey" — a milestone timeline of how you got here. Edit freely. */
export const journey: JourneyEntry[] = [
  {
    year: "2022",
    title: "Started the journey",
    description:
      "Began my Software Engineering degree and built a foundation in programming, OOP, and data structures.",
  },
  {
    year: "2023",
    title: "Found the web",
    description:
      "Started learning web development on my own — and found the thing I actually loved building.",
  },
  {
    year: "2024",
    title: "Became a MERN developer",
    description:
      "Went deep on React, Node, Express & MongoDB, shipping full-stack apps end to end.",
  },
  {
    year: "2025",
    title: "Explored applied AI",
    description:
      "Built EduQuest — combining RAG pipelines and real-time systems with a modern web stack.",
  },
  {
    year: "2026",
    title: "Learned to ship",
    description:
      "Picked up Docker, cloud, and deployment — taking projects from idea to production.",
  },
  {
    year: "Next",
    title: "Keep building",
    description:
      "Ready to bring real value to an ambitious team — shipping production software and turning hard problems into reliable products.",
    current: true,
  },
];

/* --------------------------------------------------------------------------- */

export type Education = {
  credential: string;
  institution: string;
  period: string;
  detail?: string;
};

export const education: Education[] = [
  {
    credential: "B.S. in Software Engineering",
    institution: "University Of Sargodha ",
    period: "2022 — 2026",
    detail: "Coursework in algorithms, distributed systems, and human–computer interaction.",
  },
  {
    credential: "Meta Front-End Developer",
    institution: "Professional Certificate",
    period: "2022",
    detail: "Specialization in React and modern frontend engineering practices.",
  },
];

/* --------------------------------------------------------------------------- */

/** Section anchors used by the nav. Order here = order in the nav.
 *  Each `id` must match the `id` on the corresponding <section>. */
export const navItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

/** A few headline stats for the about section. Edit or empty the array to hide. */
export const stats: { value: string; label: string }[] = [
  { value: "3+", label: "Years building for the web" },
  { value: "30+", label: "Projects shipped" },
  { value: "10+", label: "Happy clients & teams" },
];

/* --------------------------------------------------------------------------- */

export const contact = {
  /**
   * Endpoint the contact form posts to. Defaults to the built-in route handler
   * at `/api/contact`, which sends real email via Resend when RESEND_API_KEY is
   * set (see `.env.example`). If email isn't configured, the form automatically
   * falls back to opening the visitor's email client.
   *
   * You can also point this at a third-party form service (e.g. Formspree) if
   * you'd rather not run the backend.
   */
  formEndpoint: "/api/contact",
};

