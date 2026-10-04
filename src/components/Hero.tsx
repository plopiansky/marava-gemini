import React from 'react';
import { ArrowLeft, Sparkles, BookOpen, Calendar, MapPin, Award } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditTrigger } from './cms/EditTrigger';
import { MaaravaLogo } from './MaaravaLogo';

export const Hero: React.FC = () => {
  const { content } = useCms();
  const { hero, meta } = content;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-subtle-pattern text-white">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-950/90 via-blue-900/85 to-[#0b1c48] pointer-events-none" />

      {/* Decorative subtle ambient lights */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        
        {/* Emblem Crest in Hero */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative group mb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/95 rounded-3xl p-2.5 shadow-2xl border-2 border-amber-400/60 flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
              <MaaravaLogo size="lg" showText={false} />
            </div>
            <span className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
              מכון רובין
            </span>
          </div>

          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs sm:text-sm font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{hero.badge}</span>
          </div>
        </div>

        {/* Grand Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-torah leading-tight tracking-tight max-w-5xl mx-auto drop-shadow-sm">
          <span>{hero.heading}</span>
          <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-l from-amber-200 via-amber-400 to-amber-300 mr-2">
            {hero.highlightedText}
          </span>
        </h1>

        {/* Narrative Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-200/90 max-w-3xl mx-auto font-light leading-relaxed">
          {hero.description}
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all duration-200 shadow-lg hover:shadow-amber-500/25 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{hero.primaryCtaText}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo('about')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-base bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all duration-200 backdrop-blur-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>{hero.secondaryCtaText}</span>
          </button>
        </div>

        {/* Location & Heritage micro-bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300/80">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>יישוב מתתיהו, הרי ירושלים ומודיעין</span>
          </div>
          <span className="hidden sm:inline opacity-40">|</span>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>נוסד בשנת {meta.foundedYear}</span>
          </div>
          <span className="hidden sm:inline opacity-40">|</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{meta.registrationOpenText}</span>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-14 pt-10 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6 text-right">
          {hero.stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white/5 backdrop-blur-xs rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-black font-torah text-amber-400 leading-none">
                {stat.value}
              </div>
              <div className="mt-2 text-sm sm:text-base font-bold text-white">
                {stat.label}
              </div>
              {stat.subtext && (
                <div className="mt-1 text-xs text-slate-300 font-light">
                  {stat.subtext}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-10 sm:h-16 text-slate-50 fill-current"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};
