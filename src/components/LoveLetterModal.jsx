import React, { useState, useRef } from 'react';
import { X, Mail, Download, Copy, Check, Sparkles, Heart, Feather, RefreshCw } from 'lucide-react';

const LETTER_PROMPTS = [
  {
    label: 'Soulmate Devotion',
    text: 'Every moment with you feels like an answered prayer. Your smile turns the quietest days into poetry, and your laughter is the soundtrack I want to wake up to for all of my days. Thank you for choosing to walk this wild, beautiful journey with me.',
  },
  {
    label: 'Playful Romance',
    text: 'I still get that little flutter in my chest whenever your name lights up my phone. You are my favorite distraction, my trusted partner in crime, and the sweetest part of every single day. Here is to a thousand more inside jokes and midnight conversations.',
  },
  {
    label: 'Gentle Starlight',
    text: 'In a noisy world that is always in a hurry, being with you feels like finally coming home. Thank you for your warmth, your steadfast kindness, and the quiet comfort you bring into my life. My heart has found its safe harbor in you.',
  },
  {
    label: 'Deep Passion',
    text: 'From the first moment our eyes met, there was an unspoken language between us that words could never capture. You ignite a fire in my soul that time only deepens. You have my heart, today and forever.',
  },
];

export default function LoveLetterModal({ isOpen, onClose, defaultTo = '', defaultFrom = '' }) {
  if (!isOpen) return null;

  const [to, setTo] = useState(defaultTo || 'My Dearest');
  const [from, setFrom] = useState(defaultFrom || 'Your Soulmate');
  const [date, setDate] = useState(
    new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
  );
  const [content, setContent] = useState(LETTER_PROMPTS[0].text);
  const [theme, setTheme] = useState('blush'); // blush, parchment, midnight
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState('edit'); // 'edit' or 'preview'

  const handleCopyText = () => {
    const fullText = `Dearest ${to},\n\n${content}\n\nForever & always yours,\n${from}\n${date}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    // High DPI 1200x900 for ultra sharp crisp text
    canvas.width = 1200;
    canvas.height = 920;
    const ctx = canvas.getContext('2d');

    // Background color based on theme
    if (theme === 'midnight') {
      const grad = ctx.createRadialGradient(600, 200, 50, 600, 460, 600);
      grad.addColorStop(0, '#1f132f');
      grad.addColorStop(1, '#0c0714');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 920);

      // Gold filigree border
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#d97706';
      ctx.strokeRect(40, 40, 1120, 840);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.strokeRect(48, 48, 1104, 824);

      ctx.fillStyle = '#fce7f3';
    } else if (theme === 'parchment') {
      ctx.fillStyle = '#fbf7ee';
      ctx.fillRect(0, 0, 1200, 920);

      // Warm vintage border
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#b45309';
      ctx.strokeRect(40, 40, 1120, 840);
      ctx.strokeStyle = '#d97706';
      ctx.strokeRect(48, 48, 1104, 824);

      ctx.fillStyle = '#451a03';
    } else {
      // Soft blush luxury
      const grad = ctx.createLinearGradient(0, 0, 1200, 920);
      grad.addColorStop(0, '#fff5f6');
      grad.addColorStop(1, '#ffeef2');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 920);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#f43f5e';
      ctx.strokeRect(40, 40, 1120, 840);
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
      ctx.strokeRect(48, 48, 1104, 824);

      ctx.fillStyle = '#4c0519';
    }

    // Corner decorative stamps
    ctx.font = '24px Georgia, serif';
    ctx.fillText('❦', 70, 75);
    ctx.fillText('❦', 1120, 75);
    ctx.fillText('❦', 70, 860);
    ctx.fillText('❦', 1120, 860);

    // Postal stamp top right
    ctx.strokeStyle = theme === 'midnight' ? '#fbbf24' : '#e11d48';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(980, 80, 120, 120);
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CUPID POST', 1040, 120);
    ctx.font = '36px sans-serif';
            ctx.fillText('✦', 1040, 165);

    // Header Date
    ctx.textAlign = 'left';
    ctx.font = 'italic 22px Georgia, serif';
    ctx.fillText(date, 90, 110);

    // Salutation
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillText(`Dearest ${to},`, 90, 180);

    // Content wrap
    ctx.font = '26px Georgia, serif';
    const words = content.split(' ');
    let line = '';
    let y = 250;
    const maxWidth = 860;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 90, y);
        line = words[n] + ' ';
        y += 46;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 90, y);

    // Sign off
    y = Math.max(y + 70, 680);
    ctx.font = 'italic 24px Georgia, serif';
    ctx.fillText('Forever & always yours,', 90, y);
    y += 45;
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillText(from, 90, y);

    // Wax seal drawing
    const sealX = 1040;
    const sealY = 740;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 48, 0, 2 * Math.PI);
    ctx.fillStyle = theme === 'parchment' ? '#78350f' : '#9f1239';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❦', sealX, sealY);

    const link = document.createElement('a');
    link.download = `Love-Letter-To-${to.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl my-4 sm:my-8 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-8 shadow-2xl border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 max-h-[92dvh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white mb-2 shadow-md shadow-rose-500/25">
            <Feather className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight">
            The Love Letter Atelier
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Craft an intimate, beautifully formatted letter with authentic stationery, wax seals, and instant high-res PNG export
          </p>
        </div>

        {/* Mobile Navigation Tabs (visible on small screens) */}
        <div className="flex lg:hidden rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 mb-4 text-xs font-semibold">
          <button
            onClick={() => setMobileTab('edit')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mobileTab === 'edit'
                ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Compose Note
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mobileTab === 'preview'
                ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Stationery Preview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Editor Form (visible on desktop or if mobileTab === 'edit') */}
          <div className={`space-y-4 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            {/* Quick Inspiration Pills */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-rose-800/80 dark:text-rose-300/80 mb-1.5">
                Inspiration Prompts:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {LETTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setContent(prompt.text)}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-rose-50 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-slate-700 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40 transition-all cursor-pointer"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
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
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Sender (From)
                </label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="e.g. Your Soulmate..."
                  maxLength={50}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
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
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Heartfelt Message
                </label>
                <span className="text-[10px] text-slate-400">{content.length}/500</span>
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

            {/* Stationery aesthetic picker */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Stationery Texture
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme('blush')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    theme === 'blush'
                      ? 'border-rose-500 bg-rose-50 text-rose-700 font-semibold shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  Blush Silk
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('parchment')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    theme === 'parchment'
                      ? 'border-amber-500 bg-amber-50 text-amber-800 font-semibold shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  Antique Parchment
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('midnight')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                    theme === 'midnight'
                      ? 'border-indigo-500 bg-slate-800 text-indigo-300 font-semibold shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  Midnight Starlight
                </button>
              </div>
            </div>

            {/* Switch to preview button for mobile */}
            <div className="pt-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileTab('preview')}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200"
              >
                View Stationery Preview →
              </button>
            </div>
          </div>

          {/* Letter Live Preview (visible on desktop or if mobileTab === 'preview') */}
          <div className={`flex flex-col items-center ${mobileTab === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
            <div
              className={`w-full max-w-sm rounded-2xl p-6 sm:p-8 shadow-xl border relative transition-all duration-300 font-cormorant ${
                theme === 'midnight'
                  ? 'stationery-midnight text-rose-100 border-indigo-900/60'
                  : theme === 'parchment'
                  ? 'stationery-parchment text-amber-950 border-amber-300/80 shadow-amber-900/10'
                  : 'stationery-rose text-rose-950 border-rose-200 shadow-rose-900/5'
              }`}
            >
              {/* Postage Stamp Header */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs italic tracking-wider opacity-75">{date}</span>
                <div
                  className={`w-12 h-14 rounded-md border-2 border-dashed flex flex-col items-center justify-center text-[9px] font-mono leading-none ${
                    theme === 'midnight'
                      ? 'border-indigo-400 text-indigo-300'
                      : 'border-rose-400 text-rose-600'
                  }`}
                >
                  <span>CUPID</span>
                  <span className="text-base my-0.5 font-editorial font-bold">C</span>
                  <span>POST</span>
                </div>
              </div>

              {/* Salutation */}
              <div className="mb-3">
                <h4 className="font-editorial text-2xl font-bold tracking-tight">Dearest {to},</h4>
              </div>

              {/* Letter Content */}
              <p className="text-base leading-relaxed whitespace-pre-wrap italic opacity-95 my-4 min-h-[120px]">
                {content}
              </p>

              {/* Sign off and Wax seal */}
              <div className="mt-8 flex justify-between items-end pt-2 border-t border-current/10">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-70">Forever & always yours,</p>
                  <p className="font-editorial text-xl font-bold mt-0.5">{from}</p>
                </div>

                {/* Wax seal */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-white font-bold text-base select-none shrink-0 ${
                    theme === 'parchment' ? 'wax-seal-gold' : 'wax-seal'
                  }`}
                  title="Official Wax Seal of Love"
                >
                  ❦
                </div>
              </div>
            </div>

            {/* Export Actions */}
            <div className="w-full max-w-sm mt-5 space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadImage}
                  className="group flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-white btn-romantic-primary cursor-pointer tracking-wide"
                >
                  <Download className="w-4 h-4 btn-icon-bounce" />
                  <span>Download Image (PNG)</span>
                </button>

                <button
                  onClick={handleCopyText}
                  className="group flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl font-medium text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 btn-romantic-secondary cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 btn-icon-bounce" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>

              {/* Mobile back to edit button */}
              <button
                type="button"
                onClick={() => setMobileTab('edit')}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-700 lg:hidden"
              >
                ← Back to Edit Note
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl font-medium text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
