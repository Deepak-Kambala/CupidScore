import React from 'react';
import cupidImg from '../assets/cupid_pink.png';

/**
 * Romantic Animated Cupid Logo
 * Features the 3D Cherub Cupid with golden bow & arrow, pinkish romantic aura,
 * angelic floating motion, and sparkling love arrow animation.
 *
 * @param {Object} props
 * @param {number} [props.size=46] - Base size in pixels
 * @param {string} [props.className] - Additional Tailwind classes
 * @param {'badge' | 'avatar' | 'icon' | 'seal'} [props.variant='badge'] - Visual container
 * @param {boolean} [props.animated=true] - Whether float and glow animations are enabled
 */
export default function CupidLogo({
  size = 46,
  className = '',
  variant = 'badge',
  animated = true,
}) {
  const isBadge = variant === 'badge';
  const isSeal = variant === 'seal';
  const isIcon = variant === 'icon' || variant === 'avatar';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${
        isBadge
          ? 'rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-400 to-rose-300 dark:from-rose-950 dark:via-pink-950 dark:to-rose-900 p-1 shadow-md shadow-pink-500/25 ring-1 ring-pink-300/50 dark:ring-pink-500/30 group-hover:shadow-pink-500/40 group-hover:scale-105 transition-all duration-300'
          : isSeal
          ? 'rounded-full bg-gradient-to-tr from-amber-700 via-rose-800 to-amber-900 p-1.5 shadow-lg shadow-rose-950/40 ring-1 ring-amber-400/50'
          : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 1. Pulsing Pink Romantic Aura (Backlight) */}
      {animated && (
        <div
          className="absolute inset-0 rounded-full bg-radial from-pink-400/40 via-rose-400/20 to-transparent blur-xs pointer-events-none animate-pink-halo"
          aria-hidden="true"
        />
      )}

      {/* 2. Floating 3D Cherub Cupid */}
      <div
        className={`relative w-full h-full flex items-center justify-center ${
          animated ? 'animate-cupid-float' : ''
        }`}
      >
        <img
          src={cupidImg}
          alt="Cupid with Bow and Arrow"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(244,63,94,0.35)]"
          loading="eager"
        />

        {/* 3. Gleaming Star Sparkle at Arrow Tip */}
        {animated && (
          <div
            className="absolute top-[18%] right-[8%] pointer-events-none animate-arrow-gleam"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 text-amber-200 fill-amber-100 drop-shadow-[0_0_4px_rgba(251,191,36,0.9)]"
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
            </svg>
          </div>
        )}

        {/* 4. Drifting Floating Mini Love Heart */}
        {animated && (
          <div
            className="absolute top-[22%] right-[12%] pointer-events-none animate-float-heart"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-2.5 h-2.5 text-pink-300 fill-pink-400/90 drop-shadow-[0_0_3px_rgba(244,63,94,0.8)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}