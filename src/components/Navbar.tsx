import { FileText, LogOut, LayoutDashboard, FilePlus2, ScanSearch, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'builder', label: 'Resume Builder', icon: FilePlus2 },
    { id: 'analyzer', label: 'Resume Analyzer', icon: ScanSearch },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-teal-100 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => handleNav('dashboard')} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/30">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">ResumeForge</span>
            </button>
          </div>

          {user && (
            <>
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                        currentPage === item.id
                          ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Toggle theme"
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
                <span className="text-sm text-slate-500 dark:text-slate-400 max-w-[160px] truncate">{user.email}</span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>

              <div className="flex md:hidden items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
                <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)}>
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </>
          )}
        </div>

        {mobileOpen && user && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 w-full rounded-lg px-3.5 py-2.5 text-sm font-medium ${
                    currentPage === item.id ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between px-3.5">
              <span className="text-sm text-slate-500 dark:text-slate-400 truncate">{user.email}</span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
