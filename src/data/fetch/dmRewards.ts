"use client";

import api from "./base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { DMRewardEvent } from "@/types/events";
import { generateUUID } from "@/utils/uuid";

/******************************************************************/
async function getRewardsFn() {
  return api.get("/api/data/dm_reward").then((r) => {
    return r.data.results as DMRewardEvent[];
  });
}

async function createRewardFn(event: Partial<DMRewardEvent>) {
  return api.post("/api/data/dm_reward", { ...event });
}

async function updateRewardFn(event: Partial<DMRewardEvent>) {
  return api.patch(`/api/data/dm_reward/${event.uuid}`, event);
}

async function deleteRewardfn(event: DMRewardEvent) {
  return api.delete(`/api/data/dm_reward/${event.uuid}/`);
}

/******************************************************************/
export function useDMRewards(dmUUID: UUID | null) {
  const queryClient = useQueryClient();
  const queryKey = ["rewards", "dm", dmUUID];

  const fetchData = useQuery({
    queryKey: queryKey,
    queryFn: getRewardsFn,
  });

  const createReward = useMutation({
    mutationFn: (data: Partial<DMRewardEvent>) => createRewardFn(data),

    onMutate: async (event: Partial<DMRewardEvent>) => {
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
    onError: (_err, _newData: Partial<DMRewardEvent>, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.oldEvents);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
      queryClient.invalidateQueries({ queryKey: ["character", dmUUID] });
    },
  });

  const updateReward = useMutation({
    mutationFn: (reward: DMRewardEvent) => updateRewardFn(reward),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });

  const deleteReward = useMutation({
    mutationFn: (reward: DMRewardEvent) => deleteRewardfn(reward),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });

  return {
    ...fetchData,
    create: createReward.mutateAsync,
    updateReward: updateReward.mutateAsync,
    deleteReward: deleteReward.mutateAsync,
  };
}
