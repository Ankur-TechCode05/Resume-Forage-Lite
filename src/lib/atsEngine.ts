import { findMatchingSkills, extractKeywordsFromJobDescription } from './skillsDatabase';

export interface ATSResult {
  score: number;
  detectedSkills: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  contentIssues: string[];
  suggestions: string[];
  wordCount: number;
  sections: string[];
  missingSections: string[];
}

const REQUIRED_SECTIONS = [
  { keywords: ['experience', 'work', 'employment'], label: 'Experience' },
  { keywords: ['education', 'university', 'college', 'degree', 'school'], label: 'Education' },
  { keywords: ['skill', 'skills', 'technologies', 'competencies'], label: 'Skills' },
  { keywords: ['summary', 'objective', 'profile', 'about'], label: 'Summary' },
  { keywords: ['project', 'projects'], label: 'Projects' },
  { keywords: ['contact', 'email', 'phone'], label: 'Contact' },
];

const ACTION_VERBS = [
  'led', 'managed', 'developed', 'created', 'built', 'designed', 'implemented',
  'launched', 'improved', 'increased', 'reduced', 'optimized', 'achieved',
  'spearheaded', 'architected', 'automated', 'delivered', 'streamlined',
  'collaborated', 'analyzed', 'researched', 'mentored', 'coordinated',
  'established', 'negotiated', 'presented', 'supervised', 'executed',
  'engineered', 'maintained', 'deployed', 'integrated', 'migrated',
  'drove', 'grew', 'scaled', 'transformed', 'accelerated', 'consolidated',
  'pioneered', 'orchestrated', 'championed', 'facilitated', 'fostered',
  'generated', 'maximized', 'eliminated', 'revamped', 'solved',
  'validated', 'prototyped', 'authored', 'administered', 'tested',
  'planned', 'budgeted', 'assessed', 'evaluated', 'measured',
  'tracked', 'reported', 'documented', 'trained', 'guided',
  'founded', 'invented', 'published', 'conducted', 'performed',
  'oversaw', 'directed', 'headed', 'inspected', 'monitored',
  'reviewed', 'examined', 'estimated', 'calculated', 'quantified',
  'standardized', 'synchronized', 'aligned', 'assembled', 'constructed',
  'produced', 'distributed', 'organized', 'arranged', 'scheduled',
  'allocated', 'assigned', 'delegated', 'recruited', 'hired',
  'approved', 'authorized', 'certified', 'verified', 'confirmed',
  'supported', 'funded', 'invested', 'awarded', 'contributed',
  'participated', 'attended', 'proposed', 'recommended', 'advised',
  'consulted', 'piloted', 'commanded', 'controlled', 'regulated',
  'resolved', 'repaired', 'corrected', 'adjusted', 'modified',
  'customized', 'tailored', 'shaped', 'formed', 'crafted',
];

