import { useMemo } from "react";
import { GeoJsonLayer } from "@deck.gl/layers";

import type { Feature } from "../../../entities/geo-feature/model/types";
import { toFeatureCollection } from "../../../entities/geo-feature/utils/toFeatureCollection";

export function useDrawnGeoJsonLayer(drawnFeatures: Feature[]) {
  return useMemo(() => {
    if (drawnFeatures.length === 0) {
      return null;
    }

    return new GeoJsonLayer({
      id: "DrawnGeojsonLayer",
      data: toFeatureCollection(drawnFeatures),
      filled: true,
      stroked: false,
      pointType: "circle",
      pickable: false,
      getFillColor: [25, 118, 210, 150],
      getLineColor: [25, 118, 210, 220],
      getPointRadius: 6,
      getLineWidth: 12,
      lineWidthMinPixels: 4,
      pointRadiusMinPixels: 6,
      radiusMinPixels: 8,
      getRadius: 10,
    });
  }, [drawnFeatures]);
}
