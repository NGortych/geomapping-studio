import { useState } from "react";

import type { SearchResult, SearchStatus } from "../model/types";
import { findLocation } from "../services/geocodingService";

type UseLocationSearchProps = {
  onSearchSuccess: (result: SearchResult) => void;
};

export function useLocationSearch({ onSearchSuccess }: UseLocationSearchProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SearchStatus>({ state: "idle" });
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  async function handleSearch() {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setSearchResult(null);
      setStatus({
        state: "error",
        message: "Please enter a place name or coordinates.",
      });
      return;
    }

    setStatus({ state: "loading" });

    try {
      const result = await findLocation(trimmedQuery);

      setSearchResult(result);
      setStatus({
        state: "success",
      });
      onSearchSuccess(result);
    } catch (error) {
      setSearchResult(null);
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "Search failed.",
      });
    }
  }

  return {
    query,
    setQuery,
    status,
    searchResult,
    handleSearch,
  };
}
