import { renderHook } from "@testing-library/react";

import type { Feature } from "../../../entities/geo-feature/model/types";
import { useFeatureTable } from "./useFeatureTable";

describe("useFeatureTable", () => {
  it("builds base columns and property columns from the first feature with properties", () => {
    const features: Feature[] = [
      {
        id: "imported-1",
        source: "imported",
        geometry: {
          type: "Point",
          coordinates: [21.0, 21.0],
        },
        properties: {
          city: "Warsaw",
          population: 123123,
          source: "should-be-ignored",
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
              [21.1, 52],
              [21.1, 52.1],
              [21, 52],
            ],
          ],
        },
        properties: {
          city: "Gdansk",
          population: 33333,
        },
      },
    ];

    const { result } = renderHook(() => useFeatureTable(features));

    expect(result.current.columns.map((column) => column.field)).toEqual([
      "id",
      "geometryType",
      "source",
      "city",
      "population",
    ]);

    expect(result.current.rows).toEqual([
      {
        id: "imported-1",
        geometryType: "Point",
        source: "imported",
        city: "Warsaw",
        population: 123123,
      },
      {
        id: "drawn-1",
        geometryType: "Polygon",
        source: "drawn",
        city: "Gdansk",
        population: 33333,
      },
    ]);
  });

  it("returns only base columns when features do not have properties", () => {
    const features: Feature[] = [
      {
        id: "drawn-1",
        source: "drawn",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [21, 52],
              [21.1, 52],
              [21.1, 52.1],
              [21, 52],
            ],
          ],
        },
        properties: {},
      },
    ];

    const { result } = renderHook(() => useFeatureTable(features));

    expect(result.current.columns.map((column) => column.field)).toEqual([
      "id",
      "geometryType",
      "source",
    ]);
    expect(result.current.rows).toEqual([
      {
        id: "drawn-1",
        geometryType: "Polygon",
        source: "drawn",
      },
    ]);
  });
});
