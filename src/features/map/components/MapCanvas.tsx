import { DeckGL } from "deck.gl";
import type { MapViewState } from "@deck.gl/core";
import { Paper } from "@mui/material";
import maplibregl from "maplibre-gl";
import Map from "react-map-gl/maplibre";

import type { MapViewport } from "../../../entities/viewport/model/types";
import { openStreetMapStyle } from "../config/baseMapStyle";

type MapCanvasProps = {
  viewport: MapViewport;
  onViewportChange: (viewport: MapViewport) => void;
};

export function MapCanvas({ viewport, onViewportChange }: MapCanvasProps) {
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
        controller
        viewState={viewport as MapViewState}
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
  viewState: MapViewState | Record<string, unknown>
): viewState is MapViewState {
  return (
    typeof viewState.longitude === "number" &&
    typeof viewState.latitude === "number" &&
    typeof viewState.zoom === "number"
  );
}
