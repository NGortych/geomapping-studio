import { Box, Button, Stack, Typography } from "@mui/material";

export function StudioToolbar() {
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
      <Stack spacing={0.5}>
        <Typography variant="h1" component="h1">
          GeoMapping Studio
        </Typography>
      </Stack>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Button disabled variant="outlined">
            Test
          </Button>
          <Button disabled variant="outlined">
            Test
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
