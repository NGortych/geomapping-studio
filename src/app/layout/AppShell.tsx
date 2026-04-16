import type { ReactNode } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

type AppShellProps = {
  header: ReactNode;
  content: ReactNode;
};

export function AppShell({ header, content }: AppShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar disableGutters sx={{ minHeight: "auto" }}>
          {header}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1, minHeight: 0 }}>
        {content}
      </Box>
    </Box>
  );
}
