import { Button, Stack, Typography } from "@mui/material";

type DrawingControlsProps = {
  isDrawing: boolean;
  pointCount: number;
  canFinish: boolean;
  onStartPolygon: () => void;
  onFinish: () => void;
  onCancel: () => void;
};

export function DrawingControls({
  isDrawing,
  pointCount,
  canFinish,
  onStartPolygon,
  onFinish,
  onCancel,
}: DrawingControlsProps) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          onClick={onStartPolygon}
          disabled={isDrawing}
        >
          Draw polygon
        </Button>
        <Button variant="outlined" onClick={onFinish} disabled={!canFinish}>
          Complete
        </Button>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={!isDrawing && pointCount === 0}
        >
          Cancel
        </Button>
      </Stack>

      {isDrawing ? (
        <Typography variant="body2" color="text.secondary">
          Points: {pointCount}
        </Typography>
      ) : null}
    </Stack>
  );
}
