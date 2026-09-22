import { type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', id, ...props }: InputProps) {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>}
      <input
        id={inputId}
        className={`w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-900 dark:border-slate-600 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${className}`}
        {...props}
      />
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className = '', id, ...props }: TextareaProps) {
  const textareaId = id || props.name;
  return (
    <div className="w-full">
      {label && <label htmlFor={textareaId} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>}
      <textarea
        id={textareaId}
        className={`w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-900 dark:border-slate-600 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-y ${className}`}
        {...props}
      />
    </div>
  );
}
