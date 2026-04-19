import { useState } from "react";

import type {
  Feature,
  GeoPosition,
} from "../../../entities/geo-feature/model/types";
import type { DrawingMode } from "../model/types";

type UseDrawingControllerOptions = {
  onDrawComplete: (feature: Feature) => void;
};

export function useDrawingController({
  onDrawComplete,
}: UseDrawingControllerOptions) {
  const [mode, setMode] = useState<DrawingMode>("idle");
  const [positions, setPositions] = useState<GeoPosition[]>([]);
  const isDrawingModeEnabled = mode === "draw-polygon";

  const canFinish = isDrawingModeEnabled && positions.length >= 3;

  function enableDrawingMode() {
    setMode("draw-polygon");
  }

  function disableDrawingMode() {
    setMode("idle");
    setPositions([]);
  }

  function clearDraft() {
    setPositions([]);
  }

  function addPoint(position: GeoPosition) {
    if (!isDrawingModeEnabled) {
      return;
    }

    setPositions((currentPositions) => [...currentPositions, position]);
  }

  function finishDrawing() {
    if (!canFinish) {
      return;
    }

    onDrawComplete({
      id: `Feature-${Date.now()}`,
      source: "drawn",
      geometry: {
        type: "Polygon",
        coordinates: [closePolygon(positions)],
      },
      properties: {},
    });

    setPositions([]);
  }

  return {
    mode,
    positions,
    canFinish,
    hasDraft: positions.length > 0,
    isDrawing: isDrawingModeEnabled,
    enableDrawingMode,
    disableDrawingMode,
    clearDraft,
    addPoint,
    finishDrawing,
  };
}

function closePolygon(positions: GeoPosition[]) {
  if (positions.length === 0) {
    return positions;
  }

  return [...positions, positions[0]];
}
