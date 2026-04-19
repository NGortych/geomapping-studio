import { useMemo } from "react";
import { GeoJsonLayer } from "@deck.gl/layers";

import type { Feature } from "../../../entities/geo-feature/model/types";
import { toFeatureCollection } from "../../../entities/geo-feature/utils/toFeatureCollection";

export function useImportedGeoJsonLayer(importedFeatures: Feature[]) {
  return useMemo(() => {
    if (importedFeatures.length === 0) {
      return null;
    }

    return new GeoJsonLayer({
      id: "ImportedGeojsonLayer",
      data: toFeatureCollection(importedFeatures),
      filled: true,
      stroked: false,
      pointType: "circle",
      pickable: false,
      getFillColor: [255, 0, 0, 150],
      getLineColor: [255, 0, 0, 220],
      getPointRadius: 6,
      getLineWidth: 12,
      lineWidthMinPixels: 4,
      pointRadiusMinPixels: 6,
      radiusMinPixels: 8,
      getRadius: 10,
    });
  }, [importedFeatures]);
}
