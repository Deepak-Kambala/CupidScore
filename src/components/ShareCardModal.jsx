import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Share2, Copy, Check, Heart, ExternalLink } from 'lucide-react';

export default function ShareCardModal({ isOpen, onClose, result }) {
  if (!isOpen || !result) return null;

  const canvasRef = useRef(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = 900;
    const height = 900;
    canvas.width = width;
    canvas.height = height;

    // Background Gradient (Deep romantic plum & rose)
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#1c0f24');
    bgGradient.addColorStop(0.5, '#2e122b');
    bgGradient.addColorStop(1, '#120b18');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative Floral & Golden Borders
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(48, 48, width - 96, height - 96);

    // Corner decorative hearts
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨', 70, 70);
    ctx.fillText('✨', width - 70, 70);
    ctx.fillText('✨', 70, height - 70);
    ctx.fillText('✨', width - 70, height - 70);

    // Title / Brand
    ctx.fillStyle = '#fbcfe8';
    ctx.font = 'bold 20px "Italiana", "Playfair Display", Georgia, serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('CUPIDSCORE • SOUL CHEMISTRY', width / 2, 110);

    // Couple Names
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px "Italiana", "Playfair Display", Georgia, serif';
    ctx.fillText(`${result.name1} & ${result.name2}`, width / 2, 185);

    // Circular Progress Ring
    const centerX = width / 2;
    const centerY = 400;
    const ringRadius = 140;

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius, 0, 2 * Math.PI);
    ctx.lineWidth = 18;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();

    // Progress arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (result.percent / 100) * (2 * Math.PI);
    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius, startAngle, endAngle);
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    const arcGradient = ctx.createLinearGradient(centerX - ringRadius, centerY, centerX + ringRadius, centerY);
    arcGradient.addColorStop(0, '#ff2e63');
    arcGradient.addColorStop(1, '#ff758c');
    ctx.strokeStyle = arcGradient;
    ctx.stroke();

    // Center Percentage
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 88px "Italiana", "Playfair Display", Georgia, serif';
    ctx.fillText(`${result.percent}%`, centerX, centerY - 10);

    ctx.fillStyle = '#fda4af';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(result.details.badge.toUpperCase(), centerX, centerY + 55);

    // Subtitle & Summary
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px "Italiana", "Playfair Display", Georgia, serif';
    ctx.fillText(result.details.tier, width / 2, 600);

    // Word wrap summary
    ctx.fillStyle = '#fce7f3';
    ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
    const words = result.details.summary.split(' ');
    let line = '';
    let y = 650;
    const maxLineW = 680;

    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + ' ';
      const metrics = ctx.measureText(test);
      if (metrics.width > maxLineW && i > 0) {
        ctx.fillText(line, width / 2, y);
        line = words[i] + ' ';
        y += 36;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, width / 2, y);

    // Footer Watermark
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.fillText('Calculated with Pythagorean Numerology • Love Alchemy', width / 2, height - 85);
  }, [result]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `CupidScore-${result.name1}-and-${result.name2}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?n1=${encodeURIComponent(result.name1)}&n2=${encodeURIComponent(result.name2)}`
    : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareText = `Our Love Compatibility Score is ${result.percent}% (${result.details.tier})! Check your chemistry on CupidScore:`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl my-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white mb-2 shadow-md shadow-rose-500/25">
            <Share2 className="w-6 h-6" />
          </div>
          <h2 className="font-editorial text-2xl font-bold">
            Shareable Love Card
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Download your customized love card or share it directly with friends
          </p>
        </div>

        {/* Canvas Card Preview */}
        <div className="flex justify-center my-3">
          <canvas
            ref={canvasRef}
            className="w-full max-w-sm rounded-2xl shadow-xl border border-rose-200/50 dark:border-rose-900/50"
          />
        </div>

        {/* Actions */}
        <div className="mt-5 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-600 active:scale-95 shadow-md shadow-rose-500/25 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Image (PNG)</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl font-medium text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Copied Link' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Social share shortcuts */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-200/60"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-sky-700 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 border border-sky-200/60"
            >
              X (Twitter)
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-blue-700 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 border border-blue-200/60"
            >
              Telegram
            </a>
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

