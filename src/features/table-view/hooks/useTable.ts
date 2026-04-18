import { useMemo } from "react";
import type { GridColDef } from "@mui/x-data-grid";

import type { Feature } from "../../../entities/geo-feature/model/types";
import type { FeatureTableRow } from "../model/types";

type PropertyColumnDescriptor = {
  field: string;
  headerName: string;
  propertyKey: string;
};

const BASE_COLUMNS: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "geometryType",
    headerName: "Geometry",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "source",
    headerName: "Source",
    minWidth: 150,
    flex: 1,
  },
];

export function useTable(features: Feature[]) {
  const propertyColumns = useMemo(
    () => buildPropertyColumns(features),
    [features],
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      ...BASE_COLUMNS,
      ...propertyColumns.map<GridColDef>(({ field, headerName }) => ({
        field,
        headerName,
        minWidth: 150,
        flex: 1,
      })),
    ],
    [propertyColumns],
  );

  const rows = useMemo<FeatureTableRow[]>(
    () =>
      features.map((feature) => {
        const row: FeatureTableRow = {
          id: feature.id,
          geometryType: feature.geometry.type,
          source: feature.source,
        };

        for (const { field, propertyKey } of propertyColumns) {
          row[field] = feature.properties[propertyKey];
        }

        return row;
      }),
    [features, propertyColumns],
  );

  return {
    columns,
    rows,
  };
}

function buildPropertyColumns(features: Feature[]): PropertyColumnDescriptor[] {
  const firstFeatureWithProperties = features.find(
    (feature) => Object.keys(feature.properties).length > 0,
  );

  if (!firstFeatureWithProperties) {
    return [];
  }

  const baseFieldNames = new Set(
    BASE_COLUMNS.map((column) => column.field.toLowerCase()),
  );

  return Object.keys(firstFeatureWithProperties.properties)
    .filter(
      (propertyKey) => !baseFieldNames.has(propertyKey.trim().toLowerCase()),
    )
    .map((propertyKey) => ({
      field: propertyKey,
      headerName: propertyKey,
      propertyKey,
    }));
}
