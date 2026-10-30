import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Share2, Copy, Check, Sparkles, Layers, Image as ImageIcon } from 'lucide-react';

export default function ShareCardModal({ isOpen, onClose, result }) {
  if (!isOpen || !result) return null;

  const canvasRef = useRef(null);
  const [cardTheme, setCardTheme] = useState('midnight'); // 'midnight' | 'rose' | 'parchment'
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 1200 x 1500 Golden Portrait Ratio (4:5) for maximum editorial prestige
    const width = 1200;
    const height = 1500;
    canvas.width = width;
    canvas.height = height;

    // --- Color Palettes ---
    const themes = {
      midnight: {
        bgStart: '#0d0714',
        bgMid: '#1a0b22',
        bgEnd: '#09040e',
        ambientGlow: 'rgba(225, 29, 72, 0.12)',
        primaryGold: '#fbbf24',
        accentGold: '#d97706',
        deepGold: '#78350f',
        borderFoil: 'rgba(251, 191, 36, 0.45)',
        borderHairline: 'rgba(244, 63, 94, 0.25)',
        textWhite: '#ffffff',
        textMuted: '#fce7f3',
        textGold: '#fde68a',
        ringTrack: 'rgba(255, 255, 255, 0.05)',
        ringGradientStart: '#f43f5e',
        ringGradientEnd: '#fbbf24',
        cardSurface: 'rgba(255, 255, 255, 0.03)',
        cardBorder: 'rgba(251, 191, 36, 0.15)',
        meterTrack: 'rgba(255, 255, 255, 0.08)',
        sealBg: '#881337',
        sealGold: '#fbbf24',
      },
      rose: {
        bgStart: '#fff5f6',
        bgMid: '#ffebef',
        bgEnd: '#fff0f3',
        ambientGlow: 'rgba(244, 63, 94, 0.08)',
        primaryGold: '#e11d48',
        accentGold: '#be123c',
        deepGold: '#881337',
        borderFoil: 'rgba(225, 29, 72, 0.4)',
        borderHairline: 'rgba(225, 29, 72, 0.15)',
        textWhite: '#4c0519',
        textMuted: '#881337',
        textGold: '#9f1239',
        ringTrack: 'rgba(244, 63, 94, 0.08)',
        ringGradientStart: '#e11d48',
        ringGradientEnd: '#fb7185',
        cardSurface: 'rgba(255, 255, 255, 0.6)',
        cardBorder: 'rgba(244, 63, 94, 0.2)',
        meterTrack: 'rgba(244, 63, 94, 0.12)',
        sealBg: '#9f1239',
        sealGold: '#ffe4e6',
      },
      parchment: {
        bgStart: '#fbf7ee',
        bgMid: '#f5ecd7',
        bgEnd: '#efe2c7',
        ambientGlow: 'rgba(217, 119, 6, 0.08)',
        primaryGold: '#b45309',
        accentGold: '#92400e',
        deepGold: '#451a03',
        borderFoil: 'rgba(180, 83, 9, 0.5)',
        borderHairline: 'rgba(180, 83, 9, 0.2)',
        textWhite: '#291305',
        textMuted: '#451a03',
        textGold: '#78350f',
        ringTrack: 'rgba(69, 26, 3, 0.06)',
        ringGradientStart: '#b45309',
        ringGradientEnd: '#d97706',
        cardSurface: 'rgba(255, 255, 255, 0.45)',
        cardBorder: 'rgba(180, 83, 9, 0.25)',
        meterTrack: 'rgba(69, 26, 3, 0.12)',
        sealBg: '#78350f',
        sealGold: '#fef3c7',
      },
    };

    const t = themes[cardTheme] || themes.midnight;

    // --- 1. Background Fill ---
    const bg = ctx.createRadialGradient(width / 2, height * 0.38, 80, width / 2, height / 2, 850);
    bg.addColorStop(0, t.bgMid);
    bg.addColorStop(0.65, t.bgStart);
    bg.addColorStop(1, t.bgEnd);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Subtle ambient glow behind central gauge
    const glow = ctx.createRadialGradient(width / 2, 590, 20, width / 2, 590, 420);
    glow.addColorStop(0, t.ambientGlow);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    // --- 2. Micro Star Dust Flecks ---
    ctx.save();
    const starSeeds = [
      [140, 180, 1.5, 0.4], [1050, 210, 2, 0.5], [220, 450, 1, 0.3], [1020, 520, 1.8, 0.45],
      [160, 880, 2, 0.35], [1040, 940, 1.2, 0.3], [240, 1280, 2, 0.4], [980, 1340, 1.5, 0.4],
      [310, 260, 1.2, 0.3], [910, 310, 1.5, 0.4], [180, 700, 1, 0.25], [1080, 720, 1.5, 0.35]
    ];
    starSeeds.forEach(([x, y, r, a]) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = t.primaryGold;
      ctx.globalAlpha = a;
      ctx.fill();
    });
    ctx.restore();

    // --- 3. Filigree Guilloché Borders ---
    const m = 44; // outer margin
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = t.borderFoil;
    ctx.strokeRect(m, m, width - m * 2, height - m * 2);

    const m2 = 56; // inner hairline
    ctx.lineWidth = 1;
    ctx.strokeStyle = t.borderHairline;
    ctx.strokeRect(m2, m2, width - m2 * 2, height - m2 * 2);

    // Corner decorative cartouches
    const corners = [
      [m + 16, m + 16],
      [width - m - 16, m + 16],
      [m + 16, height - m - 16],
      [width - m - 16, height - m - 16],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.save();
      ctx.fillStyle = t.primaryGold;
      ctx.font = '20px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', cx, cy);
      ctx.restore();
    });

    // Cardinal compass dots
    ctx.fillStyle = t.primaryGold;
    [
      [width / 2, m], [width / 2, height - m],
      [m, height / 2], [width - m, height / 2]
    ].forEach(([px, py]) => {
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // --- 4. Top Insignia & Brand Header ---
    ctx.textAlign = 'center';

    // Emblem Icon
    ctx.save();
    ctx.fillStyle = t.primaryGold;
    ctx.font = '22px serif';
    ctx.fillText('❦', width / 2, 115);
    ctx.restore();

    // Brand Name with manual luxury tracking
    ctx.fillStyle = t.textGold;
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    const brandText = 'C U P I D S C O R E';
    ctx.fillText(brandText, width / 2, 150);

    ctx.fillStyle = t.textMuted;
    ctx.font = 'italic 15px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Official Certificate of Romantic Compatibility', width / 2, 175);

    // Elegant divider line
    const gradLine = ctx.createLinearGradient(width / 2 - 160, 0, width / 2 + 160, 0);
    gradLine.addColorStop(0, 'rgba(0,0,0,0)');
    gradLine.addColorStop(0.5, t.borderFoil);
    gradLine.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.strokeStyle = gradLine;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 160, 195);
    ctx.lineTo(width / 2 + 160, 195);
    ctx.stroke();

    // --- 5. Couple Names ---
    ctx.fillStyle = t.textWhite;
    ctx.font = 'bold 54px "Italiana", "Playfair Display", Georgia, serif';
    ctx.fillText(result.name1, width / 2, 275);

    // Calligraphic Ampersand
    ctx.fillStyle = t.primaryGold;
    ctx.font = 'italic 34px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('&', width / 2, 325);

    ctx.fillStyle = t.textWhite;
    ctx.font = 'bold 54px "Italiana", "Playfair Display", Georgia, serif';
    ctx.fillText(result.name2, width / 2, 395);

    // --- 6. The Celestial Score Sanctuary (Centerpiece) ---
    const centerX = width / 2;
    const centerY = 590;
    const ringRadius = 135;

    // Outer clockwork hairline ticks
    ctx.save();
    ctx.strokeStyle = t.borderHairline;
    ctx.lineWidth = 1;
    for (let deg = 0; deg < 360; deg += 6) {
      const rad = (deg * Math.PI) / 180;
      const r1 = ringRadius + 22;
      const r2 = ringRadius + (deg % 30 === 0 ? 28 : 24);
      ctx.beginPath();
      ctx.moveTo(centerX + Math.cos(rad) * r1, centerY + Math.sin(rad) * r1);
      ctx.lineTo(centerX + Math.cos(rad) * r2, centerY + Math.sin(rad) * r2);
      ctx.stroke();
    }
    ctx.restore();

    // Outer subtle orbit
    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius + 20, 0, Math.PI * 2);
    ctx.strokeStyle = t.borderHairline;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Background circular track
    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
    ctx.lineWidth = 14;
    ctx.strokeStyle = t.ringTrack;
    ctx.stroke();

    // Active Glowing Progress Arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (result.percent / 100) * (Math.PI * 2);
    const arcGrad = ctx.createLinearGradient(centerX - ringRadius, centerY - ringRadius, centerX + ringRadius, centerY + ringRadius);
    arcGrad.addColorStop(0, t.ringGradientStart);
    arcGrad.addColorStop(1, t.ringGradientEnd);

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius, startAngle, endAngle);
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.strokeStyle = arcGrad;
    ctx.shadowColor = t.ringGradientStart;
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.restore();

    // Center Large Percentage Number
    ctx.fillStyle = t.textWhite;
    ctx.font = 'bold 88px "Italiana", "Playfair Display", Georgia, serif';
    ctx.fillText(`${result.percent}%`, centerX, centerY + 18);

    // Under-percentage Tier Badge Plaque
    ctx.save();
    ctx.fillStyle = t.cardSurface;
    const badgeW = 260;
    const badgeH = 34;
    ctx.roundRect(centerX - badgeW / 2, centerY + 46, badgeW, badgeH, 17);
    ctx.fill();
    ctx.strokeStyle = t.cardBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = t.primaryGold;
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(result.details.badge.toUpperCase(), centerX, centerY + 68);
    ctx.restore();

    // --- 7. Tier Title Header ---
    ctx.fillStyle = t.textWhite;
    ctx.font = 'bold 34px "Italiana", "Playfair Display", Georgia, serif';
    ctx.fillText(result.details.tier, width / 2, 790);

    // --- 8. Four-Pillar Precision Micro-Gauges ---
    const pillars = result.pillars || {
      emotional: result.percent,
      chemistry: Math.min(100, result.percent + 2),
      intellectual: Math.max(15, result.percent - 3),
      enduring: Math.min(100, result.percent + 4),
    };

    const pillarItems = [
      { label: 'Emotional Resonance', val: pillars.emotional },
      { label: 'Magnetic Chemistry', val: pillars.chemistry },
      { label: 'Intellectual Flow', val: pillars.intellectual },
      { label: 'Enduring Harmony', val: pillars.enduring },
    ];

    const boxW = 820;
    const boxH = 150;
    const boxX = width / 2 - boxW / 2;
    const boxY = 835;

    ctx.fillStyle = t.cardSurface;
    ctx.roundRect(boxX, boxY, boxW, boxH, 20);
    ctx.fill();
    ctx.strokeStyle = t.cardBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    pillarItems.forEach((p, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const px = boxX + 40 + col * 390;
      const py = boxY + 38 + row * 62;

      ctx.textAlign = 'left';
      ctx.fillStyle = t.textMuted;
      ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(p.label, px, py);

      ctx.textAlign = 'right';
      ctx.fillStyle = t.textWhite;
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`${p.val}%`, px + 330, py);

      // Track
      const trackW = 330;
      const trackH = 4.5;
      const trackY = py + 10;
      ctx.fillStyle = t.meterTrack;
      ctx.roundRect(px, trackY, trackW, trackH, 2);
      ctx.fill();

      // Progress
      const fillW = (p.val / 100) * trackW;
      ctx.fillStyle = t.primaryGold;
      ctx.roundRect(px, trackY, fillW, trackH, 2);
      ctx.fill();
    });

    // --- 9. Quotation & Summary Decree ---
    ctx.textAlign = 'center';
    ctx.fillStyle = t.textMuted;
    ctx.font = 'italic 23px "Cormorant Garamond", Georgia, serif';
    const words = result.details.summary.split(' ');
    let line = '';
    let qy = 1050;
    const maxLineW = 860;

    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + ' ';
      const metrics = ctx.measureText(test);
      if (metrics.width > maxLineW && i > 0) {
        ctx.fillText(line, width / 2, qy);
        line = words[i] + ' ';
        qy += 38;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, width / 2, qy);

    // --- 10. Luxury Embossed Wax Seal & Signature Footer ---
    const sealX = width / 2;
    const sealY = 1270;
    const sealR = 50;

    // Outer scalloped/embossed rim
    ctx.save();
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealR + 4, 0, Math.PI * 2);
    ctx.fillStyle = t.sealBg;
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 14;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(sealX, sealY, sealR - 4, 0, Math.PI * 2);
    ctx.strokeStyle = t.sealGold;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = t.sealGold;
    ctx.font = 'bold 24px "Italiana", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❦', sealX, sealY);
    ctx.restore();

    // Authenticated Serial Code & Timestamp
    const serialCode = `AUTHENTICATED ATELIER RECORD • NO. CS-${String(result.percent * 107).slice(-6)}`;
    ctx.fillStyle = t.textGold;
    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(serialCode, width / 2, 1375);

    ctx.fillStyle = t.borderFoil;
    ctx.font = 'italic 13px "Cormorant Garamond", serif';
    ctx.fillText(`Issued on ${new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })} • CupidScore Atelier`, width / 2, 1405);

  }, [result, cardTheme]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `CupidScore-Love-Card-${result.name1}-and-${result.name2}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !navigator.clipboard) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2000);
      });
    } catch (err) {
      console.warn('Clipboard write image not supported in this browser:', err);
    }
  };

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?n1=${encodeURIComponent(result.name1)}&n2=${encodeURIComponent(result.name2)}`
    : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareText = `Our Love Compatibility Score is ${result.percent}% (${result.details.tier}) on CupidScore!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl my-4 sm:my-8 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 max-h-[94dvh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white mb-2 shadow-md shadow-rose-500/25">
            <Share2 className="w-5 h-5" />
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight">
            High-Precision Love Card
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Crafted with editorial golden-ratio proportions and precision filigree
          </p>
        </div>

        {/* Theme Finish Selector */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setCardTheme('midnight')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              cardTheme === 'midnight'
                ? 'bg-slate-900 text-amber-300 border-amber-400/80 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200'
            }`}
          >
            Midnight Velvet
          </button>
          <button
            onClick={() => setCardTheme('rose')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              cardTheme === 'rose'
                ? 'bg-rose-50 text-rose-700 border-rose-400 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200'
            }`}
          >
            Rose Silk
          </button>
          <button
            onClick={() => setCardTheme('parchment')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              cardTheme === 'parchment'
                ? 'bg-[#fcf8f0] text-amber-900 border-amber-500 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200'
            }`}
          >
            Royal Atelier
          </button>
        </div>

        {/* High Definition Card Preview */}
        <div className="flex justify-center my-2">
          <canvas
            ref={canvasRef}
            className="w-full max-w-[340px] sm:max-w-[380px] rounded-2xl shadow-2xl border border-rose-200/50 dark:border-rose-900/50 aspect-[4/5] object-contain"
          />
        </div>

        {/* Actions & Export */}
        <div className="mt-5 space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-600 active:scale-95 shadow-md shadow-rose-500/25 transition-all cursor-pointer tracking-wide"
            >
              <Download className="w-4 h-4" />
              <span>Download Ultra-HD (PNG)</span>
            </button>

            <button
              onClick={handleCopyImage}
              className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl font-medium text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 border border-slate-200 dark:border-slate-700 cursor-pointer transition-all"
            >
              {copiedImage ? <Check className="w-4 h-4 text-emerald-500" /> : <ImageIcon className="w-4 h-4 text-slate-500" />}
              <span>{copiedImage ? 'Image Copied!' : 'Copy Image to Clipboard'}</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-medium text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copiedLink ? 'Link Copied' : 'Copy Direct Link'}</span>
            </button>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 inline-flex items-center"
            >
              WhatsApp
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/60 inline-flex items-center"
            >
              X
            </a>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-medium text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
