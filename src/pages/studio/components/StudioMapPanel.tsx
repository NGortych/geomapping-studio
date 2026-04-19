import { Box } from "@mui/material";
import { useEffect, useMemo } from "react";

import type {
  Feature,
  GeoPosition,
} from "../../../entities/geo-feature/model/types";
import { useDrawnGeoJsonLayer } from "../../../features/drawing/hooks/useDrawnGeoJsonLayer";
import { useDrawingPreviewLayers } from "../../../features/drawing/hooks/useDrawingPreviewLayers";
import { useImportedGeoJsonLayer } from "../../../features/geojson-import/hooks/useImportedGeoJsonLayer";
import { MapCanvas } from "../../../features/map/components/MapCanvas";
import { useMapViewport } from "../../../features/map/hooks/useMapViewport";
import { useSearchResultLayer } from "../../../features/search/hooks/useSearchResultLayer";
import type { SearchResult } from "../../../features/search/model/types";
import { DrawingActionsOverlay } from "./DrawingActionsOverlay";
import { MapInfoOverlay } from "./MapInfoOverlay";

type StudioMapPanelProps = {
  importedFeatures: Feature[];
  drawnFeatures: Feature[];
  searchResult: SearchResult | null;
  isDrawingModeEnabled: boolean;
  canFinishDrawing: boolean;
  drawingPositions: GeoPosition[];
  onMapClick: (position: GeoPosition) => void;
  onCancelDrawingDraft: () => void;
  onFinishDrawing: () => void;
  isVisible: boolean;
};

export function StudioMapPanel({
  importedFeatures,
  drawnFeatures,
  searchResult,
  isDrawingModeEnabled,
  canFinishDrawing,
  drawingPositions,
  onMapClick,
  onCancelDrawingDraft,
  onFinishDrawing,
  isVisible,
}: StudioMapPanelProps) {
  const { viewport, handleViewportChange, focusViewport } = useMapViewport();
  const importedGeoJsonLayer = useImportedGeoJsonLayer(importedFeatures);
  const drawnGeoJsonLayer = useDrawnGeoJsonLayer(drawnFeatures);
  const drawingPreviewLayers = useDrawingPreviewLayers({
    isDrawing: isDrawingModeEnabled,
    positions: drawingPositions,
  });
  const searchResultLayer = useSearchResultLayer(searchResult);

  const mapLayers = useMemo(
    () =>
      [
        importedGeoJsonLayer,
        drawnGeoJsonLayer,
        searchResultLayer,
        ...drawingPreviewLayers,
      ].filter(Boolean),
    [
      drawnGeoJsonLayer,
      drawingPreviewLayers,
      importedGeoJsonLayer,
      searchResultLayer,
    ],
  );

  useEffect(() => {
    if (!searchResult) {
      return;
    }

    focusViewport({
      longitude: searchResult.position[0],
      latitude: searchResult.position[1],
      zoom: searchResult.zoom,
    });
  }, [focusViewport, searchResult]);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        visibility: isVisible ? "visible" : "hidden",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <MapCanvas
        viewport={viewport}
        onViewportChange={handleViewportChange}
        onMapClick={onMapClick}
        isDrawing={isDrawingModeEnabled}
        layers={mapLayers}
      />

      <MapInfoOverlay
        totalFeatures={importedFeatures.length + drawnFeatures.length}
        drawnCount={drawnFeatures.length}
        viewport={viewport}
        isDrawingModeEnabled={isDrawingModeEnabled}
      />

      {isDrawingModeEnabled ? (
        <DrawingActionsOverlay
          pointCount={drawingPositions.length}
          canFinish={canFinishDrawing}
          onCancelDraft={onCancelDrawingDraft}
          onFinishPolygon={onFinishDrawing}
        />
      ) : null}
    </Box>
  );
}
