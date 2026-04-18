import type { GeoPosition } from "../../../entities/geo-feature/model/types";

export type DrawingMode = "idle" | "draw-polygon";

export type DrawingDraft = {
  positions: GeoPosition[];
};
