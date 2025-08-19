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
        minHeight: { xs: "60vh", md: "70vh" },
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        px: 2,
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(14,124,123,.08), rgba(244,162,97,.08)), radial-gradient(1000px 400px at 10% 0%, rgba(14,124,123,.12), transparent), radial-gradient(1000px 400px at 90% 100%, rgba(244,162,97,.12), transparent)",
        // Patrón de “baldosas” sutil (solo líneas, sin recargar)
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          maskImage: "radial-gradient(120% 70% at 50% 50%, black 50%, transparent 100%)",
        },
        "@keyframes bob": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(4px)" }
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Marca + Eslogan */}
        <Typography variant="h3" sx={{ mb: 1 }} fontWeight={800}>
          Todo Cerámico
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }} color="text.primary">
          Cerámica que transforma tus espacios.
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
        Asesoría directa por WhatsApp
        </Typography>

        {/* Badges / beneficios rápidos */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ mb: 3 }}
        >
          <Chip icon={<Inventory2Icon />} label="Porcelanato & Cerámica" variant="outlined" />
          <Chip icon={<VerifiedIcon />} label="Calidad garantizada" variant="outlined" />
          <Chip icon={<StorefrontIcon />} label="Exteriores & Interiores" variant="outlined" />
        </Stack>

        {/* CTAs */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
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
      </Container>

      {/* Indicador “scroll down” */}
      <IconButton
        aria-label="Bajar al catálogo"
        onClick={() => scrollToId("catalogo")}
        sx={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          animation: "bob 1.6s ease-in-out infinite",
          opacity: 0.8
        }}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  );
}
