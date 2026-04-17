import { Box, Container } from "@mui/material";

import { AppShell } from "../../app/layout/AppShell";
import { useFeatureDataset } from "../../entities/geo-feature/hooks/useFeatureDataset";
import { GeoJsonImportControl } from "../../features/geojson-import/components/GeoJsonImportControl";
import { useGeoJsonImport } from "../../features/geojson-import/hooks/useGeoJsonImport";
import { useImportedGeoJsonLayer } from "../../features/geojson-import/hooks/useImportedGeoJsonLayer";
import { MapCanvas } from "../../features/map/components/MapCanvas";
import { useMapViewport } from "../../features/map/hooks/useMapViewport";
import { StudioToolbar } from "./components/StudioToolbar";

export function StudioPage() {
  const { viewport, handleViewportChange } = useMapViewport();
  const { importedFeatures, setImportedFeatures } = useFeatureDataset();
  const importedGeoJsonLayer = useImportedGeoJsonLayer(importedFeatures);
  const { sourceUrl, setSourceUrl, status, handleImport } = useGeoJsonImport({
    onImportSuccess: setImportedFeatures,
  });

  return (
    <AppShell
      header={
        <StudioToolbar
          importControl={
            <GeoJsonImportControl
              sourceUrl={sourceUrl}
              status={status}
              onSourceUrlChange={setSourceUrl}
              onImport={handleImport}
            />
          }
        />
      }
      content={
        <Container
          maxWidth={false}
          sx={{
            height: "100%",
            px: { xs: 2, md: 3 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ height: "calc(100dvh - 163px)", minHeight: 520 }}>
            <MapCanvas
              viewport={viewport}
              onViewportChange={handleViewportChange}
              layers={importedGeoJsonLayer ? [importedGeoJsonLayer] : []}
            />
          </Box>
        </Container>
      }
    />
  );
}
