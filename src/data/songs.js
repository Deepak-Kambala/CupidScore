// Couple Song Recommendations by compatibility score

export const SONG_DATABASE = [
  {
    range: [90, 100],
    title: 'Perfect',
    artist: 'Ed Sheeran',
    mood: 'Cosmic & Timeless',
    tag: 'Ethereal Soulmates 💫',
    quote: '"I found a love to carry more than just my secrets..."',
    youtubeUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
    videoId: '2Vv-BfVoq4g',
  },
  {
    range: [80, 89],
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    mood: 'Passionate & Devoted',
    tag: 'Deep Romantic Flame 🔥',
    quote: '"Take me into your loving arms, kiss me under the light of a thousand stars..."',
    youtubeUrl: 'https://www.youtube.com/watch?v=lp-EO5I60KA',
    videoId: 'lp-EO5I60KA',
  },
  {
    range: [70, 79],
    title: "Can't Help Falling in Love",
    artist: 'Elvis Presley / Kina Grannis',
    mood: 'Tender & Irresistible',
    tag: 'Sweet Falling 🌹',
    quote: '"Like a river flows surely to the sea, darling so it goes..."',
    youtubeUrl: 'https://www.youtube.com/watch?v=vGJTaP6anOU',
    videoId: 'vGJTaP6anOU',
  },
  {
    range: [60, 69],
    title: 'Love Story',
    artist: 'Taylor Swift',
    mood: 'Playful & Romantic',
    tag: 'Fairytale Chapter 💕',
    quote: '"It\'s a love story, baby, just say yes..."',
    youtubeUrl: 'https://www.youtube.com/watch?v=8xg3vE8Ie_E',
    videoId: '8xg3vE8Ie_E',
  },
  {
    range: [50, 59],
    title: 'Rather Be',
    artist: 'Clean Bandit ft. Jess Glynne',
    mood: 'Vibrant & Uplifting',
    tag: 'Joyful Connection ✨',
    quote: '"When I am with you, there\'s no place I\'d rather be..."',
    youtubeUrl: 'https://www.youtube.com/watch?v=m-M1AtrxztU',
    videoId: 'm-M1AtrxztU',
  },
  {
    range: [40, 49],
    title: 'Style',
    artist: 'Taylor Swift',
    mood: 'Intriguing & Magnetic',
    tag: 'Curious Dynamic 💋',
    quote: '"We never go out of style..."',
    youtubeUrl: 'https://www.youtube.com/watch?v=-CmadmM5cOk',
    videoId: '-CmadmM5cOk',
  },
  {
    range: [30, 39],
    title: 'Just Give Me a Reason',
    artist: 'P!nk ft. Nate Ruess',
    mood: 'Honest & Hopeful',
    tag: 'Growing Bond 🌱',
    quote: '"We\'re not broken, just bent, and we can learn to love again..."',
    youtubeUrl: 'https://www.youtube.com/watch?v=OpQFFLBMEPI',
    videoId: 'OpQFFLBMEPI',
  },
  {
    range: [0, 29],
    title: "You've Got a Friend in Me",
    artist: 'Randy Newman',
    mood: 'Warm & Steadfast',
    tag: 'Cherished Friendship 🤝',
    quote: '"When the road looks rough ahead, you just remember what your old pal said..."',
    youtubeUrl: 'https://www.youtube.com/watch?v=DNZUKm0ApEM',
    videoId: 'DNZUKm0ApEM',
  },
];

export function getSongForScore(percent) {
  const score = Math.max(0, Math.min(100, Math.round(percent)));
  const found = SONG_DATABASE.find((s) => score >= s.range[0] && score <= s.range[1]);
  return found || SONG_DATABASE[0];
}

