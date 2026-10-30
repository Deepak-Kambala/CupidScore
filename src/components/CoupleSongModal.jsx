import React, { useState } from 'react';
import { X, Music, Play, ExternalLink, Copy, Check, Heart } from 'lucide-react';
import { getSongForScore } from '../data/songs';

export default function CoupleSongModal({ isOpen, onClose, initialPercent = 85 }) {
  if (!isOpen) return null;

  const [inputScore, setInputScore] = useState(initialPercent || 85);
  const [copied, setCopied] = useState(false);

  const song = getSongForScore(inputScore);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(song.youtubeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl my-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white mb-3 shadow-md shadow-pink-500/25">
            <Music className="w-6 h-6" />
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold">
            Couple's Anthem
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            The soundtrack matched to your romantic frequency
          </p>
        </div>

        {/* Score selector slider */}
        <div className="mb-5 p-4 rounded-2xl bg-rose-50/50 dark:bg-slate-800/50 border border-rose-100 dark:border-rose-900/30">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="scoreRange" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Love Percentage Frequency:
            </label>
            <span className="font-editorial font-bold text-rose-600 dark:text-rose-400 text-lg">
              {inputScore}%
            </span>
          </div>
          <input
            id="scoreRange"
            type="range"
            min="0"
            max="100"
            value={inputScore}
            onChange={(e) => setInputScore(Number(e.target.value))}
            className="w-full accent-rose-500 h-2 bg-rose-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Song Card */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50/80 to-pink-50/80 dark:from-slate-800/80 dark:to-slate-850/80 border border-rose-200/60 dark:border-rose-900/40 p-4 sm:p-5 space-y-4">
          {/* Thumbnail with play overlay */}
          <div className="relative rounded-xl overflow-hidden group shadow-md aspect-video max-h-56 mx-auto">
            <img
              src={`https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`}
              alt={song.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <a
              href={song.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/50 transition-colors"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-1" />
              </div>
            </a>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300">
              {song.tag}
            </span>
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
              {song.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              by {song.artist}
            </p>
            <p className="font-cormorant text-base italic text-rose-800 dark:text-rose-200 pt-1">
              {song.quote}
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={song.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 active:scale-95 shadow-md shadow-rose-500/20 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Listen on YouTube</span>
            </a>

            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 active:scale-95 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
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

