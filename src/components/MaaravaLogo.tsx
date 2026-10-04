import React from 'react';

interface MaaravaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const MaaravaLogo: React.FC<MaaravaLogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  // Dimensions based on size
  const dim = {
    sm: { w: 38, h: 38, fontHeb: 'text-sm', fontEng: 'text-[10px]' },
    md: { w: 52, h: 52, fontHeb: 'text-lg', fontEng: 'text-xs' },
    lg: { w: 72, h: 72, fontHeb: 'text-2xl', fontEng: 'text-sm' },
    xl: { w: 110, h: 110, fontHeb: 'text-3xl', fontEng: 'text-base' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Maarava Arched Mosaic & Flame Emblem */}
      <svg
        width={dim.w}
        height={dim.h}
        viewBox="0 0 200 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform group-hover:scale-105 duration-300"
      >
        <defs>
          {/* Mosaic pattern of stones */}
          <pattern id="mosaicStones" x="0" y="0" width="16" height="12" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="7" height="5" fill="#c08552" rx="0.5" />
            <rect x="8" y="0" width="7" height="5" fill="#2d6a4f" rx="0.5" />
            <rect x="0" y="6" width="7" height="5" fill="#dda15e" rx="0.5" />
            <rect x="8" y="6" width="7" height="5" fill="#bc6c25" rx="0.5" />
          </pattern>
          {/* Burgundy gradient */}
          <linearGradient id="burgundyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b113e" />
            <stop offset="50%" stopColor="#800b30" />
            <stop offset="100%" stopColor="#630722" />
          </linearGradient>
          {/* Gold arch gradient */}
          <linearGradient id="goldArch" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e9c46a" />
            <stop offset="100%" stopColor="#cb993e" />
          </linearGradient>
        </defs>

        {/* 1. Arched Doorway Border (Jerusalem Stone) */}
        <path
          d="M 35 175 L 35 88 A 65 65 0 0 1 165 88 L 165 175 Z"
          fill="url(#goldArch)"
          stroke="#a47128"
          strokeWidth="3"
        />

        {/* 2. Inner Mosaic Field */}
        <path
          d="M 44 172 L 44 92 A 56 56 0 0 1 156 92 L 156 172 Z"
          fill="#fbf5ee"
        />
        {/* Colorful mosaic tile blocks */}
        <g opacity="0.92">
          {/* Row 1 under arch */}
          <rect x="75" y="44" width="10" height="9" fill="#c7923e" rx="1" />
          <rect x="88" y="40" width="11" height="9" fill="#2d6a4f" rx="1" />
          <rect x="102" y="40" width="10" height="9" fill="#b04a2f" rx="1" />
          <rect x="115" y="44" width="10" height="9" fill="#d4a373" rx="1" />

          {/* Row 2 */}
          <rect x="58" y="58" width="12" height="9" fill="#2d6a4f" rx="1" />
          <rect x="73" y="55" width="12" height="9" fill="#b04a2f" rx="1" />
          <rect x="115" y="55" width="12" height="9" fill="#2d6a4f" rx="1" />
          <rect x="130" y="58" width="12" height="9" fill="#c7923e" rx="1" />

          {/* Side columns */}
          <rect x="47" y="75" width="14" height="10" fill="#c08552" rx="1" />
          <rect x="47" y="88" width="14" height="10" fill="#2d6a4f" rx="1" />
          <rect x="47" y="101" width="14" height="10" fill="#d4a373" rx="1" />
          <rect x="47" y="114" width="14" height="10" fill="#a03e28" rx="1" />
          <rect x="47" y="127" width="14" height="10" fill="#2d6a4f" rx="1" />
          <rect x="47" y="140" width="14" height="10" fill="#c08552" rx="1" />
          <rect x="47" y="153" width="14" height="10" fill="#b04a2f" rx="1" />

          <rect x="139" y="75" width="14" height="10" fill="#2d6a4f" rx="1" />
          <rect x="139" y="88" width="14" height="10" fill="#b04a2f" rx="1" />
          <rect x="139" y="101" width="14" height="10" fill="#c7923e" rx="1" />
          <rect x="139" y="114" width="14" height="10" fill="#2d6a4f" rx="1" />
          <rect x="139" y="127" width="14" height="10" fill="#c08552" rx="1" />
          <rect x="139" y="140" width="14" height="10" fill="#b04a2f" rx="1" />
          <rect x="139" y="153" width="14" height="10" fill="#2d6a4f" rx="1" />
        </g>

        {/* 3. Central White Portal Gateway */}
        <path
          d="M 64 175 L 64 105 A 36 36 0 0 1 136 105 L 136 175 Z"
          fill="#ffffff"
          stroke="#f2e9dc"
          strokeWidth="1.5"
        />

        {/* 4. The Iconic Maarava Burgundy Flame / Figure Emblem */}
        {/* Outer curved wings of the flame forming heart/candlestick */}
        <path
          d="M 100 48
             C 107 58, 114 74, 110 88
             C 108 94, 104 98, 100 101
             C 118 97, 138 108, 145 125
             C 152 142, 146 163, 128 174
             C 117 181, 105 178, 104 171
             C 103 164, 115 158, 121 149
             C 128 138, 126 124, 114 116
             C 108 112, 103 113, 100 117
             C 97 113, 92 112, 86 116
             C 74 124, 72 138, 79 149
             C 85 158, 97 164, 96 171
             C 95 178, 83 181, 72 174
             C 54 163, 48 142, 55 125
             C 62 108, 82 97, 100 101
             C 96 98, 92 94, 90 88
             C 86 74, 93 58, 100 48 Z"
          fill="url(#burgundyGrad)"
        />

        {/* Inner flame core & teardrop negative space */}
        <path
          d="M 100 62
             C 103 72, 105 82, 101 91
             C 100 93, 98 94, 97 92
             C 95 82, 97 72, 100 62 Z"
          fill="#ffffff"
          opacity="0.9"
        />

        {/* Base foundation line */}
        <rect x="30" y="174" width="140" height="4" rx="2" fill="#cb993e" />
      </svg>

      {/* Typography from Official Logo */}
      {showText && (
        <div className="flex flex-col text-right">
          <div className="flex items-baseline gap-1.5">
            <span className={`font-torah font-black text-rose-950 tracking-tight leading-none ${dim.fontHeb}`}>
              מערבא
            </span>
            <span className="text-[10px] font-bold text-rose-900/80">ע"ר</span>
          </div>

          <div className="flex flex-col mt-0.5 leading-tight">
            <span className={`font-serif font-bold text-rose-900 tracking-wide ${dim.fontEng}`}>
              Ma'arava
            </span>
            <span className="text-[9px] sm:text-[10px] font-serif text-slate-600 tracking-wider">
              Machon Rubin
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
