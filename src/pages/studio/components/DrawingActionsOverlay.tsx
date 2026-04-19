import { Button, Paper, Stack, Typography } from "@mui/material";

type DrawingActionsOverlayProps = {
  pointCount: number;
  canFinish: boolean;
  onCancelDraft: () => void;
  onFinishPolygon: () => void;
};

export function DrawingActionsOverlay({
  pointCount,
  canFinish,
  onCancelDraft,
  onFinishPolygon,
}: DrawingActionsOverlayProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "absolute",
        right: { xs: 12, md: 16 },
        bottom: { xs: 12, md: 16 },
        p: 1.5,
        border: 1,
        borderColor: "divider",
        width: 320,
      }}
    >
      <Stack spacing={1.25}>
        <Typography sx={{ fontWeight: 600 }}>Drawing mode</Typography>
        <Typography>Points: {pointCount}</Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button variant="outlined" onClick={onCancelDraft} fullWidth>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onFinishPolygon}
            disabled={!canFinish}
            fullWidth
          >
            Complete
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
