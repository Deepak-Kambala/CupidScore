import React from 'react';
import { Sparkles, Users, Music, Mail, Disc, ShieldCheck, Heart, Compass } from 'lucide-react';

export default function FeaturesGrid({
  onOpenPersonality,
  onOpenSong,
  onOpenLetter,
  onOpenSpinner,
  onOpenAbout,
}) {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5 text-rose-500" />,
      title: 'Vedic Numerology & Tattvas',
      desc: 'Authentic vibrational analysis governed by the Navagrahas and Pancha Mahabhuta (Panchangam elements).',
      actionText: 'Explore Vedic Science',
      onClick: onOpenAbout,
      gradient: 'from-rose-500/10 to-pink-500/10',
    },
    {
      icon: <Users className="w-5 h-5 text-pink-500" />,
      title: 'Personality Archetypes',
      desc: 'Discover your expression vibration, love languages, and complimentary partner dynamics.',
      actionText: 'View Archetypes',
      onClick: onOpenPersonality,
      gradient: 'from-pink-500/10 to-purple-500/10',
    },
    {
      icon: <Music className="w-5 h-5 text-amber-500" />,
      title: 'Couple’s Anthem Soundtrack',
      desc: 'Personalized song recommendations paired perfectly to your romantic frequency.',
      actionText: 'Hear Your Song',
      onClick: onOpenSong,
      gradient: 'from-amber-500/10 to-rose-500/10',
    },
    {
      icon: <Mail className="w-5 h-5 text-rose-500" />,
      title: 'Love Letter Generator',
      desc: 'Craft tender handwritten-style notes with custom stationery, wax seals, and PNG export.',
      actionText: 'Write a Letter',
      onClick: onOpenLetter,
      gradient: 'from-rose-500/10 to-pink-500/10',
    },
    {
      icon: <Disc className="w-5 h-5 text-purple-500" />,
      title: 'Wheel of Love Spinner',
      desc: 'Spin for romantic date night dares, massage coupons, and sweet gestures.',
      actionText: 'Spin the Wheel',
      onClick: onOpenSpinner,
      gradient: 'from-purple-500/10 to-indigo-500/10',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: '100% Private & Client-Side',
      desc: 'Your names and romantic notes stay entirely private on your device. Zero tracking.',
      actionText: 'Privacy Details',
      onClick: onOpenAbout,
      gradient: 'from-emerald-500/10 to-teal-500/10',
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto my-16 px-4">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-rose-500">
          Romantic Experiences
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mt-1">
          Designed with Pure Devotion
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-light">
          Everything you need to celebrate, deepen, and enjoy your connection
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="group relative rounded-3xl p-5 sm:p-6 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-rose-100 dark:border-rose-950/40 hover:border-rose-300 dark:hover:border-rose-800 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/5 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-editorial text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                {f.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                {f.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-rose-50 dark:border-slate-800/80">
              <button
                onClick={f.onClick}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 group-hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <span>{f.actionText}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

