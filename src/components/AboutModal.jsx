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
              <span>Vedic Sankhya Shastra & Panchangam Tattvas</span>
            </h3>
            <p>
              In traditional Hindu numerology (Sankhya Shastra) and Panchangam wisdom, every sound and letter carries an inherent vibrational resonance governed by the Navagrahas (Nine Celestial Planets) and the Pancha Mahabhutas (Five Elements):
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs opacity-90">
              <li><strong>Surya (Sun) & Mangala (Mars)</strong>: Agni Tattva (Fire) — Radiant courage and passionate vitality.</li>
              <li><strong>Chandra (Moon) & Shukra (Venus)</strong>: Jala Tattva (Water) — Pure empathy, romance, and nurturing love.</li>
              <li><strong>Budha (Mercury)</strong>: Prithvi Tattva (Earth) — Intellect, communication, and witty grounding.</li>
              <li><strong>Rahu & Shani (Saturn)</strong>: Vayu Tattva (Air) — Unconventional ambition and steadfast endurance.</li>
              <li><strong>Guru (Jupiter) & Ketu</strong>: Akasha Tattva (Ether) — Dharma, spiritual expansion, and soul wisdom.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-800/50 border border-pink-100 dark:border-pink-900/30 space-y-2">
            <h3 className="font-editorial font-bold text-lg text-pink-700 dark:text-pink-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-pink-500" />
              <span>Graha Maitri & Ashta Koota Compatibility</span>
            </h3>
            <p>
              Rather than generic arbitrary math, CupidScore computes authentic <em>Graha Maitri</em> (Planetary Friendship: Mitra, Sama, and Shatru) paired with elemental synergy to evaluate four classical compatibility dimensions:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-700/60 border border-rose-100 dark:border-slate-600">
                <strong>Manasika (Emotional)</strong>: Heart-to-heart empathy and mental harmony.
              </div>
              <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-700/60 border border-rose-100 dark:border-slate-600">
                <strong>Rati / Kama (Chemistry)</strong>: Electric passion and natural attraction.
              </div>
              <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-700/60 border border-rose-100 dark:border-slate-600">
                <strong>Buddhi (Mind Sync)</strong>: Shared values, intellect, and dharmic alignment.
              </div>
              <div className="p-2 rounded-lg bg-white/60 dark:bg-slate-700/60 border border-rose-100 dark:border-slate-600">
                <strong>Aayu (Longevity)</strong>: Lifelong resilience, loyalty, and enduring harmony.
              </div>
            </div>
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

