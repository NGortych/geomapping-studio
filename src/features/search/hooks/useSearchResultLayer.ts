import { useMemo } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";

import type { SearchResult } from "../model/types";

export function useSearchResultLayer(searchResult: SearchResult | null) {
  return useMemo(() => {
    if (!searchResult) {
      return null;
    }

    return new ScatterplotLayer({
      id: "SearchResultLayer",
      data: [searchResult],
      pickable: false,
      stroked: false,
      filled: true,
      radiusMinPixels: 8,
      lineWidthMinPixels: 3,
      getPosition: (result: SearchResult) => result.position,
      getRadius: 10,
      getFillColor: [120, 53, 15, 255],
    });
  }, [searchResult]);
}
