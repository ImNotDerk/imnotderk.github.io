/**
 * Single source of truth for your personal portfolio data.
 * Drop your photos in `public/images/`, your PDF in `public/resume.pdf`,
 * and edit the fields below—the Hero, About section, Events, Experience,
 * Skills, Contact, and interactive terminal all read from this file.
 */

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  kind: 'github' | 'linkedin' | 'email' | 'website';
}

export interface BackdropsConfig {
  heroFrieren: string;
  heroCyberzone: string;
  aboutFrieren: string;
  aboutCyberzone: string;
  contactFrieren: string;
  contactCyberzone: string;
}

export interface Profile {
  /** Shown in Navbar, Hero display headline, and footer copyright */
  name: string;
  /** Prompt handle in the interactive About shell (e.g. "derk" -> derk@sh) */
  terminalUser: string;
  role: string;
  subtitle: string;
  /** One-sentence Hero lead below your name */
  tagline: string;
  location: string;
  /** IANA timezone for the live clock in About (e.g. "Asia/Manila") */
  timezone: string;
  email: string;
  /** Path inside `public/` (put your file at `public/resume.pdf`) */
  resumePath?: string;
  aboutHeading: string;
  aboutBio: string;
  currentFocus: string;
  /**
   * Optional: Set `aboutPhoto` (e.g. '/images/me.jpg') to display your own portrait/photo
   * in the About section instead of the theme anime backdrops. Leave as '' to use backdrops.
   */
  aboutPhoto: string;
  aboutPhotoAlt: string;
  contactHeading: string;
  contactBlurb: string;
  backdrops: BackdropsConfig;
  socials: SocialLink[];
}

export interface EventPhoto {
  /** Put images in `public/images/events/` and reference like '/images/events/my-photo.jpg' */
  src: string;
  label: string;
  caption: string;
}

export interface EventItem {
  id: string;
  frame: string;
  title: string;
  date: string;
  location: string;
  badge: string;
  story: string;
  featured?: boolean;
  photos: EventPhoto[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  stack: string[];
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export const profile: Profile = {
  name: 'Derk',
  terminalUser: 'derk',
  role: 'Software Engineer',
  subtitle: 'Derrick M. Valdellon — Software Engineer',
  tagline: 'Building full-stack web applications, AI-integrated tools, and fast backend systems.',
  location: 'Manila, Philippines',
  timezone: 'Asia/Manila',
  email: 'derrickmvaldellon@gmail.com',
  aboutHeading: "Hi, I'm Derrick (Derk).",
  aboutBio:
    "I'm a Computer Science student at De La Salle University (Major in Software Technology) and a part-time Software Engineer in Manila. I enjoy building responsive full-stack interfaces, real-time data pipelines, and AI-integrated tools that stay fast and intuitive.",
  currentFocus:
    'Software Engineer at [Redacted], Part-time at Dayou Sports Technologies & BSCS at De La Salle University.',
  aboutPhoto: '/images/profile.JPG',
  aboutPhotoAlt: 'Portrait of Derrick M. Valdellon',
  contactHeading: 'Say hello',
  contactBlurb: 'Open to engineering roles and conversations about systems. Reach out via email if you would like a copy of my resume.',
  backdrops: {
    heroFrieren: '/images/backdrops/frieren-hero.jpg',
    heroCyberzone: '/images/backdrops/cyber-hero.jpg',
    aboutFrieren: '/images/backdrops/frieren-meadow.jpg',
    aboutCyberzone: '/images/backdrops/cyber-neon-rain.jpg',
    contactFrieren: '/images/backdrops/frieren-blossoms.jpg',
    contactCyberzone: '/images/backdrops/cyber-moon.jpg',
  },
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/ImNotDerk',
      handle: '@ImNotDerk',
      kind: 'github',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/derrick-valdellon',
      handle: 'in/derrick-valdellon',
      kind: 'linkedin',
    },
    {
      label: 'Email',
      href: 'mailto:derrickmvaldellon@gmail.com',
      handle: 'derrickmvaldellon@gmail.com',
      kind: 'email',
    },
  ],
};

