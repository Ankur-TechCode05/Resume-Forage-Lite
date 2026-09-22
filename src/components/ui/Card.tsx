import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return <div className={`rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 shadow-sm ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = '' }: CardProps) {
  return <div className={`px-6 py-4 border-b border-slate-200 dark:border-slate-700 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }: CardProps) {
  return <div className={`px-6 py-5 ${className}`}>{children}</div>;
}

const badgeColors: Record<string, string> = {
  slate: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300',
};

export function Badge({ children, color = 'slate' }: { children: ReactNode; color?: string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColors[color] || badgeColors.slate}`}>{children}</span>;
}
