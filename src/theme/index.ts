import * as React from "react";
import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

export const ColorModeContext = React.createContext<{
  mode: PaletteMode;
  toggle: () => void;
}>({
  mode: "light",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
});

export function createAppTheme(mode: PaletteMode = "light") {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: { main: "#0E7C7B" },
      secondary: { main: "#F4A261" },
      background: isDark
        ? { default: "#0f1113", paper: "#15181b" }
        : { default: "#fafafa", paper: "#ffffff" },
      text: isDark
        ? { primary: "#f3f3f3", secondary: "#bdbdbd" }
        : { primary: "#111", secondary: "#555" },
      divider: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Apple Color Emoji",
        "Segoe UI Emoji",
      ].join(","),
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 800 },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { textTransform: "none", borderRadius: 12 } },
      },
      MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
      MuiChip: { styleOverrides: { root: { borderRadius: 10 } } },
    },
  });
}
