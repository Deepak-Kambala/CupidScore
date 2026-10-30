import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  RotateCcw,
  Download,
  Users,
  Music,
  Zap,
  Activity,
  MessageCircleHeart,
  ShieldCheck,
} from 'lucide-react';
import {
  isValidName,
  nameToNumber,
  combineNumbers,
  mapToPercent,
  getScoreDetails,
} from '../data/numerology';
import { playRomanticChime, playHeartbeat } from '../utils/sound';

export default function LoveCalculatorCard({
  name1,
  setName1,
  name2,
  setName2,
  result,
  setResult,
  supportMaster,
  setSupportMaster,
  allowJitter,
  setAllowJitter,
  onCalculate,
  onReset,
  onOpenShareCard,
  onOpenPersonality,
  onOpenSong,
  soundEnabled,
}) {
  const [displayPercent, setDisplayPercent] = useState(result ? result.percent : 0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  // Smooth number counting animation when result changes
  useEffect(() => {
    if (!result) {
      setDisplayPercent(0);
      return;
    }

    let start = 0;
    const end = result.percent;
    const duration = 1100;
    const startTime = performance.now();

    const animateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(start + (end - start) * easeOut);
      setDisplayPercent(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [result]);

  const handleCalculateSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const clean1 = name1.trim();
    const clean2 = name2.trim();

    if (!clean1 || !clean2) {
      setErrorMsg('Please enter both lovely names to calculate love ✨');
      return;
    }

    if (!isValidName(clean1) || !isValidName(clean2)) {
      setErrorMsg('Please use letters, spaces, or hyphens for names 💕');
      return;
    }

    setIsCalculating(true);
    playHeartbeat(soundEnabled);

    setTimeout(() => {
      const num1 = nameToNumber(clean1, supportMaster);
      const num2 = nameToNumber(clean2, supportMaster);
      const combined = combineNumbers(num1, num2, supportMaster);
      let calculatedPercent = mapToPercent(combined, num1, num2);

      if (allowJitter) {
        const jitter = Math.floor(Math.random() * 11) - 5;
        calculatedPercent = Math.max(15, Math.min(100, calculatedPercent + jitter));
      }

      const details = getScoreDetails(calculatedPercent);

      // Authentic 4-pillar compatibility calculations based on sub-harmonies
      const emotionalResonance = Math.min(100, Math.max(20, calculatedPercent + ((num1 * 3) % 11) - 5));
      const electricChemistry = Math.min(100, Math.max(25, calculatedPercent + ((num2 * 4) % 13) - 6));
      const intellectualFlow = Math.min(100, Math.max(20, calculatedPercent + (((num1 + num2) * 2) % 9) - 4));
      const enduringHarmony = Math.min(100, Math.max(30, calculatedPercent + ((combined * 5) % 11) - 5));

      const newResult = {
        name1: clean1,
        name2: clean2,
        percent: calculatedPercent,
        num1,
        num2,
        combined,
        details,
        pillars: {
          emotional: emotionalResonance,
          chemistry: electricChemistry,
          intellectual: intellectualFlow,
          enduring: enduringHarmony,
        },
        date: new Date().toISOString(),
      };

      setResult(newResult);
      setIsCalculating(false);
      onCalculate(newResult);
      playRomanticChime(soundEnabled);
    }, 450);
  };

  // SVG circular gauge math
  const radius = 66;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayPercent / 100) * circumference;

  return (
    <div className="relative w-full max-w-4xl mx-auto backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl shadow-rose-900/5 border border-rose-200/70 dark:border-rose-950/50 transition-all duration-300">
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Calculate Your <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">Love Synergy</span>
        </h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          Where ancient mathematical vibrations unlock romantic destiny. Enter two names to uncover your soul sync, electric chemistry, and relationship harmony.
        </p>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleCalculateSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-3 sm:gap-4 items-center">
          {/* Partner 1 Input */}
          <div className="md:col-span-5 relative group">
            <label
              htmlFor="name1"
              className="block text-[11px] font-bold uppercase tracking-wider text-rose-800/80 dark:text-rose-300/80 mb-1.5"
            >
              Your Name
            </label>
            <div className="relative">
              <input
                id="name1"
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="e.g. Romeo"
                maxLength={40}
                className="w-full px-4 py-3 sm:py-3.5 pl-11 rounded-2xl bg-rose-50/50 dark:bg-slate-800/70 border border-rose-200 dark:border-rose-900/40 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/70 focus:border-rose-500 transition-all font-medium text-sm sm:text-base shadow-2xs"
              />
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>
          </div>

          {/* Interlocking Symbol */}
          <div className="md:col-span-1 flex justify-center py-1 md:py-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-500/25">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current animate-pulse" />
            </div>
          </div>

          {/* Partner 2 Input */}
          <div className="md:col-span-5 relative group">
            <label
              htmlFor="name2"
              className="block text-[11px] font-bold uppercase tracking-wider text-rose-800/80 dark:text-rose-300/80 mb-1.5"
            >
              Crush / Partner's Name
            </label>
            <div className="relative">
              <input
                id="name2"
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="e.g. Juliet"
                maxLength={40}
                className="w-full px-4 py-3 sm:py-3.5 pl-11 rounded-2xl bg-rose-50/50 dark:bg-slate-800/70 border border-rose-200 dark:border-rose-900/40 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/70 focus:border-rose-500 transition-all font-medium text-sm sm:text-base shadow-2xs"
              />
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="p-3 text-center text-xs font-medium text-rose-700 bg-rose-100/90 dark:bg-rose-950/70 dark:text-rose-300 rounded-xl border border-rose-200 dark:border-rose-900 animate-shake">
            {errorMsg}
          </div>
        )}

        {/* Advanced Options Checkboxes */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1 text-xs font-medium text-slate-600 dark:text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer hover:text-rose-600 transition-colors">
            <input
              type="checkbox"
              checked={supportMaster}
              onChange={(e) => setSupportMaster(e.target.checked)}
              className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-rose-300"
            />
            <span>Support Master Numbers (11, 22, 33)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-rose-600 transition-colors">
            <input
              type="checkbox"
              checked={allowJitter}
              onChange={(e) => setAllowJitter(e.target.checked)}
              className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-rose-300"
            />
            <span>Allow small surprise (±5%)</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
          <button
            type="submit"
            disabled={isCalculating}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white text-xs sm:text-sm bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-600 active:scale-95 shadow-lg shadow-rose-500/30 transition-all cursor-pointer min-h-[46px] min-w-[200px]"
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 fill-current ${isCalculating ? 'animate-spin' : 'animate-bounce'}`} />
            <span>{isCalculating ? 'Consulting the Stars...' : 'Calculate Love ❤️'}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer border border-slate-200 dark:border-slate-700 min-h-[46px]"
            title="Reset names"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset</span>
          </button>
        </div>
      </form>

      {/* Result Section */}
      <div className="mt-8 pt-6 sm:pt-8 border-t border-rose-100 dark:border-rose-950/60">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 justify-center">
          {/* Circular Progress Gauge */}
          <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 select-none shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-rose-100 dark:text-slate-800"
                strokeWidth="11"
                stroke="currentColor"
                fill="transparent"
              />
              <defs>
                <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>
              </defs>
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#roseGradient)"
                strokeWidth="11"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(244, 63, 94, 0.35))' }}
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-editorial text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {result ? `${displayPercent}%` : '--%'}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-rose-500 dark:text-rose-400 uppercase tracking-widest mt-0.5">
                {result ? result.details.emoji + ' ' + result.details.tier : 'Awaiting Names'}
              </span>
            </div>
          </div>

          {/* Result Details */}
          <div className="text-center md:text-left flex-1 max-w-lg">
            {result ? (
              <div className="space-y-3.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50">
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                  <span>{result.details.badge}</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {result.name1} & {result.name2}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light font-cormorant italic text-base">
                  "{result.details.summary}"
                </p>

                {/* 4-Pillar Synergy Breakdown */}
                {result.pillars && (
                  <div className="grid grid-cols-2 gap-2 pt-1 text-left">
                    <div className="p-2 rounded-xl bg-rose-50/60 dark:bg-slate-800/50 border border-rose-100/70 dark:border-rose-900/30">
                      <div className="flex justify-between items-center text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                        <span className="flex items-center gap-1">💖 Emotional</span>
                        <span className="font-bold text-rose-600">{result.pillars.emotional}%</span>
                      </div>
                      <div className="w-full bg-rose-200/50 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${result.pillars.emotional}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-pink-50/60 dark:bg-slate-800/50 border border-pink-100/70 dark:border-pink-900/30">
                      <div className="flex justify-between items-center text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                        <span className="flex items-center gap-1">🔥 Chemistry</span>
                        <span className="font-bold text-pink-600">{result.pillars.chemistry}%</span>
                      </div>
                      <div className="w-full bg-pink-200/50 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-pink-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${result.pillars.chemistry}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-amber-50/60 dark:bg-slate-800/50 border border-amber-100/70 dark:border-amber-900/30">
                      <div className="flex justify-between items-center text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                        <span className="flex items-center gap-1">💬 Mind Sync</span>
                        <span className="font-bold text-amber-600">{result.pillars.intellectual}%</span>
                      </div>
                      <div className="w-full bg-amber-200/50 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${result.pillars.intellectual}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-purple-50/60 dark:bg-slate-800/50 border border-purple-100/70 dark:border-purple-900/30">
                      <div className="flex justify-between items-center text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                        <span className="flex items-center gap-1">🌿 Longevity</span>
                        <span className="font-bold text-purple-600">{result.pillars.enduring}%</span>
                      </div>
                      <div className="w-full bg-purple-200/50 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${result.pillars.enduring}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick actions for result */}
                <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                  <button
                    onClick={onOpenShareCard}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 active:scale-95 shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Love Card</span>
                  </button>

                  <button
                    onClick={onOpenPersonality}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 bg-rose-50 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-slate-700 active:scale-95 transition-all border border-rose-200/60 dark:border-slate-700"
                  >
                    <Users className="w-3.5 h-3.5 text-rose-500" />
                    <span>Archetypes</span>
                  </button>

                  <button
                    onClick={onOpenSong}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 bg-rose-50 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-slate-700 active:scale-95 transition-all border border-rose-200/60 dark:border-slate-700"
                  >
                    <Music className="w-3.5 h-3.5 text-pink-500" />
                    <span>Love Song</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="font-editorial text-xl font-bold text-slate-800 dark:text-slate-200">
                  Ready to test your chemistry?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  Type your names above or tap a legendary pair to see Pythagorean numerology in action:
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 justify-center md:justify-start">
                  <button
                    type="button"
                    onClick={() => {
                      setName1('Romeo');
                      setName2('Juliet');
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 border border-rose-200/60 dark:border-rose-900/40 cursor-pointer"
                  >
                    ❤️ Romeo & Juliet
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setName1('Elizabeth');
                      setName2('Darcy');
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 border border-rose-200/60 dark:border-rose-900/40 cursor-pointer"
                  >
                    👑 Elizabeth & Darcy
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setName1('Lancelot');
                      setName2('Guinevere');
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 border border-rose-200/60 dark:border-rose-900/40 cursor-pointer"
                  >
                    🏰 Lancelot & Guinevere
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
