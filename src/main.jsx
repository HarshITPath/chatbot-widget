import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme/index.js";
import { CONFIG } from "./utils/constant/index.js";

const rootEl = document.createElement("div");
rootEl.id = "chatbot-widget-root";

document.body.appendChild(rootEl);

createRoot(rootEl).render(
  <React.StrictMode>
    <ThemeProvider {...{ theme }}>
      <App config={CONFIG} />
    </ThemeProvider>
  </React.StrictMode>
);
