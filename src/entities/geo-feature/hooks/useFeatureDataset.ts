import { useMemo, useState } from "react";

import type { Feature } from "../model/types";

export function useFeatureDataset() {
  const [importedFeatures, setImportedFeatures] = useState<Feature[]>([]);
  const [drawnFeatures] = useState<Feature[]>([]);

  const allFeatures = useMemo(
    () => [...importedFeatures, ...drawnFeatures],
    [drawnFeatures, importedFeatures],
  );

  return {
    importedFeatures,
    drawnFeatures,
    allFeatures,
    setImportedFeatures,
  };
}
