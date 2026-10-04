import React from 'react';
import { useCms } from '../context/CmsContext';
import { EditTrigger } from './cms/EditTrigger';

export const Staff: React.FC = () => {
  const { content } = useCms();
  const { staff } = content;

  return (
    <section id="staff" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 text-right">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              {staff.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-torah text-blue-950">
              {staff.title}
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              {staff.subtitle}
            </p>
          </div>
          <EditTrigger sectionKey="staff" label="עריכת צוות ורבנים" />
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {staff.members.map((member) => (
            <div
              key={member.id}
              className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 hover:border-amber-300 hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Image */}
              <div className="aspect-4/3 overflow-hidden bg-slate-200 relative">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Bio & Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-torah text-blue-950 group-hover:text-blue-900 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-amber-600 mt-1 mb-3">
                    {member.role}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>ישיבת מערבא</span>
                  <span>מתתיהו</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
