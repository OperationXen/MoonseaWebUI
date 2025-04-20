"use client";

import api from "@/data/fetch/base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { GameEvent } from "@/types/events";

/***************** Game CRUD functions *********************/

async function getGameFn(uuid: UUID) {
  return api.get(`/api/data/game/${uuid}`).then((r) => {
    return r.data as GameEvent;
  });
}

async function getGamesFn() {
  return api.get("/api/data/game").then((r) => {
    return r.data as GameEvent[];
  });
}

function getCharacterGames(characterUUID: UUID) {
  return api.get(`/api/data/game?character_uuid=${characterUUID}`).then((r) => {
    return r.data.results as GameEvent[];
  });
}

async function createGameFn(
  event: Partial<GameEvent>,
  userIsDM: boolean = false,
) {
  if (userIsDM) event["dm_name"] = "self";
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

export function useCharacterGames(characterUUID: UUID) {
  const queryKey = ["character", "games", characterUUID];

  return useQuery({
    queryKey,
    queryFn: () => getCharacterGames(characterUUID),
    initialData: [],
  });
}

export function useGames() {
  const queryKey = ["game", "user"];
  const queryClient = useQueryClient();

  const fetchData = useQuery({
    queryKey,
    queryFn: getGamesFn,
  });

  const createGame = useMutation({
    mutationFn: createGameFn,
    onMutate: async (event: Partial<GameEvent>) => {
      // generate a temporary UUID to use with the optimistic update

      const newEvent = { ...event, uuid: "0-0-0-0-0" };
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: queryKey });
      const oldEvents = queryClient.getQueryData(queryKey) as any;
      queryClient.setQueryData(queryKey, [
        ...(oldEvents.results as GameEvent[]),
        newEvent,
      ]);
      return { oldEvents };
    },
    // If the mutation fails, use the context we returned above
    onError: (_err, _newData: Partial<GameEvent>, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.oldEvents);
      }
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
