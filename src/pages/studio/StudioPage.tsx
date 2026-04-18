import { Box, Container } from "@mui/material";
import { useMemo, useState } from "react";

import { AppShell } from "../../app/layout/AppShell";
import { useFeatureDataset } from "../../entities/geo-feature/hooks/useFeatureDataset";
import { DrawingControls } from "../../features/drawing/components/DrawingControls";
import { useDrawingController } from "../../features/drawing/hooks/useDrawingController";
import { useDrawingPreviewLayers } from "../../features/drawing/hooks/useDrawingPreviewLayers";
import { useDrawnGeoJsonLayer } from "../../features/drawing/hooks/useDrawnGeoJsonLayer";
import { GeoJsonExportControl } from "../../features/geojson-export/components/GeoJsonExportControl";
import { useGeoJsonExport } from "../../features/geojson-export/hooks/useGeoJsonExport";
import { GeoJsonImportControl } from "../../features/geojson-import/components/GeoJsonImportControl";
import { useGeoJsonImport } from "../../features/geojson-import/hooks/useGeoJsonImport";
import { useImportedGeoJsonLayer } from "../../features/geojson-import/hooks/useImportedGeoJsonLayer";
import { MapCanvas } from "../../features/map/components/MapCanvas";
import { useMapViewport } from "../../features/map/hooks/useMapViewport";
import { TableView } from "../../features/table-view/components/TableView";
import { ViewModeControl } from "../../features/table-view/components/ViewModeControl";
import type { ViewMode } from "../../features/table-view/model/types";
import { StudioToolbar } from "./components/StudioToolbar";

export function StudioPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const { viewport, handleViewportChange } = useMapViewport();
  const {
    importedFeatures,
    drawnFeatures,
    allFeatures,
    setImportedFeatures,
    addDrawnFeature,
  } = useFeatureDataset();
  const importedGeoJsonLayer = useImportedGeoJsonLayer(importedFeatures);
  const drawnGeoJsonLayer = useDrawnGeoJsonLayer(drawnFeatures);
  const { sourceUrl, setSourceUrl, status, handleImport } = useGeoJsonImport({
    onImportSuccess: setImportedFeatures,
  });
  const { canExport, handleExport } = useGeoJsonExport(drawnFeatures);
  const {
    positions,
    canFinish,
    isDrawing,
    startDrawing,
    cancelDrawing,
    addPoint,
    finishDrawing,
  } = useDrawingController({
    onDrawComplete: addDrawnFeature,
  });
  const drawingPreviewLayers = useDrawingPreviewLayers({
    isDrawing,
    positions,
  });
  const mapLayers = useMemo(
    () =>
      [importedGeoJsonLayer, drawnGeoJsonLayer, ...drawingPreviewLayers].filter(
        Boolean,
      ),
    [drawnGeoJsonLayer, drawingPreviewLayers, importedGeoJsonLayer],
  );

  return (
    <AppShell
      header={
        <StudioToolbar
          viewModeControl={
            <ViewModeControl
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          }
          importControl={
            <GeoJsonImportControl
              sourceUrl={sourceUrl}
              status={status}
              onSourceUrlChange={setSourceUrl}
              onImport={handleImport}
            />
          }
          drawingControls={
            <DrawingControls
              isDrawing={isDrawing}
              pointCount={positions.length}
              canFinish={canFinish}
              onStartPolygon={startDrawing}
              onFinish={finishDrawing}
              onCancel={cancelDrawing}
            />
          }
          exportControl={
            <GeoJsonExportControl
              disabled={!canExport}
              onExport={handleExport}
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
          {viewMode === "map" ? (
            <Box sx={{ height: "calc(100dvh - 163px)", minHeight: 520 }}>
              <MapCanvas
                viewport={viewport}
                onViewportChange={handleViewportChange}
                onMapClick={addPoint}
                isDrawing={isDrawing}
                layers={mapLayers}
              />
            </Box>
          ) : (
            <Box sx={{ height: "calc(100dvh - 163px)", minHeight: 520 }}>
              <TableView features={allFeatures} />
            </Box>
          )}
        </Container>
      }
    />
  );
}
