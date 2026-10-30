import React, { useEffect, useRef, useState } from 'react';
import CupidLogo from './CupidLogo';
import { X, Download, Share2, Copy, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

function formatName(str) {
  if (!str) return '';
  return str
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export default function ShareCardModal({ isOpen, onClose, result }) {
  if (!isOpen || !result) return null;

  const canvasRef = useRef(null);
  const cardPreviewRef = useRef(null);
  const [cardTheme, setCardTheme] = useState('midnight'); // 'midnight' | 'rose' | 'parchment'
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  const formattedName1 = formatName(result.name1);
  const formattedName2 = formatName(result.name2);

  const pillars = result.pillars || {
    emotional: result.percent,
    chemistry: Math.min(100, Math.max(20, result.percent + 2)),
    intellectual: Math.min(100, Math.max(20, result.percent - 3)),
    enduring: Math.min(100, Math.max(20, result.percent + 4)),
  };

  const serialId = `CS-${String(result.percent * 137).slice(-4)}`;
  const currentDate = new Date().toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Bulletproof Canvas Renderer for High-DPI Image Export (Zero Path Bleed, No Yellow Wedges!)
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = 1200;
    const height = 1500;
    canvas.width = width;
    canvas.height = height;

    const themeStyles = {
      midnight: {
        bgStart: '#160a22',
        bgMid: '#0e0517',
        bgEnd: '#08030d',
        gold: '#d97706',
        goldLight: '#fbbf24',
        goldHairline: 'rgba(251, 191, 36, 0.35)',
        textWhite: '#ffffff',
        textMuted: '#fce7f3',
        cardSurface: 'rgba(255, 255, 255, 0.04)',
        cardBorder: 'rgba(251, 191, 36, 0.2)',
        barTrack: 'rgba(255, 255, 255, 0.08)',
        barFill: '#f43f5e',
        sealBg: '#881337',
        sealText: '#fbbf24',
      },
      rose: {
        bgStart: '#fff1f4',
        bgMid: '#ffe4ea',
        bgEnd: '#ffdce4',
        gold: '#be123c',
        goldLight: '#e11d48',
        goldHairline: 'rgba(225, 29, 72, 0.3)',
        textWhite: '#4c0519',
        textMuted: '#881337',
        cardSurface: 'rgba(255, 255, 255, 0.7)',
        cardBorder: 'rgba(225, 29, 72, 0.2)',
        barTrack: 'rgba(225, 29, 72, 0.1)',
        barFill: '#e11d48',
        sealBg: '#9f1239',
        sealText: '#fff1f2',
      },
      parchment: {
        bgStart: '#fbf7ee',
        bgMid: '#f4ebd5',
        bgEnd: '#eee0c4',
        gold: '#b45309',
        goldLight: '#d97706',
        goldHairline: 'rgba(180, 83, 9, 0.3)',
        textWhite: '#291305',
        textMuted: '#5e2b08',
        cardSurface: 'rgba(255, 255, 255, 0.55)',
        cardBorder: 'rgba(180, 83, 9, 0.22)',
        barTrack: 'rgba(180, 83, 9, 0.12)',
        barFill: '#b45309',
        sealBg: '#78350f',
        sealText: '#fef3c7',
      },
    };

    const s = themeStyles[cardTheme] || themeStyles.midnight;

    // Helper: Safely draw a rounded rectangle with clean isolated path
    const safeRoundRect = (x, y, w, h, r, fillColor, strokeColor, strokeW = 1) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      if (strokeColor) {
        ctx.lineWidth = strokeW;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
      }
    };

    // 1. Background Fill
    ctx.beginPath();
    const bgGrad = ctx.createRadialGradient(width / 2, height * 0.4, 100, width / 2, height / 2, 900);
    bgGrad.addColorStop(0, s.bgStart);
    bgGrad.addColorStop(0.6, s.bgMid);
    bgGrad.addColorStop(1, s.bgEnd);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Dual Gold Guilloché Filigree Borders
    const m1 = 44;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = s.goldHairline;
    ctx.strokeRect(m1, m1, width - m1 * 2, height - m1 * 2);

    const m2 = 56;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = s.goldHairline;
    ctx.strokeRect(m2, m2, width - m2 * 2, height - m2 * 2);

    // Corner flourishes
    const corners = [
      [m1 + 18, m1 + 18],
      [width - m1 - 18, m1 + 18],
      [m1 + 18, height - m1 - 18],
      [width - m1 - 18, height - m1 - 18],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.fillStyle = s.goldLight;
      ctx.font = '22px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', cx, cy);
    });

    // 3. Header Insignia
    ctx.textAlign = 'center';
    ctx.beginPath();
    ctx.fillStyle = s.goldLight;
    ctx.font = '22px serif';
    ctx.fillText('❦', width / 2, 110);

    ctx.beginPath();
    ctx.fillStyle = s.goldLight;
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('C U P I D S C O R E', width / 2, 142);

    ctx.beginPath();
    ctx.fillStyle = s.textMuted;
    ctx.font = 'italic 16px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Soul Compatibility Atelier', width / 2, 168);

    // Subtle divider line
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = s.goldHairline;
    ctx.moveTo(width / 2 - 140, 188);
    ctx.lineTo(width / 2 + 140, 188);
    ctx.stroke();

    // 4. Prominent Couple Names
    ctx.beginPath();
    ctx.fillStyle = s.textWhite;
    ctx.font = 'bold 56px "Italiana", "Playfair Display", Georgia, serif';
    ctx.fillText(formattedName1, width / 2, 260);

    ctx.beginPath();
    ctx.fillStyle = s.goldLight;
    ctx.font = 'italic 36px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('&', width / 2, 310);

    ctx.beginPath();
    ctx.fillStyle = s.textWhite;
    ctx.font = 'bold 56px "Italiana", "Playfair Display", Georgia, serif';
    ctx.fillText(formattedName2, width / 2, 375);

    // 5. Central Circular Ring Gauge (Guaranteed Zero Path Bleed!)
    const gaugeX = width / 2;
    const gaugeY = 530;
    const gaugeR = 100;

    // Background track
    ctx.beginPath();
    ctx.arc(gaugeX, gaugeY, gaugeR, 0, Math.PI * 2);
    ctx.lineWidth = 12;
    ctx.strokeStyle = s.barTrack;
    ctx.stroke();

    // Active progress arc
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (result.percent / 100) * (Math.PI * 2);
    ctx.beginPath();
    ctx.arc(gaugeX, gaugeY, gaugeR, startAngle, endAngle);
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.strokeStyle = s.barFill;
    ctx.stroke();

    // Center Percentage
    ctx.beginPath();
    ctx.fillStyle = s.textWhite;
    ctx.font = 'bold 74px "Italiana", "Playfair Display", Georgia, serif';
    ctx.fillText(`${result.percent}%`, gaugeX, gaugeY + 14);

    // Tier Underline Plaque
    ctx.beginPath();
    ctx.fillStyle = s.textWhite;
    ctx.font = 'bold 28px "Italiana", "Playfair Display", Georgia, serif';
    ctx.fillText(result.details.tier, width / 2, 690);

    safeRoundRect(width / 2 - 130, 715, 260, 32, 16, s.cardSurface, s.cardBorder, 1);
    ctx.beginPath();
    ctx.fillStyle = s.goldLight;
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(result.details.badge.toUpperCase(), width / 2, 735);

    // 6. Four-Pillar Precision Grid
    const gridW = 860;
    const gridH = 175;
    const gridX = width / 2 - gridW / 2;
    const gridY = 785;

    safeRoundRect(gridX, gridY, gridW, gridH, 20, s.cardSurface, s.cardBorder, 1);

    const pillarItems = [
      { label: 'Emotional Resonance', val: pillars.emotional },
      { label: 'Magnetic Chemistry', val: pillars.chemistry },
      { label: 'Intellectual Flow', val: pillars.intellectual },
      { label: 'Enduring Harmony', val: pillars.enduring },
    ];

    pillarItems.forEach((p, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const px = gridX + 45 + col * 410;
      const py = gridY + 45 + row * 72;

      ctx.beginPath();
      ctx.textAlign = 'left';
      ctx.fillStyle = s.textMuted;
      ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(p.label, px, py);

      ctx.beginPath();
      ctx.textAlign = 'right';
      ctx.fillStyle = s.textWhite;
      ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`${p.val}%`, px + 350, py);

      // Track bar
      const barW = 350;
      const barH = 5;
      const barY = py + 12;
      safeRoundRect(px, barY, barW, barH, 2.5, s.barTrack, null);

      // Fill bar
      const filledW = (p.val / 100) * barW;
      safeRoundRect(px, barY, filledW, barH, 2.5, s.barFill, null);
    });

    // 7. Poetic Quotation
    ctx.textAlign = 'center';
    ctx.beginPath();
    ctx.fillStyle = s.textMuted;
    ctx.font = 'italic 25px "Cormorant Garamond", Georgia, serif';

    const words = result.details.summary.split(' ');
    let line = '';
    let qy = 1045;
    const maxLineW = 840;

    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + ' ';
      const metrics = ctx.measureText(test);
      if (metrics.width > maxLineW && i > 0) {
        ctx.beginPath();
        ctx.fillText(line, width / 2, qy);
        line = words[i] + ' ';
        qy += 40;
      } else {
        line = test;
      }
    }
    ctx.beginPath();
    ctx.fillText(line, width / 2, qy);

    // 8. Bottom Seal & Monogram
    const sealX = width / 2;
    const sealY = 1270;
    const sealR = 45;

    safeRoundRect(sealX - sealR, sealY - sealR, sealR * 2, sealR * 2, sealR, s.sealBg, s.goldHairline, 1.5);
    ctx.beginPath();
    ctx.fillStyle = s.sealText;
    ctx.font = 'bold 24px "Italiana", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❦', sealX, sealY);

    // 9. Serial Number & Authenticated Stamp
    ctx.beginPath();
    ctx.fillStyle = s.goldLight;
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`AUTHENTICATED ATELIER RECORD • NO. ${serialId}`, width / 2, 1365);

    ctx.beginPath();
    ctx.fillStyle = s.goldHairline;
    ctx.font = 'italic 14px "Cormorant Garamond", serif';
    ctx.fillText(`Issued on ${currentDate} • CupidScore Atelier`, width / 2, 1395);
  };

  useEffect(() => {
    renderCanvas();
  }, [result, cardTheme]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `CupidScore-${formattedName1}-and-${formattedName2}.png`;
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

  // Dynamic Theme CSS for the Interactive Live Card Preview
  const previewThemes = {
    midnight: {
      cardBg: 'bg-gradient-to-b from-[#160a22] via-[#0e0517] to-[#08030d] text-rose-100 border-amber-500/30',
      innerBorder: 'border-rose-500/20',
      goldText: 'text-amber-400',
      titleText: 'text-white',
      mutedText: 'text-rose-200/80',
      barBg: 'bg-white/10',
      barFill: 'bg-gradient-to-r from-rose-500 to-amber-400',
      ringColor: '#f43f5e',
      plaqueBg: 'bg-white/5 border-amber-500/20 text-amber-300',
      sealBg: 'bg-rose-950 border-amber-500/40 text-amber-300',
      surfaceBg: 'bg-white/[0.03] border-white/10',
    },
    rose: {
      cardBg: 'bg-gradient-to-b from-[#fff1f4] via-[#ffe4ea] to-[#ffdce4] text-rose-950 border-rose-300',
      innerBorder: 'border-rose-400/25',
      goldText: 'text-rose-700',
      titleText: 'text-rose-950',
      mutedText: 'text-rose-800/80',
      barBg: 'bg-rose-900/10',
      barFill: 'bg-gradient-to-r from-rose-600 to-pink-500',
      ringColor: '#e11d48',
      plaqueBg: 'bg-rose-500/10 border-rose-400/30 text-rose-800',
      sealBg: 'bg-rose-700 border-rose-300 text-rose-100',
      surfaceBg: 'bg-white/70 border-rose-200/60 shadow-xs',
    },
    parchment: {
      cardBg: 'bg-gradient-to-b from-[#fbf7ee] via-[#f4ebd5] to-[#eee0c4] text-amber-950 border-amber-400/50',
      innerBorder: 'border-amber-600/20',
      goldText: 'text-amber-800',
      titleText: 'text-[#291305]',
      mutedText: 'text-amber-900/80',
      barBg: 'bg-amber-950/10',
      barFill: 'bg-gradient-to-r from-amber-600 to-amber-500',
      ringColor: '#b45309',
      plaqueBg: 'bg-amber-500/10 border-amber-600/30 text-amber-900',
      sealBg: 'bg-amber-900 border-amber-300 text-amber-100',
      surfaceBg: 'bg-white/60 border-amber-200/80 shadow-xs',
    },
  };

  const pt = previewThemes[cardTheme] || previewThemes.midnight;

  // SVG circular gauge math for live preview
  const previewRadius = 42;
  const previewCircumference = 2 * Math.PI * previewRadius;
  const previewOffset = previewCircumference - (result.percent / 100) * previewCircumference;

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
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight">
            The Love Card Atelier
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Refined editorial layout with authentic typography, zero clutter, and high-DPI export
          </p>
        </div>

        {/* Theme Switcher Pills */}
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

        {/* Real Live Pixel-Perfect CSS Preview Card (Guaranteed Flawless Rendering!) */}
        <div className="flex justify-center my-2">
          <div
            ref={cardPreviewRef}
            className={`w-full max-w-[360px] sm:max-w-[390px] rounded-2xl p-6 shadow-2xl border relative flex flex-col justify-between aspect-[4/5] select-none transition-all duration-300 ${pt.cardBg}`}
          >
            {/* Inner Hairline Filigree Frame */}
            <div className={`absolute inset-2.5 rounded-xl border pointer-events-none ${pt.innerBorder}`} />

            {/* Corner Asterisks */}
            <span className={`absolute top-4 left-4 text-xs ${pt.goldText}`}>✦</span>
            <span className={`absolute top-4 right-4 text-xs ${pt.goldText}`}>✦</span>
            <span className={`absolute bottom-4 left-4 text-xs ${pt.goldText}`}>✦</span>
            <span className={`absolute bottom-4 right-4 text-xs ${pt.goldText}`}>✦</span>

            {/* 1. Header Insignia */}
            <div className="text-center pt-1.5 relative z-10 flex flex-col items-center">
              <div className="mb-0.5">
                <CupidLogo size={32} variant="icon" animated={false} />
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-[0.25em] block ${pt.goldText}`}>
                C U P I D S C O R E
              </span>
              <span className={`text-[11px] font-cormorant italic block opacity-75 ${pt.mutedText}`}>
                Soul Compatibility Atelier
              </span>
              <div className="w-16 h-px bg-current opacity-25 mx-auto mt-1.5" />
            </div>

            {/* 2. Prominent Couple Names */}
            <div className="text-center my-1 relative z-10">
              <h3 className={`font-editorial text-2xl sm:text-3xl font-bold tracking-tight leading-tight ${pt.titleText}`}>
                {formattedName1}
              </h3>
              <span className={`font-cormorant italic text-lg leading-none block my-0.5 ${pt.goldText}`}>
                &
              </span>
              <h3 className={`font-editorial text-2xl sm:text-3xl font-bold tracking-tight leading-tight ${pt.titleText}`}>
                {formattedName2}
              </h3>
            </div>

            {/* 3. Circular Score Gauge */}
            <div className="flex flex-col items-center justify-center my-1 relative z-10">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={previewRadius}
                    className="opacity-15 stroke-current"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={previewRadius}
                    stroke={pt.ringColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="transparent"
                    strokeDasharray={previewCircumference}
                    strokeDashoffset={previewOffset}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`font-editorial text-3xl font-black ${pt.titleText}`}>
                    {result.percent}%
                  </span>
                </div>
              </div>

              <div className="mt-2 text-center">
                <h4 className={`font-editorial text-base font-bold ${pt.titleText}`}>
                  {result.details.tier}
                </h4>
                <div className={`inline-block px-3 py-0.5 mt-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${pt.plaqueBg}`}>
                  {result.details.badge}
                </div>
              </div>
            </div>

            {/* 4. Four-Pillar Precision Grid */}
            <div className={`p-3 rounded-xl border relative z-10 ${pt.surfaceBg}`}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <div className="flex justify-between text-[10px] font-medium mb-0.5 opacity-80">
                    <span>Emotional</span>
                    <span className="font-bold">{pillars.emotional}%</span>
                  </div>
                  <div className={`w-full h-1 rounded-full overflow-hidden ${pt.barBg}`}>
                    <div className={`h-full rounded-full ${pt.barFill}`} style={{ width: `${pillars.emotional}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-medium mb-0.5 opacity-80">
                    <span>Chemistry</span>
                    <span className="font-bold">{pillars.chemistry}%</span>
                  </div>
                  <div className={`w-full h-1 rounded-full overflow-hidden ${pt.barBg}`}>
                    <div className={`h-full rounded-full ${pt.barFill}`} style={{ width: `${pillars.chemistry}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-medium mb-0.5 opacity-80">
                    <span>Mind Sync</span>
                    <span className="font-bold">{pillars.intellectual}%</span>
                  </div>
                  <div className={`w-full h-1 rounded-full overflow-hidden ${pt.barBg}`}>
                    <div className={`h-full rounded-full ${pt.barFill}`} style={{ width: `${pillars.intellectual}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-medium mb-0.5 opacity-80">
                    <span>Longevity</span>
                    <span className="font-bold">{pillars.enduring}%</span>
                  </div>
                  <div className={`w-full h-1 rounded-full overflow-hidden ${pt.barBg}`}>
                    <div className={`h-full rounded-full ${pt.barFill}`} style={{ width: `${pillars.enduring}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Poetic Decree */}
            <p className={`font-cormorant italic text-xs sm:text-sm text-center leading-relaxed px-2 my-1 relative z-10 ${pt.mutedText}`}>
              "{result.details.summary}"
            </p>

            {/* 6. Seal & Monogram Footer */}
            <div className="flex flex-col items-center pb-2 relative z-10">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center p-0.5 shadow-sm mb-1 ${pt.sealBg}`}>
                <CupidLogo size={22} variant="icon" animated={false} />
              </div>
              <span className={`text-[9px] font-bold tracking-wider uppercase ${pt.goldText}`}>
                AUTHENTICATED RECORD • NO. {serialId}
              </span>
              <span className={`text-[8px] font-cormorant italic opacity-70 ${pt.mutedText}`}>
                Issued on {currentDate} • CupidScore Atelier
              </span>
            </div>
          </div>
        </div>

        {/* Hidden Canvas used for high-res 1200x1500px download/clipboard export */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Action Buttons */}
        <div className="mt-5 space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleDownload}
              className="group flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-white btn-romantic-primary cursor-pointer tracking-wide"
            >
              <Download className="w-4 h-4 btn-icon-bounce" />
              <span>Download Ultra-HD (PNG)</span>
            </button>

            <button
              onClick={handleCopyImage}
              className="group flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl font-medium text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 btn-romantic-secondary border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              {copiedImage ? <Check className="w-4 h-4 text-emerald-500" /> : <ImageIcon className="w-4 h-4 text-slate-500 btn-icon-bounce" />}
              <span>{copiedImage ? 'Image Copied to Clipboard!' : 'Copy Image to Clipboard'}</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="group flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-medium text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 btn-romantic-pill border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500 btn-icon-bounce" />}
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
