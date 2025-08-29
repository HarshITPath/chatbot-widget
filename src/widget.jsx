import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';

// Default widget configuration
const defaultConfig = {
  apiUrl: 'http://192.168.0.39:3000/api',
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  botName: 'IT Path Assistant',
  botAvatar: '🤖',
  userAvatar: '👤',
  position: 'bottom-right',
  zIndex: 1300,
  greeting: 'Hi! 👋 How can I help you today?',
  placeholder: 'Type your message...',
  windowSize: {
    width: { xs: 'calc(100vw - 16px)', sm: 'min(90vw, 540px)', md: 'min(50vw, 650px)' },
    height: { xs: 'calc(100vh - 32px)', sm: 'min(90vh, 720px)', md: 'min(85vh, 750px)' }
  },
  buttonSize: 64,
  borderRadius: 3,
  shadow: '0 8px 32px rgba(0,0,0,0.12)',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
};

// Widget class for managing the chatbot instance
class ChatbotWidgetClass {
  constructor(config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.isInitialized = false;
    this.container = null;
    this.root = null;
  }

  // Initialize the widget
  init() {
    if (this.isInitialized) {
      console.warn('Chatbot widget is already initialized');
      return;
    }

    // Create container element
    this.container = document.createElement('div');
    this.container.id = 'chatbot-widget-container';
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: ${this.config.zIndex};
    `;

    // Add container to body
    document.body.appendChild(this.container);

    // Create React root and render
    this.root = createRoot(this.container);
    this.render();

    this.isInitialized = true;
  }

  // Render the React component with theme
  render() {
    const theme = createTheme({
      palette: {
        primary: {
          main: this.config.primaryColor,
        },
        secondary: {
          main: this.config.secondaryColor,
        },
      },
      typography: {
        fontFamily: this.config.fontFamily,
      },
    });

    this.root.render(
      React.createElement(ThemeProvider, { theme },
        React.createElement(CssBaseline),
        React.createElement(ChatbotWidgetComponent, { config: this.config })
      )
    );
  }

  // Update configuration
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    if (this.isInitialized) {
      this.render();
    }
  }

  // Show the widget
  show() {
    if (this.container) {
      this.container.style.display = 'block';
    }
  }

  // Hide the widget
  hide() {
    if (this.container) {
      this.container.style.display = 'none';
    }
  }

  // Destroy the widget
  destroy() {
    if (this.root) {
      this.root.unmount();
    }
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.isInitialized = false;
    this.container = null;
    this.root = null;
  }
}

// React component wrapper that passes config to App
function ChatbotWidgetComponent({ config }) {
  return React.createElement('div', 
    { style: { pointerEvents: 'auto' } },
    React.createElement(App, { config })
  );
}

// Global widget instance
let chatbotInstance = null;

// Widget API object
const ChatbotWidget = {
  // Initialize the widget
  init: (config = {}) => {
    if (!chatbotInstance) {
      chatbotInstance = new ChatbotWidgetClass(config);
    }
    chatbotInstance.init();
    return chatbotInstance;
  },

  // Get current instance
  getInstance: () => chatbotInstance,

  // Update configuration
  updateConfig: (config) => {
    if (chatbotInstance) {
      chatbotInstance.updateConfig(config);
    } else {
      console.warn('Widget not initialized. Call ChatbotWidget.init() first.');
    }
  },

  // Show widget
  show: () => {
    if (chatbotInstance) {
      chatbotInstance.show();
    }
  },

  // Hide widget
  hide: () => {
    if (chatbotInstance) {
      chatbotInstance.hide();
    }
  },

  // Destroy widget
  destroy: () => {
    if (chatbotInstance) {
      chatbotInstance.destroy();
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
