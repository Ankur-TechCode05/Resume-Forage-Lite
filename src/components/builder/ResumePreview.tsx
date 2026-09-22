import type { ResumeData, ResumeTemplate } from '@/types/resume';

interface PreviewProps {
  data: ResumeData;
  template: ResumeTemplate;
}

interface TemplateTheme {
  accent: string;
  accentBg: string;
  accentText: string;
  headerBg: string;
  headerText: string;
  sectionBorder: string;
  font: string;
  padding: string;
  photoBorder: string;
  sidebarBg: string;
  sidebarText: string;
  skillBadge: string;
}

const THEMES: Record<ResumeTemplate, TemplateTheme> = {
  modern: {
    accent: 'text-teal-600', accentBg: 'bg-teal-600', accentText: 'text-teal-700',
    headerBg: '', headerText: 'text-slate-900', sectionBorder: 'border-teal-200',
    font: 'system-ui, sans-serif', padding: 'p-8', photoBorder: 'ring-4 ring-teal-200',
    sidebarBg: '', sidebarText: '', skillBadge: 'bg-teal-50 text-teal-700',
  },
  classic: {
    accent: 'text-slate-800', accentBg: 'bg-slate-800', accentText: 'text-slate-700',
    headerBg: '', headerText: 'text-slate-900', sectionBorder: 'border-slate-400',
    font: 'Georgia, serif', padding: 'p-8', photoBorder: 'ring-4 ring-slate-300',
    sidebarBg: '', sidebarText: '', skillBadge: 'bg-slate-100 text-slate-700',
  },
  minimal: {
    accent: 'text-slate-700', accentBg: 'bg-slate-700', accentText: 'text-slate-600',
    headerBg: '', headerText: 'text-slate-900', sectionBorder: 'border-slate-200',
    font: 'system-ui, sans-serif', padding: 'p-6', photoBorder: 'ring-2 ring-slate-200',
    sidebarBg: '', sidebarText: '', skillBadge: 'bg-slate-50 text-slate-600',
  },
  professional: {
    accent: 'text-blue-700', accentBg: 'bg-blue-700', accentText: 'text-blue-700',
    headerBg: '', headerText: 'text-slate-900', sectionBorder: 'border-blue-200',
    font: 'system-ui, sans-serif', padding: 'p-8', photoBorder: 'ring-4 ring-blue-200',
    sidebarBg: '', sidebarText: '', skillBadge: 'bg-blue-50 text-blue-700',
  },
  elegant: {
    accent: 'text-rose-700', accentBg: 'bg-rose-600', accentText: 'text-rose-700',
    headerBg: '', headerText: 'text-slate-900', sectionBorder: 'border-rose-200',
    font: 'Georgia, serif', padding: 'p-8', photoBorder: 'ring-4 ring-rose-200',
    sidebarBg: '', sidebarText: '', skillBadge: 'bg-rose-50 text-rose-700',
  },
  creative: {
    accent: 'text-orange-600', accentBg: 'bg-gradient-to-r from-orange-500 to-pink-500', accentText: 'text-orange-600',
    headerBg: '', headerText: 'text-slate-900', sectionBorder: 'border-orange-200',
    font: 'system-ui, sans-serif', padding: 'p-8', photoBorder: 'ring-4 ring-orange-200',
    sidebarBg: '', sidebarText: '', skillBadge: 'bg-orange-50 text-orange-700',
  },
  bold: {
    accent: 'text-emerald-600', accentBg: 'bg-emerald-600', accentText: 'text-emerald-700',
    headerBg: 'bg-emerald-700', headerText: 'text-white', sectionBorder: 'border-emerald-300',
    font: 'system-ui, sans-serif', padding: 'p-0', photoBorder: 'ring-4 ring-emerald-300',
    sidebarBg: 'bg-emerald-50', sidebarText: 'text-emerald-900', skillBadge: 'bg-emerald-100 text-emerald-800',
  },
  executive: {
    accent: 'text-amber-700', accentBg: 'bg-amber-600', accentText: 'text-amber-700',
    headerBg: 'bg-slate-900', headerText: 'text-white', sectionBorder: 'border-amber-300',
    font: 'Georgia, serif', padding: 'p-0', photoBorder: 'ring-4 ring-amber-300',
    sidebarBg: '', sidebarText: '', skillBadge: 'bg-amber-50 text-amber-800',
  },
};

