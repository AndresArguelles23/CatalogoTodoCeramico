// src/sections/Contact.tsx

import {
  Box, Container, Stack, Typography, Chip, Card, CardContent, List,
  ListItem, ListItemIcon, ListItemText
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PaymentsIcon from "@mui/icons-material/Payments";
import SocialButtons from "../components/SocialButtons";
import { waLink } from "../utils/wa";
import { useTheme, alpha } from "@mui/material/styles";

export default function Contact() {
  const theme = useTheme();
  const bg = theme.palette.mode === "dark" ? "background.default" : "grey.50";

  return (
    <Box id="contacto" sx={{ py: 6, bgcolor: bg }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Columna izquierda: CTA + info breve */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Contacto
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              ¿Listo para transformar tus espacios? Escríbenos y cotiza al instante.
            </Typography>

            {/* Meta-información rápida */}
            <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", rowGap: 1 }}>
              <Chip icon={<PlaceIcon />} label="Barranquilla" variant="outlined" />
              <Chip icon={<AccessTimeIcon />} label="Lun–Sáb · 8:00 a.m. – 5:00 p.m." variant="outlined" />
            </Stack>

            {/* CTA principal + redes */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start" sx={{ width: "100%", mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<WhatsAppIcon />}
                href={waLink("Hola, me interesa el catálogo de Mundo Cerámico.")}
                target="_blank"
                rel="noopener"
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                Cotiza por WhatsApp
              </Button>

              {/* Redes: solo iconos, activas */}
              <SocialButtons size="medium" color="primary" />
            </Stack>

            {/* Cómo cotizar (micro-guía) */}
            <Stack spacing={0.5} sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              maxWidth: 520
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                ¿Cómo cotizar?
              </Typography>
              <Typography variant="body2" color="text.secondary">
               1) Abre el catálogo 
              </Typography>
              <Typography variant="body2" color="text.secondary">
               2) Envía por WhatsApp el nombre del producto 
                </Typography>
              <Typography variant="body2" color="text.secondary">         
               3) Recibe precio y disponibilidad.
                </Typography>
            </Stack>
          </Grid>

          {/* Columna derecha: confianza / detalles */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                  Atención y servicio
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Respuesta rápida por WhatsApp. confirmamos stock y tiempos al momento de cotizar.
                </Typography>

                <List dense>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 34 }}><LocalShippingIcon /></ListItemIcon>
                    <ListItemText primary="Envíos y entregas coordinadas" secondary="Coordinamos según zona y disponibilidad" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 34 }}><Inventory2Icon /></ListItemIcon>
                    <ListItemText primary="Stock verificado" secondary="Confirmación en tiempo real por WhatsApp" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 34 }}><PaymentsIcon /></ListItemIcon>
                    <ListItemText primary="Medios de pago" secondary="A convenir al momento de la compra" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
