import React from 'react';
import { Award, CheckCircle2, Quote } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditTrigger } from './cms/EditTrigger';

export const About: React.FC = () => {
  const { content } = useCms();
  const { about } = content;

  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              {about.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-torah text-blue-950">
              {about.title}
            </h2>
          </div>
          <EditTrigger sectionKey="about" label="עריכת אודות הישיבה" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {about.paragraph1}
            </p>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {about.paragraph2}
            </p>

            {/* Quote Block */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-white border border-amber-200/80 shadow-xs">
              <Quote className="w-8 h-8 text-amber-400/40 absolute top-4 left-4 rotate-180" />
              <blockquote className="text-lg sm:text-xl font-torah font-bold text-blue-900 leading-relaxed">
                {about.quote}
              </blockquote>
              <div className="mt-3 text-xs sm:text-sm font-semibold text-amber-700">
                — {about.quoteAuthor}
              </div>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-4 pt-4">
              {about.bullets.map((bullet) => (
                <div key={bullet.id} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-800" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {bullet.title}
                    </h4>
                    <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                      {bullet.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Media / Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-5/4">
              <img
                src={about.imageUrl}
                alt="קמפוס ישיבת מערבא במתתיהו"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-blue-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">
                  קמפוס הישיבה
                </span>
                <span className="text-sm sm:text-base font-bold">
                  יישוב מתתיהו, מועצה אזורית מטה בנימין
                </span>
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-blue-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl border-2 border-amber-500/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-torah text-amber-400 leading-none">
                  {about.yearsBadgeNumber}+
                </div>
                <div className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                  {about.yearsBadgeLabel}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
