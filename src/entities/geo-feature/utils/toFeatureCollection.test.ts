import type { Feature } from "../model/types";
import { toFeatureCollection } from "./toFeatureCollection";

describe("toFeatureCollection", () => {
  it("builds a GeoJSON FeatureCollection from application features", () => {
    const features: Feature[] = [
      {
        id: "imported-1",
        source: "imported",
        geometry: {
          type: "Point",
          coordinates: [21.0122, 52.2297],
        },
        properties: {
          name: "Warsaw",
        },
      },
      {
        id: "drawn-1",
        source: "drawn",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [21, 52],
              [21.2, 52],
              [21.2, 52.2],
              [21, 52],
            ],
          ],
        },
        properties: {},
      },
    ];

    expect(toFeatureCollection(features)).toEqual({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          id: "imported-1",
          geometry: {
            type: "Point",
            coordinates: [21.0122, 52.2297],
          },
          properties: {
            name: "Warsaw",
          },
        },
        {
          type: "Feature",
          id: "drawn-1",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [21, 52],
                [21.2, 52],
                [21.2, 52.2],
                [21, 52],
              ],
            ],
          },
          properties: {},
        },
      ],
    });
  });
});
