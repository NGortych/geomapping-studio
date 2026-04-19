import { Paper } from "@mui/material";
import { DataGrid, type GridRowSelectionModel } from "@mui/x-data-grid";

import type { Feature } from "../../../entities/geo-feature/model/types";
import { useFeatureTable } from "../hooks/useFeatureTable";

type FeatureTableViewProps = {
  features: Feature[];
  selectedFeatureIds: string[];
  onSelectedFeatureIdsChange: (featureIds: string[]) => void;
};

export function FeatureTableView({
  features,
  selectedFeatureIds,
  onSelectedFeatureIdsChange,
}: FeatureTableViewProps) {
  const { columns, rows } = useFeatureTable(features);
  const rowSelectionModel: GridRowSelectionModel = {
    type: "include",
    ids: new Set(selectedFeatureIds),
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        border: 1,
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(nextSelectionModel) => {
          onSelectedFeatureIdsChange(
            Array.from(nextSelectionModel.ids).filter(
              (value): value is string => typeof value === "string",
            ),
          );
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
              page: 0,
            },
          },
        }}
        sx={{
          border: 0,
        }}
      />
    </Paper>
  );
}
