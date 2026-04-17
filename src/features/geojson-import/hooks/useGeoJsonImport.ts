import { useCallback, useState } from "react";

import type { Feature } from "../../../entities/geo-feature/model/types";
import type { GeoJsonImportStatus } from "../model/types";
import { importGeoJsonFromUrl } from "../services/geoJsonImportService";

type UseGeoJsonImportOptions = {
  onImportSuccess: (features: Feature[]) => void;
};

export function useGeoJsonImport({
  onImportSuccess,
}: UseGeoJsonImportOptions) {
  const [sourceUrl, setSourceUrl] = useState("");
  const [status, setStatus] = useState<GeoJsonImportStatus>({ state: "idle" });

  const handleImport = useCallback(async () => {
    const trimmedUrl = sourceUrl.trim();

    if (!trimmedUrl) {
      setStatus({
        state: "error",
        message: "Please provide a valid URL.",
      });
      return;
    }

    setStatus({ state: "loading" });

    try {
      const result = await importGeoJsonFromUrl(trimmedUrl);

      onImportSuccess(result.features);
      setStatus({
        state: "success",
        message: `Imported ${result.features.length} features successfully.`,
      });
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "Import failed.",
      });
    }
  }, [onImportSuccess, sourceUrl]);

  return {
    sourceUrl,
    setSourceUrl,
    status,
    handleImport,
  };
}
