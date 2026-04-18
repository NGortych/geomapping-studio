import { DeckGL } from "@deck.gl/react";
import type { LayersList, MapViewState, PickingInfo } from "@deck.gl/core";
import { Paper } from "@mui/material";
import maplibregl from "maplibre-gl";
import Map from "react-map-gl/maplibre";

import type { GeoPosition } from "../../../entities/geo-feature/model/types";
import type { MapViewport } from "../../../entities/viewport/model/types";
import { openStreetMapStyle } from "../config/baseMapStyle";

type MapCanvasProps = {
  viewport: MapViewport;
  onViewportChange: (viewport: MapViewport) => void;
  layers?: LayersList;
  onMapClick?: (position: GeoPosition) => void;
  isDrawing?: boolean;
};

export function MapCanvas({
  viewport,
  onViewportChange,
  layers = [],
  onMapClick,
  isDrawing = false,
}: MapCanvasProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
        border: 1,
        borderColor: "divider",
      }}
    >
      <DeckGL
        controller={{
          dragPan: !isDrawing,
          doubleClickZoom: !isDrawing,
        }}
        getCursor={({ isDragging }) => {
          if (isDrawing) {
            return "crosshair";
          }

          return isDragging ? "grabbing" : "grab";
        }}
        layers={layers}
        viewState={viewport as MapViewState}
        onClick={(info: PickingInfo) => {
          if (!onMapClick || !info.coordinate) {
            return;
          }

          onMapClick([info.coordinate[0], info.coordinate[1]]);
        }}
        onViewStateChange={({ viewState }) => {
          if (!isMapViewportState(viewState)) {
            return;
          }

          onViewportChange({
            longitude: viewState.longitude,
            latitude: viewState.latitude,
            zoom: viewState.zoom,
          });
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Map mapLib={maplibregl} reuseMaps mapStyle={openStreetMapStyle} />
      </DeckGL>
    </Paper>
  );
}

function isMapViewportState(
  viewState: MapViewState | Record<string, unknown>,
): viewState is MapViewState {
  return (
    typeof viewState.longitude === "number" &&
    typeof viewState.latitude === "number" &&
    typeof viewState.zoom === "number"
  );
}
