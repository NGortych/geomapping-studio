import type {
  Feature,
  GeoPosition,
  Geometry,
  GeoType,
} from "../../../entities/geo-feature/model/types";
import type { GeoJsonImportResult } from "../model/types";

type FeatureCollectionInput = {
  type: "FeatureCollection";
  features: unknown[];
};

type FeatureInput = {
  type: "Feature";
  id?: string | number;
  geometry?: unknown;
  properties?: unknown;
};

type GeometryInput = {
  type?: unknown;
  coordinates?: unknown;
};

export async function importGeoJsonFromUrl(
  sourceUrl: string,
): Promise<GeoJsonImportResult> {
  const parsedUrl = parseUrl(sourceUrl);

  let response: Response;

  try {
    response = await fetch(parsedUrl.toString());
  } catch {
    throw new Error("Unable to fetch GeoJSON from the provided URL.");
  }

  if (!response.ok) {
    throw new Error("Unable to fetch GeoJSON from the provided URL.");
  }

  try {
    const data = (await response.json()) as unknown;
    const featureCollection = readFeatureCollection(data);
    const features = featureCollection.features
      .map((featureData, index) => toImportedFeature(featureData, index))
      .filter((feature): feature is Feature => feature !== null);

    if (featureCollection.features.length === 0 || features.length === 0) {
      throw new Error("Invalid data.");
    }

    return { features };
  } catch (error) {
    throw new Error("Invalid data.");
  }
}

function parseUrl(sourceUrl: string): URL {
  try {
    return new URL(sourceUrl);
  } catch {
    throw new Error("Please provide a valid URL.");
  }
}

function readFeatureCollection(data: unknown): FeatureCollectionInput {
  if (!isObject(data) || data.type !== "FeatureCollection") {
    throw new Error("Invalid data.");
  }

  if (!Array.isArray(data.features)) {
    throw new Error("Invalid data.");
  }

  return data as FeatureCollectionInput;
}

function toImportedFeature(
  featureData: unknown,
  index: number,
): Feature | null {
  if (!isObject(featureData) || featureData.type !== "Feature") {
    return null;
  }

  const feature = featureData as FeatureInput;
  const geometry = readGeometry(feature.geometry);

  if (!geometry) {
    return null;
  }

  return {
    id: createImportedFeatureId(feature.id, index),
    source: "imported",
    geometry,
    properties: isObject(feature.properties) ? feature.properties : {},
  };
}

function readGeometry(geometryData: unknown): Geometry | null {
  if (!isObject(geometryData)) {
    return null;
  }

  const geometry = geometryData as GeometryInput;

  if (!isSupportedGeometryType(geometry.type)) {
    return null;
  }

  switch (geometry.type) {
    case "Point":
      return isPosition(geometry.coordinates)
        ? { type: "Point", coordinates: geometry.coordinates }
        : null;
    case "MultiPoint":
      return isPositionArray(geometry.coordinates)
        ? { type: "MultiPoint", coordinates: geometry.coordinates }
        : null;
    case "LineString":
      return isPositionArray(geometry.coordinates)
        ? { type: "LineString", coordinates: geometry.coordinates }
        : null;
    case "MultiLineString":
      return isLineStringCoordinates(geometry.coordinates)
        ? { type: "MultiLineString", coordinates: geometry.coordinates }
        : null;
    case "Polygon":
      return isPolygonCoordinates(geometry.coordinates)
        ? { type: "Polygon", coordinates: geometry.coordinates }
        : null;
    case "MultiPolygon":
      return isMultiPolygonCoordinates(geometry.coordinates)
        ? { type: "MultiPolygon", coordinates: geometry.coordinates }
        : null;
  }
}

function createImportedFeatureId(
  rawId: string | number | undefined,
  index: number,
) {
  return rawId === undefined ? `imported-${index}` : `imported-${String(rawId)}`;
}

function isSupportedGeometryType(
  value: unknown,
): value is GeoType {
  return (
    value === "Point" ||
    value === "MultiPoint" ||
    value === "LineString" ||
    value === "MultiLineString" ||
    value === "Polygon" ||
    value === "MultiPolygon"
  );
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === "number");
}

function isPosition(value: unknown): value is GeoPosition {
  return isNumberArray(value) && (value.length === 2 || value.length === 3);
}

function isPositionArray(value: unknown): value is GeoPosition[] {
  return Array.isArray(value) && value.every((item) => isPosition(item));
}

function isLineStringCoordinates(value: unknown): value is GeoPosition[][] {
  return Array.isArray(value) && value.every((item) => isPositionArray(item));
}

function isPolygonCoordinates(value: unknown): value is GeoPosition[][] {
  return Array.isArray(value) && value.every((item) => isPositionArray(item));
}

function isMultiPolygonCoordinates(value: unknown): value is GeoPosition[][][] {
  return Array.isArray(value) && value.every((item) => isPolygonCoordinates(item));
}