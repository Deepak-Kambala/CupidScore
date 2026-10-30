import React from 'react';
import { X, Users, Sparkles, Heart, Shield, Compass, Flame } from 'lucide-react';
import {
  generatePersonalityProfile,
  calculatePersonalityCompatibility,
} from '../data/numerology';

export default function PersonalityModal({ isOpen, onClose, name1, name2, supportMaster }) {
  if (!isOpen) return null;

  const valid1 = name1 && name1.trim();
  const valid2 = name2 && name2.trim();

  const profile1 = valid1 ? generatePersonalityProfile(valid1, supportMaster) : null;
  const profile2 = valid2 ? generatePersonalityProfile(valid2, supportMaster) : null;

  const synergy = profile1 && profile2 ? calculatePersonalityCompatibility(profile1, profile2) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl my-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white mb-3 shadow-md shadow-rose-500/25">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold">
            Numerological Archetypes
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Understanding your core vibrations, romantic strengths, and love languages
          </p>
        </div>

        {valid1 && valid2 ? (
          <div className="space-y-6">
            {/* Compatibility Banner */}
            {synergy && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 dark:from-rose-950/40 dark:via-pink-950/30 dark:to-amber-950/20 border border-rose-200/80 dark:border-rose-900/40">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-rose-600 dark:text-rose-400">
                      {synergy.tag}
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-slate-800 dark:text-slate-100">
                      Archetype Synergy: {synergy.score}%
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      {synergy.message}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-rose-500 text-white font-bold text-base shadow-md shadow-rose-500/30">
                    {synergy.score}%
                  </div>
                </div>
              </div>
            )}

            {/* Profiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Partner 1 Card */}
              <div className="rounded-2xl p-5 bg-rose-50/40 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{profile1.icon}</div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-500">
                      {valid1} • Vibration #{profile1.numerologyNumber}
                    </span>
                    <h4 className="font-editorial text-xl font-bold">{profile1.name}</h4>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Key Personality Traits
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {profile1.traits.map((trait, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-lg font-medium bg-white dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 shadow-2xs border border-rose-100 dark:border-slate-600"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Love Style & Desires
                  </h5>
                  <p className="font-cormorant text-base text-slate-700 dark:text-slate-200 leading-relaxed italic">
                    "{profile1.loveStyle}"
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Romantic Strengths
                  </h5>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
                    {profile1.strengths.slice(0, 3).map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Partner 2 Card */}
              <div className="rounded-2xl p-5 bg-pink-50/40 dark:bg-slate-800/60 border border-pink-100 dark:border-rose-900/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{profile2.icon}</div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-pink-500">
                      {valid2} • Vibration #{profile2.numerologyNumber}
                    </span>
                    <h4 className="font-editorial text-xl font-bold">{profile2.name}</h4>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Key Personality Traits
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {profile2.traits.map((trait, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-lg font-medium bg-white dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 shadow-2xs border border-pink-100 dark:border-slate-600"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Love Style & Desires
                  </h5>
                  <p className="font-cormorant text-base text-slate-700 dark:text-slate-200 leading-relaxed italic">
                    "{profile2.loveStyle}"
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Romantic Strengths
                  </h5>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
                    {profile2.strengths.slice(0, 3).map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 px-4 rounded-2xl bg-rose-50/50 dark:bg-slate-800/40 border border-dashed border-rose-200 dark:border-slate-700">
            <Heart className="w-12 h-12 text-rose-300 mx-auto mb-3" />
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Please enter both names in the calculator to unlock your customized personality archetypes.
            </p>
          </div>
        )}

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

