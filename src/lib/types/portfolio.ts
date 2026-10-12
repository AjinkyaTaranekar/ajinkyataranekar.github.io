export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  location: string;
  phone: string;
  email: string;
  availability: string;
  /** The kinds of roles wanted, e.g. "SRE, backend or GenAI roles". */
  lookingFor?: string;
  profileImage?: string;
  website?: string;
  /** A short personal philosophy, shown as a pull quote. */
  motto?: string;
  /** One or two sentences shown under the name in the hero. */
  intro?: string;
  /** Words cycled in the hero headline ("Engineering software that's ___"). */
  focus?: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
  website?: string;
  resume?: string;
}

export interface Experience {
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  highlights?: string[];
  type: "work" | "internship";
}

export interface Project {
  /** URL segment for the project page: /projects/<slug>. Keep it stable once published. */
  slug: string;
  title: string;
  description: string;
  /** Cover image; a typographic cover is drawn if missing or it fails to load. */
  image?: string;
  technologies: string[];
  /** Key outcomes; numbers in them are emphasised automatically. */
  highlights?: string[];
  /** YouTube demo; embedded in the project dialog. */
  video?: string;
  /** Older work shown in the compact "More projects" list instead of a card. */
  archived?: boolean;
  github?: string;
  demo?: string;
  document?: string;
  link?: string;
  winner?: string;
  featured: boolean;
  [key: string]: any;
}

export interface Education {
  degree: string;
  institution: string;
  institutionLogo?: string;
  location: string;
  period: string;
  grade: string;
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  /** Self-rated 0–100. Not shown on the site; optional. */
  level?: number;
  experience?: "Expert" | "Advanced" | "Intermediate" | "Proficient";
  years?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Stats {
  experience: string;
  projects: string;
  technologies: string;
  dedication: string;
  learning: string;
}

export interface Photo {
  id: string;
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  location?: string;
  date?: string;
}

export interface Achievement {
  title: string;
  organization: string;
  year: string;
  description: string;
}

export interface Signal {
  label: string;
  value: string;
}

/** Real impact metrics rendered as a status-page card in the hero. */
export interface Signals {
  /** Where the numbers come from, so they are not misattributed (used in llms.txt). */
  context?: string;
  metrics: Signal[];
  latency?: { label: string; from: string; to: string };
}

/** Search and social-preview metadata. */
export interface SeoInfo {
  /** Page title (keep under ~60 characters). */
  title: string;
  /** Meta description (keep under ~160 characters). */
  description: string;
  jobTitle: string;
  /** 1200×630 social preview image, path under static/. */
  image: string;
  imageAlt: string;
  keywords?: string[];
  /** Extra profiles for structured data and llms.txt (e.g. Devpost), beyond the social links. */
  sameAs?: string[];
}

export interface PortfolioData {
  personal: PersonalInfo;
  social: SocialLinks;
  seo: SeoInfo;
  stats: Stats;
  signals?: Signals;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
  skillCategories: SkillCategory[];
  additionalSkills: string[];
  photos: Photo[];
}
