import React from 'react';

/**
 * Romantic Cupid Logo with bow & heart arrow
 * @param {Object} props
 * @param {number} [props.size=40] - Size in pixels
 * @param {string} [props.className] - Additional CSS classes
 * @param {'badge' | 'icon' | 'seal'} [props.variant='badge'] - Display style
 * @param {boolean} [props.animated=true] - Gentle pulse or shimmer
 */
export default function CupidLogo({
  size = 40,
  className = '',
  variant = 'badge',
  animated = true,
}) {
  const isBadge = variant === 'badge';
  const isSeal = variant === 'seal';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${
        isBadge
          ? 'rounded-2xl p-1.5 bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-400 text-white shadow-md shadow-rose-500/25 ring-1 ring-white/20'
          : isSeal
          ? 'rounded-full p-2 bg-gradient-to-tr from-amber-700 via-rose-800 to-amber-900 text-amber-200 shadow-lg border border-amber-400/40'
          : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full drop-shadow-xs ${animated ? 'transition-transform duration-300 group-hover:scale-105' : ''}`}
      >
        <defs>
          <linearGradient id="cupidWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff5f5" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>
          <linearGradient id="cupidBowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="cupidHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
        </defs>

        {/* Back Wing */}
        <path
          d="M34 44 C29 35 23 30 16 31 C14 36 17 42 23 45 C19 45 16 48 17 51 C19 53 24 53 29 50 Z"
          fill="#fecdd3"
          opacity="0.85"
        />

        {/* Front Wing with elegant feather arcs */}
        <path
          d="M37 46 C34 33 26 23 17 22 C15 29 19 37 26 42 C21 43 18 47 20 52 C23 55 30 54 35 50 Z"
          fill="url(#cupidWingGrad)"
        />

        {/* Trailing Legs in graceful flight */}
        <path
          d="M37 60 C33 66 29 72 24 77 C22 79 19 78 21 75 C24 70 27 66 30 61 C27 64 23 68 19 71 C17 73 16 71 17 69 C20 65 24 59 31 55"
          fill="#ffe4e6"
        />

        {/* Body, Hip & Shoulders */}
        <path
          d="M33 50 C32 55 33 60 37 63 C41 63 44 59 46 54 C46 50 42 46 37 47 Z"
          fill="#ffffff"
        />

        {/* Head */}
        <circle cx="42" cy="40" r="6" fill="#ffffff" />

        {/* Classical Golden Hair Curls */}
        <path
          d="M37 38 C36 33 39 31 43 31 C47 31 49 34 48 37 C46 36 44 37 43 39 C40 37 38 38 37 38 Z"
          fill="#fef08a"
        />

        {/* Front Arm reaching to hold bow */}
        <path
          d="M43 47 C48 46 53 45 58 44 C60 44 61 46 59 48 C55 50 49 51 44 50 Z"
          fill="#ffffff"
        />

        {/* Rear Arm pulling the bowstring */}
        <path
          d="M39 48 C41 50 43 51 45 52 C44 54 42 55 40 53 C38 52 37 50 39 48 Z"
          fill="#ffe4e6"
        />

        {/* The Golden Recurve Bow */}
        <path
          d="M68 23 C66 31 63 39 60 46 C57 53 54 62 52 70"
          stroke="url(#cupidBowGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M68 23 C69 21 71 21 72 23"
          stroke="url(#cupidBowGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M52 70 C51 72 49 72 48 70"
          stroke="url(#cupidBowGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Bowstring tautly drawn to hand at (45, 52) */}
        <path
          d="M68 23 L45 52 L52 70"
          stroke="#ffffff"
          strokeOpacity="0.85"
          strokeWidth="1"
        />

        {/* Arrow Shaft (aimed at top-right heart) */}
        <line
          x1="42"
          y1="55"
          x2="78"
          y2="28"
          stroke="url(#cupidBowGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Arrow Fletching / Feathers */}
        <path
          d="M41 56 L37 58 M42 54 L39 54 M44 57 L42 60"
          stroke="#fed7aa"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Heart Arrowhead */}
        <g transform="translate(78, 28) rotate(50)">
          <path
            d="M0 -1 C -2.5 -4.5, -6.5 -2.5, -6.5 2 C -6.5 6.5, 0 11, 0 11 C 0 11, 6.5 6.5, 6.5 2 C 6.5 -2.5, 2.5 -4.5, 0 -1 Z"
            fill="url(#cupidHeartGrad)"
            stroke="#ffffff"
            strokeWidth="0.8"
          />
        </g>

        {/* Sparkle star at arrow tip */}
        <g transform="translate(83, 23)">
          <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Subtle celestial stars */}
        <circle cx="76" cy="68" r="1" fill="#fde047" opacity="0.8" />
        <circle cx="24" cy="27" r="1" fill="#fde047" opacity="0.8" />
      </svg>
    </div>
  );
}
