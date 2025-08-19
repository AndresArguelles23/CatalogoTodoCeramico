// src/sections/FooterBar.tsx

import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  IconButton,
  Divider,
  Tooltip
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SocialButtons from "../components/SocialButtons";
import { scrollToId } from "../utils/scroll";

export default function FooterBar() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      role="contentinfo"
      sx={{ mt: 8, borderTop: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Fila principal */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          {/* Marca + info corta */}
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={800}>Todo Cerámico</Typography>
            <Typography variant="body2" color="text.secondary">
              Barranquilla · Lun–Sáb: 8:00 a.m. – 5:00 p.m.
            </Typography>
          </Stack>

          {/* Enlaces rápidos (nav accesible) */}
          <Box component="nav" aria-label="Enlaces rápidos">
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Button size="small" variant="text" onClick={() => scrollToId("inicio")}>Inicio</Button>
              <Button size="small" variant="text" onClick={() => scrollToId("catalogo")}>Catálogo</Button>
              <Button size="small" variant="text" onClick={() => scrollToId("contacto")}>Contacto</Button>
            </Stack>
          </Box>

          {/* Redes + volver arriba (nav accesible) */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box component="nav" aria-label="Redes sociales">
              <SocialButtons size="medium" color="primary" />
            </Box>
            <Tooltip title="Volver arriba">
              <IconButton
                aria-label="Volver arriba"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <ArrowUpwardIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Legal breve (sin enlaces) */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <Typography variant="body2" color="text.secondary">
            © {year} Todo Cerámico · Todos los derechos reservados
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
