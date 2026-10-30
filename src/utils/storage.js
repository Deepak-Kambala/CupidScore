// LocalStorage management for history, favorites, feedback

const HISTORY_KEY = 'lovecalc_history_v2';
const FEEDBACK_KEY = 'lovecalc_feedbacks';
const PREFS_KEY = 'lovecalc_user_prefs';

export function getStoredHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to parse history:', err);
    return [];
  }
}

export function saveToHistory(entry) {
  try {
    const list = getStoredHistory();
    // Prepend new entry
    const updated = [
      {
        id: Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        timestamp: Date.now(),
        ...entry,
      },
      ...list,
    ].slice(0, 50); // Keep last 50
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save to history:', err);
    return [];
  }
}

export function removeHistoryItem(id) {
  try {
    const list = getStoredHistory();
    const updated = list.filter((item) => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to remove history item:', err);
    return [];
  }
}

export function clearAllHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return [];
  } catch (err) {
    console.error('Failed to clear history:', err);
    return [];
  }
}

export function getStoredFeedback() {
  try {
    const raw = localStorage.getItem(FEEDBACK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function saveFeedback(fb) {
  try {
    const list = getStoredFeedback();
    const updated = [
      {
        id: Date.now(),
        date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        ...fb,
      },
      ...list,
    ];
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    return [];
  }
}

export function getStoredPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) : { sound: true, confetti: true, dark: false };
  } catch (err) {
    return { sound: true, confetti: true, dark: false };
  }
}

export function saveStoredPrefs(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error('Failed to save prefs:', err);
  }
}

