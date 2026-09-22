import { useState } from 'react';
import { FileText, Mail, Lock, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button, Spinner } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function AuthPage() {
  const { signIn, signUp } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = mode === 'signup' ? await signUp(email, password) : await signIn(email, password);

    if (result.error) setError(result.error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-emerald-50 to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-teal-900/30 px-4 transition-colors relative">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-700/60 transition-colors"
        title="Toggle theme"
      >
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xl shadow-teal-500/30 mb-4">
            <FileText className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 dark:from-teal-300 dark:to-emerald-300 bg-clip-text text-transparent">ResumeForge</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Build, analyze, and optimize your resume</p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-xl">
          <div className="flex gap-2 mb-6 rounded-lg bg-slate-100 dark:bg-slate-900 p-1">
            <button
              onClick={() => { setMode('signup'); setError(null); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${mode === 'signup' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Sign Up
            </button>
            <button
              onClick={() => { setMode('signin'); setError(null); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${mode === 'signin' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-9 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none z-10" />
              <Input
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-9 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none z-10" />
              <Input
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                className="pl-10"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700" disabled={loading}>
              {loading ? <Spinner /> : mode === 'signup' ? (
                <>
                  <User className="h-4 w-4" />
                  Create Account
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
            {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError(null); }}
              className="text-teal-600 dark:text-teal-400 font-medium hover:underline"
            >
              {mode === 'signup' ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
