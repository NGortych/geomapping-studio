import { useMemo, useState } from "react";

import type { Feature } from "../model/types";

export function useFeatureDataset() {
  const [importedFeatures, setImportedFeatures] = useState<Feature[]>([]);
  const [drawnFeatures, setDrawnFeatures] = useState<Feature[]>([]);

  const allFeatures = useMemo(
    () => [...importedFeatures, ...drawnFeatures],
    [drawnFeatures, importedFeatures],
  );

  function addDrawnFeature(feature: Feature) {
    setDrawnFeatures((currentFeatures) => [...currentFeatures, feature]);
  }

  return {
    importedFeatures,
    drawnFeatures,
    allFeatures,
    setImportedFeatures,
    addDrawnFeature,
  };
}
