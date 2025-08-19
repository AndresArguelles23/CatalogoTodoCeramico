
import { Box, Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HeaderBar from "./sections/HeaderBar";
import Hero from "./sections/Hero";
import Catalog from "./sections/Catalog";
import Contact from "./sections/Contact";
import FooterBar from "./sections/FooterBar";
import { waLink } from "./utils/wa";

export default function App() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <style>{`html{scroll-behavior:smooth}`}</style>

      <HeaderBar />
      <Hero />
      <Catalog />
      <Contact />
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