export const events: EventItem[] = [
  {
    id: 'devcamp-manila-biyahey',
    frame: 'FRAME 01',
    title: 'Developer Camp Manila 2026 — BiyaHey',
    date: 'Mar 2026',
    location: 'Manila, Philippines',
    badge: 'Hackathon',
    story:
      'Built BiyaHey in a weekend sprint with Django 6 REST, Google OAuth 2.0 + SimpleJWT, and a decoupled React + TypeScript frontend.',
    featured: true,
    photos: [
      {
        src: '/images/events/event-hackathon.svg',
        label: 'Hackathon Build',
        caption: 'Shipping BiyaHey with Django REST + React + Google OAuth under hackathon hours.',
      },
      {
        src: '/images/events/event-demoday.svg',
        label: 'Late Sprint',
        caption: 'Wiring JWT token exchange between the React client and Django backend.',
      },
      {
        src: '/images/projects/gateway-cover.svg',
        label: 'Auth Flow',
        caption: 'Stateless Google OAuth2 adapter flow feeding SimpleJWT sessions.',
      },
    ],
  },
  {
    id: 'observability-summit',
    frame: 'FRAME 02',
    title: 'Observability Summit',
    date: 'Jul 2025',
    location: 'Philippines',
    badge: 'Conference',
    story:
      'Filled half a notebook with tracing diagrams between talks; most of those sketches turned into the telemetry workbench.',
    featured: false,
    photos: [
      {
        src: '/images/events/event-conference.svg',
        label: 'Main Hall',
        caption: 'Keynote session on unifying traces and structured logs.',
      },
      {
        src: '/images/projects/telemetry-cover.svg',
        label: 'Notebook Sketch',
        caption: 'Early layout sketch for the 60fps virtualized log stream.',
      },
      {
        src: '/images/events/event-workshop.svg',
        label: 'Hallway',
        caption: 'Long coffee breaks comparing incident postmortems with other teams.',
      },
    ],
  },
  {
    id: 'zero-trust-workshop',
    frame: 'FRAME 03',
    title: 'Edge Networking Workshop',
    date: 'Mar 2025',
    location: 'Meetup',
    badge: 'Workshop',
    story:
      'Walked through OIDC edge verification and Cloudflare Tunnels with local infra folks over pizza and terminal windows.',
    featured: false,
    photos: [
      {
        src: '/images/events/event-workshop.svg',
        label: 'Session',
        caption: 'Live walkthrough of declarative route rules and JWKS caching.',
      },
      {
        src: '/images/projects/gateway-cover.svg',
        label: 'Diagram',
        caption: 'Edge verification flow shared during the hands-on lab.',
      },
      {
        src: '/images/events/event-conference.svg',
        label: 'Q&A',
        caption: 'Debating fail-open vs. fail-closed rate limiters.',
      },
    ],
  },
  {
    id: 'builders-demo-night',
    frame: 'FRAME 04',
    title: 'Weekend Builders Night',
    date: 'Nov 2024',
    location: 'Tech Hub',
    badge: 'Demo Night',
    story:
      'Five minutes with an early scheduler prototype and honest feedback from engineers who build queues for a living.',
    featured: false,
    photos: [
      {
        src: '/images/events/event-demoday.svg',
        label: 'Demo Table',
        caption: 'Showing lease recovery behavior to folks on the open floor.',
      },
      {
        src: '/images/events/event-hackathon.svg',
        label: 'Room',
        caption: 'Small room, good questions, zero slide decks.',
      },
      {
        src: '/images/projects/orchestrator-cover.svg',
        label: 'Prototype',
        caption: 'The early architecture diagram we projected on the wall.',
      },
    ],
  },
];

export const experiences: ExperienceEntry[] = [
  {
    role: 'Software Engineer',
    company: '[Redacted]',
    period: 'Jun 2026 — Present',
    location: 'Manila, PH',
    summary:
      'Engineered full-stack command-center platforms, offline-first voice-to-insight survey & LLM sentiment pipelines, and a permission-aware internal workspace with Entra OIDC SSO and a 32-tool MCP agent surface. Automated production Linux deployments via Git-to-Portainer webhook pipelines behind Cloudflare Zero Trust Tunnels and Nginx, built self-hosted container observability, and standardized spec-driven engineering workflows across 15+ product repositories.',
    stack: [
      'TypeScript',
      'React / Next.js',
      'Python (FastAPI / Flask)',
      'PostgreSQL',
      'Docker / Portainer',
      'Cloudflare Tunnels',
      'Nginx',
      'MCP / LLM Pipelines',
    ],
  },
  {
    role: 'Software Engineer (Part-time)',
    company: 'Dayou Sports Technologies Inc.',
    period: 'May 2026 — Present',
    location: 'Manila, PH',
    summary:
      'Built real-time Match Live Stats box scores and player leaderboards with React 18, TypeScript, and TanStack Query; designed PostgreSQL schemas with strict Supabase Row-Level Security (RLS) and single-click Google OAuth SSO.',
    stack: ['React 18', 'TypeScript', 'PostgreSQL', 'Supabase RLS', 'TanStack Query', 'Tailwind CSS'],
  },
  {
    role: 'Associate for Data & Research',
    company: 'DLSU Data Science Society',
    period: 'Oct 2025 — Aug 2026',
    location: 'Manila, PH',
    summary:
      'Developed and maintained full-stack features for the official DLSU Data Science Society web platform.',
    stack: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    role: 'Officer for R&D & Events',
    company: 'DLSU Microsoft Student Community',
    period: 'Nov 2024 — Aug 2026',
    location: 'Manila, PH',
    summary:
      'Led organizational research and technical event execution across two terms as Officer for Research & Development (2025–2026) and Officer for Events & Activities (2024–2025).',
    stack: ['Research & Development', 'Technical Events', 'Leadership'],
  },
  {
    role: 'BS Computer Science (Major in Software Technology)',
    company: 'De La Salle University',
    period: 'Aug 2022 — Aug 2026',
    location: 'Manila, PH',
    summary:
      'Coursework and systems projects in distributed computing, database systems, OLAP data warehousing, operating systems, and machine learning.',
    stack: ['C++', 'Python', 'TypeScript', 'Java', 'PostgreSQL', 'Docker'],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Rust', 'Swift 6', 'Python', 'C++', 'Go', 'Java', 'SQL'],
  },
  {
    title: 'Frontend & UI',
    items: ['React 19', 'Next.js 16', 'SwiftUI', 'Astro', 'Tailwind CSS', 'TanStack Query', 'Qt 6'],
  },
  {
    title: 'Backend & Data',
    items: ['Fastify', 'FastAPI', 'Django REST', 'Node.js', 'PostgreSQL', 'Supabase', 'SQLite (WAL)', 'Prisma'],
  },
  {
    title: 'AI & Systems',
    items: ['WebAssembly (WASM)', 'OpenAI / DeepSeek RAG', 'Vertex AI / Gemini', 'gRPC / Protobuf', 'PhotoKit', 'Docker'],
  },
];
