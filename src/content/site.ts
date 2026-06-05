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
    "Full-stack engineer focused on shipping fast, accessible web apps end to end — from data models and APIs to the last pixel of the interface. I care about clean architecture, measurable performance, and interfaces that feel effortless.",
  location: "Pakistan",
  /** Set false to show a muted “open to opportunities” chip instead of “available”. */
  available: true,
  email: "noorulhassan01.dev@gmail.com",
  /** Put your resume PDF in /public and point here. */
  resumeUrl: "/noor-ul-hassan-resume.pdf",
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
  { label: "GitHub", icon: "github", href: "https://github.com/your-handle", handle: "@your-handle" },
  { label: "LinkedIn", icon: "linkedin", href: "https://linkedin.com/in/your-handle", handle: "in/your-handle" },
  { label: "Twitter / X", icon: "twitter", href: "https://x.com/your-handle", handle: "@your-handle" },
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
    title: "Ledgerly",
    meta: "Full-stack SaaS · 2024",
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
  {
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
  },
];

/* --------------------------------------------------------------------------- */

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Redux"] },
  { label: "Backend", items: ["Node.js", "Express", "REST", "GraphQL", "WebSockets"] },
  { label: "Data", items: ["MongoDB", "PostgreSQL", "Prisma", "Redis"] },
  { label: "Tooling", items: ["Git", "Docker", "Vercel", "Jest", "CI/CD"] },
];

/* --------------------------------------------------------------------------- */

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  achievements: string[];
  stack?: string[];
};

export const experience: Experience[] = [
  {
    role: "Full-Stack Engineer",
    company: "Acme Labs",
    period: "2023 — Present",
    location: "Remote",
    summary:
      "Lead frontend architecture and own several backend services for a B2B analytics product used by 200+ teams.",
    achievements: [
      "Drove a 40% improvement in Core Web Vitals by re-architecting the rendering pipeline",
      "Shipped a design-system refactor adopted across 6 product squads",
      "Mentored two junior engineers through their first production launches",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    role: "MERN Developer",
    company: "Brightside Studio",
    period: "2022 — 2023",
    location: "Remote",
    summary:
      "Built client web apps end to end, from MongoDB schemas to polished React frontends, on tight delivery timelines.",
    achievements: [
      "Delivered 8 client projects on schedule with a 100% retention rate",
      "Standardized the team's API layer, cutting boilerplate by ~30%",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    role: "Frontend Developer (Freelance)",
    company: "Independent",
    period: "2021 — 2022",
    summary:
      "Partnered with founders and small teams to turn Figma designs into responsive, accessible production sites.",
    achievements: [
      "Built 15+ marketing sites and dashboards for early-stage startups",
      "Maintained a 5-star rating across freelance platforms",
    ],
    stack: ["React", "Next.js", "Tailwind"],
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
    credential: "B.S. in Computer Science",
    institution: "Your University",
    period: "2019 — 2023",
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

/** Section anchors used by the nav. Order here = order in the nav. */
export const navItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

/** A few headline stats for the about section. Edit or empty the array to hide. */
export const stats: { value: string; label: string }[] = [
  { value: "3+", label: "Years building for the web" },
  { value: "30+", label: "Projects shipped" },
  { value: "10+", label: "Happy clients & teams" },
];
