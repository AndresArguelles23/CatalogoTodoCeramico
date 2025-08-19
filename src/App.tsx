// src/App.tsx
import { useEffect, Suspense, lazy } from "react";
import { Box, Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HeaderBar from "./sections/HeaderBar";
import Hero from "./sections/Hero";
const Catalog = lazy(() => import("./sections/Catalog"));
const Contact = lazy(() => import("./sections/Contact"));
import FooterBar from "./sections/FooterBar";
import { waLink } from "./utils/wa";

export default function App() {
  // Prefetch suave en idle
  useEffect(() => {
    const run = () => {
      import("./sections/Catalog");
      import("./sections/Contact");
    };
    const ric: any = (window as any).requestIdleCallback;
    if (typeof ric === "function") {
      ric(run, { timeout: 1500 });
    } else {
      const t = setTimeout(run, 600);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <style>{`html{scroll-behavior:smooth}`}</style>

      <HeaderBar />
      <Hero />

      <Suspense fallback={null}>
        <Catalog />
        <Contact />
      </Suspense>

      <FooterBar />

      {/* FAB WhatsApp — móvil */}
      <Fab
        color="primary"
        aria-label="WhatsApp"
        sx={{ position: "fixed", right: 16, bottom: 16, display: { xs: "flex", md: "none" } }}
        href={waLink("Hola, me gustaría conocer tu catálogo de cerámicas.")}
        target="_blank"
        rel="noopener"
      >
        <WhatsAppIcon />
      </Fab>
    </Box>
  );
}
