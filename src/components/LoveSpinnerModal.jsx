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
    if (pts >= 250) return "Cupid's Champion 👑";
    if (pts >= 150) return 'Hopeless Romantic 💖';
    if (pts >= 80) return 'Passionate Sweetheart 💕';
    return 'Playful Flirt ✨';
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
    const radius = width / 2 - 16;

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
      ctx.fillText(`${item.icon} ${item.title.substring(0, 14)}`, radius - 20, 5);
      ctx.restore();
    });

    // Center hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, 32, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 10;
    ctx.fill();

    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖', centerX, centerY);
  };

  useEffect(() => {
    drawWheel(rotationAngle);
  }, [rotationAngle]);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedItem(null);

    // Random spin: 4 to 7 full rotations plus random landing slice
    const extraRotations = (4 + Math.floor(Math.random() * 3)) * (2 * Math.PI);
    const targetSlice = Math.floor(Math.random() * numSlices);
    // Wheel pointer points to top (angle = 3 * Math.PI / 2)
    const targetSliceAngle = (3 * Math.PI) / 2 - (targetSlice * arcSize + arcSize / 2);
    const totalTargetAngle = rotationAngle + extraRotations + (targetSliceAngle - (rotationAngle % (2 * Math.PI)));

    const duration = 4000;
    const start = performance.now();
    const initialAngle = rotationAngle;
    let lastTickSlice = -1;

    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      // Decelerate cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = initialAngle + (totalTargetAngle - initialAngle) * ease;

      setRotationAngle(current);

      // Sound tick on passing each slice
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 text-white mb-2 shadow-md shadow-rose-500/25">
            <Disc className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Spin the Wheel of Love
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Romantic dares, sweet moments, and love tokens for you and your partner
          </p>
        </div>

        {/* Score & Title Bar */}
        <div className="flex items-center justify-center gap-6 py-2 px-4 mb-4 rounded-xl bg-rose-50 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 max-w-md mx-auto text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
            <Heart className="w-4 h-4 fill-current" />
            <span>{points} Love Points</span>
          </div>
          <div className="h-4 w-px bg-rose-200 dark:bg-slate-700" />
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
            <Trophy className="w-4 h-4" />
            <span>{getLoveTitle(points)}</span>
          </div>
        </div>

        {/* Wheel Canvas Container */}
        <div className="relative flex justify-center items-center my-4">
          {/* Top Pointer arrow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 -mt-2">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-rose-600 drop-shadow-md" />
          </div>

          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            className="rounded-full shadow-xl border-4 border-white dark:border-slate-800"
          />
        </div>

        {/* Spin Action */}
        <div className="mt-4">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-600 active:scale-95 shadow-lg shadow-rose-500/30 transition-all cursor-pointer disabled:opacity-50 min-w-[200px]"
          >
            {isSpinning ? 'Spinning Destiny...' : 'Spin the Wheel 💕'}
          </button>
        </div>

        {/* Selected Result Box */}
        {selectedItem && (
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-850 border border-rose-200/80 dark:border-rose-900/50 max-w-md mx-auto text-center space-y-2 animate-bounce-short">
            <span className="text-3xl">{selectedItem.icon}</span>
            <h4 className="font-serif text-lg font-bold text-rose-700 dark:text-rose-300">
              {selectedItem.title} (+{selectedItem.points} pts)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">
              "{selectedItem.text}"
            </p>
          </div>
        )}

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

