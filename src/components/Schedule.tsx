import React, { useState } from 'react';
import { Clock, BookOpen, GraduationCap, Coffee, Music, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditTrigger } from './cms/EditTrigger';
import { ScheduleItem } from '../types/content';

export const Schedule: React.FC = () => {
  const { content } = useCms();
  const { schedule } = content;
  const [activeFilter, setActiveFilter] = useState<'all' | ScheduleItem['category']>('all');

  const filterButtons: Array<{ key: 'all' | ScheduleItem['category']; label: string }> = [
    { key: 'all', label: 'כל סדר היום' },
    { key: 'kodesh', label: 'לימודי קודש ותפילה' },
    { key: 'chol', label: 'לימודי חול ובגרות' },
    { key: 'break', label: 'ארוחות ומנוחה' },
    { key: 'activities', label: 'פנאי, מוזיקה וספורט' },
  ];

  const filteredItems = activeFilter === 'all'
    ? schedule.items
    : schedule.items.filter(item => item.category === activeFilter);

  const getCategoryBadge = (cat: ScheduleItem['category']) => {
    switch (cat) {
      case 'kodesh':
        return { label: 'קודש', bg: 'bg-blue-50 text-blue-900 border-blue-200' };
      case 'chol':
        return { label: 'בגרות ומדעים', bg: 'bg-amber-50 text-amber-900 border-amber-200' };
      case 'break':
        return { label: 'ארוחה ומנוחה', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'activities':
        return { label: 'הווי ומוזיקה', bg: 'bg-emerald-50 text-emerald-900 border-emerald-200' };
    }
  };

  return (
    <section id="schedule" className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden bg-subtle-pattern">
      <div className="absolute inset-0 bg-blue-950/95 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
              {schedule.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-torah text-white">
              {schedule.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl font-light">
              {schedule.description}
            </p>
          </div>
          <EditTrigger sectionKey="schedule" label="עריכת סדר היום" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 mb-10 w-fit">
          {filterButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setActiveFilter(btn.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === btn.key
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Timeline Container */}
        <div className="relative pr-6 sm:pr-8 border-r-2 border-amber-500/30 space-y-8">
          {filteredItems.map((item, index) => {
            const badge = getCategoryBadge(item.category);

            return (
              <div
                key={item.id}
                className="relative group transition-transform duration-200 hover:-translate-x-1"
              >
                {/* Timeline node */}
                <div
                  className={`absolute -right-[31px] sm:-right-[39px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-4 border-slate-950 transition-all ${
                    item.highlight
                      ? 'bg-amber-400 scale-125 ring-4 ring-amber-400/20'
                      : 'bg-blue-400 group-hover:bg-amber-400'
                  }`}
                />

                {/* Card */}
                <div
                  className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                    item.highlight
                      ? 'bg-white/10 backdrop-blur-sm border-amber-500/40 shadow-lg'
                      : 'bg-slate-800/60 backdrop-blur-xs border-slate-700/60 hover:bg-slate-800/90'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    {/* Time */}
                    <div className="flex items-center gap-2 font-mono text-sm sm:text-base font-bold text-amber-300">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span dir="ltr">{item.startTime} - {item.endTime}</span>
                    </div>

                    {/* Category Label (clean metadata style) */}
                    <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-torah text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center text-xs text-slate-400 bg-white/5 p-4 rounded-xl border border-white/10">
          <span>* סדר היום עשוי להתעדכן לפי עונות השנה (שעון חורף/קיץ) וימי שישי וערבי שבת קודש.</span>
        </div>

      </div>
    </section>
  );
};
