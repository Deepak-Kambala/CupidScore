import React, { useState, useRef } from 'react';
import { X, Mail, Download, Copy, Check, Sparkles, Heart } from 'lucide-react';

export default function LoveLetterModal({ isOpen, onClose, defaultTo = '', defaultFrom = '' }) {
  if (!isOpen) return null;

  const [to, setTo] = useState(defaultTo || 'My Beloved');
  const [from, setFrom] = useState(defaultFrom || 'Your Soulmate');
  const [date, setDate] = useState(
    new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
  );
  const [content, setContent] = useState(
    'Every moment with you feels like a chapter in a fairytale. Your smile brightens my darkest days, and your laughter is my favorite melody. Thank you for being my constant warmth and joy.'
  );
  const [theme, setTheme] = useState('blush'); // blush, parchment, midnight
  const [copied, setCopied] = useState(false);
  const letterRef = useRef(null);

  const themeStyles = {
    blush: {
      container: 'bg-rose-50/90 border-rose-200 text-rose-950',
      seal: 'bg-rose-600 text-white shadow-rose-500/40',
      font: 'font-serif',
      accent: 'text-rose-600',
    },
    parchment: {
      container: 'bg-[#fcf8f0] border-amber-200/80 text-amber-950',
      seal: 'bg-red-800 text-amber-100 shadow-amber-900/40',
      font: 'font-serif',
      accent: 'text-amber-800',
    },
    midnight: {
      container: 'bg-slate-900 border-indigo-500/30 text-rose-100',
      seal: 'bg-indigo-600 text-rose-100 shadow-indigo-500/40',
      font: 'font-serif',
      accent: 'text-amber-300',
    },
  };

  const handleCopyText = () => {
    const fullText = `Dearest ${to},\n\n${content}\n\nForever yours,\n${from}\n${date}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = () => {
    // Generate a high quality 2D Canvas snapshot of the letter
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // Background color based on theme
    if (theme === 'midnight') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 800, 700);
      ctx.fillStyle = '#ffe4e6';
    } else if (theme === 'parchment') {
      ctx.fillStyle = '#fcf8f0';
      ctx.fillRect(0, 0, 800, 700);
      ctx.fillStyle = '#451a03';
    } else {
      ctx.fillStyle = '#fff1f2';
      ctx.fillRect(0, 0, 800, 700);
      ctx.fillStyle = '#4c0519';
    }

    // Border
    ctx.lineWidth = 4;
    ctx.strokeStyle = theme === 'midnight' ? '#6366f1' : '#f43f5e';
    ctx.strokeRect(30, 30, 740, 640);

    // Header Date
    ctx.font = 'italic 18px Georgia, serif';
    ctx.textAlign = 'right';
    ctx.fillText(date, 720, 80);

    // Salutation
    ctx.font = 'bold 26px Georgia, serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Dearest ${to},`, 80, 130);

    // Content wrap
    ctx.font = '20px Georgia, serif';
    const words = content.split(' ');
    let line = '';
    let y = 190;
    const maxWidth = 640;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 80, y);
        line = words[n] + ' ';
        y += 34;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 80, y);

    // Sign off
    y += 50;
    ctx.font = 'italic 20px Georgia, serif';
    ctx.fillText('Forever & always yours,', 80, y);
    y += 35;
    ctx.font = 'bold 26px Georgia, serif';
    ctx.fillText(from, 80, y);

    // Decorative heart stamp
    ctx.font = '36px sans-serif';
    ctx.fillText('💌', 700, 620);

    const link = document.createElement('a');
    link.download = `Love-Letter-${to.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl my-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
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
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Love Letter Generator
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compose, personalize, and export a heartfelt handwritten-style love note
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Editor Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Recipient (To)
                </label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="e.g. My Dearest..."
                  maxLength={50}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Sender (From)
                </label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="e.g. Your Beloved..."
                  maxLength={50}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                maxLength={40}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Heartfelt Message
                </label>
                <span className="text-[11px] text-slate-400">{content.length}/500</span>
              </div>
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={500}
                placeholder="Write your affectionate thoughts here..."
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Theme selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Stationery Aesthetic
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme('blush')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    theme === 'blush'
                      ? 'border-rose-500 bg-rose-50 text-rose-700 font-semibold shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  🌸 Blush Rose
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('parchment')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    theme === 'parchment'
                      ? 'border-amber-500 bg-amber-50 text-amber-800 font-semibold shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  📜 Parchment
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('midnight')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    theme === 'midnight'
                      ? 'border-indigo-500 bg-slate-800 text-indigo-300 font-semibold shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  🌙 Midnight
                </button>
              </div>
            </div>
          </div>

          {/* Letter Live Preview */}
          <div className="flex flex-col items-center">
            <div
              ref={letterRef}
              className={`w-full max-w-sm rounded-2xl p-6 sm:p-8 shadow-xl border relative transition-all duration-300 ${currentTheme.container} ${currentTheme.font}`}
            >
              {/* Corner hearts */}
              <span className="absolute top-3 left-3 text-sm opacity-60">🌹</span>
              <span className="absolute top-3 right-3 text-xs opacity-75">{date}</span>

              <div className="mt-4 mb-3">
                <h4 className="text-xl font-bold tracking-tight">Dearest {to},</h4>
              </div>

              <p className="text-sm leading-relaxed whitespace-pre-wrap italic opacity-90 my-4 min-h-[120px]">
                {content}
              </p>

              <div className="mt-6 flex justify-between items-end">
                <div>
                  <p className="text-xs uppercase tracking-wider opacity-75">Forever yours,</p>
                  <p className="text-lg font-bold mt-0.5">{from}</p>
                </div>

                {/* Wax seal */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${currentTheme.seal}`}
                >
                  💌
                </div>
              </div>
            </div>

            {/* Export Actions */}
            <div className="w-full max-w-sm mt-5 flex gap-2.5">
              <button
                onClick={handleDownloadImage}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 active:scale-95 shadow-md shadow-rose-500/20 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save as Image</span>
              </button>

              <button
                onClick={handleCopyText}
                className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-medium text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
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

