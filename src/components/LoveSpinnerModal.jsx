import React, { useState, useEffect, useRef } from 'react';
import { X, Disc, Sparkles, Trophy, Heart, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WHEEL_ITEMS } from '../data/wheelItems';
import { playTick, playRomanticChime } from '../utils/sound';

export default function LoveSpinnerModal({ isOpen, onClose, soundEnabled, confettiEnabled }) {
  if (!isOpen) return null;

  const canvasRef = useRef(null);
  const [points, setPoints] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  const numSlices = WHEEL_ITEMS.length;
  const arcSize = (2 * Math.PI) / numSlices;

  // Title based on score
  const getLoveTitle = (pts) => {
    if (pts >= 250) return "Master of Romance";
    if (pts >= 150) return 'Devoted Soulmate';
    if (pts >= 80) return 'Enchanted Sweetheart';
    return 'Playful Flirt';
  };

  // Draw the wheel onto canvas
  const drawWheel = (angle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 14;

    ctx.clearRect(0, 0, width, height);

    // Slices
    WHEEL_ITEMS.forEach((item, i) => {
      const sliceAngle = angle + i * arcSize;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, sliceAngle, sliceAngle + arcSize);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Text & Icon
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(sliceAngle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(`${item.icon} ${item.title.substring(0, 13)}`, radius - 16, 4);
      ctx.restore();
    });

    // Center hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 8;
    ctx.fill();

    ctx.fillStyle = '#e11d48';
    ctx.font = 'bold 20px "Italiana", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❦', centerX, centerY);
  };

  useEffect(() => {
    drawWheel(rotationAngle);
  }, [rotationAngle]);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedItem(null);

    const extraRotations = (4 + Math.floor(Math.random() * 3)) * (2 * Math.PI);
    const targetSlice = Math.floor(Math.random() * numSlices);
    const targetSliceAngle = (3 * Math.PI) / 2 - (targetSlice * arcSize + arcSize / 2);
    const totalTargetAngle = rotationAngle + extraRotations + (targetSliceAngle - (rotationAngle % (2 * Math.PI)));

    const duration = 3800;
    const start = performance.now();
    const initialAngle = rotationAngle;
    let lastTickSlice = -1;

    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = initialAngle + (totalTargetAngle - initialAngle) * ease;

      setRotationAngle(current);

      const currentSlice = Math.floor((current / arcSize) % numSlices);
      if (currentSlice !== lastTickSlice) {
        lastTickSlice = currentSlice;
        playTick(soundEnabled);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const item = WHEEL_ITEMS[targetSlice];
        setSelectedItem(item);
        setPoints((prev) => prev + item.points);
        playRomanticChime(soundEnabled);

        if (confettiEnabled) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#fb7185', '#fbbf24'],
          });
        }
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-lg my-4 sm:my-8 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 shadow-2xl border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 max-h-[92dvh] overflow-y-auto text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-3">
          <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 text-white mb-2 shadow-md shadow-rose-500/25">
            <Disc className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold">
            Spin the Wheel of Love
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Romantic dares, sweet moments, and couple coupons
          </p>
        </div>

        {/* Score & Title Bar */}
        <div className="flex items-center justify-center gap-4 py-2 px-4 mb-3 rounded-xl bg-rose-50 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 max-w-sm mx-auto text-xs font-semibold">
          <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{points} pts</span>
          </div>
          <div className="h-3.5 w-px bg-rose-200 dark:bg-slate-700" />
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>{getLoveTitle(points)}</span>
          </div>
        </div>

        {/* Wheel Canvas Container (scaled cleanly for small screens) */}
        <div className="relative flex justify-center items-center my-3">
          {/* Top Pointer arrow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 -mt-2">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-rose-600 drop-shadow-md" />
          </div>

          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] rounded-full shadow-xl border-4 border-white dark:border-slate-800"
          />
        </div>

        {/* Spin Action */}
        <div className="mt-3">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="px-8 py-3 rounded-2xl font-bold text-white text-xs sm:text-sm bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-600 active:scale-95 shadow-lg shadow-rose-500/30 transition-all cursor-pointer disabled:opacity-50 min-w-[180px] tracking-wide"
          >
            {isSpinning ? 'Spinning Destiny...' : 'Spin Wheel'}
          </button>
        </div>

        {/* Selected Result Box */}
        {selectedItem && (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-850 border border-rose-200/80 dark:border-rose-900/50 max-w-sm mx-auto text-center space-y-1.5 animate-bounce-short">
            <span className="text-2xl">{selectedItem.icon}</span>
            <h4 className="font-editorial text-base sm:text-lg font-bold text-rose-700 dark:text-rose-300">
              {selectedItem.title} (+{selectedItem.points} pts)
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-200 italic leading-relaxed">
              "{selectedItem.text}"
            </p>
          </div>
        )}

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
