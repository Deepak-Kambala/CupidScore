// Vedic Numerology (Sankhya Shastra), Panchangam Tattva & Pythagorean Engine

// Vedic Alphabet Mapping (Katapayadi / Cheiro-Vedic frequency)
export const VEDIC_LETTER_MAP = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1, // Surya (Sun)
  B: 2, K: 2, R: 2,             // Chandra (Moon)
  C: 3, G: 3, L: 3, S: 3,       // Guru / Brihaspati (Jupiter)
  D: 4, M: 4, T: 4,             // Rahu (North Node)
  E: 5, H: 5, N: 5, X: 5,       // Budha (Mercury)
  U: 6, V: 6, W: 6,             // Shukra (Venus)
  O: 7, Z: 7,                   // Ketu (South Node)
  F: 8, P: 8,                   // Shani (Saturn)
};

// Classical Pythagorean mapping (as alternate/bridge)
export const PYTHAGOREAN_LETTER_MAP = {
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

// Compute root numerology number (1-9, plus master numbers 11, 22, 33)
export function nameToNumber(name, supportMaster = true, useVedic = true) {
  if (!name) return 0;
  const upper = name.toUpperCase().replace(/[^A-Z]/g, '');
  const letterMap = useVedic ? VEDIC_LETTER_MAP : PYTHAGOREAN_LETTER_MAP;

  let sum = 0;
  for (let i = 0; i < upper.length; i++) {
    sum += letterMap[upper[i]] || (upper.charCodeAt(i) % 9) + 1;
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
  return sum || 1;
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

// Navagraha (Nine Planets) attributes and Pancha Mahabhuta (Five Elements)
export const GRAHA_INFO = {
  1: {
    graha: 'Surya',
    planet: 'Sun',
    element: 'Agni (Fire)',
    energy: 'Deva',
    quality: 'Radiant Vitality & Leadership',
    deity: 'Lord Surya',
    nature: 'Noble, loyal, and sovereign',
  },
  2: {
    graha: 'Chandra',
    planet: 'Moon',
    element: 'Jala (Water)',
    energy: 'Deva',
    quality: 'Intuition, Emotion & Nurturing',
    deity: 'Chandra Deva',
    nature: 'Tender, empathetic, and gentle',
  },
  3: {
    graha: 'Guru',
    planet: 'Jupiter',
    element: 'Akasha (Ether)',
    energy: 'Deva',
    quality: 'Dharma, Wisdom & Divine Grace',
    deity: 'Brihaspati',
    nature: 'Expansive, noble, and principled',
  },
  4: {
    graha: 'Rahu',
    planet: 'North Node',
    element: 'Vayu (Air)',
    energy: 'Manushya',
    quality: 'Innovation & Magnetic Ambition',
    deity: 'Rahu',
    nature: 'Intense, visionary, and unconventional',
  },
  5: {
    graha: 'Budha',
    planet: 'Mercury',
    element: 'Prithvi (Earth)',
    energy: 'Deva',
    quality: 'Intellect, Wit & Expression',
    deity: 'Budha Deva',
    nature: 'Playful, communicative, and adaptable',
  },
  6: {
    graha: 'Shukra',
    planet: 'Venus',
    element: 'Jala (Water)',
    energy: 'Manushya',
    quality: 'Love, Beauty, Luxury & Devotion',
    deity: 'Shukracharya',
    nature: 'Romantic, passionate, and harmonious',
  },
  7: {
    graha: 'Ketu',
    planet: 'South Node',
    element: 'Akasha (Ether)',
    energy: 'Deva',
    quality: 'Moksha, Mysticism & Soul Depth',
    deity: 'Ketu',
    nature: 'Introspective, telepathic, and sacred',
  },
  8: {
    graha: 'Shani',
    planet: 'Saturn',
    element: 'Vayu (Air)',
    energy: 'Manushya',
    quality: 'Karma, Steadfastness & Endurance',
    deity: 'Shani Deva',
    nature: 'Grounded, disciplined, and lifelong loyal',
  },
  9: {
    graha: 'Mangala',
    planet: 'Mars',
    element: 'Agni (Fire)',
    energy: 'Deva',
    quality: 'Courage, Drive & Protective Passion',
    deity: 'Kuja / Kartikeya',
    nature: 'Bold, passionate, and fiercely protective',
  },
  11: {
    graha: 'Chandra-Surya Yoga',
    planet: 'Master Intuitive',
    element: 'Akasha & Jala',
    energy: 'Spiritual',
    quality: 'Twin Flame Resonance',
    deity: 'Ardhanarishvara',
    nature: 'Transcendent soul harmony',
  },
  22: {
    graha: 'Rahu-Guru Yoga',
    planet: 'Master Architect',
    element: 'Prithvi & Akasha',
    energy: 'Spiritual',
    quality: 'Destined Dynasty Builder',
    deity: 'Vishwakarma',
    nature: 'Enduring life legacy',
  },
  33: {
    graha: 'Guru-Shukra Yoga',
    planet: 'Master Healer',
    element: 'Jala & Akasha',
    energy: 'Spiritual',
    quality: 'Unconditional Prem (Love)',
    deity: 'Radha-Krishna',
    nature: 'Highest spiritual devotion',
  },
};

// Vedic Graha Maitri (Planetary Friendship) Matrix
// 3 = Mitra (Natural Friends), 2 = Sama (Neutral), 1 = Shatru (Challenging)
export const GRAHA_MAITRI = {
  1: { 1: 3, 2: 3, 3: 3, 4: 2, 5: 3, 6: 1, 7: 2, 8: 1, 9: 3 }, // Surya
  2: { 1: 3, 2: 3, 3: 3, 4: 1, 5: 3, 6: 3, 7: 1, 8: 2, 9: 2 }, // Chandra
  3: { 1: 3, 2: 3, 3: 3, 4: 2, 5: 2, 6: 1, 7: 3, 8: 2, 9: 3 }, // Guru
  4: { 1: 1, 2: 1, 3: 2, 4: 3, 5: 3, 6: 3, 7: 2, 8: 3, 9: 1 }, // Rahu
  5: { 1: 3, 2: 2, 3: 2, 4: 3, 5: 3, 6: 3, 7: 2, 8: 2, 9: 2 }, // Budha
  6: { 1: 1, 2: 3, 3: 2, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 2 }, // Shukra
  7: { 1: 2, 2: 1, 3: 3, 4: 2, 5: 2, 6: 3, 7: 3, 8: 2, 9: 3 }, // Ketu
  8: { 1: 1, 2: 1, 3: 2, 4: 3, 5: 3, 6: 3, 7: 2, 8: 3, 9: 1 }, // Shani
  9: { 1: 3, 2: 3, 3: 3, 4: 1, 5: 2, 6: 2, 7: 3, 8: 1, 9: 3 }, // Mangala
};

// Pancha Mahabhuta (Elemental) Synergy scoring
function calculateElementalSynergy(n1, n2) {
  const g1 = GRAHA_INFO[n1] || GRAHA_INFO[1];
  const g2 = GRAHA_INFO[n2] || GRAHA_INFO[1];

  const e1 = g1.element.split(' ')[0]; // Agni, Jala, Akasha, Vayu, Prithvi
  const e2 = g2.element.split(' ')[0];

  // Harmonious combinations:
  // Jala + Prithvi (Water + Earth = fruitful blossoms)
  // Agni + Vayu (Fire + Air = energetic warmth)
  // Akasha harmonizes with all (Infinite space)
  if (e1 === e2) return 10;
  if ((e1 === 'Jala' && e2 === 'Prithvi') || (e1 === 'Prithvi' && e2 === 'Jala')) return 9.5;
  if ((e1 === 'Agni' && e2 === 'Vayu') || (e1 === 'Vayu' && e2 === 'Agni')) return 9.5;
  if (e1 === 'Akasha' || e2 === 'Akasha') return 9;
  if ((e1 === 'Jala' && e2 === 'Akasha') || (e1 === 'Akasha' && e2 === 'Jala')) return 8.5;
  if ((e1 === 'Agni' && e2 === 'Jala') || (e1 === 'Jala' && e2 === 'Agni')) return 6.5; // Steam/intense contrast
  return 7.5;
}

// Robust Hindu & Vedic Compatibility Algorithm
export function calculateVedicSynergy(num1, num2, combined) {
  const n1 = num1 > 9 ? (num1 === 11 ? 2 : num1 === 22 ? 4 : 6) : num1;
  const n2 = num2 > 9 ? (num2 === 11 ? 2 : num2 === 22 ? 4 : 6) : num2;

  // 1. Graha Maitri (Planetary Friendship)
  const maitriScore = (GRAHA_MAITRI[n1]?.[n2] || 2); // 1, 2, or 3
  const maitriPercent = maitriScore === 3 ? 95 : maitriScore === 2 ? 78 : 58;

  // 2. Pancha Mahabhuta (Elemental Harmony)
  const elemBonus = calculateElementalSynergy(n1, n2);

  // 3. Composite Vibration Base
  let baseScore = 40 + maitriScore * 14 + elemBonus * 2.2;

  // Vedic auspicious yogas:
  // Same ruler (Sama-Graha) creates instant understanding
  if (n1 === n2) baseScore += 6;

  // Surya (1) + Chandra (2) = Divine Union (Sun & Moon)
  if ((n1 === 1 && n2 === 2) || (n1 === 2 && n2 === 1)) baseScore += 8;

  // Guru (3) + Shukra (6) = Both Gurus of Wisdom & Romance
  if ((n1 === 3 && n2 === 6) || (n1 === 6 && n2 === 3)) baseScore += 7;

  // Guru (3) + Mangala (9) = Guru-Mangala Yoga (High auspiciousness)
  if ((n1 === 3 && n2 === 9) || (n1 === 9 && n2 === 3)) baseScore += 7;

  // Master Numbers presence
  if ([11, 22, 33].includes(num1) || [11, 22, 33].includes(num2)) baseScore += 6;

  const finalScore = Math.min(100, Math.max(18, Math.round(baseScore)));

  // 4 Ashta Koota-inspired Pillars:
  // - Manasika (Emotional / Graha Maitri)
  // - Rati / Kama (Chemistry & Attraction)
  // - Buddhi (Intellect & Dharma)
  // - Aayu (Endurance & Longevity)
  const emotional = Math.min(100, Math.max(25, Math.round(maitriPercent + ((n1 * 3) % 7) - 2)));
  const chemistry = Math.min(100, Math.max(25, Math.round(finalScore + ((elemBonus >= 9 ? 6 : -3)) + ((n2 * 2) % 5))));
  const intellectual = Math.min(100, Math.max(25, Math.round(finalScore + (((n1 + n2) % 3 === 0 ? 5 : -2)))));
  const enduring = Math.min(100, Math.max(30, Math.round(maitriScore >= 2 ? finalScore + 4 : finalScore - 4)));

  return {
    percent: finalScore,
    pillars: {
      emotional,
      chemistry,
      intellectual,
      enduring,
    },
    graha1: GRAHA_INFO[num1] || GRAHA_INFO[1],
    graha2: GRAHA_INFO[num2] || GRAHA_INFO[2],
    maitriScore: maitriScore === 3 ? 'Mitra (Harmonious Friends)' : maitriScore === 2 ? 'Sama (Balanced Neutrals)' : 'Vishesha (Complementary Opposites)',
  };
}

export function mapToPercent(combined, num1, num2) {
  const result = calculateVedicSynergy(num1, num2, combined);
  return result.percent;
}

export const PERSONALITY_TRAITS = {
  1: {
    name: 'Surya • The Sovereign Radiant',
    icon: 'I',
    graha: 'Surya (Sun)',
    element: 'Agni (Fire)',
    traits: ['Dignified', 'Courageous', 'Generous', 'Pioneering', 'Magnetic'],
    strengths: ['Natural leader', 'Unwavering fidelity', 'Protective strength', 'Warm vitality'],
    challenges: ['Can be prideful', 'Needs mutual respect', 'Dislikes pettiness'],
    loveStyle: 'Regal and heartfelt. Seeks an equal partner of integrity to shine alongside.',
    compatibility: 'Harmonious with Chandra (2), Guru (3), and Mangala (9)',
  },
  2: {
    name: 'Chandra • The Gentle Nectar',
    icon: 'II',
    graha: 'Chandra (Moon)',
    element: 'Jala (Water)',
    traits: ['Intuitive', 'Devoted', 'Peaceful', 'Empathetic', 'Harmonious'],
    strengths: ['Deep emotional intimacy', 'Soothing presence', 'Sacred empathy', 'Gentle touch'],
    challenges: ['Sensitive to moods', 'Requires tender reassurance', 'Avoids harsh friction'],
    loveStyle: 'Deeply romantic and nurturing. Seeks poetic heart-to-heart soul connections.',
    compatibility: 'Harmonious with Surya (1), Budha (5), and Shukra (6)',
  },
  3: {
    name: 'Guru • The Divine Preceptor',
    icon: 'III',
    graha: 'Guru (Jupiter)',
    element: 'Akasha (Ether)',
    traits: ['Dharmic', 'Wise', 'Generous', 'Expansive', 'Inspirational'],
    strengths: ['Spiritual elevation', 'Boundless optimism', 'Honest counsel', 'Unconditional care'],
    challenges: ['High moral expectations', 'Over-thinking', 'Tends to preach'],
    loveStyle: 'Noble, inspiring, and patient. Treats romance as a sacred spiritual evolution.',
    compatibility: 'Harmonious with Surya (1), Chandra (2), and Mangala (9)',
  },
  4: {
    name: 'Rahu • The Visionary Pioneer',
    icon: 'IV',
    graha: 'Rahu (North Node)',
    element: 'Vayu (Air)',
    traits: ['Innovative', 'Magnetic', 'Ambitious', 'Unconventional', 'Bold'],
    strengths: ['Worldly breakthrough', 'Fiercely original dates', 'Intense attraction', 'Transforms hurdles'],
    challenges: ['Unpredictable moods', 'Restless energy', 'Needs grounded anchor'],
    loveStyle: 'Electrifying and intense. Craves a deep co-creator who defies ordinary boundaries.',
    compatibility: 'Harmonious with Budha (5), Shukra (6), and Shani (8)',
  },
  5: {
    name: 'Budha • The Quick-Witted Diplomat',
    icon: 'V',
    graha: 'Budha (Mercury)',
    element: 'Prithvi (Earth)',
    traits: ['Expressive', 'Charming', 'Playful', 'Curious', 'Versatile'],
    strengths: ['Lively conversation', 'Humor and lightness', 'Youthful spirit', 'Solves disputes easily'],
    challenges: ['Can over-analyze feelings', 'Fears emotional stagnation', 'Restless'],
    loveStyle: 'Playful, intellectual, and affectionate. Desires a partner who loves spirited conversation.',
    compatibility: 'Harmonious with Surya (1), Shukra (6), and Rahu (4)',
  },
  6: {
    name: 'Shukra • The Sacred Embodiment of Prem',
    icon: 'VI',
    graha: 'Shukra (Venus)',
    element: 'Jala (Water)',
    traits: ['Romantic', 'Refined', 'Graceful', 'Sensual', 'Devoted'],
    strengths: ['Creates heaven at home', 'Pure artistic love', 'Unconditional tenderness', 'Elevates romance'],
    challenges: ['Idealizes lovers', 'Can over-compromise', 'Vulnerable to disillusion'],
    loveStyle: 'Lyrical, artistic, and deeply affectionate. Romance is their highest spiritual art.',
    compatibility: 'Harmonious with Chandra (2), Budha (5), and Shani (8)',
  },
  7: {
    name: 'Ketu • The Mystical Sage',
    icon: 'VII',
    graha: 'Ketu (South Node)',
    element: 'Akasha (Ether)',
    traits: ['Introspective', 'Telepathic', 'Soulful', 'Enigmatic', 'Pure'],
    strengths: ['Telepathic soul connection', 'Detects unsaid words', 'Spiritual depth', 'Calm sanctuary'],
    challenges: ['Needs quiet solitude', 'Can detach emotionally', 'Secretive nature'],
    loveStyle: 'Transcendent and sacred. Craves a quiet soulmate who connects beyond earthly noise.',
    compatibility: 'Harmonious with Guru (3), Mangala (9), and Shukra (6)',
  },
  8: {
    name: 'Shani • The Steadfast Pillar',
    icon: 'VIII',
    graha: 'Shani (Saturn)',
    element: 'Vayu (Air)',
    traits: ['Steadfast', 'Loyal', 'Patient', 'Enduring', 'Just'],
    strengths: ['Unshakeable lifelong loyalty', 'Weathering all storms', 'Protective security', 'Never gives up'],
    challenges: ['Slow to trust', 'Reserved affection early on', 'Cautious'],
    loveStyle: 'Steadfast, loyal, and enduring. Believes true love is forged through commitment across time.',
    compatibility: 'Harmonious with Shukra (6), Budha (5), and Rahu (4)',
  },
  9: {
    name: 'Mangala • The Valiant Protector',
    icon: 'IX',
    graha: 'Mangala (Mars)',
    element: 'Agni (Fire)',
    traits: ['Passionate', 'Chivalrous', 'Direct', 'Vibrant', 'Protective'],
    strengths: ['Fierce loyalty', 'Passionate romantic flame', 'Stands up for lover', 'Direct honesty'],
    challenges: ['Impulsive reactions', 'Hot temper', 'Needs gentle cooling water'],
    loveStyle: 'Fiery, passionate, and protective. Loves with the devotion of a chivalrous knight.',
    compatibility: 'Harmonious with Surya (1), Chandra (2), and Guru (3)',
  },
  11: {
    name: 'Ardhanarishvara • The Illuminated Balance',
    icon: 'XI',
    graha: 'Surya-Chandra Synergy',
    element: 'Akasha & Jala',
    traits: ['Twin-Flame', 'Intuitive', 'Transcendent', 'Luminous', 'Sacred'],
    strengths: ['Twin flame recognition', 'Profound spiritual intimacy', 'Balance of Shiva & Shakti', 'Cosmic bond'],
    challenges: ['High emotional sensitivity', 'Absorbs external energies'],
    loveStyle: 'A cosmic twin flame connection that balances the masculine and feminine energies within.',
    compatibility: 'Harmonious with Chandra (2), Ketu (7), and Guru (3)',
  },
  22: {
    name: 'Vishwakarma • The Master Dynasty Builder',
    icon: 'XXII',
    graha: 'Rahu-Guru Synergy',
    element: 'Prithvi & Akasha',
    traits: ['Empire Builder', 'Unshakable', 'Legacy Focused', 'Resilient', 'Wise'],
    strengths: ['Builds lifelong dynastic security', 'Turns dreams to reality', 'Unmatched resilience', 'Devoted'],
    challenges: ['Heavy worldly responsibility', 'Needs to pause for intimacy'],
    loveStyle: 'Epic and lasting. Love is a sacred empire built to nurture generations.',
    compatibility: 'Harmonious with Shani (8), Shukra (6), and Budha (5)',
  },
  33: {
    name: 'Radha-Krishna • Divine Avatar of Love',
    icon: 'XXXIII',
    graha: 'Guru-Shukra Synergy',
    element: 'Jala & Akasha',
    traits: ['Unconditional', 'Divine Grace', 'Sacred Harmony', 'Luminous', 'Pure'],
    strengths: ['Highest spiritual devotion', 'Unconditional Prem (Love)', 'Heals old heartaches', 'Joyful peace'],
    challenges: ['Can sacrifice self for partner', 'Transcendental detachment'],
    loveStyle: 'Pure unconditional devotion. The highest vibrational romantic alignment known in sacred literature.',
    compatibility: 'Universal harmonic alignment across all vibrations',
  },
};

export function generatePersonalityProfile(name, supportMaster = true) {
  const number = nameToNumber(name, supportMaster);
  const personality = PERSONALITY_TRAITS[number] || PERSONALITY_TRAITS[1];
  const grahaInfo = GRAHA_INFO[number] || GRAHA_INFO[1];

  return {
    name: personality.name,
    icon: personality.icon,
    numerologyNumber: number,
    graha: grahaInfo.graha,
    planet: grahaInfo.planet,
    element: grahaInfo.element,
    quality: grahaInfo.quality,
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
  const vedic = calculateVedicSynergy(n1, n2, combineNumbers(n1, n2));

  let tag = 'Karmic Harmony';
  if (vedic.percent >= 90) tag = 'Celestial Twin-Flame (Param Mitra)';
  else if (vedic.percent >= 78) tag = 'Dharmic Harmony (Mitra Yoga)';
  else if (vedic.percent >= 60) tag = 'Dynamic Contrast (Sama Yoga)';
  else tag = 'Spiritual Evolution (Sadhana)';

  return {
    score: vedic.percent,
    message: `${vedic.maitriScore}. ${p1.graha} (${p1.element}) meets ${p2.graha} (${p2.element}), producing a balanced energetic resonance.`,
    tag,
  };
}

export const ORACLE_MESSAGES = {
  dreamy: [
    'Like the sacred union of Surya and Chandra, your energies balance light and intuition in perfect rhythm.',
    'Under the starlit sky, ancient Vedic vibrations whisper of a connection nurtured across lifetimes.',
    'Auspicious planetary alignment: The universe smiles upon the tenderness shared between your hearts.',
    'Your romantic resonance ripples gently into eternity like holy water upon quiet temple petals.',
  ],
  passionate: [
    'The sacred fire (Agni) of devotion burns brightly, fueling an electric and protective attraction.',
    'Courage and magnetic grace interlock, creating a loyalty that shields each other against all adversity.',
    'Your bond carries the sacred warmth of temple embers that never flicker or surrender to cold winds.',
    'Unapologetic chemistry: When your eyes meet, the surrounding realm melts into shared stillness.',
  ],
  adventurous: [
    'Dharma and destiny guide your journey together across breathtaking horizons of shared discovery.',
    'Two free spirits who turn ordinary weekdays into joyous pilgrimages of laughter and celebration.',
    'Your road ahead is illuminated by auspicious stars, shared dreams, and joyous milestones.',
    'You kindle in each other the courage to dream without limits and cherish every season of love.',
  ],
  flirty: [
    'The sweet charm of Budha and Shukra dances in your witty banter and lingering smiles.',
    'A playful spark of affectionate conversation that conceals a growing, tender devotion.',
    'Sweet smiles that brighten the day, carrying the gentle fragrance of jasmine and rose blossoms.',
    'Stolen glances that communicate volumes without needing a single spoken syllable.',
  ],
  playful: [
    'Laughter is the melody of your connection — lighthearted, spontaneous, and brightening cloudy skies.',
    'Shared smiles and quiet inside jokes weave memories that time cannot fade.',
    'You bring out each other’s childlike joy, reminding love that lightness of heart is a sacred gift.',
    'A sweet camaraderie where simple moments become cherished lifetime treasures.',
  ],
  peaceful: [
    'In each other’s presence, the noisy world falls silent — finding sanctuary in an embrace of trust.',
    'Quiet evenings, shared comfort, and understanding that requires no elaborate words.',
    'A tranquil haven where both hearts can shed their shields and rest in absolute security.',
    'Gentle like morning dew upon lotus leaves, your care nurtures steady, lifelong love.',
  ],
};

export const ROMANTIC_TIPS = [
  'Prepare their favorite beverage or sweet with heartfelt warmth and love.',
  'Take a quiet starlit walk together, appreciating the peace of being side-by-side.',
  'Listen attentively to their unspoken thoughts, noticing the tenderness in their eyes.',
  'Leave a thoughtful note in their book or pocket reminding them of your admiration.',
  'Hold their hand during quiet pauses, letting presence express what words cannot.',
  'Share a prayer or wish for each other’s happiness and fulfillment.',
];

export function getScoreDetails(percent) {
  if (percent >= 90) {
    return {
      tier: 'Cosmic Soulmates',
      badge: 'Param Mitra (Celestial Harmony)',
      summary: 'A breathtaking spiritual resonance. Your connection transcends the ordinary with profound planetary friendship and magnetic devotion.',
      moodKey: 'dreamy',
      colorClass: 'from-rose-500 via-pink-500 to-amber-400',
    };
  }
  if (percent >= 75) {
    return {
      tier: 'Deep Chemistry',
      badge: 'Mitra Yoga (Deep Harmony)',
      summary: 'Strong emotional chemistry and natural planetary harmony create an enduring, affectionate connection.',
      moodKey: 'passionate',
      colorClass: 'from-rose-500 to-pink-600',
    };
  }
  if (percent >= 60) {
    return {
      tier: 'Sweet Romance',
      badge: 'Sama Yoga (Balanced Love)',
      summary: 'A delightful and genuine affection. Your complementary elements promise continuous warmth, laughter, and personal growth.',
      moodKey: 'flirty',
      colorClass: 'from-pink-500 to-rose-400',
    };
  }
  if (percent >= 45) {
    return {
      tier: 'Playful Sparks',
      badge: 'Kautuka (Curious Dynamic)',
      summary: 'A playful connection ripe with intrigue. Give each other space to share dreams and uncover the sweet treasures hidden within.',
      moodKey: 'playful',
      colorClass: 'from-amber-400 to-rose-500',
    };
  }
  return {
    tier: 'Gentle Companionship',
    badge: 'Maitri (Endearing Friendship)',
    summary: 'A comfortable and honest bond. The greatest epic romances often sprout from the soil of patient, mutual understanding and deep friendship.',
    moodKey: 'peaceful',
    colorClass: 'from-rose-400 to-indigo-400',
  };
}
