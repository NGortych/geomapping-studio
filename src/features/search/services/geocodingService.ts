import type { SearchResult } from "../model/types";

const SEARCH_URL = "https://nominatim.openstreetmap.org/search";
const SEARCH_RESULT_ZOOM = 14;
const COORDINATE_PATTERN =
  /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

export async function findLocation(query: string): Promise<SearchResult> {
  const parsedCoordinateResult = parseCoordinate(query);

  if (parsedCoordinateResult) {
    return parsedCoordinateResult;
  }

  return geocodeByPlaceName(query);
}

function parseCoordinate(query: string): SearchResult | null {
  const match = query.match(COORDINATE_PATTERN);

  if (!match) {
    return null;
  }

  const latitude = Number(match[1]);
  const longitude = Number(match[2]);

  return {
    position: [longitude, latitude],
    zoom: SEARCH_RESULT_ZOOM,
  };
}

async function geocodeByPlaceName(query: string): Promise<SearchResult> {
  const searchUrl = new URL(SEARCH_URL);
  searchUrl.searchParams.set("format", "jsonv2");
  searchUrl.searchParams.set("limit", "1");
  searchUrl.searchParams.set("q", query);

  let response: Response;

  try {
    response = await fetch(searchUrl.toString());
  } catch {
    throw new Error("Service not working.");
  }

  if (!response.ok) {
    throw new Error("Service not working.");
  }

  const results = (await response.json()) as SearchResultQuery[];
  const location = results[0];

  if (!location) {
    throw new Error("No locations found.");
  }

  const latitude = Number(location.lat);
  const longitude = Number(location.lon);

  return {
    position: [longitude, latitude],
    zoom: SEARCH_RESULT_ZOOM,
  };
}

type SearchResultQuery = {
  lat: string;
  lon: string;
};
