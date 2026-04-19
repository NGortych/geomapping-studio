import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

type StudioHeaderProps = {
  showMobileControlsButton: boolean;
  onOpenControls: () => void;
  isDesktopSidebarVisible: boolean;
  onToggleDesktopSidebar: () => void;
  isDrawingModeEnabled: boolean;
  onToggleDrawingMode: () => void;
};

export function StudioHeader({
  showMobileControlsButton,
  onOpenControls,
  isDesktopSidebarVisible,
  onToggleDesktopSidebar,
  isDrawingModeEnabled,
  onToggleDrawingMode,
}: StudioHeaderProps) {
  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, md: 3 },
        py: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <IconButton
          aria-label={
            isDesktopSidebarVisible ? "Hide left panel" : "Show left panel"
          }
          color="inherit"
          onClick={onToggleDesktopSidebar}
          sx={{ display: { xs: "none", lg: "inline-flex" } }}
        >
          {isDesktopSidebarVisible ? (
            <ViewSidebarRoundedIcon />
          ) : (
            <ViewSidebarOutlinedIcon />
          )}
        </IconButton>

        <Typography variant="h1" component="h1">
          GeoMapping Studio
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Button
          variant={isDrawingModeEnabled ? "contained" : "outlined"}
          color={isDrawingModeEnabled ? "primary" : "inherit"}
          onClick={onToggleDrawingMode}
          size="small"
          sx={{ whiteSpace: "nowrap" }}
        >
          {isDrawingModeEnabled ? "Disable drawing" : "Enable drawing"}
        </Button>

        {showMobileControlsButton ? (
          <IconButton
            aria-label="Open controls"
            color="inherit"
            onClick={onOpenControls}
            edge="end"
          >
            <MenuOutlinedIcon />
          </IconButton>
        ) : null}
      </Stack>
    </Box>
  );
}
