"use client";

import api from "./base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { CharacterEvent, GameEvent, AnyEvent } from "@/types/events";

function getEventsFn(characterUUID: UUID) {
  return api.get(`/api/data/character_events/${characterUUID}`).then((r) => {
    return r.data as CharacterEvent[];
  });
}

function createEventFn(char: UUID, event: Partial<AnyEvent>) {
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
  const queryKey = ["events", "all", "character", characterUUID];

  const fetchData = useQuery({
    queryKey: queryKey,
    queryFn: () => getEventsFn(characterUUID),
  });

  const createEvent = useMutation({
    mutationFn: (data: Partial<AnyEvent>) => createEventFn(characterUUID, data),

    onMutate: async (newEvent: Partial<AnyEvent>) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: queryKey });
      const oldEvents = queryClient.getQueryData(queryKey) as any[];
      queryClient.setQueryData(queryKey, [...oldEvents, newEvent]);
      return { oldEvents, newEvent };
    },
    // If the mutation fails, use the context we returned above
    onError: (_err, _newData: Partial<AnyEvent>, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.oldEvents);
      }
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });

  return { ...fetchData, createEvent: createEvent.mutateAsync };
}
