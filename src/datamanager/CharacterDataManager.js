import { useEffect, useCallback } from "react";

import useCharacterStore from "../datastore/character";
import { fetchAllCharacters } from "../api/character";

export default function CharacterDataManager() {
  const [refreshPending, setCharacters, setLoading] = useCharacterStore((s) => [
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
