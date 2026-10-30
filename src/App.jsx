import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import RomanticAmbience from './components/RomanticAmbience';
import LoveCalculatorCard from './components/LoveCalculatorCard';
import LoveOracle from './components/LoveOracle';
import FeaturesGrid from './components/FeaturesGrid';
import Footer from './components/Footer';

import PersonalityModal from './components/PersonalityModal';
import CoupleSongModal from './components/CoupleSongModal';
import LoveLetterModal from './components/LoveLetterModal';
import LoveSpinnerModal from './components/LoveSpinnerModal';
import ShareCardModal from './components/ShareCardModal';
import HistoryModal from './components/HistoryModal';
import FeedbackModal from './components/FeedbackModal';
import AboutModal from './components/AboutModal';

import {
  nameToNumber,
  combineNumbers,
  calculateVedicSynergy,
  getScoreDetails,
  isValidName,
} from './data/numerology';
import {
  getStoredHistory,
  saveToHistory,
  removeHistoryItem,
  clearAllHistory,
  getStoredFeedback,
  getStoredPrefs,
  saveStoredPrefs,
} from './utils/storage';

export default function App() {
  const [prefs, setPrefs] = useState(() => getStoredPrefs());
  const [darkMode, setDarkMode] = useState(() => prefs.dark || false);
  const [soundEnabled, setSoundEnabled] = useState(() => prefs.sound !== false);
  const [confettiEnabled, setConfettiEnabled] = useState(() => prefs.confetti !== false);

  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [supportMaster, setSupportMaster] = useState(true);
  const [allowJitter, setAllowJitter] = useState(false);
  const [result, setResult] = useState(null);

  const [history, setHistory] = useState(() => getStoredHistory());
  const [feedbacks, setFeedbacks] = useState(() => getStoredFeedback());

  // Modal open states
  const [historyOpen, setHistoryOpen] = useState(false);
  const [personalityOpen, setPersonalityOpen] = useState(false);
  const [songOpen, setSongOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [spinnerOpen, setSpinnerOpen] = useState(false);
  const [shareCardOpen, setShareCardOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Sync theme with document class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveStoredPrefs({ dark: darkMode, sound: soundEnabled, confetti: confettiEnabled });
  }, [darkMode, soundEnabled, confettiEnabled]);

  // Read URL params (e.g. ?n1=Romeo&n2=Juliet)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlN1 = params.get('n1');
      const urlN2 = params.get('n2');

      if (urlN1 && urlN2 && isValidName(urlN1) && isValidName(urlN2)) {
        setName1(urlN1);
        setName2(urlN2);

        const num1 = nameToNumber(urlN1, true);
        const num2 = nameToNumber(urlN2, true);
        const combined = combineNumbers(num1, num2, true);
        const vedic = calculateVedicSynergy(num1, num2, combined);
        const details = getScoreDetails(vedic.percent);

        setResult({
          name1: urlN1,
          name2: urlN2,
          percent: vedic.percent,
          num1,
          num2,
          combined,
          details,
          pillars: vedic.pillars,
          graha1: vedic.graha1,
          graha2: vedic.graha2,
          maitriScore: vedic.maitriScore,
          date: new Date().toISOString(),
        });
      }
    }
  }, []);

  const handleCalculate = (newResult) => {
    const updatedHistory = saveToHistory(newResult);
    setHistory(updatedHistory);

    if (confettiEnabled) {
      // Romantic Heart & Sparkle Confetti
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#ffffff'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f43f5e', '#fb7185', '#fbbf24'],
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ec4899', '#f43f5e', '#ffffff'],
        });
      }, 250);
    }
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setResult(null);
  };

  const handleSelectHistory = (item) => {
    setName1(item.name1);
    setName2(item.name2);
    setResult(item);
  };

  const handleDeleteHistory = (id) => {
    const updated = removeHistoryItem(id);
    setHistory(updated);
  };

  const handleClearHistory = () => {
    const updated = clearAllHistory();
    setHistory(updated);
  };

  const handleFeedbackSubmitted = (updated) => {
    setFeedbacks(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50/70 via-pink-50/30 to-amber-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-[#170e1c] text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-rose-500 selection:text-white">
      {/* Floating Canvas Hearts & Ambient Orbs */}
      <RomanticAmbience mood={result?.details?.moodKey || 'dreamy'} />

      {/* Navigation Header */}
      <Navbar
        historyCount={history.length}
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenSong={() => setSongOpen(true)}
        onOpenLetter={() => setLetterOpen(true)}
        onOpenSpinner={() => setSpinnerOpen(true)}
        onOpenPersonality={() => setPersonalityOpen(true)}
        onOpenFeedback={() => setFeedbackOpen(true)}
        onOpenAbout={() => setAboutOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        confettiEnabled={confettiEnabled}
        onToggleConfetti={() => setConfettiEnabled((prev) => !prev)}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <LoveCalculatorCard
          name1={name1}
          setName1={setName1}
          name2={name2}
          setName2={setName2}
          result={result}
          setResult={setResult}
          supportMaster={supportMaster}
          setSupportMaster={setSupportMaster}
          allowJitter={allowJitter}
          setAllowJitter={setAllowJitter}
          onCalculate={handleCalculate}
          onReset={handleReset}
          onOpenShareCard={() => setShareCardOpen(true)}
          onOpenPersonality={() => setPersonalityOpen(true)}
          onOpenSong={() => setSongOpen(true)}
          onOpenLetter={() => setLetterOpen(true)}
          onOpenSpinner={() => setSpinnerOpen(true)}
          soundEnabled={soundEnabled}
        />

        {/* Love Oracle Whispers */}
        <LoveOracle
          moodKey={result?.details?.moodKey || 'dreamy'}
          names={result ? { name1: result.name1, name2: result.name2 } : null}
        />

        {/* Feature Cards Grid */}
        <FeaturesGrid
          onOpenPersonality={() => setPersonalityOpen(true)}
          onOpenSong={() => setSongOpen(true)}
          onOpenLetter={() => setLetterOpen(true)}
          onOpenSpinner={() => setSpinnerOpen(true)}
          onOpenAbout={() => setAboutOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAbout={() => setAboutOpen(true)}
        onOpenFeedback={() => setFeedbackOpen(true)}
      />

      {/* Modals */}
      <PersonalityModal
        isOpen={personalityOpen}
        onClose={() => setPersonalityOpen(false)}
        name1={name1}
        name2={name2}
        supportMaster={supportMaster}
      />

      <CoupleSongModal
        isOpen={songOpen}
        onClose={() => setSongOpen(false)}
        initialPercent={result ? result.percent : 85}
      />

      <LoveLetterModal
        isOpen={letterOpen}
        onClose={() => setLetterOpen(false)}
        defaultTo={name2 || 'My Beloved'}
        defaultFrom={name1 || 'Your Soulmate'}
      />

      <LoveSpinnerModal
        isOpen={spinnerOpen}
        onClose={() => setSpinnerOpen(false)}
        soundEnabled={soundEnabled}
        confettiEnabled={confettiEnabled}
      />

      <ShareCardModal
        isOpen={shareCardOpen}
        onClose={() => setShareCardOpen(false)}
        result={result}
      />

      <HistoryModal
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onSelectHistory={handleSelectHistory}
        onDeleteHistory={handleDeleteHistory}
        onClearHistory={handleClearHistory}
      />

      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        feedbacks={feedbacks}
        onFeedbackSubmitted={handleFeedbackSubmitted}
      />

      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />
    </div>
  );
}

