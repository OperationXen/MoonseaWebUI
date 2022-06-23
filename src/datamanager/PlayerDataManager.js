import { useEffect, useCallback } from "react";

import usePlayerStore from "../datastore/player";
import { fetchAllCharacters } from "../api/character";

export default function PlayerDataManager() {
  const [refreshPending, setCharacters, setLoading] = usePlayerStore((s) => [
    s.refresh,
    s.setCharacters,
    s.setLoading,
  ]);

  const refreshData = useCallback(() => {
    setLoading(true);
    fetchAllCharacters()
      .then((response) => {
        setCharacters(response.data.results);
      })
      .finally(() => setLoading(false));
  }, [setCharacters, setLoading]);

  useEffect(() => {
    refreshData();
  }, [refreshPending, refreshData]);

  return null;
}
