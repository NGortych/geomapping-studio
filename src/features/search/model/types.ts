import type { GeoPosition } from "../../../entities/geo-feature/model/types";

export type SearchResult = {
  position: GeoPosition;
  zoom: number;
};

export type SearchStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success" }
  | { state: "error"; message: string };
