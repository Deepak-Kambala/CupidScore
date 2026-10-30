// Numerology & Compatibility Engine (Pythagorean)

export const LETTER_MAP = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

export function isValidName(name) {
  if (!name || typeof name !== 'string') return false;
  const cleaned = name.trim();
  return cleaned.length >= 2 && /^[a-zA-Z\s'-]+$/.test(cleaned);
}

export function nameToNumber(name, supportMaster = true) {
  if (!name) return 0;
  const upper = name.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;
  for (let i = 0; i < upper.length; i++) {
    sum += LETTER_MAP[upper[i]] || 0;
  }

  if (supportMaster) {
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum
        .toString()
        .split('')
        .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
  } else {
    while (sum > 9) {
      sum = sum
        .toString()
        .split('')
        .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
  }
  return sum || 0;
}

export function combineNumbers(num1, num2, supportMaster = true) {
  let combined = num1 + num2;
  if (supportMaster) {
    while (combined > 9 && combined !== 11 && combined !== 22 && combined !== 33) {
      combined = combined
        .toString()
        .split('')
        .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
  } else {
    while (combined > 9) {
      combined = combined
        .toString()
        .split('')
        .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
  }
  return combined;
}

export function mapToPercent(combined, num1, num2) {
  let base;
  if (combined === 11) base = 95;
  else if (combined === 22) base = 98;
  else if (combined === 33) base = 99;
  else base = 35 + combined * 6.5;

  // Synergies and harmonies
  if (num1 === num2 && num1 !== 0) base += 7; // Identical soul vibration
  if ([11, 22, 33].includes(num1) || [11, 22, 33].includes(num2)) base += 6; // Master resonance
  if (combined === 1) base = 93;
  if (combined === 7) base += 8;

  // Clamp within 1-100
  return Math.min(100, Math.max(12, Math.round(base)));
}

export const PERSONALITY_TRAITS = {
  1: {
    name: 'The Sovereign Leader',
    icon: '👑',
    traits: ['Independent', 'Ambitious', 'Confident', 'Pioneering', 'Magnetic'],
    strengths: ['Natural leader', 'Unwavering drive', 'Bold romantic gestures', 'Fiercely protective'],
    challenges: ['Can be stubborn', 'Needs independence', 'Dislikes vulnerability early on'],
    loveStyle: 'Passionate, bold, and direct. Desires an equal partner who stands tall beside them.',
    compatibility: 'Thrives with numbers 2, 5, and 7',
  },
  2: {
    name: 'The Gentle Empath',
    icon: '🕊️',
    traits: ['Intuitive', 'Devoted', 'Peaceful', 'Empathetic', 'Harmonious'],
    strengths: ['Incredible listener', 'Deep emotional intimacy', 'Loyal to the end', 'Gentle touch'],
    challenges: ['Sensitive to discord', 'Can bottle feelings', 'Needs constant reassurance'],
    loveStyle: 'Deeply romantic, tender, and caring. Seeks poetic heart-to-heart soul connections.',
    compatibility: 'Thrives with numbers 1, 4, and 8',
  },
  3: {
    name: 'The Radiant Muse',
    icon: '🎨',
    traits: ['Expressive', 'Charming', 'Playful', 'Vibrant', 'Imaginative'],
    strengths: ['Brings endless laughter', 'Inspires creativity', 'Heartwarming optimism', 'Spontaneous'],
    challenges: ['Can scatter energy', 'Fears boredom', 'Sometimes hides pain behind smiles'],
    loveStyle: 'Flirty, joyful, and captivating. Treats romance like a vibrant work of art.',
    compatibility: 'Thrives with numbers 5, 6, and 9',
  },
  4: {
    name: 'The Loyal Anchor',
    icon: '🏰',
    traits: ['Devoted', 'Grounded', 'Steadfast', 'Honest', 'Dependable'],
    strengths: ['Rock-solid fidelity', 'Builds lasting comfort', 'Always keeps promises', 'Calming presence'],
    challenges: ['Cautious with changes', 'Slow to open up', 'Can be rigid with routines'],
    loveStyle: 'Safe, enduring, and committed. Believes love is proven through consistent everyday actions.',
    compatibility: 'Thrives with numbers 2, 6, and 8',
  },
  5: {
    name: 'The Wild Adventurer',
    icon: '✨',
    traits: ['Free-spirited', 'Passionate', 'Curious', 'Electrifying', 'Dynamic'],
    strengths: ['Unforgettable dates', 'Keeps passion thrilling', 'Open-minded lover', 'Courageous heart'],
    challenges: ['Restless under routine', 'Fears feeling trapped', 'Craves variety'],
    loveStyle: 'Spontaneous, thrilling, and magnetic. Seeks a partner in crime for life’s grand escapades.',
    compatibility: 'Thrives with numbers 1, 3, and 7',
  },
  6: {
    name: 'The Sacred Nurturer',
    icon: '🌹',
    traits: ['Affectionate', 'Warm', 'Generous', 'Protective', 'Family-hearted'],
    strengths: ['Creates a cozy sanctuary', 'Unconditional tenderness', 'Heals broken hearts', 'Devoted'],
    challenges: ['Can over-give', 'Struggles to receive', 'Prone to idealizing lovers'],
    loveStyle: 'Warm, domestic, and utterly loyal. Love is their sacred sanctuary and greatest masterpiece.',
    compatibility: 'Thrives with numbers 3, 4, and 9',
  },
  7: {
    name: 'The Mystical Seeker',
    icon: '🔮',
    traits: ['Introspective', 'Enigmatic', 'Wise', 'Poetic', 'Intuitive'],
    strengths: ['Telepathic understanding', 'Profound spiritual bond', 'Values depth over small talk', 'Quiet loyalty'],
    challenges: ['Needs solitary retreat', 'Guarded heart', 'Over-analyzes emotions'],
    loveStyle: 'Mysterious, soulful, and sacred. Craves a rare soulmate who speaks through silences.',
    compatibility: 'Thrives with numbers 1, 5, and 9',
  },
  8: {
    name: 'The Ambitious Dynamo',
    icon: '💎',
    traits: ['Powerful', 'Generous', 'Tenacious', 'Visionary', 'Magnanimous'],
    strengths: ['Provides lavishly', 'Stands up for their partner', 'Transforms dreams into reality', 'Passionate'],
    challenges: ['Can be workaholic', 'Hides soft vulnerabilities', 'Wants to control the narrative'],
    loveStyle: 'Fiercely protective, luxurious, and steadfast. Loves building an empire together.',
    compatibility: 'Thrives with numbers 2, 4, and 6',
  },
  9: {
    name: 'The Compassionate Visionary',
    icon: '🌌',
    traits: ['Selfless', 'Artistic', 'Cosmic', 'Romantic', 'Inspiring'],
    strengths: ['Universal compassion', 'Soulful forgiveness', 'Inspires personal growth', 'Poetic love letters'],
    challenges: ['Prone to romantic disillusion', 'Carries the world’s sorrows', 'Sacrifices self'],
    loveStyle: 'Transcendent, artistic, and boundless. Sees the divine beauty in their lover’s soul.',
    compatibility: 'Thrives with numbers 3, 6, and 7',
  },
  11: {
    name: 'The Illuminated Intuitive',
    icon: '🌟',
    traits: ['Psychic Bond', 'Illuminating', 'Deeply Spiritual', 'Telepathic', 'Empathetic'],
    strengths: ['Senses partner’s moods instantly', 'Spiritual awakening connection', 'Transcendent intimacy', 'Cosmic aura'],
    challenges: ['High nervous sensitivity', 'Can absorb partner’s stress', 'Needs emotional grounding'],
    loveStyle: 'A twin-flame connection. Transcends the ordinary realm with ethereal soul recognition.',
    compatibility: 'Thrives with numbers 2, 7, and 22',
  },
  22: {
    name: 'The Master Builder of Dreams',
    icon: '🏛️',
    traits: ['Transformational', 'Unshakable', 'World-Changer', 'Steadfast', 'Empowered'],
    strengths: ['Builds lifelong legacies', 'Unmatched resilience', 'Gives boundless security', 'Devoted provider'],
    challenges: ['High standards for self and partner', 'Needs balance between romance and duty'],
    loveStyle: 'Epic and enduring. Love is a monument built to weather any storm across lifetimes.',
    compatibility: 'Thrives with numbers 4, 8, and 11',
  },
  33: {
    name: 'The Cosmic Avatar of Love',
    icon: '💖',
    traits: ['Unconditional', 'Divine Healer', 'Selfless Devotion', 'Luminous', 'Enlightened'],
    strengths: ['Pure unconditional love', 'Profound spiritual healing', 'Radiates joyful peace', 'Sacred tenderness'],
    challenges: ['Danger of martyrdom', 'Can forget own boundaries in devotion'],
    loveStyle: 'Pure unconditional devotion. The highest vibrational romantic alignment possible.',
    compatibility: 'Harmonizes with numbers 6, 9, 11, and 22',
  },
};

export function generatePersonalityProfile(name, supportMaster = true) {
  const number = nameToNumber(name, supportMaster);
  const personality = PERSONALITY_TRAITS[number] || PERSONALITY_TRAITS[1];
  return {
    name: personality.name,
    icon: personality.icon,
    numerologyNumber: number,
    traits: personality.traits,
    strengths: personality.strengths,
    challenges: personality.challenges,
    loveStyle: personality.loveStyle,
    compatibility: personality.compatibility,
  };
}

export function calculatePersonalityCompatibility(p1, p2) {
  const n1 = p1.numerologyNumber;
  const n2 = p2.numerologyNumber;

  if ((n1 === 11 && n2 === 22) || (n1 === 22 && n2 === 11)) {
    return {
      score: 97,
      message: 'Cosmic master number synergy: A twin flame connection capable of moving mountains together!',
      tag: 'Twin Flame Master Pair',
    };
  }

  if (n1 === 33 || n2 === 33) {
    return {
      score: 96,
      message: 'Highest vibrational harmonic: Transcendent tenderness and mutual spiritual ascension.',
      tag: 'Sacred Harmony',
    };
  }

  if (n1 === n2) {
    return {
      score: 89,
      message: 'Mirror souls: You share matching core energies, offering intuitive understanding and shared ideals.',
      tag: 'Soul Mirror',
    };
  }

  const complementary = [
    [1, 2], [2, 1], [3, 6], [6, 3], [4, 8], [8, 4], [5, 7], [7, 5], [1, 5], [5, 1], [2, 4], [4, 2]
  ];

  for (const [a, b] of complementary) {
    if ((n1 === a && n2 === b) || (n1 === b && n2 === a)) {
      return {
        score: 88,
        message: 'Perfect polarity: Your strengths interlock like puzzle pieces, balancing passion and tenderness.',
        tag: 'Complementary Synergy',
      };
    }
  }

  const diff = Math.abs(n1 - n2);
  let score = 78 - diff * 3.5;
  score = Math.max(48, Math.min(84, Math.round(score)));

  return {
    score,
    message: score >= 70
      ? 'Dynamic harmony: Diverse personality perspectives create continual intrigue and affectionate chemistry.'
      : 'Intriguing opposites: Patience and curiosity will turn your unique differences into your greatest bond.',
    tag: score >= 70 ? 'Sweet Harmony' : 'Magnetic Contrast',
  };
}

export const ORACLE_MESSAGES = {
  dreamy: [
    'The celestial tapestry weaves your names into an eternal melody written among stardust.',
    'Moonlight falls upon two souls whose whispers echo softly across lifetimes.',
    'A rare constellation glows brightly tonight, blessing your shared unspoken dreams.',
    'Your romantic resonance ripples gently into the universe like warm twilight on calm waters.',
  ],
  passionate: [
    'Flames of devotion dance within your hearts, igniting a magnetic and electric attraction.',
    'A heartbeat cadence that quickens whenever your gazes meet across a crowded room.',
    'Your bond carries the rare warmth of ruby embers that never surrender to cold winds.',
    'Unapologetic chemistry: When your hands brush, the world around you fades away.',
  ],
  adventurous: [
    'Love is your compass, and breathtaking horizons are waiting for the two of you to explore.',
    'Two free spirits who turn ordinary weekdays into thrilling, laugh-filled adventures.',
    'Your road ahead is filled with midnight drives, shared secrets, and mountaintop sunrises.',
    'You kindle in each other the courage to dream bigger and love without boundaries.',
  ],
  flirty: [
    'Butterflies take flight every time a notification with their name lights up your screen.',
    'A playful spark of witty banter that conceals a tender, growing infatuation.',
    'Sweet smiles that linger long after parting, carrying the scent of fresh roses.',
    'The gentle gravity of stolen glances that turn an ordinary room into your secret world.',
  ],
  playful: [
    'Laughter is your love language — innocent, infectious, and brightening even rainy afternoons.',
    'Inside jokes that only the two of you decode, weaving memories that time cannot fade.',
    'You bring out each other’s childlike joy, reminding love that lightness is its greatest gift.',
    'A sweet camaraderie where silly moments become treasured lifelong memories.',
  ],
  peaceful: [
    'In each other’s presence, the noisy world falls silent — finding home in a warm embrace.',
    'Quiet evenings, shared blankets, and comfort that requires no words at all.',
    'A tranquil oasis of trust where both hearts can shed their shields and rest securely.',
    'Gentle like morning rain on garden blossoms, your care nurtures steady root-bound love.',
  ],
};

export const ROMANTIC_TIPS = [
  'Slip a handwritten note into their pocket with a sweet inside joke.',
  'Plan an impromptu stargazing date with a warm blanket and their favorite beverage.',
  'Listen attentively to their favorite story, noticing the sparkle in their eyes.',
  'Surprise them with a playlist of songs that secretly remind you of their smile.',
  'Cook their comfort meal together while soft jazz or acoustic melodies play.',
  'Hold their hand during quiet pauses, letting touch express what words cannot.',
];

export function getScoreDetails(percent) {
  if (percent >= 90) {
    return {
      tier: 'Cosmic Soulmates',
      emoji: '💞',
      badge: 'Twin Flame Bond',
      summary: 'A breathtaking spiritual resonance. Your connection transcends the ordinary with profound intuition and magnetic devotion.',
      moodKey: 'dreamy',
      colorClass: 'from-rose-500 via-pink-500 to-amber-400',
    };
  }
  if (percent >= 75) {
    return {
      tier: 'Deep Chemistry',
      emoji: '💖',
      badge: 'Sparkling Passion',
      summary: 'Sparks fly effortlessly between you two. Strong emotional chemistry and natural harmony create an intoxicating connection.',
      moodKey: 'passionate',
      colorClass: 'from-rose-500 to-pink-600',
    };
  }
  if (percent >= 60) {
    return {
      tier: 'Sweet Romance',
      emoji: '🌸',
      badge: 'Flourishing Harmony',
      summary: 'A delightful and genuine affection. Your shared laughter and complementary strengths promise continuous warmth and growth.',
      moodKey: 'flirty',
      colorClass: 'from-pink-500 to-rose-400',
    };
  }
  if (percent >= 45) {
    return {
      tier: 'Playful Sparks',
      emoji: '✨',
      badge: 'Curious Dynamic',
      summary: 'A playful connection ripe with curiosity. Give each other space to share dreams and uncover the sweet treasures hidden within.',
      moodKey: 'playful',
      colorClass: 'from-amber-400 to-rose-500',
    };
  }
  return {
    tier: 'Gentle Companionship',
    emoji: '🕊️',
    badge: 'Endearing Friendship',
    summary: 'A comfortable and honest bond. The greatest epic romances often sprout from the soil of patient, mutual understanding and deep friendship.',
    moodKey: 'peaceful',
    colorClass: 'from-rose-400 to-indigo-400',
  };
}

