import React from 'react';
import { useCms } from '../context/CmsContext';
import { CheckCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCms();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom duration-200"
    >
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/95 text-white text-xs sm:text-sm font-medium rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-md">
        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
