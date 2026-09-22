import { useState } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { AuthPage } from '@/components/AuthPage';
import { Dashboard } from '@/components/Dashboard';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { ResumeAnalyzer } from '@/components/ResumeAnalyzer';
import { Spinner } from '@/components/ui/Button';
import type { Resume } from '@/types/resume';

function AppContent() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [editingResume, setEditingResume] = useState<Resume | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors">
        <Spinner className="text-3xl" />
      </div>
    );
  }

  if (!user) return <AuthPage />;

  const handleNavigate = (p: string) => {
    if (p !== 'builder') setEditingResume(null);
    setPage(p);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-orange-50/40 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 transition-colors">
      <Navbar currentPage={page} onNavigate={handleNavigate} />
      {page === 'dashboard' && <Dashboard onEditResume={setEditingResume} onNavigate={handleNavigate} />}
      {page === 'builder' && <ResumeBuilder editingResume={editingResume} onBack={() => handleNavigate('dashboard')} />}
      {page === 'analyzer' && <ResumeAnalyzer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
