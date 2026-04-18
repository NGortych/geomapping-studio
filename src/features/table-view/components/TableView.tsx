import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import type { Feature } from "../../../entities/geo-feature/model/types";
import { useTable } from "../hooks/useTable";

type TableViewProps = {
  features: Feature[];
};

export function TableView({ features }: TableViewProps) {
  const { columns, rows } = useTable(features);

  return (
    <Box>
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
      />
    </Box>
  );
}
