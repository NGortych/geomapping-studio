import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import type { ViewMode } from "../../../features/table-view/model/types";

type ViewModeControlProps = {
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export function ViewModeControl({
  viewMode,
  onViewModeChange,
}: ViewModeControlProps) {
  return (
    <ToggleButtonGroup
      exclusive
      value={viewMode}
      fullWidth
      size="small"
      onChange={(_, nextViewMode: ViewMode | null) => {
        if (!nextViewMode) {
          return;
        }

        onViewModeChange(nextViewMode);
      }}
    >
      <ToggleButton value="map" sx={{ gap: 1 }}>
        <MapOutlinedIcon />
        Map
      </ToggleButton>
      <ToggleButton value="table" sx={{ gap: 1 }}>
        <TableRowsOutlinedIcon />
        Table
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
