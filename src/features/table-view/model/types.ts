export type ViewMode = "map" | "table";

export type FeatureTableRow = {
  id: string;
  geometryType: string;
  source: string;
} & Record<string, unknown>;
