import type { Feature } from "../../../entities/geo-feature/model/types";
import { exportFeaturesAsGeoJson } from "../services/exportFeaturesAsGeoJson";

export function useGeoJsonExport(features: Feature[]) {
  const canExport = features.length > 0;

  function handleExport() {
    if (!canExport) {
      return;
    }
    exportFeaturesAsGeoJson(features);
  }

  return {
    canExport,
    handleExport,
  };
}
