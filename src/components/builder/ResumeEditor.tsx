import { useState, useRef } from 'react';
import { Plus, Trash2, GripVertical, Upload, X, User } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import type { ResumeData, EducationItem, ExperienceItem, ProjectItem, SkillItem, CertificationItem, AchievementItem, LanguageItem } from '@/types/resume';
import { generateId } from '@/types/resume';

interface EditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export function ResumeEditor({ data, onChange }: EditorProps) {
  const update = (partial: Partial<ResumeData>) => onChange({ ...data, ...partial });
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      alert('Photo must be under 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      update({ personal: { ...data.personal, photo: e.target?.result as string } });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      {/* Personal Info */}
      <Card>
        <CardBody className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Personal Information</h3>
          {/* Photo upload */}
          <div className="flex items-center gap-4 mb-2">
            <div className="relative">
              {data.personal.photo ? (
                <img src={data.personal.photo} alt="Profile" className="h-20 w-20 rounded-full object-cover ring-2 ring-teal-200" />
              ) : (
                <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-500">
                  <User className="h-8 w-8" />
                </div>
              )}
              {data.personal.photo && (
                <button
                  onClick={() => update({ personal: { ...data.personal, photo: '' } })}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files[0] && handlePhotoUpload(e.target.files[0])}
              />
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                <Upload className="h-4 w-4" /> Upload Photo
              </Button>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Optional. Max 2MB. JPG/PNG.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Full Name" value={data.personal.fullName} onChange={(e) => update({ personal: { ...data.personal, fullName: e.target.value } })} placeholder="John Doe" />
            <Input label="Professional Title" value={data.personal.title} onChange={(e) => update({ personal: { ...data.personal, title: e.target.value } })} placeholder="Software Engineer" />
            <Input label="Email" type="email" value={data.personal.email} onChange={(e) => update({ personal: { ...data.personal, email: e.target.value } })} placeholder="john@example.com" />
            <Input label="Phone" value={data.personal.phone} onChange={(e) => update({ personal: { ...data.personal, phone: e.target.value } })} placeholder="+1 234 567 890" />
            <Input label="Location" value={data.personal.location} onChange={(e) => update({ personal: { ...data.personal, location: e.target.value } })} placeholder="San Francisco, CA" />
            <Input label="Website" value={data.personal.website} onChange={(e) => update({ personal: { ...data.personal, website: e.target.value } })} placeholder="johndoe.com" />
            <Input label="LinkedIn" value={data.personal.linkedin} onChange={(e) => update({ personal: { ...data.personal, linkedin: e.target.value } })} placeholder="linkedin.com/in/johndoe" />
            <Input label="GitHub" value={data.personal.github} onChange={(e) => update({ personal: { ...data.personal, github: e.target.value } })} placeholder="github.com/johndoe" />
          </div>
        </CardBody>
      </Card>

      {/* Summary */}
      <Card>
        <CardBody className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Professional Summary</h3>
          <Textarea
            rows={4}
            value={data.summary.text}
            onChange={(e) => update({ summary: { text: e.target.value } })}
            placeholder="A brief professional summary highlighting your experience, skills, and career goals..."
          />
        </CardBody>
      </Card>

      {/* Experience */}
      <SectionWrapper title="Work Experience" onAdd={() => update({ experience: [...data.experience, { id: generateId(), company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }] })}>
        {data.experience.map((exp, i) => (
          <RepeatableItem key={exp.id} onDelete={() => update({ experience: data.experience.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Position" value={exp.position} onChange={(e) => { const arr = [...data.experience]; arr[i] = { ...exp, position: e.target.value }; update({ experience: arr }); }} placeholder="Software Engineer" />
              <Input label="Company" value={exp.company} onChange={(e) => { const arr = [...data.experience]; arr[i] = { ...exp, company: e.target.value }; update({ experience: arr }); }} placeholder="Tech Corp" />
              <Input label="Location" value={exp.location} onChange={(e) => { const arr = [...data.experience]; arr[i] = { ...exp, location: e.target.value }; update({ experience: arr }); }} placeholder="Remote" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Start Date" value={exp.startDate} onChange={(e) => { const arr = [...data.experience]; arr[i] = { ...exp, startDate: e.target.value }; update({ experience: arr }); }} placeholder="Jan 2022" />
                <Input label="End Date" value={exp.endDate} onChange={(e) => { const arr = [...data.experience]; arr[i] = { ...exp, endDate: e.target.value }; update({ experience: arr }); }} placeholder="Present" disabled={exp.current} />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600 sm:col-span-2">
                <input type="checkbox" checked={exp.current} onChange={(e) => { const arr = [...data.experience]; arr[i] = { ...exp, current: e.target.checked, endDate: e.target.checked ? '' : exp.endDate }; update({ experience: arr }); }} className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                I currently work here
              </label>
              <div className="sm:col-span-2">
                <Textarea label="Description" rows={3} value={exp.description} onChange={(e) => { const arr = [...data.experience]; arr[i] = { ...exp, description: e.target.value }; update({ experience: arr }); }} placeholder="Describe your responsibilities and achievements..." />
              </div>
            </div>
          </RepeatableItem>
        ))}
      </SectionWrapper>

      {/* Education */}
      <SectionWrapper title="Education" onAdd={() => update({ education: [...data.education, { id: generateId(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', description: '' }] })}>
        {data.education.map((edu, i) => (
          <RepeatableItem key={edu.id} onDelete={() => update({ education: data.education.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Institution" value={edu.institution} onChange={(e) => { const arr = [...data.education]; arr[i] = { ...edu, institution: e.target.value }; update({ education: arr }); }} placeholder="University of California" />
              <Input label="Degree" value={edu.degree} onChange={(e) => { const arr = [...data.education]; arr[i] = { ...edu, degree: e.target.value }; update({ education: arr }); }} placeholder="B.S." />
              <Input label="Field of Study" value={edu.field} onChange={(e) => { const arr = [...data.education]; arr[i] = { ...edu, field: e.target.value }; update({ education: arr }); }} placeholder="Computer Science" />
              <Input label="GPA" value={edu.gpa} onChange={(e) => { const arr = [...data.education]; arr[i] = { ...edu, gpa: e.target.value }; update({ education: arr }); }} placeholder="3.8" />
              <Input label="Start Date" value={edu.startDate} onChange={(e) => { const arr = [...data.education]; arr[i] = { ...edu, startDate: e.target.value }; update({ education: arr }); }} placeholder="2018" />
              <Input label="End Date" value={edu.endDate} onChange={(e) => { const arr = [...data.education]; arr[i] = { ...edu, endDate: e.target.value }; update({ education: arr }); }} placeholder="2022" />
              <div className="sm:col-span-2">
                <Textarea label="Description" rows={2} value={edu.description} onChange={(e) => { const arr = [...data.education]; arr[i] = { ...edu, description: e.target.value }; update({ education: arr }); }} placeholder="Relevant coursework, honors, activities..." />
              </div>
            </div>
          </RepeatableItem>
        ))}
      </SectionWrapper>

      {/* Projects */}
      <SectionWrapper title="Projects" onAdd={() => update({ projects: [...data.projects, { id: generateId(), name: '', description: '', link: '', technologies: '' }] })}>
        {data.projects.map((proj, i) => (
          <RepeatableItem key={proj.id} onDelete={() => update({ projects: data.projects.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Project Name" value={proj.name} onChange={(e) => { const arr = [...data.projects]; arr[i] = { ...proj, name: e.target.value }; update({ projects: arr }); }} placeholder="E-commerce Platform" />
              <Input label="Technologies" value={proj.technologies} onChange={(e) => { const arr = [...data.projects]; arr[i] = { ...proj, technologies: e.target.value }; update({ projects: arr }); }} placeholder="React, Node.js, MongoDB" />
              <Input label="Link" value={proj.link} onChange={(e) => { const arr = [...data.projects]; arr[i] = { ...proj, link: e.target.value }; update({ projects: arr }); }} placeholder="github.com/username/project" />
              <div className="sm:col-span-2">
                <Textarea label="Description" rows={2} value={proj.description} onChange={(e) => { const arr = [...data.projects]; arr[i] = { ...proj, description: e.target.value }; update({ projects: arr }); }} placeholder="What does this project do? What was your role?" />
              </div>
            </div>
          </RepeatableItem>
        ))}
      </SectionWrapper>

      {/* Skills */}
      <SectionWrapper title="Skills" onAdd={() => update({ skills: [...data.skills, { id: generateId(), name: '', level: 'Intermediate' }] })}>
        {data.skills.map((skill, i) => (
          <RepeatableItem key={skill.id} onDelete={() => update({ skills: data.skills.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Skill Name" value={skill.name} onChange={(e) => { const arr = [...data.skills]; arr[i] = { ...skill, name: e.target.value }; update({ skills: arr }); }} placeholder="JavaScript" />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Proficiency Level</label>
                <select
                  value={skill.level}
                  onChange={(e) => { const arr = [...data.skills]; arr[i] = { ...skill, level: e.target.value }; update({ skills: arr }); }}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>
            </div>
          </RepeatableItem>
        ))}
      </SectionWrapper>

      {/* Certifications */}
      <SectionWrapper title="Certifications" onAdd={() => update({ certifications: [...data.certifications, { id: generateId(), name: '', issuer: '', date: '', link: '' }] })}>
        {data.certifications.map((cert, i) => (
          <RepeatableItem key={cert.id} onDelete={() => update({ certifications: data.certifications.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Certification Name" value={cert.name} onChange={(e) => { const arr = [...data.certifications]; arr[i] = { ...cert, name: e.target.value }; update({ certifications: arr }); }} placeholder="AWS Certified Developer" />
              <Input label="Issuer" value={cert.issuer} onChange={(e) => { const arr = [...data.certifications]; arr[i] = { ...cert, issuer: e.target.value }; update({ certifications: arr }); }} placeholder="Amazon Web Services" />
              <Input label="Date" value={cert.date} onChange={(e) => { const arr = [...data.certifications]; arr[i] = { ...cert, date: e.target.value }; update({ certifications: arr }); }} placeholder="Jan 2023" />
              <Input label="Link" value={cert.link} onChange={(e) => { const arr = [...data.certifications]; arr[i] = { ...cert, link: e.target.value }; update({ certifications: arr }); }} placeholder="Verification URL" />
            </div>
          </RepeatableItem>
        ))}
      </SectionWrapper>

      {/* Achievements */}
      <SectionWrapper title="Achievements" onAdd={() => update({ achievements: [...data.achievements, { id: generateId(), title: '', description: '' }] })}>
        {data.achievements.map((ach, i) => (
          <RepeatableItem key={ach.id} onDelete={() => update({ achievements: data.achievements.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-1 gap-3">
              <Input label="Title" value={ach.title} onChange={(e) => { const arr = [...data.achievements]; arr[i] = { ...ach, title: e.target.value }; update({ achievements: arr }); }} placeholder="Employee of the Year" />
              <Textarea label="Description" rows={2} value={ach.description} onChange={(e) => { const arr = [...data.achievements]; arr[i] = { ...ach, description: e.target.value }; update({ achievements: arr }); }} placeholder="Describe the achievement..." />
            </div>
          </RepeatableItem>
        ))}
      </SectionWrapper>

      {/* Languages */}
      <SectionWrapper title="Languages" onAdd={() => update({ languages: [...data.languages, { id: generateId(), name: '', proficiency: 'Fluent' }] })}>
        {data.languages.map((lang, i) => (
          <RepeatableItem key={lang.id} onDelete={() => update({ languages: data.languages.filter((_, idx) => idx !== i) })}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Language" value={lang.name} onChange={(e) => { const arr = [...data.languages]; arr[i] = { ...lang, name: e.target.value }; update({ languages: arr }); }} placeholder="English" />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Proficiency</label>
                <select
                  value={lang.proficiency}
                  onChange={(e) => { const arr = [...data.languages]; arr[i] = { ...lang, proficiency: e.target.value }; update({ languages: arr }); }}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                >
                  <option>Basic</option>
                  <option>Conversational</option>
                  <option>Fluent</option>
                  <option>Native</option>
                </select>
              </div>
            </div>
          </RepeatableItem>
        ))}
      </SectionWrapper>
    </div>
  );
}

function SectionWrapper({ title, onAdd, children }: { title: string; onAdd: () => void; children: React.ReactNode }) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onAdd}><Plus className="h-4 w-4" /> Add</Button>
        </div>
        <div className="space-y-3">{children}</div>
      </CardBody>
    </Card>
  );
}

function RepeatableItem({ onDelete, children }: { onDelete: () => void; children: React.ReactNode }) {
  return (
    <div className="relative rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="flex items-center justify-between mb-3">
        <GripVertical className="h-4 w-4 text-slate-300 dark:text-slate-600 cursor-grab" />
        <button onClick={onDelete} className="p-1 rounded text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
      </div>
      {children}
    </div>
  );
}
