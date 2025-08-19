import * as React from "react";
import { Card, CardContent, CardActions, Typography, Box, Button, Chip, Stack } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { Product } from "../data/products";
import { waLink } from "../utils/wa";

type Props = { product: Product; sx?: SxProps<Theme> };

function ProductCardBase({ product, sx }: Props) {
  const href = waLink(`Hola, me interesa la cerámica "${product.name}". ¿Me das más info?`);

  return (
    <Card
      sx={{
        overflow: "hidden",
        transition: "transform .15s ease",
        "&:hover": { transform: "translateY(-2px)" },
        ...sx
      }}
    >
      <Box
        component="img"
        src={product.img}
        alt={`Cerámica ${product.name} ${product.size} ${product.finish}`}
        loading="lazy"
        decoding="async"
        /** width/height dan layout estable (asumimos imágenes cuadradas). Ajusta si usas otro tamaño. */
        width={600}
        height={600}
        /** Hint responsive: 4/3/2/1 columnas */
        sizes="(min-width:1200px) 25vw, (min-width:900px) 33vw, (min-width:600px) 50vw, 100vw"
        style={{ aspectRatio: "1 / 1", objectFit: "cover", display: "block", width: "100%", height: "auto" }}
      />

      <CardContent sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
          <Typography variant="h6">{product.name}</Typography>
          {!!product.category && <Chip size="small" label={product.category} />}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {product.size} · {product.finish}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar ${product.name} por WhatsApp`}
        >
          Consultar por WhatsApp
        </Button>
      </CardActions>
    </Card>
  );
}

export default React.memo(ProductCardBase);
