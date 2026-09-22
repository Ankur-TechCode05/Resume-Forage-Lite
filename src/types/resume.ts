export interface PersonalInfo {
  fullName: string;
  email: string;
 phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  title: string;
  photo: string;
}

export interface Summary {
  text: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  link: string;
  technologies: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
}

export type SectionType =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'achievements'
  | 'languages';

export interface ResumeData {
  personal: PersonalInfo;
  summary: Summary;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  languages: LanguageItem[];
  sectionOrder: SectionType[];
}

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  template: string;
  data: ResumeData;
  created_at: string;
  updated_at: string;
}

export type ResumeTemplate =
  | 'modern'
  | 'classic'
  | 'minimal'
  | 'professional'
  | 'elegant'
  | 'creative'
  | 'bold'
  | 'executive';

export const SECTION_LABELS: Record<SectionType, string> = {
  personal: 'Personal Info',
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  projects: 'Projects',
  skills: 'Skills',
  certifications: 'Certifications',
  achievements: 'Achievements',
  languages: 'Languages',
};

export function createEmptyResumeData(): ResumeData {
  return {
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      title: '',
      photo: '',
    },
    summary: { text: '' },
    experience: [],
    education: [],
    projects: [],
    skills: [],
    certifications: [],
    achievements: [],
    languages: [],
    sectionOrder: [
      'personal',
      'summary',
      'experience',
      'education',
      'projects',
      'skills',
      'certifications',
      'achievements',
      'languages',
    ],
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
