import { useMemo } from "react";
import { PathLayer, ScatterplotLayer } from "@deck.gl/layers";
import type { LayersList } from "@deck.gl/core";

import type { GeoPosition } from "../../../entities/geo-feature/model/types";

type UseDrawingPreviewLayersOptions = {
  isDrawing: boolean;
  positions: GeoPosition[];
};

export function useDrawingPreviewLayers({
  isDrawing,
  positions,
}: UseDrawingPreviewLayersOptions): LayersList {
  return useMemo(() => {
    if (!isDrawing || positions.length === 0) {
      return [];
    }

    const previewPath =
      positions.length > 1 ? [...positions, positions[0]] : positions;

    const layers: LayersList = [
      new ScatterplotLayer({
        id: "PreviewPoints",
        data: positions,
        pickable: false,
        getPosition: (position: GeoPosition) => position,
        getRadius: 6,
        radiusMinPixels: 5,
        getFillColor: [25, 118, 210, 255],
      }),
    ];

    if (previewPath.length > 1) {
      layers.push(
        new PathLayer({
          id: "PreviewPath",
          data: [{ path: previewPath }],
          pickable: false,
          widthMinPixels: 2,
          getPath: (item: { path: GeoPosition[] }) => item.path,
          getColor: [25, 118, 210, 200],
          getWidth: 3,
        }),
      );
    }

    return layers;
  }, [isDrawing, positions]);
}
