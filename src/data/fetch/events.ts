"use client";

import api from "./base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { CharacterEvent, GameEvent } from "@/types/events";

function getEventsFn(characterUUID: UUID) {
  return api.get(`/api/data/character_events/${characterUUID}`).then((r) => {
    return r.data as CharacterEvent[];
  });
}

function createEventFn(char: UUID, event: Partial<CharacterEvent | GameEvent>) {
  event.character_uuid = char;

  switch (event.event_type) {
    case "dt_catchingup":
      return api.post("/api/data/catchingup", event);
    case "dt_mtrade":
      return api.post("/api/data/mundanetrade", event);
    case "dt_sbookupd":
      return api.post("/api/data/spellbook", event);
    case "game":
      return api.post("/api/data/game", event);
    default:
      return Promise.resolve(null);
  }
}

export function useEvents(characterUUID: UUID) {
  const queryClient = useQueryClient();

  const fetchData = useQuery({
    queryKey: ["events", "all", "character", characterUUID],
    queryFn: () => getEventsFn(characterUUID),
  });

  const createEvent = useMutation({
    mutationFn: (data: Partial<CharacterEvent | GameEvent>) =>
      createEventFn(characterUUID, data),

    //     onMutate: async (newChar: Partial<Character>) => {
    //       // Cancel any outgoing refetches to avoid overwriting optimistic update
    //       await queryClient.cancelQueries({
    //         queryKey: ["character", newChar.uuid],
    //       });
    //       // Snapshot the previous value
    //       const oldCharData = queryClient.getQueryData(["character", newChar.uuid]);
    //       // Optimistically update to the new value
    //       queryClient.setQueryData(["character", newChar.uuid], newChar);
    //       // Return a context with the old data and the new
    //       return { oldCharData, newChar };
    //     },
    //     // If the mutation fails, use the context we returned above
    //     onError: (_err, _newChar: Partial<Character>, context) => {
    //       if (context) {
    //         queryClient.setQueryData(
    //           ["character", context.newChar.uuid],
    //           context.oldCharData,
    //         );
    //       }
    //     },

    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["events", "all", "character", characterUUID],
      }),
  });

  return { ...fetchData, createEvent: createEvent.mutateAsync };
}
