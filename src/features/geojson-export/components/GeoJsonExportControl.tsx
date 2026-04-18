import { Box, Button } from "@mui/material";

type GeoJsonExportControlProps = {
  disabled: boolean;
  onExport: () => void;
};

export function GeoJsonExportControl({
  disabled,
  onExport,
}: GeoJsonExportControlProps) {
  return (
    <Box>
      <Button variant="contained" disabled={disabled} onClick={onExport}>
        Export
      </Button>
    </Box>
  );
}
