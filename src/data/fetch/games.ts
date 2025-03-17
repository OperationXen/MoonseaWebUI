"use client";

import api from "./base";

import { useQuery } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { CharacterGames } from "@/types/games";
import type { GameEvent } from "@/types/events";

function getPlayerGames() {
  return api.get("/api/data/games").then((r) => {
    return r.data as CharacterGames[];
  });
}

function getCharacterGames(characterUUID: UUID) {
  return api.get(`/api/data/game?character_uuid=${characterUUID}`).then((r) => {
    return r.data.results as GameEvent[];
  });
}

/*********************************************************************/

export function usePlayerGames() {
  const queryKey = ["player", "games"];

  return useQuery({
    queryKey,
    queryFn: getPlayerGames,
  });
}

export function useCharacterGames(characterUUID: UUID) {
  const queryKey = ["character", "games", characterUUID];

  return useQuery({
    queryKey,
    queryFn: () => getCharacterGames(characterUUID),
    initialData: [],
  });
}
