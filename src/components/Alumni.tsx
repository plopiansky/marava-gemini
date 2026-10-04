import React from 'react';
import { Quote } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditTrigger } from './cms/EditTrigger';

export const Alumni: React.FC = () => {
  const { content } = useCms();
  const { alumni } = content;

  return (
    <section id="alumni" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 text-right">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              {alumni.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-torah text-blue-950">
              {alumni.title}
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              {alumni.subtitle}
            </p>
          </div>
          <EditTrigger sectionKey="alumni" label="עריכת בוגרים מעידים" />
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {alumni.testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 hover:border-amber-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-amber-500/20 mb-4 group-hover:text-amber-500/30 transition-colors" />

              <blockquote className="text-slate-700 leading-relaxed font-normal text-sm sm:text-base italic mb-6">
                "{test.quote}"
              </blockquote>

              <div className="pt-4 border-t border-slate-200/70">
                <div className="font-bold font-torah text-lg text-blue-950">
                  {test.name}
                </div>
                <div className="text-xs font-bold text-amber-600 mt-0.5">
                  {test.graduationYear}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {test.currentRole}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
