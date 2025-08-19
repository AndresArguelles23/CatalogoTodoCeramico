import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, createAppTheme } from "./theme";
import type { PaletteMode } from "@mui/material";

function getInitialMode(): PaletteMode {
  const saved = localStorage.getItem("mc-color-mode");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function Root() {
  const [mode, setMode] = React.useState<PaletteMode>(getInitialMode);

  // Persistir preferencia
  React.useEffect(() => {
    localStorage.setItem("mc-color-mode", mode);
  }, [mode]);

  // Responder a cambios del sistema (opcional)
  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem("mc-color-mode");
      if (!saved) setMode(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const colorMode = React.useMemo(
    () => ({ mode, toggle: () => setMode((m) => (m === "light" ? "dark" : "light")) }),
    [mode]
  );

  const theme = React.useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
