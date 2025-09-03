/**
 * Session Management Utility
 * Handles localStorage operations for chat sessions
 */

const SESSION_STORAGE_KEY = 'chatbot-session-id';
const SESSION_HISTORY_KEY = 'chatbot-session-history';

export const sessionManager = {
  // Get current session ID from localStorage
  getCurrentSessionId: () => {
    return localStorage.getItem(SESSION_STORAGE_KEY);
  },

  // Set session ID in localStorage
  setSessionId: (sessionId) => {
    if (sessionId) {
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }
  },

  // Clear current session
  clearSession: () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    // Optionally clear session history as well
    // localStorage.removeItem(SESSION_HISTORY_KEY);
  },

  // Save session to history for later retrieval
  saveSessionToHistory: (sessionId, sessionData) => {
    const history = sessionManager.getSessionHistory();
    history[sessionId] = {
      ...sessionData,
      lastAccessed: new Date().toISOString()
    };
    localStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(history));
  },

  // Get all session history
  getSessionHistory: () => {
    const history = localStorage.getItem(SESSION_HISTORY_KEY);
    return history ? JSON.parse(history) : {};
  },

  // Get specific session from history
  getSessionFromHistory: (sessionId) => {
    const history = sessionManager.getSessionHistory();
    return history[sessionId] || null;
  },

  // Remove session from history
  removeSessionFromHistory: (sessionId) => {
    const history = sessionManager.getSessionHistory();
    delete history[sessionId];
    localStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(history));
  },

  // Clear all session history
  clearAllHistory: () => {
    localStorage.removeItem(SESSION_HISTORY_KEY);
  },

  // Check if session exists
  hasActiveSession: () => {
    return !!sessionManager.getCurrentSessionId();
  }
};

export default sessionManager;
