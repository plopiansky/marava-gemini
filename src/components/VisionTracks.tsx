import React from 'react';
import { BookOpen, Laptop, Music, Home, Check } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditTrigger } from './cms/EditTrigger';
import { VisionTrack } from '../types/content';

const iconMap = {
  torah: BookOpen,
  stem: Laptop,
  music: Music,
  campus: Home
};

export const VisionTracks: React.FC = () => {
  const { content } = useCms();
  const { vision } = content;

  return (
    <section id="vision" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 text-right">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              {vision.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-torah text-blue-950">
              {vision.title}
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              {vision.subtitle}
            </p>
          </div>
          <EditTrigger sectionKey="vision" label="עריכת עמודי התווך" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {vision.tracks.map((track) => {
            const Icon = iconMap[track.iconName] || BookOpen;

            return (
              <div
                key={track.id}
                className="bg-slate-50 hover:bg-white rounded-3xl p-7 border border-slate-200/80 hover:border-amber-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-100/80 text-blue-900 group-hover:bg-blue-950 group-hover:text-amber-400 flex items-center justify-center transition-colors shadow-xs mb-6">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-torah text-blue-950 group-hover:text-blue-900 transition-colors mb-3">
                    {track.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {track.description}
                  </p>
                </div>

                {/* Highlights list */}
                <div className="pt-4 border-t border-slate-200/60 space-y-2">
                  {track.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
