import type {
  Feature,
  JsonFeature,
  JsonFeatureCollection,
} from "../model/types";

export function toFeatureCollection(
  features: Feature[],
): JsonFeatureCollection {
  return {
    type: "FeatureCollection",
    features: features.map<JsonFeature>((feature) => ({
      type: "Feature",
      id: feature.id,
      geometry: feature.geometry,
      properties: feature.properties,
    })),
  };
}
