import { useMemo } from "react";
import { GeoJsonLayer } from "@deck.gl/layers";

import type { Feature } from "../../../entities/geo-feature/model/types";
import { toFeatureCollection } from "../../../entities/geo-feature/utils/toFeatureCollection";

export function useSelectedGeoJsonLayer(selectedFeatures: Feature[]) {
  return useMemo(() => {
    if (selectedFeatures.length === 0) {
      return null;
    }

    return new GeoJsonLayer({
      id: "SelectedGeojsonLayer",
      data: toFeatureCollection(selectedFeatures),
      filled: true,
      stroked: true,
      pointType: "circle",
      pickable: false,
      getFillColor: [255, 193, 7, 140],
      getLineColor: [255, 143, 0, 255],
      getPointRadius: 8,
      getLineWidth: 14,
      lineWidthMinPixels: 5,
      pointRadiusMinPixels: 7,
      radiusMinPixels: 10,
      getRadius: 12,
    });
  }, [selectedFeatures]);
}
