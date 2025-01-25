"use client";

import api from "../base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { DMEvent } from "@/types/events";
import { generateUUID } from "@/utils/uuid";

/******************************************************************/
function getEventsFn(dmUUID: UUID) {
  return api.get(`/api/data/dm_events/${dmUUID}`).then((r) => {
    debugger;
    return r.data as DMEvent[];
  });
}

function createEventFn(event: Partial<DMEvent>) {
  return api.post("/api/data/dm_reward", { event });
}

function updateEventFn(event: Partial<DMEvent>) {
  return api.patch(`/api/data/dm_reward/${event.uuid}`, event);
}

function deleteEventfn(event: DMEvent) {
  return api.delete(`/api/data/dm_reward/${event.uuid}/`);
}

/******************************************************************/
export function useDMEvents(dmUUID: UUID) {
  const queryClient = useQueryClient();
  const queryKey = ["events", "all", "dm", dmUUID];

  const fetchData = useQuery({
    queryKey: queryKey,
    queryFn: () => getEventsFn(dmUUID),
  });

  const createEvent = useMutation({
    mutationFn: (data: Partial<DMEvent>) => createEventFn(data),

    onMutate: async (event: Partial<DMEvent>) => {
      // generate a temporary UUID to use with the optimistic update
      const newEvent = { ...event };
      newEvent.uuid = generateUUID();
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: queryKey });
      const oldEvents = queryClient.getQueryData(queryKey) as any[];
      queryClient.setQueryData(queryKey, [...oldEvents, newEvent]);
      return { oldEvents };
    },
    // If the mutation fails, use the context we returned above
    onError: (_err, _newData: Partial<DMEvent>, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.oldEvents);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      queryClient.invalidateQueries({ queryKey: ["character", dmUUID] });
    },
  });

  const updateEvent = useMutation({
    mutationFn: (event: DMEvent) => updateEventFn(event),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });

  const deleteEvent = useMutation({
    mutationFn: (event: DMEvent) => deleteEventfn(event),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });

  return {
    ...fetchData,
    createEvent: createEvent.mutateAsync,
    updateEvent: updateEvent.mutateAsync,
    deleteEvent: deleteEvent.mutateAsync,
  };
}
