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
      pickable: true,
      getFillColor: [255, 0, 0, 200],
      getLineColor: [255, 0, 0, 220],
      getPointRadius: 6,
      getLineWidth: 10,
      lineWidthMinPixels: 3,
      pointRadiusMinPixels: 5,
    });
  }, [importedFeatures]);
}