export function analyzeResume(text: string, jobDescription?: string): ATSResult {
  const lowerText = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const detectedSkills = findMatchingSkills(text);

  const foundSections: string[] = [];
  const missingSections: string[] = [];

  for (const section of REQUIRED_SECTIONS) {
    const found = section.keywords.some((kw) => lowerText.includes(kw));
    if (found) foundSections.push(section.label);
    else missingSections.push(section.label);
  }

  const formattingIssues: string[] = [];
  const contentIssues: string[] = [];
  const suggestions: string[] = [];

  if (wordCount < 200) formattingIssues.push('Resume is too short. Aim for 300-800 words.');
  else if (wordCount > 1200) formattingIssues.push('Resume may be too long. Consider condensing to 1-2 pages.');

  const hasBulletPoints = /[•\u2023\u25E6\u2043\u204C\u204D\-*]/.test(text) || /\d+\.\s/.test(text);
  if (!hasBulletPoints && wordCount > 50) formattingIssues.push('No bullet points detected. Use bullet points for better readability.');

  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  if (!hasEmail) formattingIssues.push('No email address found. Ensure your contact info is included.');

  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}/.test(text);
  if (!hasPhone) formattingIssues.push('No phone number found. Add a contact number.');

  const usedActionVerbs = ACTION_VERBS.filter((v) => new RegExp(`\\b${v}\\b`, 'i').test(text));
  if (usedActionVerbs.length < 5)
    contentIssues.push('Few action verbs detected. Use strong action verbs like "led", "developed", "achieved" to start bullet points.');

  const hasNumbers = /\d+%|\$\d+|\d+x|\d+\+/.test(text);
  if (!hasNumbers) contentIssues.push('No quantified achievements found. Add metrics like "increased sales by 20%" to strengthen your resume.');

  const hasLinks = /(https?:\/\/|www\.|linkedin\.com|github\.com)/i.test(text);
  if (!hasLinks) contentIssues.push('No portfolio or LinkedIn links found. Consider adding links to your professional profiles.');

  if (missingSections.includes('Summary')) suggestions.push('Add a professional summary at the top to quickly introduce yourself.');
  if (missingSections.includes('Experience')) suggestions.push('Add a detailed work experience section with roles, responsibilities, and achievements.');
  if (missingSections.includes('Education')) suggestions.push('Include your education background, including degrees and institutions.');
  if (missingSections.includes('Skills')) suggestions.push('Add a skills section listing your technical and soft skills.');
  if (missingSections.includes('Projects')) suggestions.push('Consider adding a projects section to showcase practical work.');
  if (missingSections.includes('Contact')) suggestions.push('Ensure your contact information (email and phone) is clearly visible at the top.');

  let missingKeywords: string[] = [];
  if (jobDescription && jobDescription.trim()) {
    const jdKeywords = extractKeywordsFromJobDescription(jobDescription);
    missingKeywords = jdKeywords.filter((kw) => !detectedSkills.includes(kw));
    if (missingKeywords.length > 0) {
      suggestions.push(`Your resume is missing ${missingKeywords.length} keywords from the job description: ${missingKeywords.slice(0, 10).join(', ')}${missingKeywords.length > 10 ? '...' : ''}`);
    }
  }

  let score = 0;
  score += (foundSections.length / REQUIRED_SECTIONS.length) * 30;
  score += Math.min((detectedSkills.length / 15) * 25, 25);

  let formattingScore = 20;
  if (formattingIssues.length > 0) formattingScore -= formattingIssues.length * 4;
  if (wordCount < 200 || wordCount > 1200) formattingScore -= 5;
  score += Math.max(formattingScore, 0);

  let contentScore = 25;
  if (usedActionVerbs.length < 5) contentScore -= 8;
  if (!hasNumbers) contentScore -= 8;
  if (!hasLinks) contentScore -= 4;
  if (contentIssues.length > 2) contentScore -= 5;
  score += Math.max(contentScore, 0);

  if (jobDescription && jobDescription.trim()) {
    const jdKeywords = extractKeywordsFromJobDescription(jobDescription);
    if (jdKeywords.length > 0) {
      const matchRatio = (jdKeywords.length - missingKeywords.length) / jdKeywords.length;
      score += matchRatio * 10;
    }
  }

  score = Math.min(Math.round(score), 100);

  return { score, detectedSkills, missingKeywords, formattingIssues, contentIssues, suggestions, wordCount, sections: foundSections, missingSections };
}

export interface JobMatchResult {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  totalJobKeywords: number;
}

export function matchJobDescription(resumeText: string, jobDescription: string): JobMatchResult {
  const resumeSkills = findMatchingSkills(resumeText);
  const jdKeywords = extractKeywordsFromJobDescription(jobDescription);
  const matchingSkills = jdKeywords.filter((kw) => resumeSkills.includes(kw));
  const missingSkills = jdKeywords.filter((kw) => !resumeSkills.includes(kw));
  const matchPercentage = jdKeywords.length > 0 ? Math.round((matchingSkills.length / jdKeywords.length) * 100) : 0;
  return { matchPercentage, matchingSkills, missingSkills, totalJobKeywords: jdKeywords.length };
}
