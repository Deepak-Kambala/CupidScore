import React from 'react';
import { X, Info, Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white mb-2 shadow-md shadow-rose-500/25">
            <Info className="w-6 h-6" />
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold">
            About CupidScore
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Understanding the math, chemistry, and romance behind your scores
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
          {/* Section 1 */}
          <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-slate-800/50 border border-rose-100 dark:border-rose-900/30 space-y-2">
            <h3 className="font-editorial font-bold text-lg text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>How the Calculation Works</span>
            </h3>
            <p>
              In Pythagorean numerology, every letter from A to Z carries an inherent vibrational frequency corresponding to numbers 1 through 9. When you calculate love compatibility, each name is reduced to its foundational root number or sacred Master Number (11, 22, 33).
            </p>
            <p>
              The composite resonance between both names produces an authentic, repeatable compatibility score reflecting communication, empathy, passion, and spiritual synergy.
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-800/50 border border-pink-100 dark:border-pink-900/30 space-y-2">
            <h3 className="font-editorial font-bold text-lg text-pink-700 dark:text-pink-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-pink-500" />
              <span>The Master Numbers (11, 22, 33)</span>
            </h3>
            <p>
              In numerology, Master Numbers represent intensified potential and profound twin-flame magnetism. When two individuals share master vibrations, the synergy reaches transcendental soulmate brackets.
            </p>
          </div>

          {/* Section 3 */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/50 border border-emerald-100 dark:border-emerald-900/30 space-y-2">
            <h3 className="font-editorial font-bold text-lg text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Client-Side & Private</span>
            </h3>
            <p>
              Your names, scores, letters, and memories never leave your browser. Everything runs purely locally on your device with zero tracking, zero accounts, and complete privacy.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

