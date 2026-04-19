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
    <Box sx={{ width: "100%" }}>
      <Button
        variant="contained"
        disabled={disabled}
        onClick={onExport}
        fullWidth
      >
        Export
      </Button>
    </Box>
  );
}
