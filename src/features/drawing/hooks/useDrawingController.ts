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

  const canFinish = mode === "draw-polygon" && positions.length >= 3;

  function startDrawing() {
    setMode("draw-polygon");
    setPositions([]);
  }

  function cancelDrawing() {
    setMode("idle");
    setPositions([]);
  }

  function addPoint(position: GeoPosition) {
    if (mode === "idle") {
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

    setMode("idle");
    setPositions([]);
  }

  return {
    mode,
    positions,
    canFinish,
    isDrawing: mode !== "idle",
    startDrawing,
    cancelDrawing,
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