export function ResumePreview({ data, template }: PreviewProps) {
  const theme = THEMES[template];
  const p = data.personal;
  const contactParts = [p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean);
  const hasPhoto = !!p.photo;

  const Photo = ({ size = 'h-24 w-24' }: { size?: string }) =>
    hasPhoto ? (
      <img src={p.photo} alt={p.fullName} className={`${size} rounded-full object-cover ${theme.photoBorder} flex-shrink-0`} />
    ) : null;

  const renderSection = (section: string) => {
    switch (section) {
      case 'personal':
        return null;
      case 'summary':
        if (!data.summary.text.trim()) return null;
        return (
          <div key="summary" className="mb-4">
            <SectionTitle theme={theme}>Summary</SectionTitle>
            <p className="text-sm text-slate-600 leading-relaxed">{data.summary.text}</p>
          </div>
        );
      case 'experience':
        if (!data.experience.length) return null;
        return (
          <div key="experience" className="mb-4">
            <SectionTitle theme={theme}>Experience</SectionTitle>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-slate-900">{exp.position || 'Position'}{exp.company && ` — ${exp.company}`}</h3>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{exp.startDate} {exp.startDate && '—'} {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <p className="text-xs text-slate-400 mb-1">{exp.location}</p>}
                {exp.description && <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
              </div>
            ))}
          </div>
        );
      case 'education':
        if (!data.education.length) return null;
        return (
          <div key="education" className="mb-4">
            <SectionTitle theme={theme}>Education</SectionTitle>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-slate-900">{edu.degree}{edu.field && ` in ${edu.field}`}</h3>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{edu.startDate} {edu.startDate && '—'} {edu.endDate}</span>
                </div>
                <p className="text-xs text-slate-500">{edu.institution}{edu.gpa && `  |  GPA: ${edu.gpa}`}</p>
                {edu.description && <p className="text-xs text-slate-600 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        );
      case 'projects':
        if (!data.projects.length) return null;
        return (
          <div key="projects" className="mb-4">
            <SectionTitle theme={theme}>Projects</SectionTitle>
            {data.projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <h3 className="text-sm font-semibold text-slate-900">{proj.name}{proj.technologies && <span className="text-xs text-slate-400 font-normal"> ({proj.technologies})</span>}</h3>
                {proj.description && <p className="text-xs text-slate-600 mt-0.5">{proj.description}</p>}
                {proj.link && <p className={`text-xs ${theme.accent} mt-0.5`}>{proj.link}</p>}
              </div>
            ))}
          </div>
        );
      case 'skills':
        if (!data.skills.length) return null;
        return (
          <div key="skills" className="mb-4">
            <SectionTitle theme={theme}>Skills</SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s) => (
                <span key={s.id} className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${theme.skillBadge}`}>{s.name}{s.level && ` (${s.level})`}</span>
              ))}
            </div>
          </div>
        );
      case 'certifications':
        if (!data.certifications.length) return null;
        return (
          <div key="certifications" className="mb-4">
            <SectionTitle theme={theme}>Certifications</SectionTitle>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-1">
                <p className="text-sm font-medium text-slate-900">{cert.name} <span className="text-xs text-slate-500 font-normal">— {cert.issuer}{cert.date && `, ${cert.date}`}</span></p>
                {cert.link && <p className={`text-xs ${theme.accent}`}>{cert.link}</p>}
              </div>
            ))}
          </div>
        );
      case 'achievements':
        if (!data.achievements.length) return null;
        return (
          <div key="achievements" className="mb-4">
            <SectionTitle theme={theme}>Achievements</SectionTitle>
            {data.achievements.map((ach) => (
              <div key={ach.id} className="mb-1">
                <p className="text-sm font-medium text-slate-900">• {ach.title}</p>
                {ach.description && <p className="text-xs text-slate-600 ml-3">{ach.description}</p>}
              </div>
            ))}
          </div>
        );
      case 'languages':
        if (!data.languages.length) return null;
        return (
          <div key="languages" className="mb-4">
            <SectionTitle theme={theme}>Languages</SectionTitle>
            <p className="text-sm text-slate-600">{data.languages.map((l) => `${l.name} (${l.proficiency})`).join('  •  ')}</p>
          </div>
        );
      default:
        return null;
    }
  };

  // Bold template: sidebar layout
  if (template === 'bold') {
    const sidebarSections = ['skills', 'certifications', 'languages', 'achievements'];
    const mainSections = data.sectionOrder.filter((s) => !sidebarSections.includes(s) && s !== 'personal');
    const sideSections = data.sectionOrder.filter((s) => sidebarSections.includes(s));
    return (
      <div className="bg-white shadow-sm rounded-lg border border-slate-200 min-h-[600px] flex overflow-hidden" style={{ fontFamily: theme.font }}>
        <div className={`w-1/3 ${theme.sidebarBg} p-5`}>
          <div className="flex flex-col items-center text-center mb-4">
            {hasPhoto && <Photo size="h-28 w-28" />}
            <h1 className="font-bold text-slate-900 text-lg mt-3">{p.fullName || 'Your Name'}</h1>
            {p.title && <p className={`${theme.accentText} text-xs font-medium`}>{p.title}</p>}
          </div>
          {contactParts.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">Contact</h2>
              <div className="space-y-0.5">{contactParts.map((c, i) => <p key={i} className="text-xs text-slate-600 break-all">{c}</p>)}</div>
            </div>
          )}
          {sideSections.map((s) => renderSection(s))}
        </div>
        <div className="flex-1 p-6">
          {p.title && <div className={`h-1 ${theme.accentBg} rounded-full w-16 mb-3`} />}
          {mainSections.map((s) => renderSection(s))}
        </div>
      </div>
    );
  }

  // Executive template: dark header bar
  if (template === 'executive') {
    return (
      <div className="bg-white shadow-sm rounded-lg border border-slate-200 min-h-[600px] overflow-hidden" style={{ fontFamily: theme.font }}>
        <div className={`${theme.headerBg} px-8 py-6 flex items-center gap-5`}>
          {hasPhoto && <Photo size="h-20 w-20" />}
          <div className="flex-1">
            <h1 className="font-bold text-white text-2xl">{p.fullName || 'Your Name'}</h1>
            {p.title && <p className={`text-amber-400 text-sm font-medium mt-0.5`}>{p.title}</p>}
            {contactParts.length > 0 && (
              <p className="text-xs text-slate-300 mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">{contactParts.map((c, i) => <span key={i}>{c}</span>)}</p>
            )}
          </div>
        </div>
        <div className={theme.padding === 'p-0' ? 'p-8' : theme.padding}>
          {data.sectionOrder.filter((s) => s !== 'personal').map((s) => renderSection(s))}
        </div>
      </div>
    );
  }

  // Creative template: gradient header
  if (template === 'creative') {
    return (
      <div className="bg-white shadow-sm rounded-lg border border-slate-200 min-h-[600px] overflow-hidden" style={{ fontFamily: theme.font }}>
        <div className={`bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 px-8 py-6 flex items-center gap-5`}>
          {hasPhoto && <img src={p.photo} alt={p.fullName} className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white/30 flex-shrink-0" />}
          <div className="flex-1 text-white">
            <h1 className="font-bold text-2xl">{p.fullName || 'Your Name'}</h1>
            {p.title && <p className="text-white/90 text-sm font-medium mt-0.5">{p.title}</p>}
            {contactParts.length > 0 && (
              <p className="text-xs text-white/80 mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">{contactParts.map((c, i) => <span key={i}>{c}</span>)}</p>
            )}
          </div>
        </div>
        <div className="p-8">
          {data.sectionOrder.filter((s) => s !== 'personal').map((s) => renderSection(s))}
        </div>
      </div>
    );
  }

  // Default templates: modern, classic, minimal, professional, elegant
  return (
    <div className={`bg-white ${theme.padding} shadow-sm rounded-lg border border-slate-200 min-h-[600px]`} style={{ fontFamily: theme.font }}>
      <div className={`flex items-center gap-4 mb-5 ${template === 'elegant' ? 'border-b border-rose-200 pb-4' : ''}`}>
        {hasPhoto && <Photo />}
        <div>
          <h1 className={`font-bold ${theme.headerText} ${template === 'minimal' ? 'text-xl' : 'text-2xl'}`}>{p.fullName || 'Your Name'}</h1>
          {p.title && <p className={`${theme.accent} text-sm font-medium mt-0.5`}>{p.title}</p>}
          {contactParts.length > 0 && (
            <p className="text-xs text-slate-500 mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
              {contactParts.map((c, i) => <span key={i}>{c}</span>)}
            </p>
          )}
        </div>
      </div>
      {data.sectionOrder.filter((s) => s !== 'personal').map((s) => renderSection(s))}
    </div>
  );
}

function SectionTitle({ children, theme }: { children: React.ReactNode; theme: TemplateTheme }) {
  return (
    <h2 className={`text-sm font-bold text-slate-900 uppercase tracking-wide mb-2 border-b ${theme.sectionBorder} pb-1`}>
      {children}
    </h2>
  );
}
