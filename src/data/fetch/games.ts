"use client";

import api from "@/data/fetch/base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { GameEvent } from "@/types/events";

type GameFilterType = {
  charUUID?: UUID;
  dmUUID?: UUID;
};

/***************** Game CRUD functions *********************/

async function getGameFn(uuid: UUID) {
  return api.get(`/api/data/game/${uuid}`).then((r) => {
    return r.data as GameEvent;
  });
}

async function getGamesFn(filter?: GameFilterType) {
  return api
    .get("/api/data/game", {
      params: { character_uuid: filter?.charUUID, dm_uuid: filter?.dmUUID },
    })
    .then((r) => {
      return r.data as GameEvent[];
    });
}

async function createGameFn(event: Partial<GameEvent>) {
  return api.post("/api/data/game", event);
}

async function updateGameFn(event: Partial<GameEvent>) {
  return api.patch(`/api/data/game/${event.uuid}`, event);
}

async function deleteGamefn(event: GameEvent) {
  return api.delete(`/api/data/game/${event.uuid}/`);
}

/****************** Game action functions *********************/

async function joinGameFn(gameUUID: UUID, characterUUID: UUID) {
  return api.post(`/api/data/game/${gameUUID}/add_character`, {
    character_uuid: characterUUID,
  });
}

/***************** Hooks ************************/

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

export function useGames(filter: GameFilterType = {}) {
  const { charUUID, dmUUID } = filter;
  const queryClient = useQueryClient();

  let queryKey = ["game", "user"];
  if (dmUUID) queryKey = ["game", "dm", dmUUID];
  else if (charUUID) queryKey = ["game", "char", charUUID];

  const fetchData = useQuery({
    queryKey,
    queryFn: () => getGamesFn({ charUUID, dmUUID }),
  });

  const createGame = useMutation({
    mutationFn: (event: Partial<GameEvent>) => {
      if (dmUUID) event["dm_name"] = "self";
      return createGameFn(event);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
  const updateGame = useMutation({
    mutationFn: (reward: GameEvent) => updateGameFn(reward),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });

  const deleteGame = useMutation({
    mutationFn: (reward: GameEvent) => deleteGamefn(reward),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });

  return {
    ...fetchData,
    create: createGame.mutateAsync,
    update: updateGame.mutateAsync,
    delete: deleteGame.mutateAsync,
  };
}
