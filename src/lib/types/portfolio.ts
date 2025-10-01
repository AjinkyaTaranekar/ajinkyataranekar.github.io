export interface PersonalInfo {
	name: string;
	title: string;
	tagline: string;
	bio: string[];
	location: string;
	email: string;
	availability: string;
}

export interface SocialLinks {
	github: string;
	linkedin: string;
	twitter?: string;
	website?: string;
}

export interface Experience {
	title: string;
	company: string;
	period: string;
	description: string;
	technologies: string[];
	type: 'work' | 'internship';
}

export interface Project {
	title: string;
	description: string;
	image: string;
	technologies: string[];
	github?: string;
	demo?: string;
	featured: boolean;
}

export interface Education {
	degree: string;
	institution: string;
	period: string;
	grade: string;
	description: string;
	achievements: string[];
}

export interface Skill {
	name: string;
	level: number;
}

export interface SkillCategory {
	name: string;
	icon: string;
	skills: Skill[];
}

export interface Stats {
	projects: string;
	technologies: string;
	dedication: string;
	learning: string;
}

export interface PortfolioData {
	personal: PersonalInfo;
	social: SocialLinks;
	stats: Stats;
	experiences: Experience[];
	projects: Project[];
	education: Education[];
	skillCategories: SkillCategory[];
	additionalSkills: string[];
}
