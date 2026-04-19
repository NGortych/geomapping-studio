import { Alert, Box, Button, Stack, TextField } from "@mui/material";

import type { SearchStatus } from "../model/types";

type SearchControlProps = {
  query: string;
  status: SearchStatus;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
};

export function SearchControl({
  query,
  status,
  onQueryChange,
  onSearch,
}: SearchControlProps) {
  const isSearchDisabled = status.state === "loading" || query.trim().length === 0;

  return (
    <Stack spacing={1.25} sx={{ width: "100%" }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
        <TextField
          fullWidth
          size="small"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search location"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !isSearchDisabled) {
              onSearch();
            }
          }}
        />
        <Button
          variant="outlined"
          onClick={onSearch}
          disabled={isSearchDisabled}
          sx={{ whiteSpace: "nowrap" }}
        >
          Search
        </Button>
      </Stack>

      {status.state === "error" && (
        <Box>
          <Alert severity="error">{status.message}</Alert>
        </Box>
      )}
    </Stack>
  );
}
