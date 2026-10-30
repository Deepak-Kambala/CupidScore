import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';

export default function Footer({ onOpenAbout, onOpenFeedback }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-20 border-t border-rose-200/60 dark:border-rose-950/40 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand & Slogan */}
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-editorial text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
                CupidScore
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-medium">
                Love Alchemy
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
              Pythagorean Numerology & Cosmic Chemistry • 100% Client-Side Privacy
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={onOpenAbout}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              About & Science
            </button>
            <span>•</span>
            <button
              onClick={onOpenFeedback}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Share Feedback
            </button>
            <span>•</span>
            <a
              href="https://github.com/Deepak-Kambala/Love-Calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-600 transition-colors inline-flex items-center gap-1"
            >
              <span>GitHub</span>
            </a>
          </div>

          {/* Scroll to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200/60 dark:border-rose-900/40 transition-all cursor-pointer shadow-2xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-rose-100 dark:border-rose-950/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 gap-2 text-center">
          <p>© {new Date().getFullYear()} CupidScore. Open source project under MIT License.</p>
          <p className="flex items-center justify-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-rose-500 fill-current inline" /> by{' '}
            <span className="font-semibold text-slate-600 dark:text-slate-300">Deepak Kambala</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
