import type { Feature } from "../../../entities/geo-feature/model/types";
import { toFeatureCollection } from "../../../entities/geo-feature/utils/toFeatureCollection";
import { downloadFile } from "../../../shared/lib/downloadBlob";

export function exportFeaturesAsGeoJson(features: Feature[]) {
  if (features.length === 0) {
    return;
  }

  const featureCollection = toFeatureCollection(features);
  const serialized = JSON.stringify(featureCollection);
  const fileName = `mapping-data-${new Date().toISOString().slice(0, 10)}.geojson`;

  downloadFile({
    blob: new Blob([serialized], {
      type: "application/geo+json;charset=utf-8",
    }),
    fileName,
  });
}
