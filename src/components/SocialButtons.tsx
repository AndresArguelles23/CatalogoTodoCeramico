// src/components/SocialButtons.tsx

import { Stack, IconButton, Tooltip } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MusicNoteIcon from "@mui/icons-material/MusicNote"; 
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { waLink } from "../utils/wa";

type Props = {
  size?: "small" | "medium" | "large";
  color?: "default" | "inherit" | "primary" | "secondary";
  spacing?: number;
};

export default function SocialButtons({
  size = "medium",
  color = "primary",
  spacing = 1.25,
}: Props) {
  const common = { size, color } as const;

  return (
    <Stack direction="row" spacing={spacing} alignItems="center" flexWrap="wrap">
      <Tooltip title="WhatsApp">
        <IconButton
          component="a"
          href={waLink("Hola, estoy interesado/a en las cerámicas de Mundo Cerámico.")}
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp"
          {...common}
        >
          <WhatsAppIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Instagram">
        <IconButton
          component="a"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
          {...common}
        >
          <InstagramIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Facebook">
        <IconButton
          component="a"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener"
          aria-label="Facebook"
          {...common}
        >
          <FacebookIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="TikTok">
        <IconButton
          component="a"
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener"
          aria-label="TikTok"
          {...common}
        >
          <MusicNoteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
