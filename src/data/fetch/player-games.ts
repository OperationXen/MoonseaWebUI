"use client";

import api from "./base";

import { useQuery } from "@tanstack/react-query";

import type { CharacterGames } from "@/types/games";

function getPlayerGames() {
  return api.get("/api/data/games").then((r) => {
    return r.data as CharacterGames[];
  });
}

/*********************************************************************/
export function usePlayerGames() {
  const queryKey = ["player", "games"];

  return useQuery({
    queryKey,
    queryFn: () => getPlayerGames(),
  });
}
