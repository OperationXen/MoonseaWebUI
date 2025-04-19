"use client";

import api from "@/data/fetch/base";

import { useQuery, useMutation } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { GameEvent } from "@/types/events";

async function getGameFn(uuid: UUID) {
  return api.get(`/api/data/game/${uuid}`).then((r) => {
    return r.data as GameEvent;
  });
}

async function joinGameFn(gameUUID: UUID, characterUUID: UUID) {
  return api.post(`/api/data/game/${gameUUID}/add_character`, {
    character_uuid: characterUUID,
  });
}

/*********************************************************************/

export function useGame(uuid: UUID) {
  const queryKey = ["game", uuid];

  const fetchData = useQuery({
    queryKey,
    queryFn: () => getGameFn(uuid),
  });
  const joinGame = useMutation({
    mutationFn: (charUUID: UUID) => joinGameFn(uuid, charUUID),
  });

  return { ...fetchData, joinGame: joinGame.mutateAsync };
}
