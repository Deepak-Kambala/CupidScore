import React, { useState } from 'react';
import CupidLogo from './CupidLogo';
import {
  Heart,
  History,
  Music,
  Mail,
  Disc,
  Users,
  MessageSquare,
  Info,
  Volume2,
  VolumeX,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';

export default function Navbar({
  historyCount = 0,
  onOpenHistory,
  onOpenSong,
  onOpenLetter,
  onOpenSpinner,
  onOpenPersonality,
  onOpenFeedback,
  onOpenAbout,
  soundEnabled,
  onToggleSound,
  confettiEnabled,
  onToggleConfetti,
  darkMode,
  onToggleTheme,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (callback) => {
    setMobileMenuOpen(false);
    callback();
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/75 dark:bg-slate-900/80 border-b border-rose-200/50 dark:border-rose-950/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer select-none group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <CupidLogo size={46} variant="badge" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-editorial text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 dark:from-rose-400 dark:to-pink-300 bg-clip-text text-transparent tracking-tight">
                  CupidScore
                </span>
              </div>
              <p className="text-[10px] text-rose-800/60 dark:text-rose-200/50 tracking-wider uppercase -mt-0.5">
                Romantic Chemistry Calculator
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={onOpenHistory}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 btn-romantic-pill border border-transparent cursor-pointer"
              title="View Calculation History"
            >
              <History className="w-3.5 h-3.5 text-rose-500 btn-icon-spin" />
              <span>History</span>
              {historyCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-semibold">
                  {historyCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenPersonality}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 btn-romantic-pill border border-transparent cursor-pointer"
              title="Personality Archetypes"
            >
              <Users className="w-3.5 h-3.5 text-rose-500 btn-icon-bounce" />
              <span>Archetypes</span>
            </button>

            <button
              onClick={onOpenSong}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 btn-romantic-pill border border-transparent cursor-pointer"
              title="Couple's Love Song"
            >
              <Music className="w-3.5 h-3.5 text-pink-500 btn-icon-pulse" />
              <span>Love Song</span>
            </button>

            <button
              onClick={onOpenLetter}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 btn-romantic-pill border border-transparent cursor-pointer"
              title="Love Letter Generator"
            >
              <Mail className="w-3.5 h-3.5 text-rose-500 btn-icon-bounce" />
              <span>Love Letter</span>
            </button>

            <button
              onClick={onOpenSpinner}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 btn-romantic-pill border border-transparent cursor-pointer"
              title="Wheel of Love Game"
            >
              <Disc className="w-3.5 h-3.5 text-amber-500 btn-icon-spin" />
              <span>Spinner</span>
            </button>

            <button
              onClick={onOpenFeedback}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 btn-romantic-pill border border-transparent cursor-pointer"
              title="Give Feedback"
            >
              <MessageSquare className="w-3.5 h-3.5 text-rose-500 btn-icon-bounce" />
              <span>Feedback</span>
            </button>

            <button
              onClick={onOpenAbout}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 btn-romantic-pill border border-transparent cursor-pointer"
              title="About & How It Works"
            >
              <Info className="w-3.5 h-3.5 text-rose-500 btn-icon-pulse" />
              <span>About</span>
            </button>

            <div className="h-4 w-px bg-rose-200 dark:bg-rose-900 mx-1.5" />

            {/* Quick toggles */}
            <button
              onClick={onToggleSound}
              className={`p-2 rounded-xl transition-all ${
                soundEnabled
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Mute romantic chimes' : 'Enable romantic chimes'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onToggleConfetti}
              className={`p-2 rounded-xl transition-all ${
                confettiEnabled
                  ? 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/60'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title={confettiEnabled ? 'Confetti celebrations: ON' : 'Confetti celebrations: OFF'}
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-amber-500 hover:text-amber-600 dark:text-amber-400 bg-amber-50/70 dark:bg-slate-800 transition-all"
              title={darkMode ? 'Switch to daylight rose' : 'Switch to romantic night'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-rose-400" />}
            </button>
          </nav>

          {/* Mobile Menu Button & Toggles */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-amber-500 bg-amber-50/70 dark:bg-slate-800"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/60"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-500" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-rose-100 dark:border-rose-950/60 space-y-1">
            <button
              onClick={() => handleNavClick(onOpenHistory)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-rose-500" />
                <span>Calculation History</span>
              </div>
              {historyCount > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-rose-500 text-white">
                  {historyCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick(onOpenPersonality)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Users className="w-4 h-4 text-rose-500" />
              <span>Personality Archetypes</span>
            </button>

            <button
              onClick={() => handleNavClick(onOpenSong)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Music className="w-4 h-4 text-pink-500" />
              <span>Couple's Love Song</span>
            </button>

            <button
              onClick={() => handleNavClick(onOpenLetter)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Mail className="w-4 h-4 text-rose-500" />
              <span>Love Letter Generator</span>
            </button>

            <button
              onClick={() => handleNavClick(onOpenSpinner)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Disc className="w-4 h-4 text-amber-500" />
              <span>Wheel of Love Spinner</span>
            </button>

            <button
              onClick={() => handleNavClick(onOpenFeedback)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <MessageSquare className="w-4 h-4 text-rose-500" />
              <span>Feedback & Reviews</span>
            </button>

            <button
              onClick={() => handleNavClick(onOpenAbout)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Info className="w-4 h-4 text-rose-500" />
              <span>About & How It Works</span>
            </button>

            <div className="pt-2 flex items-center justify-around border-t border-rose-100 dark:border-rose-950/60">
              <button
                onClick={onToggleSound}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{soundEnabled ? 'Sound On' : 'Muted'}</span>
              </button>

              <button
                onClick={onToggleConfetti}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-pink-600 dark:text-pink-400"
              >
                <Sparkles className="w-4 h-4" />
                <span>{confettiEnabled ? 'Confetti On' : 'Confetti Off'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

