import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import type { ViewMode } from "../model/types";

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
      onChange={(_, viewMode: ViewMode) => {
        onViewModeChange(viewMode);
      }}
    >
      <ToggleButton value="map">
        <MapOutlinedIcon />
      </ToggleButton>
      <ToggleButton value="table">
        <TableRowsOutlinedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
