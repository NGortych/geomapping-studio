import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type StudioControlPanelProps = {
  viewModeControl: ReactNode;
  searchControl: ReactNode;
  importControl: ReactNode;
  exportControl: ReactNode;
};

export function StudioControlPanel({
  viewModeControl,
  searchControl,
  importControl,
  exportControl,
}: StudioControlPanelProps) {
  return (
    <Stack spacing={2}>
      <ControlSection title="View Mode">{viewModeControl}</ControlSection>

      <ControlSection
        title="Search Location"
        description="Search coordinates or places."
      >
        {searchControl}
      </ControlSection>

      <ControlSection
        title="Data"
        description="Load external data and export drawn polygons."
      >
        <Stack spacing={1.5}>
          {importControl}
          <Divider />
          {exportControl}
        </Stack>
      </ControlSection>
    </Stack>
  );
}

type ControlSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

function ControlSection({ title, description, children }: ControlSectionProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Stack spacing={1.5}>
        <Box>
          <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </Box>

        {children}
      </Stack>
    </Paper>
  );
}
