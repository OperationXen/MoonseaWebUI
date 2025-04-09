"use client";

import api from "../base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { DMGameEvent } from "@/types/events";

/******************************************************************/
async function getGamesFn() {
  return api.get("/api/data/dm_game/").then((r) => {
    return r.data as DMGameEvent[];
  });
}

async function createGameFn(event: Partial<DMGameEvent>) {
  return api.post("/api/data/dm_game", event);
}

async function updateGameFn(event: Partial<DMGameEvent>) {
  return api.patch(`/api/data/dm_game/${event.uuid}`, event);
}

async function deleteGamefn(event: DMGameEvent) {
  return api.delete(`/api/data/dm_game/${event.uuid}/`);
}

/******************************************************************/
export function useDMGames(dmUUID: UUID | null) {
  const queryClient = useQueryClient();
  const queryKey = ["games", "all", "dm", dmUUID];

  const fetchData = useQuery({
    queryKey: queryKey,
    queryFn: getGamesFn,
  });

  const createGame = useMutation({
    mutationFn: (data: Partial<DMGameEvent>) => createGameFn(data),

    onMutate: async (event: Partial<DMGameEvent>) => {
      // generate a temporary UUID to use with the optimistic update

      const newEvent = { ...event, uuid: "0-0-0-0-0" };
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: queryKey });
      const oldEvents = queryClient.getQueryData(queryKey) as any;
      queryClient.setQueryData(queryKey, [
        ...(oldEvents.results as DMGameEvent[]),
        newEvent,
      ]);
      return { oldEvents };
    },
    // If the mutation fails, use the context we returned above
    onError: (_err, _newData: Partial<DMGameEvent>, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.oldEvents);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      queryClient.invalidateQueries({ queryKey: ["character", dmUUID] });
    },
  });

  const updateGame = useMutation({
    mutationFn: (reward: DMGameEvent) => updateGameFn(reward),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });

  const deleteGame = useMutation({
    mutationFn: (reward: DMGameEvent) => deleteGamefn(reward),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });

  return {
    ...fetchData,
    createGame: createGame.mutateAsync,
    updateGame: updateGame.mutateAsync,
    deleteGame: deleteGame.mutateAsync,
  };
}
