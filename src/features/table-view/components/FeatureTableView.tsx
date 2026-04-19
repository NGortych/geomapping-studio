import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import type { Feature } from "../../../entities/geo-feature/model/types";
import { useFeatureTable } from "../hooks/useFeatureTable";

type FeatureTableViewProps = {
  features: Feature[];
};

export function FeatureTableView({ features }: FeatureTableViewProps) {
  const { columns, rows } = useFeatureTable(features);

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
        pageSizeOptions={[10, 25, 50]}
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
