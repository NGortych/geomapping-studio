import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";

type StudioControlsDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function StudioControlsDrawer({
  open,
  onClose,
  children,
}: StudioControlsDrawerProps) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", lg: "none" },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          px: 2,
          py: 1.5,
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="h1">GeoMapping Studio</Typography>
          <IconButton aria-label="Close controls" onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ p: 2, overflow: "auto" }}>{children}</Box>
    </Drawer>
  );
}
