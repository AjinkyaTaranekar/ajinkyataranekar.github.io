export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  location: string;
  phone: string;
  email: string;
  availability: string;
  profileImage?: string;
  website?: string;
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
  title: string;
  description: string;
  image: string;
  technologies: string[];
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
  level: number;
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

export interface PortfolioData {
  personal: PersonalInfo;
  social: SocialLinks;
  stats: Stats;
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
  skillCategories: SkillCategory[];
  additionalSkills: string[];
  photos: Photo[];
}
