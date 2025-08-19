// src/sections/HeaderBar.tsx (sin buscador)
import * as React from "react";
import {
  AppBar, Toolbar, Typography, Stack, Button, IconButton, Tooltip,
  Drawer, List, ListItemButton, ListItemText, Divider, Box
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { scrollToId } from "../utils/scroll";
import { ColorModeContext } from "../theme";
import { useTheme, alpha } from "@mui/material/styles";
import logoUrl from "../assets/logo-mc.svg";

const SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "catalogo", label: "Catálogo" },
  { id: "contacto", label: "Contacto" },
];

export default function HeaderBar() {
  const theme = useTheme();
  const { mode, toggle } = React.useContext(ColorModeContext);

  // Header reactivo al scroll
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sección activa
  const [active, setActive] = React.useState<string>("inicio");
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(id)),
        { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Drawer móvil
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (val: boolean) => () => setOpen(val);
  const goTo = (id: string) => () => { scrollToId(id); setOpen(false); };

  // Estética del AppBar
  const bg = scrolled ? alpha(theme.palette.background.paper, 0.7) : "transparent";
  const toolbarMinH = scrolled ? 56 : 72;

  const isActive = (id: string) => active === id;
  const navBtnSx = (id: string) => ({
    position: "relative",
    fontWeight: isActive(id) ? 700 : 500,
    "&::after": {
      content: '""',
      position: "absolute",
      left: 8, right: 8, bottom: 6, height: 2, borderRadius: 2,
      backgroundColor: isActive(id) ? theme.palette.primary.main : "transparent",
      transition: "all .2s",
    },
  });

  return (
    <>
      {/* Skip link accesible */}
      <a
        href="#catalogo"
        style={{ position: "absolute", left: -9999, top: -9999 }}
        onFocus={(e) => {
          e.currentTarget.style.left = "8px";
          e.currentTarget.style.top = "8px";
          e.currentTarget.style.background = theme.palette.background.paper;
          e.currentTarget.style.padding = "8px 12px";
          e.currentTarget.style.borderRadius = "8px";
          e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,.2)";
          e.currentTarget.style.zIndex = "2000";
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = "-9999px";
          e.currentTarget.style.top = "-9999px";
          e.currentTarget.removeAttribute("style");
        }}
      >
        Saltar al catálogo
      </a>

      <AppBar
        position="sticky"
        elevation={scrolled ? 6 : 0}
        color="transparent"
        sx={{
          backdropFilter: scrolled ? "blur(10px)" : "none",
          backgroundColor: bg,
          borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : "transparent",
          transition: "all .2s ease",
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: toolbarMinH }}>
          {/* Menú móvil */}
          <IconButton
            aria-label="Abrir menú"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "inline-flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Marca (logo + nombre) */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={goTo("inicio")}
          >
            <Box component="img" src={logoUrl} alt="Mundo Cerámico" sx={{ width: 28, height: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.3 }}>
              Todo Cerámico
            </Typography>
          </Stack>

          {/* Navegación desktop */}
          <Stack direction="row" spacing={1} sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
            <Button onClick={goTo("inicio")}   sx={navBtnSx("inicio")}>Inicio</Button>
            <Button onClick={goTo("catalogo")} sx={navBtnSx("catalogo")}>Catálogo</Button>
            <Button onClick={goTo("contacto")} sx={navBtnSx("contacto")}>Contacto</Button>

            {/* Toggle tema */}
            <Tooltip title={mode === "dark" ? "Modo claro" : "Modo oscuro"}>
              <IconButton onClick={toggle} aria-label="Cambiar tema" sx={{ ml: 1 }}>
                {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer móvil (sin buscador) */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} PaperProps={{ sx: { width: 320 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box component="img" src={logoUrl} alt="Mundo Cerámico" sx={{ width: 24, height: 24 }} />
            <Typography variant="h6" fontWeight={800}>Mundo Cerámico</Typography>
          </Stack>
          <IconButton aria-label="Cerrar menú" onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider />

        <List>
          {SECTIONS.map((s) => (
            <ListItemButton key={s.id} onClick={goTo(s.id)}>
              <ListItemText
                primary={s.label}
                primaryTypographyProps={{ fontWeight: active === s.id ? 700 : 500 }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider />
        <Stack sx={{ p: 2 }} spacing={1}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Tema</Typography>
            <IconButton onClick={toggle} aria-label="Cambiar tema">
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
