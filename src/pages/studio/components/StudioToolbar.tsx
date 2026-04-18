import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type StudioToolbarProps = {
  importControl?: ReactNode;
  drawingControls?: ReactNode;
  exportControl?: ReactNode;
};

export function StudioToolbar({
  importControl,
  drawingControls,
  exportControl,
}: StudioToolbarProps) {
  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, md: 3 },
        py: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h1" component="h1">
          GeoMapping Studio
        </Typography>
      </Stack>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {importControl}
          {drawingControls}
          {exportControl}
        </Stack>
      </Box>
    </Box>
  );
}
