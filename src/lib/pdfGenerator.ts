import jsPDF from 'jspdf';
import type { ResumeData } from '@/types/resume';

interface TemplateColor {
  accent: [number, number, number];
  headerBg: [number, number, number] | null;
  headerText: [number, number, number];
}

const TEMPLATE_COLORS: Record<string, TemplateColor> = {
  modern: { accent: [13, 148, 136], headerBg: null, headerText: [15, 23, 42] },
  classic: { accent: [30, 41, 59], headerBg: null, headerText: [15, 23, 42] },
  minimal: { accent: [100, 116, 139], headerBg: null, headerText: [15, 23, 42] },
  professional: { accent: [29, 78, 216], headerBg: null, headerText: [15, 23, 42] },
  elegant: { accent: [190, 24, 93], headerBg: null, headerText: [15, 23, 42] },
  creative: { accent: [234, 88, 12], headerBg: [234, 88, 12], headerText: [255, 255, 255] },
  bold: { accent: [5, 150, 105], headerBg: [4, 120, 87], headerText: [255, 255, 255] },
  executive: { accent: [217, 119, 6], headerBg: [15, 23, 42], headerText: [255, 255, 255] },
};

export function generateResumePDF(data: ResumeData, template: string, title: string) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;
  const tc = TEMPLATE_COLORS[template] || TEMPLATE_COLORS.modern;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - margin) { doc.addPage(); y = margin; }
  };

  const addText = (text: string, fontSize: number, bold: boolean, color: [number, number, number], gapAfter: number, x?: number) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, contentWidth);
    for (const line of lines) {
      ensureSpace(fontSize + 4);
      doc.text(line, x ?? margin, y);
      y += fontSize + 4;
    }
    y += gapAfter;
  };

  const addSectionTitle = (title: string) => {
    ensureSpace(30);
    y += 6;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(tc.accent[0], tc.accent[1], tc.accent[2]);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;
  };

  const p = data.personal;
  const contactParts = [p.email, p.phone, p.location, p.website, p.linkedin, p.github].filter(Boolean);

  // Add photo if present
  const addPhoto = (x: number, yPos: number, size: number) => {
    if (p.photo) {
      try {
        doc.addImage(p.photo, 'JPEG', x, yPos, size, size, undefined, 'FAST');
      } catch {
        try { doc.addImage(p.photo, 'PNG', x, yPos, size, size, undefined, 'FAST'); } catch { /* skip */ }
      }
    }
  };

  // Header templates with colored bar
  if (tc.headerBg && (template === 'creative' || template === 'bold' || template === 'executive')) {
    const headerHeight = template === 'bold' ? 80 : 90;
    doc.setFillColor(tc.headerBg[0], tc.headerBg[1], tc.headerBg[2]);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');

    if (template === 'creative') {
      // Gradient effect with multiple rects
      const steps = 20;
      for (let i = 0; i < steps; i++) {
        const r = Math.round(234 + (244 - 234) * (i / steps));
      const g = Math.round(88 + (114 - 88) * (i / steps));
      const b = Math.round(12 + (182 - 12) * (i / steps));
      doc.setFillColor(r, g, b);
      doc.rect((pageWidth / steps) * i, 0, pageWidth / steps + 1, headerHeight, 'F');
      }
    }

    const photoSize = 56;
    if (p.photo) {
      addPhoto(margin, (headerHeight - photoSize) / 2, photoSize);
    }
    const textX = p.photo ? margin + photoSize + 16 : margin;
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(p.fullName || 'Your Name', textX, 32);
    if (p.title) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(template === 'executive' ? [217, 119, 6] as [number, number, number] : [255, 255, 255]);
      doc.text(p.title, textX, 48);
    }
    if (contactParts.length) {
      doc.setFontSize(8);
      doc.setTextColor(220, 220, 220);
      doc.text(contactParts.join('  |  '), textX, 62);
    }
    y = headerHeight + 20;
  } else if (p.photo) {
    // Standard templates with photo
    addPhoto(margin, margin, 60);
    const textX = margin + 68;
    addText(p.fullName || 'Your Name', 20, true, tc.headerText, 2, textX);
    if (p.title) addText(p.title, 11, false, tc.accent, 2, textX);
    if (contactParts.length) addText(contactParts.join('  |  '), 8, false, [100, 100, 100], 6, textX);
  } else {
    // Standard templates without photo
    addText(p.fullName || 'Your Name', 22, true, tc.headerText, 2);
    if (p.title) addText(p.title, 12, false, tc.accent, 4);
    if (contactParts.length) addText(contactParts.join('  |  '), 9, false, [100, 100, 100], 6);
  }

  for (const section of data.sectionOrder) {
    switch (section) {
      case 'summary':
        if (data.summary.text.trim()) { addSectionTitle('Summary'); addText(data.summary.text, 10, false, [50, 50, 50], 4); }
        break;
      case 'experience':
        if (data.experience.length) {
          addSectionTitle('Experience');
          for (const exp of data.experience) {
            addText(`${exp.position} — ${exp.company}${exp.location ? ', ' + exp.location : ''}`, 11, true, [20, 20, 20], 1);
            addText(`${exp.startDate} — ${exp.current ? 'Present' : exp.endDate}`, 9, false, [120, 120, 120], 3);
            if (exp.description) addText(exp.description, 10, false, [60, 60, 60], 4);
          }
        }
        break;
      case 'education':
        if (data.education.length) {
          addSectionTitle('Education');
          for (const edu of data.education) {
            addText(`${edu.degree}${edu.field ? ' in ' + edu.field : ''}`, 11, true, [20, 20, 20], 1);
            addText(edu.institution, 10, false, [60, 60, 60], 1);
            addText(`${edu.startDate} — ${edu.endDate}${edu.gpa ? '  |  GPA: ' + edu.gpa : ''}`, 9, false, [120, 120, 120], 3);
            if (edu.description) addText(edu.description, 10, false, [60, 60, 60], 4);
          }
        }
        break;
      case 'projects':
        if (data.projects.length) {
          addSectionTitle('Projects');
          for (const proj of data.projects) {
            addText(`${proj.name}${proj.technologies ? ' (' + proj.technologies + ')' : ''}`, 11, true, [20, 20, 20], 1);
            if (proj.description) addText(proj.description, 10, false, [60, 60, 60], 2);
            if (proj.link) addText(proj.link, 9, false, tc.accent, 4);
          }
        }
        break;
      case 'skills':
        if (data.skills.length) {
          addSectionTitle('Skills');
          addText(data.skills.map((s) => `${s.name}${s.level ? ' (' + s.level + ')' : ''}`).join('  •  '), 10, false, [50, 50, 50], 4);
        }
        break;
      case 'certifications':
        if (data.certifications.length) {
          addSectionTitle('Certifications');
          for (const cert of data.certifications) {
            addText(`${cert.name} — ${cert.issuer}${cert.date ? ', ' + cert.date : ''}`, 10, false, [50, 50, 50], 2);
            if (cert.link) addText(cert.link, 9, false, tc.accent, 3);
          }
        }
        break;
      case 'achievements':
        if (data.achievements.length) {
          addSectionTitle('Achievements');
          for (const ach of data.achievements) {
            addText(`• ${ach.title}`, 10, true, [30, 30, 30], 1);
            if (ach.description) addText(ach.description, 10, false, [60, 60, 60], 3);
          }
        }
        break;
      case 'languages':
        if (data.languages.length) {
          addSectionTitle('Languages');
          addText(data.languages.map((l) => `${l.name} (${l.proficiency})`).join('  •  '), 10, false, [50, 50, 50], 4);
        }
        break;
    }
  }

  doc.save(`${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}
