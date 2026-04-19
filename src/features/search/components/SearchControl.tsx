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
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <TextField
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search location"
        />
        <Button
          variant="contained"
          onClick={onSearch}
          disabled={status.state === "loading" || !query}
        >
          Search
        </Button>
      </Stack>

      {status.state === "error" && (
        <Box>
          <Alert severity={"error"}>{status.message}</Alert>
        </Box>
      )}
    </Stack>
  );
}
