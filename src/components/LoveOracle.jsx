import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, RefreshCw, Heart } from 'lucide-react';
import { ORACLE_MESSAGES, ROMANTIC_TIPS } from '../data/numerology';

export default function LoveOracle({ moodKey = 'dreamy', names = null }) {
  const [oracleIndex, setOracleIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const messages = ORACLE_MESSAGES[moodKey] || ORACLE_MESSAGES.dreamy;
  const currentMessage = messages[oracleIndex % messages.length];
  const currentTip = ROMANTIC_TIPS[tipIndex % ROMANTIC_TIPS.length];

  const handleNextWisdom = () => {
    setFade(false);
    setTimeout(() => {
      setOracleIndex((prev) => prev + 1);
      setTipIndex((prev) => prev + 1);
      setFade(true);
    }, 200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-br from-rose-900/90 via-slate-900/95 to-purple-950/90 text-rose-100 p-6 sm:p-10 shadow-2xl shadow-rose-950/30 border border-rose-500/20">
        {/* Soft background starlight glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Oracle Header */}
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-rose-300/80" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-rose-300/90">
              Celestial Whispers
            </span>
          </div>

          <h2 className="font-editorial text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 bg-clip-text text-transparent mb-4">
            The Oracle Whispers
          </h2>

          {/* Parchment Box */}
          <div className="w-full max-w-2xl bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-7 border border-rose-400/20 my-2">
            <p
              className={`font-cormorant italic text-lg sm:text-2xl text-rose-100/95 leading-relaxed transition-opacity duration-300 ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
            >
              "{currentMessage}"
            </p>

            {names && (
              <p className="mt-3 text-xs tracking-wider text-rose-300/60 uppercase font-medium">
                — For {names.name1} & {names.name2}
              </p>
            )}
          </div>

          {/* Romantic Tip of the Day */}
          <div className="mt-6 flex items-center gap-2.5 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs sm:text-sm text-rose-200">
            <Heart className="w-4 h-4 text-rose-400 shrink-0 fill-current" />
            <span className="font-medium text-rose-300">Romantic Gesture:</span>
            <span className="italic">{currentTip}</span>
          </div>

          {/* Cycle Button */}
          <button
            onClick={handleNextWisdom}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-rose-200 bg-rose-800/40 hover:bg-rose-700/50 active:scale-95 transition-all border border-rose-400/30 cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Seek Another Whisper</span>
          </button>
        </div>
      </div>
    </div>
  );
}

