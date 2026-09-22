import { useEffect, useState } from 'react';
import { FileText, Plus, Trash2, Edit3, Calendar, ScanSearch, Clock, TrendingUp, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Card, CardBody, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Resume } from '@/types/resume';

interface DashboardProps {
  onEditResume: (resume: Resume | null) => void;
  onNavigate: (page: string) => void;
}

export function Dashboard({ onEditResume, onNavigate }: DashboardProps) {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [analyses, setAnalyses] = useState<{ id: string; file_name: string; ats_score: number; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [{ data: resumeData }, { data: analysisData }] = await Promise.all([
        supabase.from('resumes').select('*').order('updated_at', { ascending: false }),
        supabase.from('analyses').select('id, file_name, ats_score, created_at').order('created_at', { ascending: false }).limit(5),
      ]);
      setResumes((resumeData || []) as Resume[]);
      setAnalyses(analysisData || []);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resume? This cannot be undone.')) return;
    await supabase.from('resumes').delete().eq('id', id);
    setResumes(resumes.filter((r) => r.id !== id));
  };

  const handleCreate = () => {
    onEditResume(null);
    onNavigate('builder');
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-teal-600 dark:border-slate-600 dark:border-t-teal-400" />
      </div>
    );
  }

  const avgScore = analyses.length > 0 ? Math.round(analyses.reduce((a, b) => a + b.ats_score, 0) / analyses.length) : null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-teal-500 dark:text-teal-400" />
          <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{user?.email}</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-700 via-emerald-600 to-blue-600 dark:from-teal-300 dark:via-emerald-300 dark:to-blue-300 bg-clip-text text-transparent">Welcome back</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your resumes and analyses in one place</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="border-teal-200 dark:border-teal-800/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 h-20 w-20 bg-teal-500/10 dark:bg-teal-500/20 rounded-full -translate-y-8 translate-x-8" />
          <CardBody className="flex items-center gap-3 relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-md shadow-teal-500/20"><FileText className="h-5 w-5" /></div>
            <div><p className="text-2xl font-bold text-slate-900 dark:text-white">{resumes.length}</p><p className="text-xs text-slate-500 dark:text-slate-400">Resumes Created</p></div>
          </CardBody>
        </Card>
        <Card className="border-blue-200 dark:border-blue-800/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 h-20 w-20 bg-blue-500/10 dark:bg-blue-500/20 rounded-full -translate-y-8 translate-x-8" />
          <CardBody className="flex items-center gap-3 relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md shadow-blue-500/20"><ScanSearch className="h-5 w-5" /></div>
            <div><p className="text-2xl font-bold text-slate-900 dark:text-white">{analyses.length}</p><p className="text-xs text-slate-500 dark:text-slate-400">Analyses Run</p></div>
          </CardBody>
        </Card>
        <Card className="border-emerald-200 dark:border-emerald-800/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 h-20 w-20 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full -translate-y-8 translate-x-8" />
          <CardBody className="flex items-center gap-3 relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-md shadow-emerald-500/20"><TrendingUp className="h-5 w-5" /></div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{avgScore ?? '--'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Avg ATS Score</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <button onClick={handleCreate} className="group relative overflow-hidden rounded-xl border border-teal-200 dark:border-teal-800/50 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-5 text-left transition-all hover:shadow-lg hover:shadow-teal-500/10">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white"><Plus className="h-5 w-5" /></div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Create New Resume</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 ml-13">Start building a professional resume</p>
          <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 text-teal-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
        <button onClick={() => onNavigate('analyzer')} className="group relative overflow-hidden rounded-xl border border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 p-5 text-left transition-all hover:shadow-lg hover:shadow-blue-500/10">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-sky-600 text-white"><Zap className="h-5 w-5" /></div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Analyze a Resume</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 ml-13">Get an ATS score and improvement tips</p>
          <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* Resumes section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Resumes</h2>
        <Button size="sm" onClick={handleCreate} className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"><Plus className="h-4 w-4" /> New Resume</Button>
      </div>

      {resumes.length === 0 ? (
        <Card><CardBody className="text-center py-16">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 mb-4">
            <FileText className="h-7 w-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">No resumes yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Create your first resume to get started</p>
          <Button onClick={handleCreate}><Plus className="h-4 w-4" /> Create Resume</Button>
        </CardBody></Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <Card key={resume.id} className="group hover:shadow-lg hover:shadow-teal-500/5 transition-all hover:border-teal-300 dark:hover:border-teal-700">
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => { onEditResume(resume); onNavigate('builder'); }}
                      className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-teal-600 dark:hover:bg-slate-700 dark:hover:text-teal-400"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="p-1.5 rounded-md text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1 truncate">{resume.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge color="teal">{resume.template}</Badge>
                  <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                    <Calendar className="h-3 w-3" />{formatDate(resume.updated_at)}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => { onEditResume(resume); onNavigate('builder'); }}>
                  <Edit3 className="h-3.5 w-3.5" /> Edit Resume
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Recent analyses */}
      {analyses.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mt-10 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" /> Recent Analyses
          </h2>
          <Card>
            <CardBody className="divide-y divide-slate-100 dark:divide-slate-700 p-0">
              {analyses.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 px-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <ScanSearch className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{a.file_name || 'Untitled Analysis'}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" />{formatDate(a.created_at)}</p>
                    </div>
                  </div>
                  <Badge color={a.ats_score >= 70 ? 'green' : a.ats_score >= 40 ? 'amber' : 'red'}>
                    ATS Score: {a.ats_score}
                  </Badge>
                </div>
              ))}
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
