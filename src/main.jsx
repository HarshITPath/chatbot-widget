import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme/index.js";

const rootEl = document.createElement("div");
rootEl.id = "chatbot-widget-root";

document.body.appendChild(rootEl);

// Default configuration
const config = {
  apiUrl: "http://192.168.0.39:3000/api",
  botName: "IT Path Assistant",
  botAvatar: "🤖",
  userAvatar: "👤",
  placeholder: "Type your message...",
  greeting: "Hi! 👋 How can I help you today?",
  windowSize: {
    width: { xs: 'calc(100vw - 16px)', sm: 'min(90vw, 540px)', md: 'min(50vw, 650px)' },
    height: { xs: 'calc(100vh - 32px)', sm: 'min(90vh, 720px)', md: 'min(85vh, 750px)' }
  },
  borderRadius: 3,
  shadow: "0 8px 32px rgba(0,0,0,0.12)",
  zIndex: 1300
};

createRoot(rootEl).render(
  <React.StrictMode>
    <ThemeProvider {...{ theme }}>
      <App config={config} />
    </ThemeProvider>
  </React.StrictMode>
);
