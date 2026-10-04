import React from 'react';
import { useCms } from '../context/CmsContext';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md', onClick }) => {
  const { content } = useCms();
  const { meta } = content;

  const isLight = variant === 'light';

  // Sizing definitions
  const badgeSize = {
    sm: 'w-10 h-10',
    md: 'w-13 h-13',
    lg: 'w-16 h-16',
  }[size];

  const textSizes = {
    sm: { title: 'text-base sm:text-lg', sub: 'text-[10px]', eng: 'text-[9px]' },
    md: { title: 'text-lg sm:text-xl', sub: 'text-xs', eng: 'text-[10px]' },
    lg: { title: 'text-2xl sm:text-3xl', sub: 'text-sm', eng: 'text-xs' },
  }[size];

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer group select-none transition-transform active:scale-95"
      title={`${meta.title} - ${meta.subtitle}`}
    >
      {/* Official Maarava Emblem SVG Badge */}
      <div
        className={`relative flex items-center justify-center rounded-2xl p-1 shrink-0 transition-all duration-300 shadow-sm ${badgeSize} ${
          isLight
            ? 'bg-white/95 border border-amber-400/40 shadow-white/5'
            : 'bg-white border border-amber-200/90 shadow-slate-200/50'
        }`}
      >
        <svg
          viewBox="0 0 200 210"
          className="w-full h-full object-contain"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="burgundyGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9b113e" />
              <stop offset="50%" stopColor="#800b30" />
              <stop offset="100%" stopColor="#630722" />
            </linearGradient>
            <linearGradient id="goldArchLogo" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ecc56c" />
              <stop offset="100%" stopColor="#c59231" />
            </linearGradient>
          </defs>

          {/* Arched Stone Doorway */}
          <path
            d="M 32 175 L 32 86 A 68 68 0 0 1 168 86 L 168 175 Z"
            fill="url(#goldArchLogo)"
            stroke="#a47128"
            strokeWidth="3.5"
          />

          {/* Inner Mosaic Background */}
          <path
            d="M 42 172 L 42 92 A 58 58 0 0 1 158 92 L 158 172 Z"
            fill="#fefcf8"
          />

          {/* Mosaic Tesserae */}
          <g opacity="0.95">
            {/* Top arch stones */}
            <rect x="74" y="42" width="11" height="9" fill="#c7923e" rx="1" />
            <rect x="88" y="38" width="12" height="9" fill="#2d6a4f" rx="1" />
            <rect x="103" y="38" width="11" height="9" fill="#b04a2f" rx="1" />
            <rect x="117" y="42" width="11" height="9" fill="#d4a373" rx="1" />

            <rect x="56" y="56" width="13" height="10" fill="#2d6a4f" rx="1" />
            <rect x="72" y="53" width="13" height="10" fill="#b04a2f" rx="1" />
            <rect x="117" y="53" width="13" height="10" fill="#2d6a4f" rx="1" />
            <rect x="133" y="56" width="13" height="10" fill="#c7923e" rx="1" />

            {/* Right column */}
            <rect x="45" y="74" width="15" height="11" fill="#c08552" rx="1" />
            <rect x="45" y="88" width="15" height="11" fill="#2d6a4f" rx="1" />
            <rect x="45" y="102" width="15" height="11" fill="#d4a373" rx="1" />
            <rect x="45" y="116" width="15" height="11" fill="#b04a2f" rx="1" />
            <rect x="45" y="130" width="15" height="11" fill="#2d6a4f" rx="1" />
            <rect x="45" y="144" width="15" height="11" fill="#c08552" rx="1" />
            <rect x="45" y="158" width="15" height="11" fill="#b04a2f" rx="1" />

            {/* Left column */}
            <rect x="140" y="74" width="15" height="11" fill="#2d6a4f" rx="1" />
            <rect x="140" y="88" width="15" height="11" fill="#b04a2f" rx="1" />
            <rect x="140" y="102" width="15" height="11" fill="#c7923e" rx="1" />
            <rect x="140" y="116" width="15" height="11" fill="#2d6a4f" rx="1" />
            <rect x="140" y="130" width="15" height="11" fill="#c08552" rx="1" />
            <rect x="140" y="144" width="15" height="11" fill="#b04a2f" rx="1" />
            <rect x="140" y="158" width="15" height="11" fill="#2d6a4f" rx="1" />
          </g>

          {/* White Portal Opening */}
          <path
            d="M 62 175 L 62 105 A 38 38 0 0 1 138 105 L 138 175 Z"
            fill="#ffffff"
          />

          {/* The Maarava Burgundy Flame / Figure Emblem */}
          <path
            d="M 100 46
               C 108 57, 116 73, 111 88
               C 109 94, 104 98, 100 101
               C 119 97, 140 108, 147 126
               C 154 144, 147 165, 128 175
               C 117 181, 106 177, 105 170
               C 104 163, 116 157, 122 148
               C 129 137, 126 123, 114 115
               C 108 111, 103 113, 100 117
               C 97 113, 92 111, 86 115
               C 74 123, 71 137, 78 148
               C 84 157, 96 163, 95 170
               C 94 177, 83 181, 72 175
               C 53 165, 46 144, 53 126
               C 60 108, 81 97, 100 101
               C 96 98, 91 94, 89 88
               C 84 73, 92 57, 100 46 Z"
            fill="url(#burgundyGradLogo)"
          />

          {/* Inner Flame Glow */}
          <path
            d="M 100 60
               C 103 70, 105 80, 101 90
               C 100 92, 98 92, 97 90
               C 95 80, 97 70, 100 60 Z"
            fill="#ffffff"
          />

          {/* Doorway sill */}
          <rect x="26" y="174" width="148" height="5" rx="2" fill="#c59231" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-right">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-torah font-black tracking-tight transition-colors ${textSizes.title} ${
              isLight ? 'text-white group-hover:text-amber-300' : 'text-rose-950 group-hover:text-rose-800'
            }`}
          >
            {meta.title}
          </span>
          <span className={`text-[10px] font-bold ${isLight ? 'text-amber-400' : 'text-rose-900/80'}`}>
            ע"ר
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-1 leading-tight">
          <span
            className={`font-serif font-bold tracking-wide ${textSizes.sub} ${
              isLight ? 'text-amber-300/90' : 'text-rose-900'
            }`}
          >
            Ma'arava
          </span>
          <span className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-slate-300'}`}>·</span>
          <span
            className={`font-serif tracking-wider ${textSizes.eng} ${
              isLight ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {meta.subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};
