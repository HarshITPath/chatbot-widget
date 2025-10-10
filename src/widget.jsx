import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';

// Default widget configuration
const defaultConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://192.168.0.39:3000/api',
  primaryColor: import.meta.env.VITE_PRIMARY_COLOR || '#1A3B68',
  secondaryColor: import.meta.env.VITE_SECONDARY_COLOR || '#9C814F',
  botName: import.meta.env.VITE_BOT_NAME || 'IT Path Assistant',
  botAvatar: import.meta.env.VITE_BOT_AVATAR || '🤖',
  userAvatar: import.meta.env.VITE_USER_AVATAR || '👤',
  position: import.meta.env.VITE_POSITION || 'bottom-right',
  zIndex: parseInt(import.meta.env.VITE_Z_INDEX) || 1300,
  greeting: import.meta.env.VITE_GREETING || 'Hi! 👋 How can I help you today?',
  placeholder: import.meta.env.VITE_PLACEHOLDER || 'Type your message...',
  windowSize: {
    width: { xs: 'calc(100vw - 16px)', sm: 'min(90vw, 540px)', md: 'min(50vw, 650px)' },
    height: { xs: 'calc(100vh - 32px)', sm: 'min(90vh, 720px)', md: 'min(85vh, 750px)' }
  },
  buttonSize: parseInt(import.meta.env.VITE_BUTTON_SIZE) || 64,
  borderRadius: parseInt(import.meta.env.VITE_BORDER_RADIUS) || 3,
  shadow: import.meta.env.VITE_SHADOW || '0 8px 32px rgba(0,0,0,0.12)',
  fontFamily: import.meta.env.VITE_FONT_FAMILY || '"Urbanist", "Rubik", system-ui, -apple-system, sans-serif'
};

// Functional widget manager with module-level state
const state = {
  config: { ...defaultConfig },
  isInitialized: false,
  container: null,
  root: null,
};

// Render the React component with theme
function renderWidget() {
  if (!state.root) return;

  const theme = createTheme({
    palette: {
      primary: {
        main: state.config.primaryColor,
      },
      secondary: {
        main: state.config.secondaryColor,
      },
    },
    typography: {
      fontFamily: state.config.fontFamily,
    },
  });

  state.root.render(
    React.createElement(ThemeProvider, { theme },
      React.createElement(CssBaseline),
      React.createElement(ChatbotWidgetComponent, { config: state.config })
    )
  );
}

// Initialize the widget
function initWidget(config = {}) {
  if (state.isInitialized) {
    console.warn('Chatbot widget is already initialized');
    return;
  }

  state.config = { ...defaultConfig, ...config };

  if (typeof document === 'undefined') return;

  // Create container element
  const container = document.createElement('div');
  container.id = 'chatbot-widget-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: ${state.config.zIndex};
  `;

  // Add container to body
  document.body.appendChild(container);
  state.container = container;

  // Create React root and render
  state.root = createRoot(container);
  renderWidget();

  state.isInitialized = true;
}

// Update configuration
function updateConfigWidget(newConfig) {
  state.config = { ...state.config, ...newConfig };
  if (state.isInitialized) {
    renderWidget();
  }
}

// Show the widget
function showWidget() {
  if (state.container) {
    state.container.style.display = 'block';
  }
}

// Hide the widget
function hideWidget() {
  if (state.container) {
    state.container.style.display = 'none';
  }
}

// Destroy the widget
function destroyWidget() {
  if (state.root) {
    state.root.unmount();
  }
  if (state.container && state.container.parentNode) {
    state.container.parentNode.removeChild(state.container);
  }
  state.isInitialized = false;
  state.container = null;
  state.root = null;
}

// React component wrapper that passes config to App
function ChatbotWidgetComponent({ config }) {
  return React.createElement('div', 
    { style: { pointerEvents: 'auto' } },
    React.createElement(App, { config })
  );
}

// Global widget instance (facade over functional manager)
let chatbotInstance = null;

const instanceFacade = {
  init: initWidget,
  updateConfig: updateConfigWidget,
  show: showWidget,
  hide: hideWidget,
  destroy: destroyWidget,
  get config() { return state.config; },
  get isInitialized() { return state.isInitialized; },
  get container() { return state.container; },
  get root() { return state.root; },
};

// Widget API object
const ChatbotWidget = {
  // Initialize the widget
  init: (config = {}) => {
    if (!chatbotInstance) {
      chatbotInstance = instanceFacade;
    }
    initWidget(config);
    return chatbotInstance;
  },

  // Get current instance
  getInstance: () => chatbotInstance,

  // Update configuration
  updateConfig: (config) => {
    if (chatbotInstance) {
      updateConfigWidget(config);
    } else {
      console.warn('Widget not initialized. Call ChatbotWidget.init() first.');
    }
  },

  // Show widget
  show: () => {
    if (chatbotInstance) {
      showWidget();
    }
  },

  // Hide widget
  hide: () => {
    if (chatbotInstance) {
      hideWidget();
    }
  },

  // Destroy widget
  destroy: () => {
    if (chatbotInstance) {
      destroyWidget();
      chatbotInstance = null;
    }
  }
};

// Auto-initialize if there's a global config
if (typeof window !== 'undefined') {
  // Set global reference
  window.ChatbotWidget = ChatbotWidget;
  
  // Auto-initialize if there's a global config
  if (window.ChatbotConfig) {
    ChatbotWidget.init(window.ChatbotConfig);
  }
}

// Export for UMD
export default ChatbotWidget;
