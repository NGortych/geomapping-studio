import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import type { MapViewport } from "../../../entities/viewport/model/types";

type MapInfoOverlayProps = {
  totalFeatures: number;
  drawnCount: number;
  viewport: MapViewport;
  isDrawingModeEnabled: boolean;
};

export function MapInfoOverlay({
  totalFeatures,
  drawnCount,
  viewport,
  isDrawingModeEnabled,
}: MapInfoOverlayProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        top: { xs: 12, md: 16 },
        left: { xs: 12, md: 16 },
        p: 1.5,
        border: 1,
        borderColor: "divider",
        pointerEvents: "none",
        maxWidth: 360,
      }}
    >
      <Stack spacing={1.25}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Map information
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 1,
          }}
        >
          <Metric label="Total Features" value={String(totalFeatures)} />
          <Metric label="Drawn" value={String(drawnCount)} />
          <Metric label="Lat" value={viewport.latitude.toFixed(4)} />
          <Metric label="Lng" value={viewport.longitude.toFixed(4)} />
          <Metric label="Zoom" value={viewport.zoom.toFixed(2)} />
        </Box>
        {isDrawingModeEnabled && (
          <Chip label="Drawing Mode Active" color="primary" size="small" />
        )}
      </Stack>
    </Paper>
  );
}

type MetricProps = {
  label: string;
  value: string;
};

function Metric({ label, value }: MetricProps) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}
