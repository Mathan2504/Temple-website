import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import App from "./App.jsx";
import { ThemeProvider } from "./hooks/useTheme.jsx";
import { AdminModeProvider } from "./hooks/useAdminMode.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AdminModeProvider>
          <App />
        </AdminModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
