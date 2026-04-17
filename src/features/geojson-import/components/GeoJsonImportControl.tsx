import { Alert, Box, Button, Stack, TextField } from "@mui/material";

import type { GeoJsonImportStatus } from "../model/types";

type GeoJsonImportControlProps = {
  sourceUrl: string;
  status: GeoJsonImportStatus;
  onSourceUrlChange: (value: string) => void;
  onImport: () => void;
};

export function GeoJsonImportControl({
  sourceUrl,
  status,
  onSourceUrlChange,
  onImport,
}: GeoJsonImportControlProps) {
  const isLoading = status.state === "loading";

  return (
    <Stack spacing={1} sx={{ width: 300 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          label="GeoJSON URL"
          placeholder="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
          value={sourceUrl}
          onChange={(event) => onSourceUrlChange(event.target.value)}
          disabled={isLoading}
        />
        <Button variant="contained" onClick={onImport} disabled={isLoading}>
          Import
        </Button>
      </Box>

      {status.state === "error" ? (
        <Alert severity="error">{status.message}</Alert>
      ) : null}

      {status.state === "success" ? (
        <Alert severity="success">{status.message}</Alert>
      ) : null}
    </Stack>
  );
}
