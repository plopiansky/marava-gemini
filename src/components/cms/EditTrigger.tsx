import React from 'react';
import { Edit3 } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { SiteContent } from '../../types/content';

interface EditTriggerProps {
  sectionKey: keyof SiteContent | 'leads' | 'settings';
  label?: string;
  className?: string;
}

export const EditTrigger: React.FC<EditTriggerProps> = ({
  sectionKey,
  label = 'עריכת מקטע',
  className = ''
}) => {
  const { isEditMode, openDrawer } = useCms();

  if (!isEditMode) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        openDrawer(sectionKey);
      }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 shadow-md hover:bg-amber-400 active:scale-95 transition-all z-20 cursor-pointer ${className}`}
      title={`ערוך את מקטע ${label}`}
    >
      <Edit3 className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
};
