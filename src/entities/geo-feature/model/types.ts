export type GeoType =
  | "Point"
  | "MultiPoint"
  | "LineString"
  | "MultiLineString"
  | "Polygon"
  | "MultiPolygon";

export type GeoPosition = [number, number];

export type Geometry =
  | { type: "Point"; coordinates: GeoPosition }
  | { type: "MultiPoint"; coordinates: GeoPosition[] }
  | { type: "LineString"; coordinates: GeoPosition[] }
  | { type: "MultiLineString"; coordinates: GeoPosition[][] }
  | { type: "Polygon"; coordinates: GeoPosition[][] }
  | { type: "MultiPolygon"; coordinates: GeoPosition[][][] };

export type FeatureSource = "imported" | "drawn";

export type Feature = {
  id: string;
  source: FeatureSource;
  geometry: Geometry;
  properties: Record<string, unknown>;
};

export type JsonFeature = {
  type: "Feature";
  id?: string | number;
  geometry: Geometry;
  properties: Record<string, unknown>;
};

export type JsonFeatureCollection = {
  type: "FeatureCollection";
  features: JsonFeature[];
};
