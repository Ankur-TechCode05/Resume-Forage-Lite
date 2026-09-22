import { useEffect, useState } from 'react';
import { Save, Download, ArrowLeft, GripVertical, Eye, Edit } from 'lucide-react';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Button, Spinner } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardBody } from '@/components/ui/Card';
import { ResumeEditor } from '@/components/builder/ResumeEditor';
import { ResumePreview } from '@/components/builder/ResumePreview';
import { generateResumePDF } from '@/lib/pdfGenerator';
import {
  createEmptyResumeData, SECTION_LABELS,
  type ResumeData, type ResumeTemplate, type SectionType, type Resume,
} from '@/types/resume';

interface BuilderProps {
  editingResume: Resume | null;
  onBack: () => void;
}

const TEMPLATES: { id: ResumeTemplate; name: string; desc: string; color: string }[] = [
  { id: 'modern', name: 'Modern', desc: 'Teal accents', color: 'teal' },
  { id: 'classic', name: 'Classic', desc: 'Serif, traditional', color: 'slate' },
  { id: 'minimal', name: 'Minimal', desc: 'Compact, simple', color: 'gray' },
  { id: 'professional', name: 'Professional', desc: 'Polished blue', color: 'blue' },
  { id: 'elegant', name: 'Elegant', desc: 'Rose serif', color: 'rose' },
  { id: 'creative', name: 'Creative', desc: 'Gradient header', color: 'orange' },
  { id: 'bold', name: 'Bold', desc: 'Emerald sidebar', color: 'emerald' },
  { id: 'executive', name: 'Executive', desc: 'Dark header', color: 'amber' },
];

export function ResumeBuilder({ editingResume, onBack }: BuilderProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState(editingResume?.title || 'Untitled Resume');
  const [template, setTemplate] = useState<ResumeTemplate>((editingResume?.template as ResumeTemplate) || 'modern');
  const [data, setData] = useState<ResumeData>(editingResume?.data || createEmptyResumeData());
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && viewMode === 'split') setViewMode('edit');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = data.sectionOrder.indexOf(active.id as SectionType);
      const newIndex = data.sectionOrder.indexOf(over.id as SectionType);
      setData({ ...data, sectionOrder: arrayMove(data.sectionOrder, oldIndex, newIndex) });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = { title, template, data };

    if (editingResume) {
      await supabase.from('resumes').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editingResume.id);
    } else {
      const { data: newResume } = await supabase.from('resumes').insert({ ...payload }).select().single();
      if (newResume) {
        window.history.replaceState(null, '', `?resume=${newResume.id}`);
      }
    }

    setSaving(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleDownload = () => {
    generateResumePDF(data, template, title);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Back</Button>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="font-semibold" placeholder="Resume Title" />
        </div>
        <div className="flex items-center gap-2">
          {savedMsg && <span className="text-sm text-green-600 dark:text-green-400 font-medium">Saved!</span>}
          <Button variant="outline" size="sm" onClick={handleDownload}><Download className="h-4 w-4" /> PDF</Button>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? <Spinner /> : <Save className="h-4 w-4" />}
            Save
          </Button>
        </div>
      </div>

      {/* Template selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {TEMPLATES.map((t) => {
          const colorMap: Record<string, string> = {
            teal: 'border-teal-500 bg-teal-50 text-teal-700',
            slate: 'border-slate-700 bg-slate-100 text-slate-800',
            gray: 'border-slate-500 bg-slate-50 text-slate-700',
            blue: 'border-blue-500 bg-blue-50 text-blue-700',
            rose: 'border-rose-500 bg-rose-50 text-rose-700',
            orange: 'border-orange-500 bg-orange-50 text-orange-700',
            emerald: 'border-emerald-500 bg-emerald-50 text-emerald-700',
            amber: 'border-amber-500 bg-amber-50 text-amber-700',
          };
          return (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`flex-shrink-0 rounded-lg border px-3.5 py-2 text-sm transition-all ${
                template === t.id
                  ? colorMap[t.color]
                  : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
              }`}
            >
              <span className="font-medium">{t.name}</span>
              <span className="text-xs text-slate-400 ml-1.5 hidden sm:inline">{t.desc}</span>
            </button>
          );
        })}
      </div>

      {/* View toggle */}
      <div className="flex gap-1 mb-4 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 w-fit">
        {(['edit', 'split', 'preview'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-all ${
              viewMode === mode ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {mode === 'edit' ? <Edit className="h-3.5 w-3.5 inline mr-1" /> : mode === 'preview' ? <Eye className="h-3.5 w-3.5 inline mr-1" /> : null}
            {mode}
          </button>
        ))}
      </div>

      <div className={`grid gap-6 ${viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className="space-y-4">
            {/* Section reordering */}
            <Card>
              <CardBody>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Section Order (drag to reorder)</h3>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={data.sectionOrder} strategy={verticalListSortingStrategy}>
                    <div className="space-y-1.5">
                      {data.sectionOrder.map((section) => (
                        <SortableSection key={section} id={section} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </CardBody>
            </Card>

            <ResumeEditor data={data} onChange={setData} />
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 text-center">Live Preview</div>
            <ResumePreview data={data} template={template} />
          </div>
        )}
      </div>
    </div>
  );
}

function SortableSection({ id }: { id: SectionType }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm cursor-grab hover:border-teal-300 dark:hover:border-teal-600 hover:bg-teal-50/30 dark:hover:bg-teal-900/20 transition-colors touch-none"
    >
      <GripVertical className="h-4 w-4 text-slate-300 dark:text-slate-500" />
      <span className="font-medium text-slate-700 dark:text-slate-200">{SECTION_LABELS[id]}</span>
    </div>
  );
}
