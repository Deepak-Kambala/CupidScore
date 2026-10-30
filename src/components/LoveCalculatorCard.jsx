import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
  RotateCcw,
  Share2,
  Download,
  Users,
  Music,
  Mail,
  Disc,
  Info,
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
  onOpenLetter,
  onOpenSpinner,
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
    const duration = 1200; // ms
    const startTime = performance.now();

    const animateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
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
      setErrorMsg('Please enter both lovely names to reveal your chemistry ✨');
      return;
    }

    if (!isValidName(clean1) || !isValidName(clean2)) {
      setErrorMsg('Please use letters, spaces, or hyphens for names 💕');
      return;
    }

    setIsCalculating(true);
    playHeartbeat(soundEnabled);

    // Short romantic tension delay
    setTimeout(() => {
      const num1 = nameToNumber(clean1, supportMaster);
      const num2 = nameToNumber(clean2, supportMaster);
      const combined = combineNumbers(num1, num2, supportMaster);
      let calculatedPercent = mapToPercent(combined, num1, num2);

      if (allowJitter) {
        const jitter = Math.floor(Math.random() * 11) - 5; // -5 to +5
        calculatedPercent = Math.max(12, Math.min(100, calculatedPercent + jitter));
      }

      const details = getScoreDetails(calculatedPercent);

      const newResult = {
        name1: clean1,
        name2: clean2,
        percent: calculatedPercent,
        num1,
        num2,
        combined,
        details,
        date: new Date().toISOString(),
      };

      setResult(newResult);
      setIsCalculating(false);
      onCalculate(newResult);
      playRomanticChime(soundEnabled);
    }, 450);
  };

  // SVG circular gauge math
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayPercent / 100) * circumference;

  return (
    <div className="relative w-full max-w-4xl mx-auto backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-rose-500/10 border border-rose-100/80 dark:border-rose-950/50 transition-all duration-300">
      {/* Decorative top accent badge */}
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/50 dark:to-pink-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/50 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          Pythagorean Numerology & Soulmate Synergy
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          Discover Your <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">Soul Chemistry</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          Where ancient numerological vibration meets romantic alchemy. Enter two names to uncover your cosmic harmony, personality alignment, and destiny.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleCalculateSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Partner 1 Input */}
          <div className="md:col-span-5 relative group">
            <label
              htmlFor="name1"
              className="block text-xs font-semibold uppercase tracking-wider text-rose-800/80 dark:text-rose-300/80 mb-2"
            >
              First Name (You)
            </label>
            <div className="relative">
              <input
                id="name1"
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="e.g. Romeo"
                maxLength={40}
                className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-rose-50/40 dark:bg-slate-800/60 border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/60 focus:border-rose-500 transition-all font-medium text-base shadow-inner"
              />
              <Heart className="w-5 h-5 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>
          </div>

          {/* Interlocking Symbol */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-500/30">
              <Heart className="w-5 h-5 fill-current animate-pulse" />
            </div>
          </div>

          {/* Partner 2 Input */}
          <div className="md:col-span-5 relative group">
            <label
              htmlFor="name2"
              className="block text-xs font-semibold uppercase tracking-wider text-rose-800/80 dark:text-rose-300/80 mb-2"
            >
              Second Name (Crush / Partner)
            </label>
            <div className="relative">
              <input
                id="name2"
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="e.g. Juliet"
                maxLength={40}
                className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-rose-50/40 dark:bg-slate-800/60 border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/60 focus:border-rose-500 transition-all font-medium text-base shadow-inner"
              />
              <Sparkles className="w-5 h-5 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="p-3 text-center text-xs font-medium text-rose-700 bg-rose-100/80 dark:bg-rose-950/70 dark:text-rose-300 rounded-xl border border-rose-200 dark:border-rose-900 animate-shake">
            {errorMsg}
          </div>
        )}

        {/* Advanced Options Checkboxes */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer hover:text-rose-600 transition-colors">
            <input
              type="checkbox"
              checked={supportMaster}
              onChange={(e) => setSupportMaster(e.target.checked)}
              className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-rose-300"
            />
            <span>Preserve Master Numbers (11, 22, 33)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-rose-600 transition-colors">
            <input
              type="checkbox"
              checked={allowJitter}
              onChange={(e) => setAllowJitter(e.target.checked)}
              className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-rose-300"
            />
            <span>Allow small mystical surprise (±5%)</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            type="submit"
            disabled={isCalculating}
            className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-600 active:scale-95 shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-200 cursor-pointer min-w-[200px]"
          >
            <Heart className={`w-5 h-5 fill-current ${isCalculating ? 'animate-spin' : 'animate-bounce'}`} />
            <span>{isCalculating ? 'Reading the Stars...' : 'Calculate Love ❤️'}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
            title="Reset Names and Results"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset</span>
          </button>
        </div>
      </form>

      {/* Result Section */}
      <div className="mt-10 pt-8 border-t border-rose-100 dark:border-rose-950/60">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
          {/* Circular Progress Gauge */}
          <div className="relative flex items-center justify-center w-48 h-48 select-none">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-rose-100 dark:text-slate-800"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Gradient Track */}
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
                strokeWidth="12"
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
              <span className="font-serif text-4xl sm:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                {result ? `${displayPercent}%` : '--%'}
              </span>
              <span className="text-[11px] font-semibold text-rose-500 dark:text-rose-400 uppercase tracking-widest mt-1">
                {result ? result.details.emoji + ' ' + result.details.tier : 'Awaiting Names'}
              </span>
            </div>
          </div>

          {/* Result Text & Details */}
          <div className="text-center md:text-left max-w-md">
            {result ? (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50">
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                  <span>{result.details.badge}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {result.name1} & {result.name2}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {result.details.summary}
                </p>

                {/* Quick actions for result */}
                <div className="pt-2 flex flex-wrap gap-2.5 justify-center md:justify-start">
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
                    <span>View Archetypes</span>
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
                <h3 className="font-serif text-xl font-semibold text-slate-700 dark:text-slate-200">
                  Ready to test your love?
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Enter your names above and click "Calculate Love". Our Pythagorean numerology engine will calculate your individual life path vibrations and overall compatibility synergy!
                </p>
                <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                  <button
                    type="button"
                    onClick={() => {
                      setName1('Romeo');
                      setName2('Juliet');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 border border-rose-200/60 dark:border-rose-900/40"
                  >
                    Try Romeo & Juliet
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setName1('Elizabeth');
                      setName2('Darcy');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 border border-rose-200/60 dark:border-rose-900/40"
                  >
                    Try Elizabeth & Darcy
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

