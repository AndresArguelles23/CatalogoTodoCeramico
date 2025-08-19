// src/sections/Catalog.tsx
import * as React from "react";
import {
  Container, Typography, Stack, TextField, InputAdornment,
  Box, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControlLabel, RadioGroup, Radio, Divider
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

// normaliza texto (sin tildes, minúsculas)
const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

type SortKey = "name-asc" | "name-desc";

export default function Catalog() {
  // listas únicas
  const categories = React.useMemo(() => ["Todos", ...Array.from(new Set(PRODUCTS.map(p => p.category).filter(Boolean)))], []);
  const sizes      = React.useMemo(() => ["Todos", ...Array.from(new Set(PRODUCTS.map(p => p.size).filter(Boolean)))], []);
  const finishes   = React.useMemo(() => ["Todos", ...Array.from(new Set(PRODUCTS.map(p => p.finish).filter(Boolean)))], []);

  // estado filtros
  const [cat, setCat] = React.useState("Todos");
  const [size, setSize] = React.useState("Todos");
  const [finish, setFinish] = React.useState("Todos");
  const [q, setQ] = React.useState("");
  const [sort, setSort] = React.useState<SortKey>("name-asc");

  const hasActive =
    cat !== "Todos" || size !== "Todos" || finish !== "Todos" || q.trim().length > 0 || sort !== "name-asc";

  // abrir/cerrar diálogo de filtros
  const [open, setOpen] = React.useState(false);
  const openFilters = () => setOpen(true);
  const closeFilters = () => setOpen(false);

  const applyFilters = () => {
    // aquí solo cerramos; los valores ya están en estado
    closeFilters();
  };

  const clearAll = () => {
    setCat("Todos");
    setSize("Todos");
    setFinish("Todos");
    setQ("");
    setSort("name-asc");
  };

  // filtrado + búsqueda + orden
  const filtered = React.useMemo(() => {
    const nq = norm(q);
    const list = PRODUCTS.filter(p => {
      const byCat = cat === "Todos" || p.category === cat;
      const bySize = size === "Todos" || p.size === size;
      const byFinish = finish === "Todos" || p.finish === finish;
      if (!(byCat && bySize && byFinish)) return false;

      if (!nq) return true;
      const hay = norm(`${p.name} ${p.size} ${p.finish} ${p.category}`);
      return nq.split(/\s+/).every(word => hay.includes(word));
    });

    const sorted = [...list].sort((a, b) => {
      const an = a.name.toLocaleLowerCase();
      const bn = b.name.toLocaleLowerCase();
      return sort === "name-asc" ? an.localeCompare(bn) : bn.localeCompare(an);
    });

    return sorted;
  }, [cat, size, finish, q, sort]);

  return (
    <Container id="catalogo" maxWidth="lg" sx={{ py: 6 }}>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Catálogo
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}{hasActive ? " · filtros activos" : ""}
        </Typography>
      </Stack>

      {/* Barra compacta: Buscar + Orden + Filtros */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar por nombre, tamaño o acabado…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          inputProps={{ "aria-label": "Buscar productos" }}
        />

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<TuneIcon />} onClick={openFilters}>
            Filtros
          </Button>
          <Button variant="text" onClick={clearAll} disabled={!hasActive}>
            Limpiar
          </Button>
        </Stack>
      </Stack>

      {/* Grid de productos */}
      <Grid container spacing={2}>
        {filtered.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de filtros (Categoría / Tamaño / Acabado) */}
      <Dialog open={open} onClose={closeFilters} fullWidth maxWidth="sm" aria-labelledby="filtros-title">
        <DialogTitle id="filtros-title">Filtrar productos</DialogTitle>
        <DialogContent dividers>
          {/* Categoría */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Categoría</Typography>
            <RadioGroup
              row
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              {categories.map((c) => (
                <FormControlLabel key={c} value={c} control={<Radio />} label={c} />
              ))}
            </RadioGroup>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Tamaño */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Tamaño</Typography>
            <RadioGroup
              row
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {sizes.map((s) => (
                <FormControlLabel key={s} value={s} control={<Radio />} label={s} />
              ))}
            </RadioGroup>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Acabado */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Acabado</Typography>
            <RadioGroup
              row
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
            >
              {finishes.map((f) => (
                <FormControlLabel key={f} value={f} control={<Radio />} label={f} />
              ))}
            </RadioGroup>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={clearAll} variant="text" disabled={!hasActive}>Limpiar</Button>
          <Button onClick={applyFilters} variant="contained">Aplicar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
