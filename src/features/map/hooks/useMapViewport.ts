import { useCallback, useState } from "react";

import type { MapViewport } from "../../../entities/viewport/model/types";
import { DEFAULT_MAP_VIEWPORT } from "../config/defaultViewport";

export function useMapViewport(
  initialViewport: MapViewport = DEFAULT_MAP_VIEWPORT,
) {
  const [viewport, setViewport] = useState<MapViewport>(initialViewport);

  const focusViewport = useCallback((nextViewport: MapViewport) => {
    setViewport(nextViewport);
  }, []);

  const handleViewportChange = useCallback((nextViewport: MapViewport) => {
    setViewport(nextViewport);
  }, []);

  return {
    viewport,
    setViewport,
    focusViewport,
    handleViewportChange,
  };
}
