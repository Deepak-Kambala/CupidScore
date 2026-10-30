[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# ❤️ CupidScore — Love Alchemy & Compatibility

A romantic, beautifully refactored React web application that calculates soulmate compatibility using Pythagorean numerology, delivers mystical Love Oracle prophecies, generates custom love letters, recommends couple soundtracks, and features an interactive Wheel of Love game.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom glassmorphism and romantic gradients
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Synthesizer**: Native Web Audio API for gentle romantic harp glissando and heartbeats
- **Effects**: HTML5 Canvas Ambient Floating Hearts & [Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## ✨ Features

- **💘 Core Love Calculator**:
  - Pythagorean letter frequency reduction (A-Z mapped to 1-9).
  - Master number preservation (11, 22, 33) and twin flame harmonic boosts.
  - Optional small mystical surprise toggle (±5%).
  - Glowing circular SVG percentage meter with smooth numerical counter.
- **🔮 Mystical Love Oracle**:
  - Cosmic romantic prophecies and celestial whispers tailored to relationship tiers.
  - Daily romantic suggestions and micro-dates.
- **👤 Personality Archetypes**:
  - In-depth analysis of partner expression numbers (e.g. Sovereign Leader, Gentle Empath, Radiant Muse).
  - Key traits, strengths, challenges, and love language synergy score.
- **🎵 Couple's Love Song**:
  - Curated romantic soundtrack based on compatibility score bracket.
  - Direct YouTube playback, cover preview, and 1-click link copying.
- **💌 Love Letter Generator**:
  - Compose romantic notes on virtual stationery (Blush Rose, Antique Parchment, Midnight Velvet).
  - Includes wax seal emblem and high-resolution PNG image download.
- **🎡 Spin the Wheel of Love**:
  - Interactive canvas wheel game with romantic dares, sweet massage coupons, date ideas, and love points.
- **📜 History & Persistence**:
  - LocalStorage tracking for saved compatibility tests with 1-click retest and deletion.
- **🎨 Shareable Romance Card**:
  - Generates a 900x900 canvas love card with floral borders, names, score, and quote for download or social sharing (WhatsApp, X, Telegram).
- **🌙 Romantic Dark & Light Themes**:
  - Daylight blush pink and midnight velvet starlight themes with smooth transitions.

---

## 📁 Project Structure

```
CupidScore/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Header with history badge, audio, confetti & theme controls
│   │   ├── RomanticAmbience.jsx     # Floating romantic hearts & sparkle particles canvas
│   │   ├── LoveCalculatorCard.jsx   # Core calculator with circular SVG score gauge
│   │   ├── LoveOracle.jsx           # Celestial Love Oracle parchment whisper
│   │   ├── PersonalityModal.jsx     # Numerological archetypes comparison
│   │   ├── CoupleSongModal.jsx      # Curated couple's song recommendation
│   │   ├── LoveLetterModal.jsx      # Handwritten-style love letter composer & PNG export
│   │   ├── LoveSpinnerModal.jsx     # Wheel of Love game with sound effects
│   │   ├── ShareCardModal.jsx       # High-definition canvas love card generator
│   │   ├── HistoryModal.jsx         # Saved compatibility history
│   │   ├── FeedbackModal.jsx        # Star rating & feedback form
│   │   ├── AboutModal.jsx           # Pythagorean science explanation & FAQ
│   │   ├── FeaturesGrid.jsx         # Romantic feature highlights
│   │   └── Footer.jsx               # Romantic footer with smooth scroll to top
│   ├── data/
│   │   ├── numerology.js            # Pythagorean math, personality archetypes & prophecies
│   │   ├── songs.js                 # Curated couple song catalog
│   │   └── wheelItems.js            # Romantic dares & coupons
│   ├── utils/
│   │   ├── sound.js                 # Web Audio API synthesizers (harp chimes, heartbeats)
│   │   └── storage.js               # LocalStorage management
│   ├── App.jsx                      # Main application state & layout
│   ├── main.jsx                     # React root mount
│   └── index.css                    # Tailwind CSS v4 & romantic custom styles
├── index.html                       # HTML entry point with Google Fonts
├── vite.config.js                   # Vite & Tailwind configuration
└── package.json                     # Project scripts and dependencies
```

---

## 🚀 Getting Started

### 1. Install dependencies:
```bash
npm install
```

### 2. Start the development server:
```bash
npm run dev
```

### 3. Build for production:
```bash
npm run build
```

---

## 📄 License
This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Maintainer
**Deepak Kambala** — *Passionate about crafting delightful web experiences.*
