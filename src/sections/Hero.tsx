// src/sections/Hero.tsx
import { Box, Container, Stack, Typography, Button, Chip, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import VerifiedIcon from "@mui/icons-material/Verified";
import StorefrontIcon from "@mui/icons-material/Storefront";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { waLink } from "../utils/wa";
import { scrollToId } from "../utils/scroll";

export default function Hero() {
  return (
    <Box
      id="inicio"
      sx={{
        position: "relative",
        minHeight: { xs: "65vh", md: "72vh" },
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        px: 2,
        pb: "max(16px, env(safe-area-inset-bottom))",
        overflow: "hidden",
        // Fondo sutil compatible claro/oscuro
        background:
          "linear-gradient(135deg, rgba(14,124,123,.08), rgba(244,162,97,.08)), radial-gradient(1000px 400px at 10% 0%, rgba(14,124,123,.12), transparent), radial-gradient(1000px 400px at 90% 100%, rgba(244,162,97,.12), transparent)",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          maskImage: "radial-gradient(120% 70% at 50% 50%, black 50%, transparent 100%)"
        },
        "@keyframes bob": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(4px)" }
        },
        "@media (prefers-reduced-motion: reduce)": {
          "& button[aria-label='Bajar al catálogo']": { animation: "none" }
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Contenido con ancho legible */}
        <Box sx={{ mx: "auto", maxWidth: 900 }}>
          {/* Marca + Eslogan (H1 real + tipografía fluida) */}
          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 1,
              letterSpacing: 0.2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.15
            }}
          >
            Todo Cerámico
          </Typography>

          <Typography
            sx={{
              color: "text.primary",
              mb: 1,
              fontSize: { xs: "1.05rem", sm: "1.25rem", md: "1.35rem" },
              lineHeight: 1.3
            }}
          >
            Cerámica que transforma tus espacios.
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mb: 3,
              fontSize: { xs: ".95rem", sm: "1rem" }
            }}
          >
            Asesoría directa por WhatsApp
          </Typography>

          {/* Beneficios (chips) — responsivos y con buen wrap */}
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{
              mb: 3,
              flexWrap: "wrap",
              rowGap: 1,
              "& .MuiChip-root": {
                // Compacta ligeramente en móvil
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                height: { xs: 28, sm: 32 }
              }
            }}
          >
            <Chip icon={<Inventory2Icon />} label="Porcelanato & Cerámica" variant="outlined" />
            <Chip icon={<VerifiedIcon />} label="Calidad garantizada" variant="outlined" />
            <Chip icon={<StorefrontIcon />} label="Exteriores & Interiores" variant="outlined" />
          </Stack>

          {/* CTAs — 100% ancho en móvil, inline en desktop */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{
              "& > *": { width: { xs: "100%", sm: "auto" } }
            }}
          >
            <Button
              size="large"
              variant="contained"
              color="primary"
              startIcon={<WhatsAppIcon />}
              href={waLink("Hola, me interesa el catálogo de Mundo Cerámico.")}
              target="_blank"
              rel="noopener"
              aria-label="Cotizar por WhatsApp"
            >
              Cotiza por WhatsApp
            </Button>

            <Button
              size="large"
              variant="outlined"
              onClick={() => scrollToId("catalogo")}
              aria-label="Ver catálogo"
            >
              Ver Catálogo
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Indicador “scroll down” — oculto en pantallas bajas */}
      <IconButton
        aria-label="Bajar al catálogo"
        onClick={() => scrollToId("catalogo")}
        sx={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          animation: "bob 1.6s ease-in-out infinite",
          opacity: 0.8,
          display: { xs: "none", sm: "inline-flex" }
        }}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  );
}
