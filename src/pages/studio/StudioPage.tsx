import { Box, Container } from "@mui/material";

import { AppShell } from "../../app/layout/AppShell";
import { MapCanvas } from "../../features/map/components/MapCanvas";
import { useMapViewport } from "../../features/map/hooks/useMapViewport";
import { StudioToolbar } from "./components/StudioToolbar";

export function StudioPage() {
  const { viewport, handleViewportChange } = useMapViewport();
sa
  return (
    <AppShell
      header={<StudioToolbar />}
      content={
        <Container
          maxWidth={false}
          sx={{
            height: "100%",
            px: { xs: 2, md: 3 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ height: "calc(100vh - 150px)" }}>
            <MapCanvas
              viewport={viewport}
              onViewportChange={handleViewportChange}
            />
          </Box>
        </Container>
      }
    />
  );
}
